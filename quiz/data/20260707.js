window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260707"] = {
  date: "20260707",
  title: "関数合成(.)",
  questions: [
    {
      id: "20260707-q1",
      question: "<code>(f . g) x</code> の定義として正しいものはどれか?",
      code: `(.) :: (b -> c) -> (a -> b) -> a -> c
f . g = \\x -> f (g x)`,
      choices: [
        { text: "g (f x)", isCorrect: false },
        { text: "f (g x)", isCorrect: true },
        { text: "(f x, g x) のタプル", isCorrect: false },
        { text: "f x `seq` g x", isCorrect: false }
      ],
      explanation: "f . g = \\x -> f (g x) と定義されている。xにまずgを適用し、その結果をfに渡す。gが先、fが後に適用される。"
    },
    {
      id: "20260707-q2",
      question: "<code>(.) :: (b -> c) -> (a -> b) -> a -> c</code> の型において、fが引数として受け取る値の型はどれか?",
      code: `(.) :: (b -> c) -> (a -> b) -> a -> c`,
      choices: [
        { text: "a", isCorrect: false },
        { text: "c", isCorrect: false },
        { text: "b", isCorrect: true },
        { text: "aとcの両方を受け取れる多相型", isCorrect: false }
      ],
      explanation: "fの型は b -> c。gの型は a -> b であり、gの返り値の型bをfの引数として渡す必要があるため、fが受け取れるのはbのみ。"
    },
    {
      id: "20260707-q3",
      question: "<code>map (negate . abs) [5,-3,-6,7,-3,2,-19,24]</code> と同じ結果を返すラムダ式はどれか?",
      code: `map (negate . abs) [5,-3,-6,7,-3,2,-19,24]`,
      choices: [
        { text: "\\x -> negate (abs x)", isCorrect: true },
        { text: "\\x -> abs (negate x)", isCorrect: false },
        { text: "\\x -> negate x - abs x", isCorrect: false },
        { text: "\\x -> abs x + negate x", isCorrect: false }
      ],
      explanation: "f . g = \\x -> f (g x) なので、negate . abs は \\x -> negate (abs x) と等価。absが先に適用され、その結果にnegateが適用される。"
    },
    {
      id: "20260707-q4",
      question: "<code>negate . sum . tail</code> を <code>[1..5]</code> に適用したとき、最初に適用される関数はどれか?",
      code: `map (negate . sum . tail) [[1..5],[3..6],[1..7]]`,
      choices: [
        { text: "negate", isCorrect: false },
        { text: "sum", isCorrect: false },
        { text: "3つとも同時にまとめて評価される", isCorrect: false },
        { text: "tail", isCorrect: true }
      ],
      explanation: "合成関数は右側から順に適用される。f . g . h = \\x -> f (g (h x)) なので、最初にtail、次にsum、最後にnegateが適用される。"
    },
    {
      id: "20260707-q5",
      question: "関数合成 <code>f . g</code> が型エラーにならないための条件として正しいものはどれか?",
      code: `(.) :: (b -> c) -> (a -> b) -> a -> c`,
      choices: [
        { text: "fとgの引数の型が同じであること", isCorrect: false },
        { text: "gの返り値の型とfが受け取る引数の型が一致していること", isCorrect: true },
        { text: "fとgの返り値の型が同じであること", isCorrect: false },
        { text: "fとgが両方とも同じ型シグネチャを持つこと", isCorrect: false }
      ],
      explanation: "gの型は a -> b、fの型は b -> c。gの返り値の型bとfが受け取る引数の型が一致していなければ型エラーになる。"
    }
  ]
};
