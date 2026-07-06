window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260704"] = {
  date: "20260704",
  title: "foldlとfoldrの型・無限リストへの対応・畳み込みの効率",
  questions: [
    {
      id: "20260704-q1",
      question: "<code>foldl</code>と<code>foldr</code>の型シグネチャと畳み込み方向の対応として正しいのはどれか?",
      code: `<span class="keyword">ghci&gt;</span> :t foldl
foldl :: Foldable t => (b -> a -> b) -> b -> t a -> b
<span class="keyword">ghci&gt;</span> :t foldr
foldr :: Foldable t => (a -> b -> b) -> b -> t a -> b`,
      choices: [
        { text: "foldl :: (b -> a -> b)は右畳み込み、foldr :: (a -> b -> b)は左畳み込み", isCorrect: false },
        { text: "foldl :: (b -> a -> b)は左畳み込み、foldr :: (a -> b -> b)は右畳み込み", isCorrect: true },
        { text: "引数の並び順は畳み込み方向と無関係で、どちらも左畳み込みとして動作する", isCorrect: false },
        { text: "foldlとfoldrは型シグネチャがまったく同じで名前が違うだけ", isCorrect: false }
      ],
      explanation: "アキュムレータbが先に来る(b -> a -> b)がfoldl(左畳み込み)、要素aが先に来る(a -> b -> b)がfoldr(右畳み込み)。名前と引数順の対応を逆に覚えやすいので注意。"
    },
    {
      id: "20260704-q2",
      question: "無限リストに対して<code>foldr</code>は動作するが<code>foldl</code>は動作しない理由として正しいのはどれか?",
      choices: [
        { text: "foldrは内部で要素数をあらかじめ数えてから畳み込むから", isCorrect: false },
        { text: "foldlは末尾再帰なので、コンパイラが自動的に無限ループを検出して停止するから", isCorrect: false },
        { text: "foldrは<code>f x (foldr f z xs)</code>の形で再帰し、fが2番目の引数(残りの畳み込み結果)を評価しなくても結果を返せる場合があるから", isCorrect: true },
        { text: "無限リストではfoldl・foldrのどちらも動作しないが、foldrはエラーメッセージが表示されないだけだから", isCorrect: false }
      ],
      explanation: "foldrはfの第2引数(再帰呼び出し)を遅延評価のまま渡す。fが第2引数を必要としない場合(短絡評価)は結果を返せる。foldlは末尾までリストを辿ってからでないと結果を作れないため無限リストでは停止しない。"
    },
    {
      id: "20260704-q3",
      question: "<code>map'</code>の2つの実装のうち、<code>:</code>を使う実装が<code>++</code>を使う実装より高速な理由はどれか?",
      code: `map' :: (a -> b) -> [a] -> [b]
map' f xs = foldr (\\x acc -> f x <span class="keyword">:</span> acc) [] xs
----
map' :: (a -> b) -> [a] -> [b]
map' f xs = foldr (\\acc x -> acc <span class="keyword">++</span> [f x]) [] xs`,
      choices: [
        { text: "<code>:</code>はO(1)でリストの先頭に要素を追加できるが、<code>++</code>は左辺の長さに比例した時間がかかるから", isCorrect: true },
        { text: "ラムダ式の引数名が<code>x</code>から始まっているかどうかで速度が変わるから", isCorrect: false },
        { text: "<code>++</code>は無限リストにしか使えないから", isCorrect: false },
        { text: "foldrは引数が3つの関数にしか対応しておらず、<code>++</code>版は型エラーになるから", isCorrect: false }
      ],
      explanation: "<code>:</code>は先頭への追加でO(1)。<code>++</code>は左オペランドの要素数に比例したコストがかかるため、畳み込みのたびに使うと全体でO(n^2)になり遅くなる。"
    },
    {
      id: "20260704-q4",
      question: "<code>elem'</code>を<code>foldr</code>の型<code>(a -> b -> b) -> b -> t a -> b</code>に当てはめたとき、<code>b</code>に対応する具体的な型はどれか?",
      code: `elem' :: (Eq a) => a -> [a] -> Bool
elem' y ys = foldr (\\x acc -> if x == y then True else acc) False ys`,
      choices: [
        { text: "Bool (True/Falseを表す型)", isCorrect: true },
        { text: "a (elem'の引数yの型)", isCorrect: false },
        { text: "[a] (リストの型)", isCorrect: false },
        { text: "t (Foldableの容れ物)", isCorrect: false }
      ],
      explanation: "アキュムレータの型bは初期値Falseと同じBool。aはリストの要素の型(elem'の型変数aと共通)、tはリスト([])にあたる。"
    },
    {
      id: "20260704-q5",
      question: "<code>elem' 2 [1..]</code>(無限リスト)を評価した場合の挙動として正しいのはどれか?",
      choices: [
        { text: "無限ループになり、結果が返らない", isCorrect: false },
        { text: "型エラーになる", isCorrect: false },
        { text: "foldrなので必ずリスト全体を辿ってからTrue/Falseを返す", isCorrect: false },
        { text: "要素が見つかった時点で<code>True</code>が返る。ifの分岐で<code>acc</code>(残りの畳み込み結果)が評価されないため", isCorrect: true }
      ],
      explanation: "<code>x == y</code>が真の分岐ではaccを参照しないため、まだ評価されていない残りの畳み込み(無限に続く部分)を評価する必要がない。foldrの遅延性により短絡的にTrueが返る。"
    }
  ]
};
