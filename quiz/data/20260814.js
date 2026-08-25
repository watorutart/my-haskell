window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260814"] = {
  date: "20260814",
  title: "自作データ型・型クラス制約・deriving",
  questions: [
    {
      id: "20260814-q1",
      question: "<code>data Vector a = Vector a a a</code> と定義したとき、型引数 <code>a</code> が1つだけに設計されている主な理由として最も適切な説明はどれか？",
      code: `<span class="keyword">data</span> Vector a = Vector a a a <span class="keyword">deriving</span> (Show)

vplus :: (Num a) =&gt; Vector a -&gt; Vector a -&gt; Vector a
(Vector i j k) \`vplus\` (Vector l m n) = Vector (i+l) (j+m) (k+n)`,
      choices: [
        { text: "<code>deriving (Show)</code> を使って自動導出する場合、自動生成される <code>Show</code> インスタンスの制限によって型引数は必ず1つにする必要があるから", isCorrect: false },
        { text: "ベクトルの3つの成分（X, Y, Z座標）はすべて同じ数値型であることを保証したく、1つの型引数でそれらを統一的に表現できるから", isCorrect: true },
        { text: "Haskellの値コンストラクタに渡す引数がすべて同じ値になるようにコンパイラが強制するため", isCorrect: false },
        { text: "Haskellのデータ型宣言では、値コンストラクタの引数の個数と型引数の個数は常に一致していなければならないから", isCorrect: false }
      ],
      explanation: "ベクトルの各成分（X, Y, Z）は同じ数値型（たとえば Double や Float など）であることが自然であるため、型引数を1つ（<code>a</code>）にすることで、すべての成分が同じ型であることを保証できます。仮に <code>data Vector a b c = Vector a b c</code> とすると、各成分が異なる型を持つことが許されてしまい、ベクトル同士の加算などの演算が困難になります。"
    },
    {
      id: "20260814-q2",
      question: "Haskellにおいて、データ型宣言自体に型クラス制約を記述すること（例: <code>data (Num a) => Vector a = ...</code>）について、正しい説明はどれか？",
      code: `<span class="comment">-- データ宣言で制約を指定したと仮定</span>
<span class="keyword">data</span> (Num a) =&gt; Vector a = Vector a a a

vplus :: Vector a -&gt; Vector a -&gt; Vector a  <span class="comment">-- これで通るか？</span>`,
      choices: [
        { text: "データ型宣言に <code>(Num a) =&gt;</code> を付与すれば、関数定義の型シグネチャから <code>(Num a) =&gt;</code> 制約を省略できるようになる", isCorrect: false },
        { text: "データ型宣言に制約を追加すると、実行時の型チェックが最適化され、パフォーマンスが大幅に向上する", isCorrect: false },
        { text: "データ型宣言に制約を付与しても、関数定義側で <code>(Num a) =&gt;</code> などの制約を省略することはできないため、一般的には不要であり、関数側でのみ制約を付与することが推奨される", isCorrect: true },
        { text: "データ型宣言の制約は、<code>deriving (Show)</code> を行うために必須の記述である", isCorrect: false }
      ],
      explanation: "データ型宣言に型クラス制約（例: <code>(Num a) =&gt;</code>）を付与しても、その型を操作する関数のシグネチャにおいて型クラス制約を省略することはできません。結局関数側でも記述する必要があるため、データ宣言に制約を付与することは実質的な意味がなく、一般に非推奨とされています。"
    },
    {
      id: "20260814-q3",
      question: "Haskellにおける「型クラス (Type Class)」と、JavaやC++などのオブジェクト指向言語における「クラス (Class)」の概念的な違いに関する記述として、最も適切なものはどれか？",
      code: `<span class="comment">-- Haskellの型クラス（等値性を定義）</span>
<span class="keyword">class</span> Eq a <span class="keyword">where</span>
  (==) :: a -&gt; a -&gt; Bool
  (/=) :: a -&gt; a -&gt; Bool`,
      choices: [
        { text: "オブジェクト指向のクラスは状態とメソッドをカプセル化した「値の設計図」であるが、Haskellの型クラスは「ある型がどのような振る舞い（関数）を提供しているか」を定義するインターフェースに近い", isCorrect: true },
        { text: "Haskellの型クラスは、オブジェクト指向のクラスと同様に <code>new</code> キーワードや値コンストラクタを用いて新しいデータオブジェクト自体を生成するための仕組みである", isCorrect: false },
        { text: "オブジェクト指向のクラスは静的にコンパイル時に決定されるが、Haskellの型クラスは実行時に動的にデータの振る舞いを追加するための動的ディスパッチ機構である", isCorrect: false },
        { text: "Haskellの型クラスは、データ構造のメモリ配置やレコードフィールドのオフセットを決定するための仕様定義である", isCorrect: false }
      ],
      explanation: "Haskellの型クラスは、オブジェクト指向のクラス（値を作るブループリント）とは異なり、「ある型が特定の振る舞い（例えば、等値比較ができる <code>Eq</code>、文字列化できる <code>Show</code> など）をサポートしていること」を定義・表明するための仕組みです。"
    },
    {
      id: "20260814-q4",
      question: "<code>data Vector a = Vector a a a deriving (Eq, Show)</code> と定義された型について、<code>Vector (\\x -&gt; x) == Vector (\\x -&gt; x)</code>（関数の比較）を行おうとした場合のコンパイル・実行時の挙動として、正しいものはどれか？",
      code: `<span class="keyword">data</span> Vector a = Vector a a a <span class="keyword">deriving</span> (Eq, Show)

<span class="comment">-- 以下を実行しようとした場合</span>
Vector (\\x -&gt; x) == Vector (\\x -&gt; x)`,
      choices: [
        { text: "<code>deriving (Eq)</code> が指定されているため、型パラメータ <code>a</code> がどのような型であってもコンパイルは通り、実行時に型が比較可能かどうかが判定される", isCorrect: false },
        { text: "関数型は <code>Eq</code> のインスタンスではないが、<code>deriving (Eq)</code> によって自動的に関数のソースコード文字列の比較にフォールバックして実行される", isCorrect: false },
        { text: "<code>Vector</code> の等値性判定はコンパイルエラーにならず、コンパイル後のバイナリのメモリ番地を比較するため、関数値であっても <code>True</code> または <code>False</code> が返る", isCorrect: false },
        { text: "<code>deriving (Eq)</code> で自動導出される <code>Eq</code> インスタンスは、型引数 <code>a</code> 自体が <code>Eq</code> のインスタンスであることを要求するため、<code>a</code> が関数型（<code>Eq</code> インスタンスではない）の場合はコンパイルエラーになる", isCorrect: true }
      ],
      explanation: "<code>deriving (Eq)</code> で自動導出される <code>Eq</code> インスタンスは、そのデータ型に含まれるすべてのフィールドの型（ここでは型引数 <code>a</code>）が <code>Eq</code> のインスタンスであることを前提とします。関数型 <code>a -> a</code> は <code>Eq</code> のインスタンスではないため、関数を保持する <code>Vector</code> 同士の比較はコンパイルエラーになります。"
    }
  ]
};
