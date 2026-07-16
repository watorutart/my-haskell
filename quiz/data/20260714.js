window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260714"] = {
  date: "20260714",
  title: "foldlの遅延評価とスタックオーバーフロー",
  questions: [
    {
      id: "20260714-q1",
      question: "次のコードのように、大きなリストに対して <code>foldl</code> がスタックオーバーフローを起こすのはなぜか?",
      code: `<span class="comment">-- ghci&gt;</span> foldl (+) 0 (replicate 100000000 1)
<span class="comment">-- *** Exception: stack overflow</span>`,
      choices: [
        { text: "リスト全体を先にメモリ上へ展開してから畳み込むため", isCorrect: false },
        { text: "各ステップのアキュムレータの足し算が評価されずサンク(未評価の計算)として先延ばしにされ、蓄積されていくため", isCorrect: true },
        { text: "replicateがリストを逆順に生成し、余分なメモリを使うため", isCorrect: false },
        { text: "GHCがfoldlを末尾再帰として最適化できないため", isCorrect: false }
      ],
      explanation: "Haskellは遅延評価のため、foldlは各ステップでアキュムレータの計算(例: 0+1)を実行せず、そのまま式として保持する。リストを辿るたびにこの未評価の式(サンク)が積み重なり、大きなリストではメモリを消費してスタックオーバーフローになる。"
    },
    {
      id: "20260714-q2",
      question: "以下のトレースにおいて、<code>(((0 + 1) + 2) + 3)</code> の足し算が実際に計算されるのはどのタイミングか?",
      code: `foldl (+) 0 [1,2,3] =
foldl (+) (0 + 1) [2,3] =
foldl (+) ((0 + 1) + 2) [3] =
foldl (+) (((0 + 1) + 2) + 3) [] =
(((0 + 1) + 2) + 3) =
6`,
      choices: [
        { text: "最初の要素1を読み込んだ直後", isCorrect: false },
        { text: "各再帰呼び出しのたびに逐次", isCorrect: false },
        { text: "空リスト[]に到達し、foldlの再帰が終わった後", isCorrect: true },
        { text: "GHCの遅延評価では計算が行われず、常に0が返る", isCorrect: false }
      ],
      explanation: "foldlは再帰の各段階でアキュムレータの式を積み上げるだけで評価しない。リストの終端(空リスト)に到達して再帰が終わった時点で、初めて積み上がった式全体の計算が開始される。"
    },
    {
      id: "20260714-q3",
      question: "<code>Data.List</code> の <code>foldl'</code> は <code>foldl</code> と比べて何が違うか?",
      code: `foldl' (+) 0 [1,2,3] =
foldl' (+) 1 [2,3] =
foldl' (+) 3 [3] =
foldl' (+) 6 [] =
6`,
      choices: [
        { text: "各ステップでアキュムレータの計算を即座に評価し、サンクを蓄積させない", isCorrect: true },
        { text: "リストを末尾から先頭へ処理する", isCorrect: false },
        { text: "有限リストにしか使えない", isCorrect: false },
        { text: "計算量は同じだが返り値の型が異なる", isCorrect: false }
      ],
      explanation: "foldl'はステップごとにアキュムレータを正格(strict)に評価するため、foldlのようにサンクが積み上がらず、大きなリストでもスタックオーバーフローを起こしにくい。"
    },
    {
      id: "20260714-q4",
      question: "メモに登場した、遅延評価による問題を回避する「厳格版」の関数の組み合わせとして正しいものはどれか?",
      choices: [
        { text: "foldr と foldr'", isCorrect: false },
        { text: "map と map'", isCorrect: false },
        { text: "filter と filter'", isCorrect: false },
        { text: "foldl1 と foldl1'", isCorrect: true }
      ],
      explanation: "メモではfoldlに対するfoldl'に加え、foldl1に対しても同様の厳格版foldl1'が存在すると触れられている。"
    }
  ]
};
