window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260716"] = {
  date: "20260716",
  title: "digitToIntとfindによる桁和探索",
  questions: [
    {
      id: "20260716-q1",
      question: "<code>Data.Char.digitToInt</code> は '0'~'9' に加えて 'A'~'F'(小文字も可)を16進数の値として解釈する。<code>digitToInt 'a'</code> の結果はどれか?",
      code: `ghci&gt; <span class="keyword">import</span> Data.Char
ghci&gt; digitToInt 'a'`,
      choices: [
        { text: "9", isCorrect: false },
        { text: "例外が発生する。小文字は16進数として認識されないから", isCorrect: false },
        { text: "10", isCorrect: true },
        { text: "97('a'の文字コード)", isCorrect: false }
      ],
      explanation: "digitToIntは'0'~'9'を0~9に、'A'~'F'および'a'~'f'を10~15に変換する16進数用の関数。'a'は10に変換される。"
    },
    {
      id: "20260716-q2",
      question: "次の <code>digitSum</code> の定義で、<code>digitToInt</code> を適用する前に <code>show</code> を挟んでいるのはなぜか?",
      code: `digitSum :: Int -> Int
digitSum = sum . map digitToInt . show`,
      choices: [
        { text: "digitToIntはChar型しか受け取れないため、showでIntをCharのリスト(String)に変換してから各桁に適用している", isCorrect: true },
        { text: "showを挟むことで合計の計算が高速化されるため", isCorrect: false },
        { text: "mapは文字列にしか適用できない関数だから", isCorrect: false },
        { text: "sumはCharのリストの合計しか計算できないため", isCorrect: false }
      ],
      explanation: "digitToInt :: Char -> Int であり、Intを直接受け取れない。show でIntを文字列(Charのリスト)に変換し、mapでdigitToIntを各文字に適用することで各桁の数値リストを得ている。"
    },
    {
      id: "20260716-q3",
      question: "<code>find :: Foldable t =&gt; (a -&gt; Bool) -&gt; t a -&gt; Maybe a</code> の返り値が <code>a</code> ではなく <code>Maybe a</code> になっているのはなぜか?",
      code: `ghci&gt; :t find
find :: Foldable t => (a -> Bool) -> t a -> Maybe a`,
      choices: [
        { text: "リストの要素数を返す値と区別するため", isCorrect: false },
        { text: "Foldableのすべてのインスタンスに対応する必要があるため", isCorrect: false },
        { text: "検索結果を常にリストとして返す仕様のため", isCorrect: false },
        { text: "述語を満たす要素が見つからない可能性があるため。0個か1個の結果しか持たないMaybeで失敗の可能性を表現している", isCorrect: true }
      ],
      explanation: "findは条件に合う要素が存在するとは限らない。見つかればJust値、見つからなければNothingを返すことで、失敗する可能性のある処理をMaybe型で表現している。"
    },
    {
      id: "20260716-q4",
      question: "<code>firstTo40 = find (\\x -&gt; digitSum x == 40) [1..]</code> は無限リスト <code>[1..]</code> を引数にしているにもかかわらず、なぜ実行すると有限時間で結果が返るのか?",
      code: `firstTo40 :: Maybe Int
firstTo40 = find (\\x -> digitSum x == 40) [1..]`,
      choices: [
        { text: "Haskellが自動的にリストの上限を設定しているため", isCorrect: false },
        { text: "findは条件に合う最初の要素が見つかった時点で探索を打ち切るため、[1..]全体を評価する必要がない(遅延評価)", isCorrect: true },
        { text: "[1..]は実際にはコンパイル時に有限のリストに変換されるため", isCorrect: false },
        { text: "digitSumが内部でリストの長さを事前に計算しているため", isCorrect: false }
      ],
      explanation: "Haskellは遅延評価のため、[1..]は要求された分だけ要素が生成される。findは述語を満たす要素を見つけた時点で残りの評価を行わずに結果を返す。"
    },
    {
      id: "20260716-q5",
      question: "<code>digitSum = sum . map digitToInt . show</code> という定義で <code>digitSum (-5)</code> を評価すると何が起きるか?",
      code: `digitSum :: Int -> Int
digitSum = sum . map digitToInt . show

ghci> digitSum (-5)`,
      choices: [
        { text: "-5を返す", isCorrect: false },
        { text: "5を返す(絶対値として扱われる)", isCorrect: false },
        { text: "例外が発生する。show (-5) が \"-5\" となり、含まれる '-' はdigitToIntが扱える文字ではないため", isCorrect: true },
        { text: "0を返す", isCorrect: false }
      ],
      explanation: "show (-5) の結果は \"-5\" という文字列になる。digitToIntは'-'のような数字以外の文字を渡されると例外を投げるため、digitSumは負の数に対して失敗する。"
    }
  ]
};
