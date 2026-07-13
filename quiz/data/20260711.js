window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260711"] = {
  date: "20260711",
  title: "words・group・sortによる単語カウント",
  questions: [
    {
      id: "20260711-q1",
      question: "<code>words</code> 関数に単語間の空白が2個以上連続する文字列を渡すと、結果のリストはどうなるか?",
      code: `<span class="keyword">import</span> Data.List

ghci> words "hey these           are    the words in this sentence"`,
      choices: [
        { text: "連続する空白は1つの区切りとして扱われ、空文字列は含まれず単語だけのリストになる", isCorrect: true },
        { text: "空白の数だけ空文字列 <code>\"\"</code> が要素として挟まる", isCorrect: false },
        { text: "空白が2個以上連続する箇所でエラーになる", isCorrect: false },
        { text: "最初の単語と最後の単語しか取得できない", isCorrect: false }
      ],
      explanation: "<code>words</code> は連続する空白をまとめて1つの区切りとして扱うため、空白の個数に関係なく単語だけのリストが得られる。空文字列が混ざることはない。"
    },
    {
      id: "20260711-q2",
      question: "<code>group [1,1,2,2,1,1,3,3]</code> の結果として正しいものはどれか?",
      code: `<span class="keyword">import</span> Data.List

ghci> group [1,1,2,2,1,1,3,3]`,
      choices: [
        { text: "<code>[[1,1,1,1],[2,2],[3,3]]</code>(値が同じ1はすべて1つのグループにまとまる)", isCorrect: false },
        { text: "<code>[[1,1],[2,2],[1,1],[3,3]]</code>(隣接する同じ値だけがグループになる)", isCorrect: true },
        { text: "<code>[[1],[1],[2],[2],[1],[1],[3],[3]]</code>(すべての要素がバラバラのグループになる)", isCorrect: false },
        { text: "<code>[1,2,1,3]</code>(重複が単純に除去される)", isCorrect: false }
      ],
      explanation: "<code>group</code> はリスト全体で同じ値をまとめるのではなく、隣接する同じ値の並びだけをグループ化する。そのため <code>1</code> が離れた位置に2回現れると別グループになる。"
    },
    {
      id: "20260711-q3",
      question: "<code>wordNums = map (\\\\ws -> (head ws, length ws)) . group . sort . words</code> において、<code>group</code> の前に <code>sort</code> を呼んでいる理由として最も適切なものはどれか?",
      code: `<span class="keyword">import</span> Data.List

wordNums :: String -> [(String,Int)]
wordNums = map (\\ws -> (head ws, length ws)) . group . sort . words`,
      choices: [
        { text: "sort をしないと group がエラーで停止してしまうから", isCorrect: false },
        { text: "出力結果をアルファベット順に見やすく整形したいだけで、正しさには影響しない", isCorrect: false },
        { text: "group は隣接する同じ要素しかグループ化しないため、同じ単語を隣接させておく必要があるから", isCorrect: true },
        { text: "sort によって重複した単語そのものを削除しているから", isCorrect: false }
      ],
      explanation: "group は隣接要素しか比較しないため、同じ単語が離れた位置に出現するとそのままではまとめられない。sort で同じ単語を隣接させることで、group が正しく1つの単語ごとにグループ化できるようになる。"
    },
    {
      id: "20260711-q4",
      question: "<code>wordNums = map (\\\\ws -> (head ws, length ws)) . group . sort . words</code> というポイントフリー定義に文字列を渡したとき、最初に適用される関数はどれか?",
      code: `<span class="keyword">import</span> Data.List

wordNums :: String -> [(String,Int)]
wordNums = map (\\ws -> (head ws, length ws)) . group . sort . words`,
      choices: [
        { text: "map (\\ws -> (head ws, length ws))", isCorrect: false },
        { text: "group", isCorrect: false },
        { text: "sort", isCorrect: false },
        { text: "words(<code>.</code> で連結された関数は右側から先に適用される)", isCorrect: true }
      ],
      explanation: "<code>.</code> による関数合成は右から左へ適用される。<code>f . g . h</code> に引数を渡すと、まず <code>h</code>、次に <code>g</code>、最後に <code>f</code> の順で評価されるため、最初に適用されるのは一番右の <code>words</code>。"
    },
    {
      id: "20260711-q5",
      question: "<code>map (\\ws -> (head ws, length ws)) . group . sort . words</code> のラムダ式内で、グループ <code>ws</code> の代表値として <code>head ws</code>(先頭の1要素)を使っても単語の値として問題ない理由は何か?",
      code: `<span class="keyword">import</span> Data.List

wordNums :: String -> [(String,Int)]
wordNums = map (\\ws -> (head ws, length ws)) . group . sort . words`,
      choices: [
        { text: "sort . group を経た各グループ ws は同じ単語だけで構成されているため、先頭も他の要素も同じ値だから", isCorrect: true },
        { text: "head は空リストに対しても安全に動作する関数だから", isCorrect: false },
        { text: "words の出力する単語は必ず1文字以上なので、先頭文字だけで単語全体を表せるから", isCorrect: false },
        { text: "group が各グループの先頭要素だけを残す仕様だから", isCorrect: false }
      ],
      explanation: "sort によって同じ単語が隣接し、group によって同じ単語だけの部分リストにまとめられているため、グループ内の全要素は同じ文字列になっている。したがって先頭要素 <code>head ws</code> を取り出せばそのグループの単語を代表できる。"
    }
  ]
};
