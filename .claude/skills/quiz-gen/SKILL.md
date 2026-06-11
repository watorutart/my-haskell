---
name: quiz-gen
description: 当日のstudy-memoからHaskellクイズデータ(quiz/data/YYYYMMDD.js)を生成しブラウザで開く
---

# クイズ生成スキル

## 手順

### 1. 当日のメモを読む

今日の日付(YYYYMMDD)から `study-memo/YYYYMMDD/` 直下の `.md` と `.hs` ファイルだけを読む。
それ以外のファイルは読まない。

### 2. 質問を作る

- 問題数: 3〜10問(メモの分量・トピック数に応じて可変)
- 形式: 4択・正解1つ
- 方針: ひっかけ・概念理解重視。「なぜその挙動になるか」を問う。単純な用語暗記にしない
  - コア構文・演算子の落とし穴(スコープ、評価順序、型など)
  - 関数の境界ケース・型の違い
  - 今日のメモに登場した新概念・挙動の理由
- 解説は機械的・事実ベースで簡潔に。励まし文言は一切入れない

### 3. データファイルを出力する

`quiz/data/YYYYMMDD.js` を以下の形式で書き出す。

**同日のデータファイルが既に存在する場合は上書きせず、ユーザに確認すること。**

コードブロックには `<span class="keyword">` / `<span class="comment">` のハイライトHTMLを使ってよい。

```js
window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260610"] = {
  date: "20260610",
  title: "リスト内包表記とlet束縛",
  questions: [
    {
      id: "20260610-q1",
      question: "リスト内包表記の中で <code>let bmi = w / h ^ 2</code> と書いたとき、<code>bmi</code> はどこから参照できるか?",
      code: `calcBmis xs = [bmi | (w, h) <- xs, <span class="keyword">let</span> bmi = w / h ^ 2, bmi > 25.0]`,
      choices: [
        { text: "そのletより前のジェネレータからのみ", isCorrect: false },
        { text: "出力部分と、そのletより後ろの述語・バインドから", isCorrect: true },
        { text: "リスト内包表記の外側のスコープのみ", isCorrect: false },
        { text: "どこからも参照できない。letはフィルタ専用", isCorrect: false }
      ],
      explanation: "let束縛はその位置より後ろの述語・バインドおよび出力式から参照できる。ジェネレータ <code>(w, h) &lt;- xs</code> はletより前に定義されるため、bmiはそこからは見えない。"
    }
  ]
};
```

### 4. manifest.js を更新する

`quiz/data/manifest.js` を読み込み、新しいエントリを日付昇順で追記する。

```js
window.QUIZ_MANIFEST = [
  { date: "20260525", title: "リスト・レンジ・型", count: 3 },
  { date: "20260610", title: "リスト内包表記とlet束縛", count: 5 }
  // 日付昇順を維持する
];
```

### 5. ブラウザで開いて報告する

```bash
open quiz/index.html
```

チャットにトピックの要約を一言報告する(1〜2文、事実ベース)。
