window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260712"] = {
  date: "20260712",
  title: "tails・isPrefixOf・any・isInfixOfで探す部分リスト",
  questions: [
    {
      id: "20260712-q1",
      question: "<code>tails</code> 関数を <code>\"cat\"</code> に適用した結果として正しいものはどれか?",
      code: `ghci> tails "cat"`,
      choices: [
        { text: `["cat","at","t"]`, isCorrect: false },
        { text: `["cat","at","t",""]`, isCorrect: true },
        { text: `["","cat","at","t"]`, isCorrect: false },
        { text: `["cat","ca","c",""]`, isCorrect: false }
      ],
      explanation: "tailsは元のリストに<code>tail</code>関数を再帰的に適用した結果を並べたリストを返し、最後に空リストを含む。先頭から1要素ずつ削っていくため \"cat\" → \"at\" → \"t\" → \"\" となる。"
    },
    {
      id: "20260712-q2",
      question: "<code>\"\" \`isPrefixOf\` \"hello\"</code> を評価するとどうなるか?",
      choices: [
        { text: "True。空リストはどんなリストに対しても前方一致すると判定される", isCorrect: true },
        { text: "False。空文字列は比較対象として無効なため", isCorrect: false },
        { text: "True。ただし2つのリストの長さが等しい場合に限られる", isCorrect: false },
        { text: "実行時エラーになる。空リストとの比較はサポートされていない", isCorrect: false }
      ],
      explanation: "isPrefixOfは1つ目のリストの要素を先頭から順に2つ目のリストと比較していく。1つ目が空リストなら比較すべき要素がそもそも存在しないため、常にTrueになる。"
    },
    {
      id: "20260712-q3",
      question: "<code>any (==3) [1..]</code>(無限リスト)を評価すると何が起こるか?",
      choices: [
        { text: "停止せず無限ループする。anyはリスト全体を評価してから判定するため", isCorrect: false },
        { text: "停止するがFalseを返す。3は無限リストの途中にしか出現しないため判定できない", isCorrect: false },
        { text: "停止してTrueを返す。3が見つかった時点で残りの要素を評価せずに判定を終える", isCorrect: true },
        { text: "型エラーになる。anyは有限リストにしか適用できない", isCorrect: false }
      ],
      explanation: "anyは述語を満たす要素が見つかった時点でTrueを返し、それ以降の要素を評価しない(遅延評価による短絡)。そのため無限リストでも、述語を満たす要素が有限の位置にあれば停止する。"
    },
    {
      id: "20260712-q4",
      question: "以下の<code>isIn</code>の実装で、<code>isPrefixOf</code>を単独で使わず<code>tails</code>と組み合わせているのはなぜか?",
      code: `<span class="keyword">import</span> Data.List

isIn :: (Eq a) => [a] -> [a] -> Bool
needle \`isIn\` haystack = any (needle \`isPrefixOf\`) (tails haystack)`,
      choices: [
        { text: "isPrefixOfは大文字・小文字を区別しないため、tailsで補正する必要がある", isCorrect: false },
        { text: "isPrefixOfはneedleとhaystackの長さが一致する場合しか使えないため", isCorrect: false },
        { text: "tailsを使わないとGHCの型推論が失敗するため", isCorrect: false },
        { text: "isPrefixOfはリストの先頭からの一致しか判定できないため、tailsでhaystackの全ての開始位置からの部分リストを作り、途中から始まる一致も判定できるようにしている", isCorrect: true }
      ],
      explanation: "isPrefixOfは「先頭から」の一致しか調べられない。haystackの途中にneedleが現れるケースを判定するには、tailsで全ての開始位置からの部分リストを生成し、それぞれについてisPrefixOfを試す必要がある。"
    },
    {
      id: "20260712-q5",
      question: "<code>\"art\" \`isPrefixOf\` \"party\"</code> と <code>\"art\" \`isInfixOf\` \"party\"</code> の結果の組み合わせとして正しいものはどれか?",
      choices: [
        { text: "両方True", isCorrect: false },
        { text: "isPrefixOfはFalse、isInfixOfはTrue", isCorrect: true },
        { text: "両方False", isCorrect: false },
        { text: "isPrefixOfはTrue、isInfixOfはFalse", isCorrect: false }
      ],
      explanation: "\"party\"は\"art\"で始まっていないためisPrefixOfはFalse。一方\"party\"の内部に\"art\"という並びが含まれるため(p-art-y)、isInfixOfはTrueになる。"
    }
  ]
};
