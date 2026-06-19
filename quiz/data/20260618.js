window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260618"] = {
  date: "20260618",
  title: "カリー化・部分適用・高階関数",
  questions: [
    {
      id: "20260618-q1",
      question: "<code>multiThree :: Int -> Int -> Int -> Int</code> は、カリー化を踏まえると本当はどう解釈されるか?",
      code: `multiThree :: Int -> Int -> Int -> Int`,
      choices: [
        { text: "<code>(Int -> Int -> Int) -> Int</code>(左結合)", isCorrect: false },
        { text: "<code>(Int, Int, Int) -> Int</code>(3要素タプルを取る)", isCorrect: false },
        { text: "<code>Int -> (Int -> (Int -> Int))</code>(右結合)", isCorrect: true },
        { text: "3引数すべてを同時に受け取る分割不可能な関数", isCorrect: false }
      ],
      explanation: "<code>-&gt;</code> は右結合。<code>Int -&gt; Int -&gt; Int -&gt; Int</code> は <code>Int -&gt; (Int -&gt; (Int -&gt; Int))</code> と同じで、Intを1つ受け取り「残りを処理する関数」を返す連鎖になっている。"
    },
    {
      id: "20260618-q2",
      question: "<code>max 4 5</code> は実際にはどう評価されるか?",
      code: `ghci> max 4 5
5
ghci> (max 4) 5
5`,
      choices: [
        { text: "<code>(max 4) 5</code> … <code>max 4</code> がまず「4と比較する関数」を返し、それに5を適用する", isCorrect: true },
        { text: "<code>max (4 5)</code> … 先に <code>4 5</code> を評価してからmaxに渡す", isCorrect: false },
        { text: "4と5を同時にmaxへ渡し、内部で一括比較する", isCorrect: false },
        { text: "<code>max</code> は2引数関数なので部分適用 <code>max 4</code> は型エラーになる", isCorrect: false }
      ],
      explanation: "関数適用は左結合なので <code>max 4 5</code> は <code>(max 4) 5</code>。<code>max 4</code> が1引数の関数を返し、そこに5を渡して評価される。"
    },
    {
      id: "20260618-q3",
      question: "カリー化された関数 <code>add x y = x + y</code> で、<code>add 3</code> を評価した時点では何が起きているか?",
      code: `add x y = x + y
let add3 = add 3`,
      choices: [
        { text: "<code>3 + 0</code> が計算され、結果の3が返る", isCorrect: false },
        { text: "引数不足の例外が投げられる", isCorrect: false },
        { text: "<code>x + y</code> の計算が即座に行われ数値が返る", isCorrect: false },
        { text: "計算はまだ行われず、3を覚えて次の引数を待つ関数が返る", isCorrect: true }
      ],
      explanation: "カリー化では最後の引数が揃うまで実際の計算は始まらない。<code>add 3</code> は「3を足す関数」を返すだけで、<code>add3 5</code> のように2個目が来て初めて <code>3 + 5</code> が評価される。"
    },
    {
      id: "20260618-q4",
      question: "<code>let multiTwoWithNine = multiThree 9</code> としたとき、<code>multiTwoWithNine</code> はどんな関数か?",
      code: `multiThree x y z = x * y * z
ghci> let multiTwoWithNine = multiThree 9
ghci> multiTwoWithNine 2 3
54`,
      choices: [
        { text: "引数を取らず、常に9を返す定数", isCorrect: false },
        { text: "残り2つの引数を取り <code>9 * y * z</code> を計算する関数", isCorrect: true },
        { text: "3つの引数すべてを必要とする元の <code>multiThree</code> と同じ関数", isCorrect: false },
        { text: "9と次の1引数だけで計算を完了する関数", isCorrect: false }
      ],
      explanation: "<code>multiThree 9</code> は部分適用で、<code>x</code> に9を固定し残りの <code>y</code>, <code>z</code> を待つ関数になる。<code>multiTwoWithNine 2 3</code> は <code>9 * 2 * 3 = 54</code>。"
    },
    {
      id: "20260618-q5",
      question: "<code>compareWithHundred x = compare 100 x</code> のとき <code>compareWithHundred 99</code> が <code>GT</code> を返すのはなぜか?",
      code: `compareWithHundred x = compare 100 x
ghci> compareWithHundred 99
GT`,
      choices: [
        { text: "99が引数として後ろにあり、後ろの値が常にGTになるから", isCorrect: false },
        { text: "<code>compare</code> は常に最初の引数を基準にGTを返すから", isCorrect: false },
        { text: "評価されるのは <code>compare 100 99</code> で、100が99より大きいから", isCorrect: true },
        { text: "部分適用された関数は比較結果を反転させるから", isCorrect: false }
      ],
      explanation: "<code>compareWithHundred 99</code> は <code>compare 100 99</code> に等しい。<code>compare</code> は第1引数が第2引数より大きいとき <code>GT</code> を返すので、<code>100 &gt; 99</code> より <code>GT</code>。"
    },
    {
      id: "20260618-q6",
      question: "「高階関数(higher-order function)」の定義として正しいものはどれか?",
      code: `applyTwice f x = f (f x)`,
      choices: [
        { text: "引数として関数を取る、または返り値として関数を返す関数", isCorrect: true },
        { text: "2つ以上の引数を取るすべての関数", isCorrect: false },
        { text: "再帰的に自分自身を呼び出す関数", isCorrect: false },
        { text: "型クラス制約を持つ関数", isCorrect: false }
      ],
      explanation: "高階関数は関数を引数に取るか関数を返す関数。カリー化により複数引数の関数は「関数を返す関数」なので、Haskellの多くの関数は本質的に高階関数である。"
    }
  ]
};
