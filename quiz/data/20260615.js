window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260615"] = {
  date: "20260615",
  title: "再帰で作る reverse・repeat・zip・elem",
  questions: [
    {
      id: "20260615-q1",
      question: "<code>reverse'</code> の再帰部を <code>reverse' xs ++ [x]</code> ではなく <code>x : reverse' xs</code> と書いたら、どんな結果になるか?",
      code: `reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = x : reverse' xs  <span class="comment">-- 間違い版</span>`,
      choices: [
        { text: "コンパイルエラーになる(型が合わない)", isCorrect: false },
        { text: "入力と同じ順序のリストがそのまま返る", isCorrect: true },
        { text: "正しく逆順のリストが返る", isCorrect: false },
        { text: "無限ループになる", isCorrect: false }
      ],
      explanation: "<code>x : reverse' xs</code> は先頭 <code>x</code> を常に前に置くため、各要素の相対順序が保たれ、結果は入力と同じ並びになる(恒等関数と同じ)。逆順にするには <code>x</code> を末尾へ回す <code>reverse' xs ++ [x]</code> が必要。"
    },
    {
      id: "20260615-q2",
      question: "<code>repeat'</code> は基底部のない再帰なのに、<code>take 5 (repeat' 3)</code> はなぜ停止して <code>[3,3,3,3,3]</code> を返すのか?",
      code: `repeat' :: a -> [a]
repeat' x = x : repeat' x

take 5 (repeat' 3)`,
      choices: [
        { text: "repeat' は内部で5回までに上限が設定されているから", isCorrect: false },
        { text: "GHC が無限再帰を検出して自動で打ち切るから", isCorrect: false },
        { text: "遅延評価により take が必要とする先頭5要素しか評価されないから", isCorrect: true },
        { text: ": 演算子が6回目の呼び出しで例外を投げるから", isCorrect: false }
      ],
      explanation: "Haskell は遅延評価で、リストの末尾(<code>repeat' x</code> の続き)は必要になるまで評価されない。<code>take 5</code> は先頭5要素だけを要求するため、そこで評価が止まり無限リストでも結果が得られる。"
    },
    {
      id: "20260615-q3",
      question: "長さの違う <code>zip' [1,2,3] [7,8]</code> はどう評価されるか? また停止の決め手になる節はどれか?",
      code: `zip' _ [] = []
zip' [] _ = []
zip' (x:xs) (y:ys) = (x,y) : zip' xs ys`,
      choices: [
        { text: "[(1,7),(2,8)] になり、短い側が尽きて zip' _ [] = [] が一致して止まる", isCorrect: true },
        { text: "[(1,7),(2,8),(3,?)] になり、3 は単独で残る", isCorrect: false },
        { text: "長さが違うのでパターンマッチ失敗で実行時エラーになる", isCorrect: false },
        { text: "[(1,7),(2,8),(3,7)] のように短い側が先頭から再利用される", isCorrect: false }
      ],
      explanation: "<code>[3]</code> と <code>[]</code> まで再帰が進むと第2引数が空になり <code>zip' _ [] = []</code> が一致して終了する。結果は短い方の長さに揃い <code>[(1,7),(2,8)]</code> になる。"
    },
    {
      id: "20260615-q4",
      question: "<code>zip'</code> から2つ目の基底部 <code>zip' [] _ = []</code> を削除すると、どの呼び出しで問題が起きるか?",
      code: `zip' _ [] = []
<span class="comment">-- zip' [] _ = []  を削除</span>
zip' (x:xs) (y:ys) = (x,y) : zip' xs ys`,
      choices: [
        { text: "問題は起きない。1つ目の基底部だけで全ケースを覆える", isCorrect: false },
        { text: "zip' [] [] が無限ループになる", isCorrect: false },
        { text: "zip' [1] [2] が誤った結果を返す", isCorrect: false },
        { text: "zip' [] [7,8] が非網羅的パターンで実行時エラーになる", isCorrect: true }
      ],
      explanation: "第1引数が空・第2引数が非空のとき、<code>zip' _ []</code>(第2が空でない)も <code>zip' (x:xs) (y:ys)</code>(第1が空)も一致せず、パターンが網羅されない。両方向の空リストを基底部にする必要がある。"
    },
    {
      id: "20260615-q5",
      question: "<code>elem'</code> の <code>otherwise</code> 節 <code>a \`elem'\` xs</code> は何を表しているか?",
      code: `elem' :: (Eq a) => a -> [a] -> Bool
elem' a [] = False
elem' a (x:xs)
    | a == x    = True
    | otherwise = a \`elem'\` xs`,
      choices: [
        { text: "先頭 x と一致しなかったので False を即座に返す", isCorrect: false },
        { text: "先頭で見つからなかったので残り xs に対して同じ探索を再帰する", isCorrect: true },
        { text: "リスト全体をもう一度先頭から走査し直す", isCorrect: false },
        { text: "a と x を入れ替えてから比較をやり直す", isCorrect: false }
      ],
      explanation: "先頭 <code>x</code> が一致しなければ、残りの <code>xs</code> に同じ探索を委ねる末尾再帰。<code>xs</code> がいずれ空になれば基底部 <code>elem' a [] = False</code> に到達して終了する。バッククォートは関数を中置記法にしている。"
    }
  ]
};
