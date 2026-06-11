#!/usr/bin/env node
/**
 * migrate_quizzes.js
 * 旧形式の quiz/*_quiz.html を quiz/data/YYYYMMDD.js に変換する使い捨てスクリプト。
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPO_ROOT   = path.resolve(__dirname, '..');
const QUIZ_DIR    = path.join(REPO_ROOT, 'quiz');
const DATA_DIR    = path.join(QUIZ_DIR,  'data');
const ARCHIVE_DIR = path.join(QUIZ_DIR,  'archive');

// --- ユーティリティ -----------------------------------------------------------

/**
 * HTML 文字列から `const quizData = [` 〜対応する `];` を切り出す。
 * 「];` の直後に `let currentIdx` が続く」という全ファイル共通の境界を利用し、
 * その手前の `];` を終端として切り出す。
 * これにより template literal / HTML タグ内の `[` `]` に惑わされない。
 */
function extractQuizDataSource(html) {
  const startMarker = 'const quizData = [';
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) throw new Error('const quizData が見つかりません');

  const endMarker = 'let currentIdx';
  const endIdx = html.indexOf(endMarker, startIdx);
  if (endIdx === -1) throw new Error('let currentIdx が見つかりません');

  // startIdx〜endIdx の間にある最後の "];" を探す
  const segment = html.slice(startIdx, endIdx);
  const lastBracket = segment.lastIndexOf('];');
  if (lastBracket === -1) throw new Error(']; が見つかりません');

  return segment.slice(0, lastBracket + 2); // "];" を含む
}

/**
 * `<p class="subtitle">...</p>` からタイトル文字列を抽出する。
 * - 「— 」と「についての」の間を返す
 * - 失敗時はタグ内テキスト全文を返す
 */
function extractTitle(html) {
  const m = html.match(/<p\s+class="subtitle">([^<]+)<\/p>/);
  if (!m) return '';
  const full = m[1].trim();

  const inner = full.match(/—\s+(.+?)についての/);
  if (inner) return inner[1].trim();

  const afterDash = full.match(/—\s+(.+)/);
  if (afterDash) return afterDash[1].trim();

  return full;
}

/**
 * quizData ソース文字列を new Function で評価して配列を得る。
 */
function evalQuizData(src) {
  // "const quizData = [...];" → return [...]; に変換
  const fnSrc = src.replace(/^const quizData\s*=\s*/, 'return ');
  // eslint-disable-next-line no-new-func
  return new Function(fnSrc)();
}

/**
 * 質問オブジェクトを新形式に変換する。
 */
function convertQuestion(rawQ, date, idx) {
  return {
    id:          `${date}-q${idx + 1}`,
    question:    rawQ.question    || '',
    code:        rawQ.code        || '',
    choices:     rawQ.choices     || [],
    explanation: rawQ.explanation || ''
  };
}

/**
 * quiz/data/YYYYMMDD.js の内容を生成する。
 */
function buildDataFileContent(date, title, questions) {
  const questionsJson = JSON.stringify(questions, null, 2);
  return `window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["${date}"] = {
  date: "${date}",
  title: ${JSON.stringify(title)},
  questions: ${questionsJson}
};
`;
}

/**
 * quiz/data/manifest.js の内容を生成する。
 */
function buildManifestContent(entries) {
  const entriesJson = JSON.stringify(entries, null, 2);
  return `window.QUIZ_MANIFEST = ${entriesJson};\n`;
}

// --- メイン処理 ---------------------------------------------------------------

function main() {
  // 対象 HTML を日付昇順で取得
  const htmlFiles = fs.readdirSync(QUIZ_DIR)
    .filter(f => /^\d{8}_quiz\.html$/.test(f))
    .sort();

  if (htmlFiles.length === 0) {
    console.error('対象の HTML ファイルが見つかりません');
    process.exit(1);
  }

  console.log(`対象ファイル: ${htmlFiles.length} 個`);
  console.log('---');

  const manifestEntries = [];
  let totalExtracted = 0;
  let totalWritten   = 0;
  const errors = [];

  for (const htmlFile of htmlFiles) {
    const date    = htmlFile.replace('_quiz.html', '');
    const srcPath = path.join(QUIZ_DIR, htmlFile);
    const outPath = path.join(DATA_DIR, `${date}.js`);

    try {
      const html = fs.readFileSync(srcPath, 'utf8');

      // 1. quizData ソースを抽出
      const quizSrc = extractQuizDataSource(html);

      // 2. 評価
      const rawQuestions = evalQuizData(quizSrc);
      if (!Array.isArray(rawQuestions)) {
        throw new Error('評価結果が配列ではありません');
      }
      totalExtracted += rawQuestions.length;

      // 3. タイトル抽出
      const title = extractTitle(html);

      // 4. 質問を新形式に変換
      const questions = rawQuestions.map((q, i) => convertQuestion(q, date, i));

      // 5. データファイル出力
      const content = buildDataFileContent(date, title, questions);
      fs.writeFileSync(outPath, content, 'utf8');
      totalWritten += questions.length;

      manifestEntries.push({ date, title, count: questions.length });

      console.log(`[OK] ${htmlFile} → data/${date}.js  (${questions.length}問, title="${title}")`);
    } catch (err) {
      console.error(`[ERROR] ${htmlFile}: ${err.message}`);
      errors.push({ file: htmlFile, error: err.message });
    }
  }

  // 6. manifest.js 出力
  const manifestPath = path.join(DATA_DIR, 'manifest.js');
  fs.writeFileSync(manifestPath, buildManifestContent(manifestEntries), 'utf8');
  console.log(`\n[OK] manifest.js 出力 (${manifestEntries.length}エントリ)`);

  // 7. 旧 HTML を archive/ へ git mv
  console.log('\n--- archive/ へ git mv ---');
  for (const htmlFile of htmlFiles) {
    const srcRel  = `quiz/${htmlFile}`;
    const destRel = `quiz/archive/${htmlFile}`;
    try {
      execSync(`git mv "${srcRel}" "${destRel}"`, { cwd: REPO_ROOT, stdio: 'pipe' });
      console.log(`[OK] git mv ${srcRel} → ${destRel}`);
    } catch (err) {
      const msg = err.stderr ? err.stderr.toString().trim() : err.message;
      console.error(`[ERROR] git mv ${htmlFile}: ${msg}`);
      errors.push({ file: htmlFile, error: `git mv: ${msg}` });
    }
  }

  // 8. 検証: window.QUIZ_DATA に正しく入ること、choices 4個・isCorrect===true 1個
  console.log('\n--- 検証 ---');
  let verifyOk    = true;
  let verifyTotal = 0;

  for (const entry of manifestEntries) {
    const { date } = entry;
    const outPath = path.join(DATA_DIR, `${date}.js`);
    try {
      const window = {};
      const code = fs.readFileSync(outPath, 'utf8');
      // eslint-disable-next-line no-new-func
      new Function('window', code)(window);

      const data = (window.QUIZ_DATA || {})[date];
      if (!data) throw new Error(`window.QUIZ_DATA["${date}"] が未定義`);
      if (!Array.isArray(data.questions)) throw new Error('questions が配列ではない');

      const qs = data.questions;
      verifyTotal += qs.length;

      for (let i = 0; i < qs.length; i++) {
        const q = qs[i];
        if (!Array.isArray(q.choices) || q.choices.length !== 4) {
          throw new Error(`q${i + 1}: choices が4個ではない (${q.choices ? q.choices.length : 'undefined'}個)`);
        }
        const correctCount = q.choices.filter(c => c.isCorrect === true).length;
        if (correctCount !== 1) {
          throw new Error(`q${i + 1}: isCorrect===true が${correctCount}個`);
        }
      }

      console.log(`[PASS] ${date}.js  ${qs.length}問`);
    } catch (err) {
      console.error(`[FAIL] ${date}.js: ${err.message}`);
      errors.push({ file: `${date}.js`, error: err.message });
      verifyOk = false;
    }
  }

  // 9. 質問数整合チェック
  console.log('\n--- 質問数整合 ---');
  console.log(`抽出元合計: ${totalExtracted}問`);
  console.log(`書き込み合計: ${totalWritten}問`);
  console.log(`検証合計: ${verifyTotal}問`);
  if (totalExtracted === totalWritten && totalWritten === verifyTotal) {
    console.log('[PASS] 質問数一致');
  } else {
    console.error('[FAIL] 質問数不一致');
    verifyOk = false;
  }

  // 10. 最終サマリ
  console.log('\n=== 完了 ===');
  if (errors.length === 0 && verifyOk) {
    console.log('すべて成功しました。');
  } else {
    console.error(`エラーが ${errors.length} 件ありました:`);
    for (const e of errors) {
      console.error(`  ${e.file}: ${e.error}`);
    }
    process.exit(1);
  }
}

main();
