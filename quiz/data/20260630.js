window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260630"] = {
  date: "20260630",
  title: "map・filterの実装とquicksortへの応用",
  questions: [
    {
      id: "20260630-q1",
      question: "<code>map (replicate 3) [3..6]</code> の結果はどれか?",
      code: `<span class="keyword">map</span> :: (a -> b) -> [a] -> [b]\n\nmap (replicate 3) [3..6]`,
      choices: [
        { text: "<code>[3,3,3,4,4,4,5,5,5,6,6,6]</code>（平坦化される）", isCorrect: false },
        { text: "<code>[9,12,15,18]</code>（replicate は掛け算）", isCorrect: false },
        { text: "<code>[[3,3,3],[4,4,4],[5,5,5],[6,6,6]]</code>", isCorrect: true },
        { text: "<code>[[3,4,5,6],[3,4,5,6],[3,4,5,6]]</code>", isCorrect: false }
      ],
      explanation: "<code>replicate 3</code> は部分適用で「引数を3つ並べたリストを作る関数」。map は各要素に独立して適用するため、<code>replicate 3 3</code> → <code>[3,3,3]</code>、<code>replicate 3 4</code> → <code>[4,4,4]</code>、... とリストのリストになる。平坦化はされない。"
    },
    {
      id: "20260630-q2",
      question: "<code>map (map (^2)) [[1,2],[3,4,5,6],[7,8]]</code> の結果はどれか?",
      code: `map (map (^2)) [[1,2],[3,4,5,6],[7,8]]`,
      choices: [
        { text: "<code>[[1,4],[9,16,25,36],[49,64]]</code>", isCorrect: true },
        { text: "<code>[1,4,9,16,25,36,49,64]</code>（平坦化される）", isCorrect: false },
        { text: "<code>[[1,2],[9,16,25,36],[49,64]]</code>（最初のサブリストは変化しない）", isCorrect: false },
        { text: "型エラー。map の引数に map を渡せない", isCorrect: false }
      ],
      explanation: "外側の map が各サブリストに <code>map (^2)</code> を適用する。<code>map (^2) [1,2]</code> → <code>[1,4]</code>、<code>map (^2) [3,4,5,6]</code> → <code>[9,16,25,36]</code>、<code>map (^2) [7,8]</code> → <code>[49,64]</code>。map の型 <code>(a -> b)</code> の a にリストが入るだけで型は合う。"
    },
    {
      id: "20260630-q3",
      question: "<code>filter'</code> の実装で、ガードの <code>otherwise = filter' p xs</code> はどういう処理か?",
      code: `filter' p (x:xs)\n    | p x       = x : filter' p xs\n    | otherwise = filter' p xs`,
      choices: [
        { text: "再帰を停止して空リストを返す", isCorrect: false },
        { text: "述語 p を満たさない x を結果に含めず、残りの xs に対して再帰する", isCorrect: true },
        { text: "x の否定を結果の末尾に追加する", isCorrect: false },
        { text: "xs 全体をそのまま結果として返す", isCorrect: false }
      ],
      explanation: "<code>p x</code> が False のとき otherwise 節に入る。<code>x :</code> がないため x は結果に含まれず、残りの <code>xs</code> だけを再帰処理する。p を満たす場合の <code>x : filter' p xs</code> との違いは先頭に <code>x</code> を付けるかどうかだけ。"
    },
    {
      id: "20260630-q4",
      question: "<code>filter (&lt;15) (filter even [1..20])</code> の適用順序を逆にして <code>filter even (filter (&lt;15) [1..20])</code> にした場合、結果はどうなるか?",
      code: `filter (<15) (filter even [1..20])\n<span class="comment">-- vs</span>\nfilter even (filter (<15) [1..20])`,
      choices: [
        { text: "前者は <code>[2,4,...,14]</code> だが、後者は <code>[2,4,...,20]</code> になる", isCorrect: false },
        { text: "後者はエラーになる。filter の入れ子は順序に制約がある", isCorrect: false },
        { text: "前者は偶数を先に絞るため、後者より要素が少なくなる", isCorrect: false },
        { text: "同じ結果 <code>[2,4,6,8,10,12,14]</code> になる。両条件を満たす要素は順序に依存しない", isCorrect: true }
      ],
      explanation: "どちらの順序でも「偶数かつ15未満」の要素だけが残る。中間リストの大きさは異なるが、最終結果に含まれるのは両方の条件を同時に満たす要素だけなので同じ結果になる。"
    },
    {
      id: "20260630-q5",
      question: "filter 版 quicksort の定義で、ピボット <code>x</code> はどこに配置されるか?",
      code: `quicksort (x:xs) =\n    <span class="keyword">let</span> smallerOrEqual = filter (<= x) xs\n        larger = filter (> x) xs\n    <span class="keyword">in</span> quicksort smallerOrEqual ++ [x] ++ quicksort larger`,
      choices: [
        { text: "<code>filter (&lt;= x) xs</code> の結果に含まれる", isCorrect: false },
        { text: "<code>[x]</code> として、小さい側と大きい側の再帰結果の間に独立して配置される", isCorrect: true },
        { text: "<code>filter (&gt; x) xs</code> の結果に含まれる", isCorrect: false },
        { text: "再帰のたびに両方のパーティションに複製される", isCorrect: false }
      ],
      explanation: "パターンマッチ <code>(x:xs)</code> でピボット <code>x</code> は先頭要素として分離済み。filter は <code>xs</code>（残りの要素）に対して行われるため、ピボット自身は filter の対象外。結果は <code>quicksort smallerOrEqual ++ [x] ++ quicksort larger</code> で、<code>[x]</code> が中間に配置される。"
    },
    {
      id: "20260630-q6",
      question: "<code>filter (&lt;15) (filter even [1..20])</code> と同じ結果をリスト内包表記で書くとどれか?",
      code: `filter (<15) (filter even [1..20])\n<span class="comment">-- 結果: [2,4,6,8,10,12,14]</span>`,
      choices: [
        { text: "<code>[x | x &lt;- [1..20], even x || x &lt; 15]</code>", isCorrect: false },
        { text: "<code>[x | x &lt;- [1..20], x &lt; 15] ++ [x | x &lt;- [1..20], even x]</code>", isCorrect: false },
        { text: "<code>[even x | x &lt;- [1..20], x &lt; 15]</code>", isCorrect: false },
        { text: "<code>[x | x &lt;- [1..20], x &lt; 15, even x]</code>", isCorrect: true }
      ],
      explanation: "リスト内包表記のカンマ区切りの述語は AND 条件。<code>x &lt; 15, even x</code> は「15未満かつ偶数」。選択肢Aの <code>||</code> は OR で条件が広がる。選択肢Cの <code>even x</code> は出力式に置かれているため <code>[Bool]</code> 型になり、元の <code>[Int]</code> とは異なる。"
    }
  ]
};
