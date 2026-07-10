window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260708"] = {
  date: "20260708",
  title: "関数合成の書き換え手順と$の構造",
  questions: [
    {
      id: "20260708-q1",
      question: "<code>replicate</code>は2引数関数だが、なぜ <code>sum . replicate 5 $ max 6.7 8.9</code> のように <code>.</code> で <code>sum</code> と合成できるのか?",
      code: `sum (replicate 5 (max 6.7 8.9))
<span class="comment">-- 書き換え</span>
sum . replicate 5 $ max 6.7 8.9`,
      choices: [
        { text: "sumとreplicateはどちらも型シグネチャ上1引数関数だから", isCorrect: false },
        { text: "<code>.</code>は多引数関数同士でもそのまま合成できる演算子だから", isCorrect: false },
        { text: "<code>replicate 5</code>と5を先に部分適用した時点で1引数関数になり、合成可能な形になるから", isCorrect: true },
        { text: "<code>$</code>のおかげで多引数関数の合成が自動的に許可されるから", isCorrect: false }
      ],
      explanation: "<code>.</code>(関数合成)は1引数関数同士をつなぐ演算子。<code>replicate</code>は本来2引数関数だが、<code>replicate 5</code>のように部分適用すると残り1引数を取る関数になり、<code>sum</code>と合成できる。"
    },
    {
      id: "20260708-q2",
      question: "<code>sum . replicate 5 $ max 6.7 8.9</code> において <code>$</code> を使う目的として正しいのは?",
      choices: [
        { text: "<code>$</code>は最も低い優先順位を持つ演算子で、右辺全体をひとまとまりの引数として扱うことで括弧を省略できるようにするため", isCorrect: true },
        { text: "<code>$</code>は関数合成<code>.</code>の別名であり、まったく同じ意味を持つため", isCorrect: false },
        { text: "<code>$</code>を使うと関数の評価順序が左から右に変わるため", isCorrect: false },
        { text: "<code>$</code>は型注釈を省略するための記法だから", isCorrect: false }
      ],
      explanation: "<code>$</code>は最低優先順位・右結合の関数適用演算子。<code>f $ x</code>は<code>f x</code>と同じ意味だが、右側に続く式全体を1つの引数としてまとめられるため括弧を減らせる。"
    },
    {
      id: "20260708-q3",
      question: "<code>sum . replicate 5 $ max 6.7 8.9</code> の構文的なまとまりとして正しいのは?",
      choices: [
        { text: "<code>sum . (replicate 5 $ max 6.7 8.9)</code>、つまり<code>.</code>より先に<code>$</code>側がまとまる", isCorrect: false },
        { text: "<code>(sum . replicate) (5 $ max 6.7 8.9)</code>という構造になる", isCorrect: false },
        { text: "<code>sum</code>と<code>replicate</code>がそれぞれ独立に<code>max 6.7 8.9</code>に適用される", isCorrect: false },
        { text: "<code>(sum . replicate 5) (max 6.7 8.9)</code>と同じ構造になる。<code>$</code>の右側<code>max 6.7 8.9</code>がひとまとめの引数として、左側の合成関数<code>sum . replicate 5</code>に渡される", isCorrect: true }
      ],
      explanation: "<code>$</code>は優先順位が最も低く右結合なので、<code>sum . replicate 5 $ max 6.7 8.9</code>は<code>(sum . replicate 5) $ (max 6.7 8.9)</code>、すなわち<code>(sum . replicate 5) (max 6.7 8.9)</code>と同じ構造に解釈される。"
    },
    {
      id: "20260708-q4",
      question: "括弧だらけの式を関数合成で書き直す手順では、まず「一番内側(右端)の関数とその引数」から特定する。この順序で始める理由として正しいのは?",
      code: `<span class="comment">-- 1: 右端 zipWith max [1,2] [4,5]</span>
<span class="comment">-- 2: map (*3) $ zipWith max [1,2] [4,5]</span>
<span class="comment">-- 3: product . map (*3) $ zipWith max [1,2] [4,5]</span>
<span class="comment">-- 4: replicate 2 . product . map (*3) $ zipWith max [1,2] [4,5]</span>`,
      choices: [
        { text: "Haskellの関数はすべて右から左に評価されるため、右端から書き始めないと構文エラーになるから", isCorrect: false },
        { text: "<code>.</code>による合成は右から左に適用される(実際に最初に呼ばれるのが一番右の関数)ため、右→左の順で組み立てると元の式との対応がわかりやすいから", isCorrect: true },
        { text: "一番右の関数だけは<code>$</code>を使わずに書けないという文法上の制約があるから", isCorrect: false },
        { text: "左端の関数から書き始めると型エラーになるため、必ず右端から書く必要があるから", isCorrect: false }
      ],
      explanation: "<code>f . g . h</code>は<code>f (g (h x))</code>と同じで、実際に最初に適用されるのは一番右の<code>h</code>。合成の並びと適用順序(右→左)が対応しているため、内側=右端の関数から特定していくと元の式との対応を追いやすい。"
    }
  ]
};
