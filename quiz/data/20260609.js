window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260609"] = {
  date: "20260609",
  title: "let式",
  questions: [
  {
    "id": "20260609-q1",
    "question": "Haskellの <code>let</code> 式について、以下の関数の戻り値はどうなるでしょうか？",
    "code": "<span class=\"keyword\">calcVal</span> :: <span class=\"keyword\">Int</span>\ncalcVal = <span class=\"keyword\">let</span> x = 5\n              y = 3\n          <span class=\"keyword\">in</span> x * y + <span class=\"keyword\">let</span> x = 2 <span class=\"keyword\">in</span> x * y",
    "choices": [
      {
        "text": "21",
        "isCorrect": true
      },
      {
        "text": "30",
        "isCorrect": false
      },
      {
        "text": "19",
        "isCorrect": false
      },
      {
        "text": "25",
        "isCorrect": false
      }
    ],
    "explanation": "<code>let</code>式は局所的なスコープを持ち、入れ子（ネスト）にすることができます。<br>外側の <code>let</code> で <code>x = 5</code>, <code>y = 3</code> が束縛されています。<br>式 <code>x * y + let x = 2 in x * y</code> のうち、最初の <code>x * y</code> は <code>5 * 3 = 15</code> になります。<br>後半の <code>let x = 2 in x * y</code> では、内側の <code>x</code> が <code>2</code> として再定義（シャドウイング）されますが、<code>y</code> は外側で定義された <code>3</code> がそのまま使われます。したがって、後半部分は <code>2 * 3 = 6</code> となり、全体の合計は <code>15 + 6 = 21</code> となります。"
  },
  {
    "id": "20260609-q2",
    "question": "Haskellにおける <code>let</code> 式と <code>where</code> 句の違いに関する説明として、<strong>誤っているもの</strong>はどれでしょうか？",
    "code": "<span class=\"comment\">-- let式とwhere句の使い分け</span>\ncylinder r h =\n    <span class=\"keyword\">let</span> sideArea = 2 * pi * r * h\n        topArea = pi * r ^ 2\n    <span class=\"keyword\">in</span> sideArea + 2 * topArea",
    "choices": [
      {
        "text": "let 式はそれ自体が値を持つ「式（expression）」であり、任意の式の内部などコード中のほとんどどんな場所でも記述できる。",
        "isCorrect": false
      },
      {
        "text": "where は「構文的な構え（syntactic construct）」であり、定義された関数のガード間で同じ束縛を利用できる。",
        "isCorrect": false
      },
      {
        "text": "let 式で定義された束縛は局所的であり、同じ関数内の異なるガード間で共有することはできない。",
        "isCorrect": false
      },
      {
        "text": "let 式の内部では、パターンマッチ（タプルの分解など）を使用することはできない。",
        "isCorrect": true
      }
    ],
    "explanation": "<code>let</code> 式と <code>where</code> 句の最大の違いの一つは、<code>let</code> は「式（自身が値を返す）」であるのに対し、<code>where</code> は「構文（関数定義などの一部）」である点です。<br>また、<code>let</code> で定義した変数のスコープは局所的であり、ガード間で共有することはできません（ガード全体から参照したい場合は <code>where</code> を使用します）。<br><code>let</code> 式の中では、<code>let (a, b) = (1, 2) in a + b</code> のようにパターンマッチを使用することができ、タプルを要素に分解して束縛することが可能です。したがって、「パターンマッチを使用できない」という記述は誤りです。"
  },
  {
    "id": "20260609-q3",
    "question": "リスト内包表記の中で <code>let</code> を使用する際、以下のコードの評価結果（<code>quizList</code> の値）はどうなるでしょうか？",
    "code": "<span class=\"keyword\">quizList</span> :: [<span class=\"keyword\">Int</span>]\nquizList = [doublePlusOne | x &lt;- [1, 2, 3], <span class=\"keyword\">let</span> doublePlusOne = x * 2 + 1]",
    "choices": [
      {
        "text": "[3, 5, 7]",
        "isCorrect": true
      },
      {
        "text": "[2, 4, 6]",
        "isCorrect": false
      },
      {
        "text": "[1, 2, 3]",
        "isCorrect": false
      },
      {
        "text": "構文エラー（in キーワードがないためコンパイルエラー）",
        "isCorrect": false
      }
    ],
    "explanation": "リスト内包表記（list comprehension）の内部では、<code>let</code> を <code>in</code> なしで使用することができます。<br>ここで定義された変数（この場合は <code>doublePlusOne</code>）は、そのリスト内包表記の出力式（<code>|</code> の左側）や、それ以降のジェネレータ・フィルタ内で利用できます。<br>各要素 <code>x</code> に対し、<code>doublePlusOne = x * 2 + 1</code> が評価されるため、結果は <code>[3, 5, 7]</code> となります。"
  }
]
};
