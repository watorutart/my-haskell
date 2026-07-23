window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260717"] = {
  date: "20260717",
  title: "連想リストとfoldrによるfindKeyの実装",
  questions: [
    {
      id: "20260717-q1",
      question: "電話帳のような「キーと値のペア」を管理したいとき、順序を気にしないデータ構造として連想リストを使う理由として最も適切なものはどれか?",
      code: `phoneBook =
    [("betty", "555-2938")
    ,("bonnie", "452-2928")
    ,("patsy", "493-2928")
    ]`,
      choices: [
        { text: "タプルのリストとして表現でき、キーで値を取り出す操作が自然に書けるから", isCorrect: true },
        { text: "リストよりも検索速度が理論的に高速だから", isCorrect: false },
        { text: "Haskellでは通常のリストにキーを設定できないため、専用の型が必要だから", isCorrect: false },
        { text: "連想リストは自動的に重複キーを排除してくれるから", isCorrect: false }
      ],
      explanation: "連想リストは <code>(k, v)</code> のタプルを並べただけのリストであり、特別な型ではない。検索は先頭から順に比較するため計算量はO(n)で、重複キーの排除もされない。"
    },
    {
      id: "20260717-q2",
      question: "<code>findKey :: (Eq k) => k -> [(k, v)] -> Maybe v</code> という型シグネチャで、キーの型 <code>k</code> に <code>Eq</code> 制約が必要な理由は?",
      code: `findKey :: (Eq k) => k -> [(k, v)] -> Maybe v
findKey key xs = foldr (\\(k, v) acc -> <span class="keyword">if</span> key == k <span class="keyword">then</span> Just v <span class="keyword">else</span> acc) Nothing xs`,
      choices: [
        { text: "Show制約がないと出力できないから", isCorrect: false },
        { text: "実装内で <code>key == k</code> と等価判定を行っているため", isCorrect: true },
        { text: "Ord制約でないと比較できないから", isCorrect: false },
        { text: "Haskellの型システムでは全ての多相関数にEq制約が自動で要求されるため", isCorrect: false }
      ],
      explanation: "<code>==</code> 演算子を使うにはその型が <code>Eq</code> クラスのインスタンスである必要があるため、型シグネチャにも <code>(Eq k) =></code> という制約を明示する。大小比較(<code>Ord</code>)は使っていない。"
    },
    {
      id: "20260717-q3",
      question: "以下のリストに対して <code>findKey \"betty\" xs</code> を呼んだ場合、返る値はどれか?",
      code: `xs = [("betty", "111-1111"), ("betty", "555-2938"), ("bonnie", "452-2928")]

findKey key xs = foldr (\\(k, v) acc -> <span class="keyword">if</span> key == k <span class="keyword">then</span> Just v <span class="keyword">else</span> acc) Nothing xs`,
      choices: [
        { text: "Just \"555-2938\"(末尾に近い一致が優先される)", isCorrect: false },
        { text: "リストの全要素が一致するまで再帰するため、実行時エラーになる", isCorrect: false },
        { text: "Just \"111-1111\"(先頭の一致が優先される)", isCorrect: true },
        { text: "曖昧な結果のためNothingが返る", isCorrect: false }
      ],
      explanation: "<code>foldr f z (x:xs) = f x (foldr f z xs)</code> であり、<code>if key == k then Just v else acc</code> は条件が真ならaccを評価せずに <code>Just v</code> を返す。そのためリストの先頭から見て最初に一致した要素の値が返り、末尾側の一致は評価すらされない。"
    },
    {
      id: "20260717-q4",
      question: "findKeyの戻り値の型が <code>v</code> ではなく <code>Maybe v</code> になっているのはなぜか?",
      code: `findKey :: (Eq k) => k -> [(k, v)] -> Maybe v
findKey key xs = foldr (\\(k, v) acc -> <span class="keyword">if</span> key == k <span class="keyword">then</span> Just v <span class="keyword">else</span> acc) Nothing xs`,
      choices: [
        { text: "キーが複数存在する場合に全ての値をまとめて返すため", isCorrect: false },
        { text: "パフォーマンス向上のため、値を遅延評価でラップする必要があるため", isCorrect: false },
        { text: "タプルの2要素目の型が常にMaybe型で定義されているため", isCorrect: false },
        { text: "探索対象のキーがリストに存在しない場合を型で表現するため", isCorrect: true }
      ],
      explanation: "リストの末尾まで一致するキーが見つからなければ、<code>foldr</code> の初期値である <code>Nothing</code> がそのまま返る。「見つからない」という状態を例外ではなく型として表現するのがMaybeの役割。"
    },
    {
      id: "20260717-q5",
      question: "<code>foldr</code> の代わりに <code>foldl</code> を使って以下のように書き換えた場合、重複キーを含むリストでの結果はfoldr版とどう変わるか?",
      code: `xs = [("betty", "111-1111"), ("betty", "555-2938")]

findKey' key xs = foldl (\\acc (k, v) -> <span class="keyword">if</span> key == k <span class="keyword">then</span> Just v <span class="keyword">else</span> acc) Nothing xs`,
      choices: [
        { text: "foldlは左から右へ再帰しつつaccを都度上書きするため、リスト中で最後に一致したキーの値が返るようになる", isCorrect: true },
        { text: "foldlは常に例外を投げるため比較できない", isCorrect: false },
        { text: "foldlとfoldrは可換なので、結果はfoldr版とまったく同じで変わらない", isCorrect: false },
        { text: "foldlは無限リストに対応しているため、より効率的な結果になる", isCorrect: false }
      ],
      explanation: "<code>foldl</code> は <code>foldl f (f z x) xs</code> という形で左から順にaccを更新していく。一致するたびにaccが上書きされるため、最終的にリスト中で最後に一致した要素の値が残る。foldr版(先頭優先)とは逆の挙動になる。"
    }
  ]
};
