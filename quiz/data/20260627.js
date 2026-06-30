window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260627"] = {
  date: "20260627",
  title: "flip'による引数の入れ替えとzipWith応用",
  questions: [
    {
      id: "20260627-q1",
      question: "<code>flip' zip [1,2,3] \"abc\"</code> の結果はどれか?",
      code: `flip' :: (a -> b -> c) -> b -> a -> c\nflip' f y x = f x y`,
      choices: [
        { text: "<code>[(1,'a'),(2,'b'),(3,'c')]</code>", isCorrect: false },
        { text: "<code>[('a',1),('b',2),('c',3)]</code>", isCorrect: true },
        { text: "<code>[(1,2,3),('a','b','c')]</code>", isCorrect: false },
        { text: "型エラー。zip に flip' は使えない", isCorrect: false }
      ],
      explanation: "<code>flip' zip [1,2,3] \"abc\"</code> は <code>zip \"abc\" [1,2,3]</code> と等価。zip に渡すリストの順序が入れ替わるため、タプル内の要素順も <code>(Char, Int)</code> になる。"
    },
    {
      id: "20260627-q2",
      question: "<code>zipWith div [2,2..] [10,8,6,4,2]</code> の結果が <code>[0,0,0,0,1]</code> になる理由は?",
      code: `zipWith div [2,2..] [10,8,6,4,2]\n<span class="comment">-- 結果: [0,0,0,0,1]</span>`,
      choices: [
        { text: "<code>div</code> は第1引数を第2引数で割る整数除算。<code>2 `div` 10 = 0</code>, ..., <code>2 `div` 2 = 1</code>", isCorrect: true },
        { text: "<code>div</code> は第2引数を第1引数で割るので <code>10 `div` 2 = 0</code>（切り捨て）", isCorrect: false },
        { text: "<code>[2,2..]</code> が無限リストのためオーバーフローしている", isCorrect: false },
        { text: "<code>div</code> は剰余演算で、割り切れるかの判定結果（0/1）を返している", isCorrect: false }
      ],
      explanation: "<code>div</code> は <code>div a b = a ÷ b</code>（整数除算）。<code>zipWith div [2,2..] [10,8,6,4,2]</code> は各要素で <code>2 `div` 10</code>, <code>2 `div` 8</code>, ... を計算する。被除数が2で除数が大きいため商は0、最後の <code>2 `div` 2 = 1</code> だけが1になる。"
    },
    {
      id: "20260627-q3",
      question: "<code>zipWith (flip' div) [2,2..] [10,8,6,4,2]</code> が <code>[5,4,3,2,1]</code> になる理由は?",
      code: `zipWith (flip' div) [2,2..] [10,8,6,4,2]\n<span class="comment">-- 結果: [5,4,3,2,1]</span>`,
      choices: [
        { text: "flip' が <code>[2,2..]</code> と <code>[10,8,6,4,2]</code> のリスト自体を入れ替えている", isCorrect: false },
        { text: "flip' が結果のリストを逆順にしている", isCorrect: false },
        { text: "flip' が div の2つの引数を入れ替え、<code>10 `div` 2 = 5</code>, <code>8 `div` 2 = 4</code>, ... になる", isCorrect: true },
        { text: "flip' が div を乗算に変換している", isCorrect: false }
      ],
      explanation: "<code>flip' div</code> は <code>\\a b -> div b a</code> と等価。zipWith が各ペアに適用すると <code>div 10 2 = 5</code>, <code>div 8 2 = 4</code>, ... となる。flip' はリストではなく、div に渡される2つの引数の順序を入れ替える。"
    },
    {
      id: "20260627-q4",
      question: "<code>flip'</code> の2つの定義の関係として正しいのはどれか?",
      code: `<span class="comment">-- 定義1</span>\nflip' f = g\n    <span class="keyword">where</span> g x y = f y x\n\n<span class="comment">-- 定義2</span>\nflip' f y x = f x y`,
      choices: [
        { text: "定義1は遅延評価、定義2は正格評価される", isCorrect: false },
        { text: "定義1は関数を返すが、定義2は値を返すため型が異なる", isCorrect: false },
        { text: "定義2は部分適用できないが、定義1はできる", isCorrect: false },
        { text: "動作は同じ。定義1は中間関数gを経由し、定義2は引数を直接受け取る", isCorrect: true }
      ],
      explanation: "カリー化により「関数を返す関数」と「引数を全部受け取る関数」は等価。定義1は <code>flip' f</code> が関数 <code>g</code> を返す形、定義2は3引数を直接受け取る形だが、どちらも <code>flip' f y x = f x y</code> と同じ動作をする。"
    },
    {
      id: "20260627-q5",
      question: "型 <code>(a -> b -> c) -> (b -> a -> c)</code> の2つ目の括弧を外して <code>(a -> b -> c) -> b -> a -> c</code> と書ける理由は?",
      code: `(a -> b -> c) -> (b -> a -> c)\n<span class="comment">-- ↓ 等価</span>\n(a -> b -> c) -> b -> a -> c`,
      choices: [
        { text: "Haskellでは型宣言の括弧は常に省略可能", isCorrect: false },
        { text: "<code>-></code> が右結合なので <code>b -> a -> c</code> は <code>(b -> (a -> c))</code> と同じ解釈になる", isCorrect: true },
        { text: "<code>-></code> が左結合であるため", isCorrect: false },
        { text: "<code>b -> a -> c</code> は多引数関数を表す特殊な構文糖衣であるため", isCorrect: false }
      ],
      explanation: "<code>-></code> は右結合なので <code>b -> a -> c</code> は暗黙的に <code>(b -> (a -> c))</code> と解釈される。これは外側の括弧 <code>(b -> a -> c)</code> と同じ構造なので省略できる。ただし最初の <code>(a -> b -> c)</code> の括弧は左結合として解釈されないために必須。"
    }
  ]
};
