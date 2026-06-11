window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260602"] = {
  date: "20260602",
  title: "タプルとパターンマッチ",
  questions: [
  {
    "id": "20260602-q1",
    "question": "Haskellのタプルに対するパターンマッチングについて説明した次の記述のうち、<b>誤っているもの</b>はどれですか？",
    "code": "<span class=\"comment\">-- Haskellのタプルパターンマッチの例</span>\n<span class=\"function\">addVectors</span> <span class=\"keyword\">::</span> (<span class=\"type\">Double</span>, <span class=\"type\">Double</span>) <span class=\"keyword\">-></span> (<span class=\"type\">Double</span>, <span class=\"type\">Double</span>) <span class=\"keyword\">-></span> (<span class=\"type\">Double</span>, <span class=\"type\">Double</span>)\n<span class=\"function\">addVectors</span> (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)",
    "choices": [
      {
        "text": "(x1, y1) というパターンは、任意の2要素タプルにマッチし、その要素を取り出して変数 x1, y1 にバインドする。",
        "isCorrect": false
      },
      {
        "text": "タプルのサイズ（要素数）が異なる場合（例えば2要素タプルと3要素タプル）でも、同じパターン (x, y) でマッチさせることができる。",
        "isCorrect": true
      },
      {
        "text": "関数の引数定義でタプルのパターンマッチを直接行うことができるため、要素を取り出す記述を簡潔にできる。",
        "isCorrect": false
      },
      {
        "text": "パターンマッチの左辺で _（ワイルドカード）を使用することで、特定の要素を無視してマッチさせることができる。",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellでは、タプルの<b>サイズ（要素数・Arity）は型の一部</b>として厳密に区別されます。そのため、2要素タプルを表すパターン <code>(x, y)</code> は、3要素タプル <code>(a, b, c)</code> にマッチさせることはできず、型エラーになります。サイズが異なるタプルは全く別の型として扱われます。"
  },
  {
    "id": "20260602-q2",
    "question": "以下の3要素タプル（トリプル）を分解する関数群があるとき、式 <code style='color: var(--accent-primary); font-family: \"JetBrains Mono\", monospace;'>second (first (1, 2, 3), \"Haskell\", True)</code> の評価結果として正しいものはどれですか？",
    "code": "<span class=\"function\">first</span> <span class=\"keyword\">::</span> (a,b,c) <span class=\"keyword\">-></span> a\n<span class=\"function\">first</span> (x, _, _) = x\n\n<span class=\"function\">second</span> <span class=\"keyword\">::</span> (a,b,c) <span class=\"keyword\">-></span> b\n<span class=\"function\">second</span> (_, y, _) = y",
    "choices": [
      {
        "text": "1",
        "isCorrect": false
      },
      {
        "text": "2",
        "isCorrect": false
      },
      {
        "text": "\"Haskell\"",
        "isCorrect": true
      },
      {
        "text": "True",
        "isCorrect": false
      }
    ],
    "explanation": "1. まず内側の <code>first (1, 2, 3)</code> が評価されます。関数 <code>first</code> は3要素タプルの最初の要素を取り出すため、結果は <code>1</code> になります。<br>2. 次に、これを使って新しい3要素タプルが作られます。具体的には <code>(1, \"Haskell\", True)</code> です。<br>3. 最後に <code>second (1, \"Haskell\", True)</code> が評価されます。関数 <code>second</code> は3要素タプルの2番目の要素を取り出すため、結果は <code>\"Haskell\"</code> になります。"
  },
  {
    "id": "20260602-q3",
    "question": "3要素タプルから3番目の要素を取り出す関数 <code style='color: var(--accent-primary); font-family: \"JetBrains Mono\", monospace;'>third</code> の定義において、<code style='color: var(--accent-primary); font-family: \"JetBrains Mono\", monospace;'>_</code> （ワイルドカード）の役割として正しいものはどれですか？",
    "code": "<span class=\"function\">third</span> <span class=\"keyword\">::</span> (a,b,c) <span class=\"keyword\">-></span> c\n<span class=\"function\">third</span> (_, _, z) = z",
    "choices": [
      {
        "text": "任意の型の値にマッチするが、その値は変数に束縛せず無視することを示す。",
        "isCorrect": true
      },
      {
        "text": "マッチした要素の値を _ という名前の変数として後続の処理で参照できるようにする。",
        "isCorrect": false
      },
      {
        "text": "リストのパターンマッチングでのみ使用可能であり、タプルのパターンマッチングではコンパイルエラーを引き起こす。",
        "isCorrect": false
      },
      {
        "text": "Maybe 型の Nothing 値にのみマッチすることを示す。",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellにおける <code>_</code>（ワイルドカード）は、「どんな値にもマッチするが、その値を使わないので変数に束縛しない」ことを明示するための特別なパターンです。この問題の <code>third</code> 関数では、1番目と2番目の要素はどうでもよいため <code>_</code> で無視し、3番目の要素だけを変数 <code>z</code> に束縛してそのまま返しています。"
  }
]
};
