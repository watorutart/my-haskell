window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260709"] = {
  date: "20260709",
  title: "ポイントフリースタイルとη簡約、関数合成の落とし穴、カリー化の本質",
  questions: [
    {
      id: "20260709-q1",
      question: "ポイントフリースタイルにおける「ポイント」とは何を指すか?",
      code: `fn x = f (g x)`,
      choices: [
        { text: "関数の型シグネチャに書かれる型変数のこと", isCorrect: false },
        { text: "<code>fn x = f (g x)</code>のような定義で使われる仮引数xのような一時変数のこと", isCorrect: true },
        { text: "関数合成<code>.</code>のことをポイントフリースタイルでは俗に「ポイント」と呼ぶ", isCorrect: false },
        { text: "小数点を含む数値リテラルのこと", isCorrect: false }
      ],
      explanation: "ポイントフリースタイルは「ポイント(引数として現れる一時変数)」を使わずに関数を定義するスタイル。<code>fn x = f (g x)</code>のxがポイントであり、これを省略した<code>fn = f . g</code>がポイントフリーな形。"
    },
    {
      id: "20260709-q2",
      question: "<code>sum' xs = foldl (+) 0 xs</code> を <code>sum' = foldl (+) 0</code> にη簡約できる理由は何か?",
      code: `sum' :: (Num a) => [a] -> a
sum' xs = foldl (+) 0 xs
<span class="comment">-- 書き換え</span>
sum' = foldl (+) 0`,
      choices: [
        { text: "xsの型がNumのインスタンスだから", isCorrect: false },
        { text: "foldlは常に3引数関数として定義されているため", isCorrect: false },
        { text: "両辺の右端の引数がxsで揃っており、カリー化された関数なので両辺からxsを省略しても同じ関数になるから", isCorrect: true },
        { text: "xsという変数名がHaskellの予約語だから", isCorrect: false }
      ],
      explanation: "η簡約は、両辺の末尾に同じ引数(ここではxs)が付いている場合にそれを両辺から取り除いても同じ関数を表すという規則。カリー化されているため<code>foldl (+) 0</code>はすでに残り1引数を取る関数であり、xsを省略できる。"
    },
    {
      id: "20260709-q3",
      question: "<code>fn x = ceiling (negate (tan (cos (max 50 x))))</code> を素朴に <code>fn = ceiling (negate (tan (cos (max 50))))</code> と書き換えるとなぜ誤りか?",
      code: `fn x = ceiling (negate (tan (cos (max 50 x))))
<span class="comment">-- NG例</span>
fn = ceiling (negate (tan (cos (max 50))))`,
      choices: [
        { text: "<code>cos (max 50)</code>は<code>cos</code>に<code>max 50</code>という関数(部分適用された関数)を直接渡す形になり、<code>cos</code>は数値を期待するため型エラーになるから", isCorrect: true },
        { text: "ceiling関数がポイントフリースタイルに対応していないから", isCorrect: false },
        { text: "negateとtanの引数の順序が入れ替わってしまうから", isCorrect: false },
        { text: "50という数値リテラルが型推論できなくなるから", isCorrect: false }
      ],
      explanation: "xを取り除いた際、内側の<code>max 50 x</code>から単純にxを消すと<code>cos</code>の直接の引数が<code>max 50</code>(1引数関数)になってしまう。<code>cos</code>はFloating値を要求するため、関数を渡すと型エラーになる。"
    },
    {
      id: "20260709-q4",
      question: "<code>fn x = ceiling (negate (tan (cos (max 50 x))))</code> をポイントフリースタイルで正しく書き直した形はどれか?",
      code: `fn x = ceiling (negate (tan (cos (max 50 x))))`,
      choices: [
        { text: "<code>fn = ceiling . negate . tan . cos (max 50)</code>", isCorrect: false },
        { text: "<code>fn = ceiling negate tan cos . max 50</code>", isCorrect: false },
        { text: "<code>fn = (ceiling . negate . tan . cos) (max 50)</code>", isCorrect: false },
        { text: "<code>fn = ceiling . negate . tan . cos . max 50</code>", isCorrect: true }
      ],
      explanation: "<code>cos</code>と<code>max 50</code>の間も<code>.</code>でつなぐ必要がある。こうすることで<code>max 50</code>の結果に<code>cos</code>が適用され、以降<code>tan</code>、<code>negate</code>、<code>ceiling</code>と右から左に順次適用される。"
    },
    {
      id: "20260709-q5",
      question: "メモに書かれている、関数合成のチェインを長くしすぎない方が良い理由とその対策は?",
      choices: [
        { text: "チェインが長いとコンパイルエラーになるため、必ず3つ以内にする", isCorrect: false },
        { text: "長くなると可読性が下がることがあるため、letを使って途中結果に名前を付けて分解すると良い", isCorrect: true },
        { text: "Haskellでは<code>.</code>を4回以上使うと構文エラーになるため", isCorrect: false },
        { text: "長い合成チェインは実行速度が遅くなるため避けるべき", isCorrect: false }
      ],
      explanation: "関数合成のチェインが長くなりすぎると視覚的に何をしているか追いにくくなり可読性が下がることがある。letで途中結果にラベルを与えて分解するとよい、とメモに記載されている。"
    },
    {
      id: "20260709-q6",
      question: "<code>oddSquareSum = sum . takeWhile (&lt;10000) . filter odd $ map (^2) [1..]</code> において、<code>$</code>の右側<code>map (^2) [1..]</code>が担う役割は?",
      code: `oddSquareSum :: Integer
oddSquareSum = sum . takeWhile (<10000) . filter odd $ map (^2) [1..]`,
      choices: [
        { text: "filter oddの第一引数としてのみ渡される", isCorrect: false },
        { text: "無限リストなので評価されず無視される", isCorrect: false },
        { text: "<code>sum . takeWhile (&lt;10000) . filter odd</code>という合成された関数全体に渡される、ひとまとめの引数", isCorrect: true },
        { text: "mapの結果ではなく、<code>$</code>演算子によって新しく生成されるリスト", isCorrect: false }
      ],
      explanation: "<code>$</code>は最低優先順位のため、右側の<code>map (^2) [1..]</code>全体がひとつの引数としてまとまり、左側の合成関数<code>sum . takeWhile (&lt;10000) . filter odd</code>に渡される。"
    },
    {
      id: "20260709-q7",
      question: "<code>foldl :: (b -> a -> b) -> b -> t a -> b</code> は見た目上3引数関数だが、その実体として正しいのはどれか?",
      code: `foldl :: (b -> a -> b) -> b -> t a -> b`,
      choices: [
        { text: "3つの引数をタプルとして同時に受け取る1つの関数", isCorrect: false },
        { text: "内部的にはPythonのようなデフォルト引数を使った可変長引数関数", isCorrect: false },
        { text: "型シグネチャ上は3引数に見えるが、実行時にはリストとして3つの引数をまとめて受け取る", isCorrect: false },
        { text: "1引数関数が1引数関数を返す、という連鎖でできている関数。実際の型は<code>(b -> a -> b) -> (b -> (t a -> b))</code>と同じ", isCorrect: true }
      ],
      explanation: "Haskellの関数はすべてカリー化されており、「多引数関数」という実体はない。<code>foldl</code>の型は矢印<code>-></code>が右結合であるため<code>(b -> a -> b) -> (b -> (t a -> b))</code>と同じであり、1引数関数が1引数関数を返す連鎖として定義されている。"
    },
    {
      id: "20260709-q8",
      question: "<code>foldl (+) 0</code>のように関数へ一部だけ引数を渡す「部分適用」でできる関数について、正しい説明はどれか?",
      code: `foldl (+) 0`,
      choices: [
        { text: "元の<code>foldl</code>と同じ「1引数関数」という構造のまま、まだ引数を渡していない状態から一部渡した状態に進んだだけ", isCorrect: true },
        { text: "部分適用専用の特別な型を持つ関数になり、通常の関数とは呼び出し方法が異なる", isCorrect: false },
        { text: "元の<code>foldl</code>とは構造が異なり、残り引数をタプルとしてまとめて受け取るようになる", isCorrect: false },
        { text: "部分適用すると型情報が失われ、動的型として扱われる", isCorrect: false }
      ],
      explanation: "部分適用によって特別な種類の関数ができるわけではない。カリー化された関数はもともと1引数関数の連鎖であり、<code>foldl (+) 0</code>もその連鎖の途中まで引数を渡した結果できた、ごく普通の1引数関数(残りの<code>t a</code>を受け取る関数)である。"
    }
  ]
};
