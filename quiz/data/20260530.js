window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260530"] = {
  date: "20260530",
  title: "型クラス・型変数・Read/Show",
  questions: [
  {
    "id": "20260530-q1",
    "question": "次のGHCiの出力を見て、<code>head</code> 関数の型シグネチャで使われている <code>a</code> は何を表していますか？",
    "code": "<span class=\"func\">ghci</span>> :t head\n<span class=\"func\">head</span> :: GHC.Stack.Types.HasCallStack => [<span class=\"type\">a</span>] -> <span class=\"type\">a</span>",
    "choices": [
      {
        "text": "型クラスの名前（例：Eq や Ord のような）",
        "isCorrect": false
      },
      {
        "text": "型変数 — 任意の型を受け取れることを示すプレースホルダー",
        "isCorrect": true
      },
      {
        "text": "リスト型を表す特別なキーワード",
        "isCorrect": false
      },
      {
        "text": "関数の引数の個数を示す記号",
        "isCorrect": false
      }
    ],
    "explanation": "<strong>型変数</strong>（type variable）です。<code>a</code> は具体的な型（<code>Int</code>, <code>Char</code> など）の代わりに使われるプレースホルダーで、「どんな型でもOK」を意味します。<br>これにより <code>head</code> は <code>[Int]</code> にも <code>[Char]</code> にも使える<strong>多目的関数（polymorphic function）</strong>になります。型安全はコンパイル時に保証されるため、実行時エラーはありません。"
  },
  {
    "id": "20260530-q2",
    "question": "次のコードを実行すると何が返りますか？",
    "code": "<span class=\"func\">ghci</span>> :t fst\n<span class=\"func\">fst</span> :: (<span class=\"type\">a</span>, <span class=\"type\">b</span>) -> <span class=\"type\">a</span>\n\n<span class=\"func\">ghci</span>> fst (<span class=\"number\">42</span>, <span class=\"string\">\"hello\"</span>)",
    "choices": [
      {
        "text": "\"hello\"",
        "isCorrect": false
      },
      {
        "text": "42",
        "isCorrect": true
      },
      {
        "text": "(42, \"hello\")",
        "isCorrect": false
      },
      {
        "text": "エラー：タプルの型が混在しているため",
        "isCorrect": false
      }
    ],
    "explanation": "<code>fst :: (a, b) -> a</code> はタプルの<strong>第1要素</strong>を返します。<br>ここで <code>a</code> と <code>b</code> は<strong>異なる型変数</strong>なので、タプルの各要素が違う型でも全く問題ありません。<code>fst (42, \"hello\")</code> は型 <code>(Int, String)</code> のタプルから <code>Int</code> 型の <code>42</code> を返します。"
  },
  {
    "id": "20260530-q3",
    "question": "型クラス制約 <code>=></code> の左側（例えば <code>Eq a =></code>）は何を意味しますか？",
    "code": "<span class=\"func\">ghci</span>> :t (==)\n(==) :: <span class=\"type\">Eq</span> <span class=\"type\">a</span> => <span class=\"type\">a</span> -> <span class=\"type\">a</span> -> <span class=\"keyword\">Bool</span>",
    "choices": [
      {
        "text": "a という型は必ず Int 型でなければならない",
        "isCorrect": false
      },
      {
        "text": "この関数は2つの引数を取る",
        "isCorrect": false
      },
      {
        "text": "型変数 a は Eq 型クラスのインスタンスである必要があるという制約",
        "isCorrect": true
      },
      {
        "text": "関数が Bool 型を返すことを示すシンタックスシュガー",
        "isCorrect": false
      }
    ],
    "explanation": "<code>=></code> の左側は<strong>型クラス制約</strong>（typeclass constraint）と呼ばれます。<br><code>Eq a =></code> は「型変数 <code>a</code> は <code>Eq</code> 型クラスのインスタンスでなければならない」という意味です。つまり <code>==</code> は、等値性の比較が定義されている型（<code>Int</code>, <code>Char</code>, <code>String</code> など）にのみ使えます。<br>I/O型や関数型は <code>Eq</code> のインスタンスではないため、<code>==</code> で比較できません。"
  },
  {
    "id": "20260530-q4",
    "question": "<code>compare</code> 関数の返り値の型 <code>Ordering</code> が取りうる値として、正しいものはどれですか？",
    "code": "<span class=\"func\">ghci</span>> <span class=\"string\">\"Abrakagabra\"</span> `compare` <span class=\"string\">\"Zebra\"</span>\n<span class=\"type\">LT</span>\n<span class=\"func\">ghci</span>> <span class=\"number\">5</span> `compare` <span class=\"number\">3</span>\n<span class=\"type\">GT</span>",
    "choices": [
      {
        "text": "True / False / Equal",
        "isCorrect": false
      },
      {
        "text": "Less / Greater / Same",
        "isCorrect": false
      },
      {
        "text": "LT / EQ / GT",
        "isCorrect": true
      },
      {
        "text": "-1 / 0 / 1（整数値）",
        "isCorrect": false
      }
    ],
    "explanation": "<code>Ordering</code> 型は <strong><code>LT</code>（Less Than：より小さい）</strong>、<strong><code>EQ</code>（Equal：等しい）</strong>、<strong><code>GT</code>（Greater Than：より大きい）</strong>の3つの値を持つ型です。<br>これは <code>Ord</code> 型クラスのメソッドである <code>compare</code> の返り値として使われます。<code>Ordering</code> 自体も <code>Enum</code> のインスタンスなので <code>[LT .. GT]</code> のようにレンジで使えます！"
  },
  {
    "id": "20260530-q5",
    "question": "次のコードはなぜエラーになるのでしょうか？",
    "code": "<span class=\"func\">ghci</span>> <span class=\"func\">read</span> <span class=\"string\">\"4\"</span>\n*** Exception: Prelude.read: no parse",
    "choices": [
      {
        "text": "\"4\" は有効なHaskellの文字列ではないから",
        "isCorrect": false
      },
      {
        "text": "read 関数は数値リテラルしか受け付けないから",
        "isCorrect": false
      },
      {
        "text": "Haskellのコンパイラが結果の型を推論できないから（型注釈が必要）",
        "isCorrect": true
      },
      {
        "text": "read は廃止予定の関数だから",
        "isCorrect": false
      }
    ],
    "explanation": "<code>read</code> の型シグネチャは <code>Read a => String -> a</code> です。つまり「文字列を受け取り、<strong>何らかの <code>Read</code> インスタンスの型</strong>を返す」のですが、その「何らかの型」が何なのかコンパイラが判断できません。<br>後続の式が使われていれば推論できますが（例：<code>read \"8.2\" + 3.8</code> なら <code>Float</code> と推論）、単独では型が確定できずランタイムエラーになります。解決策は<strong>型注釈</strong>：<code>read \"4\" :: Int</code>"
  },
  {
    "id": "20260530-q6",
    "question": "<code>show</code> 関数を使うと何が起きますか？",
    "code": "<span class=\"func\">ghci</span>> <span class=\"func\">show</span> <span class=\"number\">3</span>\n<span class=\"string\">\"3\"</span>\n<span class=\"func\">ghci</span>> <span class=\"func\">show</span> <span class=\"keyword\">True</span>\n<span class=\"string\">\"True\"</span>",
    "choices": [
      {
        "text": "値をコンソールに出力する（print と同じ）",
        "isCorrect": false
      },
      {
        "text": "Show 型クラスのインスタンスである値を String に変換する",
        "isCorrect": true
      },
      {
        "text": "任意の型をInt型にキャストする",
        "isCorrect": false
      },
      {
        "text": "値の型名を文字列として返す（:t と同じ）",
        "isCorrect": false
      }
    ],
    "explanation": "<code>show</code> は <code>Show</code> 型クラスのメソッドで、値を<strong>文字列表現（<code>String</code>）に変換</strong>します。<br><code>print</code> は内部的に <code>putStrLn (show x)</code> を実行しているので、コンソール出力とは異なります。<code>show 3</code> は <code>\"3\"</code>（String）を返すだけで出力はしません。<code>Show</code> 型クラスは <code>Read</code> と対をなす関係で、<code>read (show x) == x</code> が成り立つように設計されています。"
  },
  {
    "id": "20260530-q7",
    "question": "<code>Bounded</code> 型クラスについて、次のコードの実行結果として正しいものはどれですか？",
    "code": "<span class=\"func\">ghci</span>> maxBound :: (<span class=\"keyword\">Bool</span>, <span class=\"type\">Int</span>, <span class=\"type\">Char</span>)",
    "choices": [
      {
        "text": "エラー：タプルは Bounded のインスタンスではないため",
        "isCorrect": false
      },
      {
        "text": "(True, 9223372036854775807, '\\1114111')",
        "isCorrect": true
      },
      {
        "text": "(False, -9223372036854775808, '\\0')",
        "isCorrect": false
      },
      {
        "text": "(True, 2147483647, 'z')",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellでは<strong>タプルの全構成要素が <code>Bounded</code> のインスタンスであれば、そのタプル自身も <code>Bounded</code> のインスタンス</strong>になります！<br>各要素の <code>maxBound</code> が組み合わさり：<code>Bool</code> の最大値は <code>True</code>、<code>Int</code> の最大値は 64ビット整数の上限 <code>9223372036854775807</code>、<code>Char</code> の最大値は Unicode の最大コードポイント <code>'\\1114111'</code> となります。"
  }
]
};
