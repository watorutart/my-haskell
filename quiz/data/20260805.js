window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260805"] = {
  date: "20260805",
  title: "値コンストラクタのエクスポート制御とデータ抽象",
  questions: [
    {
      id: "20260805-q1",
      question: "次のようにエクスポートリストへ <code>Shape</code> を括弧なしで書いた。このモジュールを <code>import Shapes</code> した側でできることはどれか?",
      code: `<span class="keyword">module</span> Shapes
( Point
, Shape
, area
, nudge
, baseCircle
, baseRect
) <span class="keyword">where</span>

<span class="keyword">data</span> Shape = Circle Point Float | Rectangle Point Point <span class="keyword">deriving</span> (Show)`,
      choices: [
        { text: "<code>Circle</code> で値を作れるし、<code>Circle</code> でのパターンマッチもできる", isCorrect: false },
        { text: "<code>Shape</code> という型名自体がスコープに入らないため、型注釈にも書けない", isCorrect: false },
        { text: "<code>Shape</code> は型注釈などで使えるが、<code>Circle</code> / <code>Rectangle</code> による構築もパターンマッチもできない", isCorrect: true },
        { text: "構築はできないが、パターンマッチには使える", isCorrect: false }
      ],
      explanation: "型名の後に括弧を書かないと、エクスポートされるのは型構築子だけで値コンストラクタは一切公開されない。値コンストラクタは値を作るときとパターンマッチのときの両方で必要なので、どちらも利用側からは使えなくなる。"
    },
    {
      id: "20260805-q2",
      question: "<code>Shapes</code> が <code>Point</code> を括弧なしでエクスポートしている状態で、下のコードを読み込むと <code>Point 10 20</code> の位置に「Illegal term-level use of the type constructor」というエラーが出る。理由はどれか?",
      code: `<span class="keyword">import</span> Shapes
main = <span class="keyword">do</span> print $ Circle (Point 10 20) 30

<span class="comment">-- Illegal term-level use of the type constructor or class ‘Point’</span>`,
      choices: [
        { text: "スコープにあるのは型構築子の <code>Point</code> だけで、同名の値コンストラクタが公開されていないため、式の中の <code>Point</code> が型構築子として解釈された", isCorrect: true },
        { text: "<code>Point</code> のフィールドが <code>Float</code> なのに整数リテラルを渡したため", isCorrect: false },
        { text: "<code>Point</code> が <code>deriving (Show)</code> されていないため", isCorrect: false },
        { text: "<code>Circle</code> のエラーに巻き込まれただけで、<code>Point</code> 自体には問題がない", isCorrect: false }
      ],
      explanation: "Haskellでは型構築子と値コンストラクタは別の名前空間にあり、同じ <code>Point</code> という名前でも別物としてエクスポートを制御できる。値コンストラクタを公開していないので、式(term)の位置に書かれた <code>Point</code> は型構築子しか候補がなく、「型構築子を式の位置で使っている」というエラーになる。"
    },
    {
      id: "20260805-q3",
      question: "エクスポートリストの <code>Point(..)</code> / <code>Shape(..)</code> にある <code>(..)</code> は何を意味するか?",
      code: `<span class="keyword">module</span> Shapes
( Point(..)
, Shape(..)
, area
) <span class="keyword">where</span>`,
      choices: [
        { text: "その型のフィールドをすべて公開する", isCorrect: false },
        { text: "その型に対するインスタンス宣言をすべて公開する", isCorrect: false },
        { text: "型名だけを公開し、値コンストラクタは隠す", isCorrect: false },
        { text: "その型の値コンストラクタをすべて公開する", isCorrect: true }
      ],
      explanation: "型名の後の括弧にはエクスポートしたい値コンストラクタをカンマ区切りで書く。<code>(..)</code> はその省略記法で、その型が持つ値コンストラクタを全部公開するという意味になる。<code>Shape(..)</code> なら <code>Circle</code> と <code>Rectangle</code> の両方が公開される。"
    },
    {
      id: "20260805-q4",
      question: "モジュールが型は公開しつつ値コンストラクタをエクスポートしない設計にする、主な利点はどれか?",
      code: `<span class="keyword">module</span> Shapes
( Shape        <span class="comment">-- 値コンストラクタは隠す</span>
, area
, nudge
, baseCircle
) <span class="keyword">where</span>`,
      choices: [
        { text: "モジュールのコンパイル時間が短くなる", isCorrect: false },
        { text: "内部表現を変更しても、公開している補助関数の型が同じなら利用側のコードを壊さずに済む", isCorrect: true },
        { text: "その型の値がイミュータブルになる", isCorrect: false },
        { text: "<code>deriving (Show)</code> を書かなくても表示できるようになる", isCorrect: false }
      ],
      explanation: "値コンストラクタを隠すと、利用側は必ず公開された補助関数を通してデータを扱うことになる。利用側が内部の構造に依存しないため、作者は実装を自由に変更できる。Haskellの値はもともとイミュータブルなので、それは隠蔽とは無関係。"
    },
    {
      id: "20260805-q5",
      question: "<code>Shapes</code> が <code>Shape</code> を括弧なしで(値コンストラクタを隠して)エクスポートしている。別のモジュールで下の関数を定義するとどうなるか?",
      code: `<span class="keyword">import</span> Shapes

radius :: Shape -> Float
radius (Circle _ r) = r`,
      choices: [
        { text: "動く。パターンマッチは型さえ見えていれば書ける", isCorrect: false },
        { text: "動くが、値コンストラクタが隠れているという警告が出る", isCorrect: false },
        { text: "動く。ただし <code>Rectangle</code> のケースが無いので、その値を渡したときだけ実行時に失敗する", isCorrect: false },
        { text: "コンパイルできない。<code>Circle</code> がスコープに無いのでパターンマッチにも使えない", isCorrect: true }
      ],
      explanation: "値コンストラクタは値の構築だけでなくパターンマッチにも必要なため、隠されていればパターンマッチも書けない。網羅性の話(<code>Rectangle</code> のケース漏れ)以前に、<code>Circle</code> がスコープに無い時点でコンパイルエラーになる。"
    },
    {
      id: "20260805-q6",
      question: "<code>Data.Map</code> が採っている設計として正しいものはどれか?",
      choices: [
        { text: "<code>Map</code> の値コンストラクタは公開されておらず、<code>Map.fromList</code> などの関数を通してのみ <code>Map</code> を作る", isCorrect: true },
        { text: "<code>Map</code> の値コンストラクタが公開されているので、リテラルのように直接書いて作れる", isCorrect: false },
        { text: "<code>Map</code> は型シノニムなので、そもそも値コンストラクタが存在しない", isCorrect: false },
        { text: "<code>qualified</code> import が必須なので、結果として値コンストラクタが使えない", isCorrect: false }
      ],
      explanation: "<code>Data.Map</code> は内部の木構造を隠し、<code>fromList</code> などの補助関数だけを公開している。利用者は内部表現を知る必要がなく、作者は実装を変えられる。<code>qualified</code> import は名前衝突を避けるための指定で、エクスポートの可視性とは別の話。"
    },
    {
      id: "20260805-q7",
      question: "<code>Shapes</code> は <code>Shape</code> を括弧なしで(値コンストラクタを隠して)エクスポートしている。それなのに実行結果に <code>Circle</code> や <code>Point</code> という名前が表示されるのはなぜか?",
      code: `<span class="keyword">import</span> Shapes
main = <span class="keyword">do</span> print $ nudge (baseCircle 30) 10 20

<span class="comment">-- ghci&gt; main</span>
<span class="comment">-- Circle (Point 10.0 20.0) 30.0</span>`,
      choices: [
        { text: "<code>print</code> に渡した時点で値コンストラクタが暗黙にエクスポートされるため", isCorrect: false },
        { text: "表示できたということは、利用側でも <code>Circle</code> を書いて値を作れる状態にあるということ", isCorrect: false },
        { text: "文字列化は <code>Shapes</code> 側で導出された <code>Show</code> インスタンスが行っており、利用側で名前がスコープにあるかとは無関係", isCorrect: true },
        { text: "<code>deriving (Show)</code> が値コンストラクタのエクスポートを兼ねるため", isCorrect: false }
      ],
      explanation: "<code>show</code> の実装は <code>Shapes</code> 内で <code>deriving (Show)</code> から生成されており、そこでは値コンストラクタが当然見えている。出力文字列にコンストラクタ名が含まれるだけで、利用側のスコープに <code>Circle</code> が入るわけではない。値の生成も <code>baseCircle</code> と <code>nudge</code> という公開関数が行っている。"
    }
  ]
};
