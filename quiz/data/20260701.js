window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260701"] = {
  date: "20260701",
  title: "takeWhile・コラッツ列・遅延評価と無限リスト",
  questions: [
    {
      id: "20260701-q1",
      question: "<code>takeWhile (/=' ') \"elephants know how to party\"</code> の結果はどれか?",
      code: `takeWhile (/=' ') "elephants know how to party"`,
      choices: [
        { text: "<code>\"elephants know how to party\"</code>（全体が返る）", isCorrect: false },
        { text: "<code>\"elephants\"</code>", isCorrect: true },
        { text: "<code>\" know how to party\"</code>", isCorrect: false },
        { text: "<code>\"e\"</code>（最初の1文字のみ）", isCorrect: false }
      ],
      explanation: "<code>takeWhile</code> は述語が True の間だけ先頭から要素を取り続け、False になった時点で停止する。<code>(/=' ')</code> は「スペースでない」という述語なので、最初のスペースの手前 <code>\"elephants\"</code> までが返る。"
    },
    {
      id: "20260701-q2",
      question: "<code>sum (takeWhile (&lt;10000) (filter odd (map (^2) [1..])))</code> で、<code>takeWhile</code> を省略したらどうなるか?",
      code: `<span class="comment">-- takeWhile あり</span>\nsum (takeWhile (<10000) (filter odd (map (^2) [1..])))\n\n<span class="comment">-- takeWhile なし</span>\nsum (filter odd (map (^2) [1..]))`,
      choices: [
        { text: "同じ結果になる。10000以上の奇数の2乗は自動的に除外される", isCorrect: false },
        { text: "エラーになる。sum は無限リストを引数に取れない", isCorrect: false },
        { text: "計算が終了しない。filter の結果が無限リストのため sum が永遠に足し続ける", isCorrect: true },
        { text: "0になる。無限リストの合計は発散するため0を返す", isCorrect: false }
      ],
      explanation: "<code>filter odd</code> は無限リストから奇数だけを取り出すが、結果も無限リスト。<code>sum</code> は全要素を足し終えるまで返らないため、計算が終了しない。<code>takeWhile</code> で有限個に打ち切ることで <code>sum</code> が完了する。"
    },
    {
      id: "20260701-q3",
      question: "<code>chain 10</code> の結果はどれか?",
      code: `chain :: Integer -> [Integer]\nchain 1 = [1]\nchain n\n    | even n = n : chain (n \`div\` 2)\n    | odd n  = n : chain (n * 3 + 1)`,
      choices: [
        { text: "<code>[10,5,16,8,4,2,1]</code>", isCorrect: true },
        { text: "<code>[10,5,1]</code>（直接1に到達する）", isCorrect: false },
        { text: "<code>[10,20,40,80,...]</code>（増加し続ける）", isCorrect: false },
        { text: "<code>[10,5,16,8,4,2]</code>（1を含まない）", isCorrect: false }
      ],
      explanation: "10は偶数 → <code>10 : chain 5</code>。5は奇数 → <code>5 : chain 16</code>。16→8→4→2と偶数が続き <code>div 2</code> され、最後に <code>chain 1 = [1]</code> で停止。基底部が <code>[1]</code> なので1は結果に含まれる。"
    },
    {
      id: "20260701-q4",
      question: "<code>largestDivisible = head (filter p [100000, 99999..])</code> が効率的に動作する理由は?",
      code: `largestDivisible :: Integer\nlargestDivisible = head (filter p [100000, 99999..])\n    <span class="keyword">where</span> p x = x \`mod\` 3829 == 0`,
      choices: [
        { text: "head が filter に「1要素だけ返せ」と指示するため", isCorrect: false },
        { text: "<code>[100000, 99999..]</code> が有限リストなので全要素を検査しても問題ない", isCorrect: false },
        { text: "filter が全要素を先に評価してからリストを返すが、降順なので最初の要素が最大", isCorrect: false },
        { text: "遅延評価により、filter は条件を満たす最初の要素を見つけた時点で停止する", isCorrect: true }
      ],
      explanation: "Haskellの遅延評価では、<code>head</code> が必要とするのは先頭の1要素だけ。<code>filter</code> は条件を満たす要素が見つかった時点でそれを返し、残りのリストは評価されない。<code>[100000, 99999..]</code> は無限リストだが、最初のマッチで計算が止まる。"
    },
    {
      id: "20260701-q5",
      question: "<code>numLongChains</code> が <code>Integer</code> ではなく <code>Int</code> を返すのはなぜか?",
      code: `numLongChains :: Int\nnumLongChains = length (filter isLong (map chain [1..100]))\n    <span class="keyword">where</span> isLong xs = length xs > 15`,
      choices: [
        { text: "<code>length</code> の戻り値が <code>Int</code> であるため", isCorrect: true },
        { text: "<code>chain</code> が <code>Integer</code> を返すので、自動的に <code>Int</code> に変換される", isCorrect: false },
        { text: "<code>filter</code> の結果がリストの長さに制限されるため", isCorrect: false },
        { text: "Haskellでは関数の戻り値はデフォルトで <code>Int</code> になるため", isCorrect: false }
      ],
      explanation: "<code>length</code> の型は <code>[a] -> Int</code> で、戻り値は <code>Int</code> 固定。<code>Integer</code>（任意精度整数）ではなくワードサイズの <code>Int</code> に制約される。汎用的な <code>Num a</code> 型にしたければ <code>fromIntegral</code> で変換する必要がある。"
    },
    {
      id: "20260701-q6",
      question: "<code>listOfFuns = map (*) [0..]</code> として <code>(listOfFuns !! 4) 5</code> の結果はどれか?",
      code: `listOfFuns = map (*) [0..]\n<span class="comment">-- listOfFuns = [(*0), (*1), (*2), (*3), (*4), ...]</span>\n\n(listOfFuns !! 4) 5`,
      choices: [
        { text: "<code>4</code>", isCorrect: false },
        { text: "<code>5</code>", isCorrect: false },
        { text: "<code>9</code>", isCorrect: false },
        { text: "<code>20</code>", isCorrect: true }
      ],
      explanation: "<code>map (*) [0..]</code> は <code>[(*0), (*1), (*2), (*3), (*4), ...]</code> という関数のリストを作る。<code>!!</code> はリストの n 番目（0始まり）を取り出す演算子。<code>listOfFuns !! 4</code> は <code>(*4)</code> で、<code>(*4) 5 = 4 * 5 = 20</code>。"
    }
  ]
};
