window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260803"] = {
  date: "20260803",
  title: "値コンストラクタの正体とderiving Show",
  questions: [
    {
      id: "20260803-q1",
      question: "<code>data Shape = Circle Float Float Float | Rectangle Float Float Float Float</code> と定義したとき、<code>area :: Circle -&gt; Float</code> という型シグネチャが書けないのはなぜか?",
      code: `<span class="keyword">data</span> Shape = Circle Float Float Float | Rectangle Float Float Float Float

<span class="comment">-- これはエラー</span>
area :: Circle -> Float`,
      choices: [
        { text: "Circleのフィールドが3つあるため、型シグネチャに省略せず書く必要があるから", isCorrect: false },
        { text: "Circleが<code>deriving (Show)</code>されていないため型として使えないから", isCorrect: false },
        { text: "Circleは値コンストラクタ(実態は関数)であって型ではないから。型として書けるのは<code>Shape</code>のみ", isCorrect: true },
        { text: "複数の値コンストラクタを持つ型は、型シグネチャで個別に指定する構文が別に必要だから", isCorrect: false }
      ],
      explanation: "<code>data Shape = ...</code> の<code>=</code>の左側<code>Shape</code>が型名、右側の<code>Circle</code>・<code>Rectangle</code>は値コンストラクタ。型シグネチャに書けるのは型名だけなので<code>Shape -&gt; Float</code>となる。"
    },
    {
      id: "20260803-q2",
      question: "<code>data Shape = Circle Float Float Float | Rectangle Float Float Float Float</code> と定義したとき、GHCiで <code>:t Rectangle</code> を実行した結果はどれか?",
      code: `<span class="keyword">data</span> Shape = Circle Float Float Float | Rectangle Float Float Float Float

ghci> :t Rectangle
???`,
      choices: [
        { text: "<code>Rectangle :: Float -&gt; Float -&gt; Float -&gt; Float -&gt; Shape</code>", isCorrect: true },
        { text: "<code>Rectangle :: Shape</code>", isCorrect: false },
        { text: "<code>Rectangle :: (Float, Float, Float, Float) -&gt; Shape</code>", isCorrect: false },
        { text: "<code>Rectangle :: Float -&gt; Shape</code>", isCorrect: false }
      ],
      explanation: "値コンストラクタは、フィールドの型を引数として順に受け取り、最終的にそのデータ型の値を返す関数。<code>Rectangle</code>はFloatのフィールドを4つ持つため、Floatを4つ受け取って<code>Shape</code>を返す関数の型になる。フィールドはタプルではなくカリー化された個別の引数として扱われる。"
    },
    {
      id: "20260803-q3",
      question: "<code>data Shape = Circle Float Float Float | ...</code> と定義した状態で <code>map (Circle 10 20) [4,5,6]</code> を評価するとどうなるか?",
      code: `<span class="keyword">data</span> Shape = Circle Float Float Float | Rectangle Float Float Float Float
    <span class="keyword">deriving</span> (Show)

ghci> map (Circle 10 20) [4,5,6]`,
      choices: [
        { text: "エラーになる。値コンストラクタは部分適用できないから", isCorrect: false },
        { text: "エラーになる。<code>map</code>の第1引数には名前付き関数しか渡せないから", isCorrect: false },
        { text: "<code>[Circle 10.0 20.0 4.0]</code> のみ。リストの先頭要素にだけ適用されるから", isCorrect: false },
        { text: "<code>[Circle 10.0 20.0 4.0,Circle 10.0 20.0 5.0,Circle 10.0 20.0 6.0]</code>。中心(10,20)を固定し半径だけ違う同心円のリストになる", isCorrect: true }
      ],
      explanation: "値コンストラクタは関数なので部分適用できる。<code>Circle 10 20</code> は<code>Float -&gt; Shape</code>型の関数となり、これを<code>map</code>でリストの各要素に適用すると、中心座標が共通で半径だけ異なるShapeのリストが得られる。"
    },
    {
      id: "20260803-q4",
      question: "<code>data Shape = Circle Float Float Float | Rectangle Float Float Float Float</code> とだけ定義した状態(deriving なし)で、GHCiに <code>Circle 10 20 5</code> と入力するとどうなるか?",
      code: `<span class="keyword">data</span> Shape = Circle Float Float Float | Rectangle Float Float Float Float

ghci> Circle 10 20 5`,
      choices: [
        { text: "<code>Circle 10.0 20.0 5.0</code> と表示される。フィールドがFloatなのでそのまま表示できる", isCorrect: false },
        { text: "<code>No instance for 'Show Shape'</code> エラーになる。GHCiは結果を<code>print</code>しようとするが、Shapeを文字列にする方法が定義されていないから", isCorrect: true },
        { text: "型エラーになる。<code>10</code>・<code>20</code>・<code>5</code>はInt型リテラルなのでFloatのフィールドに渡せないから", isCorrect: false },
        { text: "エラーにはならず、何も表示されずにプロンプトへ戻る", isCorrect: false }
      ],
      explanation: "GHCiは入力式の結果を<code>print</code>で表示しようとするため、その型がShow型クラスのインスタンスである必要がある。値の構築自体は成功しているが表示方法が未定義なのでエラーになる。<code>deriving (Show)</code>を付けるとHaskellが自動的にShowのインスタンスにしてくれる。"
    },
    {
      id: "20260803-q5",
      question: "<code>area (Circle _ _ r) = pi * r ^ 2</code> における2つの <code>_</code> の意味として正しいものはどれか?",
      code: `area :: Shape -> Float
area (Circle _ _ r) = pi * r ^ 2
area (Rectangle x1 y1 x2 y2) = (abs $ x2 - x1) * (abs $ y2 - y1)`,
      choices: [
        { text: "Circleの3つのフィールドのうち、任意の位置の2つにマッチすることを表す", isCorrect: false },
        { text: "フィールドの型がFloat以外でもマッチさせるための型のワイルドカード", isCorrect: false },
        { text: "中心座標のフィールドを既定値<code>0.0</code>に束縛している", isCorrect: false },
        { text: "第1・第2フィールド(中心座標)に位置どおりマッチするが、名前には束縛しない。面積計算に不要なので捨てている", isCorrect: true }
      ],
      explanation: "フィールドを持つ値コンストラクタのパターンマッチでは、値コンストラクタ名に続けてフィールドを定義順に並べる。<code>_</code>はその位置にマッチはするが名前に束縛しないワイルドカードで、円の面積は半径<code>r</code>だけで求まるため中心座標を捨てている。"
    },
    {
      id: "20260803-q6",
      question: "<code>area :: Shape -&gt; Float</code> が定義された状態で、<code>area $ Circle 10 20 10</code> から <code>$</code> を外して <code>area Circle 10 20 10</code> と書くとどうなるか?",
      code: `area :: Shape -> Float
area (Circle _ _ r) = pi * r ^ 2

ghci> area $ Circle 10 20 10
314.15927

ghci> area Circle 10 20 10
???`,
      choices: [
        { text: "同じく<code>314.15927</code>になる。<code>$</code>は省略しても意味が変わらない糖衣構文だから", isCorrect: false },
        { text: "<code>Circle</code>が部分適用され、Shapeを返す関数が得られる", isCorrect: false },
        { text: "型エラーになる。関数適用は左結合なので<code>((((area Circle) 10) 20) 10)</code>と解釈され、<code>area</code>に値コンストラクタ<code>Circle</code>自体を渡す形になるから", isCorrect: true },
        { text: "実行時エラーになる。型検査は通るがパターンマッチに失敗するから", isCorrect: false }
      ],
      explanation: "関数適用は最も強く左結合で結びつくため、<code>area Circle 10 20 10</code>は<code>area</code>に4つの引数を与える式として解釈される。<code>area</code>は<code>Shape</code>を1つ受け取る関数であり、第1引数に渡される<code>Circle</code>は<code>Float -&gt; Float -&gt; Float -&gt; Shape</code>型なので型が合わない。<code>$</code>は最も弱い右結合の演算子で、右側全体を1つの引数にまとめる働きをする。"
    }
  ]
};
