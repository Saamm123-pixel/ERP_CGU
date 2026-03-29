import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";
import { getAllComplaints, getUserComplaints, createComplaint, respondComplaint, deleteComplaint } from "../services/api";

const statusBadge    = { Open: "badge-amber", "In Progress": "badge-indigo", Resolved: "badge-emerald" };
const priorityBadge  = { High: "badge-rose",  Medium: "badge-amber",         Low: "badge-slate" };
const priorityBorder = { High: "#fb7185",     Medium: "#fbbf24",             Low: "rgba(100,116,139,0.5)" };
const categories = ["Infrastructure", "IT", "Facilities", "Academic", "Administration", "Other"];

function NewComplaintModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title: "", category: "IT", priority: "Medium", description: "" });
  const [busy, setBusy] = useState(false);
  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.description.trim()) return alert("Please fill all fields.");
    setBusy(true);
    try { await onSubmit(form); onClose(); }
    catch { alert("Failed to submit complaint."); }
    finally { setBusy(false); }
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: 500 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Raise a Complaint</p>
          <button onClick={onClose} className="btn-secondary" style={{ padding: "4px 10px" }}>✕</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Title</label>
            <input className="input-field" name="title" value={form.title} onChange={handleChange} placeholder="Brief description of the issue" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Category</label>
              <select className="input-field" name="category" value={form.category} onChange={handleChange}>
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Priority</label>
              <select className="input-field" name="priority" value={form.priority} onChange={handleChange}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Description</label>
            <textarea className="input-field" name="description" value={form.description} onChange={handleChange}
              rows={4} style={{ resize: "none" }} placeholder="Describe the issue in detail..." />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={handleSubmit} disabled={busy} className="btn-primary" style={{ flex: 1, justifyContent: "center", opacity: busy ? 0.6 : 1 }}>
            {busy ? "Submitting..." : "Submit Complaint"}
          </button>
          <button onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
        </div>
      </div>
    </div>,
    document.body
  );
}

function ComplaintCard({ c, isAdmin, onRespond, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const [response, setResponse] = useState(c.response || "");
  const [busy, setBusy] = useState(false);

  const handleRespond = async (status) => {
    if (!response.trim()) return alert("Please write a response.");
    setBusy(true);
    try { await onRespond(c.id, response, status); }
    catch { alert("Failed to respond."); }
    finally { setBusy(false); }
  };

  return (
    <div className="card" style={{ padding: 20, borderLeft: `3px solid ${priorityBorder[c.priority] || priorityBorder.Medium}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
            <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.9rem" }}>{c.title}</p>
            <span className={`badge ${statusBadge[c.status] || "badge-amber"}`}>{c.status}</span>
            <span className={`badge ${priorityBadge[c.priority] || "badge-amber"}`}>{c.priority}</span>
          </div>
          <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(148,163,184,0.45)" }}>
            {c.category} &nbsp;·&nbsp; {isAdmin ? `By: ${c.submittedBy}` : ""} &nbsp;·&nbsp; {c.submittedDate}
          </p>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => setExpanded(p => !p)} className="btn-secondary" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>
            {expanded ? "Collapse" : "Details"}
          </button>
          {isAdmin && (
            <button onClick={() => onDelete(c.id)} className="btn-danger" style={{ padding: "4px 10px", fontSize: "0.75rem" }}>✕</button>
          )}
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {c.description && (
            <p style={{ margin: "0 0 10px", fontSize: "0.8125rem", color: "rgba(148,163,184,0.7)" }}>{c.description}</p>
          )}
          {c.response && (
            <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 12 }}>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#34d399", fontWeight: 600, marginBottom: 4 }}>Admin Response</p>
              <p style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(148,163,184,0.7)" }}>{c.response}</p>
            </div>
          )}
          {isAdmin && c.status !== "Resolved" && (
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <textarea className="input-field" rows={2} value={response} onChange={e => setResponse(e.target.value)}
                placeholder="Write a response..." style={{ resize: "none", flex: 1 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <button onClick={() => handleRespond("In Progress")} disabled={busy} className="btn-secondary" style={{ padding: "6px 12px", fontSize: "0.75rem", whiteSpace: "nowrap" }}>Mark In Progress</button>
                <button onClick={() => handleRespond("Resolved")} disabled={busy} className="btn-success" style={{ padding: "6px 12px", fontSize: "0.75rem" }}>Resolve</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Complaints() {
  const user    = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const [complaints, setComplaints] = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [showModal,  setShowModal]  = useState(false);
  const [filter,     setFilter]     = useState("All");

  const fetchComplaints = async () => {
    try {
      const res = isAdmin ? await getAllComplaints() : await getUserComplaints(user.name);
      setComplaints(res.data);
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchComplaints(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNew = async (form) => {
    const res = await createComplaint({ ...form, submittedBy: user.name });
    setComplaints(p => [res.data, ...p]);
  };

  const handleRespond = async (id, response, status) => {
    const res = await respondComplaint(id, { response, status });
    setComplaints(p => p.map(c => c.id === id ? res.data : c));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;
    await deleteComplaint(id);
    setComplaints(p => p.filter(c => c.id !== id));
  };

  const filtered = filter === "All" ? complaints : complaints.filter(c => c.status === filter);
  const counts = {
    Open:          complaints.filter(c => c.status === "Open").length,
    "In Progress": complaints.filter(c => c.status === "In Progress").length,
    Resolved:      complaints.filter(c => c.status === "Resolved").length,
  };

  return (
    <Layout>
      {showModal && <NewComplaintModal onClose={() => setShowModal(false)} onSubmit={handleNew} />}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="page-title">Complaints & Support</h1>
          <p className="page-sub">{isAdmin ? "Manage and resolve all complaints" : "Raise and track your complaints"}</p>
        </div>
        {!isAdmin && (
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
            New Complaint
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total",       value: complaints.length,    accent: "stat-indigo",  color: "#818cf8" },
          { label: "Open",        value: counts.Open,          accent: "stat-amber",   color: "#fbbf24" },
          { label: "In Progress", value: counts["In Progress"],accent: "stat-sky",     color: "#38bdf8" },
          { label: "Resolved",    value: counts.Resolved,      accent: "stat-emerald", color: "#34d399" },
        ].map(s => (
          <div key={s.label} className={`stat-card ${s.accent}`}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="tab-group" style={{ marginBottom: 20 }}>
        {["All", "Open", "In Progress", "Resolved"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`tab-item ${filter === f ? "active" : ""}`}>{f}</button>
        ))}
      </div>

      {loading ? (
        <div className="card" style={{ padding: 40, textAlign: "center", color: "rgba(148,163,184,0.4)" }}>Loading...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.length === 0
            ? <div className="card" style={{ padding: 40, textAlign: "center", color: "rgba(148,163,184,0.4)" }}>No complaints found.</div>
            : filtered.map(c => <ComplaintCard key={c.id} c={c} isAdmin={isAdmin} onRespond={handleRespond} onDelete={handleDelete} />)
          }
        </div>
      )}
    </Layout>
  );
}

export default Complaints;
