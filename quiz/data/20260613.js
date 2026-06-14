window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260613"] = {
  date: "20260613",
  title: "再帰と基底部",
  questions: [
    {
      id: "20260613-q1",
      question: "再帰関数における「基底部(base case)」の役割として正しいものはどれか?",
      code: `maximum' [x] = x                       <span class="comment">-- 基底部</span>
maximum' (x:xs) = max x (maximum' xs)  <span class="comment">-- 再帰部</span>`,
      choices: [
        { text: "再帰呼び出しを使わずに解を明示的に定義し、分解の終端となるケース", isCorrect: true },
        { text: "最初に必ず1回だけ評価される初期化用のケース", isCorrect: false },
        { text: "関数を高速化するためのキャッシュ用のケース", isCorrect: false },
        { text: "型検査を通すために形式的に必要なだけで、実行には影響しないケース", isCorrect: false }
      ],
      explanation: "基底部はこれ以上小さく分解できず、再帰を使わずに解を直接定義するケース。再帰がここで止まる。複数あってもよい(例: フィボナッチの F(0)=0, F(1)=1)。"
    },
    {
      id: "20260613-q2",
      question: "<code>maximum' (x:xs) = max x (maximum' xs)</code> のように、基底部に到達せず縮小もしない再帰を書くとどうなるか?",
      code: `loop (x:xs) = max x (loop (x:xs))  <span class="comment">-- xs ではなく (x:xs) を渡している</span>`,
      choices: [
        { text: "リストが空になるまで自動で要素が削られるので問題なく終わる", isCorrect: false },
        { text: "基底部に近づかず再帰が止まらない(無限ループ)", isCorrect: true },
        { text: "コンパイルエラーになり実行できない", isCorrect: false },
        { text: "1回だけ評価され、引数がそのまま返る", isCorrect: false }
      ],
      explanation: "再帰部は呼び出しのたびに基底部へ近づく(=より小さな部分問題に分解する)必要がある。引数を縮小せず同じ <code>(x:xs)</code> を渡すと基底部に到達せず停止しない。"
    },
    {
      id: "20260613-q3",
      question: "<code>maximum'</code> の等式の並び順が以下のとき、<code>maximum' [4]</code> はどの等式にマッチするか?",
      code: `maximum' [] = error <span class="comment">"maximum of empty list!"</span>
maximum' [x] = x
maximum' (x:xs) = max x (maximum' xs)`,
      choices: [
        { text: "2番目の <code>[x]</code>。上から順に試され、単一要素リストに最初に合致する", isCorrect: true },
        { text: "3番目の <code>(x:xs)</code>。<code>x=4, xs=[]</code> として分解される", isCorrect: false },
        { text: "1番目の <code>[]</code>。要素が1つなので空扱いになる", isCorrect: false },
        { text: "もっとも特殊な <code>[x]</code> が優先されるが、最後の等式も同時に評価される", isCorrect: false }
      ],
      explanation: "パターンは上から順に試され、最初に合致した等式だけが使われる。<code>[4]</code> は <code>[x]</code> に合致するのでそこで確定し、<code>(x:xs)</code> には到達しない。"
    },
    {
      id: "20260613-q4",
      question: "基底部 <code>maximum' [x] = x</code> を消して <code>maximum' (x:xs) = max x (maximum' xs)</code> だけにすると、<code>maximum' [4]</code> はどうなるか?",
      code: `maximum' [] = error <span class="comment">"maximum of empty list!"</span>
maximum' (x:xs) = max x (maximum' xs)`,
      choices: [
        { text: "<code>4</code> が返る。空リストの基底部だけで十分だから", isCorrect: false },
        { text: "ランタイムエラーになる。<code>maximum' []</code> に到達して error が呼ばれるため", isCorrect: true },
        { text: "コンパイルエラーになる。単一要素を扱う等式が無いため", isCorrect: false },
        { text: "無限ループになる", isCorrect: false }
      ],
      explanation: "<code>[4]</code> は <code>(x:xs)</code> で <code>x=4, xs=[]</code> に分解され、<code>max 4 (maximum' [])</code> を計算しようとする。<code>maximum' []</code> は error を呼ぶためランタイムエラーになる。<code>[x]</code> の基底部はこの空リストへの到達を止める役割を持つ。"
    },
    {
      id: "20260613-q5",
      question: "メモにある「Haskellは計算を**どうやってするか**ではなく、求めるものが**何であるか**を宣言する」という宣言的な考え方は、<code>maximum'</code> の定義にどう表れているか?",
      code: `maximum' [x] = x
maximum' (x:xs) = max x (maximum' xs)`,
      choices: [
        { text: "「最大値とは、先頭と残りの最大値のうち大きい方である」と関係を宣言している", isCorrect: true },
        { text: "ループ変数を更新しながら順に走査する手順を記述している", isCorrect: false },
        { text: "可変の変数に途中結果を代入して最大値を組み立てている", isCorrect: false },
        { text: "比較回数を明示的に数えて制御している", isCorrect: false }
      ],
      explanation: "命令型のように走査の手順を書くのではなく、「最大値とは何か」を <code>max x (maximum' xs)</code> という関係(部分問題の解との関係)として宣言している。これが宣言的・再帰的な定義のスタイル。"
    }
  ]
};
