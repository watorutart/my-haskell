window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260809"] = {
  date: "20260809",
  title: "レコード構文とフィールドアクセサ",
  questions: [
    {
      id: "20260809-q1",
      question: "レコード構文で <code>Person</code> を定義したところ、<code>firstName</code> が使えるようになった。<code>firstName</code> の正体はどれか?",
      code: `<span class="keyword">data</span> Person = Person { firstName :: String
                     , lastName :: String
                     , age :: Int } <span class="keyword">deriving</span> (Show)

<span class="comment">-- ghci&gt; :t firstName</span>
<span class="comment">-- firstName :: Person -&gt; String</span>`,
      choices: [
        { text: "<code>Person</code> 型の中だけで有効な、レコード専用の特別な記法", isCorrect: false },
        { text: "レコード構文が自動生成したトップレベルの関数で、<code>Person</code> を受け取ってそのフィールドを返す", isCorrect: true },
        { text: "値コンストラクタの別名。<code>firstName \"Buddy\"</code> のように値も作れる", isCorrect: false },
        { text: "型シノニム。<code>String</code> の別名として使える", isCorrect: false }
      ],
      explanation: "レコード構文でフィールド名を書くと、コンパイラが同名のアクセサ関数を自動で定義する。<code>:t firstName</code> が <code>Person -&gt; String</code> になるのはそのため。手書きで <code>firstName (Person f _ _) = f</code> と定義するのと同じものが生成されている。"
    },
    {
      id: "20260809-q2",
      question: "レコード構文で定義した <code>Car</code> を <code>deriving (Show)</code> して表示した。出力はどうなるか?",
      code: `<span class="keyword">data</span> Car = Car { company :: String
               , model :: String
               , year :: Int } <span class="keyword">deriving</span> (Show)

<span class="comment">-- ghci&gt; Car {company="Ford", model="Mustang", year=1967}</span>`,
      choices: [
        { text: "<code>Car \"Ford\" \"Mustang\" 1967</code>", isCorrect: false },
        { text: "<code>{company = \"Ford\", model = \"Mustang\", year = 1967}</code>", isCorrect: false },
        { text: "<code>Car</code> のみ。フィールドは表示されない", isCorrect: false },
        { text: "<code>Car {company = \"Ford\", model = \"Mustang\", year = 1967}</code>", isCorrect: true }
      ],
      explanation: "レコード構文で定義した型の <code>Show</code> を導出すると、フィールド名つきの形式で表示される。レコード構文を使わずに <code>data Car = Car String String Int</code> と定義した場合は <code>Car \"Ford\" \"Mustang\" 1967</code> のように位置だけの表示になる。"
    },
    {
      id: "20260809-q3",
      question: "レコード構文で定義した <code>Car</code> に対して、フィールド名を使わず位置で引数を並べた。結果はどうなるか?",
      code: `<span class="keyword">data</span> Car = Car { company :: String
               , model :: String
               , year :: Int } <span class="keyword">deriving</span> (Show)

<span class="comment">-- ghci&gt; Car "Ford" "Mustang" 1967</span>`,
      choices: [
        { text: "正常に値が作られる。レコード構文でも値コンストラクタは宣言順の引数を取る普通の関数のまま", isCorrect: true },
        { text: "コンパイルエラー。レコード構文で定義した型は <code>{}</code> 形式でしか値を作れない", isCorrect: false },
        { text: "コンパイルは通るが、フィールドが未初期化の値になる", isCorrect: false },
        { text: "フィールド名の辞書順(company, model, year)で解釈されるため、たまたま同じ結果になる", isCorrect: false }
      ],
      explanation: "レコード構文は値コンストラクタの引数に名前を付ける記法であって、コンストラクタ自体は変わらない。<code>Car</code> は <code>String -&gt; String -&gt; Int -&gt; Car</code> という関数のままなので、宣言順に位置で渡す書き方も使える。"
    },
    {
      id: "20260809-q4",
      question: "同じモジュール内に次の2つの型を定義した。何が起きるか?",
      code: `<span class="keyword">data</span> Car = Car { company :: String
               , model :: String } <span class="keyword">deriving</span> (Show)

<span class="keyword">data</span> Phone = Phone { maker :: String
                   , model :: String } <span class="keyword">deriving</span> (Show)`,
      choices: [
        { text: "問題なく通る。フィールド名は型ごとに独立した名前空間を持つ", isCorrect: false },
        { text: "問題なく通る。<code>model</code> は引数の型で自動的に切り替わる", isCorrect: false },
        { text: "コンパイルエラー。<code>model</code> という関数が2回定義されることになり、名前が衝突する", isCorrect: true },
        { text: "後から定義した <code>Phone</code> の <code>model</code> が優先され、<code>Car</code> 側は使えなくなる", isCorrect: false }
      ],
      explanation: "フィールド名はそのままトップレベルの関数名になるため、同じモジュールで同名フィールドを2つ作ると「Multiple declarations of 'model'」という重複定義エラーになる。回避するにはフィールド名にプレフィックスを付けるか、<code>DuplicateRecordFields</code> 拡張を使う。"
    },
    {
      id: "20260809-q5",
      question: "3つのフィールドを持つ <code>Car</code> を、<code>year</code> を書かずに作った。どうなるか?",
      code: `<span class="keyword">data</span> Car = Car { company :: String
               , model :: String
               , year :: Int } <span class="keyword">deriving</span> (Show)

<span class="comment">-- ghci&gt; let c = Car {company="Ford", model="Mustang"}</span>
<span class="comment">-- ghci&gt; company c</span>`,
      choices: [
        { text: "コンパイルエラーになり、値そのものが作れない", isCorrect: false },
        { text: "<code>year</code> が <code>Int</code> の初期値 <code>0</code> で埋められる", isCorrect: false },
        { text: "<code>company c</code> の時点で実行時エラーになる", isCorrect: false },
        { text: "値は作れて <code>company c</code> は <code>\"Ford\"</code> を返すが、<code>year c</code> を評価すると実行時エラーになる", isCorrect: true }
      ],
      explanation: "レコード構文でフィールドを省略すると警告は出るがコンパイルは通り、未指定のフィールドには「評価すると落ちる値」が入る。遅延評価なので、そのフィールドに実際に触れるまでエラーは起きない。<code>show c</code> は全フィールドを表示しようとするので、そこでも落ちる。"
    },
    {
      id: "20260809-q6",
      question: "レコード構文が生成するアクセサについて正しいものはどれか?",
      code: `<span class="keyword">data</span> Person = Person { firstName :: String
                     , flavor :: String } <span class="keyword">deriving</span> (Show)

people = [Person "Buddy" "Chocolate", Person "Ann" "Vanilla"]`,
      choices: [
        { text: "普通の関数なので <code>map flavor people</code> のように高階関数へ渡せる", isCorrect: true },
        { text: "特殊な構文なので <code>map</code> には渡せず、<code>\\p -&gt; flavor p</code> と書く必要がある", isCorrect: false },
        { text: "アクセサは <code>Person</code> の値を書き換えるためのもので、取り出しには使えない", isCorrect: false },
        { text: "<code>deriving (Show)</code> を書かないとアクセサは生成されない", isCorrect: false }
      ],
      explanation: "アクセサは <code>Person -&gt; String</code> 型のごく普通の関数なので、部分適用も合成も高階関数への受け渡しもできる。<code>deriving</code> は <code>Show</code> などのインスタンスを導出する指定で、アクセサの生成とは無関係。"
    },
    {
      id: "20260809-q7",
      question: "レコード構文を使わずに定義した <code>Person</code> から、自前でフィールドを取り出す関数を書いた。このコードはどうなるか?",
      code: `<span class="keyword">data</span> Person = Person String String Int Float String String
    <span class="keyword">deriving</span> (Show)

firstName :: Person -&gt; String
firstName (Person firstname _ _ _ _) = firstname`,
      choices: [
        { text: "通る。<code>_</code> は残りの引数をまとめて無視する", isCorrect: false },
        { text: "通る。パターンが足りない分は自動で無視される", isCorrect: false },
        { text: "コンパイルエラー。<code>Person</code> は6引数なのにパターンが5つしかない", isCorrect: true },
        { text: "コンパイルは通るが、6番目のフィールドを持つ値を渡したときだけ実行時エラーになる", isCorrect: false }
      ],
      explanation: "値コンストラクタのパターンマッチは引数の個数を完全に一致させる必要がある。<code>_</code> は「1つの値を無視する」ワイルドカードで、可変個をまとめる意味はない。レコード構文を使えばこうした位置合わせの手間なしにアクセサが手に入る。"
    }
  ]
};
