window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260528"] = {
  date: "20260528",
  title: "型システム・カリー化・リスト内包表記",
  questions: [
  {
    "id": "20260528-q1",
    "question": "Haskellの型システムにおける文字と文字列の扱いに注目してみましょう。次の式の正確な型は何でしょうか？",
    "code": "<span class=\"comment\">-- ghciで次の式の型を調べます</span>\n(<span class=\"keyword\">'H'</span>, <span class=\"keyword\">\"H\"</span>)",
    "choices": [
      {
        "text": "(Char, Char)",
        "isCorrect": false
      },
      {
        "text": "(String, String)",
        "isCorrect": false
      },
      {
        "text": "(Char, [Char]) または (Char, String)",
        "isCorrect": true
      },
      {
        "text": "[Char, Char]",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellではシングルクォートで囲まれた文字（例: <code>'H'</code>）は <code>Char</code> 型になり、ダブルクォートで囲まれた文字列（例: <code>\"H\"</code>）は <code>[Char]</code> (または <code>String</code>) 型になります。<br><br><code>[Char]</code> は文字のリストであり、Haskellにおいて <code>String</code> は <code>[Char]</code> の別名（型シノニム）です。<br>また、丸括弧で囲まれた <code>('H', \"H\")</code> はタプルを表し、異なる型のペアを作ることができます。したがって、正確な型は <code>(Char, [Char])</code> もしくは <code>(Char, String)</code> となります！"
  },
  {
    "id": "20260528-q2",
    "question": "Haskellの関数定義における「<code>-&gt;</code>」の設計思想についてです。以下の関数シグネチャにおいて、引数と返り値の型がすべて同じ <code>-&gt;</code> で区切られている本質的な理由は何でしょうか？",
    "code": "addThree :: <span class=\"keyword\">Int</span> -> <span class=\"keyword\">Int</span> -> <span class=\"keyword\">Int</span> -> <span class=\"keyword\">Int</span>\naddThree x y z = x + y + z",
    "choices": [
      {
        "text": "Haskellには「複数の引数を持つ関数」が存在せず、すべての関数が「1つの引数を受け取って新しい関数を返す」ため（カリー化）。",
        "isCorrect": true
      },
      {
        "text": "初期設計でのミスが、後方互換性を保つためにそのまま残ってしまったため。",
        "isCorrect": false
      },
      {
        "text": "<code>-&gt;</code> 演算子が、すべての引数を並列かつ同時に実行するように指示する並列処理のシンボルだから。",
        "isCorrect": false
      },
      {
        "text": "関数が返す結果が自動的にリスト構造になり、次の要素へポインタを繋ぐことを表しているため。",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellにおける関数はすべて**カリー化**されています。3つの引数を受け取る <code>addThree</code> は、厳密には「1つの <code>Int</code> を受け取り、残りの引数を処理する新しい関数 <code>(Int -&gt; Int -&gt; Int)</code> を返す関数」です。<br><br>メモにある通り、「引数と返り値を区別しないのは型から型への合成だからかな？」という直感は数学的（圏論的）に極めて鋭いです！この設計により、引数の一部だけを適用した新しい関数を作る**部分適用**が極めて自然に行えます。第5章のカリー化でこの魔法の全貌が明らかになります！楽しみですね！"
  },
  {
    "id": "20260528-q3",
    "question": "今日のコードで定義した <code>removeNonUppercase</code> 関数に関する問題です。この関数に <code>\"HaskellIsFun2026\"</code> を渡したとき、返される実行結果は何でしょうか？",
    "code": "removeNonUppercase :: [<span class=\"keyword\">Char</span>] -> [<span class=\"keyword\">Char</span>]\nremoveNonUppercase st = [ c | c <- st, c `elem` [<span class=\"keyword\">'A'</span>..<span class=\"keyword\">'Z'</span>]]\n\nghci&gt; removeNonUppercase <span class=\"keyword\">\"HaskellIsFun2026\"</span>",
    "choices": [
      {
        "text": "\"HaskellIsFun\"",
        "isCorrect": false
      },
      {
        "text": "\"HIF\"",
        "isCorrect": true
      },
      {
        "text": "\"haskellisfun\"",
        "isCorrect": false
      },
      {
        "text": "['H', 'I', 'F', '2', '0', '2', '6']",
        "isCorrect": false
      }
    ],
    "explanation": "この関数はリスト内包表記を用いて文字列のフィルタリングを行っています。<br><br>1. <code>c &lt;- st</code> で入力文字列から1文字ずつ <code>c</code> を取り出します。<br>2. <code>c `elem` ['A'..'Z']</code> がフィルタ条件となり、大文字のアルファベット（AからZまで）に含まれる文字のみを抽出します。<br>3. 小文字（'a', 's'など）や数字（'2', '0'など）は条件を満たさないため除外されます。<br><br>結果として、大文字の <code>'H'</code>, <code>'I'</code>, <code>'F'</code> のみが残り、文字列 <code>\"HIF\"</code> が返されます！"
  }
]
};
