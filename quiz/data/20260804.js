window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260804"] = {
  date: "20260804",
  title: "Point型による構造化とネストしたパターンマッチ",
  questions: [
    {
      id: "20260804-q1",
      question: "<code>data Point = Point Float Float</code> のように、型名と値コンストラクタ名に同じ <code>Point</code> を使えるのはなぜか?",
      code: `<span class="keyword">data</span> Point = Point Float Float <span class="keyword">deriving</span> (Show)`,
      choices: [
        { text: "同じ名前を書くと、その型が1つの値コンストラクタしか持てないことをコンパイラに指示できるから", isCorrect: false },
        { text: "型名と値コンストラクタは別々の名前空間に属するため衝突しない。値コンストラクタが1つだけの型では同名にするのが慣例", isCorrect: true },
        { text: "<code>=</code> の右辺は左辺の別名を定義しているだけで、実質1つの名前しか存在しないから", isCorrect: false },
        { text: "<code>deriving (Show)</code> を付けた型に限り、型名を値コンストラクタ名として再利用できるから", isCorrect: false }
      ],
      explanation: "Haskellでは型が現れる文脈(型シグネチャなど)と値が現れる文脈(式・パターン)が構文上はっきり分かれているため、同じ綴りでも曖昧にならない。値コンストラクタが1つしかない型では、わざわざ別名を考えず型名と同じにするのが慣例。ただし名前が同じでも実体は別物で、型シグネチャに書けるのは型としての<code>Point</code>だけ。"
    },
    {
      id: "20260804-q2",
      question: "以下の定義のもとで <code>nudge (Circle (Point 34 34) 10) 5 10</code> を評価した結果はどれか?",
      code: `<span class="keyword">data</span> Point = Point Float Float <span class="keyword">deriving</span> (Show)
<span class="keyword">data</span> Shape = Circle Point Float | Rectangle Point Point <span class="keyword">deriving</span> (Show)

nudge :: Shape -> Float -> Float -> Shape
nudge (Circle (Point x y) r) a b = Circle (Point (x+a) (y+b)) r

ghci> nudge (Circle (Point 34 34) 10) 5 10`,
      choices: [
        { text: "<code>Circle (Point 39.0 44.0) 15.0</code>", isCorrect: false },
        { text: "<code>Circle (Point 34.0 34.0) 10.0</code>", isCorrect: false },
        { text: "<code>Circle (Point 44.0 39.0) 10.0</code>", isCorrect: false },
        { text: "<code>Circle (Point 39.0 44.0) 10.0</code>", isCorrect: true }
      ],
      explanation: "ネストしたパターン <code>(Circle (Point x y) r)</code> により <code>x=34, y=34, r=10</code> が束縛され、<code>a=5, b=10</code> が移動量として渡される。x座標に<code>a</code>、y座標に<code>b</code>を足すので中心は<code>(39, 44)</code>になる。半径<code>r</code>は式に登場せずそのまま再構築されるため変化しない。"
    },
    {
      id: "20260804-q3",
      question: "<code>data Shape = Circle Point Float | ...</code> に対する <code>area (Circle _ r)</code> で、ワイルドカード <code>_</code> が1つで済むのはなぜか?",
      code: `<span class="keyword">data</span> Point = Point Float Float <span class="keyword">deriving</span> (Show)
<span class="keyword">data</span> Shape = Circle Point Float | Rectangle Point Point <span class="keyword">deriving</span> (Show)

area :: Shape -> Float
area (Circle _ r) = pi * r ^ 2`,
      choices: [
        { text: "<code>Circle</code>のフィールドが「Point 1つ」と「Float 1つ」の計2つになり、中心座標がPointという1つの値にまとまったから", isCorrect: true },
        { text: "<code>_</code>は残りのフィールドをまとめて無視する記法なので、フィールドが何個あっても常に1つで足りるから", isCorrect: false },
        { text: "<code>Point</code>が<code>deriving (Show)</code>されているため、パターンでは1つの値として扱われるから", isCorrect: false },
        { text: "パターン中の<code>_</code>は最大1つまでしか書けない決まりだから", isCorrect: false }
      ],
      explanation: "<code>Circle Float Float Float</code> ならフィールドは3つで <code>(Circle _ _ r)</code> と書く必要がある。<code>Circle Point Float</code> では中心座標がPointという1つの値に構造化されているためフィールドは2つになり、捨てる位置は1つで済む。<code>_</code>は「その位置に1つ」のワイルドカードであり、複数フィールドをまとめて表すものではない。"
    },
    {
      id: "20260804-q4",
      question: "以下の定義のもとで <code>nudge (baseRect 40 100) 60 23</code> を評価した結果はどれか?",
      code: `nudge :: Shape -> Float -> Float -> Shape
nudge (Rectangle (Point x1 y1) (Point x2 y2)) a b =
    Rectangle (Point (x1+a) (y1+b)) (Point (x2+a) (y2+b))

baseRect :: Float -> Float -> Shape
baseRect width height = Rectangle (Point 0 0) (Point width height)

ghci> nudge (baseRect 40 100) 60 23`,
      choices: [
        { text: "<code>Rectangle (Point 60.0 23.0) (Point 40.0 100.0)</code>", isCorrect: false },
        { text: "<code>Rectangle (Point 0.0 0.0) (Point 100.0 123.0)</code>", isCorrect: false },
        { text: "<code>Rectangle (Point 60.0 23.0) (Point 100.0 123.0)</code>", isCorrect: true },
        { text: "<code>Rectangle (Point 60.0 23.0) (Point 160.0 223.0)</code>", isCorrect: false }
      ],
      explanation: "<code>baseRect 40 100</code> は左下が原点の長方形 <code>Rectangle (Point 0 0) (Point 40 100)</code> を作る。<code>nudge</code>は両方の頂点に同じ移動量を足すので、<code>(0+60, 0+23) = (60, 23)</code> と <code>(40+60, 100+23) = (100, 123)</code> になる。片方の頂点だけ動かすと形が変わってしまうため、平行移動では全頂点に同じ量を加算する。"
    },
    {
      id: "20260804-q5",
      question: "<code>data Shape = Circle Point Float | ...</code> と定義した状態で <code>baseCircle r = Circle 0 0 r</code> と書くとどうなるか?",
      code: `<span class="keyword">data</span> Point = Point Float Float <span class="keyword">deriving</span> (Show)
<span class="keyword">data</span> Shape = Circle Point Float | Rectangle Point Point <span class="keyword">deriving</span> (Show)

baseCircle :: Float -> Shape
baseCircle r = Circle 0 0 r`,
      choices: [
        { text: "問題なく動く。<code>Circle 0 0 r</code> の最初の2つの数値が自動的に<code>Point 0 0</code>に変換されるから", isCorrect: false },
        { text: "型エラーになる。<code>Circle</code>は<code>Point -&gt; Float -&gt; Shape</code>型なので第1引数に数値リテラルは渡せず、引数も1つ多いから", isCorrect: true },
        { text: "コンパイルは通るが、実行時にパターンマッチ失敗のエラーになる", isCorrect: false },
        { text: "<code>Circle 0 0</code> が部分適用として解釈され、<code>r</code>は無視される", isCorrect: false }
      ],
      explanation: "<code>Circle Point Float</code> という定義から値コンストラクタ<code>Circle</code>の型は<code>Point -&gt; Float -&gt; Shape</code>となり、受け取る引数は2つ。数値リテラルからPointへの暗黙変換は存在しないため、<code>Circle (Point 0 0) r</code> と明示的にPointを構築する必要がある。フィールドをPointにまとめたことで、座標の組を取り違える型エラーをコンパイル時に検出できるようになる。"
    },
    {
      id: "20260804-q6",
      question: "<code>nudge (Circle p r) a b = Circle (Point (x+a) (y+b)) r</code> と書くとどうなるか?",
      code: `nudge :: Shape -> Float -> Float -> Shape
nudge (Circle p r) a b = Circle (Point (x+a) (y+b)) r`,
      choices: [
        { text: "動作する。<code>p</code>がPointなので<code>x</code>・<code>y</code>はそのフィールド名として自動的に使えるから", isCorrect: false },
        { text: "動作する。<code>p</code>に対する加算が座標ごとに自動で分配されるから", isCorrect: false },
        { text: "コンパイルは通るが、<code>x</code>・<code>y</code>が<code>0</code>として扱われ中心が移動量そのものになる", isCorrect: false },
        { text: "コンパイルエラーになる。<code>x</code>・<code>y</code>はどこにも束縛されておらずスコープに存在しないから", isCorrect: true }
      ],
      explanation: "<code>(Circle p r)</code> はPoint全体を<code>p</code>という名前に束縛するだけで、その中身は取り出さない。中の座標を使うには <code>(Circle (Point x y) r)</code> とネストしたパターンで分解して<code>x</code>・<code>y</code>を束縛するか、<code>p</code>を別途<code>case</code>やwhereで分解する必要がある。パターンマッチで導入されない名前はスコープに存在せず<code>Variable not in scope</code>となる。"
    },
    {
      id: "20260804-q7",
      question: "<code>Point</code>には<code>deriving</code>を付けず、<code>Shape</code>にだけ<code>deriving (Show)</code>を付けるとどうなるか?",
      code: `<span class="keyword">data</span> Point = Point Float Float
<span class="keyword">data</span> Shape = Circle Point Float | Rectangle Point Point <span class="keyword">deriving</span> (Show)`,
      choices: [
        { text: "コンパイルエラーになる。ShapeのShowインスタンスを自動導出するには、フィールドの型であるPointもShowのインスタンスである必要があるから", isCorrect: true },
        { text: "問題なくコンパイルされ、Shapeを表示するとPointの部分だけ<code>&lt;Point&gt;</code>のような既定の表記になる", isCorrect: false },
        { text: "問題なくコンパイルされる。<code>deriving</code>はフィールドの型にも自動的に伝播するから", isCorrect: false },
        { text: "コンパイルは通るが、Shapeを表示しようとした時点で実行時エラーになる", isCorrect: false }
      ],
      explanation: "<code>deriving (Show)</code> による自動導出は、値コンストラクタ名とフィールドを順に文字列化する実装を生成する。そのためフィールドの型自身がShowのインスタンスであることが前提になり、PointがShowでなければ<code>No instance for (Show Point)</code>としてコンパイル時にエラーになる。導出は下位の型へ伝播しないので、<code>Point</code>にも明示的に<code>deriving (Show)</code>を付ける必要がある。"
    }
  ]
};
