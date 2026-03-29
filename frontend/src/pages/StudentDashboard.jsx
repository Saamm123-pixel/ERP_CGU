import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getStudentAttendance, getStudentGrades, getNoticesByRole } from "../services/api";

const timeSlots    = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"];
const todayClasses = ["Data Structures", "DBMS", "—", "Computer Networks"];

const gradeColors = {
  "A+": { bg: "rgba(16,185,129,0.12)",  color: "#34d399", border: "rgba(16,185,129,0.25)" },
  "A":  { bg: "rgba(99,102,241,0.12)",  color: "#818cf8", border: "rgba(99,102,241,0.25)" },
  "B+": { bg: "rgba(14,165,233,0.12)",  color: "#38bdf8", border: "rgba(14,165,233,0.25)" },
  "B":  { bg: "rgba(245,158,11,0.12)",  color: "#fbbf24", border: "rgba(245,158,11,0.25)" },
};

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [grades,     setGrades]     = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [notices,    setNotices]    = useState([]);

  useEffect(() => {
    const userId = user.id;
    getStudentGrades(userId).then(r => setGrades(r.data)).catch(() => {});
    getStudentAttendance(userId).then(r => setAttendance(r.data)).catch(() => {});
    getNoticesByRole("student").then(r => setNotices(r.data.slice(0, 4))).catch(() => {});
  }, [user.id]);

  const cgpa = grades.length
    ? (grades.reduce((s, g) => s + (g.gradePoints || 0), 0) / grades.length).toFixed(1)
    : "—";

  const overallAttendance = attendance.length
    ? Math.round(attendance.reduce((s, a) => s + Number(a.attended), 0) / attendance.reduce((s, a) => s + Number(a.total), 0) * 100)
    : 0;

  const statCards = [
    { label: "Attendance", value: attendance.length ? `${overallAttendance}%` : "—", accent: "stat-emerald", iconCls: "stat-icon-emerald", icon: "📋", color: "#34d399" },
    { label: "CGPA",       value: cgpa,                                                accent: "stat-indigo",  iconCls: "stat-icon-indigo",  icon: "📊", color: "#818cf8" },
    { label: "Backlogs",   value: grades.filter(g => g.grade === "F").length,          accent: "stat-rose",    iconCls: "stat-icon-rose",    icon: "⚠️", color: "#fb7185" },
    { label: "Subjects",   value: grades.length || "—",                                accent: "stat-violet",  iconCls: "stat-icon-violet",  icon: "🎓", color: "#a78bfa" },
  ];

  const noticeColors = ["#a78bfa", "#38bdf8", "#fb7185", "#fbbf24"];

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user?.name} 👋</h1>
        <p className="page-sub">Student Portal</p>
      </div>

      <div className="grid-stats section-mb">
        {statCards.map(s => (
          <div key={s.label} className={`stat-card ${s.accent}`}>
            <div className={`stat-icon-box-sm ${s.iconCls}`}>{s.icon}</div>
            <p className="stat-value" style={{ color: s.color }}>{s.value}</p>
            <p className="stat-label">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid-2col section-mb-sm">
        <div className="card card-p20">
          <p className="section-title section-mb-sm">Today's Classes</p>
          <div className="flex-col gap-8">
            {todayClasses.map((cls, i) => (
              <div key={`slot-${i}`} className={cls === "—" ? "class-slot class-slot-empty" : "class-slot class-slot-active"}>
                <span className="class-slot-time">{timeSlots[i]}</span>
                <span className={cls === "—" ? "class-slot-empty-name" : "class-slot-name"}>{cls}</span>
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
                <p>{n.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

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
                  <th className="th-center">Mid (30)</th>
                  <th className="th-center">End (70)</th>
                  <th className="th-center">Total</th>
                  <th className="th-center">Grade</th>
                </tr>
              </thead>
              <tbody>
                {grades.map(g => {
                  const gc = gradeColors[g.grade] || gradeColors["B"];
                  return (
                    <tr key={g.id}>
                      <td className="td-main">{g.subject}</td>
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
