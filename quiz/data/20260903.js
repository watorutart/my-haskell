window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260903"] = {
  date: "20260903",
  title: "型シノニムとStringの正体",
  questions: [
    {
      id: "20260903-q1",
      question: "標準ライブラリの <code>type String = [Char]</code> という宣言は、コンパイラにとって何をしているか？",
      code: `<span class="keyword">type</span> String = [Char]`,
      choices: [
        { text: "<code>[Char]</code> をラップした新しい型 <code>String</code> を作る。中身を取り出すには専用の関数が必要になる", isCorrect: false },
        { text: "<code>[Char]</code> に <code>String</code> という別名を与えるだけ。新しい型は作られず、両者は完全に同じ型として扱われる", isCorrect: true },
        { text: "<code>[Char]</code> から <code>String</code> への暗黙の変換関数を定義する。必要な箇所でコンパイラが自動的に変換を挿入する", isCorrect: false },
        { text: "<code>String</code> 型クラスを定義し、<code>[Char]</code> をそのインスタンスとして登録する", isCorrect: false }
      ],
      explanation: "<code>type</code> は型シノニム(型同義名)の宣言で、既存の型に別名を与えるだけ。新しい型を作るわけではないので、<code>String</code> と <code>[Char]</code> はコンパイラにとって同一であり、どこでも交換可能。値を包んだり取り出したりする操作は一切発生しない。"
    },
    {
      id: "20260903-q2",
      question: "関数 <code>toUpperString</code> に次の2通りの型宣言を書いたとき、コンパイラから見た違いは何か？",
      code: `toUpperString :: [Char] -&gt; [Char]

<span class="comment">-- あるいは</span>
toUpperString :: String -&gt; String`,
      choices: [
        { text: "下は <code>String</code> 専用なので、<code>[Char]</code> のリストを渡すと型エラーになる", isCorrect: false },
        { text: "下のほうが <code>String</code> という具体型に固定されるぶん、上より適用できる範囲が狭い", isCorrect: false },
        { text: "上はリストの汎用処理、下は文字列処理としてコンパイラが別々に最適化する", isCorrect: false },
        { text: "違いはない。<code>String</code> は <code>[Char]</code> の型シノニムなので、両者はまったく同じ型宣言であり、差は読みやすさだけ", isCorrect: true }
      ],
      explanation: "型シノニムは型検査の前に展開されるため、<code>String -&gt; String</code> は <code>[Char] -&gt; [Char]</code> とまったく同じ宣言。挙動も最適化も変わらない。型シノニムの目的は「この文字列が何を表しているか」を読み手に伝えることであり、意味づけは人間向けの情報にとどまる。"
    },
    {
      id: "20260903-q3",
      question: "<code>Name</code> と <code>PhoneNumber</code> を型シノニムとして定義し、<code>inPhoneBook</code> の第1引数と第2引数を逆に渡した。結果はどうなるか？",
      code: `<span class="keyword">type</span> PhoneNumber = String
<span class="keyword">type</span> Name = String
<span class="keyword">type</span> PhoneBook = [(Name, PhoneNumber)]

inPhoneBook :: Name -&gt; PhoneNumber -&gt; PhoneBook -&gt; Bool
inPhoneBook name pnumber pbook = (name, pnumber) \`elem\` pbook

ghci&gt; inPhoneBook <span class="comment">"555-2938"</span> <span class="comment">"betty"</span> phoneBook`,
      choices: [
        { text: "コンパイルは通り、<code>False</code> が返る。<code>Name</code> も <code>PhoneNumber</code> も <code>String</code> の別名にすぎず、型としては区別されないから", isCorrect: true },
        { text: "<code>Name</code> の位置に <code>PhoneNumber</code> を渡しているので型エラーになる", isCorrect: false },
        { text: "コンパイルは通るが、実行時に型シノニムの不一致が検出されて例外になる", isCorrect: false },
        { text: "コンパイラが引数の順序を型シノニム名から推測して入れ替えてくれるため <code>True</code> が返る", isCorrect: false }
      ],
      explanation: "型シノニムは別名であって別の型ではないため、<code>Name</code> と <code>PhoneNumber</code> はどちらも <code>String</code> と同一視される。取り違えは型検査で捕まらない。区別を型レベルで強制したい場合は <code>type</code> ではなく <code>data</code> や <code>newtype</code> で本当に別の型を作る必要がある。"
    },
    {
      id: "20260903-q4",
      question: "次の型シノニムをすべて展開すると、<code>PhoneBook</code> は最終的にどの型になるか？",
      code: `<span class="keyword">type</span> PhoneNumber = String
<span class="keyword">type</span> Name = String
<span class="keyword">type</span> PhoneBook = [(Name, PhoneNumber)]`,
      choices: [
        { text: "<code>[(Name, PhoneNumber)]</code>。<code>Name</code> と <code>PhoneNumber</code> はこれ以上展開されない", isCorrect: false },
        { text: "<code>[([Char], [Char])]</code> ではなく <code>([Char], [Char])</code>。タプルのリストではなくタプル1個になる", isCorrect: false },
        { text: "<code>[(String, String)]</code>、さらに <code>String</code> を展開すれば <code>[([Char], [Char])]</code>", isCorrect: true },
        { text: "<code>[(Name, PhoneNumber)]</code> と <code>[(String, String)]</code> は別の型なので、展開しても互換性はない", isCorrect: false }
      ],
      explanation: "型シノニムは入れ子に定義でき、コンパイラは展開できなくなるまで再帰的に置き換える。<code>PhoneBook</code> → <code>[(Name, PhoneNumber)]</code> → <code>[(String, String)]</code> → <code>[([Char], [Char])]</code> はすべて同じ型で、どの表記で書いても相互に交換可能。"
    },
    {
      id: "20260903-q5",
      question: "同じファイルに次の2行を両方書いた場合どうなるか？",
      code: `<span class="keyword">type</span> PhoneBook = [(String, String)]
<span class="keyword">type</span> PhoneBook = [(Name, PhoneNumber)]`,
      choices: [
        { text: "後の宣言が前の宣言を上書きするので、<code>PhoneBook</code> は <code>[(Name, PhoneNumber)]</code> になる", isCorrect: false },
        { text: "展開すると両方 <code>[(String, String)]</code> で同じ型なので、重複は許され問題なく通る", isCorrect: false },
        { text: "先に書いたほうが優先され、後の宣言は無視される", isCorrect: false },
        { text: "<code>PhoneBook</code> の多重宣言としてコンパイルエラーになる。展開結果が同じかどうかは関係ない", isCorrect: true }
      ],
      explanation: "型シノニム名は同一スコープ内で一意でなければならず、同じ名前を2回宣言すると多重宣言のエラーになる(Multiple declarations of 'PhoneBook')。関数定義のような上書きや後勝ちの規則はなく、展開後の型が一致していても許されない。"
    },
    {
      id: "20260903-q6",
      question: "次の <code>inPhoneBook</code> に引数を1つだけ適用した <code>inPhoneBook \"betty\"</code> の型はどれか？",
      code: `<span class="keyword">type</span> PhoneNumber = String
<span class="keyword">type</span> Name = String
<span class="keyword">type</span> PhoneBook = [(Name, PhoneNumber)]

inPhoneBook :: Name -&gt; PhoneNumber -&gt; PhoneBook -&gt; Bool
inPhoneBook name pnumber pbook = (name, pnumber) \`elem\` pbook

ghci&gt; :t inPhoneBook <span class="comment">"betty"</span>`,
      choices: [
        { text: "<code>Bool</code>。引数を渡した時点で本体が評価され、結果の型になる", isCorrect: false },
        { text: "<code>PhoneNumber -&gt; PhoneBook -&gt; Bool</code>。引数を1つ適用すると、残りの引数を待つ関数が返る", isCorrect: true },
        { text: "型エラー。3引数の関数に1引数だけ渡すことはできない", isCorrect: false },
        { text: "<code>Name -&gt; PhoneNumber -&gt; PhoneBook -&gt; Bool</code>。型宣言は引数を適用しても変わらない", isCorrect: false }
      ],
      explanation: "Haskellの関数はカリー化されており、<code>Name -&gt; PhoneNumber -&gt; PhoneBook -&gt; Bool</code> は実際には <code>Name -&gt; (PhoneNumber -&gt; (PhoneBook -&gt; Bool))</code>。1つ適用すると先頭の <code>Name -&gt;</code> が消え、残りの型の関数が返る。型宣言が矢印で連なる形になっているのはこの構造を表しているため、型シノニムで各位置に名前を付けると「何を順に受け取るのか」が読み取りやすくなる。"
    }
  ]
};
