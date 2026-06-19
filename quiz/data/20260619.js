window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260619"] = {
  date: "20260619",
  title: "セクションと中置関数の部分適用",
  questions: [
    {
      id: "20260619-q1",
      question: "<code>divideByTen = (/10)</code> としたとき、<code>divideByTen 200</code> は何を計算するか?",
      code: `divideByTen :: (Floating a) => a -> a
divideByTen = (/10)`,
      choices: [
        { text: "<code>10 / 200</code>(値はセクションの左に入る)", isCorrect: false },
        { text: "<code>200 / 10</code>(欠けている左オペランドに引数が入る)", isCorrect: true },
        { text: "<code>200 / 200</code>(引数が両側に入る)", isCorrect: false },
        { text: "型エラー。<code>/</code> は部分適用できない", isCorrect: false }
      ],
      explanation: "セクション <code>(/10)</code> は欠けている側(左)に引数が入るので <code>\\x -&gt; x / 10</code>。<code>divideByTen 200</code> は <code>200 / 10 = 20.0</code>。"
    },
    {
      id: "20260619-q2",
      question: "<code>(/10)</code> と <code>(10/)</code> の違いとして正しいものはどれか?",
      code: `(/10) 200
(10/) 200`,
      choices: [
        { text: "どちらも <code>200 / 10 = 20.0</code> で同じ", isCorrect: false },
        { text: "<code>(10/)</code> は構文エラーになる", isCorrect: false },
        { text: "どちらも <code>10 / 200 = 0.05</code> で同じ", isCorrect: false },
        { text: "<code>(/10) 200</code> は <code>20.0</code>、<code>(10/) 200</code> は <code>0.05</code>", isCorrect: true }
      ],
      explanation: "引数は欠けている側に入る。<code>(/10) 200</code> = <code>200 / 10</code> = 20.0、<code>(10/) 200</code> = <code>10 / 200</code> = 0.05。値を置く側で割られる数か割る数かが変わる。"
    },
    {
      id: "20260619-q3",
      question: "セクションで <code>(-4)</code> と書くと何を意味するか?",
      code: `ghci> (-4)`,
      choices: [
        { text: "数値の <code>-4</code>(マイナス4)であって、引く関数にはならない", isCorrect: true },
        { text: "「4を引く関数」<code>\\x -&gt; x - 4</code>", isCorrect: false },
        { text: "「4から引く関数」<code>\\x -&gt; 4 - x</code>", isCorrect: false },
        { text: "符号反転する関数 <code>\\x -&gt; -x</code>", isCorrect: false }
      ],
      explanation: "<code>-</code> はマイナス演算子と単項の負号を兼ねるため、<code>(-4)</code> は負数 <code>-4</code> と解釈される。「4を引く関数」が欲しいときは <code>(subtract 4)</code> を使う。"
    },
    {
      id: "20260619-q4",
      question: "<code>isUpperAlphanum = (`elem` ['A'..'Z'])</code> はどんな関数か?",
      code: `isUpperAlphanum :: Char -> Bool
isUpperAlphanum = (\`elem\` ['A'..'Z'])`,
      choices: [
        { text: "<code>['A'..'Z']</code> の各要素が引数のリストに含まれるか調べる", isCorrect: false },
        { text: "引数を <code>['A'..'Z']</code> に追加した新しいリストを返す", isCorrect: false },
        { text: "引数の文字が <code>['A'..'Z']</code> に含まれるかを <code>Bool</code> で返す", isCorrect: true },
        { text: "<code>['A'..'Z']</code> の長さを返す", isCorrect: false }
      ],
      explanation: "<code>(`elem` ['A'..'Z'])</code> は <code>elem</code> の第2引数を固定したセクション。欠けた第1引数に渡した文字が <code>'A'</code>〜<code>'Z'</code> に含まれるかを判定する。"
    },
    {
      id: "20260619-q5",
      question: "GHCiで <code>multiThree 3 4</code> と打つとエラーになるのはなぜか?",
      code: `ghci> multiThree 3 4
<interactive>: error:
    No instance for 'Show (Int -> Int)'`,
      choices: [
        { text: "引数が足りず構文エラーになるから", isCorrect: false },
        { text: "<code>multiThree</code> は2引数までしか取れないから", isCorrect: false },
        { text: "<code>3 4</code> が無効な数値リテラルだから", isCorrect: false },
        { text: "結果が部分適用された関数で、関数は <code>Show</code> のインスタンスでなく表示できないから", isCorrect: true }
      ],
      explanation: "<code>multiThree 3 4</code> は3個目の引数を待つ関数 <code>(Int -&gt; Int)</code> を返す。GHCiは結果を <code>print</code> しようとするが、関数は <code>Show</code> のインスタンスでないため表示できずエラーになる。"
    },
    {
      id: "20260619-q6",
      question: "「引数から4を引く関数」をセクション風に正しく作る方法はどれか?",
      code: `-- 引数 x に対して x - 4 を返したい`,
      choices: [
        { text: "<code>(subtract 4)</code> を使う", isCorrect: true },
        { text: "<code>(-4)</code> を使う", isCorrect: false },
        { text: "<code>(- 4)</code> とスペースを空ける", isCorrect: false },
        { text: "<code>(4-)</code> を使う", isCorrect: false }
      ],
      explanation: "<code>(-4)</code> は負数 <code>-4</code> と解釈されてしまう。「4を引く関数」は <code>(subtract 4)</code> で表す(<code>subtract 4</code> を <code>x</code> に適用すると <code>x - 4</code>)。なお <code>(4-)</code> は <code>\\x -&gt; 4 - x</code> で意味が異なる。"
    }
  ]
};
