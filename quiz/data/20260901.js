window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260901"] = {
  date: "20260901",
  title: "Ordの自動導出と値コンストラクタの定義順",
  questions: [
    {
      id: "20260901-q1",
      question: "<code>Bool</code> は <code>data Bool = False | True</code> と定義され <code>Ord</code> が導出されている。GHCiで <code>True \`compare\` False</code> が <code>GT</code> になる理由として正しいものはどれか？",
      code: `<span class="keyword">data</span> Bool = False | True <span class="keyword">deriving</span> (Ord)

ghci&gt; True \`compare\` False
GT
ghci&gt; True &gt; False
True`,
      choices: [
        { text: "<code>True</code> が内部的に <code>1</code>、<code>False</code> が <code>0</code> という数値として表現されており、数値そのものが比較されるから", isCorrect: false },
        { text: "値コンストラクタ名がアルファベット順に並べ替えられ、<code>False</code> より <code>True</code> が後ろに来るから", isCorrect: false },
        { text: "<code>deriving (Ord)</code> では <code>data</code> 宣言に書かれた値コンストラクタの順序が使われ、後に定義された <code>True</code> のほうが大きいから", isCorrect: true },
        { text: "<code>Bool</code> だけは特別扱いで、GHCが <code>False &lt; True</code> という順序を組み込みで持っているから", isCorrect: false }
      ],
      explanation: "<code>Ord</code> を自動導出すると、異なる値コンストラクタから作られた値どうしは <code>data</code> 宣言での定義順で比較され、先に書かれたほうが小さくなる。<code>False | True</code> の順なので <code>False &lt; True</code>。他言語の0/1のイメージと結果は一致するが、根拠は数値表現ではなく定義順である。"
    },
    {
      id: "20260901-q2",
      question: "次の型を定義したとき、GHCiで <code>Urgent &lt; Low</code> を評価した結果はどれか？",
      code: `<span class="keyword">data</span> Priority = Urgent | Normal | Low <span class="keyword">deriving</span> (Eq, Ord)

ghci&gt; Urgent &lt; Low`,
      choices: [
        { text: "<code>True</code>。<code>Urgent</code> が最初に定義されているので最も小さい", isCorrect: true },
        { text: "<code>False</code>。優先度が高い <code>Urgent</code> のほうが大きい値として扱われる", isCorrect: false },
        { text: "<code>False</code>。名前のアルファベット順で <code>Low</code> が <code>Urgent</code> より前になる", isCorrect: false },
        { text: "コンパイルエラー。フィールドを持たない値コンストラクタには <code>Ord</code> を導出できない", isCorrect: false }
      ],
      explanation: "導出された <code>Ord</code> は定義順だけを見る。<code>Urgent | Normal | Low</code> の順なので <code>Urgent &lt; Normal &lt; Low</code> となり、結果は <code>True</code>。「Urgentは優先度が高いから大きいはず」という意味的な期待は反映されない。順序を意味に合わせたいなら定義順を並べ替える。"
    },
    {
      id: "20260901-q3",
      question: "GHCiで <code>Just (*3) &gt; Just (*2)</code> を評価すると <code>No instance for 'Ord (Integer -> Integer)'</code> というエラーになる。その理由はどれか？",
      code: `ghci&gt; Just 3 &gt; Just 2
True
ghci&gt; Just (*3) &gt; Just (*2)

&lt;interactive&gt;:9:11: error: [GHC-39999]
    • No instance for ‘Ord (Integer -&gt; Integer)’
        arising from a use of ‘&gt;’`,
      choices: [
        { text: "<code>Maybe</code> は <code>Ord</code> を導出していないので、中身が何であれ <code>Maybe</code> の値どうしは比較できないから", isCorrect: false },
        { text: "<code>(*3)</code> はセクションであり、括弧で囲まれた式は <code>Just</code> に適用できないから", isCorrect: false },
        { text: "<code>(*3)</code> と <code>(*2)</code> は評価されると別々の値になるため、比較の前に結果が定まらないから", isCorrect: false },
        { text: "同じ値コンストラクタ <code>Just</code> どうしの比較では中身のフィールドが比較されるが、中身の型 <code>Integer -&gt; Integer</code> が <code>Ord</code> のインスタンスではないから", isCorrect: true }
      ],
      explanation: "<code>Maybe a</code> の <code>Ord</code> インスタンスは <code>Ord a</code> を前提にしている。<code>Just</code> どうしの比較は中身の比較に帰着するため、中身が関数だと <code>Ord (Integer -&gt; Integer)</code> が要求されるが、関数型に <code>Ord</code> インスタンスは存在しないためエラーになる。<code>Just 3 &gt; Just 2</code> が通るのは <code>Integer</code> が <code>Ord</code> だから。"
    },
    {
      id: "20260901-q4",
      question: "次の型で <code>Version 1 9 \`compare\` Version 2 0</code> を評価した結果はどれか？",
      code: `<span class="keyword">data</span> Version = Version Int Int <span class="keyword">deriving</span> (Eq, Ord)

ghci&gt; Version 1 9 \`compare\` Version 2 0`,
      choices: [
        { text: "<code>GT</code>。フィールドの合計値 <code>1+9=10</code> と <code>2+0=2</code> を比べるため", isCorrect: false },
        { text: "<code>LT</code>。同じ値コンストラクタなので左のフィールドから順に比較され、<code>1 &lt; 2</code> の時点で決まるため", isCorrect: true },
        { text: "<code>EQ</code>。同じ値コンストラクタから作られた値は常に等しいとみなされるため", isCorrect: false },
        { text: "<code>GT</code>。フィールドは右から順に比較され、<code>9 &gt; 0</code> の時点で決まるため", isCorrect: false }
      ],
      explanation: "両辺が同じ値コンストラクタの場合、導出された <code>Ord</code> はフィールドを左から順に比較し、最初に差がついたところで結果を決める。<code>1</code> と <code>2</code> の比較で <code>LT</code> が確定し、第2フィールドは見られない。合計値や右からの比較ではない。"
    },
    {
      id: "20260901-q5",
      question: "次の <code>data</code> 宣言のうち、<code>deriving (Ord)</code> がコンパイルエラーになるのはどれか？",
      choices: [
        { text: "<code>data Version = Version Int Int deriving (Ord)</code>", isCorrect: false },
        { text: "<code>data Shape = Circle Float | Square Float deriving (Ord)</code>", isCorrect: false },
        { text: "<code>data Pair = Pair Int [String] deriving (Ord)</code>", isCorrect: false },
        { text: "<code>data Trans = Trans (Int -&gt; Int) deriving (Ord)</code>", isCorrect: true }
      ],
      explanation: "同じ値コンストラクタどうしの比較はフィールドの比較に帰着するため、すべてのフィールドの型が <code>Ord</code> に属している必要がある。<code>Int</code>、<code>Float</code>、<code>[String]</code> はいずれも <code>Ord</code> のインスタンスだが、関数型 <code>Int -&gt; Int</code> はインスタンスを持たないため導出に失敗する。"
    },
    {
      id: "20260901-q6",
      question: "<code>Maybe</code> は <code>data Maybe a = Nothing | Just a</code> と定義されている。GHCiで <code>Nothing &gt; Just (-49999)</code> が <code>False</code> になる理由はどれか？",
      code: `ghci&gt; Nothing &lt; Just 100
True
ghci&gt; Nothing &gt; Just (-49999)
False`,
      choices: [
        { text: "<code>Nothing</code> が <code>Just</code> より先に定義されているため、中身の値に関係なく <code>Nothing</code> のほうが常に小さいから", isCorrect: true },
        { text: "<code>Nothing</code> は数値の <code>0</code> として扱われ、<code>-49999</code> より大きいので本来は <code>True</code> になるはずだが、負数は特別扱いされるから", isCorrect: false },
        { text: "<code>Nothing</code> は「値がない」ので、比較すると常に <code>False</code> を返すから", isCorrect: false },
        { text: "<code>Just</code> の中身が負数のときだけ <code>Nothing</code> が大きいとみなされる規則があるから", isCorrect: false }
      ],
      explanation: "異なる値コンストラクタどうしの比較は定義順だけで決まる。<code>Nothing | Just a</code> の順なので <code>Nothing</code> は常に <code>Just something</code> より小さく、中身が <code>-49999</code> でも結果は変わらない。中身の値が見られるのは両辺が <code>Just</code> のときだけである。"
    }
  ]
};
