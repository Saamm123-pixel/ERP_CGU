import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";
import { getUsersByRole, banUser, unbanUser } from "../services/api";

const myCourses = [
  { code: "CS501", name: "Data Structures",   schedule: "Mon, Wed 9AM" },
  { code: "CS502", name: "Operating Systems", schedule: "Tue, Thu 11AM" },
  { code: "CS503", name: "DBMS",              schedule: "Mon, Fri 1PM" },
];

function BanModal({ target, onClose, onBan }) {
  const [reason, setReason] = useState("");
  const [days,   setDays]   = useState(1);
  const [busy,   setBusy]   = useState(false);

  const handleBan = async () => {
    if (!reason.trim()) return alert("Enter a reason.");
    setBusy(true);
    try { await banUser(target.id, { reason, days: String(days) }); onBan(target.id, reason); onClose(); }
    catch { alert("Failed to ban."); } finally { setBusy(false); }
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Ban Student</p>
            <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 4 }}>
              Restricting: <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{target.name}</span>
            </p>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: "4px 10px" }}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Reason</label>
            <input className="input-field" type="text" value={reason} onChange={e => setReason(e.target.value)} placeholder="e.g. Misconduct, Cheating..." />
          </div>
          <div>
            <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Duration</label>
            <select className="input-field" value={days} onChange={e => setDays(Number(e.target.value))}>
              {[[1,"1 Day"],[3,"3 Days"],[7,"1 Week"],[14,"2 Weeks"],[30,"1 Month"]].map(([v,l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <button onClick={handleBan} disabled={busy} className="btn-danger" style={{ flex: 1, justifyContent: "center", opacity: busy ? 0.6 : 1 }}>
            {busy ? "Banning..." : "Confirm Ban"}
          </button>
          <button onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function StudentTable({ students, loading, onBan, onUnban }) {
  if (loading) return <p style={{ color: "rgba(148,163,184,0.4)", fontSize: "0.875rem", padding: "24px 0", textAlign: "center" }}>Loading students...</p>;
  if (!students.length) return <p style={{ color: "rgba(148,163,184,0.4)", fontSize: "0.875rem", padding: "24px 0", textAlign: "center" }}>No students registered yet.</p>;
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Email</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={s.id}>
              <td style={{ color: "rgba(148,163,184,0.3)", width: 40 }}>{i + 1}</td>
              <td className="td-main">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="avatar" style={{ width: 28, height: 28, fontSize: "0.7rem", flexShrink: 0 }}>{s.name?.[0]?.toUpperCase()}</div>
                  <div>
                    <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 500, fontSize: "0.8125rem" }}>{s.name}</p>
                    {s.banned && s.banReason && <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(251,113,133,0.7)", marginTop: 1 }}>{s.banReason}</p>}
                  </div>
                </div>
              </td>
              <td style={{ fontSize: "0.8rem" }}>{s.email}</td>
              <td style={{ textAlign: "center" }}>
                {s.banned ? <span className="badge badge-rose">Banned</span> : <span className="badge badge-emerald">Active</span>}
              </td>
              <td style={{ textAlign: "center" }}>
                {s.banned
                  ? <button onClick={() => onUnban(s.id)} className="btn-success" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>Unban</button>
                  : <button onClick={() => onBan(s)} className="btn-secondary" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>Ban</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FacultyDashboard() {
  const user        = JSON.parse(localStorage.getItem("user"));
  const location    = useLocation();
  const showStudents = location.pathname.includes("/students");
  const [students,  setStudents]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [banModal,  setBanModal]  = useState(null);

  useEffect(() => {
    getUsersByRole("student").then(r => { setStudents(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleBanned = (id, reason) => setStudents(p => p.map(s => s.id === id ? { ...s, banned: true, banReason: reason } : s));
  const handleUnban  = async (id) => {
    try { await unbanUser(id); setStudents(p => p.map(s => s.id === id ? { ...s, banned: false, banReason: null } : s)); }
    catch { alert("Failed to unban."); }
  };

  const statCards = [
    { label: "Courses",       value: myCourses.length,                                       accent: "stat-indigo",  iconCls: "stat-icon-indigo",  icon: "📚", color: "#818cf8" },
    { label: "Students",      value: loading ? "—" : students.length,                        accent: "stat-emerald", iconCls: "stat-icon-emerald", icon: "🎓", color: "#34d399" },
    { label: "Banned",        value: loading ? "—" : students.filter(s => s.banned).length,  accent: "stat-rose",    iconCls: "stat-icon-rose",    icon: "🚫", color: "#fb7185" },
    { label: "Classes Today", value: 2,                                                       accent: "stat-amber",   iconCls: "stat-icon-amber",   icon: "📅", color: "#fbbf24" },
  ];

  return (
    <Layout>
      {banModal && <BanModal target={banModal} onClose={() => setBanModal(null)} onBan={handleBanned} />}

      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">{showStudents ? "Students" : `Welcome, ${user?.name} 👋`}</h1>
        <p className="page-sub">{showStudents ? `${students.length} registered students` : "Department of CSE · Faculty ID: CGU-FAC-021"}</p>
      </div>

      {showStudents ? (
        <div className="card" style={{ padding: 24 }}>
          <StudentTable students={students} loading={loading} onBan={setBanModal} onUnban={handleUnban} />
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 14, marginBottom: 20 }}>
            {statCards.map(s => (
              <div key={s.label} className={`stat-card ${s.accent}`}>
                <div className={s.iconCls} style={{ width: 38, height: 38, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", marginBottom: 12 }}>
                  {s.icon}
                </div>
                <p style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, margin: 0, lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.5)", marginTop: 6 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {/* Courses */}
            <div className="card" style={{ padding: 20 }}>
              <p className="section-title" style={{ marginBottom: 14 }}>My Courses</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {myCourses.map(c => (
                  <div key={c.code} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "rgba(14,165,233,0.06)", border: "1px solid rgba(14,165,233,0.15)" }}>
                    <div>
                      <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 500, fontSize: "0.8125rem" }}>{c.name}</p>
                      <p style={{ margin: 0, color: "rgba(148,163,184,0.4)", fontSize: "0.7rem", marginTop: 2 }}>{c.code} · {c.schedule}</p>
                    </div>
                    <span className="badge badge-sky">{loading ? "—" : students.length}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notices */}
            <div className="card" style={{ padding: 20 }}>
              <p className="section-title" style={{ marginBottom: 14 }}>Notices</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {[
                  { color: "#a78bfa", text: "Submit grade sheets by 25th Nov." },
                  { color: "#38bdf8", text: "Faculty development program on 12th Nov." },
                  { color: "#fb7185", text: "Exam duty roster released." },
                  { color: "#fbbf24", text: "Research paper deadline: 30th Nov." },
                ].map((n, i, arr) => (
                  <div key={n.text} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: n.color, marginTop: 5, flexShrink: 0 }} />
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(148,163,184,0.7)", lineHeight: 1.5 }}>{n.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Students preview */}
          <div className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <p className="section-title">Recent Students</p>
              <span className="badge badge-slate">{students.length} total</span>
            </div>
            <StudentTable students={students.slice(0, 5)} loading={loading} onBan={setBanModal} onUnban={handleUnban} />
          </div>
        </>
      )}
    </Layout>
  );
}

export default FacultyDashboard;
