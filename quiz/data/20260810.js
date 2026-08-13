window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260810"] = {
  date: "20260810",
  title: "型コンストラクタと多相・具体型",
  questions: [
    {
      id: "20260810-q1",
      question: "<code>data Maybe a = Nothing | Just a</code> という定義において、<code>Maybe</code> 単体は何か?",
      code: `<span class="keyword">data</span> Maybe a = Nothing | Just a

<span class="comment">-- Maybe だけでは型注釈に書けない</span>
<span class="comment">-- Maybe Int / Maybe String なら書ける</span>`,
      choices: [
        { text: "型そのもの。<code>Int</code> や <code>String</code> と同じように単体で型注釈に使える", isCorrect: false },
        { text: "型コンストラクタ。型引数を1つ受け取って初めて型を生み出す", isCorrect: true },
        { text: "値コンストラクタ。<code>Maybe 3</code> のように値を作れる", isCorrect: false },
        { text: "型クラス。<code>Nothing</code> と <code>Just</code> がそのインスタンス", isCorrect: false }
      ],
      explanation: "<code>Maybe</code> は型引数 <code>a</code> を取って新しい型を生み出す型コンストラクタであり、それ自体は型ではない。値の世界で関数が引数を取って値を生むのと同じ関係が、型の世界で成り立っている。値を作るのは <code>Nothing</code> と <code>Just</code> という値コンストラクタのほう。"
    },
    {
      id: "20260810-q2",
      question: "GHCiで <code>:t Just 84</code> を実行すると <code>Num a => Maybe a</code> と表示される。<code>Maybe Int</code> にならないのはなぜか?",
      code: `<span class="comment">ghci&gt; :t 84</span>
<span class="comment">84 :: Num a =&gt; a</span>
<span class="comment">ghci&gt; :t Just 84</span>
<span class="comment">Just 84 :: Num a =&gt; Maybe a</span>`,
      choices: [
        { text: "<code>Just</code> が受け取れるのは多相型だけで、具体型を入れるとエラーになるから", isCorrect: false },
        { text: "GHCiは型を省略表示する仕様で、実際の型は <code>Maybe Int</code> だから", isCorrect: false },
        { text: "数値リテラル <code>84</code> 自体が <code>Num a => a</code> で型が未確定であり、その制約がそのまま外側に引き継がれるから", isCorrect: true },
        { text: "<code>Maybe</code> の定義に <code>Num</code> 制約が書かれているから", isCorrect: false }
      ],
      explanation: "数値リテラルは内部的に <code>fromInteger 84</code> に展開されるため、<code>84 :: Num a => a</code> と型が未確定のままになる。それを <code>Just</code> で包むと中身の制約が外側に伝わり <code>Num a => Maybe a</code> になる。だから <code>Just 84 :: Maybe Double</code> と書けば <code>a</code> が <code>Double</code> に決まる。"
    },
    {
      id: "20260810-q3",
      question: "<code>Just 84 :: Maybe Double</code> は通るのに <code>Just \"Haha\" :: Maybe Double</code> はエラーになる。この違いの理由はどれか?",
      code: `<span class="comment">ghci&gt; Just 84 :: Maybe Double</span>
<span class="comment">Just 10.0 のように通る</span>

<span class="comment">ghci&gt; :t Just "Haha"</span>
<span class="comment">Just "Haha" :: Maybe String</span>`,
      choices: [
        { text: "文字列リテラルは最初から <code>String</code> に確定しており、<code>String</code> は <code>Num</code> のインスタンスではないから", isCorrect: true },
        { text: "<code>Maybe Double</code> は <code>Just</code> を受け付けず <code>Nothing</code> しか入らないから", isCorrect: false },
        { text: "文字列は長さが可変なので <code>Maybe</code> に包めないから", isCorrect: false },
        { text: "<code>::</code> による型注釈は数値にしか使えないから", isCorrect: false }
      ],
      explanation: "<code>84</code> は <code>Num a => a</code> で型が未確定なので、注釈によって <code>Double</code> を選べる。一方 <code>\"Haha\"</code> は型が <code>String</code> に確定しているため、<code>Maybe String</code> にしかならず <code>Maybe Double</code> とは合わない。<code>Maybe</code> が持つ制約は中身の値の制約がそのまま外に出たものにすぎない。"
    },
    {
      id: "20260810-q4",
      question: "<code>:t Nothing</code> の結果は <code>Maybe a</code> である。この <code>a</code> が残っていることは何を意味するか?",
      code: `<span class="comment">ghci&gt; :t Nothing</span>
<span class="comment">Nothing :: Maybe a</span>

<span class="comment">ghci&gt; Nothing :: Maybe Int</span>
<span class="comment">ghci&gt; Nothing :: Maybe String</span>
<span class="comment">ghci&gt; Nothing :: Maybe (Maybe Bool)</span>`,
      choices: [
        { text: "<code>Nothing</code> は型が決まっていない不正な値で、必ず型注釈が必要になる", isCorrect: false },
        { text: "型ごとに <code>Maybe Int</code> 用・<code>Maybe String</code> 用と別々の <code>Nothing</code> が存在している", isCorrect: false },
        { text: "<code>a</code> は <code>Any</code> のような万能型で、あらゆる値を入れられる", isCorrect: false },
        { text: "1つの <code>Nothing</code> が多相的であり、文脈に応じて <code>Maybe Int</code> にも <code>Maybe String</code> にもなれる", isCorrect: true }
      ],
      explanation: "型の中に型変数が残っている状態が多相的ということ。<code>Nothing</code> は中身の値を1つも持たないため <code>a</code> に何の要求もなく、制約なしの型変数のまま（パラメータ多相）。実体は1つで、使われる文脈に応じて <code>a</code> がコンパイル時に具体型へ埋まる。"
    },
    {
      id: "20260810-q5",
      question: "次のうち、具体型（concrete type）ではないものはどれか?",
      code: `<span class="comment">-- 候補</span>
<span class="comment">-- Maybe Char</span>
<span class="comment">-- [Int]</span>
<span class="comment">-- Int</span>
<span class="comment">-- Maybe a</span>`,
      choices: [
        { text: "<code>Maybe Char</code>", isCorrect: false },
        { text: "<code>Maybe a</code>", isCorrect: true },
        { text: "<code>[Int]</code>", isCorrect: false },
        { text: "<code>Int</code>", isCorrect: false }
      ],
      explanation: "具体型かどうかは「型変数が残っていないか」で判定できる。<code>Maybe Char</code>・<code>[Int]</code>・<code>Int</code> は型変数が残っていないので具体型。<code>Maybe a</code> は <code>a</code> が残っているため多相型であり、多くの具体型を生み出すテンプレートのような存在にとどまる。"
    },
    {
      id: "20260810-q6",
      question: "リストの <code>[]</code> は <code>Maybe</code> と同じ立場にあると説明された。<code>[]</code> と <code>[Int]</code> の関係を正しく述べたものはどれか?",
      code: `<span class="comment">-- Maybe      → 型コンストラクタ</span>
<span class="comment">-- Maybe Int  → 具体型</span>

<span class="comment">-- []         → ?</span>
<span class="comment">-- [Int]      → ?</span>`,
      choices: [
        { text: "<code>[]</code> は空リストという値なので、<code>[Int]</code> は空の <code>Int</code> リストを表す型である", isCorrect: false },
        { text: "<code>[]</code> も <code>[Int]</code> もどちらも具体型で、<code>[]</code> は要素型を省略した書き方である", isCorrect: false },
        { text: "<code>[]</code> は型コンストラクタで単体では型になれず、要素の型を与えて <code>[Int]</code> となって初めて具体型になる", isCorrect: true },
        { text: "<code>[]</code> は型クラスで、<code>[Int]</code> はそのインスタンスである", isCorrect: false }
      ],
      explanation: "型としての <code>[]</code> は型引数を1つ取る型コンストラクタで、<code>Maybe</code> と同じ立場にある。<code>[Int]</code>・<code>[String]</code> のように要素型を与えて初めて具体型になる。値としての空リスト <code>[]</code> は別物で、こちらは <code>[a]</code> という多相的な値。"
    },
    {
      id: "20260810-q7",
      question: "<code>Nothing :: Maybe a</code> と <code>Just 84 :: Num a => Maybe a</code> は、どちらも型変数 <code>a</code> が残っている。両者の多相性の違いはどれか?",
      code: `<span class="comment">Nothing :: Maybe a</span>
<span class="comment">Just 84 :: Num a =&gt; Maybe a</span>`,
      choices: [
        { text: "前者は制約なしのパラメータ多相、後者は <code>Num</code> のインスタンスに限定されるアドホック多相", isCorrect: true },
        { text: "前者は多相だが、後者は制約が付いているのでもはや多相ではなく具体型である", isCorrect: false },
        { text: "前者は実行時に型が決まり、後者はコンパイル時に型が決まるという決定タイミングの違い", isCorrect: false },
        { text: "前者の <code>a</code> は任意の型を表すが、後者の <code>a</code> は必ず <code>Int</code> に固定される", isCorrect: false }
      ],
      explanation: "<code>Nothing</code> は中身の値を持たないため <code>a</code> に何の要求もなく、制約が付かない（パラメータ多相）。<code>Just 84</code> は中身の数値リテラルが <code>Num</code> を要求するため、<code>a</code> は「<code>Num</code> のインスタンスである型」に限定される（アドホック多相）。どちらも型変数が残っているので多相型であり、具体型ではない。"
    }
  ]
};
