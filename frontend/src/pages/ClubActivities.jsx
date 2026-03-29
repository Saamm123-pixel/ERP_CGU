import { useState } from "react";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";

const clubs = [
  { id: 1, name: "Coding Club",        category: "Technical",   members: 84,  lead: "Arjun Mehta",    icon: "💻", color: "#818cf8", bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.25)",  desc: "Competitive programming, hackathons and open source contributions.", joined: true  },
  { id: 2, name: "Robotics Club",       category: "Technical",   members: 42,  lead: "Sneha Patel",    icon: "🤖", color: "#38bdf8", bg: "rgba(14,165,233,0.1)",  border: "rgba(14,165,233,0.25)",  desc: "Build and program robots for national level competitions.",          joined: false },
  { id: 3, name: "Photography Club",    category: "Arts",        members: 56,  lead: "Priya Sharma",   icon: "📷", color: "#fb7185", bg: "rgba(244,63,94,0.1)",   border: "rgba(244,63,94,0.25)",   desc: "Explore photography, editing and visual storytelling.",              joined: false },
  { id: 4, name: "Debate Society",      category: "Literary",    members: 38,  lead: "Rahul Verma",    icon: "🎤", color: "#fbbf24", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)",  desc: "Sharpen communication and critical thinking through debates.",        joined: true  },
  { id: 5, name: "Music Club",          category: "Arts",        members: 62,  lead: "Kavya Nair",     icon: "🎵", color: "#34d399", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.25)",  desc: "Vocal and instrumental music, college fest performances.",            joined: false },
  { id: 6, name: "Entrepreneurship Cell",category: "Business",  members: 71,  lead: "Vikram Singh",   icon: "🚀", color: "#a78bfa", bg: "rgba(139,92,246,0.1)",  border: "rgba(139,92,246,0.25)",  desc: "Startup ideas, business plans and investor pitch competitions.",      joined: false },
  { id: 7, name: "Sports Committee",    category: "Sports",      members: 120, lead: "Amit Joshi",     icon: "⚽", color: "#f97316", bg: "rgba(249,115,22,0.1)",  border: "rgba(249,115,22,0.25)",  desc: "Organise and participate in inter-college sports tournaments.",       joined: true  },
  { id: 8, name: "NSS Unit",            category: "Social",      members: 95,  lead: "Dr. Verma",      icon: "🌱", color: "#6ee7b7", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)",   desc: "Community service, blood donation drives and social awareness.",     joined: false },
];

const upcomingEvents = [
  { id: 1, title: "Hackathon 2024",          club: "Coding Club",         date: "Nov 20–21, 2024", venue: "CS Block Lab",      type: "Competition", color: "#818cf8" },
  { id: 2, title: "Photography Exhibition",  club: "Photography Club",    date: "Nov 25, 2024",    venue: "Main Hall",         type: "Exhibition",  color: "#fb7185" },
  { id: 3, title: "Inter-College Debate",    club: "Debate Society",      date: "Dec 2, 2024",     venue: "Seminar Hall",      type: "Competition", color: "#fbbf24" },
  { id: 4, title: "Startup Pitch Day",       club: "E-Cell",              date: "Dec 5, 2024",     venue: "Auditorium",        type: "Event",       color: "#a78bfa" },
  { id: 5, title: "Annual Sports Meet",      club: "Sports Committee",    date: "Dec 10–12, 2024", venue: "Sports Ground",     type: "Tournament",  color: "#f97316" },
  { id: 6, title: "Music Night",             club: "Music Club",          date: "Dec 15, 2024",    venue: "Open Air Theatre",  type: "Performance", color: "#34d399" },
];

const typeBadge = {
  Competition: "badge-rose",
  Exhibition:  "badge-violet",
  Event:       "badge-indigo",
  Tournament:  "badge-amber",
  Performance: "badge-emerald",
};

function EventRegisterModal({ event, onClose }) {
  const [done, setDone] = useState(false);
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box">
        {done ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🎉</div>
            <p style={{ color: "#34d399", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Registered Successfully!</p>
            <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 6 }}>You're registered for {event.title}</p>
            <button onClick={onClose} className="btn-primary" style={{ marginTop: 20 }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Register for Event</p>
                <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 4 }}>{event.title}</p>
              </div>
              <button onClick={onClose} className="btn-secondary" style={{ padding: "4px 10px" }}>✕</button>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 16, marginBottom: 20 }}>
              {[
                { label: "Club",  value: event.club },
                { label: "Date",  value: event.date },
                { label: "Venue", value: event.venue },
                { label: "Type",  value: event.type },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.4)" }}>{r.label}</span>
                  <span style={{ fontSize: "0.78rem", color: "#e2e8f0", fontWeight: 500 }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setDone(true)} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Confirm Registration</button>
              <button onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

function ClubActivities() {
  const user     = JSON.parse(localStorage.getItem("user"));
  const isAdmin  = user?.role === "admin";
  const [activeTab,   setActiveTab]   = useState("clubs");
  const [clubList,    setClubList]    = useState(clubs);
  const [regEvent,    setRegEvent]    = useState(null);
  const [filterCat,   setFilterCat]   = useState("All");

  const categories = ["All", ...new Set(clubs.map(c => c.category))];
  const filtered   = filterCat === "All" ? clubList : clubList.filter(c => c.category === filterCat);
  const myClubs    = clubList.filter(c => c.joined);

  const toggleJoin = id => setClubList(p => p.map(c => c.id === id ? { ...c, joined: !c.joined, members: c.joined ? c.members - 1 : c.members + 1 } : c));

  return (
    <Layout>
      {regEvent && <EventRegisterModal event={regEvent} onClose={() => setRegEvent(null)} />}

      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Club Activities</h1>
        <p className="page-sub">Join clubs, participate in events and build your campus life</p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total Clubs",    value: clubs.length,                    accent: "stat-indigo",  color: "#818cf8" },
          { label: "My Clubs",       value: myClubs.length,                  accent: "stat-emerald", color: "#34d399" },
          { label: "Events Upcoming",value: upcomingEvents.length,           accent: "stat-amber",   color: "#fbbf24" },
          { label: "Members",        value: clubs.reduce((s,c)=>s+c.members,0), accent: "stat-violet", color: "#a78bfa" },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.accent}`}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-group" style={{ marginBottom: 20 }}>
        {["clubs", "events", "my clubs"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`tab-item ${activeTab === t ? "active" : ""}`} style={{ textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>

      {/* ── Clubs Tab ── */}
      {activeTab === "clubs" && (
        <>
          {/* Category filter */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilterCat(cat)}
                style={{
                  padding: "5px 14px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                  background: filterCat === cat ? "#6366f1" : "rgba(255,255,255,0.05)",
                  color: filterCat === cat ? "white" : "rgba(148,163,184,0.6)",
                  border: filterCat === cat ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.08)",
                }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 16 }}>
            {filtered.map(c => (
              <div key={c.id} style={{ background: "#131929", border: `1px solid ${c.joined ? c.border : "rgba(255,255,255,0.07)"}`, borderRadius: 14, padding: 20, transition: "all 0.2s", position: "relative", overflow: "hidden" }}>
                {/* Top accent line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: c.color, opacity: c.joined ? 1 : 0.3 }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: c.bg, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.875rem" }}>{c.name}</p>
                      <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(148,163,184,0.4)", marginTop: 2 }}>{c.category}</p>
                    </div>
                  </div>
                  {c.joined && <span className="badge badge-emerald">Joined</span>}
                </div>

                <p style={{ margin: "0 0 14px", fontSize: "0.8rem", color: "rgba(148,163,184,0.6)", lineHeight: 1.6 }}>{c.desc}</p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: 12 }}>
                    <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.4)" }}>👥 {c.members} members</span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.4)" }}>Lead: {c.lead.split(" ")[0]}</span>
                  </div>
                  {!isAdmin && (
                    <button onClick={() => toggleJoin(c.id)}
                      className={c.joined ? "btn-secondary" : "btn-primary"}
                      style={{ padding: "5px 14px", fontSize: "0.75rem" }}>
                      {c.joined ? "Leave" : "Join"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── Events Tab ── */}
      {activeTab === "events" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {upcomingEvents.map(e => (
            <div key={e.id} className="card" style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, borderLeft: `3px solid ${e.color}` }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                  <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.9rem" }}>{e.title}</p>
                  <span className={`badge ${typeBadge[e.type]}`}>{e.type}</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(148,163,184,0.45)" }}>
                  {e.club} &nbsp;·&nbsp; 📅 {e.date} &nbsp;·&nbsp; 📍 {e.venue}
                </p>
              </div>
              {!isAdmin && (
                <button onClick={() => setRegEvent(e)} className="btn-primary" style={{ flexShrink: 0, padding: "6px 16px" }}>
                  Register
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── My Clubs Tab ── */}
      {activeTab === "my clubs" && (
        <>
          {myClubs.length === 0 ? (
            <div className="card" style={{ padding: 48, textAlign: "center" }}>
              <p style={{ fontSize: "2rem", marginBottom: 10 }}>🎭</p>
              <p style={{ color: "#e2e8f0", fontWeight: 600, marginBottom: 6 }}>You haven't joined any clubs yet</p>
              <p style={{ color: "rgba(148,163,184,0.4)", fontSize: "0.8125rem", marginBottom: 20 }}>Explore clubs and join to get started</p>
              <button onClick={() => setActiveTab("clubs")} className="btn-primary">Browse Clubs</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px,1fr))", gap: 16 }}>
              {myClubs.map(c => (
                <div key={c.id} style={{ background: "#131929", border: `1px solid ${c.border}`, borderRadius: 14, padding: 20, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: c.color }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: 10, background: c.bg, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                      {c.icon}
                    </div>
                    <div>
                      <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.875rem" }}>{c.name}</p>
                      <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(148,163,184,0.4)", marginTop: 2 }}>Lead: {c.lead}</p>
                    </div>
                  </div>
                  <p style={{ margin: "0 0 14px", fontSize: "0.8rem", color: "rgba(148,163,184,0.6)", lineHeight: 1.6 }}>{c.desc}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.4)" }}>👥 {c.members} members</span>
                    <button onClick={() => toggleJoin(c.id)} className="btn-secondary" style={{ padding: "5px 14px", fontSize: "0.75rem" }}>Leave</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

export default ClubActivities;
