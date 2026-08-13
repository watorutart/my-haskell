window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260813"] = {
  date: "20260813",
  title: "多相データ型Carとデータ宣言の型クラス制約",
  questions: [
    {
      id: "20260813-q1",
      question: "<code>data Car = Car { company :: String, model :: String, year :: Int }</code> を <code>data Car a b c = Car { company :: a, model :: b, year :: c }</code> に書き換えたところ、既存の <code>tellCar :: Car -> String</code> がコンパイルエラーになった。理由は?",
      code: `<span class="keyword">data</span> Car a b c = Car { company :: a
                     , model   :: b
                     , year    :: c
                     } <span class="keyword">deriving</span> (Show)

<span class="comment">-- これはエラー</span>
tellCar :: Car -> String`,
      choices: [
        { text: "レコード構文で定義した型は、型注釈にフィールド名も書かなければならないから", isCorrect: false },
        { text: "<code>deriving (Show)</code> を付けた型は関数の引数型に書けなくなるから", isCorrect: false },
        { text: "<code>Car</code> は型引数を3つ取る型コンストラクタになり、単体では具体型ではなくなったから", isCorrect: true },
        { text: "型引数が3つある型は、必ず型クラス制約を伴わないと型注釈に書けないから", isCorrect: false }
      ],
      explanation: "型引数を付けた時点で <code>Car</code> は「型引数を3つ受け取って初めて型を生み出す型コンストラクタ」になる。型注釈には具体型しか書けないため、<code>Car String String Int</code> のように3つとも与える必要がある。"
    },
    {
      id: "20260813-q2",
      question: "<code>data Car a b c</code> に対して <code>tellCar</code> の型が <code>Car a b c -> String</code> ではなく <code>(Show a) => Car String String a -> String</code> になるのはなぜか?",
      code: `<span class="keyword">data</span> Car a b c = Car { company :: a, model :: b, year :: c } <span class="keyword">deriving</span> (Show)

tellCar :: (Show a) =&gt; Car String String a -&gt; String
tellCar (Car {company = c, model = m, year = y}) =
  "This " ++ c ++ " " ++ m ++ " was made in " ++ show y`,
      choices: [
        { text: "本体で <code>c</code> と <code>m</code> を <code>++</code> で文字列連結しており、<code>y</code> は <code>show</code> に渡すだけだから", isCorrect: true },
        { text: "型引数は最大1つまでしか多相のまま残せず、残りは具体型にする決まりだから", isCorrect: false },
        { text: "レコード構文のパターンマッチでは、最後のフィールドだけが多相になれるから", isCorrect: false },
        { text: "<code>deriving (Show)</code> が第1・第2引数を <code>String</code> に固定するから", isCorrect: false }
      ],
      explanation: "<code>++</code> は <code>[a] -> [a] -> [a]</code> で、文字列リテラルと連結する以上 <code>c</code>・<code>m</code> は <code>String</code> に確定する。一方 <code>y</code> は <code>show</code> にしか渡していないので <code>Show</code> 制約さえあれば何でもよく、多相のまま残せる。"
    },
    {
      id: "20260813-q3",
      question: "<code>data Car a b c = Car { company :: a, model :: b, year :: c }</code> のもとで <code>:t Car \"Ford\" \"Mustang\" 1967</code> が <code>Car String String Int</code> ではなく <code>Num c => Car String String c</code> と表示されるのはなぜか?",
      code: `<span class="comment">ghci&gt; :t Car "Ford" "Mustang" 1967</span>
<span class="comment">Car "Ford" "Mustang" 1967 :: Num c =&gt; Car String String c</span>`,
      choices: [
        { text: "GHCiの <code>:t</code> は型引数が3つ以上ある型を常に制約付きで省略表示するから", isCorrect: false },
        { text: "レコード構文で作った値は、フィールドを指定しない限り型が確定しないから", isCorrect: false },
        { text: "<code>Car</code> が多相なので、すべての型引数が自動的に型クラス制約付きになるから", isCorrect: false },
        { text: "数値リテラル <code>1967</code> 自体が <code>Num c => c</code> という多相型で、<code>Int</code> に確定していないから", isCorrect: true }
      ],
      explanation: "Haskellの数値リテラルは <code>Num a => a</code> という多相型を持ち、文脈から要求されて初めて <code>Int</code> や <code>Double</code> に確定する。ここでは確定させる文脈がないため <code>Num c</code> 制約付きのまま残る。文字列リテラルは <code>String</code> 一択なので第1・第2引数は確定している。"
    },
    {
      id: "20260813-q4",
      question: "<code>tellCar :: (Show a) => Car String String a -> String</code> のもとで <code>tellCar (Car \"Ford\" \"Mustang\" \"nineteen sixty seven\")</code> を評価すると、結果に <code>\\\"</code> が現れる。この理由は?",
      code: `tellCar (Car {company = c, model = m, year = y}) =
  "This " ++ c ++ " " ++ m ++ " was made in " ++ show y

<span class="comment">ghci&gt; tellCar (Car "Ford" "Mustang" "nineteen sixty seven")</span>
<span class="comment">"This Ford Mustang was made in \\"nineteen sixty seven\\""</span>`,
      choices: [
        { text: "型引数に <code>String</code> を渡したことによる型エラーを、GHCiが警告として引用符で示しているから", isCorrect: false },
        { text: "<code>y</code> が <code>String</code> なので <code>show y</code> が引用符付きの文字列表現を返すから", isCorrect: true },
        { text: "<code>++</code> が異なる型の文字列を連結するとき、境界に引用符を挿入するから", isCorrect: false },
        { text: "<code>deriving (Show)</code> したレコード型のフィールドは、常に引用符で囲まれて出力されるから", isCorrect: false }
      ],
      explanation: "<code>show</code> は値のソースコード表現を返すため、<code>String</code> に適用すると引用符を含む文字列になる(<code>show \"abc\" == \"\\\"abc\\\"\"</code>)。<code>year</code> が多相なので <code>String</code> も入れられてしまい、この不自然な出力が型エラーにならず通ってしまう。"
    },
    {
      id: "20260813-q5",
      question: "<code>data Car = Car { company :: String, model :: String, year :: Int }</code> を <code>data Car a b c = Car { company :: a, model :: b, year :: c }</code> に変えたとき、フィールドアクセサ <code>year</code> の型はどう変わるか?",
      code: `<span class="comment">-- 変更前</span>
<span class="keyword">data</span> Car = Car { company :: String, model :: String, year :: Int }

<span class="comment">-- 変更後</span>
<span class="keyword">data</span> Car a b c = Car { company :: a, model :: b, year :: c }`,
      choices: [
        { text: "<code>Car -> Int</code> のまま変わらない。アクセサの型は宣言時に固定されるから", isCorrect: false },
        { text: "<code>Car a b c -> Int</code> になる。<code>year</code> は元の宣言から <code>Int</code> を引き継ぐから", isCorrect: false },
        { text: "アクセサ自体が生成されなくなる。多相型ではレコード構文が無効になるから", isCorrect: false },
        { text: "<code>Car a b c -> c</code> になる。引数の型も戻り値の型も多相になる", isCorrect: true }
      ],
      explanation: "レコード構文のフィールドアクセサは <code>フィールドの型</code> を戻り値、<code>データ型そのもの</code> を引数に取る関数として生成される。多相化により引数は <code>Car a b c</code>、戻り値はフィールドの型引数 <code>c</code> となる。"
    },
    {
      id: "20260813-q6",
      question: "<code>Data.Map</code> の <code>Map k v</code> は型引数が活きている例だが、<code>Car</code> の多相化は「労力に見合わない」とされる。型引数を導入すべきかを判断する一般的な指針は?",
      code: `<span class="comment">-- 型引数が活きる例: 中身が何でも同じ動作をする</span>
Map k v
[a]

<span class="comment">-- 実用上ほぼ Car String String Int しか使わない</span>
<span class="keyword">data</span> Car a b c = Car { company :: a, model :: b, year :: c }`,
      choices: [
        { text: "値コンストラクタに収納された型が、そのデータ型自体の動作に大きく影響しないときに型引数を使う", isCorrect: true },
        { text: "フィールドが3つ以上あるデータ型は、すべて型引数で多相化しておくべき", isCorrect: false },
        { text: "<code>deriving (Show)</code> を付けるデータ型は、必ず型引数を持たせるべき", isCorrect: false },
        { text: "型クラス制約を書きたくない場合にだけ型引数を使い、それ以外は具体型で書くべき", isCorrect: false }
      ],
      explanation: "<code>Map k v</code> やリストは中身が何であれ「格納する・取り出す」という動作が変わらないため型引数が有用。一方 <code>Car</code> は事実上 <code>Car String String Int</code> でしか使われず、多相化しても型注釈が複雑になるだけで得るものがない。特定の型に対する処理が欲しくなったら、後からその型を取る関数を書けばよい。"
    },
    {
      id: "20260813-q7",
      question: "<code>data (Ord k) => Map k v = ...</code> のようにデータ宣言へ型クラス制約を書くことが、Haskellのコーディング規約で強く避けられているのはなぜか?",
      code: `<span class="comment">-- 避けるべき書き方</span>
<span class="keyword">data</span> (Ord k) =&gt; Map k v = ...

<span class="comment">-- 推奨: 制約は必要な関数側に書く</span>
<span class="keyword">data</span> Map k v = ...
insert :: (Ord k) =&gt; k -&gt; v -&gt; Map k v -&gt; Map k v`,
      choices: [
        { text: "データ宣言に制約を書くとコンパイル時間が指数的に増加するから", isCorrect: false },
        { text: "制約を書いたデータ型は <code>deriving</code> が使えなくなり、<code>Show</code> も自動導出できなくなるから", isCorrect: false },
        { text: "制約が必要な関数側にはどのみち書く必要があり、制約が不要な関数にまで書く手間が増えるだけだから", isCorrect: true },
        { text: "データ宣言の制約は実行時に毎回チェックされ、パフォーマンスが低下するから", isCorrect: false }
      ],
      explanation: "データ宣言の制約は関数側の制約を省略させてくれない。<code>insert</code> のように順序が必要な関数には結局 <code>(Ord k) =></code> を書くことになり、逆に順序が不要な関数(サイズ取得など)にまで制約を書かされる。得るものがなく手間だけが増えるため、制約は必要な関数にのみ書く。"
    }
  ]
};
