window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260706"] = {
  date: "20260706",
  title: "scanl/scanl1と$演算子",
  questions: [
    {
      id: "20260706-q1",
      question: "<code>scanl1 (+) [1,2,3,4]</code> の結果はどれか?",
      code: `ghci&gt; scanl1 (+) [1,2,3,4]`,
      choices: [
        { text: "[1,3,6,10]", isCorrect: true },
        { text: "10", isCorrect: false },
        { text: "[10,6,3,1]", isCorrect: false },
        { text: "[0,1,3,6,10]", isCorrect: false }
      ],
      explanation: "scanl1はfoldl1と同様に初期値なしでリストの先頭要素を初期アキュムレータとして使うが、最終結果だけでなく全ての中間アキュムレータ状態をリストとして返す。"
    },
    {
      id: "20260706-q2",
      question: "<code>sqrtSums</code> の定義末尾で <code>+ 1</code> が必要な理由は何か?",
      code: `sqrtSums :: Int
sqrtSums = length (takeWhile (&lt; 1000) (scanl1 (+) (map sqrt [1..]))) + 1`,
      choices: [
        { text: "takeWhileはリストの先頭要素を含まないため、要素数を1個分補正する必要があるから", isCorrect: false },
        { text: "takeWhileで得られる要素数は「累積和が1000未満である項数」なので、1000を超える最後の一項を追加でカウントするため", isCorrect: true },
        { text: "scanl1は初項を含まないため、先頭のsqrt 1をカウントし忘れるから", isCorrect: false },
        { text: "sumは0から始まるため、リストの長さより常に1小さくなるから", isCorrect: false }
      ],
      explanation: "takeWhile (< 1000)で数えられるのは累積和が1000未満に留まっている項数。実際に1000を超えるのに必要な項数はそれより1つ多いため+1する。"
    },
    {
      id: "20260706-q3",
      question: "<code>sum $ filter (&gt; 10) $ map (*2) [2..10]</code> が <code>sum (filter (&gt; 10) (map (*2) [2..10]))</code> と同じ結果になるのはなぜか?",
      code: `ghci&gt; sum $ filter (&gt; 10) $ map (*2) [2..10]
80`,
      choices: [
        { text: "$は左結合で、最も優先順位が高いから", isCorrect: false },
        { text: "$は演算子ではなく特殊構文で、コンパイラが自動的に括弧を補完するから", isCorrect: false },
        { text: "$は右結合かつ最も優先順位が低いため、右側の式全体がまとめて左側の関数の引数になるから", isCorrect: true },
        { text: "filterとmapが可換であるため、どちらの順序で書いても同じになるから", isCorrect: false }
      ],
      explanation: "$は通常の関数適用(最高優先順位)とは逆に最も低い優先順位を持つ右結合演算子。そのため右側の式全体を1つの引数としてまとめ、括弧を省略できる。"
    },
    {
      id: "20260706-q4",
      question: "<code>map ($ 3) [(4+), (10*), (^2), sqrt]</code> の結果が <code>[7.0,30.0,9.0,1.7320508075688772]</code> となり、<code>(4+) 3</code> 単体の型であるInt由来の <code>7</code> ではなく <code>7.0</code> になるのはなぜか?",
      code: `ghci&gt; map ($ 3) [(4+), (10*), (^2), sqrt]
[7.0,30.0,9.0,1.7320508075688772]`,
      choices: [
        { text: "($ 3)という関数適用のセクションが自動的にDoubleへ変換するから", isCorrect: false },
        { text: "mapは常に浮動小数点数のリストを返す関数だから", isCorrect: false },
        { text: "GHCiの表示上の都合で、実際の値はIntのまま7だが表示だけ7.0になる", isCorrect: false },
        { text: "リスト内にsqrtが含まれているため、リスト全体の要素の型がFloating制約を満たす同一の型(Double)に統一されるから", isCorrect: true }
      ],
      explanation: "同じリストの要素は全て同じ型でなければならない。sqrtがFloating aを要求するため、(4+)や(10*)や(^2)もDoubleとして解釈され、結果が7.0のように浮動小数点表記になる。"
    },
    {
      id: "20260706-q5",
      question: "メモの記述に基づくと、scanl1とfoldl1の関係を正しく説明しているのはどれか?",
      code: null,
      choices: [
        { text: "scanl1は空リストに対して安全に空リストを返すが、foldl1はエラーになる点だけが異なる", isCorrect: false },
        { text: "scanl1はfoldl1のアナロジーであり、最終結果だけでなく全ての中間アキュムレータ状態をリストとして返す点が異なる", isCorrect: true },
        { text: "foldl1は中間状態をすべて返すのに対し、scanl1は最終結果のみを返す", isCorrect: false },
        { text: "scanl1とfoldl1はどちらも初期値を第一引数に明示的に渡す必要がある点で共通する", isCorrect: false }
      ],
      explanation: "scanl1・foldl1はともにリストの先頭要素を初期アキュムレータとして使う。違いはscanl1が中間状態を全てリストとして返すのに対し、foldl1は最終結果のみを返す点。"
    }
  ]
};
