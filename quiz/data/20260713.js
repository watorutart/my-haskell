window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260713"] = {
  date: "20260713",
  title: "Data.Charとシーザー暗号",
  questions: [
    {
      id: "20260713-q1",
      question: "次のコードで <code>encode 3 \"xyz\"</code> を実行すると結果はどうなるか?",
      code: `<span class="keyword">import</span> Data.Char

encode :: Int -> String -> String
encode offset msg = map (\\c -> chr $ ord c + offset) msg`,
      choices: [
        { text: "\"{|}\" になる。ord値にoffsetを足すだけで、アルファベット範囲を超えても折り返さないため", isCorrect: true },
        { text: "\"abc\" になる。'z'を超えた分は'a'から続けて数えられるため", isCorrect: false },
        { text: "エラーになる。chrに不正なコードポイントを渡すと実行時エラーになるため", isCorrect: false },
        { text: "\"xyz\" のまま変化しない。offsetが3未満のときは何もしない実装になっているため", isCorrect: false }
      ],
      explanation: "'x'=120, 'y'=121, 'z'=122 に3を足すと123,124,125で、これは'{','|','}'のコードポイント。encodeは'a'〜'z'の範囲かどうかを判定せず、ord値に単純にoffsetを加算してchrに戻すだけなので、アルファベットの範囲を超えても折り返さない。"
    },
    {
      id: "20260713-q2",
      question: "次のコードで <code>encode 3 \"hey mark\"</code> を実行すると空白文字が '#' に変換される。その理由として正しいものはどれか?",
      code: `<span class="keyword">import</span> Data.Char

encode :: Int -> String -> String
encode offset msg = map (\\c -> chr $ ord c + offset) msg
<span class="comment">-- encode 3 "hey mark" == "kh|#pdun"</span>`,
      choices: [
        { text: "mapは空白文字をスキップするよう内部で判定しているが、このコードにはバグがあるため", isCorrect: false },
        { text: "mapはmsg中のすべての文字に同じラムダを適用するため、空白もord+offsetの計算対象になる", isCorrect: true },
        { text: "encodeは'a'〜'z'だけを判定してシフトし、それ以外の文字はそのまま出力する実装になっている", isCorrect: false },
        { text: "空白文字はData.Char内部で'z'の次の文字として定義されている", isCorrect: false }
      ],
      explanation: "mapは文字の種類を区別せず、msg内のすべての文字に同じラムダを適用する。空白(ord 32)に3を足すと35で、これは'#'のコードポイント。encodeはアルファベットかどうかを一切判定していない。"
    },
    {
      id: "20260713-q3",
      question: "次の decode が encode の結果を正しく元に戻せるのはなぜか?",
      code: `decode :: Int -> String -> String
decode shift msg = encode (negate shift) msg
<span class="comment">-- decode 3 "kh|#pdun" == "hey mark"</span>`,
      choices: [
        { text: "decodeは独自の逆算アルゴリズムを持っており、encodeとは別の計算をしているため", isCorrect: false },
        { text: "msg内の文字を逆順に並び替えてからencodeを呼んでいるため", isCorrect: false },
        { text: "negate shiftをencodeに渡すことで、各文字のord値から同じ量を引く計算になるため", isCorrect: true },
        { text: "Data.Char内部のdecodeCaesar関数を裏で呼び出しているため", isCorrect: false }
      ],
      explanation: "encodeは各文字のord値にoffsetを足す処理。decodeはshiftの符号をnegateで反転させてencodeにそのまま渡すため、実質的にord値からshift分を引く計算になり、暗号化前の文字に戻る。"
    },
    {
      id: "20260713-q4",
      question: "<code>encode :: Int-> String -> String</code> のように \"->\" の直前にスペースを入れずに書いても正しく型注釈として認識されるのはなぜか?",
      code: `encode :: Int-> String -> String
encode offset msg = map (\\c -> chr $ ord c + offset) msg`,
      choices: [
        { text: "Haskellの型注釈ではスペースの有無が完全に無視される仕様になっているため", isCorrect: false },
        { text: "実際はコンパイルエラーだが、GHCiは警告だけを出して実行を許可するため", isCorrect: false },
        { text: "Int->は特殊な型演算子としてPreludeに事前定義されているため", isCorrect: false },
        { text: "->は独立した記号トークンとして字句解析されるため、直前の識別子とスペースなしで隣接していても正しく区切られる", isCorrect: true }
      ],
      explanation: "Haskellの字句解析では、英数字からなる識別子(Int)と記号だけからなる演算子トークン(->)は種類が異なるため、間にスペースがなくても自動的に別トークンとして区切られる。そのため \"Int-> String\" も \"Int -> String\" も同じ意味になる。"
    },
    {
      id: "20260713-q5",
      question: "<code>chr $ ord c + offset</code> から <code>$</code> を取り除いて <code>chr ord c + offset</code> と書くとどうなるか?",
      code: `encode offset msg = map (\\c -> chr $ ord c + offset) msg
<span class="comment">-- $ を取り除いた場合: chr ord c + offset</span>`,
      choices: [
        { text: "同じ意味になる。$は見た目を整えるための糖衣構文で、省略しても動作は変わらない", isCorrect: false },
        { text: "関数適用は+より優先順位が高いため、chrがordに直接適用されようとして型エラーになる", isCorrect: true },
        { text: "offsetが先にchrへ適用されてしまい、実行時エラーになる", isCorrect: false },
        { text: "構文エラーになりコンパイルすら通らない", isCorrect: false }
      ],
      explanation: "関数適用(スペースで並べる呼び出し)は+より優先順位が高いため、$なしだと \"chr ord\" がまず結合され、chrにCharではなくInt->Char型のordを適用しようとして型エラーになる。$は右辺全体をまとめて引数にするための低優先度演算子で、括弧の代わりに使われている。"
    }
  ]
};
