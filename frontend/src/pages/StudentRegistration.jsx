import { useState } from "react";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";

const registrationTypes = [
  {
    id: 1, type: "Course Registration", icon: "📚", color: "#818cf8",
    bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)",
    deadline: "Apr 20, 2025", status: "Open",
    desc: "Register for elective and open courses for the upcoming semester.",
  },
  {
    id: 2, type: "Exam Registration", icon: "📝", color: "#fb7185",
    bg: "rgba(244,63,94,0.08)", border: "rgba(244,63,94,0.2)",
    deadline: "Apr 25, 2025", status: "Open",
    desc: "Register for end semester examinations. Hall ticket will be issued after registration.",
  },
  {
    id: 3, type: "Workshop Registration", icon: "🔧", color: "#34d399",
    bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)",
    deadline: "May 5, 2025", status: "Open",
    desc: "Register for technical workshops and skill development programs.",
  },
  {
    id: 4, type: "Hostel Registration", icon: "🏠", color: "#fbbf24",
    bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)",
    deadline: "May 10, 2025", status: "Open",
    desc: "Apply for hostel accommodation for the next academic year.",
  },
  {
    id: 5, type: "Sports Registration", icon: "⚽", color: "#f97316",
    bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.2)",
    deadline: "Apr 28, 2025", status: "Closed",
    desc: "Register for inter-college sports events and annual sports day.",
  },
  {
    id: 6, type: "Internship Registration", icon: "💼", color: "#a78bfa",
    bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.2)",
    deadline: "Jun 1, 2025", status: "Open",
    desc: "Register for summer internship programs with partner companies.",
  },
];

const myRegistrations = [
  { type: "Course Registration",   submittedOn: "Apr 5, 2025",  status: "Approved",  remarks: "Elective CS-E01 allotted." },
  { type: "Exam Registration",     submittedOn: "Apr 12, 2025", status: "Pending",   remarks: "Under review." },
  { type: "Workshop Registration", submittedOn: "Apr 15, 2025", status: "Approved",  remarks: "Slot confirmed for May 6." },
];

const allRegistrations = [
  { student: "Ravi Kumar",   roll: "CGU2021CS001", type: "Course Registration",   date: "Apr 5",  status: "Approved" },
  { student: "Priya Sharma", roll: "CGU2021CS002", type: "Exam Registration",     date: "Apr 8",  status: "Pending"  },
  { student: "Amit Singh",   roll: "CGU2021CS003", type: "Hostel Registration",   date: "Apr 10", status: "Approved" },
  { student: "Sneha Patel",  roll: "CGU2021CS004", type: "Course Registration",   date: "Apr 6",  status: "Rejected" },
  { student: "Rahul Verma",  roll: "CGU2021CS005", type: "Internship Registration",date: "Apr 14",status: "Pending"  },
];

const statusBadge = { Approved: "badge-emerald", Pending: "badge-amber", Rejected: "badge-rose" };

function RegisterModal({ reg, onClose, onSubmit }) {
  const [form, setForm] = useState({ reason: "", semester: "5th", notes: "" });
  const [done, setDone] = useState(false);

  const handleSubmit = () => {
    setDone(true);
    onSubmit(reg.type);
    setTimeout(() => { setDone(false); onClose(); }, 2000);
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: 480 }}>
        {done ? (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>✅</div>
            <p style={{ color: "#34d399", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Registration Submitted!</p>
            <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 6 }}>Your {reg.type} has been submitted for approval.</p>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>{reg.type}</p>
                <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 4 }}>Deadline: {reg.deadline}</p>
              </div>
              <button onClick={onClose} className="btn-secondary" style={{ padding: "4px 10px" }}>✕</button>
            </div>

            <div style={{ background: `${reg.bg}`, border: `1px solid ${reg.border}`, borderRadius: 8, padding: "10px 14px", marginBottom: 18 }}>
              <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(148,163,184,0.7)" }}>{reg.desc}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Current Semester</label>
                <select className="input-field" value={form.semester} onChange={e => setForm(p => ({ ...p, semester: e.target.value }))}>
                  {["1st","2nd","3rd","4th","5th","6th","7th","8th"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Purpose / Reason</label>
                <input className="input-field" value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} placeholder="Brief reason for registration..." />
              </div>
              <div>
                <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Additional Notes (optional)</label>
                <textarea className="input-field" rows={3} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} style={{ resize: "none" }} placeholder="Any additional information..." />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={handleSubmit} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Submit Registration</button>
              <button onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

function StudentRegistration() {
  const user    = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const [activeTab, setActiveTab] = useState("register");
  const [modal,     setModal]     = useState(null);
  const [myRegs,    setMyRegs]    = useState(myRegistrations);

  const [allRegs, setAllRegs] = useState(allRegistrations);

  const handleAction = (i, action) => {
    setAllRegs(p => p.map((r, idx) => idx === i ? { ...r, status: action === "approve" ? "Approved" : "Rejected" } : r));
  };

  const handleSubmit = (type) => {
    setMyRegs(p => [...p, { type, submittedOn: new Date().toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"}), status: "Pending", remarks: "Under review." }]);
  };

  return (
    <Layout>
      {modal && <RegisterModal reg={modal} onClose={() => setModal(null)} onSubmit={handleSubmit} />}

      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Student Registration</h1>
        <p className="page-sub">{isAdmin ? "Manage all student registrations" : "Register for courses, exams, workshops and more"}</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14, marginBottom: 20 }}>
        {(isAdmin ? [
          { label: "Total",    value: allRegistrations.length,                                    accent: "stat-indigo",  color: "#818cf8" },
          { label: "Approved", value: allRegistrations.filter(r=>r.status==="Approved").length,   accent: "stat-emerald", color: "#34d399" },
          { label: "Pending",  value: allRegistrations.filter(r=>r.status==="Pending").length,    accent: "stat-amber",   color: "#fbbf24" },
          { label: "Rejected", value: allRegistrations.filter(r=>r.status==="Rejected").length,   accent: "stat-rose",    color: "#fb7185" },
        ] : [
          { label: "Open",      value: registrationTypes.filter(r=>r.status==="Open").length,     accent: "stat-emerald", color: "#34d399" },
          { label: "My Regs",   value: myRegs.length,                                             accent: "stat-indigo",  color: "#818cf8" },
          { label: "Approved",  value: myRegs.filter(r=>r.status==="Approved").length,            accent: "stat-violet",  color: "#a78bfa" },
          { label: "Pending",   value: myRegs.filter(r=>r.status==="Pending").length,             accent: "stat-amber",   color: "#fbbf24" },
        ]).map(s => (
          <div key={s.label} className={`stat-card ${s.accent}`}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Student view */}
      {!isAdmin && (
        <>
          <div className="tab-group" style={{ marginBottom: 20 }}>
            {["register","my registrations"].map(t => (
              <button key={t} onClick={() => setActiveTab(t)} className={`tab-item ${activeTab===t?"active":""}`} style={{ textTransform: "capitalize" }}>{t}</button>
            ))}
          </div>

          {activeTab === "register" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
              {registrationTypes.map(r => (
                <div key={r.id} className="card" style={{ padding: 20, borderTop: `2px solid ${r.color}`, opacity: r.status === "Closed" ? 0.6 : 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: r.bg, border: `1px solid ${r.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
                      {r.icon}
                    </div>
                    <div>
                      <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.875rem" }}>{r.type}</p>
                      <span className={`badge ${r.status === "Open" ? "badge-emerald" : "badge-slate"}`} style={{ marginTop: 4, display: "inline-block" }}>{r.status}</span>
                    </div>
                  </div>
                  <p style={{ margin: "0 0 12px", fontSize: "0.8rem", color: "rgba(148,163,184,0.6)", lineHeight: 1.6 }}>{r.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.72rem", color: "rgba(148,163,184,0.4)" }}>Deadline: {r.deadline}</span>
                    {r.status === "Open" && (
                      <button onClick={() => setModal(r)} className="btn-primary" style={{ padding: "5px 14px", fontSize: "0.75rem" }}>Register</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "my registrations" && (
            <div className="card" style={{ padding: 24 }}>
              <p className="section-title" style={{ marginBottom: 18 }}>My Registrations</p>
              {myRegs.length === 0 ? (
                <div style={{ textAlign: "center", padding: "32px 0", color: "rgba(148,163,184,0.4)" }}>No registrations yet.</div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead><tr><th>Type</th><th style={{ textAlign: "center" }}>Submitted On</th><th style={{ textAlign: "center" }}>Status</th><th>Remarks</th></tr></thead>
                    <tbody>
                      {myRegs.map((r, i) => (
                        <tr key={i}>
                          <td className="td-main">{r.type}</td>
                          <td style={{ textAlign: "center", color: "rgba(148,163,184,0.5)", fontSize: "0.8rem" }}>{r.submittedOn}</td>
                          <td style={{ textAlign: "center" }}><span className={`badge ${statusBadge[r.status]}`}>{r.status}</span></td>
                          <td style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>{r.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Admin view */}
      {isAdmin && (
        <div className="card" style={{ padding: 24 }}>
          <p className="section-title" style={{ marginBottom: 18 }}>All Registrations</p>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead><tr><th>Student</th><th>Roll No</th><th>Type</th><th style={{ textAlign: "center" }}>Date</th><th style={{ textAlign: "center" }}>Status</th><th style={{ textAlign: "center" }}>Action</th></tr></thead>
              <tbody>
                {allRegs.map((r, i) => (
                  <tr key={i}>
                    <td className="td-main">
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="avatar" style={{ width: 28, height: 28, fontSize: "0.7rem" }}>{r.student[0]}</div>
                        {r.student}
                      </div>
                    </td>
                    <td style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>{r.roll}</td>
                    <td>{r.type}</td>
                    <td style={{ textAlign: "center", fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>{r.date}</td>
                    <td style={{ textAlign: "center" }}><span className={`badge ${statusBadge[r.status]}`}>{r.status}</span></td>
                    <td style={{ textAlign: "center" }}>
                      {r.status === "Pending" && (
                        <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                          <button onClick={() => handleAction(i, "approve")} className="btn-success" style={{ padding: "3px 10px", fontSize: "0.72rem" }}>Approve</button>
                          <button onClick={() => handleAction(i, "reject")}  className="btn-danger"  style={{ padding: "3px 10px", fontSize: "0.72rem" }}>Reject</button>
                        </div>
                      )}
                      {r.status !== "Pending" && <span style={{ color: "rgba(148,163,184,0.3)", fontSize: "0.78rem" }}>—</span>}
                    </td>
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

export default StudentRegistration;
