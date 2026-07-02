window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260702"] = {
  date: "20260702",
  title: "ラムダ式・パターンマッチ・カリー化との等価性",
  questions: [
    {
      id: "20260702-q1",
      question: "<code>map (\\x -> x + 3) [1,6,3,2]</code> と同じ結果になり、部分適用を活用した書き方はどれか?",
      code: `map (\\x -> x + 3) [1,6,3,2]\n<span class="comment">-- 結果: [4,9,6,5]</span>`,
      choices: [
        { text: "<code>map (+ 3 x) [1,6,3,2]</code>", isCorrect: false },
        { text: "<code>map (\\3 -> x) [1,6,3,2]</code>", isCorrect: false },
        { text: "<code>map (+3) [1,6,3,2]</code>", isCorrect: true },
        { text: "<code>map (add 3) [1,6,3,2]</code>", isCorrect: false }
      ],
      explanation: "<code>(+3)</code> はセクションによる部分適用で <code>\\x -> x + 3</code> と等価。カリー化・部分適用を理解していれば、わざわざラムダ式を書く必要はない。"
    },
    {
      id: "20260702-q2",
      question: "<code>map (\\(a,b) -> a + b) [(1,2),(3,5),(6,3)]</code> の結果はどれか?",
      code: `map (\\(a,b) -> a + b) [(1,2),(3,5),(6,3)]`,
      choices: [
        { text: "<code>[(1,2),(3,5),(6,3)]</code>（変化なし）", isCorrect: false },
        { text: "<code>[3,8,9]</code>", isCorrect: true },
        { text: "<code>[(3),(8),(9)]</code>（1要素タプルのリスト）", isCorrect: false },
        { text: "エラー。ラムダ式でパターンマッチはできない", isCorrect: false }
      ],
      explanation: "ラムダ式でもパターンマッチは使える。<code>\\(a,b)</code> でタプルを分解し、<code>a + b</code> を計算する。各要素 <code>(1,2) → 3</code>、<code>(3,5) → 8</code>、<code>(6,3) → 9</code>。"
    },
    {
      id: "20260702-q3",
      question: "ラムダ式 <code>\\(x:xs) -> x</code> に空リスト <code>[]</code> を渡したらどうなるか?",
      code: `(\\(x:xs) -> x) []`,
      choices: [
        { text: "ランタイムエラーになる。ラムダ式では1つの引数に複数のパターンを定義できない", isCorrect: true },
        { text: "コンパイルエラーになる", isCorrect: false },
        { text: "空リスト <code>[]</code> が返る", isCorrect: false },
        { text: "<code>0</code> が返る（デフォルト値）", isCorrect: false }
      ],
      explanation: "通常の関数定義なら <code>f [] = ...</code> と <code>f (x:xs) = ...</code> のように複数パターンを書けるが、ラムダ式では1つのパターンしか書けない。<code>(x:xs)</code> は空リストにマッチしないため、ランタイムエラーになる。"
    },
    {
      id: "20260702-q4",
      question: "<code>addThree</code> と <code>addThree'</code> の関係として正しいのはどれか?",
      code: `addThree x y z = x + y + z\n\naddThree' = \\x -> \\y -> \\z -> x + y + z`,
      choices: [
        { text: "等価ではない。addThree' はネストされたラムダなので各段階で異なる関数が生成される", isCorrect: false },
        { text: "等価ではない。addThree' は3つの独立した無名関数を返す", isCorrect: false },
        { text: "addThree' はコンパイルエラーになる。ラムダ式のネストは不正", isCorrect: false },
        { text: "等価。関数はデフォルトでカリー化されており、引数を1つずつ受け取る形式と同じ", isCorrect: true }
      ],
      explanation: "Haskellでは全関数がカリー化されている。<code>addThree x y z = ...</code> は内部的に <code>\\x -> \\y -> \\z -> ...</code> と同じ構造。どちらも <code>addThree 1 2 3</code> で <code>6</code> を返す。"
    },
    {
      id: "20260702-q5",
      question: "<code>flip' f = \\x y -> f y x</code> とラムダ式で定義する利点は何か?",
      code: `<span class="comment">-- ラムダ版</span>\nflip' f = \\x y -> f y x\n\n<span class="comment">-- 直接版</span>\nflip' f x y = f y x`,
      choices: [
        { text: "ラムダ版の方が実行速度が速い", isCorrect: false },
        { text: "「新しい関数を生成して返す」という flip の動作を明示的に表現できる", isCorrect: true },
        { text: "ラムダ版でないとパターンマッチができない", isCorrect: false },
        { text: "ラムダ版の方が型推論が正確になる", isCorrect: false }
      ],
      explanation: "<code>flip' f = \\x y -> f y x</code> は「f を受け取り、引数が入れ替わった新しい関数を返す」と読める。直接版と動作は同じだが、flip が関数を生成する高階関数であることがラムダ式の方が見た目にわかりやすい。"
    },
    {
      id: "20260702-q6",
      question: "<code>map (flip subtract 20) [1,2,3,4]</code> の結果はどれか?",
      code: `<span class="comment">-- subtract x y = y - x</span>\nmap (flip subtract 20) [1,2,3,4]`,
      choices: [
        { text: "<code>[19,18,17,16]</code>", isCorrect: true },
        { text: "<code>[-19,-18,-17,-16]</code>", isCorrect: false },
        { text: "<code>[21,22,23,24]</code>", isCorrect: false },
        { text: "<code>[-1,-2,-3,-4]</code>", isCorrect: false }
      ],
      explanation: "<code>subtract x y = y - x</code>（引数の順序が <code>(-)</code> と逆）。<code>flip subtract</code> で引数を入れ替えると <code>flip subtract x y = x - y</code>。<code>flip subtract 20</code> は <code>\\y -> 20 - y</code> となり、各要素で <code>20 - 1 = 19</code>, <code>20 - 2 = 18</code>, ... となる。"
    }
  ]
};
