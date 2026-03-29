import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getStudentAttendance, getStudentGrades, getNoticesByRole, getStudentFees } from "../services/api";

const timeSlots    = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"];
const todayClasses = ["Data Structures", "DBMS", "—", "Computer Networks", "Software Engineering"];

const gradeColors = {
  "A+": { bg: "rgba(16,185,129,0.12)",  color: "#34d399", border: "rgba(16,185,129,0.25)" },
  "A":  { bg: "rgba(99,102,241,0.12)",  color: "#818cf8", border: "rgba(99,102,241,0.25)" },
  "B+": { bg: "rgba(14,165,233,0.12)",  color: "#38bdf8", border: "rgba(14,165,233,0.25)" },
  "B":  { bg: "rgba(245,158,11,0.12)",  color: "#fbbf24", border: "rgba(245,158,11,0.25)" },
  "C":  { bg: "rgba(251,113,133,0.12)", color: "#fb7185", border: "rgba(251,113,133,0.25)" },
  "F":  { bg: "rgba(239,68,68,0.12)",   color: "#ef4444", border: "rgba(239,68,68,0.25)" },
};

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [grades,     setGrades]     = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [notices,    setNotices]    = useState([]);
  const [fees,       setFees]       = useState([]);

  useEffect(() => {
    const id = user.id;
    getStudentGrades(id).then(r => setGrades(r.data)).catch(() => {});
    getStudentAttendance(id).then(r => setAttendance(r.data)).catch(() => {});
    getNoticesByRole("student").then(r => setNotices(r.data.slice(0, 5))).catch(() => {});
    getStudentFees(id).then(r => setFees(r.data)).catch(() => {});
  }, [user.id]);

  const cgpa = grades.length
    ? (grades.reduce((s, g) => s + (g.gradePoints || 0), 0) / grades.length).toFixed(2)
    : "—";

  const totalAttended = attendance.reduce((s, a) => s + Number(a.attended), 0);
  const totalClasses  = attendance.reduce((s, a) => s + Number(a.total), 0);
  const overallAttendance = totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 0;

  const totalFees = fees.reduce((s, f) => s + f.totalAmount, 0);
  const paidFees  = fees.reduce((s, f) => s + f.paidAmount, 0);
  const dueFees   = fees.reduce((s, f) => s + f.dueAmount, 0);

  const statCards = [
    { label: "Attendance",   value: attendance.length ? `${overallAttendance}%` : "—", accent: "stat-emerald", iconCls: "stat-icon-emerald", icon: "📋", color: "#34d399", sub: `${totalAttended}/${totalClasses} classes` },
    { label: "CGPA",         value: cgpa,                                               accent: "stat-indigo",  iconCls: "stat-icon-indigo",  icon: "📊", color: "#818cf8", sub: `${grades.length} subjects` },
    { label: "Fee Due",      value: dueFees > 0 ? `₹${dueFees.toLocaleString()}` : "Nil", accent: "stat-rose", iconCls: "stat-icon-rose",    icon: "💰", color: "#fb7185", sub: `Paid ₹${paidFees.toLocaleString()}` },
    { label: "Backlogs",     value: grades.filter(g => g.grade === "F").length,         accent: "stat-amber",   iconCls: "stat-icon-amber",   icon: "⚠️", color: "#fbbf24", sub: grades.length ? "subjects" : "No data" },
  ];

  const noticeColors = ["#a78bfa", "#38bdf8", "#fb7185", "#fbbf24", "#34d399"];

  const upcomingEvents = [
    { event: "Mid Semester Exam",      date: "Nov 15",  color: "#fb7185" },
    { event: "Assignment Submission",  date: "Nov 18",  color: "#fbbf24" },
    { event: "Sports Day",             date: "Nov 20",  color: "#34d399" },
    { event: "Project Presentation",   date: "Nov 25",  color: "#818cf8" },
    { event: "End Semester Exam",      date: "Dec 1",   color: "#38bdf8" },
  ];

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user?.name} 👋</h1>
        <p className="page-sub">Student Portal · {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      {/* Stat cards */}
      <div className="grid-stats section-mb">
        {statCards.map(s => (
          <div key={s.label} className={`stat-card ${s.accent}`}>
            <div className={`stat-icon-box-sm ${s.iconCls}`}>{s.icon}</div>
            <p className="stat-value" style={{ color: s.color }}>{s.value}</p>
            <p className="stat-label">{s.label}</p>
            <p style={{ fontSize: "0.7rem", color: "rgba(148,163,184,0.35)", marginTop: 2 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Today's Classes + Notices */}
      <div className="grid-2col section-mb-sm">
        <div className="card card-p20">
          <p className="section-title section-mb-sm">Today's Schedule</p>
          <div className="flex-col gap-8">
            {todayClasses.map((cls, i) => (
              <div key={`slot-${i}`} className={cls === "—" ? "class-slot class-slot-empty" : "class-slot class-slot-active"}>
                <span className="class-slot-time">{timeSlots[i]}</span>
                <span className={cls === "—" ? "class-slot-empty-name" : "class-slot-name"}>{cls}</span>
                {cls !== "—" && <span style={{ fontSize: "0.7rem", color: "rgba(148,163,184,0.35)", marginLeft: "auto" }}>Room 2{i + 1}0</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="card card-p20">
          <p className="section-title section-mb-sm">Recent Notices</p>
          <div className="flex-col">
            {notices.length === 0 ? (
              <p style={{ color: "rgba(148,163,184,0.4)", fontSize: "0.8rem" }}>No notices.</p>
            ) : notices.map((n, i) => (
              <div key={n.id} className="notice-row">
                <span className="notice-dot" style={{ background: noticeColors[i % noticeColors.length] }} />
                <div>
                  <p style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(148,163,184,0.8)" }}>{n.title}</p>
                  <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(148,163,184,0.35)", marginTop: 2 }}>{n.postedDate}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance + Upcoming Events */}
      <div className="grid-2col section-mb-sm">
        <div className="card card-p20">
          <p className="section-title section-mb-sm">Attendance by Subject</p>
          {attendance.length === 0 ? (
            <p style={{ color: "rgba(148,163,184,0.4)", fontSize: "0.8rem", textAlign: "center", padding: "20px 0" }}>No attendance records yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {attendance.map((a, i) => {
                const pct = Math.round((Number(a.attended) / Number(a.total)) * 100);
                const color = pct >= 75 ? "#34d399" : pct >= 60 ? "#fbbf24" : "#fb7185";
                return (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: "0.8rem", color: "#e2e8f0" }}>{a.subject}</span>
                      <span style={{ fontSize: "0.8rem", fontWeight: 600, color }}>{pct}%</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)" }}>
                      <div style={{ width: `${pct}%`, height: "100%", borderRadius: 3, background: color, transition: "width 0.5s" }} />
                    </div>
                    <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(148,163,184,0.35)", marginTop: 3 }}>{a.attended}/{a.total} classes attended</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card card-p20">
          <p className="section-title section-mb-sm">Upcoming Events</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {upcomingEvents.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < upcomingEvents.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: `${e.color}18`, border: `1px solid ${e.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: e.color }}>{e.date}</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(148,163,184,0.7)" }}>{e.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grade Card */}
      <div className="card card-p24">
        <div className="flex-between section-mb-sm">
          <p className="section-title">Grade Card</p>
          <div className="flex-center gap-6">
            <span className="text-muted-xs">CGPA</span>
            <span className="fs-2xl fw-700 text-indigo">{cgpa}</span>
          </div>
        </div>
        {grades.length === 0 ? (
          <p style={{ color: "rgba(148,163,184,0.4)", textAlign: "center", padding: "24px 0" }}>No grade records yet.</p>
        ) : (
          <div className="overflow-x">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th className="th-center">Semester</th>
                  <th className="th-center">Mid (30)</th>
                  <th className="th-center">End (70)</th>
                  <th className="th-center">Total</th>
                  <th className="th-center">Grade</th>
                  <th className="th-center">Points</th>
                </tr>
              </thead>
              <tbody>
                {grades.map(g => {
                  const gc = gradeColors[g.grade] || gradeColors["B"];
                  return (
                    <tr key={g.id}>
                      <td className="td-main">{g.subject}</td>
                      <td style={{ textAlign: "center", fontSize: "0.8rem" }}>Sem {g.semester}</td>
                      <td className="td-center">{g.midMarks}</td>
                      <td className="td-center">{g.endMarks}</td>
                      <td className="td-center">
                        <div className="progress-with-label">
                          <div className="progress-track" style={{ width: 60 }}>
                            <div className="progress-fill progress-indigo" style={{ width: `${g.totalMarks}%` }} />
                          </div>
                          <span className="progress-label">{g.totalMarks}</span>
                        </div>
                      </td>
                      <td className="td-center">
                        <span className="grade-badge" style={{ background: gc.bg, color: gc.color, border: `1px solid ${gc.border}` }}>
                          {g.grade}
                        </span>
                      </td>
                      <td className="td-center" style={{ color: "#818cf8", fontWeight: 600 }}>{g.gradePoints}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default StudentDashboard;
