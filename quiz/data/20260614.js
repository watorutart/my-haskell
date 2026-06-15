window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260614"] = {
  date: "20260614",
  title: "replicate'とtake'の再帰実装",
  questions: [
    {
      id: "20260614-q1",
      question: "<code>replicate'</code> の基底部で、パターン <code>replicate' 0 x = []</code> ではなくガード <code>| n &lt;= 0 = []</code> を使うのはなぜか?",
      code: `replicate' :: <span class="keyword">Int</span> -> a -> [a]
replicate' n x
    | n <= 0    = []
    | <span class="keyword">otherwise</span> = x : replicate' (n-1) x`,
      choices: [
        { text: "パターンマッチは型がIntのときだけ使えず、ガードが必須だから", isCorrect: false },
        { text: "ガードのほうがパターンより評価が速いから", isCorrect: false },
        { text: "パターンは数値リテラル0としかマッチせず、負の数を捕捉できないから", isCorrect: true },
        { text: "再帰関数の基底部はガードでしか書けない決まりだから", isCorrect: false }
      ],
      explanation: "<code>replicate' 0 x</code> は0ちょうどにしかマッチしない。負のnが渡されると基底部を素通りして無限再帰になる。<code>n &lt;= 0</code> のガードは0以下すべてを捕捉するため、負の入力も安全に空リストへ落とせる。"
    },
    {
      id: "20260614-q2",
      question: "<code>replicate' (-3) 'a'</code> の評価結果は?",
      code: `replicate' n x
    | n <= 0    = []
    | <span class="keyword">otherwise</span> = x : replicate' (n-1) x`,
      choices: [
        { text: "\"\"(空リスト)", isCorrect: true },
        { text: "\"aaa\"", isCorrect: false },
        { text: "実行時エラー(負の引数は不正)", isCorrect: false },
        { text: "無限ループ", isCorrect: false }
      ],
      explanation: "<code>-3 &lt;= 0</code> が真なので最初のガードが成立し、即座に <code>[]</code> を返す。otherwise節には進まないため再帰は起きない。"
    },
    {
      id: "20260614-q3",
      question: "<code>take'</code> で最初の式のガード <code>n &lt;= 0</code> が偽になったとき、何が起きるか?",
      code: `take' :: <span class="keyword">Int</span> -> [a] -> [a]
take' n _
    | n <= 0 = []
take' _ []       = []
take' n (x:xs)   = x : take' (n-1) xs`,
      choices: [
        { text: "その場で実行時エラーになる", isCorrect: false },
        { text: "暗黙にotherwiseとみなされ <code>[]</code> を返す", isCorrect: false },
        { text: "最初の式の引数 <code>_</code> に再束縛して再評価する", isCorrect: false },
        { text: "次の式(<code>take' _ []</code>以降)のパターンマッチへ進む", isCorrect: true }
      ],
      explanation: "1つの式のすべてのガードが偽になると、その式は不成立として次の式へフォールスルーする。otherwiseを書いていない最初の式は <code>n &lt;= 0</code> のときだけ成立し、それ以外は下の <code>take' _ []</code> / <code>take' n (x:xs)</code> が試される。"
    },
    {
      id: "20260614-q4",
      question: "<code>take' 2 []</code>(空リストから2要素取る)の結果は?",
      code: `take' n _
    | n <= 0 = []
take' _ []       = []
take' n (x:xs)   = x : take' (n-1) xs`,
      choices: [
        { text: "実行時エラー(空リストのheadを取れない)", isCorrect: false },
        { text: "[](2つ目の式 <code>take' _ []</code> にマッチ)", isCorrect: true },
        { text: "1つ目の式 <code>n &lt;= 0</code> にマッチして []", isCorrect: false },
        { text: "[undefined, undefined]", isCorrect: false }
      ],
      explanation: "<code>2 &lt;= 0</code> は偽なので最初の式は不成立。次の <code>take' _ []</code> が空リストにマッチして <code>[]</code> を返す。要素数が足りなくてもエラーにはならない。"
    },
    {
      id: "20260614-q5",
      question: "<code>take' n (x:xs) = x : take' (n-1) xs</code> という定義が表しているのは?",
      code: `take' n (x:xs) = x : take' (n-1) xs`,
      choices: [
        { text: "リスト全体からn番目の要素だけを取り出す", isCorrect: false },
        { text: "xsからn個取り出してから先頭xを捨てる", isCorrect: false },
        { text: "先頭xを結果に入れ、残りxsから n-1 個取った結果を後ろに連結する", isCorrect: true },
        { text: "nが尽きるまでxを複製して並べる", isCorrect: false }
      ],
      explanation: "リストからn個取る = 先頭1個(x)を確保し、残り(xs)から n-1 個取る、という分割統治。<code>:</code> でxを結果の先頭に積み、再帰でnを1ずつ減らして基底部に近づける。"
    }
  ]
};
