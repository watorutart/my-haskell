window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260605"] = {
  date: "20260605",
  title: "asパターン、ガード、中置関数定義",
  questions: [
  {
    "id": "20260605-q1",
    "question": "以下の Haskell コードにおいて、<code>firstLetter &quot;Dracula&quot;</code> を実行した際、バインドされる変数 <code>all</code>、<code>x</code>、<code>xs</code> の値の組み合わせとして正しいものはどれですか？",
    "code": "firstLetter :: String <span class=\"keyword\">-&gt;</span> String\nfirstLetter \"\" = \"Empty string, whoops!\"\nfirstLetter all@(x:xs) = \"The first letter of \" ++ all ++ \" is \" ++ [x]",
    "choices": [
      {
        "text": "all は &quot;Dracula&quot; (String型)、x は 'D' (Char型)、xs は &quot;racula&quot; (String型)",
        "isCorrect": true
      },
      {
        "text": "all は &quot;racula&quot; (String型)、x は 'D' (Char型)、xs は &quot;Dracula&quot; (String型)",
        "isCorrect": false
      },
      {
        "text": "all は &quot;Dracula&quot; (String型)、x は &quot;D&quot; (String型)、xs は &quot;racula&quot; (String型)",
        "isCorrect": false
      },
      {
        "text": "パターンマッチが正常に動作せず、実行時エラーになる",
        "isCorrect": false
      }
    ],
    "explanation": "asパターン（<code>name@pattern</code>）は、値をパターンに分解しつつ、その元の値全体を <code>name</code> という名前で参照できる機能です。<br>この問題では、<code>all@(x:xs)</code> に対して <code>&quot;Dracula&quot;</code>（<code>['D', 'r', 'a', 'c', 'u', 'l', 'a']</code>）が渡されています。<br>・<code>all</code> は元のリスト全体 <code>&quot;Dracula&quot;</code> にバインドされます。<br>・<code>x:xs</code> の部分では、リストの先頭要素が <code>x</code> に、残りのリストが <code>xs</code> にバインドされます。<br>Haskellにおいて <code>String</code> は <code>[Char]</code> (文字のリスト) のエイリアスであるため、先頭要素 <code>x</code> は <code>Char</code> 型の <code>'D'</code>、残りのリスト <code>xs</code> は <code>String</code>（<code>[Char]</code>）型の <code>&quot;racula&quot;</code> となります。"
  },
  {
    "id": "20260605-q2",
    "question": "Haskellのガード（Guards）を用いた関数定義において、よくある「構文エラー（Gotcha）」の原因となる記述はどれですか？",
    "code": "<span class=\"comment\">-- bmiTell関数の定義におけるガードの記述</span>\nbmiTell weight height <span class=\"keyword\">[A]</span>\n    <span class=\"keyword\">|</span> weight / height ^ 2 &lt;= 18.5 = \"You're underweight...\"\n    <span class=\"keyword\">|</span> weight / height ^ 2 &lt;= 25.0 = \"You're supposedly normal...\"\n    <span class=\"keyword\">|</span> otherwise = \"You're a whale...\"",
    "choices": [
      {
        "text": "[A] の位置にイコール（=）を記述してしまう",
        "isCorrect": true
      },
      {
        "text": "otherwise の前に縦棒（|）を記述してしまう",
        "isCorrect": false
      },
      {
        "text": "ガードの各節（| で始まる行）をインデントして記述する",
        "isCorrect": false
      },
      {
        "text": "条件判定式（&lt;= 18.5 など）の直後にイコール（=）を記述する",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellのガードでは、関数名と引数の直後（上のコード의 <code>[A]</code> の位置）に <code>=</code>（イコール）を書いてはいけません。ガードを表す <code>|</code>（パイプ）自身が条件分岐の開始を示し、条件式が評価された後の結果定義にのみ <code>=</code> を使用します。<br>もし <code>bmiTell weight height =</code> のように書いてしまうと、<code>parse error on input ‘|’</code> という構文エラーになります。また、ガードの各行（<code>otherwise</code> も含む）はインデントする必要があります。"
  },
  {
    "id": "20260605-q3",
    "question": "以下の <code>myCompare</code> 関数の定義において、バッククオート（`）を使った記述（<code>a `myCompare` b</code>）に関する説明として正しいものはどれですか？",
    "code": "myCompare :: (Ord a) <span class=\"keyword\">=&gt;</span> a <span class=\"keyword\">-&gt;</span> a <span class=\"keyword\">-&gt;</span> Ordering\na <span class=\"keyword\">`myCompare`</span> b\n    <span class=\"keyword\">|</span> a == b = EQ\n    <span class=\"keyword\">|</span> a <span class=\"keyword\">&lt;=</span> b = LT\n    <span class=\"keyword\">|</span> <span class=\"keyword\">otherwise</span> = GT",
    "choices": [
      {
        "text": "関数定義の際にも、関数名をバッククオートで囲むことで、引数の間に配置する「中置記法」を使うことができる",
        "isCorrect": true
      },
      {
        "text": "中置記法で定義した関数は、呼び出す際にも必ずバッククオートで囲んで中置で呼び出す必要がある",
        "isCorrect": false
      },
      {
        "text": "バッククオートで囲める関数名は、アルファベット1文字に限られるという制約がある",
        "isCorrect": false
      },
      {
        "text": "型シグネチャの定義（1行目）でも、中置記法（<code>a `myCompare` b :: ...</code>）で記述しなければならない",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellでは、関数を定義するときもバッククオート（`）を使って中置記法（引数の間に関数名を書くスタイル）で記述することができます。これにより、<code>a `myCompare` b</code> のように直感的で読みやすいコードが書けます。<br>なお、中置で定義された関数であっても、通常の関数と同様に <code>myCompare a b</code> と前置記法で呼び出すことが可能です。また、型シグネチャは常に <code>myCompare :: ...</code> のように前置形式で記述する必要があります。"
  }
]
};
