window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260710"] = {
  date: "20260710",
  title: "モジュールのインポートとポイントフリースタイル",
  questions: [
    {
      id: "20260710-q1",
      question: "<code>numUniques :: (Eq a) => [a] -> Int</code> の実装が <code>numUniques = length . nub</code> のように引数xsを書かずに定義できるのはなぜか?",
      code: `numUniques :: (Eq a) => [a] -> Int
numUniques = length . nub`,
      choices: [
        { text: "length . nub が返す値がInt型のリストになるため", isCorrect: false },
        { text: "length . nub は関数合成によって [a] -> Int 型の関数そのものを表すため、xsの記述を省略できる(ポイントフリースタイル)", isCorrect: true },
        { text: "関数合成<code>.</code>は左右の関数の引数リストを結合し、xsを自動的に補うため", isCorrect: false },
        { text: "Haskellでは全ての関数が自動カリー化されるため、引数の有無に関係なく同じ意味になる", isCorrect: false }
      ],
      explanation: "<code>.</code>は関数合成演算子で、<code>length . nub</code>は<code>[a] -> Int</code>という型を持つ関数値そのものを表す。型シグネチャと一致するため引数xsを明示せずに定義できる(ポイントフリースタイル)。カリー化は多引数関数の部分適用を可能にする性質であり、引数省略の直接の理由ではない。"
    },
    {
      id: "20260710-q2",
      question: "<code>nub</code>関数の型が <code>nub :: (Eq a) => [a] -> [a]</code> のように<code>Eq</code>制約を持つのはなぜか?",
      code: `import Data.List

nub :: (Eq a) => [a] -> [a]`,
      choices: [
        { text: "リストをソートしてから重複を取り除くため、Ord制約が必要", isCorrect: false },
        { text: "リストの長さを数える処理を含むため", isCorrect: false },
        { text: "GHCの内部実装上、全ての標準ライブラリ関数に一律でEq制約がついている", isCorrect: false },
        { text: "要素同士が等しいかどうかを比較して重複を判定するため、Eq制約が必要", isCorrect: true }
      ],
      explanation: "nubは要素を1つずつ既出のリストと比較して重複を除去するため、要素の等価性判定(==)が必要になる。そのためEq制約が課される。ソートは行わないためOrd制約は不要。"
    },
    {
      id: "20260710-q3",
      question: "Haskellのソースファイルで、import文をある関数定義よりも後ろに書くとどうなるか?",
      code: `numUniques :: (Eq a) => [a] -> Int
numUniques = length . nub

import Data.List <span class="comment">-- 関数定義の後ろに書いた</span>`,
      choices: [
        { text: "モジュール全体が正しくコンパイルされない(構文エラーになる)", isCorrect: true },
        { text: "importより前に定義された関数だけがインポートの効果を受けなくなる", isCorrect: false },
        { text: "実行時に警告が出るだけで、プログラムは動作する", isCorrect: false },
        { text: "GHCが自動的にimport文をファイル先頭に並べ替えて解決する", isCorrect: false }
      ],
      explanation: "Haskellのソースファイルでは、import文は全ての関数定義よりも前に書く必要があるという構文規則があり、違反すると構文エラーになりコンパイルできない。"
    },
    {
      id: "20260710-q4",
      question: "<code>import Data.List hiding (nub)</code> と書いた場合の動作として正しいものは?",
      code: `import Data.List hiding (nub)`,
      choices: [
        { text: "Data.Listモジュール全体のインポートを取りやめる", isCorrect: false },
        { text: "Data.Listのnub関数だけをインポートする", isCorrect: false },
        { text: "Data.Listのnub以外の全ての関数・型をインポートする", isCorrect: true },
        { text: "Data.Listをインポートした上で、nubを自分で再定義することを強制する", isCorrect: false }
      ],
      explanation: "<code>hiding (関数名)</code>は、指定した関数だけをインポート対象から除外し、それ以外はすべて通常通りインポートする構文。"
    },
    {
      id: "20260710-q5",
      question: "<code>import qualified Data.Map as M</code> とした後に <code>M.filter ...</code> と書いたとき、この<code>.</code>が関数合成演算子の<code>.</code>と混同されないのはなぜか?",
      code: `import qualified Data.Map as M

<span class="comment">-- 修飾付きアクセス</span>
M.filter ...
<span class="comment">-- 関数合成</span>
f . g`,
      choices: [
        { text: "モジュール名の直後にスペースなしで続く<code>.</code>は修飾名の一部として、前後にスペースを置く<code>.</code>は演算子として構文的に区別されるため", isCorrect: true },
        { text: "GHCが型推論の結果から実行時に自動判別するため", isCorrect: false },
        { text: "修飾付きインポートした関数は必ず大文字で始まるため、名前だけで区別できる", isCorrect: false },
        { text: "実際には区別されておらず、名前が衝突した場合は常にコンパイルエラーになる", isCorrect: false }
      ],
      explanation: "<code>M.filter</code>のようにモジュール名の直後にスペースなしで続く<code>.</code>は修飾名の一部として字句解析され、<code>f . g</code>のように前後にスペースを置いた<code>.</code>は関数合成演算子として扱われる。"
    },
    {
      id: "20260710-q6",
      question: "Data.ListとData.Mapの2つのモジュールをソースファイルでインポートしたいとき、正しい書き方はどれか?",
      code: `<span class="comment">-- どう書くのが正しい?</span>`,
      choices: [
        { text: "<code>import Data.List, Data.Map</code> のようにカンマ区切りで1行にまとめる", isCorrect: false },
        { text: "<code>import (Data.List, Data.Map)</code> のように括弧でまとめて書く", isCorrect: false },
        { text: "GHCiの<code>:m + Data.List Data.Map</code>と同じスペース区切り構文をソースファイルでも使える", isCorrect: false },
        { text: "<code>import Data.List</code>と<code>import Data.Map</code>を1行に1つずつ、複数行に分けて書く", isCorrect: true }
      ],
      explanation: "複数のモジュールをインポートする場合、import文を1行に1つずつ、複数行に分けて書く必要がある。カンマ区切りや括弧でまとめる構文、GHCiの<code>:m</code>構文はソースファイルでは使えない。"
    }
  ]
};
