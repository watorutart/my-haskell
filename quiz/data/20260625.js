window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260625"] = {
  date: "20260625",
  title: "高階関数applyTwiceとGHCiモジュール管理",
  questions: [
    {
      id: "20260625-q1",
      question: "<code>a -> a -> a</code> と <code>(a -> a) -> a -> a</code> の違いとして正しいのはどれか?",
      code: `a -> a -> a\n<span class="comment">-- vs</span>\n(a -> a) -> a -> a`,
      choices: [
        { text: "同じ型。括弧は見た目だけの違いで省略可能", isCorrect: false },
        { text: "前者は「aを2つ受け取りaを返す関数」、後者は「a->aという関数を受け取り、aを受け取りaを返す関数」", isCorrect: true },
        { text: "前者は高階関数、後者は通常の関数", isCorrect: false },
        { text: "前者はカリー化されていないが、後者はカリー化されている", isCorrect: false }
      ],
      explanation: "<code>-></code> は右結合なので <code>a -> a -> a</code> は <code>a -> (a -> a)</code> と解釈される。第1引数は値 <code>a</code>。一方 <code>(a -> a) -> a -> a</code> は第1引数が関数 <code>a -> a</code> であり、括弧がないと全く異なる型になる。"
    },
    {
      id: "20260625-q2",
      question: "<code>applyTwice (3:) [1]</code> の結果はどれか?",
      code: `<span class="keyword">applyTwice</span> :: (a -> a) -> a -> a\napplyTwice f x = f (f x)`,
      choices: [
        { text: "<code>[3,1,3,1]</code>", isCorrect: false },
        { text: "<code>[1,3,3]</code>", isCorrect: false },
        { text: "<code>[3,3,1]</code>", isCorrect: true },
        { text: "<code>[3,1]</code>", isCorrect: false }
      ],
      explanation: "<code>(3:)</code> はリストの先頭に3を追加するセクション。<code>f (f x)</code> なのでまず <code>(3:) [1]</code> → <code>[3,1]</code>、次に <code>(3:) [3,1]</code> → <code>[3,3,1]</code>。内側から外側へ順に適用される。"
    },
    {
      id: "20260625-q3",
      question: "<code>applyTwice (++ \" HAHA\") \"HEY\"</code> と <code>applyTwice (\"HAHA \" ++) \"HEY\"</code> の結果の組み合わせとして正しいのはどれか?",
      code: `applyTwice (++ " HAHA") "HEY"\napplyTwice ("HAHA " ++) "HEY"`,
      choices: [
        { text: "<code>\"HEY HAHA HAHA\"</code> と <code>\"HAHA HAHA HEY\"</code>", isCorrect: true },
        { text: "<code>\"HAHA HEY HAHA\"</code> と <code>\"HAHA HAHA HEY\"</code>", isCorrect: false },
        { text: "<code>\"HEY HAHA HAHA\"</code> と <code>\"HEY HAHA HAHA\"</code>", isCorrect: false },
        { text: "<code>\"HAHA HEY HAHA\"</code> と <code>\"HEY HAHA HAHA\"</code>", isCorrect: false }
      ],
      explanation: "<code>(++ \" HAHA\")</code> は右側に <code>\" HAHA\"</code> を付加するセクション。2回適用で <code>\"HEY\" → \"HEY HAHA\" → \"HEY HAHA HAHA\"</code>。<code>(\"HAHA \" ++)</code> は左側に <code>\"HAHA \"</code> を付加するセクション。2回適用で <code>\"HEY\" → \"HAHA HEY\" → \"HAHA HAHA HEY\"</code>。セクションの左右の違いが結果に反映される。"
    },
    {
      id: "20260625-q4",
      question: "GHCi で <code>:l fileA.hs</code> を実行した後、fileB.hs も追加でロードしたい。正しい方法はどれか?",
      code: `ghci> :l fileA.hs\n[1 <span class="keyword">of</span> 1] Compiling Main\nOk, one module loaded.\nghci> ???`,
      choices: [
        { text: "<code>:l fileB.hs</code> を実行する", isCorrect: false },
        { text: "<code>:reload</code> を実行する", isCorrect: false },
        { text: "<code>:l fileA.hs fileB.hs</code> を実行する", isCorrect: false },
        { text: "<code>:add fileB.hs</code> を実行する", isCorrect: true }
      ],
      explanation: "<code>:l</code> は指定ファイルをロードするが、それまでのロード済みモジュールをリセットする。追加ロードには <code>:add</code> を使う。<code>:reload</code> は既にロード済みのモジュールを再読み込みするコマンドであり、新しいファイルを追加するものではない。"
    },
    {
      id: "20260625-q5",
      question: "2つの .hs ファイルが両方とも <code>module</code> 宣言を省略した状態で、GHCi で <code>:l</code> した後に <code>:add</code> するとどうなるか?",
      code: `<span class="comment">-- fileA.hs (module宣言なし)</span>\ndouble x = x * 2\n\n<span class="comment">-- fileB.hs (module宣言なし)</span>\ntriple x = x * 3`,
      choices: [
        { text: "「module 'main:Main' is defined in multiple files」エラーになる", isCorrect: true },
        { text: "後からロードしたファイルの定義が優先される", isCorrect: false },
        { text: "両方の定義が Main モジュールにマージされる", isCorrect: false },
        { text: "GHCi が自動的に2つ目のファイルに別のモジュール名を付与する", isCorrect: false }
      ],
      explanation: "module 宣言を省略すると暗黙的に <code>module Main where</code> として扱われる。同名モジュールが複数ファイルに存在するため、GHCi はエラーを出す。解決するには一方のファイルに <code>module MyModule where</code> のように固有のモジュール名を明記する。"
    },
    {
      id: "20260625-q6",
      question: "<code>applyTwice</code> の型宣言を <code>applyTwice :: a -> a -> a -> a</code> と括弧なしで書いた場合、この型はどう解釈されるか?",
      code: `<span class="comment">-- 本来の定義</span>\napplyTwice :: (a -> a) -> a -> a\napplyTwice f x = f (f x)`,
      choices: [
        { text: "<code>(a -> a) -> a -> a</code> と同じ。括弧は省略表記にすぎない", isCorrect: false },
        { text: "<code>(a -> a) -> (a -> a)</code> と解釈される", isCorrect: false },
        { text: "<code>((a -> a) -> a) -> a</code> と解釈される", isCorrect: false },
        { text: "<code>a -> (a -> (a -> a))</code> と解釈され、3つの値を受け取る関数になる", isCorrect: true }
      ],
      explanation: "<code>-></code> は右結合なので <code>a -> a -> a -> a</code> は <code>a -> (a -> (a -> a))</code> と解釈される。これは3つの <code>a</code> 型の値を受け取り <code>a</code> を返す関数であり、第1引数を関数として使う <code>applyTwice</code> の実装と型が合わずコンパイルエラーになる。"
    },
    {
      id: "20260625-q7",
      question: "<code>filter (>10) [5, 12, 8, 20]</code> の <code>(>10)</code> はどの関数と等価か?",
      code: `filter (>10) [5, 12, 8, 20]\n<span class="comment">-- 結果: [12, 20]</span>`,
      choices: [
        { text: "<code>\\x -> 10 > x</code>（10がxより大きいか）", isCorrect: false },
        { text: "<code>\\x -> x > 10</code>（xが10より大きいか）", isCorrect: true },
        { text: "<code>\\x -> x >= 10</code>（xが10以上か）", isCorrect: false },
        { text: "<code>\\x -> x == 10</code>（xが10と等しいか）", isCorrect: false }
      ],
      explanation: "セクション <code>(>10)</code> は演算子の左側が空なので、引数が左側に入る。つまり <code>\\x -> x > 10</code> と等価。<code>(10>)</code> と書いた場合は <code>\\x -> 10 > x</code> になる。左右どちらが空かで意味が変わる。"
    },
    {
      id: "20260625-q8",
      question: "<code>map (++ \"!\") [\"hello\", \"world\"]</code> の結果はどれか?",
      code: `<span class="keyword">map</span> :: (a -> b) -> [a] -> [b]\n\nmap (++ "!") ["hello", "world"]`,
      choices: [
        { text: "<code>[\"!hello\", \"!world\"]</code>", isCorrect: false },
        { text: "<code>[\"hello\", \"world\", \"!\"]</code>", isCorrect: false },
        { text: "<code>[\"hello!\", \"world!\"]</code>", isCorrect: true },
        { text: "型エラーになる", isCorrect: false }
      ],
      explanation: "<code>(++ \"!\")</code> は演算子の左側が空なので <code>\\x -> x ++ \"!\"</code> と等価。各要素の末尾に <code>\"!\"</code> が付加される。先頭に付けたい場合は <code>(\"!\" ++)</code> と書く。"
    }
  ]
};
