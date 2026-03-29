import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getStudentGrades, getAllGrades, createGrade, updateGrade, deleteGrade } from "../services/api";

const gradeStyle = {
  "A+": { bg: "rgba(16,185,129,0.12)",  color: "#34d399", border: "rgba(16,185,129,0.25)" },
  "A":  { bg: "rgba(99,102,241,0.12)",  color: "#818cf8", border: "rgba(99,102,241,0.25)" },
  "B+": { bg: "rgba(14,165,233,0.12)",  color: "#38bdf8", border: "rgba(14,165,233,0.25)" },
  "B":  { bg: "rgba(245,158,11,0.12)",  color: "#fbbf24", border: "rgba(245,158,11,0.25)" },
  "C":  { bg: "rgba(249,115,22,0.12)",  color: "#fb923c", border: "rgba(249,115,22,0.25)" },
  "F":  { bg: "rgba(244,63,94,0.12)",   color: "#fb7185", border: "rgba(244,63,94,0.25)"  },
};

function Grades() {
  const user    = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const isFaculty = user?.role === "faculty";

  const [grades,  setGrades]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [form,    setForm]    = useState({ studentId: "", subject: "", semester: 1, midMarks: 0, endMarks: 0, grade: "B", gradePoints: 7 });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetch = (isAdmin || isFaculty) ? getAllGrades() : getStudentGrades(user.id);
    fetch.then(res => setGrades(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async () => {
    try {
      if (editing) {
        const res = await updateGrade(editing, form);
        setGrades(p => p.map(g => g.id === editing ? res.data : g));
        setEditing(null);
      } else {
        const res = await createGrade(form);
        setGrades(p => [...p, res.data]);
      }
      setForm({ studentId: "", subject: "", semester: 1, midMarks: 0, endMarks: 0, grade: "B", gradePoints: 7 });
      setShowForm(false);
    } catch { alert("Failed to save grade."); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this grade?")) return;
    await deleteGrade(id);
    setGrades(p => p.filter(g => g.id !== id));
  };

  const handleEdit = (g) => {
    setForm({ studentId: g.studentId, subject: g.subject, semester: g.semester, midMarks: g.midMarks, endMarks: g.endMarks, grade: g.grade, gradePoints: g.gradePoints });
    setEditing(g.id);
    setShowForm(true);
  };

  const cgpa = grades.length ? (grades.reduce((s, g) => s + (g.gradePoints || 0), 0) / grades.length).toFixed(2) : "—";
  const highest = grades.length ? Math.max(...grades.map(g => g.totalMarks || 0)) : 0;
  const lowest  = grades.length ? Math.min(...grades.map(g => g.totalMarks || 0)) : 0;

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="page-title">Grades</h1>
          <p className="page-sub">{(isAdmin || isFaculty) ? "Manage student grades" : "Your academic performance"}</p>
        </div>
        {(isAdmin || isFaculty) && (
          <button onClick={() => { setShowForm(p => !p); setEditing(null); }} className="btn-primary">
            {showForm ? "Cancel" : "+ Add Grade"}
          </button>
        )}
      </div>

      {(isAdmin || isFaculty) && showForm && (
        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <p className="section-title" style={{ marginBottom: 16 }}>{editing ? "Edit Grade" : "Add Grade"}</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 12 }}>
            {[
              { label: "Student ID", name: "studentId", type: "number" },
              { label: "Subject",    name: "subject",   type: "text" },
              { label: "Semester",   name: "semester",  type: "number" },
              { label: "Mid Marks",  name: "midMarks",  type: "number" },
              { label: "End Marks",  name: "endMarks",  type: "number" },
              { label: "Grade",      name: "grade",     type: "text" },
              { label: "Grade Points", name: "gradePoints", type: "number" },
            ].map(f => (
              <div key={f.name}>
                <label className="text-label" style={{ display: "block", marginBottom: 6 }}>{f.label}</label>
                <input className="input-field" type={f.type} value={form[f.name]}
                  onChange={e => setForm(p => ({ ...p, [f.name]: f.type === "number" ? Number(e.target.value) : e.target.value }))} />
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} className="btn-primary" style={{ marginTop: 16 }}>
            {editing ? "Update" : "Save Grade"}
          </button>
        </div>
      )}

      {!isAdmin && !isFaculty && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))", gap: 14, marginBottom: 20 }}>
          {[
            { label: "CGPA",     value: cgpa,    accent: "stat-indigo",  color: "#818cf8" },
            { label: "Subjects", value: grades.length, accent: "stat-violet",  color: "#a78bfa" },
            { label: "Highest",  value: highest, accent: "stat-emerald", color: "#34d399" },
            { label: "Lowest",   value: lowest,  accent: "stat-amber",   color: "#fbbf24" },
          ].map(s => (
            <div key={s.label} className={`stat-card ${s.accent}`}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", margin: "0 0 8px" }}>{s.label}</p>
              <p style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="card" style={{ padding: 24 }}>
        <p className="section-title" style={{ marginBottom: 18 }}>
          {(isAdmin || isFaculty) ? "All Grade Records" : "Subject-wise Marks"}
        </p>
        {loading ? (
          <p style={{ color: "rgba(148,163,184,0.4)", textAlign: "center", padding: "24px 0" }}>Loading...</p>
        ) : grades.length === 0 ? (
          <p style={{ color: "rgba(148,163,184,0.4)", textAlign: "center", padding: "24px 0" }}>No grade records found.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr>
                  {(isAdmin || isFaculty) && <th>Student ID</th>}
                  <th>Subject</th>
                  <th style={{ textAlign: "center" }}>Sem</th>
                  <th style={{ textAlign: "center" }}>Mid</th>
                  <th style={{ textAlign: "center" }}>End</th>
                  <th style={{ textAlign: "center" }}>Total</th>
                  <th style={{ textAlign: "center" }}>Grade</th>
                  <th style={{ textAlign: "center" }}>GPA</th>
                  {(isAdmin || isFaculty) && <th style={{ textAlign: "center" }}>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {grades.map(g => {
                  const gs = gradeStyle[g.grade] || gradeStyle["B"];
                  return (
                    <tr key={g.id}>
                      {(isAdmin || isFaculty) && <td style={{ color: "rgba(148,163,184,0.6)" }}>{g.studentId}</td>}
                      <td className="td-main">{g.subject}</td>
                      <td style={{ textAlign: "center" }}>{g.semester}</td>
                      <td style={{ textAlign: "center" }}>{g.midMarks}</td>
                      <td style={{ textAlign: "center" }}>{g.endMarks}</td>
                      <td style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                          <div className="progress-track" style={{ width: 56 }}>
                            <div className="progress-fill progress-indigo" style={{ width: `${g.totalMarks}%` }} />
                          </div>
                          <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.8125rem" }}>{g.totalMarks}</span>
                        </div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <span style={{ background: gs.bg, color: gs.color, border: `1px solid ${gs.border}`, padding: "3px 10px", borderRadius: 20, fontSize: "0.7rem", fontWeight: 700 }}>
                          {g.grade}
                        </span>
                      </td>
                      <td style={{ textAlign: "center", color: "#e2e8f0", fontWeight: 600 }}>{g.gradePoints}</td>
                      {(isAdmin || isFaculty) && (
                        <td style={{ textAlign: "center" }}>
                          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                            <button onClick={() => handleEdit(g)} className="btn-secondary" style={{ padding: "3px 10px", fontSize: "0.72rem" }}>Edit</button>
                            <button onClick={() => handleDelete(g.id)} className="btn-danger" style={{ padding: "3px 10px", fontSize: "0.72rem" }}>Del</button>
                          </div>
                        </td>
                      )}
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

export default Grades;
