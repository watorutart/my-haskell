window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260601"] = {
  date: "20260601",
  title: "パターンマッチ",
  questions: [
  {
    "id": "20260601-q1",
    "question": "以下の関数定義に対して <code style='color: var(--accent-primary);'>lucky 7</code> を実行するとどのような結果になりますか？",
    "code": "<span class=\"function\">lucky</span> <span class=\"keyword\">::</span> <span class=\"type\">Int</span> <span class=\"keyword\">-></span> <span class=\"type\">String</span>\n<span class=\"function\">lucky</span> x = <span class=\"string\">\"Sorry, you're out of luck, pal!\"</span>\n<span class=\"function\">lucky</span> 7 = <span class=\"string\">\"LUCKY NUMBER SEVEN!\"</span>",
    "choices": [
      {
        "text": "\"LUCKY NUMBER SEVEN!\"",
        "isCorrect": false
      },
      {
        "text": "\"Sorry, you're out of luck, pal!\"",
        "isCorrect": true
      },
      {
        "text": "コンパイルエラーになる",
        "isCorrect": false
      },
      {
        "text": "実行時エラーになる",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellのパターンマッチは<b>上から順番</b>に評価されます。変数 <code>x</code> は任意の値（もちろん7にも）にマッチするため、最初のパターンが常に評価されてしまい、下の <code>lucky 7</code> のパターンには決して到達しません。具体的な値のパターンを先に書く必要があります。"
  },
  {
    "id": "20260601-q2",
    "question": "以下のコードに対して <code style='color: var(--accent-primary);'>charName 'h'</code> を実行するとどうなりますか？",
    "code": "<span class=\"function\">charName</span> <span class=\"keyword\">::</span> <span class=\"type\">Char</span> <span class=\"keyword\">-></span> <span class=\"type\">String</span>\n<span class=\"function\">charName</span> 'a' = <span class=\"string\">\"Albert\"</span>\n<span class=\"function\">charName</span> 'b' = <span class=\"string\">\"Broseph\"</span>\n<span class=\"function\">charName</span> 'c' = <span class=\"string\">\"Cecil\"</span>",
    "choices": [
      {
        "text": "\"Albert\"",
        "isCorrect": false
      },
      {
        "text": "空文字列 \"\" が返る",
        "isCorrect": false
      },
      {
        "text": "直前の関数の結果が返る",
        "isCorrect": false
      },
      {
        "text": "「Non-exhaustive patterns」という実行時エラーになる",
        "isCorrect": true
      }
    ],
    "explanation": "定義されていない値（この場合は 'a', 'b', 'c' 以外の文字）が渡された場合、Haskellはどのパターンにも合致しないため、実行時に例外（Non-exhaustive patterns）を投げます。これを防ぐためには、最後にすべての値に合致するキャッチオールパターン（例: <code>charName _ = ...</code> や変数）を記述する必要があります。"
  },
  {
    "id": "20260601-q3",
    "question": "全てのパターンを網羅していない等の問題を、コンパイル時に警告・エラーとして検知するためにソースコードの先頭に記述すると便利なオプション指定はどれですか？",
    "code": "<span class=\"comment\">-- ソースコードの先頭に記述するオプション指定</span>",
    "choices": [
      {
        "text": "{-# WARNING ALL #-}",
        "isCorrect": false
      },
      {
        "text": "{-# OPTIONS -Wall -Werror #-}",
        "isCorrect": true
      },
      {
        "text": "import Strict",
        "isCorrect": false
      },
      {
        "text": "SET STRICT_MODE = TRUE",
        "isCorrect": false
      }
    ],
    "explanation": "<code>{-# OPTIONS -Wall -Werror #-}</code> を指定することで、不完全なパターンマッチ（incomplete-patterns）や使われていない変数（unused-matches）など、さまざまな問題に対してコンパイラが警告を出し、それをエラーとして扱ってコンパイルを止めてくれます。安全なコードを書くために非常に有効です。"
  }
]
};
