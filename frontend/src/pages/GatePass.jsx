import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";
import { getStudentGatePasses, getAllGatePasses, applyGatePass, approveGatePass, rejectGatePass } from "../services/api";

const typeColor = {
  Medical:  { color: "#fb7185", bg: "rgba(244,63,94,0.1)",   border: "rgba(244,63,94,0.25)"   },
  Personal: { color: "#fbbf24", bg: "rgba(245,158,11,0.1)",  border: "rgba(245,158,11,0.25)"  },
  Academic: { color: "#818cf8", bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.25)"  },
  Official: { color: "#34d399", bg: "rgba(16,185,129,0.1)",  border: "rgba(16,185,129,0.25)"  },
};

const statusBadge = { Approved: "badge-emerald", Pending: "badge-amber", Rejected: "badge-rose" };

function ApplyModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ reason: "", type: "Medical", outDate: "", outTime: "", inTime: "", parentPhone: "", notes: "" });
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleSubmit = async () => {
    if (!form.reason || !form.outDate || !form.outTime || !form.inTime) return alert("Please fill all required fields.");
    setBusy(true);
    try {
      await onSubmit(form);
      setDone(true);
      setTimeout(() => { setDone(false); onClose(); }, 2000);
    } catch { alert("Failed to apply gate pass."); }
    finally { setBusy(false); }
  };

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box" style={{ maxWidth: 500 }}>
        {done ? (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🎫</div>
            <p style={{ color: "#34d399", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Gate Pass Applied!</p>
            <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 6 }}>Your request has been sent for approval.</p>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Apply for Gate Pass</p>
              <button onClick={onClose} className="btn-secondary" style={{ padding: "4px 10px" }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Pass Type *</label>
                  <select className="input-field" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                    <option>Medical</option><option>Personal</option><option>Academic</option><option>Official</option>
                  </select>
                </div>
                <div>
                  <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Out Date *</label>
                  <input className="input-field" type="date" value={form.outDate} onChange={e => setForm(p => ({ ...p, outDate: e.target.value }))} />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Out Time *</label>
                  <input className="input-field" type="time" value={form.outTime} onChange={e => setForm(p => ({ ...p, outTime: e.target.value }))} />
                </div>
                <div>
                  <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Expected Return *</label>
                  <input className="input-field" type="time" value={form.inTime} onChange={e => setForm(p => ({ ...p, inTime: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Reason *</label>
                <input className="input-field" value={form.reason} onChange={e => setForm(p => ({ ...p, reason: e.target.value }))} placeholder="Reason for going out..." />
              </div>
              <div>
                <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Parent/Guardian Phone</label>
                <input className="input-field" value={form.parentPhone} onChange={e => setForm(p => ({ ...p, parentPhone: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Additional Notes</label>
                <textarea className="input-field" rows={2} value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} style={{ resize: "none" }} placeholder="Any additional details..." />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button onClick={handleSubmit} disabled={busy} className="btn-primary" style={{ flex: 1, justifyContent: "center", opacity: busy ? 0.6 : 1 }}>
                {busy ? "Submitting..." : "Submit Application"}
              </button>
              <button onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

function GatePass() {
  const user      = JSON.parse(localStorage.getItem("user"));
  const isStudent = user?.role === "student";

  const [passes,    setPasses]    = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filter,    setFilter]    = useState("All");

  const fetchPasses = async () => {
    try {
      const res = isStudent ? await getStudentGatePasses(user.id) : await getAllGatePasses();
      setPasses(res.data);
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPasses(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (form) => {
    const res = await applyGatePass({ ...form, studentId: user.id, studentName: user.name });
    setPasses(p => [res.data, ...p]);
  };

  const handleApprove = async (id) => {
    const res = await approveGatePass(id, { approvedBy: user.name });
    setPasses(p => p.map(gp => gp.id === id ? res.data : gp));
  };

  const handleReject = async (id) => {
    const res = await rejectGatePass(id);
    setPasses(p => p.map(gp => gp.id === id ? res.data : gp));
  };

  const list     = filter === "All" ? passes : passes.filter(p => p.status === filter);
  const stats = [
    { label: "Total",    value: passes.length,                                  accent: "stat-indigo",  color: "#818cf8" },
    { label: "Approved", value: passes.filter(p => p.status === "Approved").length, accent: "stat-emerald", color: "#34d399" },
    { label: "Pending",  value: passes.filter(p => p.status === "Pending").length,  accent: "stat-amber",   color: "#fbbf24" },
    { label: "Rejected", value: passes.filter(p => p.status === "Rejected").length, accent: "stat-rose",    color: "#fb7185" },
  ];

  return (
    <Layout>
      {showModal && <ApplyModal onClose={() => setShowModal(false)} onSubmit={handleSubmit} />}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 className="page-title">Gate Pass</h1>
          <p className="page-sub">{isStudent ? "Apply for and track your gate passes" : "Review and manage student gate pass requests"}</p>
        </div>
        {isStudent && (
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
            Apply Gate Pass
          </button>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} className={`stat-card ${s.accent}`}>
            <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", margin: "0 0 8px" }}>{s.label}</p>
            <p style={{ fontSize: "1.75rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {["All", "Approved", "Pending", "Rejected"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "5px 14px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 500, cursor: "pointer", background: filter === f ? "#6366f1" : "rgba(255,255,255,0.05)", color: filter === f ? "white" : "rgba(148,163,184,0.6)", border: filter === f ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.08)" }}>{f}</button>
        ))}
      </div>

      {loading ? (
        <div className="card" style={{ padding: 40, textAlign: "center", color: "rgba(148,163,184,0.4)" }}>Loading...</div>
      ) : isStudent ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {list.length === 0 ? (
            <div className="card" style={{ padding: 40, textAlign: "center", color: "rgba(148,163,184,0.4)" }}>No gate passes found.</div>
          ) : list.map(p => {
            const tc = typeColor[p.type] || typeColor.Personal;
            return (
              <div key={p.id} className="card" style={{ padding: 20, borderLeft: `3px solid ${tc.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}`, padding: "3px 10px", borderRadius: 20, fontSize: "0.7rem", fontWeight: 600 }}>{p.type}</span>
                      <span className={`badge ${statusBadge[p.status]}`}>{p.status}</span>
                    </div>
                    <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.875rem" }}>{p.reason}</p>
                    <div style={{ display: "flex", gap: 16, marginTop: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.45)" }}>📅 {p.outDate}</span>
                      <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.45)" }}>🕐 Out: {p.outTime}</span>
                      <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.45)" }}>🔙 In: {p.inTime}</span>
                      <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.35)" }}>Applied: {p.appliedOn}</span>
                    </div>
                    {p.approvedBy && <p style={{ margin: "6px 0 0", fontSize: "0.75rem", color: "#34d399" }}>✓ Approved by: {p.approvedBy}</p>}
                  </div>
                  {p.status === "Approved" && (
                    <button onClick={() => window.print()} className="btn-secondary" style={{ padding: "5px 12px", fontSize: "0.75rem", flexShrink: 0 }}>🖨 Print</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card" style={{ padding: 24 }}>
          <p className="section-title" style={{ marginBottom: 18 }}>Gate Pass Requests</p>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr><th>Student</th><th>Reason</th><th style={{ textAlign: "center" }}>Type</th><th style={{ textAlign: "center" }}>Out Date</th><th style={{ textAlign: "center" }}>Status</th><th style={{ textAlign: "center" }}>Action</th></tr>
              </thead>
              <tbody>
                {list.length === 0 ? (
                  <tr><td colSpan={6} style={{ textAlign: "center", color: "rgba(148,163,184,0.4)", padding: 24 }}>No gate passes found.</td></tr>
                ) : list.map(r => {
                  const tc = typeColor[r.type] || typeColor.Personal;
                  return (
                    <tr key={r.id}>
                      <td className="td-main">
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div className="avatar" style={{ width: 28, height: 28, fontSize: "0.7rem" }}>{(r.studentName || "?")[0]}</div>
                          {r.studentName || `ID: ${r.studentId}`}
                        </div>
                      </td>
                      <td style={{ fontSize: "0.8rem", maxWidth: 180 }}>{r.reason}</td>
                      <td style={{ textAlign: "center" }}>
                        <span style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}`, padding: "3px 8px", borderRadius: 20, fontSize: "0.68rem", fontWeight: 600 }}>{r.type}</span>
                      </td>
                      <td style={{ textAlign: "center", fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>{r.outDate}</td>
                      <td style={{ textAlign: "center" }}><span className={`badge ${statusBadge[r.status]}`}>{r.status}</span></td>
                      <td style={{ textAlign: "center" }}>
                        {r.status === "Pending" ? (
                          <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                            <button onClick={() => handleApprove(r.id)} className="btn-success" style={{ padding: "3px 10px", fontSize: "0.72rem" }}>Approve</button>
                            <button onClick={() => handleReject(r.id)}  className="btn-danger"  style={{ padding: "3px 10px", fontSize: "0.72rem" }}>Reject</button>
                          </div>
                        ) : <span style={{ color: "rgba(148,163,184,0.3)", fontSize: "0.78rem" }}>—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default GatePass;
