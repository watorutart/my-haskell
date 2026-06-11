window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260526"] = {
  date: "20260526",
  title: "リスト内包表記",
  questions: [
  {
    "id": "20260526-q1",
    "question": "次のリスト内包表記を実行したときの出力結果として正しいものはどれですか？",
    "code": "[x | x <span class=\"keyword\">&lt;-</span> [10..20], x <span class=\"keyword\">`mod`</span> 3 <span class=\"keyword\">==</span> 1, x <span class=\"keyword\">`mod`</span> 2 <span class=\"keyword\">==</span> 0]",
    "choices": [
      {
        "text": "[10, 13, 16, 19]",
        "isCorrect": false
      },
      {
        "text": "[10, 16]",
        "isCorrect": true
      },
      {
        "text": "[12, 18]",
        "isCorrect": false
      },
      {
        "text": "[10, 12, 14, 16, 18, 20]",
        "isCorrect": false
      }
    ],
    "explanation": "リスト内包表記では、カンマで区切ることで複数の述語（フィルタ条件）を追加できます。すべての条件を同時に満たす（AND条件）要素だけが抽出されます。<br><br>ジェネレータ <code>[10..20]</code> から取り出された要素のうち、条件1 <code>x `mod` 3 == 1</code> （3で割ると1余る数：10, 13, 16, 19）と、条件2 <code>x `mod` 2 == 0</code> （偶数：2で割り切れる数）の両方を満たすのは <strong>10</strong> と <strong>16</strong> のみです。したがって、結果は <code>[10, 16]</code> となります。"
  },
  {
    "id": "20260526-q2",
    "question": "次の関数 <code>mystery</code> に対して <code>mystery [1..5]</code> を呼び出した場合の出力結果はどれですか？",
    "code": "<span class=\"keyword\">mystery</span> xs <span class=\"keyword\">=</span> sum [2 | _ <span class=\"keyword\">&lt;-</span> xs]<br><br>mystery [1..5]",
    "choices": [
      {
        "text": "15",
        "isCorrect": false
      },
      {
        "text": "5",
        "isCorrect": false
      },
      {
        "text": "10",
        "isCorrect": true
      },
      {
        "text": "2",
        "isCorrect": false
      }
    ],
    "explanation": "ジェネレータでプレースホルダー <code>_</code> を使用すると、リストの各要素の具体的な値は無視され、単に「リストの要素数（長さ）」分だけ処理が繰り返されます。<br><br><code>[2 | _ &lt;- [1..5]]</code> は、元のリストの長さ5の分だけループが回り、各要素に対して <code>2</code> を出力するため、結果として <code>[2, 2, 2, 2, 2]</code> が生成されます。<br>最後に <code>sum</code> 関数でこのリストの全要素を合計（2 + 2 + 2 + 2 + 2）するため、結果は <strong>10</strong> となります。これは、今日学んだリストの長さを測る関数 <code>length' xs = sum [1 | _ &lt;- xs]</code> の応用パターンです。"
  },
  {
    "id": "20260526-q3",
    "question": "次の入れ子になったリスト内包表記を実行したときの出力結果として正しいものはどれですか？",
    "code": "<span class=\"keyword\">let</span> xxs <span class=\"keyword\">=</span> [[1..3], [4..6]]<br>[[x <span class=\"keyword\">*</span> 2 | x <span class=\"keyword\">&lt;-</span> xs, odd x] | xs <span class=\"keyword\">&lt;-</span> xxs]",
    "choices": [
      {
        "text": "[[2, 6], [10]]",
        "isCorrect": true
      },
      {
        "text": "[[2, 4, 6], [8, 10, 12]]",
        "isCorrect": false
      },
      {
        "text": "[2, 6, 10]",
        "isCorrect": false
      },
      {
        "text": "[[1, 3], [5]]",
        "isCorrect": false
      }
    ],
    "explanation": "入れ子になったリスト内包表記では、外側のジェネレータがまず動作し、その各要素に対して内側の処理が適用されます。<br><br>1. 外側のジェネレータ <code>xs &lt;- xxs</code> により、<code>xs</code> はまず <code>[1, 2, 3]</code>、次に <code>[4, 5, 6]</code> になります。<br>2. <code>xs = [1, 2, 3]</code> のとき、内側のリスト内包表記は奇数（<code>odd x</code>）である <code>1</code> と <code>3</code> を抽出し、それらを2倍にするため <code>[2, 6]</code> になります。<br>3. <code>xs = [4, 5, 6]</code> のとき、奇数である <code>5</code> のみが抽出され、それを2倍にするため <code>[10]</code> になります。<br><br>したがって、全体の結果は <strong><code>[[2, 6], [10]]</code></strong> となります。"
  }
]
};
