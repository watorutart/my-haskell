# Haskellクイズシステム 設計仕様書

日々の学習メモからAIがクイズデータを生成し、共有の静的アプリで「当日クイズ」「過去クイズ」「復習モード」を提供する。
トークン消費を抑えるため、AIが生成するのは質問データのみ(HTMLテンプレートは生成しない)。

## ディレクトリ構成

```
quiz/
  index.html          # アプリ本体(ダッシュボード + クイズ画面)。1ファイル自己完結
  data/
    manifest.js       # 全クイズの日付一覧
    YYYYMMDD.js       # 日ごとの質問データ
  archive/
    YYYYMMDD_quiz.html  # 旧形式の自己完結HTML(参照用に保管、今後は追加しない)
study-memo/YYYYMMDD/  # 学習メモ(.md + .hs)。クイズ生成の唯一の入力
scripts/
  migrate_quizzes.js  # 旧HTML→新データ形式の移行スクリプト(使い捨て)
.claude/skills/quiz-gen/SKILL.md  # クイズ生成スキル(/quiz-gen)
```

## データ形式

### quiz/data/YYYYMMDD.js

`file://` で動作させるため fetch は使わず、`<script>` タグで読み込む JS ファイルにする。

```js
window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260610"] = {
  date: "20260610",
  title: "リスト内包表記とlet束縛",   // 学習トピックの短い表現
  questions: [
    {
      id: "20260610-q1",            // {date}-q{連番} で安定IDを付与
      question: "質問テキスト(HTML可)",
      code: `Haskellコード(<span class="keyword">等のハイライトHTML可)`,
      choices: [
        { text: "選択肢A", isCorrect: false },
        { text: "選択肢B", isCorrect: true },
        { text: "選択肢C", isCorrect: false },
        { text: "選択肢D", isCorrect: false }
      ],
      explanation: "解説(機械的・事実ベースで簡潔に。励まし文言は不要)"
    }
  ]
};
```

### quiz/data/manifest.js

```js
window.QUIZ_MANIFEST = [
  { date: "20260525", title: "リスト・レンジ・型", count: 3 },
  // 日付昇順
];
```

クイズ生成時にスキルがエントリを1行追記する(日付昇順を維持)。

## アプリ (quiz/index.html)

### デザイン原則
**既存テンプレート(`quiz/archive/20260610_quiz.html`)のCSS/JS/演出を改変最小で流用する。**
SNS動画撮影に使うため、クイズ画面の見た目・アニメーション・confetti演出は現状維持が必須。

### 画面
1. **ダッシュボード(初期画面)**
   - 「最新のクイズ」ボタン(manifestの末尾日付を開く)
   - 復習モード: 問題数セレクタ(5/10/20) + 開始ボタン
   - 過去のクイズ一覧(日付・タイトル・問題数)
2. **クイズ画面** — 既存テンプレートと同一UI。追加点:
   - 結果画面に「ダッシュボードへ戻る」ボタン
   - 回答のたびに localStorage へ正誤を記録(下記)
3. **復習モード** — 全データファイルの質問プールからランダムN問抽出。
   - 選択肢の順序もシャッフルする
   - サブタイトルは「復習 — 全期間からN問」
   - UIはクイズ画面と共通

### データ読み込み
manifest.js を `<script>` で静的に読み込み、各 `data/YYYYMMDD.js` は
動的に `<script>` 要素を append してロード完了を待ってから初期化する
(`file://` でも動作する。fetch/XHRは使わない)。

### 成績記録(localStorage)
拡張用の記録のみ。UIには出さない。

- キー: `haskellQuizHistory`
- 値: `{ "<questionId>": { attempts: number, correct: number, last: "ISO8601" } }`
- 回答確定時に該当IDを更新する

## 移行スクリプト (scripts/migrate_quizzes.js)

Node製・使い捨て。全 `quiz/*_quiz.html` (14ファイル) に対して:

1. `const quizData = [` 〜対応する `];` を抽出し、`new Function` で評価して配列を得る
2. `<p class="subtitle">` から「— 」と「についての」の間をタイトルとして抽出(失敗時はサブタイトル全文)
3. 各質問に `{date}-q{n}` のIDを付与し `quiz/data/YYYYMMDD.js` を出力
4. `quiz/data/manifest.js` を生成(日付昇順)
5. 旧HTMLを `quiz/archive/` へ移動

検証: 全データファイルが node で require/評価可能なこと、質問数の合計が抽出元と一致すること。

## クイズ生成スキル (.claude/skills/quiz-gen/SKILL.md)

`/quiz-gen` で起動。HTMLテンプレートは含めない(約50行のスキルにする)。

1. 当日の `study-memo/YYYYMMDD/` の .md と .hs を読む(**それ以外は読まない**)
2. 3〜10問(メモ分量で可変)、4択、ひっかけ・概念理解重視で質問を作る
   - 解説は機械的・事実ベースで簡潔に
3. `quiz/data/YYYYMMDD.js` を本仕様のデータ形式で出力
4. `quiz/data/manifest.js` にエントリを追記(日付昇順維持)
5. `open quiz/index.html` でブラウザを開き、トピックの要約を一言報告する
