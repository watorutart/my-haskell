window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260610"] = {
  date: "20260610",
  title: "リスト内包表記内のletとGHCiのletスコープ",
  questions: [
  {
    "id": "20260610-q1",
    "question": "以下の <code>calcBmis</code> 関数のように、リスト内包表記の中で <code>let</code> 束縛を使用する場合の変数 <code>bmi</code> のスコープに関する説明として、最も適切なものはどれですか？",
    "code": "calcBmis :: [(Double, Double)] <span class=\"keyword\">-&gt;</span> [Double]\ncalcBmis xs = [bmi | (w, h) <span class=\"keyword\">&lt;-</span> xs, <span class=\"keyword\">let</span> bmi = w / h ^ 2, bmi &gt; 25.0]",
    "choices": [
      {
        "text": "<code>let</code> で定義された <code>bmi</code> は、リスト内包表記の出力部分（<code>|</code> の左側）と、その <code>let</code> より後ろに記述されたすべての式（<code>bmi &gt; 25.0</code> など）から参照できる",
        "isCorrect": true
      },
      {
        "text": "<code>let</code> で定義された <code>bmi</code> は、それより前に定義されているジェネレータ（<code>(w, h) &lt;- xs</code>）の内部からも直接参照できる",
        "isCorrect": false
      },
      {
        "text": "<code>let</code> 束縛はフィルター条件（述語）としてのみ機能し、出力部分（<code>|</code> の左側）から <code>bmi</code> を参照することはできない",
        "isCorrect": false
      },
      {
        "text": "リスト内包表記内の <code>let</code> は特殊なため、<code>in</code> パートを伴わない記述は常にコンパイルエラーになる",
        "isCorrect": false
      }
    ],
    "explanation": "リスト内包表記の中の <code>let</code> で定義された変数は、リスト内包表記の出力部分（<code>|</code> の左側）および、その <code>let</code> よりも後に書かれたすべての部分（条件式や追加のジェネレータなど）から参照することができます。<br>しかし、その <code>let</code> より前に書かれたジェネレータ（この例では <code>(w, h) &lt;- xs</code>）からは参照できません。"
  },
  {
    "id": "20260610-q2",
    "question": "GHCi（対話環境）で <code>let</code> 式を入力した際、<code>in</code> パートを「含める場合」と「省略する場合」の動作の違いとして正しいものはどれですか？",
    "code": "<span class=\"comment\">-- パターンA</span>\nghci&gt; <span class=\"keyword\">let</span> zoot x y z = x * y + z\n\n<span class=\"comment\">-- パターンB</span>\nghci&gt; <span class=\"keyword\">let</span> boot x y z = x * y + z <span class=\"keyword\">in</span> boot 3 4 2",
    "choices": [
      {
        "text": "パターンAのように <code>in</code> を省略するとそのバインドは以降の対話セッション全体で有効になり、パターンBのように <code>in</code> を含めるとそのスコープはその式（<code>in</code> に続く部分）のみに限定される",
        "isCorrect": true
      },
      {
        "text": "パターンBのように <code>in</code> を含めると、GHCiは定義をセッション全体に保存し、以降いつでも <code>boot</code> を呼び出せるようになる",
        "isCorrect": false
      },
      {
        "text": "パターンAのように <code>in</code> を省略した定義は、入力した直後の1回しか呼び出せず、すぐにスコープ外になる",
        "isCorrect": false
      },
      {
        "text": "どちらのパターンで定義しても、GHCi内での有効期限やスコープの範囲に違いはない",
        "isCorrect": false
      }
    ],
    "explanation": "GHCiで <code>let</code> 式の <code>in</code> パートを省略した場合（パターンA）、定義された名前（<code>zoot</code>）はそれ以降のセッション全体で有効になります。<br>一方、<code>in</code> パートを含めた <code>let</code> 式（パターンB）はそれ自体が独立した「値」を表す式であり、定義された名前（<code>boot</code>）のスコープは <code>in</code> の後ろの式（<code>boot 3 4 2</code>）の中に限定されます。そのため、評価が完了した後は <code>boot</code> はスコープ外となり、再度呼び出すと <code>Variable not in scope</code> エラーが発生します。"
  },
  {
    "id": "20260610-q3",
    "question": "以下のリスト内包表記を Haskell で評価したときの戻り値として正しいものはどれですか？",
    "code": "[y | x <span class=\"keyword\">&lt;-</span> [1, 2, 3], <span class=\"keyword\">let</span> y = x * 2, y &gt; 3]",
    "choices": [
      {
        "text": "<code>[4, 6]</code>",
        "isCorrect": true
      },
      {
        "text": "<code>[2, 4, 6]</code>",
        "isCorrect": false
      },
      {
        "text": "<code>[1, 2, 3]</code>",
        "isCorrect": false
      },
      {
        "text": "変数スコープのエラー（コンパイルエラー）が発生する",
        "isCorrect": false
      }
    ],
    "explanation": "このコードはリスト <code>[1, 2, 3]</code> から取り出した各要素 <code>x</code> に対して、<code>let y = x * 2</code> で <code>y</code> を束縛し、その <code>y</code> が <code>y &gt; 3</code> という条件を満たすかどうかを判定しています。<br>1. <code>x = 1</code> のとき、<code>y = 2</code> となり、<code>y &gt; 3</code> は偽なので除外されます。<br>2. <code>x = 2</code> のとき、<code>y = 4</code> となり、<code>y &gt; 3</code> は真なので <code>y</code> (値 4) がリストに含まれます。<br>3. <code>x = 3</code> のとき、<code>y = 6</code> となり、<code>y &gt; 3</code> は真なので <code>y</code> (値 6) がリストに含まれます。<br>したがって、結果は <code>[4, 6]</code> となります。"
  }
]
};
