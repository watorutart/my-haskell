window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260612"] = {
  date: "20260612",
  title: "case式",
  questions: [
    {
      id: "20260612-q1",
      question: "関数の引数に対するパターンマッチ(複数の等式による定義)と case式の関係として正しいものはどれか?",
      code: `head' (x:_) = x

head' xs = <span class="keyword">case</span> xs <span class="keyword">of</span> (x:_) -> x`,
      choices: [
        { text: "引数のパターンマッチは case式の構文糖衣であり、内部的には同じもの", isCorrect: true },
        { text: "case式は引数のパターンマッチより機能が少ない簡易版", isCorrect: false },
        { text: "両者は別の仕組みで、マッチの優先順位ルールが異なる", isCorrect: false },
        { text: "case式は値の等価チェックのみで、パターンの分解はできない", isCorrect: false }
      ],
      explanation: "関数定義での引数パターンマッチは case式の構文糖衣。どちらも同じパターンマッチ機構で、上(先)に書いたパターンから順に試される。"
    },
    {
      id: "20260612-q2",
      question: "case式で、どのパターンにも合致しない値を渡すとどうなるか?",
      code: `f xs = <span class="keyword">case</span> xs <span class="keyword">of</span> [x] -> x

f [1, 2]  <span class="comment">-- ?</span>`,
      choices: [
        { text: "コンパイルエラーになる(網羅していない時点で型検査が通らない)", isCorrect: false },
        { text: "ランタイムエラーになる", isCorrect: true },
        { text: "undefined が返る", isCorrect: false },
        { text: "最後に書いたパターンの結果が既定値として使われる", isCorrect: false }
      ],
      explanation: "パターンの網羅性はコンパイルを止めない(警告は出せる)。実行時に合致するパターンが見つからなければランタイムエラー(Non-exhaustive patterns)になる。"
    },
    {
      id: "20260612-q3",
      question: "次のcase式で <code>describeList [5]</code> を評価した結果はどれか?",
      code: `describeList ls = <span class="keyword">case</span> ls <span class="keyword">of</span> [] -> <span class="comment">"empty."</span>
                       xs -> <span class="comment">"a longer list."</span>
                       [x] -> <span class="comment">"a singleton list."</span>`,
      choices: [
        { text: "\"a singleton list.\" — もっとも特殊なパターンが優先される", isCorrect: false },
        { text: "\"a longer list.\" — 合致した最初のパターンが使われる", isCorrect: true },
        { text: "ランタイムエラー — 複数パターンに合致するため曖昧", isCorrect: false },
        { text: "コンパイルエラー — [x] に到達不能なため", isCorrect: false }
      ],
      explanation: "パターンは上から順に試され、合致した最初のものが使われる。変数パターン xs はあらゆる値に合致するため、[5] は xs で捕まり [x] には到達しない。特殊性による優先順位は存在しない。"
    },
    {
      id: "20260612-q4",
      question: "if や switch との違いとして、case が「式」であることの帰結はどれか?",
      code: `describeList ls = <span class="comment">"The list is "</span>
    ++ <span class="keyword">case</span> ls <span class="keyword">of</span> [] -> <span class="comment">"empty."</span>
                  [x] -> <span class="comment">"a singleton list."</span>
                  xs -> <span class="comment">"a longer list."</span>`,
      choices: [
        { text: "値を返すので、++ の引数など式が書ける場所ならどこでも埋め込める", isCorrect: true },
        { text: "式なので関数の本体の先頭でしか使えない", isCorrect: false },
        { text: "各分岐で異なる型の値を返せる", isCorrect: false },
        { text: "副作用を持つ文をまとめて実行するための構文である", isCorrect: false }
      ],
      explanation: "case式は全体が1つの値に評価されるため、++ の右辺など式の一部として埋め込める。ただし各分岐の結果はすべて同じ型でなければならない。引数のパターンマッチが関数定義時にしか使えないのに対し、case式は式の位置ならどこでも使える。"
    },
    {
      id: "20260612-q5",
      question: "次の2つの定義の関係として正しいものはどれか?",
      code: `describeList ls = <span class="comment">"The list is "</span> ++ <span class="keyword">case</span> ls <span class="keyword">of</span> [] -> <span class="comment">"empty."</span>
                                            xs -> <span class="comment">"a longer list."</span>

describeList ls = <span class="comment">"The list is "</span> ++ what ls
    <span class="keyword">where</span> what [] = <span class="comment">"empty."</span>
          what xs = <span class="comment">"a longer list."</span>`,
      choices: [
        { text: "同じ意味。where内の補助関数の引数パターンマッチはcase式と等価に使える", isCorrect: true },
        { text: "where版は最初の等式しか評価されないため挙動が異なる", isCorrect: false },
        { text: "case版はlsを書き換えるが、where版は書き換えない", isCorrect: false },
        { text: "where版はwhatが外部からも呼べるため意味が異なる", isCorrect: false }
      ],
      explanation: "両者は同じ意味。補助関数の引数パターンマッチは構文糖衣を通じてcase式に展開されるため、whereで補助関数を定義する書き方とcase式を埋め込む書き方は等価。なおwhereの束縛はその関数の中からしか見えない。"
    }
  ]
};
