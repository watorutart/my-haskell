window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260626"] = {
  date: "20260626",
  title: "zipWith'の実装と高階関数の応用",
  questions: [
    {
      id: "20260626-q1",
      question: "<code>zipWith'</code> の型 <code>(a -> b -> c) -> [a] -> [b] -> [c]</code> で、型変数が <code>a</code>, <code>b</code>, <code>c</code> と3種類あることの意味は?",
      code: `zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]`,
      choices: [
        { text: "a, b, c は必ず異なる型でなければならない", isCorrect: false },
        { text: "3つのリストを受け取ることを意味する", isCorrect: false },
        { text: "入力の2つのリストと出力リストの要素型がそれぞれ異なってもよい", isCorrect: true },
        { text: "c は必ず a と b のタプル <code>(a, b)</code> になる", isCorrect: false }
      ],
      explanation: "型変数が別名なのは「異なってもよい」という意味であり、「異なる必要がある」わけではない。実際 <code>zipWith' (+) [1,2] [3,4]</code> では a = b = c = Int のように同じ型にもなる。"
    },
    {
      id: "20260626-q2",
      question: "<code>zipWith' (+) [1,2,3] [10,20]</code> のように長さが異なるリストを渡した場合、結果はどうなるか?",
      code: `zipWith' _ [] _ = []\nzipWith' _ _ [] = []\nzipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys`,
      choices: [
        { text: "<code>[11,22,3]</code>（短い方が0で埋められる）", isCorrect: false },
        { text: "<code>[11,22]</code>（短い方のリストの長さで終了する）", isCorrect: true },
        { text: "エラー（リストの長さが一致しないため）", isCorrect: false },
        { text: "<code>[11,22,23]</code>（長い方の残り要素がそのまま付加される）", isCorrect: false }
      ],
      explanation: "基底部で片方のリストが空になった時点で <code>[]</code> を返す。残りの要素は捨てられる。<code>[1,2,3]</code> と <code>[10,20]</code> なら2要素目で <code>[20]</code> 側が次のステップで空になるため、<code>[11,22]</code> が結果。"
    },
    {
      id: "20260626-q3",
      question: "2つの基底部のうち <code>zipWith' _ _ [] = []</code> を削除した場合、<code>zipWith' (+) [1,2] []</code> はどうなるか?",
      code: `zipWith' _ [] _ = []\n<span class="comment">-- zipWith' _ _ [] = []  ← 削除</span>\nzipWith' f (x:xs) (y:ys) = f x y : zipWith' f xs ys`,
      choices: [
        { text: "パターンマッチ失敗で実行時エラーになる", isCorrect: true },
        { text: "<code>[]</code> が返る。最初の基底部でカバーされている", isCorrect: false },
        { text: "コンパイルエラーになる", isCorrect: false },
        { text: "第2引数の空リストが無視されて再帰が止まらない", isCorrect: false }
      ],
      explanation: "第1引数 <code>[1,2]</code> は空でないため最初の基底部 <code>zipWith' _ [] _ = []</code> にマッチしない。再帰部の <code>(y:ys)</code> は空リスト <code>[]</code> にマッチしない。どのパターンにも合わず実行時エラーになる。"
    },
    {
      id: "20260626-q4",
      question: "<code>zipWith' (*) (replicate 5 2) [1..]</code> について。<code>[1..]</code> は無限リストだが、この式はどうなるか?",
      code: `zipWith' (*) (replicate 5 2) [1..]\n<span class="comment">-- replicate 5 2 = [2,2,2,2,2]</span>`,
      choices: [
        { text: "無限リストのため計算が終了しない", isCorrect: false },
        { text: "<code>[2,2,2,2,2]</code>", isCorrect: false },
        { text: "エラーになる。無限リストは引数に渡せない", isCorrect: false },
        { text: "<code>[2,4,6,8,10]</code>", isCorrect: true }
      ],
      explanation: "<code>replicate 5 2</code> は <code>[2,2,2,2,2]</code> で長さ5。zipWith' は短い方に合わせるため、無限リスト <code>[1..]</code> の先頭5要素 <code>[1,2,3,4,5]</code> だけが使われる。<code>2*1, 2*2, 2*3, 2*4, 2*5</code> で <code>[2,4,6,8,10]</code>。"
    },
    {
      id: "20260626-q5",
      question: "<code>zipWith' (zipWith' (*)) [[1,2,3],[3,5,6]] [[3,2,2],[3,4,5]]</code> の結果はどれか?",
      code: `zipWith' (zipWith' (*)) [[1,2,3],[3,5,6]] [[3,2,2],[3,4,5]]`,
      choices: [
        { text: "<code>[[3,4,6],[9,20,30]]</code>", isCorrect: true },
        { text: "<code>[3,4,6,9,20,30]</code>（平坦化される）", isCorrect: false },
        { text: "<code>[[3,6,18],[6,20,30]]</code>", isCorrect: false },
        { text: "型エラー。zipWith' を zipWith' の引数に渡すことはできない", isCorrect: false }
      ],
      explanation: "外側の zipWith' が対応するサブリストのペアに <code>zipWith' (*)</code> を適用する。<code>zipWith' (*) [1,2,3] [3,2,2]</code> = <code>[3,4,6]</code>、<code>zipWith' (*) [3,5,6] [3,4,5]</code> = <code>[9,20,30]</code>。zipWith' の型 <code>(a -> b -> c)</code> の a, b, c にリストが入るだけで型は合う。"
    }
  ]
};
