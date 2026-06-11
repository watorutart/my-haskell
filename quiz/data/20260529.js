window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260529"] = {
  date: "20260529",
  title: "Int/Integer、Float/Double、タプルの型",
  questions: [
  {
    "id": "20260529-q1",
    "question": "今日のコードでは階乗を計算する <code>factorial</code> 関数を定義しました。もし、関数の型シグネチャを <code>Integer -> Integer</code> から <code>Int -> Int</code> に変更して <code>factorial 50</code> を実行した場合、64ビット環境でどのような結果になるでしょうか？",
    "code": "<span class=\"comment\">-- 元の定義</span>\n<span class=\"keyword\">factorial</span> :: Integer -&gt; Integer\n<span class=\"keyword\">factorial</span> n = product [1..n]\n\n<span class=\"comment\">-- 変更後の定義</span>\n<span class=\"keyword\">factorial'</span> :: Int -&gt; Int\n<span class=\"keyword\">factorial'</span> n = product [1..n]",
    "choices": [
      {
        "text": "自動的に多倍長整数（Integer）に型変換され、正しい階乗計算の結果が表示される",
        "isCorrect": false
      },
      {
        "text": "<code>Int</code> 型の範囲を超えるため、実行時に「オーバーフローエラー（例外）」が発生して強制終了する",
        "isCorrect": false
      },
      {
        "text": "計算途中でオーバーフローが発生し、エラーにならずに <code>0</code> などの予期せぬ値が返る",
        "isCorrect": true
      },
      {
        "text": "Haskellでは <code>Int</code> は無制限の整数を表すため、型を変えても全く同じ正しい結果が返る",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellの <code>Int</code> 型は有界（上限と下限がある固定精度整数）であり、一般的な64ビット環境では -2^63 から 2^63-1 までの値を扱います。この範囲を超える計算（50の階乗など）を行っても、Haskellでは自動的な型拡張（Integerへの変換）や実行時エラーの発生は行われず、<strong>サイレントにオーバーフロー（桁あふれ）</strong>が発生し、予期しない値（2の累積数が多いため <code>0</code> など）を返します。大きな値を正確に計算したい場合は、範囲制限のない <code>Integer</code> 型を使用する必要があります！"
  },
  {
    "id": "20260529-q2",
    "question": "Haskellの単精度浮動小数点数型 <code>Float</code> と、倍精度浮動小数点数型 <code>Double</code> に関する説明として、最も適切なものはどれでしょうか？",
    "code": "<span class=\"comment\">-- Float を使用する円周計算</span>\n<span class=\"keyword\">circumference</span> :: Float -&gt; Float\n<span class=\"keyword\">circumference</span> r = 2 * pi * r   <span class=\"comment\">-- 結果: 25.132742</span>\n\n<span class=\"comment\">-- Double を使用する円周計算</span>\n<span class=\"keyword\">circumference'</span> :: Double -&gt; Double\n<span class=\"keyword\">circumference'</span> r = 2 * pi * r  <span class=\"comment\">-- 結果: 25.132741228718345</span>",
    "choices": [
      {
        "text": "<code>Double</code> 型は <code>Float</code> 型に比べて2倍のメモリ量（64ビット）を使用するが、より高い精度（小数点以下の多くの桁数）で実数を表現できる",
        "isCorrect": true
      },
      {
        "text": "<code>Float</code> と <code>Double</code> は名前が違うだけで、保持できる桁数や内部の精度は完全に同一である",
        "isCorrect": false
      },
      {
        "text": "<code>Double</code> は浮動小数点数ではなく、小数の四捨五入を自動的に行う特殊な整数型である",
        "isCorrect": false
      },
      {
        "text": "Haskellでは <code>Float</code> の方が <code>Double</code> よりも高精度な計算に適しているため、常に <code>Float</code> を使うべきである",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellの <code>Double</code> 型は倍精度浮動小数点数（64ビット）であり、<code>Float</code> 型（単精度浮動小数点数、32ビット）に比べて約2倍のビット数を用いて実数を表現します。そのため、今日のメモの実行結果でも確認できるように、<code>Double</code> を使った <code>circumference'</code> の方が、<code>Float</code> の <code>circumference</code> よりも非常に多くの桁数まで高い精度で円周を計算できています！精密な科学計算や金融計算のシミュレーション等では <code>Double</code> がよく使われます。"
  },
  {
    "id": "20260529-q3",
    "question": "Haskellのタプル（Tuple）に関する以下の記述のうち、**誤っているもの**はどれでしょうか？",
    "code": "<span class=\"comment\">-- タプルの例</span>\n<span class=\"keyword\">val1</span> = (1, 'A')\n<span class=\"keyword\">val2</span> = (1, 'A', 3.0)\n<span class=\"keyword\">val3</span> = ()",
    "choices": [
      {
        "text": "タプルは異なる型の要素（例: <code>Int</code> と <code>Char</code>）を混在させて格納することができる",
        "isCorrect": false
      },
      {
        "text": "<code>(Int, Char)</code> 型のタプルと <code>(Char, Int)</code> 型のタプルは、要素の順番が異なるだけで中身が同じなら同一の型として扱われる",
        "isCorrect": true
      },
      {
        "text": "<code>val1</code> と <code>val2</code> は要素の数が異なるため、全く別の型として扱われる",
        "isCorrect": false
      },
      {
        "text": "空のタプル <code>()</code> も一つの型（ユニット型）であり、この型が持つ値は <code>()</code> の1つだけである",
        "isCorrect": false
      }
    ],
    "explanation": "タプルの型は「要素の数（サイズ）」と「それぞれの要素 of 型（およびその記述順序）」によって厳密に定義されます。したがって、<code>(Int, Char)</code> と <code>(Char, Int)</code> は全く異なる型であり、互いに代入したりすることはできません。また、空のタプル <code>()</code> は「ユニット（Unit）」型と呼ばれ、値としても <code>()</code> というただ1つだけの値を持つ特別な型です。関数が実質的な値を返さない場合などに利用されます！"
  }
]
};
