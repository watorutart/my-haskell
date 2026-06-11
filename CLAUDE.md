# my-haskell

Haskell学習リポジトリ。日々の学習メモからクイズを生成して復習する。

## ディレクトリ構成

```
study-memo/YYYYMMDD/   学習メモ(.md + .hs)。クイズ生成の唯一の入力
quiz/
  index.html           クイズアプリ本体(ダッシュボード + クイズ画面。1ファイル自己完結)
  data/
    manifest.js        全クイズの日付・タイトル・問題数の一覧
    YYYYMMDD.js        日ごとのクイズデータ(window.QUIZ_DATA 形式)
  archive/             旧形式の自己完結HTML。参照用。今後は追加しない
docs/
  quiz-system-spec.md  クイズシステムの設計仕様書
.claude/skills/quiz-gen/SKILL.md  クイズ生成スキル(/quiz-gen)
```

## 日々の運用

1. `study-memo/YYYYMMDD/` に学習メモ(.md)とコード(.hs)を書く
2. `/quiz-gen` を実行してクイズデータを生成する
3. ブラウザで `quiz/index.html` が開く

## 注意事項

- `quiz/index.html` のCSS・JS・アニメーション・confetti演出はSNS動画撮影用のため変更しない
- クイズデータ(quiz/data/YYYYMMDD.js)のみをAIが生成し、HTMLテンプレートはAIに生成させない
