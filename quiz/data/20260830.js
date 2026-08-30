window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260830"] = {
  date: "20260830",
  title: "ShowとReadと型注釈",
  questions: [
    {
      id: "20260830-q1",
      question: "<code>deriving</code> から <code>Show</code> を外した状態でGHCiに <code>mikeD</code> とだけ打つと <code>No instance for 'Show Person' arising from a use of 'print'</code> というエラーになる。エラーメッセージに <code>print</code> が出てくるのはなぜか？",
      code: `<span class="keyword">data</span> Person = Person { firstName :: String
                     , lastName  :: String
                     , age       :: Int
                     } <span class="keyword">deriving</span> (Eq, Read)

ghci&gt; mikeD = Person {firstName = <span class="comment">"Michael"</span>, lastName = <span class="comment">"Diamond"</span>, age = 43}
ghci&gt; mikeD`,
      choices: [
        { text: "値を作る時点で <code>print</code> が呼ばれており、<code>Person</code> の値コンストラクタ自体が <code>Show</code> を要求しているから", isCorrect: false },
        { text: "<code>deriving</code> に <code>Read</code> があると <code>print</code> が自動で挿入される仕様だから", isCorrect: false },
        { text: "GHCiは入力した式の結果を <code>print</code> で表示しており、<code>print</code> が内部で <code>show</code> を使うため、その型に <code>Show</code> インスタンスが必要になるから", isCorrect: true },
        { text: "レコード構文で定義された型は表示のとき必ず <code>print</code> を経由する決まりで、通常の <code>data</code> 型なら <code>Show</code> なしでも表示できるから", isCorrect: false }
      ],
      explanation: "GHCiは評価した式の値を <code>print</code> で画面に出す。<code>print x = putStrLn (show x)</code> のように <code>show</code> を使うので、表示したい型に <code>Show</code> インスタンスがないとエラーになる。値を作ること自体には <code>Show</code> は不要で、表示しようとした瞬間に要求される。"
    },
    {
      id: "20260830-q2",
      question: "<code>deriving (Eq, Show, Read)</code> した <code>Person</code> に対して、GHCiで <code>read mysteryDude</code> と型注釈なしで書くと型が決まらずエラーになる。その根本的な理由はどれか？",
      code: `<span class="keyword">data</span> Person = Person { firstName :: String
                     , lastName  :: String
                     , age       :: Int
                     } <span class="keyword">deriving</span> (Eq, Show, Read)

ghci&gt; mysteryDude = <span class="comment">"Person { firstName = \\"Michael\\", lastName = \\"Diamond\\", age = 43}"</span>
ghci&gt; read mysteryDude

<span class="comment">-- readの型</span>
read :: Read a =&gt; String -&gt; a`,
      choices: [
        { text: "<code>read</code> の戻り値の型は <code>Read a =&gt; a</code> という型変数で、引数は <code>String</code> しかないため、文字列の中身から戻り値の型を決めることはできないから", isCorrect: true },
        { text: "<code>read</code> は必ず <code>String</code> を返す関数で、他の型を返させるには型注釈で強制的にキャストする必要があるから", isCorrect: false },
        { text: "<code>mysteryDude</code> が <code>Person</code> のレコード構文の形をしていないため、パースに失敗しているから", isCorrect: false },
        { text: "<code>Read</code> は <code>deriving</code> で自動導出できず、型注釈を書いた時だけインスタンスが作られるから", isCorrect: false }
      ],
      explanation: "<code>read :: Read a =&gt; String -&gt; a</code> の <code>a</code> は呼び出し側の文脈で決まる。引数は <code>String</code> なので型推論の手がかりにならず、文字列の中身は実行時の値であって型情報にはならない。そのため <code>read mysteryDude :: Person</code> のように型注釈を与えるか、他の式から推論できる文脈に置く必要がある。"
    },
    {
      id: "20260830-q3",
      question: "<code>read \"Just 3\" :: Maybe a</code> はエラーになるが、<code>read \"Just 3\" :: Maybe Int</code> は <code>Just 3</code> を返す。この違いを説明するものはどれか？",
      code: `ghci&gt; read <span class="comment">"Just 3"</span> :: Maybe a
&lt;interactive&gt;: error: No instance for 'Read a1' arising from a use of 'read'

ghci&gt; read <span class="comment">"Just 3"</span> :: Maybe Int
Just 3`,
      choices: [
        { text: "<code>Maybe</code> は <code>Read</code> のインスタンスではないため、<code>Maybe Int</code> のように具体型を書いた場合だけ特別に許可されるから", isCorrect: false },
        { text: "型注釈には型変数を書くことが構文上できず、必ず具体型を書かなければならないから", isCorrect: false },
        { text: "文字列 <code>\"Just 3\"</code> の <code>3</code> は <code>Int</code> としか解釈できないので、<code>Maybe a</code> と書くと文字列の中身と矛盾するから", isCorrect: false },
        { text: "<code>Maybe a</code> では中身の型 <code>a</code> が未確定のままで、その <code>a</code> をどう読み取るか（<code>Read a</code> のインスタンス）を決められないから", isCorrect: true }
      ],
      explanation: "<code>Maybe</code> の <code>Read</code> インスタンスは中身の型の <code>Read</code> インスタンスを使って値を読み取る。<code>Maybe a</code> のままだと <code>a</code> が何かわからず <code>Read a</code> を解決できないためエラーになる。<code>Maybe Int</code> と具体型まで指定すれば <code>Read Int</code> が使われて読み取れる。"
    },
    {
      id: "20260830-q4",
      question: "<code>read mysteryDude</code> は単体では型が決まらずエラーになるのに、<code>read mysteryDude == mikeD</code> は型注釈なしで <code>True</code> になる。なぜか？",
      code: `ghci&gt; mikeD = Person {firstName = <span class="comment">"Michael"</span>, lastName = <span class="comment">"Diamond"</span>, age = 43}
ghci&gt; read mysteryDude == mikeD
True`,
      choices: [
        { text: "<code>==</code> は両辺を文字列に変換してから比較するため、<code>read</code> の戻り値の型を決める必要がないから", isCorrect: false },
        { text: "<code>==</code> は両辺が同じ型であることを要求するので、右辺の <code>mikeD :: Person</code> から左辺の <code>read</code> の戻り値も <code>Person</code> だと推論できるから", isCorrect: true },
        { text: "<code>Eq</code> を <code>deriving</code> した型では <code>read</code> の型注釈が不要になるという特別扱いがあるから", isCorrect: false },
        { text: "比較式の中では型チェックが行われず、実行時に値が一致するかだけを見るから", isCorrect: false }
      ],
      explanation: "<code>(==) :: Eq a =&gt; a -&gt; a -&gt; Bool</code> は両辺が同じ型 <code>a</code> であることを要求する。右辺が <code>Person</code> なので左辺も <code>Person</code> に決まり、<code>read</code> の戻り値の型が推論で確定する。型注釈は「型を決める手段の一つ」であって、文脈から決まるなら不要になる。"
    },
    {
      id: "20260830-q5",
      question: "<code>Person</code> を <code>deriving (Eq, Read)</code>（<code>Show</code> なし）で定義した。このときGHCiでの挙動として正しいものはどれか？",
      code: `<span class="keyword">data</span> Person = Person { firstName :: String
                     , lastName  :: String
                     , age       :: Int
                     } <span class="keyword">deriving</span> (Eq, Read)

mysteryDude = <span class="comment">"Person { firstName = \\"Michael\\", lastName = \\"Diamond\\", age = 43}"</span>
mikeD = Person {firstName = <span class="comment">"Michael"</span>, lastName = <span class="comment">"Diamond"</span>, age = 43}`,
      choices: [
        { text: "<code>Read</code> があれば <code>Show</code> も同時に使えるようになるので、<code>show mikeD</code> も問題なく動く", isCorrect: false },
        { text: "<code>Show</code> がないので <code>Read</code> のインスタンスも作れず、<code>read mysteryDude :: Person</code> の時点でエラーになる", isCorrect: false },
        { text: "<code>read mysteryDude == mikeD</code> は <code>True</code> と表示できるが、<code>read mysteryDude :: Person</code> だけを打つと表示のところでエラーになる", isCorrect: true },
        { text: "<code>Person</code> の値は一切扱えなくなり、値を作る式そのものがコンパイルエラーになる", isCorrect: false }
      ],
      explanation: "<code>read mysteryDude == mikeD</code> の結果は <code>Bool</code> で、<code>Bool</code> には <code>Show</code> インスタンスがあるためGHCiは <code>True</code> を表示できる。一方 <code>read mysteryDude :: Person</code> は結果が <code>Person</code> なので、表示しようとした時点で <code>Show Person</code> がなくエラーになる。読み取り自体（<code>Read</code>）と表示（<code>Show</code>）は独立した型クラスである。"
    },
    {
      id: "20260830-q6",
      question: "<code>deriving (Read)</code> で自動導出された <code>Read</code> インスタンスの性質として正しいものはどれか？",
      code: `<span class="keyword">data</span> Person = Person { firstName :: String
                     , lastName  :: String
                     , age       :: Int
                     } <span class="keyword">deriving</span> (Eq, Show, Read)

ghci&gt; mysteryDude = <span class="comment">"Person { firstName = \\"Michael\\""</span> ++ <span class="comment">", lastName = \\"Diamond\\""</span> ++ <span class="comment">", age = 43}"</span>
ghci&gt; read mysteryDude :: Person
Person {firstName = <span class="comment">"Michael"</span>, lastName = <span class="comment">"Diamond"</span>, age = 43}`,
      choices: [
        { text: "<code>Show</code> が出力するのと同じ形式の文字列を解釈でき、トークンの区切りとしての余分な空白は無視される", isCorrect: true },
        { text: "<code>show</code> が出力した文字列と1文字も違わない場合のみ読み取れ、空白が1つでも増えると失敗する", isCorrect: false },
        { text: "フィールド名は無視され、値が書かれた順番だけで各フィールドに割り当てられる", isCorrect: false },
        { text: "文字列の中身にかかわらず、パースに失敗したフィールドにはその型のデフォルト値が入る", isCorrect: false }
      ],
      explanation: "自動導出された <code>Read</code> は <code>Show</code> の出力と対になる構文を解釈する。字句解析はトークン単位なので、<code>Person { firstName = ...</code> のようにブレースの後の空白が増えても読み取れる。一方で構文として解釈できない文字列を渡すと実行時エラーになり、デフォルト値で埋められることはない。"
    }
  ]
};
