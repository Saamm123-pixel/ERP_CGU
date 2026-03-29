import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getUsersByRole, getStudentAttendance, markAttendance } from "../services/api";

function Attendance() {
  const user      = JSON.parse(localStorage.getItem("user"));
  const isFaculty = user?.role === "faculty";
  const isAdmin   = user?.role === "admin";

  const [attendanceList,  setAttendanceList]   = useState([]);
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [submitted,       setSubmitted]       = useState(false);
  const [selectedCourse,  setSelectedCourse]  = useState("Data Structures");

  useEffect(() => {
    if (isFaculty || isAdmin) {
      getUsersByRole("student")
        .then(res => { setAttendanceList(res.data.map(s => ({ ...s, present: false }))); setLoading(false); })
        .catch(() => setLoading(false));
    } else {
      getStudentAttendance(user.id)
        .then(res => { setStudentAttendance(res.data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [isFaculty, isAdmin, user.id]);

  const toggle = (id) =>
    setAttendanceList(prev => prev.map(s => s.id === id ? { ...s, present: !s.present } : s));

  const handleSubmit = async () => {
    try {
      await markAttendance({ subject: selectedCourse, faculty: user.name, students: attendanceList });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch { alert("Failed to submit attendance."); }
  };

  const overall = studentAttendance.length
    ? studentAttendance.reduce((a, s) => a + Number(s.attended), 0) /
      studentAttendance.reduce((a, s) => a + Number(s.total), 0) * 100
    : 0;

  const statCards = [
    { label: "Overall",  value: `${overall.toFixed(1)}%`, accent: overall >= 75 ? "stat-emerald" : "stat-rose", color: overall >= 75 ? "#34d399" : "#fb7185" },
    { label: "Subjects", value: studentAttendance.length,  accent: "stat-indigo",  color: "#818cf8" },
    { label: "Safe",     value: studentAttendance.filter(s => (s.attended/s.total)*100 >= 75).length, accent: "stat-emerald", color: "#34d399" },
    { label: "Short",    value: studentAttendance.filter(s => (s.attended/s.total)*100 < 75).length,  accent: "stat-rose",    color: "#fb7185" },
  ];

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Attendance</h1>
        <p className="page-sub">{isFaculty || isAdmin ? "Mark and manage student attendance" : "Your subject-wise attendance record"}</p>
      </div>

      {/* ── Student view ── */}
      {!isFaculty && !isAdmin && (
        <>
          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 20 }}>
            {statCards.map(s => (
              <div key={s.label} className={`stat-card ${s.accent}`}>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", margin: "0 0 8px" }}>{s.label}</p>
                <p style={{ fontSize: "1.6rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="card" style={{ padding: 24 }}>
            <p className="section-title" style={{ marginBottom: 18 }}>Subject-wise Attendance</p>
            {loading ? (
              <p style={{ color: "rgba(148,163,184,0.4)", textAlign: "center", padding: "24px 0" }}>Loading...</p>
            ) : studentAttendance.length === 0 ? (
              <p style={{ color: "rgba(148,163,184,0.4)", textAlign: "center", padding: "24px 0" }}>No attendance records found.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Faculty</th>
                      <th style={{ textAlign: "center" }}>Total</th>
                      <th style={{ textAlign: "center" }}>Attended</th>
                      <th>Percentage</th>
                      <th style={{ textAlign: "center" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentAttendance.map(a => {
                      const pct = Math.round((Number(a.attended) / Number(a.total)) * 100);
                      return (
                        <tr key={a.subject}>
                          <td className="td-main">{a.subject}</td>
                          <td>{a.faculty}</td>
                          <td style={{ textAlign: "center" }}>{a.total}</td>
                          <td style={{ textAlign: "center" }}>{a.attended}</td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <div className="progress-track" style={{ width: 80 }}>
                                <div className={`progress-fill ${pct >= 75 ? "progress-emerald" : "progress-rose"}`}
                                  style={{ width: `${pct}%` }} />
                              </div>
                              <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{pct}%</span>
                            </div>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <span className={`badge ${pct >= 75 ? "badge-emerald" : "badge-rose"}`}>
                              {pct >= 75 ? "Safe" : "Short"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* ── Faculty / Admin view ── */}
      {(isFaculty || isAdmin) && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 12 }}>
            <div>
              <p className="section-title">Mark Attendance</p>
              <p style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.4)", marginTop: 3 }}>
                {new Date().toDateString()}
              </p>
            </div>
            <select className="input-field" value={selectedCourse}
              onChange={e => setSelectedCourse(e.target.value)}
              style={{ width: "auto", minWidth: 180 }}>
              {["Data Structures", "Operating Systems", "DBMS"].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {submitted && (
            <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: "0.8125rem", color: "#34d399" }}>
              ✅ Attendance for <strong>{selectedCourse}</strong> submitted successfully!
            </div>
          )}

          {loading ? (
            <p style={{ color: "rgba(148,163,184,0.4)", fontSize: "0.875rem", textAlign: "center", padding: "32px 0" }}>Loading students...</p>
          ) : (
            <>
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th style={{ textAlign: "center" }}>Present</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceList.map((s, i) => (
                      <tr key={s.id} style={{ background: s.present ? "rgba(16,185,129,0.04)" : "transparent" }}>
                        <td style={{ color: "rgba(148,163,184,0.3)", width: 40 }}>{i + 1}</td>
                        <td className="td-main">{s.name}</td>
                        <td>{s.email}</td>
                        <td style={{ textAlign: "center" }}>
                          <button onClick={() => toggle(s.id)} style={{
                            width: 30, height: 30, borderRadius: "50%", border: "2px solid",
                            borderColor: s.present ? "#10b981" : "rgba(255,255,255,0.15)",
                            background: s.present ? "#10b981" : "transparent",
                            color: s.present ? "white" : "transparent",
                            cursor: "pointer", fontWeight: 700, fontSize: "0.875rem",
                            transition: "all 0.15s", display: "inline-flex", alignItems: "center", justifyContent: "center",
                          }}>✓</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                <p style={{ fontSize: "0.8125rem", color: "rgba(148,163,184,0.5)", margin: 0 }}>
                  Present: <span style={{ color: "#34d399", fontWeight: 700 }}>{attendanceList.filter(s => s.present).length}</span>
                  {" "}/ {attendanceList.length} &nbsp;·&nbsp;
                  Absent: <span style={{ color: "#fb7185", fontWeight: 700 }}>{attendanceList.filter(s => !s.present).length}</span>
                </p>
                <button onClick={handleSubmit} className="btn-primary">
                  Submit Attendance
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </Layout>
  );
}

export default Attendance;
