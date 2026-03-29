import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";
import { getUsersByRole, deleteUser, banUser, unbanUser } from "../services/api";

function BanModal({ target, onClose, onDone }) {
  const [reason, setReason] = useState("");
  const [days,   setDays]   = useState(1);
  const [busy,   setBusy]   = useState(false);

  const submit = async () => {
    if (!reason.trim()) return alert("Please enter a reason.");
    setBusy(true);
    try {
      await banUser(target.id, { reason, days: String(days) });
      onDone(); onClose();
    } catch { alert("Failed to ban user."); }
    finally { setBusy(false); }
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Ban User</h3>
            <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 4 }}>
              Restricting access for <span style={{ color: "#e2e8f0", fontWeight: 600 }}>{target.name}</span>
            </p>
          </div>
          <button onClick={onClose} className="btn-secondary" style={{ padding: "6px 10px" }}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Reason</label>
            <input className="input-field" type="text" value={reason}
              onChange={e => setReason(e.target.value)} placeholder="e.g. Academic misconduct, Cheating..." />
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
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={submit} disabled={busy} className="btn-danger"
            style={{ flex: 1, justifyContent: "center", opacity: busy ? 0.6 : 1 }}>
            {busy ? "Banning..." : "Confirm Ban"}
          </button>
          <button onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function UserTable({ users, type, onDelete, onBan, onUnban }) {
  if (!users.length) return (
    <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(148,163,184,0.4)", fontSize: "0.875rem" }}>
      No {type}s registered yet.
    </div>
  );
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Email</th>
            <th style={{ textAlign: "center" }}>Role</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u.id}>
              <td style={{ width: 40, color: "rgba(148,163,184,0.3)", fontSize: "0.75rem" }}>{i + 1}</td>
              <td className="td-main">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="avatar" style={{ width: 30, height: 30, fontSize: "0.75rem", flexShrink: 0 }}>
                    {u.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 500, fontSize: "0.8125rem" }}>{u.name}</p>
                    {u.banned && u.banReason && (
                      <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(251,113,133,0.7)", marginTop: 1 }}>{u.banReason}</p>
                    )}
                  </div>
                </div>
              </td>
              <td style={{ fontSize: "0.8rem" }}>{u.email}</td>
              <td style={{ textAlign: "center" }}>
                <span className={`badge ${type === "student" ? "badge-sky" : "badge-emerald"}`}>{type}</span>
              </td>
              <td style={{ textAlign: "center" }}>
                {u.banned
                  ? <span className="badge badge-rose">Banned</span>
                  : <span className="badge badge-emerald">Active</span>}
              </td>
              <td style={{ textAlign: "center" }}>
                <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                  {u.banned
                    ? <button onClick={() => onUnban(u.id, type)} className="btn-success" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>Unban</button>
                    : <button onClick={() => onBan(u)} className="btn-secondary" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>Ban</button>
                  }
                  <button onClick={() => onDelete(u.id, type)} className="btn-danger" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminDashboard() {
  const location   = useLocation();
  const defaultTab = location.pathname.includes("/students") ? "students"
                   : location.pathname.includes("/faculty")  ? "faculty"
                   : "overview";

  const [activeTab, setActiveTab] = useState(defaultTab);
  const [students,  setStudents]  = useState([]);
  const [faculty,   setFaculty]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [banTarget, setBanTarget] = useState(null);

  useEffect(() => {
    setActiveTab(
      location.pathname.includes("/students") ? "students" :
      location.pathname.includes("/faculty")  ? "faculty"  : "overview"
    );
  }, [location.pathname]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [s, f] = await Promise.all([getUsersByRole("student"), getUsersByRole("faculty")]);
      setStudents(s.data);
      setFaculty(f.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []); // eslint-disable-line

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      if (type === "student") setStudents(p => p.filter(u => u.id !== id));
      else setFaculty(p => p.filter(u => u.id !== id));
    } catch { alert("Failed to delete."); }
  };

  const handleUnban = async (id, type) => {
    try {
      await unbanUser(id);
      const upd = list => list.map(u => u.id === id ? { ...u, banned: false, banReason: null, banUntil: null } : u);
      if (type === "student") setStudents(upd); else setFaculty(upd);
    } catch { alert("Failed to unban."); }
  };

  const bannedCount = [...students, ...faculty].filter(u => u.banned).length;

  const statCards = [
    { label: "Total Students",   value: students.length,  icon: "👨‍🎓", accent: "stat-indigo",  iconCls: "stat-icon-indigo",  change: "+3 this week" },
    { label: "Total Faculty",    value: faculty.length,   icon: "👨‍🏫", accent: "stat-emerald", iconCls: "stat-icon-emerald", change: "+1 this month" },
    { label: "Departments",      value: 12,               icon: "🏛️",  accent: "stat-violet",  iconCls: "stat-icon-violet",  change: "CSE, ECE, MBA..." },
    { label: "Active Courses",   value: 48,               icon: "📚",  accent: "stat-amber",   iconCls: "stat-icon-amber",   change: "Sem 5 ongoing" },
    { label: "Banned Accounts",  value: bannedCount,      icon: "🚫",  accent: "stat-rose",    iconCls: "stat-icon-rose",    change: "Needs review" },
    { label: "Notices Posted",   value: 14,               icon: "📢",  accent: "stat-sky",     iconCls: "stat-icon-sky",     change: "This semester" },
  ];

  const recentActivity = [
    { action: "New student registered",       name: "Ravi Kumar",    time: "2 mins ago",   color: "#34d399" },
    { action: "Faculty account created",      name: "Dr. Mehta",     time: "1 hour ago",   color: "#818cf8" },
    { action: "Fee payment received",         name: "Priya Sharma",  time: "3 hours ago",  color: "#38bdf8" },
    { action: "Complaint submitted",          name: "Amit Singh",    time: "5 hours ago",  color: "#fbbf24" },
    { action: "Gate pass approved",           name: "Sneha Patel",   time: "Yesterday",    color: "#a78bfa" },
    { action: "Notice posted",                name: "Admin",         time: "Yesterday",    color: "#fb7185" },
  ];

  const departments = [
    { name: "Computer Science",     students: 120, faculty: 8,  color: "#818cf8" },
    { name: "Electronics",          students: 95,  faculty: 6,  color: "#34d399" },
    { name: "Mechanical",           students: 80,  faculty: 5,  color: "#38bdf8" },
    { name: "Civil Engineering",    students: 70,  faculty: 5,  color: "#fbbf24" },
    { name: "MBA",                  students: 60,  faculty: 4,  color: "#a78bfa" },
  ];

  const notices = [
    { text: "End semester exam schedule for Sem 5 released.", color: "#818cf8", date: "Today" },
    { text: "Faculty meeting scheduled for Friday at 10 AM.", color: "#34d399", date: "Today" },
    { text: "New elective course registration open till 30th.", color: "#f59e0b", date: "Yesterday" },
    { text: "Annual sports day confirmed for 15th November.", color: "#fb7185", date: "2 days ago" },
    { text: "Library extended hours during exam week.", color: "#38bdf8", date: "3 days ago" },
  ];

  return (
    <Layout>
      {banTarget && <BanModal target={banTarget} onClose={() => setBanTarget(null)} onDone={fetchAll} />}

      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-sub">Manage students, faculty and college operations</p>
      </div>

      {/* Tabs */}
      <div className="tab-group" style={{ marginBottom: 24 }}>
        {["overview", "students", "faculty"].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
            style={{ textTransform: "capitalize" }}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      {activeTab === "overview" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {statCards.map(s => (
              <div key={s.label} className={`stat-card ${s.accent}`}>
                <div className={s.iconCls} style={{ width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: 14 }}>
                  {s.icon}
                </div>
                <p style={{ fontSize: "1.75rem", fontWeight: 700, color: "#f1f5f9", margin: 0, lineHeight: 1 }}>
                  {loading ? "—" : s.value}
                </p>
                <p style={{ fontSize: "0.8rem", color: "rgba(148,163,184,0.5)", marginTop: 6 }}>{s.label}</p>
                <p style={{ fontSize: "0.7rem", color: "rgba(148,163,184,0.3)", marginTop: 4 }}>{s.change}</p>
              </div>
            ))}
          </div>

          {/* Activity + Notices */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

            {/* Recent Activity */}
            <div className="card" style={{ padding: 20 }}>
              <p className="section-title" style={{ marginBottom: 16 }}>Recent Activity</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {recentActivity.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < recentActivity.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: "0.8rem", color: "#e2e8f0" }}>{a.action}</p>
                      <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(148,163,184,0.4)", marginTop: 2 }}>{a.name}</p>
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "rgba(148,163,184,0.3)", flexShrink: 0 }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Notices */}
            <div className="card" style={{ padding: 20 }}>
              <p className="section-title" style={{ marginBottom: 16 }}>Recent Notices</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {notices.map((n, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 0", borderBottom: i < notices.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: n.color, marginTop: 5, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(148,163,184,0.7)", lineHeight: 1.5 }}>{n.text}</p>
                      <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(148,163,184,0.3)", marginTop: 2 }}>{n.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Departments */}
          <div className="card" style={{ padding: 20 }}>
            <p className="section-title" style={{ marginBottom: 16 }}>Department Overview</p>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th style={{ textAlign: "center" }}>Students</th>
                    <th style={{ textAlign: "center" }}>Faculty</th>
                    <th>Strength</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map(d => (
                    <tr key={d.name}>
                      <td className="td-main">
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: d.color, flexShrink: 0 }} />
                          {d.name}
                        </div>
                      </td>
                      <td style={{ textAlign: "center" }}><span className="badge badge-sky">{d.students}</span></td>
                      <td style={{ textAlign: "center" }}><span className="badge badge-emerald">{d.faculty}</span></td>
                      <td style={{ width: 160 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
                            <div style={{ width: `${(d.students / 120) * 100}%`, height: "100%", borderRadius: 3, background: d.color }} />
                          </div>
                          <span style={{ fontSize: "0.7rem", color: "rgba(148,163,184,0.4)" }}>{d.students}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick stats */}
          <div className="card" style={{ padding: 20 }}>
            <p className="section-title" style={{ marginBottom: 16 }}>System Summary</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12 }}>
              {[
                { label: "Students Enrolled",   value: loading ? "—" : students.length,  color: "#818cf8" },
                { label: "Faculty Members",      value: loading ? "—" : faculty.length,   color: "#34d399" },
                { label: "Banned Accounts",      value: loading ? "—" : bannedCount,      color: "#fb7185" },
                { label: "Active Departments",   value: 12,                               color: "#f59e0b" },
                { label: "Total Courses",        value: 48,                               color: "#38bdf8" },
                { label: "Pending Complaints",   value: 3,                                color: "#a78bfa" },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span style={{ fontSize: "0.8rem", color: "rgba(148,163,184,0.5)" }}>{r.label}</span>
                  <span style={{ fontSize: "1rem", fontWeight: 700, color: r.color }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Students ── */}
      {activeTab === "students" && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <p className="section-title">Student Records</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(148,163,184,0.4)", marginTop: 2 }}>
                {loading ? "Loading..." : `${students.length} registered students`}
              </p>
            </div>
            <span className="badge badge-sky">{loading ? "—" : students.length} total</span>
          </div>
          {loading
            ? <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(148,163,184,0.3)" }}>Loading students...</div>
            : <UserTable users={students} type="student" onDelete={handleDelete} onBan={setBanTarget} onUnban={handleUnban} />
          }
        </div>
      )}

      {/* ── Faculty ── */}
      {activeTab === "faculty" && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <p className="section-title">Faculty Records</p>
              <p style={{ fontSize: "0.8rem", color: "rgba(148,163,184,0.4)", marginTop: 2 }}>
                {loading ? "Loading..." : `${faculty.length} registered faculty members`}
              </p>
            </div>
            <span className="badge badge-emerald">{loading ? "—" : faculty.length} total</span>
          </div>
          {loading
            ? <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(148,163,184,0.3)" }}>Loading faculty...</div>
            : <UserTable users={faculty} type="faculty" onDelete={handleDelete} onBan={setBanTarget} onUnban={handleUnban} />
          }
        </div>
      )}
    </Layout>
  );
}

export default AdminDashboard;
