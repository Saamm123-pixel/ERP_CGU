import { useState } from "react";
import Layout from "../components/Layout";
import calendarPdf from "../assets/academic-calendar.pdf";

const keyDates = [
  { date: "Jan 6, 2025",   event: "Even Semester Classes Begin",              category: "Academic",  color: "#818cf8" },
  { date: "Jan 26, 2025",  event: "Republic Day — Holiday",                   category: "Holiday",   color: "#fb7185" },
  { date: "Feb 14, 2025",  event: "Mid Semester Examination Begins",          category: "Exam",      color: "#fbbf24" },
  { date: "Feb 22, 2025",  event: "Mid Semester Examination Ends",            category: "Exam",      color: "#fbbf24" },
  { date: "Mar 14, 2025",  event: "Holi — Holiday",                           category: "Holiday",   color: "#fb7185" },
  { date: "Mar 31, 2025",  event: "Last Day of Regular Classes",              category: "Academic",  color: "#818cf8" },
  { date: "Apr 1, 2025",   event: "Preparatory Leave Begins",                 category: "Academic",  color: "#38bdf8" },
  { date: "Apr 10, 2025",  event: "End Semester Examination Begins",          category: "Exam",      color: "#f97316" },
  { date: "Apr 30, 2025",  event: "End Semester Examination Ends",            category: "Exam",      color: "#f97316" },
  { date: "May 1, 2025",   event: "Labour Day — Holiday",                     category: "Holiday",   color: "#fb7185" },
  { date: "May 15, 2025",  event: "Result Declaration",                       category: "Academic",  color: "#34d399" },
  { date: "May 20, 2025",  event: "Summer Vacation Begins",                   category: "Vacation",  color: "#a78bfa" },
];

const categoryBadge = {
  Academic: "badge-indigo",
  Exam:     "badge-amber",
  Holiday:  "badge-rose",
  Vacation: "badge-violet",
};

const categoryColor = {
  Academic: "#818cf8",
  Exam:     "#fbbf24",
  Holiday:  "#fb7185",
  Vacation: "#a78bfa",
};

function AcademicCalendar() {
  const [activeTab, setActiveTab] = useState("calendar");
  const [filter,    setFilter]    = useState("All");

  const categories = ["All", "Academic", "Exam", "Holiday", "Vacation"];
  const filtered   = filter === "All" ? keyDates : keyDates.filter(d => d.category === filter);

  const today = new Date();

  const upcoming = keyDates.filter(d => new Date(d.date) >= today).slice(0, 4);
  const past     = keyDates.filter(d => new Date(d.date) < today).length;

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Academic Calendar</h1>
        <p className="page-sub">Even Semester 2025–26 · CGU College</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total Events",  value: keyDates.length,                                    accent: "stat-indigo",  color: "#818cf8" },
          { label: "Exams",         value: keyDates.filter(d => d.category === "Exam").length,    accent: "stat-amber",   color: "#fbbf24" },
          { label: "Holidays",      value: keyDates.filter(d => d.category === "Holiday").length, accent: "stat-rose",    color: "#fb7185" },
          { label: "Completed",     value: past,                                               accent: "stat-emerald", color: "#34d399" },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.accent}`}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-group" style={{ marginBottom: 20 }}>
        {["calendar", "key dates", "pdf"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`tab-item ${activeTab === t ? "active" : ""}`}
            style={{ textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>

      {/* ── Calendar Tab ── */}
      {activeTab === "calendar" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Upcoming events */}
          <div className="card" style={{ padding: 24 }}>
            <p className="section-title" style={{ marginBottom: 18 }}>Upcoming Events</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {upcoming.length === 0 ? (
                <p style={{ color: "rgba(148,163,184,0.4)", fontSize: "0.875rem", textAlign: "center", padding: "20px 0" }}>No upcoming events.</p>
              ) : upcoming.map((d, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "14px 0",
                  borderBottom: i < upcoming.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}>
                  {/* Date box */}
                  <div style={{
                    width: 52, height: 52, borderRadius: 10, flexShrink: 0,
                    background: `${categoryColor[d.category]}18`,
                    border: `1px solid ${categoryColor[d.category]}35`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{ fontSize: "1rem", fontWeight: 800, color: categoryColor[d.category], lineHeight: 1 }}>
                      {new Date(d.date).getDate()}
                    </span>
                    <span style={{ fontSize: "0.6rem", color: "rgba(148,163,184,0.5)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {new Date(d.date).toLocaleString("default", { month: "short" })}
                    </span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.875rem" }}>{d.event}</p>
                    <p style={{ margin: 0, color: "rgba(148,163,184,0.4)", fontSize: "0.75rem", marginTop: 3 }}>{d.date}</p>
                  </div>
                  <span className={`badge ${categoryBadge[d.category]}`}>{d.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="card" style={{ padding: 24 }}>
            <p className="section-title" style={{ marginBottom: 20 }}>Full Timeline</p>
            <div style={{ position: "relative", paddingLeft: 24 }}>
              {/* Vertical line */}
              <div style={{ position: "absolute", left: 7, top: 0, bottom: 0, width: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {keyDates.map((d, i) => {
                  const isPast = new Date(d.date) < today;
                  return (
                    <div key={i} style={{ display: "flex", gap: 16, paddingBottom: 20, position: "relative" }}>
                      {/* Dot */}
                      <div style={{
                        position: "absolute", left: -17, top: 3,
                        width: 10, height: 10, borderRadius: "50%",
                        background: isPast ? "rgba(148,163,184,0.2)" : d.color,
                        border: `2px solid ${isPast ? "rgba(148,163,184,0.15)" : d.color}`,
                        boxShadow: isPast ? "none" : `0 0 8px ${d.color}60`,
                        flexShrink: 0,
                      }} />
                      <div style={{ opacity: isPast ? 0.45 : 1 }}>
                        <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 500, fontSize: "0.8125rem" }}>{d.event}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                          <span style={{ fontSize: "0.72rem", color: "rgba(148,163,184,0.4)" }}>{d.date}</span>
                          <span className={`badge ${categoryBadge[d.category]}`} style={{ fontSize: "0.65rem", padding: "2px 8px" }}>{d.category}</span>
                          {isPast && <span style={{ fontSize: "0.65rem", color: "rgba(148,163,184,0.3)" }}>✓ Done</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Key Dates Tab ── */}
      {activeTab === "key dates" && (
        <>
          {/* Category filter */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {categories.map(c => (
              <button key={c} onClick={() => setFilter(c)} style={{
                padding: "5px 14px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
                background: filter === c ? "#6366f1" : "rgba(255,255,255,0.05)",
                color: filter === c ? "white" : "rgba(148,163,184,0.6)",
                border: filter === c ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.08)",
              }}>{c}</button>
            ))}
          </div>

          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Event</th>
                    <th style={{ textAlign: "center" }}>Date</th>
                    <th style={{ textAlign: "center" }}>Category</th>
                    <th style={{ textAlign: "center" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d, i) => {
                    const isPast = new Date(d.date) < today;
                    return (
                      <tr key={i}>
                        <td style={{ color: "rgba(148,163,184,0.3)", width: 40 }}>{i + 1}</td>
                        <td className="td-main">{d.event}</td>
                        <td style={{ textAlign: "center", color: "rgba(148,163,184,0.6)", fontSize: "0.8rem" }}>{d.date}</td>
                        <td style={{ textAlign: "center" }}>
                          <span className={`badge ${categoryBadge[d.category]}`}>{d.category}</span>
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {isPast
                            ? <span className="badge badge-slate">Completed</span>
                            : <span className="badge badge-emerald">Upcoming</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ── PDF Tab ── */}
      {activeTab === "pdf" && (
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div>
              <p className="section-title">Academic Calendar PDF</p>
              <p style={{ color: "rgba(148,163,184,0.4)", fontSize: "0.8rem", marginTop: 2 }}>Even Semester 2025–26 · Official Document</p>
            </div>
            <a href={calendarPdf} download="Academic-Calendar-Even-Sem-2025-26.pdf"
              className="btn-primary" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Download PDF
            </a>
          </div>

          {/* PDF Embed */}
          <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.07)" }}>
            <iframe
              src={calendarPdf}
              title="Academic Calendar Even Sem 2025-26"
              style={{ width: "100%", height: "75vh", border: "none", display: "block", background: "#1a1a2e" }}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}

export default AcademicCalendar;
