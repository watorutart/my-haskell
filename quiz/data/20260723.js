window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260723"] = {
  date: "20260723",
  title: "Data.Mapとfrom List系関数",
  questions: [
    {
      id: "20260723-q1",
      question: "以下のコードをGHCiで実行すると結果はどうなるか?",
      code: `<span class="keyword">import</span> <span class="keyword">qualified</span> Data.Map <span class="keyword">as</span> Map

ghci&gt; Map.fromList [(<span class="comment">"MS"</span>, 1), (<span class="comment">"MS"</span>, 2), (<span class="comment">"MS"</span>, 3)]`,
      choices: [
        { text: "fromList [(\"MS\",3)] 最後に出現した要素の値が使われる", isCorrect: true },
        { text: "fromList [(\"MS\",1)] 最初に出現した要素の値が使われる", isCorrect: false },
        { text: "fromList [(\"MS\",[1,2,3])] 重複した値はリストにまとめられる", isCorrect: false },
        { text: "実行時エラーになる。同じキーを複数回指定できない", isCorrect: false }
      ],
      explanation: "Map.fromListは元のリストに重複したキーがあった場合、後の方(リストの末尾に近い方)の要素の値で上書きする。エラーにはならない。"
    },
    {
      id: "20260723-q2",
      question: "普通の連想リスト(タプルのリスト)に対するlookupはキーの型がEq型クラスに属していれば動作するのに対し、<code>Map.fromList :: Ord k =&gt; [(k, a)] -&gt; Map.Map k a</code> はなぜOrd制約を要求するのか?",
      code: `ghci&gt; :t Map.fromList
Map.fromList :: Ord k =&gt; [(k, a)] -&gt; Map.Map k a`,
      choices: [
        { text: "キーの一意性をOrdによって保証するため", isCorrect: false },
        { text: "内部実装が(平衡2分木のような構造で)キーの大小比較によって高速に探索を行うため", isCorrect: true },
        { text: "Data.Mapが値を大きい順にソートして表示する仕様のため", isCorrect: false },
        { text: "lookupの戻り値をMaybe型にするために必要な制約だから", isCorrect: false }
      ],
      explanation: "普通のリストによる連想リストは先頭から順に等値比較(Eq)するだけで探索できるが、Mapは高速な探索のためキーの大小関係(Ord)を利用した内部構造を持つため、Ord制約が必要になる。"
    },
    {
      id: "20260723-q3",
      question: "以下のコードで <code>Map.lookup \"grace\" phoneBook</code> の結果が <code>Nothing</code> になるとき、これはどのような挙動か?",
      code: `ghci&gt; :t Map.lookup
Map.lookup :: Ord k =&gt; k -&gt; Map.Map k a -&gt; Maybe a
ghci&gt; Map.lookup <span class="comment">"grace"</span> phoneBook
Nothing`,
      choices: [
        { text: "見つからない場合は例外を投げてプログラムが停止する", isCorrect: false },
        { text: "見つからない場合は空文字列などのデフォルト値を返す", isCorrect: false },
        { text: "Map.lookupはOrd k =&gt; k -&gt; Map.Map k a -&gt; Maybe aという型を持ち、見つからなければNothingを返すだけで、プログラムは正常に継続する", isCorrect: true },
        { text: "見つからない場合はIOアクションとして遅延評価され、後で例外が発生する", isCorrect: false }
      ],
      explanation: "Map.lookupはMaybe aを返すため、キーが存在しない場合でも例外を発生させずNothingという正常な値を返す。呼び出し側はcaseやmaybe関数でJust/Nothingを分岐処理する。"
    },
    {
      id: "20260723-q4",
      question: "以下のコードで <code>Map.lookup \"patsy\" $ phoneBookToMap phoneBook</code> の結果は <code>\"827-9162, 943-2929, 493-2928\"</code> となり、phoneBookリスト中でのpatsyの出現順(493-2928, 943-2929, 827-9162)とは逆順になる。この理由として正しいものはどれか?",
      code: `phoneBook =
    [(<span class="comment">"patsy"</span>, <span class="comment">"493-2928"</span>)
    ,(<span class="comment">"patsy"</span>, <span class="comment">"943-2929"</span>)
    ,(<span class="comment">"patsy"</span>, <span class="comment">"827-9162"</span>)]

phoneBookToMap :: (Ord k) =&gt; [(k, String)] -&gt; Map.Map k String
phoneBookToMap xs = Map.fromListWith add xs
    <span class="keyword">where</span> add number1 number2 = number1 ++ <span class="comment">", "</span> ++ number2`,
      choices: [
        { text: "Map.fromListWithは要素をアルファベット順にソートしてから結合するから", isCorrect: false },
        { text: "Map.fromListWithはリストを右(末尾)から処理していくから", isCorrect: false },
        { text: "addの中の++がリストの要素順を逆転させる副作用を持つから", isCorrect: false },
        { text: "同じキーが見つかるたびに結合関数を「add 新しい値 既存の値」の順で呼び出すため、後から処理された新しい値が先頭に積み上がっていくから", isCorrect: true }
      ],
      explanation: "Map.fromListWithはリストを先頭から順に処理し、既に同じキーがあれば insertWith が add 新しい値 既存の値 の順で結合関数を呼ぶ。addは第1引数(新しい値)を先頭にして連結するため、後から処理された値ほど先頭に積み上がり、結果は入力順とは逆順になる。"
    },
    {
      id: "20260723-q5",
      question: "以下のコードを実行して <code>intBook</code> を作ったとき、元のphoneBookのキー(名前の文字列)はどうなるか?",
      code: `string2digits :: String -&gt; [Int]
string2digits = map digitToInt . filter isDigit

ghci&gt; let intBook = Map.map string2digits phoneBook
ghci&gt; :t intBook
intBook :: Map.Map String [Int]`,
      choices: [
        { text: "キーもstring2digitsによって変換されようとしてコンパイルエラーになる", isCorrect: false },
        { text: "キーには影響しない。string2digitsが適用されるのは各キーに対応する値のみ", isCorrect: true },
        { text: "キーと値の両方が[Int]型に変換される", isCorrect: false },
        { text: "結果のMapではキーの順序が変わる", isCorrect: false }
      ],
      explanation: "Data.MapのmapはMapの各値にのみ関数を適用し、キーには触れない。そのためintBookの型はMap.Map String [Int]となり、キーの型Stringは変わらない。"
    },
    {
      id: "20260723-q6",
      question: "以下のコードで、値を <code>[v]</code> のように単一要素のリストにラップしてから <code>Map.fromListWith (++)</code> に渡している。もしラップせず <code>Map.fromListWith (++) xs</code> (xsの値の型はString)と直接書いた場合、何が問題になるか?",
      code: `phoneBookToMap :: (Ord k) =&gt; [(k, a)] -&gt; Map.Map k [a]
phoneBookToMap xs = Map.fromListWith (++) $ map (\\(k, v) -&gt; (k, [v])) xs`,
      choices: [
        { text: "(++)はString型には定義されていないため、型エラーになる", isCorrect: false },
        { text: "fromListWithは値がリスト型であることを型レベルで要求しているため、コンパイルが通らない", isCorrect: false },
        { text: "ラップしないと(++)が電話番号の文字列同士を直接連結してしまい、意図した「番号のリストへの追加」にならない(型エラーにはならず、挙動だけが変わる)", isCorrect: true },
        { text: "mapを省略するとキーの型がStringからCharに変わってしまう", isCorrect: false }
      ],
      explanation: "String は [Char] なので (++) は String 同士にもそのまま使え、型エラーにはならない。しかしラップしないと文字列同士がそのまま連結され「827-9162943-2929493-2928」のような文字の羅列になってしまう。[v]でラップしておくことで(++)がリストの要素として番号をつなげる意図通りの結合になる。"
    }
  ]
};
