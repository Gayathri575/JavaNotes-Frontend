import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { quizTopics } from "./quizTopics";
import "./Quiz.css";

const TOTAL_Q    = 15;
const TIMER_SECS = 8 * 60;
const KEYS       = ["A", "B", "C", "D"];

// ── Helpers ────────────────────────────────────────────────
const pad  = (n) => String(n).padStart(2, "0");
const fmt  = (s) => `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;

function loadStats(lsKey) {
  return JSON.parse(localStorage.getItem(lsKey)) || {
    bestScore: 0, totalAttempts: 0, lastScore: null, wrongQuestions: [],
  };
}

function saveStats(lsKey, score, wrongQs) {
  const existing = loadStats(lsKey);
  localStorage.setItem(lsKey, JSON.stringify({
    lastScore:      score,
    bestScore:      Math.max(existing.bestScore, score),
    totalAttempts:  existing.totalAttempts + 1,
    wrongQuestions: wrongQs,
  }));
}
// ── Main Component ─────────────────────────────────────────
function Quiz() {
  const { topicId }  = useParams();
  const navigate     = useNavigate();
  const config       = quizTopics[topicId];

  const [screen, setScreen]           = useState("loading"); // loading | start | quiz | result
  const [questions, setQuestions]     = useState([]);
  const [current, setCurrent]         = useState(0);
  const [score, setScore]             = useState(0);
  const [remaining, setRemaining]     = useState(TIMER_SECS);
  const [answered, setAnswered]       = useState(false);
  const [shuffled, setShuffled]       = useState([]);
  const [selected, setSelected]       = useState(null); // { chosen, isCorrect }
  const [explanation, setExplanation] = useState("");
  const [subStats, setSubStats]       = useState({});
  const [wrongQs, setWrongQs]         = useState([]);
  const [stats, setStats]             = useState(null);
  const [error, setError]             = useState("");
  const timerRef = useRef(null);

  const lsKey = config ? `quiz_${config.apiTopic}` : "";

  // ── Load questions ─────────────────────────────────────────
  useEffect(() => {
    if (!config) return;
    const token = sessionStorage.getItem("kc_access_token") || localStorage.getItem("kc_access_token");
    fetch(`/api/quiz/${config.apiTopic}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((qs) => { setQuestions(qs); setScreen("start"); })
      .catch((e) => setError(e.message));
  }, [topicId]);

  // ── Shuffle when question changes ──────────────────────────
  useEffect(() => {
    if (screen !== "quiz" || !questions[current]) return;
    setShuffled(
      [...questions[current].options]
        .map((opt) => ({ opt }))
        .sort(() => Math.random() - 0.5)
    );
    setAnswered(false);
    setSelected(null);
    setExplanation("");
  }, [current, screen]);

  // ── Timer ──────────────────────────────────────────────────
  const stopTimer = useCallback(() => clearInterval(timerRef.current), []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { stopTimer(); endQuiz(true); return 0; }
        return r - 1;
      });
    }, 1000);
  }, [stopTimer]);

  useEffect(() => () => stopTimer(), [stopTimer]);

  // ── Actions ────────────────────────────────────────────────
  function startQuiz() {
    setCurrent(0); setScore(0); setRemaining(TIMER_SECS);
    setSubStats({}); setWrongQs([]); setAnswered(false);
    setSelected(null); setExplanation("");
    setScreen("quiz");
    startTimer();
  }

  function selectOpt(chosenText) {
    if (answered) return;
    const q         = questions[current];
    const isCorrect = chosenText === q.answer;
    setAnswered(true);
    setSelected({ chosen: chosenText, isCorrect });
    setExplanation(q.explanation || "See documentation for details.");
    setSubStats((prev) => {
      const s = prev[q.sub_topic] || { correct: 0, total: 0 };
      return { ...prev, [q.sub_topic]: { correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 } };
    });
    if (isCorrect) setScore((s) => s + 1);
    else setWrongQs((w) => [...w, q.question]);
  }

  function nextQuestion() {
    const q = questions[current];
    if (!answered) {
      setSubStats((prev) => {
        const s = prev[q.sub_topic] || { correct: 0, total: 0 };
        return { ...prev, [q.sub_topic]: { ...s, total: s.total + 1 } };
      });
    }
    if (current + 1 < TOTAL_Q) setCurrent((c) => c + 1);
    else endQuiz();
  }

  function endQuiz(timeout = false) {
    stopTimer();
    saveStats(lsKey, score, wrongQs);
    setStats({ ...loadStats(lsKey), timeout });
    setScreen("result");
  }

  // ── Unknown topic ──────────────────────────────────────────
  if (!config) {
    return (
      <>
        <Navbar />
        <div className="qz-not-found">
          <h2>Quiz topic not found </h2>
          <button onClick={() => navigate("/mock")}>← Back to Topics</button>
        </div>
      </>
    );
  }

  const timerClass = remaining <= 60 ? "urgent" : remaining <= 120 ? "warn" : "";
  const pct        = Math.round((score / TOTAL_Q) * 100);
  const circumf    = 314;
  const offset     = circumf - (pct / 100) * circumf;
  const ringColor  = pct >= 70 ? "var(--green)" : pct >= 40 ? "var(--warn)" : "var(--red)";
  const st         = loadStats(lsKey);
  const hasPrev    = st.totalAttempts > 0;

  return (
    <>
      <Navbar />
      <div className="quiz-wrapper">
        <div className="quiz-shell">

          {/* LOADING */}
          {screen === "loading" && !error && (
            <div className="loading">
              <div className="spinner" />
              Fetching questions…
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="loading" style={{ color: "var(--red)" }}>
              Failed to load questions.<br /><small>{error}</small>
            </div>
          )}

          {/* START */}
          {screen === "start" && (
            <div className="start-screen">
              <div className="icon">{config.icon}</div>
              <h1>{config.label} Quiz</h1>
              <p>{config.description}</p>
              <div className="meta-chips">
                <div className="chip">Questions <span>{TOTAL_Q}</span></div>
                <div className="chip">Time <span>8 min</span></div>
                <div className="chip">Topic <span>{config.chipLabel}</span></div>
              </div>
              {hasPrev && (
                <div className="stats-banner">
                  <div className="stat-item">
                    <div className="stat-val">{st.bestScore}/{TOTAL_Q}</div>
                    <div className="stat-lbl">🏆 Best</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-val">{st.lastScore}/{TOTAL_Q}</div>
                    <div className="stat-lbl">📝 Last</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-val">{st.totalAttempts}</div>
                    <div className="stat-lbl">🔁 Attempts</div>
                  </div>
                </div>
              )}
              <button className="start-btn" onClick={startQuiz}>
                {hasPrev ? "Retry Quiz →" : "Start Quiz →"}
              </button>
            </div>
          )}

          {/* QUIZ */}
          {screen === "quiz" && questions[current] && (
            <>
              <div className="top-bar">
                <div className="q-counter">
                  Question <span>{current + 1}</span> / {TOTAL_Q}
                </div>
                <div className={`timer ${timerClass}`}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
                  </svg>
                  {fmt(remaining)}
                </div>
              </div>

              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${((current + 1) / TOTAL_Q) * 100}%` }} />
              </div>

              <div className="q-body">
                <div className="q-label">{questions[current].sub_topic || config.label}</div>
                <div className="q-text">{questions[current].question}</div>
                <div className="options">
                  {shuffled.map((item, i) => {
                    let cls = "opt";
                    if (answered) {
                      cls += " locked";
                      if (item.opt === questions[current].answer) cls += " correct";
                      else if (selected?.chosen === item.opt && !selected.isCorrect) cls += " wrong";
                    }
                    return (
                      <div key={i} className={cls} onClick={() => selectOpt(item.opt)}>
                        <div className="opt-key">{KEYS[i]}</div>
                        <div className="opt-text">{item.opt}</div>
                      </div>
                    );
                  })}
                </div>
                {answered && <div className="explanation show">{explanation}</div>}
              </div>

              <div className="q-footer">
                <div className="score-pill">Score <span>{score}</span></div>
                <button className="next-btn" disabled={!answered} onClick={nextQuestion}>
                  {current === TOTAL_Q - 1 ? "Finish" : "Next →"}
                </button>
              </div>
            </>
          )}

          {/* RESULT */}
          {screen === "result" && (() => {
            const finalStats = loadStats(lsKey);
            const weak = [], strong = [];
            Object.entries(subStats).forEach(([sub, s]) => {
              (s.total > 0 && s.correct / s.total >= 0.5 ? strong : weak).push(sub);
            });
            let msgHead, msgBody;
            if (stats?.timeout)  { msgHead = "⏰ Time's Up!";               msgBody = `You ran out of time with ${score}/${TOTAL_Q} correct.`; }
            else if (pct === 100){ msgHead = "🏆 Perfect Score!";           msgBody = `Flawless! Strong mastery of ${config.label}.`; }
            else if (pct >= 70)  { msgHead = "🎉 Great Job!";               msgBody = `Solid grasp of ${config.label}. ${weak.length ? "Focus on weak areas below!" : "Keep pushing to 100%!"}`; }
            else if (pct >= 40)  { msgHead = "📚 Keep Practising";          msgBody = "You're on the right track. Revisit the topics below."; }
            else                 { msgHead = "💡 Build a Strong Foundation"; msgBody = "Don't be discouraged. Targeted revision will help a lot!"; }

            return (
              <div className="result-screen">
                <div className="result-ring">
                  <svg viewBox="0 0 110 110" width="120" height="120" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
                    <circle className="ring-bg" cx="55" cy="55" r="50" />
                    <circle className="ring-fill" cx="55" cy="55" r="50"
                      style={{ stroke: ringColor, strokeDashoffset: offset }} />
                  </svg>
                  <div className="result-pct">{pct}%</div>
                </div>

                <div className="result-label">{msgHead}</div>
                <div className="result-score">
                  {score} / {TOTAL_Q} correct{stats?.timeout ? " (time expired)" : ""}
                </div>

                <div className="smart-msg">
                  <div className="msg-head">📊 Your Stats</div>
                  <div className="msg-body">
                    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "12px" }}>
                      <div>🏆 Best &nbsp;<strong>{finalStats.bestScore} / {TOTAL_Q}</strong></div>
                      <div>🔁 Attempts &nbsp;<strong>{finalStats.totalAttempts}</strong></div>
                      <div>📝 This round &nbsp;<strong>{score} / {TOTAL_Q}</strong></div>
                    </div>
                    {wrongQs.length > 0 ? (
                      <>
                        <div style={{ fontSize: ".8rem", color: "var(--muted)", marginBottom: "6px" }}>❌ Wrong this round:</div>
                        <ul style={{ paddingLeft: "16px", fontSize: ".82rem", color: "var(--red)", lineHeight: 2 }}>
                          {wrongQs.map((q, i) => <li key={i}>{q}</li>)}
                        </ul>
                      </>
                    ) : (
                      <div style={{ color: "var(--green)", fontSize: ".88rem" }}>✅ No wrong answers this round!</div>
                    )}
                  </div>
                </div>

                <div className="smart-msg">
                  <div className="msg-head">📋 Personalised Feedback</div>
                  <div className="msg-body">
                    {msgBody}
                    {weak.length > 0 && (
                      <>
                        <div style={{ marginTop: "12px", fontSize: ".8rem", color: "var(--muted)", marginBottom: "6px" }}>Concentrate on:</div>
                        <div className="subtopic-list">{weak.map((s) => <div key={s} className="subtopic-tag">{s}</div>)}</div>
                      </>
                    )}
                    {strong.length > 0 && (
                      <div className="subtopic-list" style={{ marginTop: "10px" }}>
                        {strong.map((s) => <div key={s} className="subtopic-tag ok">✓ {s}</div>)}
                      </div>
                    )}
                  </div>
                </div>

                <button className="retry-btn" onClick={startQuiz}>Retry Quiz ↺</button>
              </div>
            );
          })()}

        </div>
      </div>
    </>
  );
}

export default Quiz;