window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260705"] = {
  date: "20260705",
  title: "畳み込み(fold)の評価順序と境界ケース",
  questions: [
    {
      id: "20260705-q1",
      question: "<code>foldl1 max</code> を空リスト <code>[]</code> に適用するとどうなるか?",
      code: `maximum' :: (Ord a) => [a] -> a
maximum' = <span class="keyword">foldl1</span> max`,
      choices: [
        { text: "コンパイルエラーになる", isCorrect: false },
        { text: "Nothingが返る", isCorrect: false },
        { text: "実行時エラーになる", isCorrect: true },
        { text: "型のデフォルト値がアキュムレータとして使われる", isCorrect: false }
      ],
      explanation: "foldl1/foldr1はリストの先頭(または末尾)要素を初期アキュムレータとして使うため、空リストでは初期値が取れず実行時エラーになる。"
    },
    {
      id: "20260705-q2",
      question: "foldl1/foldr1 が foldl/foldr と異なる点は何か?",
      choices: [
        { text: "初期アキュムレータを明示的に渡さず、リストの先頭(foldr1では末尾)要素を初期アキュムレータとして使う", isCorrect: true },
        { text: "リストの評価順序を変える", isCorrect: false },
        { text: "常に無限リストに対応できるようになる", isCorrect: false },
        { text: "型クラス制約が不要になる", isCorrect: false }
      ],
      explanation: "foldl1/foldr1は初期アキュムレータの引数を取らず、リストの端の要素をそのまま初期値として使う。空リストが渡されるとその前提が崩れるため実行時エラーになる。"
    },
    {
      id: "20260705-q3",
      question: "<code>foldr (+) 0 [3,4,5,6]</code> はどのように展開されるか?",
      code: `f 3 (f 4 (f 5 (f 6 z)))
<span class="comment">-- f=(+)、初期アキュムレータzが0の場合</span>`,
      choices: [
        { text: "(3+4)+(5+6)", isCorrect: false },
        { text: "((((0+6)+5)+4)+3)", isCorrect: false },
        { text: "0 + (6 + (5 + (4 + 3)))", isCorrect: false },
        { text: "3 + (4 + (5 + (6 + 0)))", isCorrect: true }
      ],
      explanation: "foldrはリストの最後の要素とアキュムレータから関数を適用し、それを先頭方向へ繰り返す。そのため展開は先頭要素が一番外側に来る形になる。"
    },
    {
      id: "20260705-q4",
      question: "<code>foldl (flip (:)) [] [3,4,5,6]</code> はどのように展開されるか?",
      code: `reverse' :: [a] -> [a]
reverse' = <span class="keyword">foldl</span> (flip (:)) []`,
      choices: [
        { text: "flip (:) 6 (flip (:) 5 (flip (:) 4 (flip (:) 3 [])))", isCorrect: false },
        { text: "flip (:) (flip (:) (flip (:) (flip (:) [] 3) 4) 5) 6", isCorrect: true },
        { text: "(:) 3 ((:) 4 ((:) 5 ((:) 6 [])))", isCorrect: false },
        { text: "foldr (flip (:)) [] [3,4,5,6] と全く同じ結果になる", isCorrect: false }
      ],
      explanation: "foldlはアキュムレータと先頭要素から順に関数を適用し、その結果を次の要素との適用に使う。そのため展開は先頭要素が一番内側から順に処理される形になる。"
    },
    {
      id: "20260705-q5",
      question: "<code>and' (repeat False)</code>(Falseの無限リスト)が停止して結果を返せるのはなぜか?",
      code: `and' :: [Bool] -> Bool
and' xs = <span class="keyword">foldr</span> (&&) True xs

<span class="comment">-- (&&)の定義</span>
(&&) :: Bool -> Bool -> Bool
True && x = x
False && _ = False`,
      choices: [
        { text: "(&&)の第一引数がFalseなら第二引数を評価せずに結果を返す短絡評価だから", isCorrect: true },
        { text: "foldrが内部で無限リストを有限に変換するから", isCorrect: false },
        { text: "GHCの遅延評価が一定時間で強制的に停止するから", isCorrect: false },
        { text: "foldrはfoldlと違い、常にリストの長さを事前に計算するから", isCorrect: false }
      ],
      explanation: "foldrは2番目の引数(残りの畳み込み)を必ずしも評価しない関数と組み合わさると無限リストでも動作する。(&&)は第一引数がFalseなら第二引数を評価しないため、repeat Falseでも最初のFalseで停止する。"
    },
    {
      id: "20260705-q6",
      question: "<code>last' = foldl1 (\\_ x -> x)</code> がリストの最後の要素を返す仕組みは?",
      code: `last' :: [a] -> a
last' = <span class="keyword">foldl1</span> (\\_ x -> x)`,
      choices: [
        { text: "最初の要素だけを保持し続ける", isCorrect: false },
        { text: "アキュムレータと現在要素の大きい方を返す", isCorrect: false },
        { text: "常に2番目の引数(現在の要素)を新しいアキュムレータとして返すため、最終的に最後の要素が残る", isCorrect: true },
        { text: "リストを逆順にしてから先頭を返す", isCorrect: false }
      ],
      explanation: "この関数は第一引数(アキュムレータ)を無視し、常に第二引数(現在処理中の要素)をそのまま返す。foldl1が要素を左から順に適用していくため、最終的にリストの最後の要素だけが残る。"
    }
  ]
};
