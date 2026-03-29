import { useState } from "react";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";

const facultyAssignments = [
  { id: 1, title: "Implement Binary Search Tree", subject: "Data Structures", due: "Nov 15, 2024", maxMarks: 20, submissions: 18, total: 24, status: "Active" },
  { id: 2, title: "ER Diagram for Library System", subject: "DBMS", due: "Nov 18, 2024", maxMarks: 15, submissions: 22, total: 24, status: "Active" },
  { id: 3, title: "Process Scheduling Simulation", subject: "Operating Systems", due: "Oct 30, 2024", maxMarks: 25, submissions: 24, total: 24, status: "Closed" },
];

const studentAssignments = [
  { id: 1, title: "Implement Binary Search Tree",    subject: "Data Structures",   due: "Nov 15, 2024", maxMarks: 20, status: "Pending",   marks: null,  feedback: "" },
  { id: 2, title: "ER Diagram for Library System",   subject: "DBMS",              due: "Nov 18, 2024", maxMarks: 15, status: "Submitted", marks: null,  feedback: "" },
  { id: 3, title: "Process Scheduling Simulation",   subject: "Operating Systems", due: "Oct 30, 2024", maxMarks: 25, status: "Graded",    marks: 22,    feedback: "Excellent implementation with clear explanation." },
  { id: 4, title: "Network Topology Design",         subject: "Computer Networks", due: "Nov 20, 2024", maxMarks: 20, status: "Pending",   marks: null,  feedback: "" },
];

const submissions = [
  { student: "Ravi Kumar",   roll: "CGU2021CS001", submittedAt: "Nov 13, 9:30 AM", file: "ravi_bst.pdf",   marks: 18, status: "Graded" },
  { student: "Priya Sharma", roll: "CGU2021CS002", submittedAt: "Nov 14, 2:15 PM", file: "priya_bst.pdf",  marks: null, status: "Submitted" },
  { student: "Amit Singh",   roll: "CGU2021CS003", submittedAt: "Nov 15, 11:00 AM",file: "amit_bst.pdf",   marks: null, status: "Submitted" },
  { student: "Sneha Patel",  roll: "CGU2021CS004", submittedAt: "Nov 12, 4:45 PM", file: "sneha_bst.pdf",  marks: 20, status: "Graded" },
  { student: "Rahul Verma",  roll: "CGU2021CS005", submittedAt: "—",               file: "—",              marks: null, status: "Missing" },
];

const statusBadge = {
  Active:    "badge-emerald",
  Closed:    "badge-slate",
  Pending:   "badge-amber",
  Submitted: "badge-indigo",
  Graded:    "badge-emerald",
  Missing:   "badge-rose",
};

function UploadModal({ assignment, onClose }) {
  const [file,    setFile]    = useState(null);
  const [note,    setNote]    = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!file) return alert("Please select a file.");
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onClose(); }, 2000);
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Submit Assignment</p>
            <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 4 }}>{assignment.title}</p>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: "4px 10px" }}>✕</button>
        </div>

        {success ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>✅</div>
            <p style={{ color: "#34d399", fontWeight: 600, fontSize: "0.9375rem" }}>Submitted Successfully!</p>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* File upload */}
              <div>
                <label className="text-label" style={{ display: "block", marginBottom: 8 }}>Upload File</label>
                <label style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: 8, padding: "28px 20px", borderRadius: 10, cursor: "pointer",
                  border: `2px dashed ${file ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`,
                  background: file ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.02)",
                  transition: "all 0.2s",
                }}>
                  <svg style={{ width: 28, height: 28, color: file ? "#818cf8" : "rgba(148,163,184,0.3)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  <p style={{ margin: 0, fontSize: "0.8125rem", color: file ? "#a5b4fc" : "rgba(148,163,184,0.4)" }}>
                    {file ? file.name : "Click to upload or drag & drop"}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(148,163,184,0.3)" }}>PDF, DOC, ZIP up to 10MB</p>
                  <input type="file" style={{ display: "none" }} accept=".pdf,.doc,.docx,.zip" onChange={e => setFile(e.target.files[0])} />
                </label>
              </div>

              <div>
                <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Note (optional)</label>
                <textarea className="input-field" rows={3} value={note} onChange={e => setNote(e.target.value)}
                  placeholder="Add any notes for your faculty..." style={{ resize: "none" }} />
              </div>

              <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, padding: "10px 14px" }}>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "#fbbf24" }}>
                  ⏰ Due: <strong>{assignment.due}</strong> · Max Marks: <strong>{assignment.maxMarks}</strong>
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={handleSubmit} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                Submit Assignment
              </button>
              <button onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

function Assignments() {
  const user      = JSON.parse(localStorage.getItem("user"));
  const isFaculty = user?.role === "faculty";
  const isAdmin   = user?.role === "admin";
  const isStudent = user?.role === "student";

  const [activeTab,    setActiveTab]    = useState(isFaculty ? "assignments" : "pending");
  const [uploadModal,  setUploadModal]  = useState(null);
  const [gradeInput,   setGradeInput]   = useState({});
  const [gradedSubs,   setGradedSubs]   = useState(submissions);

  const pending = studentAssignments.filter(a => a.status === "Pending");

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Assignments</h1>
        <p className="page-sub">
          {isStudent ? "View, upload and track your assignments"
           : isFaculty ? "Create assignments and review submissions"
           : "All assignments across departments"}
        </p>
      </div>

      {/* ── Student View ── */}
      {isStudent && (
        <>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 14, marginBottom: 20 }}>
            {[
              { label: "Total",     value: studentAssignments.length,                              accent: "stat-indigo",  color: "#818cf8" },
              { label: "Pending",   value: pending.length,                                         accent: "stat-amber",   color: "#fbbf24" },
              { label: "Submitted", value: studentAssignments.filter(a=>a.status==="Submitted").length, accent: "stat-sky", color: "#38bdf8" },
              { label: "Graded",    value: studentAssignments.filter(a=>a.status==="Graded").length,    accent: "stat-emerald", color: "#34d399" },
            ].map(s => (
              <div key={s.label} className={`stat-card ${s.accent}`}>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", margin: "0 0 8px" }}>{s.label}</p>
                <p style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="tab-group" style={{ marginBottom: 20 }}>
            {["pending", "all"].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`tab-item ${activeTab === t ? "active" : ""}`} style={{ textTransform: "capitalize" }}>{t === "all" ? "All Assignments" : "Pending"}</button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(activeTab === "pending" ? pending : studentAssignments).map(a => (
              <div key={a.id} className="card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.9rem" }}>{a.title}</p>
                    <span className={`badge ${statusBadge[a.status]}`}>{a.status}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(148,163,184,0.45)" }}>
                    {a.subject} &nbsp;·&nbsp; Due: {a.due} &nbsp;·&nbsp; Max: {a.maxMarks} marks
                  </p>
                  {a.status === "Graded" && (
                    <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.4)" }}>Score:</span>
                      <span style={{ color: "#34d399", fontWeight: 700, fontSize: "0.9rem" }}>{a.marks}/{a.maxMarks}</span>
                      {a.feedback && <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.5)", fontStyle: "italic" }}>"{a.feedback}"</span>}
                    </div>
                  )}
                </div>
                {a.status === "Pending" && (
                  <button onClick={() => setUploadModal(a)} className="btn-primary" style={{ flexShrink: 0 }}>
                    <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                    Upload
                  </button>
                )}
                {a.status === "Submitted" && (
                  <span style={{ fontSize: "0.78rem", color: "#38bdf8" }}>✓ Awaiting grade</span>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Faculty View ── */}
      {isFaculty && (
        <>
          <div className="tab-group" style={{ marginBottom: 20 }}>
            {["assignments", "submissions"].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`tab-item ${activeTab === t ? "active" : ""}`} style={{ textTransform: "capitalize" }}>{t}</button>
            ))}
          </div>

          {activeTab === "assignments" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {facultyAssignments.map(a => (
                <div key={a.id} className="card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.9rem" }}>{a.title}</p>
                      <span className={`badge ${statusBadge[a.status]}`}>{a.status}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(148,163,184,0.45)" }}>
                      {a.subject} &nbsp;·&nbsp; Due: {a.due} &nbsp;·&nbsp; Max: {a.maxMarks} marks
                    </p>
                    <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                      <div className="progress-track" style={{ width: 80 }}>
                        <div className="progress-fill progress-indigo" style={{ width: `${(a.submissions / a.total) * 100}%` }} />
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.5)" }}>{a.submissions}/{a.total} submitted</span>
                    </div>
                  </div>
                  <button onClick={() => setActiveTab("submissions")} className="btn-secondary" style={{ flexShrink: 0 }}>View Submissions</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === "submissions" && (
            <div className="card" style={{ padding: 24 }}>
              <p className="section-title" style={{ marginBottom: 18 }}>All Submissions — Binary Search Tree</p>
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Student</th><th>Roll No</th><th>Submitted At</th><th>File</th>
                      <th style={{ textAlign: "center" }}>Marks</th>
                      <th style={{ textAlign: "center" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gradedSubs.map((s) => (
                      <tr key={s.roll}>
                        <td className="td-main">
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div className="avatar" style={{ width: 28, height: 28, fontSize: "0.7rem" }}>{s.student[0]}</div>
                            {s.student}
                          </div>
                        </td>
                        <td>{s.roll}</td>
                        <td>{s.submittedAt}</td>
                        <td>
                          {s.file !== "—"
                            ? <span style={{ color: "#818cf8", fontSize: "0.8rem", cursor: "pointer" }}>📎 {s.file}</span>
                            : <span style={{ color: "rgba(148,163,184,0.3)" }}>—</span>}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {s.status === "Graded"
                            ? <span style={{ color: "#34d399", fontWeight: 700 }}>{s.marks}/20</span>
                            : s.status === "Submitted"
                              ? <input type="number" placeholder="—" min={0} max={20}
                                  value={gradeInput[s.roll] || ""}
                                  onChange={e => setGradeInput(p => ({ ...p, [s.roll]: e.target.value }))}
                                  style={{ width: 60, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "4px 8px", color: "#e2e8f0", fontSize: "0.8rem", textAlign: "center" }} />
                              : <span style={{ color: "rgba(148,163,184,0.3)" }}>—</span>}
                        </td>
                        <td style={{ textAlign: "center" }}><span className={`badge ${statusBadge[s.status]}`}>{s.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
                <button className="btn-primary" onClick={() => {
                    setGradedSubs(prev => prev.map(s => ({
                      ...s,
                      marks: gradeInput[s.roll] ? Number(gradeInput[s.roll]) : s.marks,
                      status: gradeInput[s.roll] ? "Graded" : s.status,
                    })));
                    setGradeInput({});
                  }}>Save Grades</button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ── Admin View ── */}
      {isAdmin && (
        <div className="card" style={{ padding: 24 }}>
          <p className="section-title" style={{ marginBottom: 18 }}>All Assignments</p>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr><th>Title</th><th>Subject</th><th>Due Date</th><th style={{ textAlign: "center" }}>Submissions</th><th style={{ textAlign: "center" }}>Status</th></tr>
              </thead>
              <tbody>
                {facultyAssignments.map(a => (
                  <tr key={a.id}>
                    <td className="td-main">{a.title}</td>
                    <td>{a.subject}</td>
                    <td>{a.due}</td>
                    <td style={{ textAlign: "center" }}>{a.submissions}/{a.total}</td>
                    <td style={{ textAlign: "center" }}><span className={`badge ${statusBadge[a.status]}`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {uploadModal && <UploadModal assignment={uploadModal} onClose={() => setUploadModal(null)} />}
    </Layout>
  );
}

export default Assignments;
