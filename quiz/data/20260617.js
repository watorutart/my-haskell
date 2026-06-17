window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260617"] = {
  date: "20260617",
  title: "クイックソート・再帰の定石・内包表記=filter",
  questions: [
    {
      id: "20260617-q1",
      question: "<code>[a | a &lt;- xs, a &lt;= x]</code> のうち、<code>a &lt;= x</code> の部分はTypeScriptのどの操作に相当するか?",
      code: `smallerOrEqual = [a | a <- xs, a <= x]`,
      choices: [
        { text: "<code>map(a =&gt; a &lt;= x)</code>", isCorrect: false },
        { text: "<code>filter(a =&gt; a &lt;= x)</code>", isCorrect: true },
        { text: "<code>reduce((acc, a) =&gt; a &lt;= x)</code>", isCorrect: false },
        { text: "<code>sort((a, b) =&gt; a - b)</code>", isCorrect: false }
      ],
      explanation: "内包表記は <code>[ 変換 | 取り出し , 条件 ]</code> の構造。<code>,</code> のあとの述語 <code>a &lt;= x</code> は要素を絞り込む条件なのでfilterに相当する。"
    },
    {
      id: "20260617-q2",
      question: "内包表記 <code>[a*2 | a &lt;- xs, a &lt;= x]</code> 全体をTypeScriptで書くとどうなるか?",
      code: `[a*2 | a <- xs, a <= x]`,
      choices: [
        { text: "<code>xs.map(a =&gt; a*2).filter(a =&gt; a &lt;= x)</code>", isCorrect: false },
        { text: "<code>xs.map(a =&gt; a &lt;= x ? a*2 : a)</code>", isCorrect: false },
        { text: "<code>xs.filter(a =&gt; a &lt;= x).map(a =&gt; a*2)</code>", isCorrect: true },
        { text: "<code>xs.filter(a =&gt; a*2 &lt;= x)</code>", isCorrect: false }
      ],
      explanation: "先頭の式 <code>a*2</code> がmap(変換)、<code>,</code> 以降の <code>a &lt;= x</code> がfilter(絞り込み)。filterで絞ってからmapで変換する。selectorはmapより前のフィルタなので、filterに <code>*2</code> 後の値を渡してはいけない。"
    },
    {
      id: "20260617-q3",
      question: "<code>smallerOrEqual</code> の条件が <code>a &lt; x</code> ではなく <code>a &lt;= x</code> になっているのはなぜか?",
      code: `smallerOrEqual = [a | a <- xs, a <= x]
larger         = [a | a <- xs, a > x]`,
      choices: [
        { text: "ピボット <code>x</code> と等しい値の要素を取りこぼさず結果に含めるため", isCorrect: true },
        { text: "<code>&lt;</code> はOrd型クラスで使えず <code>&lt;=</code> しか使えないため", isCorrect: false },
        { text: "ソートを安定ソートにするための必須条件だから", isCorrect: false },
        { text: "<code>larger</code> 側を <code>a &gt;= x</code> にしているのと対称にするため", isCorrect: false }
      ],
      explanation: "<code>x</code> 自身は <code>[x]</code> として別に連結されるが、<code>xs</code> の中に <code>x</code> と同じ値があった場合、<code>a &lt; x</code> と <code>a &gt; x</code> の両方から漏れて消えてしまう。<code>&lt;=</code> にすることでその重複値を <code>smallerOrEqual</code> 側で拾える。"
    },
    {
      id: "20260617-q4",
      question: "ピボットに <code>(x:xs)</code> の先頭要素 <code>x</code> を使う主な理由はどれか?",
      code: `quicksort (x:xs) = ...`,
      choices: [
        { text: "先頭要素を選ぶと必ず計算量が最小になるから", isCorrect: false },
        { text: "先頭要素は配列の中央値である可能性が最も高いから", isCorrect: false },
        { text: "ピボットには先頭要素しか使えない言語仕様だから", isCorrect: false },
        { text: "パターンマッチ <code>(x:xs)</code> で簡単に取り出せるから。実際はどの要素でもよい", isCorrect: true }
      ],
      explanation: "ピボットはどの要素を選んでもアルゴリズムとして正しく動く。先頭を選ぶのは <code>(x:xs)</code> のパターンマッチで簡単に分解できるという実装上の都合にすぎない。"
    },
    {
      id: "20260617-q5",
      question: "<code>quicksort [] = []</code> の行を削除するとどうなるか?",
      code: `quicksort [] = []
quicksort (x:xs) = quicksort smaller ++ [x] ++ quicksort larger`,
      choices: [
        { text: "空リストを渡したときだけエラーになるが、非空リストは正常に動く", isCorrect: false },
        { text: "再帰の基底部が無くなり、空リストにパターンが一致せず再帰が終わらない", isCorrect: true },
        { text: "型エラーになりコンパイル自体が通らなくなる", isCorrect: false },
        { text: "何も変わらない。<code>(x:xs)</code> が空リストも処理できる", isCorrect: false }
      ],
      explanation: "<code>quicksort smaller</code> はいずれ空リストを引数に呼ばれる。<code>(x:xs)</code> は空リストにマッチしないため、基底部 <code>quicksort [] = []</code> が無いと処理が止まらず例外になる。基底部は再帰の停止条件。"
    },
    {
      id: "20260617-q6",
      question: "メモにある「再帰の定石」で、部分問題の解を正しく得たあと最後に行うことは何か?",
      code: `quicksort smallerOrEqual ++ [x] ++ quicksort larger`,
      choices: [
        { text: "部分問題をさらに細かく分割し直す", isCorrect: false },
        { text: "基底部をもう一度見極めて条件を更新する", isCorrect: false },
        { text: "部分問題の解を組み合わせて最終的な解を構築する", isCorrect: true },
        { text: "全要素を1つずつ走査して順序を検証する", isCorrect: false }
      ],
      explanation: "再帰の定石は「基底部 → 部分問題へ分割 → 再帰的に解く → 解を組み合わせて構築」。quicksortでは、ソート済みの <code>smallerOrEqual</code> と <code>larger</code> を <code>++ [x] ++</code> で連結して最終結果を作る。"
    }
  ]
};
