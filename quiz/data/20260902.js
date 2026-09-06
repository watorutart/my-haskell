window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260902"] = {
  date: "20260902",
  title: "列挙型とEnum・Boundedの自動導出",
  questions: [
    {
      id: "20260902-q1",
      question: "次の <code>Day</code> 型が <code>Enum</code> を自動導出できるのはなぜか？",
      code: `<span class="keyword">data</span> Day = Monday | Tuesday | Wednesday | Thursday
         | Friday | Saturday | Sunday
  <span class="keyword">deriving</span> (Eq, Ord, Show, Read, Bounded, Enum)`,
      choices: [
        { text: "値コンストラクタが7個で有限個しかないから。個数が有限なら引数の有無に関係なく導出できる", isCorrect: false },
        { text: "<code>deriving</code> に <code>Bounded</code> が含まれており、上限・下限が決まると <code>Enum</code> も自動的に付いてくるから", isCorrect: false },
        { text: "すべての値コンストラクタが引数を取らない(ゼロ引数)ため、値を一列に並べて順番を割り当てられるから", isCorrect: true },
        { text: "<code>Show</code> と <code>Read</code> が導出されており、文字列表現のアルファベット順で並び順を決められるから", isCorrect: false }
      ],
      explanation: "<code>Enum</code> の自動導出は、すべての値コンストラクタが引数を持たない場合にのみ可能。引数がなければ値は有限個の点として一列に並べられ、前後関係(<code>succ</code> / <code>pred</code>)を定義できる。個数や他の型クラスの有無は条件ではない。"
    },
    {
      id: "20260902-q2",
      question: "<code>Day</code> 型が <code>Read</code> を導出しているとき、GHCiで型注釈を付けずに <code>read \"Saturday\"</code> と打つとどうなるか？",
      code: `<span class="keyword">data</span> Day = Monday | Tuesday | Wednesday | Thursday
         | Friday | Saturday | Sunday
  <span class="keyword">deriving</span> (Eq, Ord, Show, Read, Bounded, Enum)

ghci&gt; read <span class="comment">"Saturday"</span>`,
      choices: [
        { text: "型が曖昧でエラーになる。<code>read :: Read a =&gt; String -&gt; a</code> の戻り値型は呼び出し側から決まるもので、文字列の中身では決まらないから", isCorrect: true },
        { text: "<code>Saturday</code> と表示される。文字列が <code>Day</code> の値コンストラクタ名と一致するので GHC が <code>Day</code> と推論するから", isCorrect: false },
        { text: "<code>\"Saturday\"</code> と文字列がそのまま返る。<code>read</code> は変換先が不明なときは入力をそのまま返すから", isCorrect: false },
        { text: "<code>Day</code> に <code>Read</code> インスタンスが存在しないというエラーになる。<code>Read</code> は <code>Show</code> より先に書かないと導出されないから", isCorrect: false }
      ],
      explanation: "<code>read</code> の戻り値型は多相で、どの型の <code>Read</code> インスタンスを使うかは文脈から決める必要がある。文字列の中身は実行時の情報なので型推論には使われない。<code>read \"Saturday\" :: Day</code> のように注釈を付けるか、<code>Day</code> を要求する文脈で使えば決まる。"
    },
    {
      id: "20260902-q3",
      question: "<code>Enum</code> を導出した <code>Day</code> 型で、GHCiで <code>succ Sunday</code> を評価するとどうなるか？<code>Sunday</code> は <code>data</code> 宣言の最後に書かれた値コンストラクタである。",
      code: `<span class="keyword">data</span> Day = Monday | Tuesday | Wednesday | Thursday
         | Friday | Saturday | Sunday
  <span class="keyword">deriving</span> (Eq, Ord, Show, Read, Bounded, Enum)

ghci&gt; succ Saturday
Sunday
ghci&gt; succ Sunday`,
      choices: [
        { text: "<code>Monday</code> が返る。導出された <code>Enum</code> は端まで来ると先頭に循環するから", isCorrect: false },
        { text: "<code>Nothing</code> が返る。後続が存在しない場合、<code>succ</code> は <code>Maybe</code> を返す設計になっているから", isCorrect: false },
        { text: "コンパイルエラーになる。GHCが <code>Sunday</code> が最後の値であることを検出して弾くから", isCorrect: false },
        { text: "実行時エラーになる。導出された <code>Enum</code> は循環せず、最後の値には後続が存在しないから", isCorrect: true }
      ],
      explanation: "導出された <code>Enum</code> は定義順に並んだ一直線の列で、循環しない。<code>succ</code> は最後の値に対して <code>bad argument</code> の実行時エラーを投げる(<code>pred Monday</code> も同様)。どの値が渡されるかは型では分からないためコンパイルは通る。端で安全に扱いたいなら <code>maxBound</code> と比較して自分で判定する。"
    },
    {
      id: "20260902-q4",
      question: "次のように <code>deriving</code> から <code>Eq</code> と <code>Ord</code> を外した <code>Day</code> 型で、GHCiで <code>Saturday &gt; Friday</code> を評価するとどうなるか？",
      code: `<span class="keyword">data</span> Day = Monday | Tuesday | Wednesday | Thursday
         | Friday | Saturday | Sunday
  <span class="keyword">deriving</span> (Show, Read, Bounded, Enum)

ghci&gt; Saturday &gt; Friday`,
      choices: [
        { text: "<code>True</code> が返る。<code>Enum</code> が導出されていて前後関係が分かるので、その順番で大小比較される", isCorrect: false },
        { text: "コンパイルエラーになる。<code>&gt;</code> は <code>Ord</code> のメソッドであり、<code>Enum</code> を導出しても <code>Ord</code> のインスタンスにはならないから", isCorrect: true },
        { text: "<code>True</code> が返る。<code>Bounded</code> が上限・下限を持つ型は自動的に大小比較が可能になるから", isCorrect: false },
        { text: "<code>False</code> が返る。<code>Ord</code> がない型どうしの比較は常に <code>False</code> と評価されるから", isCorrect: false }
      ],
      explanation: "<code>Enum</code> と <code>Ord</code> は別の型クラス。<code>Enum</code> は <code>succ</code> / <code>pred</code> / 範囲記法を提供し、<code>&gt;</code> や <code>compare</code> は <code>Ord</code> のメソッドである。どちらも「定義順」を根拠にするため結果は一致するが、片方を導出しても他方は付いてこない。"
    },
    {
      id: "20260902-q5",
      question: "次の <code>data</code> 宣言をコンパイルするとどうなるか？",
      code: `<span class="keyword">data</span> Shape = Circle Float | Square Float
  <span class="keyword">deriving</span> (Show, Enum)`,
      choices: [
        { text: "コンパイルエラーになる。値コンストラクタが引数を取るため <code>Enum</code> は導出できない", isCorrect: true },
        { text: "問題なく導出でき、<code>succ (Circle 1.0)</code> は <code>Square 1.0</code> になる", isCorrect: false },
        { text: "問題なく導出できる。フィールドの型 <code>Float</code> が <code>Enum</code> のインスタンスなので条件を満たしている", isCorrect: false },
        { text: "コンパイルエラーになる。<code>Enum</code> の導出には <code>Bounded</code> も同時に導出する必要があるから", isCorrect: false }
      ],
      explanation: "<code>Enum</code> の導出条件は「すべての値コンストラクタが引数を取らないこと」。<code>Circle Float</code> は引数を持つため <code>Shape</code> の値は無限にあり得て、一列に並べて番号を振れない。フィールドの型が <code>Enum</code> かどうかは関係ない。"
    },
    {
      id: "20260902-q6",
      question: "<code>Bounded</code> と <code>Enum</code> を導出した <code>Day</code> 型で、全曜日のリストを得るのに <code>[minBound .. maxBound] :: [Day]</code> と型注釈が必要なのはなぜか？",
      code: `<span class="keyword">data</span> Day = Monday | Tuesday | Wednesday | Thursday
         | Friday | Saturday | Sunday
  <span class="keyword">deriving</span> (Eq, Ord, Show, Read, Bounded, Enum)

ghci&gt; [minBound .. maxBound] :: [Day]
[Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday]`,
      choices: [
        { text: "<code>Bounded</code> の導出だけでは範囲を作れず、型注釈を書くことで <code>Enum</code> の機能が有効になるから", isCorrect: false },
        { text: "リストの要素数をあらかじめGHCに伝える必要があり、型注釈がその役割を果たしているから", isCorrect: false },
        { text: "<code>minBound</code> / <code>maxBound</code> は <code>Bounded</code> のどの型にも使える多相な値であり、注釈がないとどの型の上限・下限なのか決まらないから", isCorrect: true },
        { text: "<code>[ .. ]</code> の範囲記法は既定で <code>Integer</code> のリストとして解釈されるため、<code>Day</code> にするには注釈で上書きする必要があるから", isCorrect: false }
      ],
      explanation: "<code>minBound :: Bounded a =&gt; a</code> は型が決まって初めて具体的な値になる。<code>[minBound .. maxBound]</code> だけでは <code>a</code> を決める手がかりがなく曖昧エラーになるため、<code>:: [Day]</code> で型を固定する。範囲記法自体は <code>Enum</code> の <code>enumFromTo</code> であり、既定で <code>Integer</code> になるわけではない。"
    }
  ]
};
