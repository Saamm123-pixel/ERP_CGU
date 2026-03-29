import { useState } from "react";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";

const quizzes = [
  { id: 1, title: "Data Structures — Unit 2",       subject: "Data Structures",   faculty: "Dr. Raj Vikram",  duration: 20, questions: 10, marks: 10, deadline: "Apr 15, 2025", status: "Active",   attempted: false, score: null },
  { id: 2, title: "DBMS — SQL Fundamentals",         subject: "DBMS",              faculty: "Dr. Verma",       duration: 15, questions: 10, marks: 10, deadline: "Apr 18, 2025", status: "Active",   attempted: true,  score: 8  },
  { id: 3, title: "Operating Systems — Scheduling",  subject: "Operating Systems", faculty: "Prof. Joshi",     duration: 25, questions: 15, marks: 15, deadline: "Apr 10, 2025", status: "Closed",   attempted: true,  score: 12 },
  { id: 4, title: "Computer Networks — Unit 1",      subject: "Computer Networks", faculty: "Dr. Raj Vikram",  duration: 20, questions: 10, marks: 10, deadline: "Apr 25, 2025", status: "Active",   attempted: false, score: null },
  { id: 5, title: "Software Engineering — SDLC",     subject: "Software Engg.",    faculty: "Prof. Sharma",    duration: 15, questions: 10, marks: 10, deadline: "May 2, 2025",  status: "Upcoming", attempted: false, score: null },
];

const sampleQuestions = [
  { q: "Which data structure uses LIFO principle?",         options: ["Queue","Stack","Tree","Graph"],          ans: 1 },
  { q: "What is the time complexity of binary search?",     options: ["O(n)","O(n²)","O(log n)","O(1)"],       ans: 2 },
  { q: "Which sorting algorithm has best average case?",    options: ["Bubble","Selection","Merge","Insertion"],ans: 2 },
  { q: "A complete binary tree with n nodes has height?",   options: ["n","log n","n/2","2n"],                  ans: 1 },
  { q: "Which traversal visits root first?",                options: ["Inorder","Postorder","Preorder","BFS"],  ans: 2 },
];

const facultyQuizzes = [
  { id: 1, title: "Data Structures — Unit 2",      subject: "Data Structures",   created: "Apr 5, 2025",  deadline: "Apr 15, 2025", attempted: 18, total: 24, avgScore: 7.2, status: "Active"   },
  { id: 2, title: "DBMS — SQL Fundamentals",        subject: "DBMS",              created: "Apr 8, 2025",  deadline: "Apr 18, 2025", attempted: 22, total: 24, avgScore: 8.1, status: "Active"   },
  { id: 3, title: "OS — Process Scheduling",        subject: "Operating Systems", created: "Mar 28, 2025", deadline: "Apr 10, 2025", attempted: 24, total: 24, avgScore: 9.0, status: "Closed"   },
];

const statusBadge = {
  Active:   "badge-emerald",
  Closed:   "badge-slate",
  Upcoming: "badge-amber",
};

function QuizModal({ quiz, onClose, onSubmit }) {
  const [current,  setCurrent]  = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [submitted,setSubmitted]= useState(false);
  const [score,    setScore]    = useState(0);

  const handleAnswer = (idx) => setAnswers(p => ({ ...p, [current]: idx }));

  const handleSubmit = () => {
    let s = 0;
    sampleQuestions.forEach((q, i) => { if (answers[i] === q.ans) s++; });
    setScore(s);
    setSubmitted(true);
    onSubmit(quiz.id, s);
  };

  const pct = Math.round((current / sampleQuestions.length) * 100);

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: 560 }}>
        {submitted ? (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>{score >= 4 ? "🎉" : "📝"}</div>
            <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>Quiz Submitted!</p>
            <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 6, marginBottom: 20 }}>{quiz.title}</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 12, padding: "14px 28px", marginBottom: 24 }}>
              <span style={{ fontSize: "2rem", fontWeight: 800, color: "#818cf8" }}>{score}</span>
              <span style={{ color: "rgba(148,163,184,0.5)", fontSize: "1rem" }}>/ {sampleQuestions.length}</span>
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              <button onClick={onClose} className="btn-primary">Done</button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "0.9375rem", margin: 0 }}>{quiz.title}</p>
                <p style={{ color: "rgba(148,163,184,0.45)", fontSize: "0.78rem", marginTop: 3 }}>
                  Question {current + 1} of {sampleQuestions.length} · {quiz.marks} marks
                </p>
              </div>
              <button onClick={onClose} className="btn-secondary" style={{ padding: "4px 10px" }}>✕</button>
            </div>

            {/* Progress */}
            <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 99, height: 4, marginBottom: 20, overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#6366f1,#818cf8)", width: `${pct}%`, transition: "width 0.3s" }} />
            </div>

            {/* Question */}
            <div style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 10, padding: "16px 18px", marginBottom: 16 }}>
              <p style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.9rem", margin: 0, lineHeight: 1.5 }}>
                Q{current + 1}. {sampleQuestions[current].q}
              </p>
            </div>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {sampleQuestions[current].options.map((opt, i) => {
                const selected = answers[current] === i;
                return (
                  <button key={i} onClick={() => handleAnswer(i)} style={{
                    textAlign: "left", padding: "11px 16px", borderRadius: 8, cursor: "pointer",
                    background: selected ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${selected ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.07)"}`,
                    color: selected ? "#a5b4fc" : "#94a3b8",
                    fontWeight: selected ? 600 : 400, fontSize: "0.8125rem",
                    transition: "all 0.15s",
                  }}>
                    <span style={{ marginRight: 10, color: selected ? "#818cf8" : "rgba(148,163,184,0.3)", fontWeight: 700 }}>
                      {["A","B","C","D"][i]}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button onClick={() => setCurrent(p => Math.max(0, p - 1))} className="btn-secondary"
                disabled={current === 0} style={{ opacity: current === 0 ? 0.4 : 1 }}>← Previous</button>
              <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.4)" }}>
                {Object.keys(answers).length}/{sampleQuestions.length} answered
              </span>
              {current < sampleQuestions.length - 1
                ? <button onClick={() => setCurrent(p => p + 1)} className="btn-primary">Next →</button>
                : <button onClick={handleSubmit} className="btn-primary"
                    disabled={Object.keys(answers).length < sampleQuestions.length}
                    style={{ opacity: Object.keys(answers).length < sampleQuestions.length ? 0.5 : 1 }}>
                    Submit Quiz
                  </button>
              }
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

function Quiz() {
  const user      = JSON.parse(localStorage.getItem("user"));
  const isFaculty = user?.role === "faculty";
  const isAdmin   = user?.role === "admin";
  const isStudent = user?.role === "student";

  const [activeTab,  setActiveTab]  = useState("available");
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [quizList,   setQuizList]   = useState(quizzes);

  const handleSubmit = (id, score) => {
    setQuizList(p => p.map(q => q.id === id ? { ...q, attempted: true, score } : q));
  };

  const available = quizList.filter(q => q.status === "Active" && !q.attempted);
  const completed = quizList.filter(q => q.attempted);
  const upcoming  = quizList.filter(q => q.status === "Upcoming");

  const stats = isStudent ? [
    { label: "Total Quizzes",  value: quizList.length,   accent: "stat-indigo",  color: "#818cf8" },
    { label: "Available",      value: available.length,  accent: "stat-emerald", color: "#34d399" },
    { label: "Completed",      value: completed.length,  accent: "stat-violet",  color: "#a78bfa" },
    { label: "Avg Score",      value: completed.length ? `${(completed.filter(q=>q.score!==null).reduce((s,q)=>s+q.score,0)/completed.filter(q=>q.score!==null).length).toFixed(1)}` : "—", accent: "stat-amber", color: "#fbbf24" },
  ] : [
    { label: "Total Quizzes",  value: facultyQuizzes.length,                                    accent: "stat-indigo",  color: "#818cf8" },
    { label: "Active",         value: facultyQuizzes.filter(q=>q.status==="Active").length,     accent: "stat-emerald", color: "#34d399" },
    { label: "Total Attempts", value: facultyQuizzes.reduce((s,q)=>s+q.attempted,0),            accent: "stat-violet",  color: "#a78bfa" },
    { label: "Avg Score",      value: (facultyQuizzes.reduce((s,q)=>s+q.avgScore,0)/facultyQuizzes.length).toFixed(1), accent: "stat-amber", color: "#fbbf24" },
  ];

  const QuizCard = ({ q }) => (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.9rem" }}>{q.title}</p>
            <span className={`badge ${statusBadge[q.status]}`}>{q.status}</span>
            {q.attempted && <span className="badge badge-indigo">Attempted</span>}
          </div>
          <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(148,163,184,0.45)" }}>
            {q.subject} · {q.faculty} · {q.questions} Qs · {q.marks} marks · {q.duration} min
          </p>
          <p style={{ margin: "4px 0 0", fontSize: "0.75rem", color: "rgba(148,163,184,0.35)" }}>Deadline: {q.deadline}</p>
        </div>
        {q.attempted && q.score !== null && (
          <div style={{ textAlign: "center", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: "8px 16px", flexShrink: 0 }}>
            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#818cf8", lineHeight: 1 }}>{q.score}</p>
            <p style={{ margin: 0, fontSize: "0.65rem", color: "rgba(148,163,184,0.4)", marginTop: 2 }}>/ {q.marks}</p>
          </div>
        )}
      </div>
      {isStudent && q.status === "Active" && !q.attempted && (
        <button onClick={() => setActiveQuiz(q)} className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 4 }}>
          Start Quiz
        </button>
      )}
    </div>
  );

  return (
    <Layout>
      {activeQuiz && <QuizModal quiz={activeQuiz} onClose={() => setActiveQuiz(null)} onSubmit={handleSubmit} />}

      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Quizzes</h1>
        <p className="page-sub">{isStudent ? "Attempt quizzes and track your scores" : "Manage quizzes and view student performance"}</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} className={`stat-card ${s.accent}`}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Student view */}
      {isStudent && (
        <>
          <div className="tab-group" style={{ marginBottom: 20 }}>
            {["available","completed","upcoming"].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`tab-item ${activeTab===t?"active":""}`} style={{ textTransform: "capitalize" }}>{t}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(activeTab==="available" ? available : activeTab==="completed" ? completed : upcoming).map(q => <QuizCard key={q.id} q={q} />)}
            {((activeTab==="available"&&available.length===0)||(activeTab==="completed"&&completed.length===0)||(activeTab==="upcoming"&&upcoming.length===0)) && (
              <div className="card" style={{ padding: 40, textAlign: "center", color: "rgba(148,163,184,0.4)" }}>No quizzes in this category.</div>
            )}
          </div>
        </>
      )}

      {/* Faculty / Admin view */}
      {(isFaculty || isAdmin) && (
        <div className="card" style={{ padding: 24 }}>
          <p className="section-title" style={{ marginBottom: 18 }}>Quiz Overview</p>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th><th>Subject</th><th>Deadline</th>
                  <th style={{ textAlign: "center" }}>Attempted</th>
                  <th style={{ textAlign: "center" }}>Avg Score</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {facultyQuizzes.map(q => (
                  <tr key={q.id}>
                    <td className="td-main">{q.title}</td>
                    <td>{q.subject}</td>
                    <td>{q.deadline}</td>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                        <div style={{ width: 50, background: "rgba(255,255,255,0.07)", borderRadius: 99, height: 4, overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: 99, background: "#6366f1", width: `${(q.attempted/q.total)*100}%` }} />
                        </div>
                        <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.6)" }}>{q.attempted}/{q.total}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: "center", color: "#fbbf24", fontWeight: 700 }}>{q.avgScore}</td>
                    <td style={{ textAlign: "center" }}><span className={`badge ${statusBadge[q.status]}`}>{q.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Quiz;
