# Skill: Haskell Interactive Learning Quiz Generator

This skill instructs the agent on how to automatically generate a beautiful, interactive HTML quiz based on the user's daily Haskell learning notes (like `memo.md`).

---

## 🎯 Goal
Create an interactive, premium-designed, gamified HTML quiz review page for the user's daily study session. The quiz should test gotchas, core concepts, and code execution results.

---

## 📋 Step-by-Step Instructions

### Step 1: Analyze Learning Notes
- Locate and read the user's daily learning notes (e.g., `memo.md` in the workspace).
- Identify exactly 3 key topics, "gotchas", syntax nuances, or common errors mentioned in today's notes.
- Focus on questions that test *why* a behavior occurs (conceptual understanding) rather than just trivial recall.

### Step 2: Formulate 3 Dynamic Questions
- **Question 1**: Core syntax/operation or gotcha (e.g., Range behavior, lazy evaluation).
- **Question 2**: Function behavior (e.g., `tail`, `init`, `head` on empty list, boundary cases).
- **Question 3**: Types and list structures (e.g., `Char` vs `String` list concatenation, operator differences like `:` vs `++`).
- For each question:
  - Create exactly **4 multiple-choice options** (A, B, C, D).
  - Ensure only **one** option is correct.
  - Write a clear, encouraging, and highly educational explanation for the answer, citing the reason why Haskell behaves this way.

### Step 3: Populate the Interactive HTML Template
- Use the **Premium HTML & CSS Template** below.
- Replace the following placeholders in the template:
  - **Date**: Find the current local time / date and format it as `YYYY.MM.DD` (e.g., `2026.05.25`).
  - **Quiz Data (`quizData` array in JS)**: Inject the questions, code snippets, choices, and explanations exactly in the structure specified.
- Use syntax-colored HTML tags (like `<span class="keyword">`, `<span class="comment">`) in the JS code blocks to match the dark editor style.

### Step 4: Write and Execute
- Save the completed HTML page to `/quiz/{YYYYMMDD}_quiz.html` (e.g., `/quiz/20260525_quiz.html`).
- **Do not overwrite** past quizzes unless explicitly asked to do so; always create a new dated file.
- Proactively run terminal commands to open the quiz file for the user (e.g., `open quiz/{YYYYMMDD}_quiz.html` on Mac).
- Present a concise, polite summary in the chat of today's quiz topics and how to access the file.

---

## 💎 Premium HTML & CSS Template

Use the exact HTML below as a boilerplate. Make sure to only edit `quizData`, the document title, and subtitle metadata.

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Haskell 今日の学びクイズ - {YYYY.MM.DD}</title>
  
  <!-- Premium Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  
  <!-- Canvas Confetti CDN -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

  <style>
    /* Reset & CSS Variables */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg-primary: #080c14;
      --bg-secondary: #0f172a;
      --bg-glass: rgba(15, 23, 42, 0.65);
      --bg-glass-hover: rgba(30, 41, 59, 0.8);
      --border-color: rgba(255, 255, 255, 0.08);
      --text-primary: #f8fafc;
      --text-secondary: #94a3b8;
      --text-muted: #64748b;
      
      --accent-primary: #6366f1;
      --accent-secondary: #a855f7;
      --accent-success: #10b981;
      --accent-error: #f43f5e;
      
      --glow-accent: rgba(99, 102, 241, 0.25);
      --glow-success: rgba(16, 185, 129, 0.25);
      --glow-error: rgba(244, 63, 94, 0.25);
      
      --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: var(--bg-primary);
      color: var(--text-primary);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow-x: hidden;
      position: relative;
      padding: 2rem 1rem;
    }

    /* Ambient Gradients */
    body::before, body::after {
      content: '';
      position: absolute;
      width: 400px;
      height: 400px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--accent-primary) 0%, rgba(99, 102, 241, 0) 70%);
      opacity: 0.15;
      z-index: -1;
      filter: blur(80px);
      pointer-events: none;
    }

    body::before { top: -10%; left: -10%; }
    body::after { bottom: -10%; right: -10%; background: radial-gradient(circle, var(--accent-secondary) 0%, rgba(168, 85, 247, 0) 70%); opacity: 0.12; }

    .app-container {
      width: 100%;
      max-width: 680px;
      z-index: 10;
    }

    header {
      text-align: center;
      margin-bottom: 2rem;
      animation: fadeInDown 0.6s ease-out;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
      border: 1px solid rgba(99, 102, 241, 0.3);
      padding: 0.4rem 1rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
      color: #a5b4fc;
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 2.2rem;
      font-weight: 800;
      line-height: 1.25;
      background: linear-gradient(135deg, #ffffff 30%, #c7d2fe 70%, #e0a7ff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }

    .subtitle { color: var(--text-secondary); font-size: 1rem; }

    /* Progress Tracker */
    .progress-wrapper { margin-bottom: 1.5rem; }
    .progress-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .progress-bar-container {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 10px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.03);
    }
    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
      border-radius: 10px;
      transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 0 12px var(--accent-primary);
    }

    /* Main Card */
    .card {
      background: var(--bg-glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      border-radius: 24px;
      padding: 2.5rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
      min-height: 380px;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .question-screen { display: flex; flex-direction: column; height: 100%; flex-grow: 1; }
    .question-number { font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: var(--accent-secondary); margin-bottom: 0.75rem; }
    .question-text { font-size: 1.25rem; font-weight: 700; line-height: 1.5; margin-bottom: 1.5rem; color: var(--text-primary); }

    pre {
      background: #090d16;
      border: 1px solid rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      padding: 1.2rem;
      margin-bottom: 1.5rem;
      overflow-x: auto;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
      color: #e2e8f0;
      position: relative;
    }
    .code-lang { position: absolute; top: 6px; right: 12px; font-size: 0.7rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; }

    /* Choices */
    .choices-list { display: grid; grid-template-columns: 1fr; gap: 0.85rem; margin-bottom: 1.5rem; }
    .choice-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1.5px solid var(--border-color);
      border-radius: 16px;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: pointer;
      font-weight: 600;
      color: var(--text-primary);
      transition: var(--transition-smooth);
      text-align: left;
      outline: none;
    }
    .choice-card:hover:not(.checked) {
      background: var(--bg-glass-hover);
      border-color: var(--accent-primary);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(99, 102, 241, 0.15);
    }
    .choice-index {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-secondary);
      flex-shrink: 0;
    }
    .choice-card:hover:not(.checked) .choice-index { background: var(--accent-primary); border-color: var(--accent-primary); color: white; }

    .choice-card.correct { background: rgba(16, 185, 129, 0.1); border-color: var(--accent-success); box-shadow: 0 8px 24px var(--glow-success); }
    .choice-card.correct .choice-index { background: var(--accent-success); border-color: var(--accent-success); color: white; }
    .choice-card.incorrect { background: rgba(244, 63, 94, 0.08); border-color: var(--accent-error); box-shadow: 0 8px 24px var(--glow-error); opacity: 0.7; }
    .choice-card.incorrect .choice-index { background: var(--accent-error); border-color: var(--accent-error); color: white; }
    .choice-card.dimmed { opacity: 0.4; cursor: not-allowed; }

    /* Explanation Panel */
    .explanation-panel {
      margin-top: 1.5rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px dashed rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 1.25rem;
      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      display: none;
    }
    .explanation-header { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; margin-bottom: 0.5rem; }
    .explanation-header.correct-text { color: var(--accent-success); }
    .explanation-header.incorrect-text { color: var(--accent-error); }
    .explanation-body { font-size: 0.9rem; line-height: 1.6; color: var(--text-secondary); }

    .action-container { margin-top: auto; display: flex; justify-content: flex-end; padding-top: 1rem; }
    .btn {
      background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
      border: none;
      color: white;
      padding: 0.85rem 1.8rem;
      border-radius: 14px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: var(--transition-smooth);
      box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
    }
    .btn:hover { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(99, 102, 241, 0.45); }

    /* Results */
    .results-screen { text-align: center; display: none; flex-direction: column; align-items: center; justify-content: center; animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
    .trophy-icon { color: #eab308; width: 72px; height: 72px; filter: drop-shadow(0 4px 12px rgba(234, 179, 8, 0.4)); margin-bottom: 1.5rem; }
    .results-title { font-size: 1.8rem; font-weight: 800; margin-bottom: 0.5rem; background: linear-gradient(135deg, #ffffff, #c7d2fe); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .results-stats { display: flex; gap: 1.5rem; margin: 1.5rem 0; }
    .stat-box { background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); border-radius: 16px; padding: 1rem 1.5rem; min-width: 120px; }
    .stat-val { font-size: 1.8rem; font-weight: 800; color: var(--accent-primary); }
    .stat-val.success-color { color: var(--accent-success); }
    .stat-lbl { font-size: 0.8rem; color: var(--text-secondary); font-weight: 600; text-transform: uppercase; }
    .results-message { color: var(--text-secondary); font-size: 1rem; margin-bottom: 2rem; max-width: 440px; }

    /* Syntax Highlighting */
    .keyword { color: #f472b6; font-weight: bold; }
    .comment { color: #64748b; font-style: italic; }

    @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

    footer { text-align: center; margin-top: 1.5rem; font-size: 0.8rem; color: var(--text-muted); }
  </style>
</head>
<body>

  <div class="app-container">
    
    <header>
      <div class="badge">
        <i data-lucide="book-open" style="width: 14px; height: 14px;"></i>
        <span>Haskell Learning Review</span>
      </div>
      <h1>今日の学びクイズ</h1>
      <p class="subtitle">{YYYY.MM.DD} — リスト・レンジ・型についての3問</p>
    </header>

    <div class="progress-wrapper">
      <div class="progress-meta">
        <span id="current-question-num">Question 1 of 3</span>
        <span id="score-meta">Score: 0 / 0</span>
      </div>
      <div class="progress-bar-container">
        <div class="progress-bar-fill" id="progress-bar"></div>
      </div>
    </div>

    <div class="card" id="quiz-card">
      
      <!-- Quiz Screen -->
      <div class="question-screen" id="question-screen">
        <div class="question-number" id="screen-q-num">Question 1</div>
        <div class="question-text" id="screen-q-text">質問テキスト</div>
        
        <pre><div class="code-lang">haskell</div><code id="code-snippet">コード</code></pre>

        <div class="choices-list" id="choices-container"></div>

        <div class="explanation-panel" id="explanation-panel">
          <div class="explanation-header" id="explanation-title"></div>
          <div class="explanation-body" id="explanation-text"></div>
        </div>

        <div class="action-container" id="action-container" style="display: none;">
          <button class="btn" id="next-btn">
            <span>Next Question</span>
            <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
          </button>
        </div>
      </div>

      <!-- Results Screen -->
      <div class="results-screen" id="results-screen">
        <i data-lucide="trophy" class="trophy-icon"></i>
        <h2 class="results-title">Quiz Completed!</h2>
        <p class="results-message" id="results-achievement-text">素晴らしい！今日のHaskellの学びが身についています！</p>
        
        <div class="results-stats">
          <div class="stat-box">
            <div class="stat-val success-color" id="final-score">3 / 3</div>
            <div class="stat-lbl">正解数</div>
          </div>
          <div class="stat-box">
            <div class="stat-val" id="final-accuracy">100%</div>
            <div class="stat-lbl">正解率</div>
          </div>
        </div>

        <button class="btn" id="retry-btn">
          <i data-lucide="rotate-ccw" style="width: 18px; height: 18px;"></i>
          <span>もう一度挑戦する</span>
        </button>
      </div>

    </div>

    <footer>
      <p>Created by Antigravity</p>
    </footer>

  </div>

  <script>
    // Injected Quiz Data
    const quizData = [
      {
        qNumText: "Question 1",
        question: "質問テキスト",
        code: `Haskellコードスニペット`,
        choices: [
          { text: "選択肢A", isCorrect: false },
          { text: "選択肢B (正解)", isCorrect: true },
          { text: "選択肢C", isCorrect: false },
          { text: "選択肢D", isCorrect: false }
        ],
        explanation: "正解の解説テキスト。"
      },
      // ...他2問追加
    ];

    let currentIdx = 0;
    let score = 0;
    let answered = false;

    const qNumElement = document.getElementById("screen-q-num");
    const qTextElement = document.getElementById("screen-q-text");
    const codeSnippet = document.getElementById("code-snippet");
    const choicesContainer = document.getElementById("choices-container");
    const explanationPanel = document.getElementById("explanation-panel");
    const explanationTitle = document.getElementById("explanation-title");
    const explanationText = document.getElementById("explanation-text");
    const actionContainer = document.getElementById("action-container");
    const nextBtn = document.getElementById("next-btn");
    
    const currentQMeta = document.getElementById("current-question-num");
    const scoreMeta = document.getElementById("score-meta");
    const progressBar = document.getElementById("progress-bar");
    
    const resultsScreen = document.getElementById("results-screen");
    const questionScreen = document.getElementById("question-screen");
    const finalScore = document.getElementById("final-score");
    const finalAccuracy = document.getElementById("final-accuracy");
    const resultsAchievementText = document.getElementById("results-achievement-text");
    const retryBtn = document.getElementById("retry-btn");

    lucide.createIcons();

    function loadQuestion(idx) {
      answered = false;
      explanationPanel.style.display = "none";
      actionContainer.style.display = "none";
      
      const qData = quizData[idx];
      qNumElement.innerHTML = qData.qNumText;
      qTextElement.innerHTML = qData.question;
      codeSnippet.innerHTML = qData.code;
      
      currentQMeta.innerText = `Question ${idx + 1} of ${quizData.length}`;
      scoreMeta.innerText = `Score: ${score} / ${idx}`;
      progressBar.style.width = `${(idx / quizData.length) * 100}%`;

      choicesContainer.innerHTML = "";
      qData.choices.forEach((choice, cIdx) => {
        const choiceCard = document.createElement("button");
        choiceCard.className = "choice-card";
        choiceCard.innerHTML = `
          <div class="choice-index">${String.fromCharCode(65 + cIdx)}</div>
          <div class="choice-content">${choice.text}</div>
        `;
        choiceCard.addEventListener("click", () => handleChoiceSelect(cIdx));
        choicesContainer.appendChild(choiceCard);
      });
    }

    function handleChoiceSelect(choiceIdx) {
      if (answered) return;
      answered = true;

      const qData = quizData[currentIdx];
      const selectedChoice = qData.choices[choiceIdx];
      const correctChoiceIdx = qData.choices.findIndex(c => c.isCorrect);

      const allChoiceCards = document.querySelectorAll(".choice-card");
      allChoiceCards.forEach((card, idx) => {
        card.classList.add("checked");
        if (idx === correctChoiceIdx) {
          card.classList.add("correct");
        } else if (idx === choiceIdx) {
          card.classList.add("incorrect");
        } else {
          card.classList.add("dimmed");
        }
      });

      const isCorrect = selectedChoice.isCorrect;
      if (isCorrect) {
        score++;
        playConfetti(0.3);
        explanationTitle.className = "explanation-header correct-text";
        explanationTitle.innerHTML = `
          <i data-lucide="check-circle-2" style="color: var(--accent-success); width: 20px; height: 20px;"></i>
          <span>正解！素晴らしい理解です！</span>
        `;
      } else {
        explanationTitle.className = "explanation-header incorrect-text";
        explanationTitle.innerHTML = `
          <i data-lucide="x-circle" style="color: var(--accent-error); width: 20px; height: 20px;"></i>
          <span>惜しい！次は正解できます！</span>
        `;
      }

      explanationText.innerHTML = qData.explanation;
      explanationPanel.style.display = "block";
      actionContainer.style.display = "flex";
      
      scoreMeta.innerText = `Score: ${score} / ${currentIdx + 1}`;
      lucide.createIcons();
    }

    function playConfetti(scalar = 1) {
      confetti({
        particleCount: Math.floor(80 * scalar),
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#10b981', '#fbbf24']
      });
    }

    function playMassiveConfetti() {
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#6366f1', '#a855f7', '#10b981'] });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#6366f1', '#a855f7', '#10b981'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      }());
    }

    nextBtn.addEventListener("click", () => {
      currentIdx++;
      if (currentIdx < quizData.length) {
        loadQuestion(currentIdx);
      } else {
        showResults();
      }
    });

    function showResults() {
      questionScreen.style.display = "none";
      resultsScreen.style.display = "flex";
      progressBar.style.width = "100%";
      currentQMeta.innerText = `Quiz Completed`;
      
      finalScore.innerText = `${score} / ${quizData.length}`;
      const accuracyPercent = Math.round((score / quizData.length) * 100);
      finalAccuracy.innerText = `${accuracyPercent}%`;

      if (accuracyPercent === 100) {
        resultsAchievementText.innerText = "パーフェクト！今日のHaskellの学びが完璧に身についています！🏆";
        playMassiveConfetti();
      } else if (accuracyPercent >= 60) {
        resultsAchievementText.innerText = "お見事！かなりHaskellの感覚が掴めてきていますね！✨";
        playConfetti(1);
      } else {
        resultsAchievementText.innerText = "お疲れ様でした！もう一度解き直して、エラーの挙動などを確認してみましょう！📚";
      }
    }

    retryBtn.addEventListener("click", () => {
      currentIdx = 0;
      score = 0;
      questionScreen.style.display = "flex";
      resultsScreen.style.display = "none";
      loadQuestion(currentIdx);
    });

    loadQuestion(currentIdx);
  </script>
</body>
</html>
```
