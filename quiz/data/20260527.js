window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260527"] = {
  date: "20260527",
  title: "タプル・zip関数・リスト内包表記",
  questions: [
  {
    "id": "20260527-q1",
    "question": "Haskellのタプルとリストの組み合わせに関する挙動について。次のGHCiでのコードを実行したとき、どのような結果になりますか？",
    "code": "<span class=\"comment\">-- リスト内のタプルのサイズが異なっている場合</span>\n<span class=\"keyword\">ghci&gt;</span> [(1, 2), (8, 11, 5), (4, 5)]",
    "choices": [
      {
        "text": "そのまま <code>[(1,2), (8,11,5), (4,5)]</code> が評価され返る",
        "isCorrect": false
      },
      {
        "text": "要素数が自動調整され <code>[(1,2), (8,11), (4,5)]</code> になる",
        "isCorrect": false
      },
      {
        "text": "コンパイル/型エラー（<code>Couldn't match expected type...</code>）になる",
        "isCorrect": true
      },
      {
        "text": "<code>[(1,2,0), (8,11,5), (4,5,0)]</code> のように0でパディングされる",
        "isCorrect": false
      }
    ],
    "explanation": "タプルは<strong>固定長</strong>であり、かつ要素の数（サイズ）や要素の型が異なると「異なる型」として扱われます。<code>[(1,2), (8,11,5), (4,5)]</code> というリストを作ろうとすると、1つ目の要素 <code>(1,2)</code> はペア（要素数2のタプル）型 <code>(Num a, Num b) => (a, b)</code> になりますが、2つ目の要素 <code>(8,11,5)</code> はトリプル（要素数3のタプル）型 <code>(Num a, Num b, Num c) => (a, b, c)</code> となります。リストは「すべての要素が同じ型でなければならない」という制約があるため、ペアのリストの中にトリプルを混ぜることはできず、GHCは型エラーを発生させます。"
  },
  {
    "id": "20260527-q2",
    "question": "無限リストを使った <code>zip</code> と、ペア用の関数適用の組み合わせに関する問題です。次のHaskellコードを実行した際、出力される結果はどれですか？",
    "code": "<span class=\"comment\">-- 無限リストを使った zip と、ペア専用の関数適用</span>\n<span class=\"keyword\">ghci&gt;</span> snd (fst (zip [1..] [\"apple\", \"banana\", \"orange\", \"grape\"] !! 2))",
    "choices": [
      {
        "text": "<code>\"orange\"</code>",
        "isCorrect": false
      },
      {
        "text": "<code>3</code>",
        "isCorrect": false
      },
      {
        "text": "<code>\"banana\"</code>",
        "isCorrect": false
      },
      {
        "text": "型エラー (Type error)",
        "isCorrect": true
      }
    ],
    "explanation": "<code>zip [1..] [\"apple\", \"banana\", \"orange\", \"grape\"]</code> は、無限リスト <code>[1..]</code> と有限のリストをジップし、短い方のリストに合わせて <code>[(1,\"apple\"), (2,\"banana\"), (3,\"orange\"), (4,\"grape\")]</code> を作成します。次に <code>!! 2</code> でインデックス2（3番目）の要素を取り出すので、<code>(3, \"orange\")</code> というペアが得られます。<code>fst (3, \"orange\")</code> はペアの最初の要素である <code>3</code> を返します。しかし、最後の <code>snd</code> はペア（要素数2のタプル）に適用してその2番目の要素を取得する関数です。<code>3</code> はタプルではなくただの数値（<code>Num a => a</code>）であるため、<code>snd 3</code> の呼び出しはコンパイル時の型エラーを引き起こします！"
  },
  {
    "id": "20260527-q3",
    "question": "以下の「直角三角形を見つけるリスト内包表記」を実行した際、評価結果はどうなりますか？",
    "code": "<span class=\"comment\">-- 直角三角形を探すリスト内包表記（周囲の長さが20のもの）</span>\n<span class=\"keyword\">ghci&gt;</span> [ (a, b, c) | c &lt;- [1..10], a &lt;- [1..c], b &lt;- [1..a], a^2 + b^2 == c^2, a+b+c == 20 ]",
    "choices": [
      {
        "text": "<code>[(8,6,6)]</code>",
        "isCorrect": false
      },
      {
        "text": "<code>[]</code> (空リスト)",
        "isCorrect": true
      },
      {
        "text": "<code>[(8,6,10)]</code>",
        "isCorrect": false
      },
      {
        "text": "ランタイムエラー (Runtime error)",
        "isCorrect": false
      }
    ],
    "explanation": "このコードはリスト内包表記を用いて、斜辺 <code>c</code> が10以下、他の2辺 <code>a</code>, <code>b</code> も10以下の直角三角形 <code>a^2 + b^2 == c^2</code> のうち、周囲の長さ <code>a+b+c</code> が20になるものを探しています。しかし、各辺が10以下の整数である直角三角形（ピタゴラス数）は <code>(3, 4, 5)</code>（周囲の長さ12）と <code>(6, 8, 10)</code>（周囲の長さ24）のみです。周囲の長さが20になる組み合わせは存在しないため、すべてのフィルタ条件を満たす要素がなくなり、結果は空のリスト <code>[]</code> になります。Haskellのリスト内包表記は条件を満たすものがなければエラーにならず、空のリストを安全に返します。"
  }
]
};
