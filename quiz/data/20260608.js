window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260608"] = {
  date: "20260608",
  title: "whereキーワードとリスト内包表記",
  questions: [
  {
    "id": "20260608-q1",
    "question": "以下の <code>greet</code> 関数の定義をコンパイルしようとすると、コンパイルエラーが発生します。その主な原因として正しいものはどれですか？",
    "code": "greet :: String <span class=\"keyword\">-&gt;</span> String\ngreet \"Juan\" = niceGreeting ++ \" Juan!\"\ngreet \"Fernando\" = niceGreeting ++ \" Fernando!\"\ngreet name = badGreeting ++ \" \" ++ name\n    <span class=\"keyword\">where</span> niceGreeting = \"Hello! So very nice to see you,\"\n          badGreeting = \"Oh! Pfft. It's you.\"",
    "choices": [
      {
        "text": "<code>where</code> 節で定義された <code>niceGreeting</code> などの変数は、それが記述された最後のパターンの方程式（<code>greet name</code>）のスコープにのみ属し、他のパターン（<code>greet &quot;Juan&quot;</code> など）からは参照できないため",
        "isCorrect": true
      },
      {
        "text": "Haskellでは <code>where</code> 節に複数の変数を並べて定義することができないため",
        "isCorrect": false
      },
      {
        "text": "<code>niceGreeting</code> と <code>badGreeting</code> の型シグネチャを <code>where</code> 内で明示的に定義していないため",
        "isCorrect": false
      },
      {
        "text": "パターンマッチで <code>name</code> という任意の文字列を受け取る場合は、<code>where</code> 節を使用できないため",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellでは、関数を複数のパターン（方程式）で定義する場合、各大括弧の定義式は独立したスコープを持ちます。<br><code>where</code> 節はそれを配置した特定の方程式（この例では <code>greet name = ...</code>）のスコープにのみバインドされるため、他のパターン（<code>greet &quot;Juan&quot;</code> や <code>greet &quot;Fernando&quot;</code>）からは <code>niceGreeting</code> が見えず、<code>Variable not in scope</code> というコンパイルエラーが発生します。<br>これを避けるには、これらの定数をトップレベルで定義するか、ガードや単一のパターン内で処理するように構成する必要があります。"
  },
  {
    "id": "20260608-q2",
    "question": "以下の <code>bmiTell</code> 関数における <code>where</code> 節の記述において、インデント（位置揃え）に関するルールとして正しいものはどれですか？",
    "code": "bmiTell :: Double <span class=\"keyword\">-&gt;</span> Double <span class=\"keyword\">-&gt;</span> String\nbmiTell weight height\n    <span class=\"keyword\">|</span> bmi <span class=\"keyword\">&lt;=</span> skinny = \"You're underweight...\"\n    <span class=\"keyword\">|</span> bmi <span class=\"keyword\">&lt;=</span> normal = \"You're supposedly normal...\"\n    <span class=\"keyword\">|</span> otherwise = \"You're a whale!\"\n    <span class=\"keyword\">where</span> bmi = weight / height ^ 2\n          (skinny, normal, fat) = (18.5, 25.0, 30.0)",
    "choices": [
      {
        "text": "<code>where</code> ブロック内の各定義（<code>bmi = ...</code> や <code>(skinny...) = ...</code>）は、開始位置（列インデント）を完全に揃えなければコンパイルエラーになる",
        "isCorrect": true
      },
      {
        "text": "<code>where</code> の変数定義は必ずスペース4つ分インデントしなければならないという数値的な制約がある",
        "isCorrect": false
      },
      {
        "text": "インデントは任意であり、波括弧やセミコロンを使わない限り自由に崩して記述してよい",
        "isCorrect": false
      },
      {
        "text": "<code>where</code> 節の変数は、ガード（<code>|</code>）の記述よりも浅いインデント（左寄り）で記述しなければならない",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellは「レイアウトルール（オフサイドール）」を採用しており、ブロックの境界をインデント位置（列）で判断します。<br><code>where</code> 節の中で複数の変数やパターンを定義する場合、各行の定義開始列を綺麗に揃える必要があります。<br>インデントがズレていると、コンパイラはブロックの終了や不正な式とみなして <code>parse error</code> を発生させます。"
  },
  {
    "id": "20260608-q3",
    "question": "以下の <code>initials</code> 関数において、<code>initials &quot;John&quot; &quot;Doe&quot;</code> を実行したときの戻り値と、<code>where</code> 節における <code>(f:_) = firstname</code> の動作として正しいものはどれですか？",
    "code": "initials :: String <span class=\"keyword\">-&gt;</span> String <span class=\"keyword\">-&gt;</span> String\ninitials firstname lastname = [f] ++ \". \" ++ [l] ++ \".\"\n    <span class=\"keyword\">where</span> (f:_) = firstname\n          (l:_) = lastname",
    "choices": [
      {
        "text": "戻り値は <code>&quot;J. D.&quot;</code>。<code>(f:_)</code> はリスト（文字列）の先頭文字を <code>f</code> に束縛し、残りを無視するパターンマッチとして動作する",
        "isCorrect": true
      },
      {
        "text": "戻り値は <code>&quot;John. Doe.&quot;</code>。<code>(f:_)</code> は文字列全体を <code>f</code> に束縛する",
        "isCorrect": false
      },
      {
        "text": "戻り値は <code>&quot;ohn. oe.&quot;</code>。<code>(f:_)</code> は先頭文字をスキップし、残りの文字列を <code>f</code> に束縛する",
        "isCorrect": false
      },
      {
        "text": "コンパイルエラー。<code>where</code> 節の中では <code>(x:xs)</code> のようなパターンマッチを使うことができないため",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellでは <code>where</code> の中であってもパターンマッチによる変数バインド（束縛）を行うことができます。<br><code>String</code> は <code>Char</code> のリスト <code>[Char]</code> であるため、<code>(f:_) = firstname</code> と記述すると、リストの最初の要素（先頭の1文字）が <code>f</code> に束縛され、残りの文字はワイルドカード <code>_</code> によって無視されます。<br><code>&quot;John&quot;</code> の先頭は <code>'J'</code> なので <code>f</code> には <code>'J'</code> が、同様に <code>l</code> には <code>'D'</code> が入り、最終的に <code>&quot;J. D.&quot;</code> が返されます。"
  },
  {
    "id": "20260608-q4",
    "question": "以下の <code>calcBmis</code> 関数におけるリスト内包表記（<code>[bmi w h | (w, h) &lt;- xs]</code>）と <code>where</code> 内の関数 <code>bmi</code> の組み合わせについて、正しい記述はどれですか？",
    "code": "calcBmis :: [(Double, Double)] <span class=\"keyword\">-&gt;</span> [Double]\ncalcBmis xs = [bmi w h | (w, h) <span class=\"keyword\">&lt;-</span> xs]\n    <span class=\"keyword\">where</span> bmi weight height = weight / height ^ 2",
    "choices": [
      {
        "text": "リスト <code>xs</code> の各タプル <code>(w, h)</code> に対して <code>where</code> 節で定義された2引数関数 <code>bmi</code> を適用し、その計算結果のリストを返す",
        "isCorrect": true
      },
      {
        "text": "<code>where</code> 内では引数を取る関数（ローカル関数）を定義できないため、コンパイルエラーになる",
        "isCorrect": false
      },
      {
        "text": "リスト内包表記は元のリスト <code>xs</code> に新しい要素を追加するための構文であり、戻り値の型は <code>[(Double, Double)]</code> となる",
        "isCorrect": false
      },
      {
        "text": "<code>bmi</code> の定義において、引数 <code>weight</code> と <code>height</code> に型注釈がないため実行時エラーになる",
        "isCorrect": false
      }
    ],
    "explanation": "<code>where</code> ブロック内では、変数（定数）だけでなく、引数を取るローカル関数（この場合は <code>bmi weight height = ...</code>）も自由に定義できます。<br>また、リスト内包表記の <code>[bmi w h | (w, h) &lt;- xs]</code> は、リスト <code>xs</code> の要素を順番に取り出して <code>(w, h)</code> にパターンマッチし、それを <code>bmi w h</code> で処理した結果からなる新しいリストを作ります。これは TypeScript などでいう <code>map</code> 処理に対応し、非常にスマートに記述できます。"
  }
]
};
