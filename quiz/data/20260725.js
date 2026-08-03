window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260725"] = {
  date: "20260725",
  title: "dataキーワードによる自作データ型の定義",
  questions: [
    {
      id: "20260725-q1",
      question: "Haskellで自分のデータ型を作るとき、<code>data</code>キーワードの役割として正しいものはどれか?",
      code: `<span class="keyword">data</span> Bool = False | True`,
      choices: [
        { text: "新しいデータ型を定義するための構文である", isCorrect: true },
        { text: "既存の型に別名(シノニム)を付けるための構文である", isCorrect: false },
        { text: "型クラスのインスタンスを宣言するための構文である", isCorrect: false },
        { text: "関数の型注釈を書くための構文である", isCorrect: false }
      ],
      explanation: "dataキーワードは新しいデータ型を定義するための構文。型に別名を付けるのはtypeキーワード、型クラスのインスタンス宣言はinstanceキーワードの役割であり、dataとは別物。"
    },
    {
      id: "20260725-q2",
      question: "<code>data Bool = False | True</code> という定義において、<code>=</code>の前の<code>Bool</code>と後ろの<code>False</code>・<code>True</code>はそれぞれ何と呼ばれるか?",
      code: `<span class="keyword">data</span> Bool = False | True`,
      choices: [
        { text: "Boolが値コンストラクタ、False・Trueが型名", isCorrect: false },
        { text: "Bool・False・Trueはすべて型名", isCorrect: false },
        { text: "Boolが型名、False・Trueが値コンストラクタ", isCorrect: true },
        { text: "Bool・False・Trueはすべて値コンストラクタ", isCorrect: false }
      ],
      explanation: "=の前は定義する型の名前(型名)、後ろはその型が取りうる値を作るための値コンストラクタ。BoolはHaskellの型、False・Trueは値コンストラクタにあたる。"
    },
    {
      id: "20260725-q3",
      question: "<code>data Bool = False | True</code> の<code>|</code>が持つ意味として正しいものはどれか?",
      code: `<span class="keyword">data</span> Bool = False | True`,
      choices: [
        { text: "実行時に左右の値を論理和(OR)として評価する演算子", isCorrect: false },
        { text: "パターンマッチにおけるガード条件の区切り", isCorrect: false },
        { text: "リストの要素を区切るための記号", isCorrect: false },
        { text: "その型が取りうる値(値コンストラクタ)の候補を列挙する「または」の意味の区切り", isCorrect: true }
      ],
      explanation: "|はデータ定義において「または」を意味し、その型が取りうる値の種類を列挙する区切りとして使われる構文であり、実行時に評価される演算子ではない。"
    },
    {
      id: "20260725-q4",
      question: "学習メモには <code>data Int = -2147483648 | -2147483647 | ... | 2147483647</code> という例が書かれているが、これについて正しい説明はどれか?",
      code: `<span class="keyword">data</span> Int = -2147483648 | -2147483647 | <span class="comment">...</span> | -1 | 0 | 1 | 2 | <span class="comment">...</span> | 2147483647`,
      choices: [
        { text: "これはGHCにおけるIntの実際の定義そのものである", isCorrect: false },
        { text: "実際のIntはこの構文で定義されているわけではなく、取りうる値のイメージを示すための単純化した例にすぎない", isCorrect: true },
        { text: "この定義が示す通り、Intは値コンストラクタを持たない特殊な型である", isCorrect: false },
        { text: "dataキーワードでは範囲を持つ数値型を表現できないことを示す例である", isCorrect: false }
      ],
      explanation: "メモにも「実際はこんな定義ではない」と注記されている通り、これはIntが取りうる値のイメージを掴むための単純化した例であり、GHCの実装上の実際の定義ではない。"
    }
  ]
};
