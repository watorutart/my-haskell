window.QUIZ_DATA = window.QUIZ_DATA || {};
window.QUIZ_DATA["20260525"] = {
  date: "20260525",
  title: "リスト・レンジ・型",
  questions: [
  {
    "id": "20260525-q1",
    "question": "Haskellで「20から1までの減少列」を作りたいとき、以下のレンジ評価結果はそれぞれどうなりますか？",
    "code": "<span class=\"comment\">-- 1. ステップなしでレンジを書いた場合</span>\n<span class=\"keyword\">ghci&gt;</span> [20..1]\n\n<span class=\"comment\">-- 2. ステップありで減少を指定した場合</span>\n<span class=\"keyword\">ghci&gt;</span> [20, 19..1]",
    "choices": [
      {
        "text": "1. <code>[20, 19..1]</code> / 2. <code>[20, 19..1]</code> (両方とも減少列になる)",
        "isCorrect": false
      },
      {
        "text": "1. <code>[]</code> (空リスト) / 2. <code>[20,19,18..1]</code> (減少列になる)",
        "isCorrect": true
      },
      {
        "text": "1. <code>[20,19,18..1]</code> (減少列になる) / 2. <code>[]</code> (空リスト)",
        "isCorrect": false
      },
      {
        "text": "どちらもコンパイルエラーになる",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellではステップなしで <code>[20..1]</code> のようにレンジを書いた場合、自動的に「1ずつ増加させる」と解釈されます。開始値の <code>20</code> はすでに終了値の <code>1</code> より大きいため、結果は <strong>空リスト <code>[]</code></strong> になります。減少させるには、<code>[20, 19..1]</code> のように最初の2つの値を指定してステップが <code>-1</code> であることを明示する必要があります。"
  },
  {
    "id": "20260525-q2",
    "question": "リスト <code>[5, 4, 3, 2, 1]</code> に対する <code>tail</code> と <code>init</code> の結果、および空リスト <code>[]</code> にこれらを適用した時の挙動はどうなるでしょうか？",
    "code": "<span class=\"comment\">-- 1. tail を適用</span>\n<span class=\"keyword\">ghci&gt;</span> tail [5, 4, 3, 2, 1]\n\n<span class=\"comment\">-- 2. init を適用</span>\n<span class=\"keyword\">ghci&gt;</span> init [5, 4, 3, 2, 1]\n\n<span class=\"comment\">-- 3. 空リストに head などを適用</span>\n<span class=\"keyword\">ghci&gt;</span> head []",
    "choices": [
      {
        "text": "1. <code>[4,3,2,1]</code> / 2. <code>[5,4,3,2]</code> / 空リストはランタイムエラーになる",
        "isCorrect": true
      },
      {
        "text": "1. <code>[5,4,3,2]</code> / 2. <code>[4,3,2,1]</code> / 空リストは <code>[]</code> が返る",
        "isCorrect": false
      },
      {
        "text": "1. <code>[4,3,2,1]</code> / 2. <code>[5,4,3,2]</code> / 空リストは <code>[]</code> が返る",
        "isCorrect": false
      },
      {
        "text": "すべて評価中にコンパイルエラーになる",
        "isCorrect": false
      }
    ],
    "explanation": "<code>tail</code> は「最初の要素を除いた残りのリスト」を返すため <code>[4,3,2,1]</code> に。<code>init</code> は「最後の要素を除いた残りのリスト」を返すため <code>[5,4,3,2]</code> になります。また、Haskellでは安全を考慮し、空リスト <code>[]</code> に対する <code>head</code>, <code>tail</code>, <code>init</code>, <code>last</code>, <code>maximum</code> などの操作はデフォルトで <strong>ランタイムエラー</strong> になりプログラムが停止します。"
  },
  {
    "id": "20260525-q3",
    "question": "文字リストと文字列の結合についての問題です。以下の2つの式の評価結果はそれぞれ何になるでしょうか？",
    "code": "<span class=\"comment\">-- 1. シングルクォートで定義したリストの連結</span>\n<span class=\"keyword\">ghci&gt;</span> ['w', 'o'] ++ ['o', 't']\n\n<span class=\"comment\">-- 2. ダブルクォートで定義したリストの連結</span>\n<span class=\"keyword\">ghci&gt;</span> [\"w\", \"o\"] ++ [\"o\", \"d\"]",
    "choices": [
      {
        "text": "1. <code>[\"w\",\"o\",\"o\",\"t\"]</code> / 2. <code>\"wood\"</code>",
        "isCorrect": false
      },
      {
        "text": "1. <code>\"woot\"</code> / 2. <code>[\"w\",\"o\",\"o\",\"d\"]</code>",
        "isCorrect": true
      },
      {
        "text": "1. <code>\"woot\"</code> / 2. <code>\"wood\"</code> (両方とも通常の文字列になる)",
        "isCorrect": false
      },
      {
        "text": "どちらも型エラーになり結合できない",
        "isCorrect": false
      }
    ],
    "explanation": "Haskellでは <strong><code>String</code>（文字列）は単なる文字型 <code>Char</code> のリスト（<code>[Char]</code>）のエイリアス</strong> です。そのため、シングルクォート文字のリスト連結は <code>\"woot\"</code> になります。一方、ダブルクォートで囲まれたものはすでに文字列リスト <code>[String]</code> (＝ <code>[[Char]]</code>) のため、それらを連結すると文字列の要素リスト <code>[\"w\",\"o\",\"o\",\"d\"]</code> になります！"
  }
]
};
