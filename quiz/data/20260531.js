window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260531"] = {
  date: "20260531",
  title: "型クラス・多相定数・fromIntegral",
  questions: [
  {
    "id": "20260531-q1",
    "question": "GHCiで <code>:t 20</code> を実行すると、どのような型が表示されるでしょうか？",
    "code": "<span class=\"prompt\">ghci&gt;</span> <span class=\"operator\">:t</span> <span class=\"number\">20</span>\n<span class=\"number\">20</span> <span class=\"operator\">::</span> ???",
    "choices": [
      {
        "text": "20 :: Int",
        "isCorrect": false
      },
      {
        "text": "20 :: Integer",
        "isCorrect": false
      },
      {
        "text": "20 :: Num a => a",
        "isCorrect": true
      },
      {
        "text": "20 :: Double",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellの数値リテラル（20など）は<strong>多相定数</strong>です。特定の型（IntやDouble）に固定されず、<code>Num a => a</code> という型を持ちます。これは「Num型クラスのインスタンスであるどんな型 a にもなれる」という意味です。実際に <code>20 :: Int</code>、<code>20 :: Float</code>、<code>20 :: Double</code> のように型注釈を付けることで、具体的な型として使い分けることができます。"
  },
  {
    "id": "20260531-q2",
    "question": "次のコードを GHCi で実行するとどうなりますか？",
    "code": "<span class=\"prompt\">ghci&gt;</span> (<span class=\"number\">5</span> <span class=\"operator\">::</span> <span class=\"type\">Int</span>) <span class=\"operator\">*</span> (<span class=\"number\">6</span> <span class=\"operator\">::</span> <span class=\"type\">Integer</span>)",
    "choices": [
      {
        "text": "30 が返る",
        "isCorrect": false
      },
      {
        "text": "30.0 が返る",
        "isCorrect": false
      },
      {
        "text": "型エラーになる",
        "isCorrect": true
      },
      {
        "text": "自動的に Integer に変換されて 30 が返る",
        "isCorrect": false
      }
    ],
    "explanation": "<code>(*)</code> の型は <code>Num a => a -> a -> a</code> です。ここで重要なのは、引数と返り値の型がすべて<strong>同じ型 a</strong> でなければならない点です。<code>5 :: Int</code> と <code>6 :: Integer</code> は異なる型なので、GHCは <code>Couldn't match expected type 'Int' with actual type 'Integer'</code> というエラーを出します。Haskellは暗黙の型変換を行いません！"
  },
  {
    "id": "20260531-q3",
    "question": "<code>5 * (6 :: Integer)</code> はエラーにならずに <code>30</code> を返します。なぜでしょうか？",
    "code": "<span class=\"prompt\">ghci&gt;</span> <span class=\"number\">5</span> <span class=\"operator\">*</span> (<span class=\"number\">6</span> <span class=\"operator\">::</span> <span class=\"type\">Integer</span>)\n<span class=\"number\">30</span>",
    "choices": [
      {
        "text": "5 が自動的に Float に変換されるから",
        "isCorrect": false
      },
      {
        "text": "5 は多相定数なので Integer として推論されるから",
        "isCorrect": true
      },
      {
        "text": "(*) は異なる型でも計算できるから",
        "isCorrect": false
      },
      {
        "text": "GHCi は型チェックを省略するから",
        "isCorrect": false
      }
    ],
    "explanation": "<code>5</code> は型注釈がないため、多相定数 <code>Num a => a</code> のままです。一方 <code>6 :: Integer</code> で右辺が Integer に固定されているため、GHCは <code>(*)</code> の型 <code>a -> a -> a</code> から <code>a = Integer</code> と推論します。結果として <code>5</code> も Integer として解釈され、型が一致するのでエラーになりません。"
  },
  {
    "id": "20260531-q4",
    "question": "次のうち、Floating 型クラスのインスタンスである型の組み合わせとして正しいものはどれですか？",
    "code": "<span class=\"comment\">-- Floating型クラスに含まれる型は？</span>\n<span class=\"keyword\">class</span> (<span class=\"type\">Fractional</span> a) <span class=\"operator\">=></span> <span class=\"type\">Floating</span> a <span class=\"keyword\">where</span>\n  <span class=\"comment\">-- sin, cos, sqrt, exp, log ...</span>",
    "choices": [
      {
        "text": "Int と Integer",
        "isCorrect": false
      },
      {
        "text": "Float と Double",
        "isCorrect": true
      },
      {
        "text": "Integer と Double",
        "isCorrect": false
      },
      {
        "text": "Int と Float",
        "isCorrect": false
      }
    ],
    "explanation": "<strong>Floating型クラス</strong>には <code>Float</code> と <code>Double</code> が含まれます。sin、cos、sqrt などの数学関数は浮動小数点数でないと意味のある計算ができないため、Floating型クラスに属しています。一方、<strong>Integral型クラス</strong>には <code>Int</code> と <code>Integer</code> が含まれ、整数のみを扱います。"
  },
  {
    "id": "20260531-q5",
    "question": "<code>fromIntegral</code> の型シグネチャとして正しいものはどれですか？",
    "code": "<span class=\"prompt\">ghci&gt;</span> <span class=\"operator\">:t</span> fromIntegral\nfromIntegral <span class=\"operator\">::</span> ???",
    "choices": [
      {
        "text": "Num a => a -> Integer",
        "isCorrect": false
      },
      {
        "text": "Int -> Double",
        "isCorrect": false
      },
      {
        "text": "(Integral a, Num b) => a -> b",
        "isCorrect": true
      },
      {
        "text": "Integer -> Float",
        "isCorrect": false
      }
    ],
    "explanation": "<code>fromIntegral</code> の型は <code>(Integral a, Num b) => a -> b</code> です。ここには<strong>複数の型クラス制約</strong>があり、カンマで区切って括弧で囲む構文を使います。意味は「整数型（Integral）の値を受け取り、任意の数値型（Num）に変換する」です。これにより、例えば <code>length</code> が返す <code>Int</code> を <code>Double</code> などに変換して浮動小数点数と一緒に計算できます。"
  },
  {
    "id": "20260531-q6",
    "question": "<code>length</code> の型に含まれる <code>Foldable t</code> という制約は何を意味していますか？",
    "code": "<span class=\"prompt\">ghci&gt;</span> <span class=\"operator\">:t</span> length\nlength <span class=\"operator\">::</span> <span class=\"type\">Foldable</span> t <span class=\"operator\">=></span> t a <span class=\"operator\">-></span> <span class=\"type\">Int</span>",
    "choices": [
      {
        "text": "t はリスト型 [] のみを指す",
        "isCorrect": false
      },
      {
        "text": "t は要素を順にたどれる構造なら何でもよい",
        "isCorrect": true
      },
      {
        "text": "t は数値型でなければならない",
        "isCorrect": false
      },
      {
        "text": "t は必ずタプル型を指す",
        "isCorrect": false
      }
    ],
    "explanation": "<code>Foldable t</code> は「<strong>t は要素を1つずつ順にたどることができる構造</strong>」という型クラス制約です。リスト <code>[]</code> だけでなく、木構造（Tree）や Map など、要素を順番に数えられる構造であれば何でも <code>length</code> に渡せます。本（すごいHaskell）ではリスト専用の <code>[a] -> Int</code> と書いてあることがありますが、現在のGHCではより一般化された <code>Foldable t => t a -> Int</code> になっています。"
  },
  {
    "id": "20260531-q7",
    "question": "ある型を Ord 型クラスのインスタンスにするための前提条件は何ですか？",
    "code": "<span class=\"comment\">-- 型クラスの階層関係</span>\n<span class=\"keyword\">class</span> <span class=\"type\">Eq</span> a <span class=\"keyword\">where</span>\n  (<span class=\"operator\">==</span>) <span class=\"operator\">::</span> a <span class=\"operator\">-></span> a <span class=\"operator\">-></span> <span class=\"type\">Bool</span>\n\n<span class=\"keyword\">class</span> (<span class=\"type\">Eq</span> a) <span class=\"operator\">=></span> <span class=\"type\">Ord</span> a <span class=\"keyword\">where</span>\n  compare <span class=\"operator\">::</span> a <span class=\"operator\">-></span> a <span class=\"operator\">-></span> <span class=\"type\">Ordering</span>",
    "choices": [
      {
        "text": "Show 型クラスのインスタンスである必要がある",
        "isCorrect": false
      },
      {
        "text": "Num 型クラスのインスタンスである必要がある",
        "isCorrect": false
      },
      {
        "text": "Eq 型クラスのインスタンスである必要がある",
        "isCorrect": true
      },
      {
        "text": "特に前提条件はない",
        "isCorrect": false
      }
    ],
    "explanation": "Ord型クラスのインスタンスになるには、先に<strong>Eq型クラスのインスタンス</strong>になっている必要があります。これは論理的に考えると自然です。「2つのものが順序づけられる（大小比較できる）なら、それらが等しいかどうかも判定できるはず」だからです。型クラス定義の <code>class (Eq a) => Ord a</code> の部分が、この前提条件（スーパークラス制約）を表しています。"
  }
]
};
