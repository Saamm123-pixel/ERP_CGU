import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";
import { getNotices, getNoticesByRole, createNotice, deleteNotice } from "../services/api";

const categoryColors = {
  Exam:     { accent: "#fb7185", bg: "rgba(244,63,94,0.08)",    border: "rgba(244,63,94,0.2)"    },
  Academic: { accent: "#818cf8", bg: "rgba(99,102,241,0.08)",   border: "rgba(99,102,241,0.2)"   },
  Event:    { accent: "#34d399", bg: "rgba(16,185,129,0.08)",   border: "rgba(16,185,129,0.2)"   },
  Admin:    { accent: "#fbbf24", bg: "rgba(245,158,11,0.08)",   border: "rgba(245,158,11,0.2)"   },
  Faculty:  { accent: "#a78bfa", bg: "rgba(139,92,246,0.08)",   border: "rgba(139,92,246,0.2)"   },
  General:  { accent: "#38bdf8", bg: "rgba(14,165,233,0.08)",   border: "rgba(14,165,233,0.2)"   },
};

function getColor(notice) {
  return categoryColors[notice.category] || categoryColors.General;
}

function NoticeDetailModal({ notice, onClose }) {
  const c = getColor(notice);
  return createPortal(
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 16 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#131929", border: `1px solid rgba(255,255,255,0.1)`, borderTop: `3px solid ${c.accent}`, borderRadius: 16, width: "100%", maxWidth: 620, maxHeight: "88vh", display: "flex", flexDirection: "column", boxShadow: "0 32px 80px rgba(0,0,0,0.6)", overflow: "hidden" }}>
        <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ background: c.bg, color: c.accent, border: `1px solid ${c.border}`, padding: "3px 10px", borderRadius: 20, fontSize: "0.7rem", fontWeight: 600 }}>{notice.category}</span>
              </div>
              <h2 style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1.0625rem", margin: 0, lineHeight: 1.4 }}>{notice.title}</h2>
            </div>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#94a3b8", cursor: "pointer", padding: "6px 10px", fontSize: "0.875rem" }}>✕</button>
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
            <span style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>📅 {notice.postedDate}</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>👤 {notice.postedBy}</span>
          </div>
        </div>
        <div style={{ padding: "20px 24px", overflowY: "auto", flex: 1 }}>
          <div style={{ background: `${c.accent}10`, border: `1px solid ${c.accent}25`, borderRadius: 10, padding: "12px 16px" }}>
            <p style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(148,163,184,0.8)", lineHeight: 1.6 }}>{notice.description}</p>
          </div>
        </div>
        <div style={{ padding: "14px 24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} className="btn-secondary">Close</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function AddNoticeModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: "", description: "", category: "General", postedBy: "", targetRoles: "all" });
  const [busy, setBusy] = useState(false);

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim()) return alert("Title and description are required.");
    setBusy(true);
    try { await onAdd(form); onClose(); }
    catch { alert("Failed to post notice."); }
    finally { setBusy(false); }
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: 500 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Post Notice</p>
          <button onClick={onClose} className="btn-secondary" style={{ padding: "4px 10px" }}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Title</label>
            <input className="input-field" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="Notice title" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Category</label>
              <select className="input-field" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                {Object.keys(categoryColors).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Target</label>
              <select className="input-field" value={form.targetRoles} onChange={e => setForm(p => ({ ...p, targetRoles: e.target.value }))}>
                <option value="all">All</option>
                <option value="student">Students</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Posted By</label>
            <input className="input-field" value={form.postedBy} onChange={e => setForm(p => ({ ...p, postedBy: e.target.value }))} placeholder="Department / Name" />
          </div>
          <div>
            <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Description</label>
            <textarea className="input-field" rows={4} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={{ resize: "none" }} placeholder="Notice details..." />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={handleSubmit} disabled={busy} className="btn-primary" style={{ flex: 1, justifyContent: "center", opacity: busy ? 0.6 : 1 }}>
            {busy ? "Posting..." : "Post Notice"}
          </button>
          <button onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function NoticeBoard() {
  const user    = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [notices,   setNotices]   = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [selected,  setSelected]  = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetch = isAdmin ? getNotices() : getNoticesByRole(user.role);
    fetch.then(res => setNotices(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAdd = async (form) => {
    const res = await createNotice(form);
    setNotices(p => [res.data, ...p]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this notice?")) return;
    await deleteNotice(id);
    setNotices(p => p.filter(n => n.id !== id));
  };

  return (
    <Layout>
      {selected && <NoticeDetailModal notice={selected} onClose={() => setSelected(null)} />}
      {showModal && <AddNoticeModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="page-title">Notice Board</h1>
          <p className="page-sub">Latest announcements and updates · Click any notice to read full details</p>
        </div>
        {isAdmin && (
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
            Post Notice
          </button>
        )}
      </div>

      {loading ? (
        <div className="card" style={{ padding: 40, textAlign: "center", color: "rgba(148,163,184,0.4)" }}>Loading...</div>
      ) : notices.length === 0 ? (
        <div className="card" style={{ padding: 40, textAlign: "center", color: "rgba(148,163,184,0.4)" }}>No notices found.</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: 16 }}>
          {notices.map(n => {
            const c = getColor(n);
            return (
              <div key={n.id} style={{ background: "#131929", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `3px solid ${c.accent}`, borderRadius: 12, padding: 20, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
                onClick={() => setSelected(n)}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ background: c.bg, color: c.accent, border: `1px solid ${c.border}`, padding: "3px 10px", borderRadius: 20, fontSize: "0.7rem", fontWeight: 600 }}>{n.category}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: "0.72rem", color: "rgba(148,163,184,0.35)" }}>{n.postedDate}</span>
                    {isAdmin && (
                      <button onClick={e => { e.stopPropagation(); handleDelete(n.id); }} className="btn-danger" style={{ padding: "2px 8px", fontSize: "0.68rem" }}>✕</button>
                    )}
                  </div>
                </div>
                <p style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.9rem", margin: "0 0 8px", lineHeight: 1.4 }}>{n.title}</p>
                <p style={{ color: "rgba(148,163,184,0.55)", fontSize: "0.8rem", lineHeight: 1.6, margin: "0 0 14px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {n.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.72rem", color: "rgba(148,163,184,0.35)" }}>By: {n.postedBy}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, color: c.accent, fontSize: "0.75rem", fontWeight: 600 }}>
                    Read more
                    <svg style={{ width: 12, height: 12 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}

export default NoticeBoard;
