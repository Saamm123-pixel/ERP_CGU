import { useState } from "react";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";

const companies = [
  { id: 1, name: "Google",       role: "SDE Intern",           type: "Internship", stipend: "₹80,000/mo", package: null,      deadline: "Nov 25, 2024", eligible: "7.5+ CGPA", status: "Open",   logo: "G",  color: "#818cf8" },
  { id: 2, name: "Microsoft",    role: "Software Engineer",    type: "Placement",  stipend: null,          package: "₹28 LPA", deadline: "Nov 28, 2024", eligible: "7.0+ CGPA", status: "Open",   logo: "M",  color: "#38bdf8" },
  { id: 3, name: "Amazon",       role: "SDE-1",                type: "Placement",  stipend: null,          package: "₹32 LPA", deadline: "Dec 2, 2024",  eligible: "6.5+ CGPA", status: "Open",   logo: "A",  color: "#fbbf24" },
  { id: 4, name: "Infosys",      role: "Systems Engineer",     type: "Placement",  stipend: null,          package: "₹6.5 LPA",deadline: "Dec 5, 2024",  eligible: "6.0+ CGPA", status: "Open",   logo: "I",  color: "#34d399" },
  { id: 5, name: "Flipkart",     role: "Product Intern",       type: "Internship", stipend: "₹60,000/mo", package: null,      deadline: "Nov 20, 2024", eligible: "7.0+ CGPA", status: "Closed", logo: "F",  color: "#fb7185" },
  { id: 6, name: "Wipro",        role: "Project Engineer",     type: "Placement",  stipend: null,          package: "₹5.5 LPA",deadline: "Dec 8, 2024",  eligible: "6.0+ CGPA", status: "Open",   logo: "W",  color: "#a78bfa" },
  { id: 7, name: "TCS",          role: "Assistant System Eng", type: "Placement",  stipend: null,          package: "₹7 LPA",  deadline: "Dec 10, 2024", eligible: "6.0+ CGPA", status: "Open",   logo: "T",  color: "#f97316" },
  { id: 8, name: "Razorpay",     role: "Backend Intern",       type: "Internship", stipend: "₹70,000/mo", package: null,      deadline: "Nov 30, 2024", eligible: "7.5+ CGPA", status: "Open",   logo: "R",  color: "#6ee7b7" },
];

const myApplications = [
  { company: "Google",    role: "SDE Intern",        type: "Internship", appliedOn: "Nov 10, 2024", status: "Shortlisted", color: "#818cf8" },
  { company: "Microsoft", role: "Software Engineer", type: "Placement",  appliedOn: "Nov 12, 2024", status: "Applied",     color: "#38bdf8" },
  { company: "Flipkart",  role: "Product Intern",    type: "Internship", appliedOn: "Nov 8, 2024",  status: "Rejected",    color: "#fb7185" },
];

const placedStudents = [
  { name: "Arjun Mehta",   company: "Google",    package: "₹42 LPA",  type: "Placement",  batch: "2024" },
  { name: "Sneha Patel",   company: "Microsoft", package: "₹28 LPA",  type: "Placement",  batch: "2024" },
  { name: "Rahul Verma",   company: "Amazon",    package: "₹32 LPA",  type: "Placement",  batch: "2024" },
  { name: "Priya Sharma",  company: "Razorpay",  package: "₹70k/mo",  type: "Internship", batch: "2024" },
  { name: "Kavya Nair",    company: "Flipkart",  package: "₹60k/mo",  type: "Internship", batch: "2024" },
];

const appStatusBadge = {
  Applied:     "badge-indigo",
  Shortlisted: "badge-amber",
  Selected:    "badge-emerald",
  Rejected:    "badge-rose",
};

function ApplyModal({ job, onClose }) {
  const [step,   setStep]   = useState(1);
  const [resume, setResume] = useState(null);
  const [cover,  setCover]  = useState("");

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: 480 }}>
        {step === 1 ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Apply for {job.role}</p>
                <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 4 }}>{job.name} · {job.type}</p>
              </div>
              <button onClick={onClose} className="btn-secondary" style={{ padding: "4px 10px" }}>✕</button>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 14, marginBottom: 18 }}>
              {[
                { label: "Package / Stipend", value: job.package || job.stipend },
                { label: "Deadline",          value: job.deadline },
                { label: "Eligibility",       value: job.eligible },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.4)" }}>{r.label}</span>
                  <span style={{ fontSize: "0.78rem", color: "#e2e8f0", fontWeight: 500 }}>{r.value}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label className="text-label" style={{ display: "block", marginBottom: 8 }}>Upload Resume</label>
                <label style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                  padding: "20px", borderRadius: 10, cursor: "pointer",
                  border: `2px dashed ${resume ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`,
                  background: resume ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.02)",
                }}>
                  <svg style={{ width: 24, height: 24, color: resume ? "#818cf8" : "rgba(148,163,184,0.3)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: resume ? "#a5b4fc" : "rgba(148,163,184,0.4)" }}>
                    {resume ? resume.name : "Click to upload PDF / DOC"}
                  </p>
                  <input type="file" style={{ display: "none" }} accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files[0])} />
                </label>
              </div>
              <div>
                <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Cover Note (optional)</label>
                <textarea className="input-field" rows={3} value={cover} onChange={e => setCover(e.target.value)}
                  placeholder="Why are you a good fit for this role?" style={{ resize: "none" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={() => { if (!resume) return alert("Please upload your resume."); setStep(2); }}
                className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>
                Submit Application
              </button>
              <button onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>🎉</div>
            <p style={{ color: "#34d399", fontWeight: 700, fontSize: "1.1rem", margin: 0 }}>Application Submitted!</p>
            <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 8, marginBottom: 24 }}>
              Your application for <strong style={{ color: "#e2e8f0" }}>{job.role}</strong> at <strong style={{ color: "#e2e8f0" }}>{job.name}</strong> has been sent.
            </p>
            <button onClick={onClose} className="btn-primary" style={{ margin: "0 auto" }}>Done</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function Placement() {
  const user     = JSON.parse(localStorage.getItem("user"));
  const isAdmin  = user?.role === "admin";
  const isFaculty = user?.role === "faculty";
  const [activeTab, setActiveTab] = useState("drives");
  const [applyJob,  setApplyJob]  = useState(null);
  const [filter,    setFilter]    = useState("All");

  const filtered = filter === "All" ? companies : companies.filter(c => c.type === filter);

  const stats = [
    { label: "Companies",   value: companies.length,                              accent: "stat-indigo",  color: "#818cf8" },
    { label: "Open Drives", value: companies.filter(c => c.status === "Open").length, accent: "stat-emerald", color: "#34d399" },
    { label: "Placements",  value: companies.filter(c => c.type === "Placement").length, accent: "stat-violet", color: "#a78bfa" },
    { label: "Internships", value: companies.filter(c => c.type === "Internship").length, accent: "stat-amber", color: "#fbbf24" },
  ];

  return (
    <Layout>
      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}

      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Placement & Internship</h1>
        <p className="page-sub">
          {isAdmin || isFaculty ? "Manage campus recruitment drives and track placements"
            : "Explore job opportunities and track your applications"}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 14, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} className={`stat-card ${s.accent}`}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-group" style={{ marginBottom: 20 }}>
        {(isAdmin || isFaculty
          ? ["drives", "placed students"]
          : ["drives", "my applications", "placed students"]
        ).map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`tab-item ${activeTab === t ? "active" : ""}`}
            style={{ textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>

      {/* ── Drives ── */}
      {activeTab === "drives" && (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
            {["All", "Placement", "Internship"].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: "5px 14px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
                background: filter === f ? "#6366f1" : "rgba(255,255,255,0.05)",
                color: filter === f ? "white" : "rgba(148,163,184,0.6)",
                border: filter === f ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.08)",
              }}>{f}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 14 }}>
            {filtered.map(c => (
              <div key={c.id} className="card" style={{ padding: 20, borderTop: `2px solid ${c.color}`, opacity: c.status === "Closed" ? 0.6 : 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: `${c.color}20`, border: `1px solid ${c.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1.1rem", color: c.color, flexShrink: 0 }}>
                      {c.logo}
                    </div>
                    <div>
                      <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 700, fontSize: "0.9rem" }}>{c.name}</p>
                      <p style={{ margin: 0, color: "rgba(148,163,184,0.5)", fontSize: "0.75rem", marginTop: 2 }}>{c.role}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                    <span className={`badge ${c.type === "Placement" ? "badge-violet" : "badge-sky"}`}>{c.type}</span>
                    <span className={`badge ${c.status === "Open" ? "badge-emerald" : "badge-slate"}`}>{c.status}</span>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
                  {[
                    { label: c.type === "Internship" ? "Stipend" : "Package", value: c.stipend || c.package },
                    { label: "Deadline",    value: c.deadline },
                    { label: "Eligibility", value: c.eligible },
                  ].map(r => (
                    <div key={r.label} style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.4)" }}>{r.label}</span>
                      <span style={{ fontSize: "0.75rem", color: "#e2e8f0", fontWeight: 500 }}>{r.value}</span>
                    </div>
                  ))}
                </div>

                {!isAdmin && !isFaculty && c.status === "Open" && (
                  <button onClick={() => setApplyJob(c)} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                    Apply Now
                  </button>
                )}
                {(isAdmin || isFaculty) && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: "center", fontSize: "0.75rem" }}>View Applicants</button>
                    <button className="btn-secondary" style={{ flex: 1, justifyContent: "center", fontSize: "0.75rem" }}>Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── My Applications ── */}
      {activeTab === "my applications" && (
        <div className="card" style={{ padding: 24 }}>
          <p className="section-title" style={{ marginBottom: 18 }}>My Applications</p>
          {myApplications.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(148,163,184,0.4)" }}>No applications yet.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr><th>Company</th><th>Role</th><th>Type</th><th>Applied On</th><th style={{ textAlign: "center" }}>Status</th></tr>
                </thead>
                <tbody>
                  {myApplications.map((a, i) => (
                    <tr key={i}>
                      <td className="td-main">
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 6, background: `${a.color}20`, border: `1px solid ${a.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.75rem", color: a.color }}>
                            {a.company[0]}
                          </div>
                          {a.company}
                        </div>
                      </td>
                      <td>{a.role}</td>
                      <td><span className={`badge ${a.type === "Placement" ? "badge-violet" : "badge-sky"}`}>{a.type}</span></td>
                      <td>{a.appliedOn}</td>
                      <td style={{ textAlign: "center" }}><span className={`badge ${appStatusBadge[a.status]}`}>{a.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* ── Placed Students ── */}
      {activeTab === "placed students" && (
        <div className="card" style={{ padding: 24 }}>
          <p className="section-title" style={{ marginBottom: 18 }}>Placed Students — Batch 2024</p>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr><th>Student</th><th>Company</th><th>Type</th><th style={{ textAlign: "right" }}>Package / Stipend</th><th style={{ textAlign: "center" }}>Batch</th></tr>
              </thead>
              <tbody>
                {placedStudents.map((s, i) => (
                  <tr key={i}>
                    <td className="td-main">
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="avatar" style={{ width: 28, height: 28, fontSize: "0.7rem" }}>{s.name[0]}</div>
                        {s.name}
                      </div>
                    </td>
                    <td>{s.company}</td>
                    <td><span className={`badge ${s.type === "Placement" ? "badge-violet" : "badge-sky"}`}>{s.type}</span></td>
                    <td style={{ textAlign: "right", color: "#34d399", fontWeight: 700 }}>{s.package}</td>
                    <td style={{ textAlign: "center" }}>{s.batch}</td>
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

export default Placement;
