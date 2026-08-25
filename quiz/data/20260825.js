window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260825"] = {
  date: "20260825",
  title: "レコード型へのEq自動導出",
  questions: [
    {
      id: "20260825-q1",
      question: "<code>deriving (Eq)</code> を付けたレコード型の値同士を <code>==</code> で比較したとき、Haskellが行う比較の手順として正しいものはどれか？",
      code: `<span class="keyword">data</span> Person = Person { firstName :: String
                     , lastName  :: String
                     , age       :: Int
                     } <span class="keyword">deriving</span> (Eq)

mikeD = Person {firstName = <span class="comment">"Michael"</span>, lastName = <span class="comment">"Diamond"</span>, age = 43}`,
      choices: [
        { text: "各フィールドの値をメモリ上のビット列としてまとめて比較し、完全一致すれば <code>True</code> を返す", isCorrect: false },
        { text: "まず値コンストラクタが同じかを調べ、同じなら中の各フィールドの組をそれぞれ <code>==</code> で比較して、すべて一致すれば <code>True</code> を返す", isCorrect: true },
        { text: "フィールド名（<code>firstName</code> など）の文字列が一致するかどうかだけを調べる", isCorrect: false },
        { text: "先頭のフィールドだけを <code>==</code> で比較し、一致すれば残りのフィールドは比較せずに <code>True</code> を返す", isCorrect: false }
      ],
      explanation: "自動導出された <code>Eq</code> インスタンスは、最初に値コンストラクタの一致を調べ、次に各フィールドを対応する組ごとに <code>==</code> で比較する。すべてのフィールドが一致した場合のみ <code>True</code> になる。"
    },
    {
      id: "20260825-q2",
      question: "次のように <code>Person</code> に関数型のフィールドを追加して <code>deriving (Eq)</code> しようとするとどうなるか？",
      code: `<span class="keyword">data</span> Person = Person { firstName :: String
                     , lastName  :: String
                     , age       :: Int
                     , greet     :: String -&gt; String
                     } <span class="keyword">deriving</span> (Eq)`,
      choices: [
        { text: "コンパイルは通り、<code>greet</code> フィールドは比較対象から自動的に除外される", isCorrect: false },
        { text: "コンパイルは通るが、<code>==</code> を実行した瞬間に実行時エラーになる", isCorrect: false },
        { text: "コンパイルは通り、関数フィールドは常に等しいものとして <code>True</code> 扱いされる", isCorrect: false },
        { text: "関数型 <code>String -&gt; String</code> が <code>Eq</code> のインスタンスではないため、コンパイルエラーになる", isCorrect: true }
      ],
      explanation: "<code>Eq</code> の自動導出は、その型に含まれるすべてのフィールドの型が <code>Eq</code> のインスタンスであることを要求する。関数型は <code>Eq</code> のインスタンスではないため、導出できずコンパイルエラーになる。"
    },
    {
      id: "20260825-q3",
      question: "<code>Person</code> を <code>deriving (Eq)</code> した状態で <code>mikeD `elem` beastieBoys</code> が書ける理由として最も適切なものはどれか？",
      code: `<span class="keyword">data</span> Person = Person { firstName :: String
                     , lastName  :: String
                     , age       :: Int
                     } <span class="keyword">deriving</span> (Eq)

elem :: (Eq a) =&gt; a -&gt; [a] -&gt; Bool

beastieBoys = [mca, adRock, mikeD]
mikeD \`elem\` beastieBoys  <span class="comment">-- True</span>`,
      choices: [
        { text: "<code>Person</code> が <code>Eq</code> のインスタンスなので、<code>Eq a</code> という型クラス制約のついた関数の <code>a</code> の位置で使えるから", isCorrect: true },
        { text: "<code>elem</code> はリストの要素をアドレスで比較するため、型クラスのインスタンスかどうかとは無関係に使えるから", isCorrect: false },
        { text: "レコード構文で定義された型は、<code>deriving</code> の有無にかかわらず <code>elem</code> で扱えるから", isCorrect: false },
        { text: "<code>beastieBoys</code> がリストとして定義されているため、要素の型に関する制約は課されないから", isCorrect: false }
      ],
      explanation: "<code>elem</code> の型は <code>(Eq a) =&gt; a -&gt; [a] -&gt; Bool</code> であり、要素の型が <code>Eq</code> のインスタンスであることを要求する。<code>Person</code> は <code>Eq</code> を導出済みなのでこの制約を満たし、<code>a</code> の位置に置ける。"
    },
    {
      id: "20260825-q4",
      question: "<code>deriving (Eq)</code> を付けずに定義した <code>Person</code> 同士を <code>==</code> で比較しようとすると、何が起きるか？",
      code: `<span class="keyword">data</span> Person = Person { firstName :: String
                     , lastName  :: String
                     , age       :: Int
                     }
<span class="comment">-- deriving なし</span>

mikeD == mikeD`,
      choices: [
        { text: "常に <code>False</code> が返る。インスタンスがない型は互いに等しくないとみなされるため", isCorrect: false },
        { text: "同じ値を指しているかどうかを参照で比較し、この場合は <code>True</code> が返る", isCorrect: false },
        { text: "<code>Person</code> が <code>Eq</code> のインスタンスではないため、コンパイルエラーになる", isCorrect: true },
        { text: "コンパイルは通るが、実行時に「インスタンスが見つからない」という例外が投げられる", isCorrect: false }
      ],
      explanation: "<code>==</code> は <code>Eq</code> 型クラスのメソッドであり、その型が <code>Eq</code> のインスタンスでなければ使えない。インスタンスの有無は型検査の段階で判定されるため、実行時ではなくコンパイル時にエラーになる。"
    },
    {
      id: "20260825-q5",
      question: "レコード構文で値を作るとき、フィールドを書く順番を定義と変えた場合、<code>==</code> の結果はどうなるか？",
      code: `<span class="keyword">data</span> Person = Person { firstName :: String
                     , lastName  :: String
                     , age       :: Int
                     } <span class="keyword">deriving</span> (Eq)

mikeD = Person {firstName = <span class="comment">"Michael"</span>, lastName = <span class="comment">"Diamond"</span>, age = 43}

mikeD == Person {age = 43, lastName = <span class="comment">"Diamond"</span>, firstName = <span class="comment">"Michael"</span>}`,
      choices: [
        { text: "フィールドの記述順が定義と異なるためコンパイルエラーになる", isCorrect: false },
        { text: "記述順が異なる値は別物として扱われるため <code>False</code> になる", isCorrect: false },
        { text: "レコード構文ではフィールド名で値を指定するため記述順は結果に影響せず、<code>True</code> になる", isCorrect: true },
        { text: "記述順が異なる場合は先頭フィールド同士だけが比較され、<code>firstName</code> と <code>age</code> の比較で型エラーになる", isCorrect: false }
      ],
      explanation: "レコード構文はフィールド名で値を対応づけるため、書く順番は自由であり、生成される値は同じになる。したがって導出された <code>==</code> による比較も <code>True</code> になる。"
    },
    {
      id: "20260825-q6",
      question: "値コンストラクタが複数ある型に <code>deriving (Eq)</code> を付けたとき、<code>Circle 5 == Rectangle 5 5</code> の評価はどうなるか？",
      code: `<span class="keyword">data</span> Shape = Circle Float
           | Rectangle Float Float
           <span class="keyword">deriving</span> (Eq)

Circle 5 == Rectangle 5 5`,
      choices: [
        { text: "フィールドに現れる数値がすべて <code>5</code> で一致するため <code>True</code> になる", isCorrect: false },
        { text: "値コンストラクタが異なる時点で <code>False</code> となり、フィールドの比較には進まない", isCorrect: true },
        { text: "コンストラクタが違う値同士は比較できないため、コンパイルエラーになる", isCorrect: false },
        { text: "フィールドの個数が異なるため、実行時にパターンマッチ失敗の例外が投げられる", isCorrect: false }
      ],
      explanation: "自動導出された <code>Eq</code> はまず値コンストラクタが同じかを調べる。<code>Circle</code> と <code>Rectangle</code> は異なるコンストラクタなので、その時点で <code>False</code> が確定し、各フィールドの比較は行われない。"
    }
  ]
};
