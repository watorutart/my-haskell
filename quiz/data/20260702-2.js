window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260702-2"] = {
  date: "20260702-2",
  title: "高階型・イータ簡約とfoldlの評価順序",
  questions: [
    {
      id: "20260702-2-q1",
      question: "<code>foldl :: Foldable t =&gt; (b -&gt; a -&gt; b) -&gt; b -&gt; t a -&gt; b</code> の <code>t a</code> が表しているものとして正しいのはどれか?",
      code: `<span class="keyword">ghci&gt;</span> :t foldl
foldl :: Foldable t => (b -> a -> b) -> b -> t a -> b`,
      choices: [
        { text: "tは要素の型、aは容れ物(コンテナ)の型", isCorrect: false },
        { text: "tは畳み込み可能な容れ物(型コンストラクタ)、aはその中身の要素の型", isCorrect: true },
        { text: "tとaはどちらも同じ型を指しており、片方は省略可能", isCorrect: false },
        { text: "tはFoldable型クラスそのものの名前を表す", isCorrect: false }
      ],
      explanation: "aは要素の型(TSのジェネリックTと同じ感覚)、tは[]・Maybe・Mapのような「容れ物」自体を抽象化した型変数(高階型)。t aで初めて具体的な型になる。"
    },
    {
      id: "20260702-2-q2",
      question: "<code>add1 x = x + 1</code> を、メモに出てきた <code>foo a = bar b a → foo = bar b</code> と同じ要領でそのままイータ簡約して <code>add1 = ...</code> の形に書き換えられない理由はどれか?",
      code: `add1 :: Int -> Int
add1 x = x + 1`,
      choices: [
        { text: "数値演算子(+)はカリー化されていないため", isCorrect: false },
        { text: "add1という名前が予約語と衝突するため", isCorrect: false },
        { text: "<span class=\"comment\">-- x + 1 は (+) x 1 であり、xが最後の引数ではなく最初の引数として適用されている</span>ため", isCorrect: true },
        { text: "Int型はイータ簡約の対象外という言語仕様があるため", isCorrect: false }
      ],
      explanation: "イータ簡約は「消したい引数がその式の最後に適用されている」ときにだけ成り立つ。x + 1は(+) x 1でxが最初の引数なので、単純にxを消すことはできない(flip (+) 1や(+1)セクションなら可能)。"
    },
    {
      id: "20260702-2-q3",
      question: "<code>sum' xs = foldl (+) 0 xs</code> を <code>sum' = foldl (+) 0</code> と書き換えられる理由として正しいのはどれか?",
      code: `sum' :: (Num a) => [a] -> a
sum' xs = foldl (+) 0 xs`,
      choices: [
        { text: "foldl (+) 0 の時点ですでにリストを受け取って結果を返す関数として完成しており、xsはその関数に最後に適用される引数だから", isCorrect: true },
        { text: "sum'は再帰関数ではないから", isCorrect: false },
        { text: "foldlは3引数しか取れないため、4引数目のxsは無視されるから", isCorrect: false },
        { text: "xsという変数名がHaskellの予約語だから", isCorrect: false }
      ],
      explanation: "foldl (+) 0はカリー化により部分適用された「リストを受け取る関数」であり、xsはその末尾に適用される引数。どんなxsでも両辺が一致するためxsを消してよい。"
    },
    {
      id: "20260702-2-q4",
      question: "<code>foldl (-) 0 [1,2,3]</code> を実行した結果はどれか?",
      code: `<span class="keyword">ghci&gt;</span> foldl (-) 0 [1,2,3]`,
      choices: [
        { text: "6", isCorrect: false },
        { text: "2", isCorrect: false },
        { text: "-2", isCorrect: false },
        { text: "-6", isCorrect: true }
      ],
      explanation: "foldlは左側から順に適用される: ((0 - 1) - 2) - 3 = -6。ちなみに2はfoldr (-) 0 [1,2,3]の結果(1 - (2 - (3 - 0)))であり、左畳み込みと右畳み込みでは結合順序が異なるため引き算のような非可換演算では結果も変わる。"
    },
    {
      id: "20260702-2-q5",
      question: "<code>Foldable t =&gt; t a</code> という制約において、<code>t</code> に当てはめることができない型はどれか?",
      choices: [
        { text: "[] (リスト)", isCorrect: false },
        { text: "Maybe", isCorrect: false },
        { text: "Int", isCorrect: true },
        { text: "部分適用されたMap k", isCorrect: false }
      ],
      explanation: "tは種類(kind)が * -> * の型コンストラクタでなければならない。Intはそれ自体で具体的な型(種類 *)であり、中に要素を入れる容れ物ではないためFoldableのtには当てはまらない。"
    }
  ]
};
