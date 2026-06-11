window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260603"] = {
  date: "20260603",
  title: "リスト内包表記のパターンマッチとリスト構造",
  questions: [
  {
    "id": "20260603-q1",
    "question": "次のリスト内包表記を実行した際に出力される結果として正しいものはどれですか？",
    "code": "<span class=\"keyword\">let</span> xs = [(1,3), (4,3), (2,4), (5,3), (5,6), (3,1)]\n[x*100+3 <span class=\"keyword\">|</span> (x, 3) <span class=\"keyword\">&lt;-</span> xs]",
    "choices": [
      {
        "text": "[103,403,204,503,506,301]",
        "isCorrect": false
      },
      {
        "text": "[103,403,503]",
        "isCorrect": true
      },
      {
        "text": "[301,304,302,305,305,303]",
        "isCorrect": false
      },
      {
        "text": "Non-exhaustive patterns エラーが発生する",
        "isCorrect": false
      }
    ],
    "explanation": "リスト内包表記の中でパターンマッチを行うと、パターンにマッチしなかった要素（この場合は第2成分が <code>3</code> ではないタプル <code>(2,4)</code>, <code>(5,6)</code>, <code>(3,1)</code>）はエラーにならず、<b>単に無視（フィルタリング）されます</b>。そのため、<code>(1,3)</code>, <code>(4,3)</code>, <code>(5,3)</code> の3つだけが対象となり、それぞれ <code>1*100+3 = 103</code>、<code>4*100+3 = 403</code>、<code>5*100+3 = 503</code> が計算されて <code>[103, 403, 503]</code> となります。"
  },
  {
    "id": "20260603-q2",
    "question": "<code>head'</code> 関数を以下のように定義しようとしたところ、構文エラー（Syntax error）になりました。その原因として正しいものはどれですか？",
    "code": "<span class=\"function\">head'</span> <span class=\"keyword\">::</span> [<span class=\"type\">a</span>] <span class=\"keyword\">-></span> <span class=\"type\">a</span>\n<span class=\"function\">head'</span> [] = <span class=\"function\">error</span> <span class=\"string\">\"Can't call head on an empty list, dummy!\"</span>\n<span class=\"function\">head'</span> x:_ = x <span class=\"comment\">-- ここで構文エラー</span>",
    "choices": [
      {
        "text": "error 関数の引数はダブルクォーテーションで囲めないから",
        "isCorrect": false
      },
      {
        "text": "head' x:_ の部分で、パターンマッチの優先順位の関係上、丸括弧で (x:_) と囲んでいないから",
        "isCorrect": true
      },
      {
        "text": "_（ワイルドカード）は関数の引数パターンでは使えないから",
        "isCorrect": false
      },
      {
        "text": "1行目の型シグネチャ [a] -> a が誤っているから",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellでは、関数定義の引数部分にリストの構築子パターン（<code>x:_</code> や <code>x:xs</code> など）を使う場合、<b>全体を丸括弧で囲む必要があります</b>。囲まないと、コンパイラは <code>head' x</code> に <code>:</code> 演算子を適用しようとしていると解釈してしまい、構文エラーになります。正しくは <code>head' (x:_) = x</code> と書く必要があります。"
  },
  {
    "id": "20260603-q3",
    "question": "以下の <code>badAdd</code> 関数の定義に対して、<code>badAdd [10, 20]</code> を実行するとどうなりますか？",
    "code": "<span class=\"function\">badAdd</span> <span class=\"keyword\">::</span> (<span class=\"type\">Num</span> a) <span class=\"keyword\">=></span> [<span class=\"type\">a</span>] <span class=\"keyword\">-></span> a\n<span class=\"function\">badAdd</span> (x:y:z:[]) = x + y + z\n\n<span class=\"comment\">-- ghci&gt; badAdd [10, 20] を実行した時の挙動は？</span>",
    "choices": [
      {
        "text": "30 が返る",
        "isCorrect": false
      },
      {
        "text": "0 が返る",
        "isCorrect": false
      },
      {
        "text": "「Non-exhaustive patterns in function badAdd」という実行時エラー（例外）が発生する",
        "isCorrect": true
      },
      {
        "text": "コンパイルエラーになる",
        "isCorrect": false
      }
    ],
    "explanation": "<code>badAdd</code> のパターン <code>(x:y:z:[])</code> は、<b>「要素がちょうど3つのリスト」</b>にしかマッチしません。要素が2つのリスト <code>[10, 20]</code> や、その他の長さのリストを渡すと、マッチするパターンが定義されていないため、実行時に <code>Non-exhaustive patterns</code> 例外が発生します。"
  },
  {
    "id": "20260603-q4",
    "question": "Haskellのパターンマッチにおいて、<code>x:xs</code> のようなコロン（cons演算子）を用いたパターンは有効ですが、<code>(xs ++ ys)</code> や <code>(xs ++ [x])</code> のように <code>++</code> 演算子を用いたパターンは使用できません。その最も本質的な理由は何ですか？",
    "code": "<span class=\"comment\">-- なぜ (xs ++ [x]) のようなパターンマッチは使えない？</span>\n<span class=\"comment\">-- ✖ func (xs ++ [x]) = ... (コンパイルエラー)</span>\n<span class=\"comment\">-- ◯ func (x:xs) = ... (OK)</span>",
    "choices": [
      {
        "text": "++ はデータコンストラクタではなく、通常の関数だから",
        "isCorrect": true
      },
      {
        "text": "Haskellのリストが双方向連結リストであり、両端からしか探索できないから",
        "isCorrect": false
      },
      {
        "text": "++ を使うと、リストの型が [a] から別の型に変更されてしまうから",
        "isCorrect": false
      },
      {
        "text": "++ は遅延評価に対応していないから",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellのパターンマッチは、データがどのコンストラクタを使って構築されたか（リストの場合は <code>:</code> または <code>[]</code>）をチェックする機能です。<code>++</code> はただの関数であってデータコンストラクタではないため、パターンマッチの対象にできません。また、<code>(xs ++ ys)</code> は分割の仕方が何通りも存在し一意に定まらない点や、<code>(xs ++ [x])</code> のような形であっても先頭からしか手繰れない単方向連結リストの性質上、末尾のスキャンのために O(N) の関数処理（重い計算）が必要になってしまうため、超高速なパターンマッチの設計思想に反することから禁止されています。"
  }
]
};
