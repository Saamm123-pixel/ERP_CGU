import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getStudentFees, getAllFees, payFee } from "../services/api";

const statusBadge = { Paid: "badge-emerald", Partial: "badge-amber", Pending: "badge-rose" };

function Fees() {
  const user    = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const [fees,    setFees]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying,  setPaying]  = useState(null);
  const [amount,  setAmount]  = useState("");
  const [method,  setMethod]  = useState("UPI");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetch = isAdmin ? getAllFees() : getStudentFees(user.id);
    fetch.then(res => setFees(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePay = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) return;
    try {
      const res = await payFee(paying.id, { amount: Number(amount), method });
      setFees(p => p.map(f => f.id === paying.id ? res.data : f));
      setSuccess(true);
      setTimeout(() => { setSuccess(false); setPaying(null); setAmount(""); }, 2500);
    } catch { alert("Payment failed."); }
  };

  const totalFees = fees.reduce((s, f) => s + (f.totalAmount || 0), 0);
  const totalPaid = fees.reduce((s, f) => s + (f.paidAmount || 0), 0);
  const totalDue  = fees.reduce((s, f) => s + (f.dueAmount  || 0), 0);

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Fees</h1>
        <p className="page-sub">{isAdmin ? "Fee collection overview" : "Your fee payment history"}</p>
      </div>

      {loading ? (
        <div className="card" style={{ padding: 40, textAlign: "center", color: "rgba(148,163,184,0.4)" }}>Loading...</div>
      ) : (
        <>
          {!isAdmin && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: 14, marginBottom: 20 }}>
                {[
                  { label: "Total Fees",  value: `₹${totalFees.toLocaleString()}`, accent: "stat-indigo",  color: "#818cf8" },
                  { label: "Amount Paid", value: `₹${totalPaid.toLocaleString()}`, accent: "stat-emerald", color: "#34d399" },
                  { label: "Amount Due",  value: `₹${totalDue.toLocaleString()}`,  accent: "stat-rose",    color: "#fb7185" },
                ].map(s => (
                  <div key={s.label} className={`stat-card ${s.accent}`}>
                    <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.45)", margin: "0 0 8px" }}>{s.label}</p>
                    <p style={{ fontSize: "1.6rem", fontWeight: 700, color: s.color, margin: 0 }}>{s.value}</p>
                  </div>
                ))}
              </div>

              <div className="card" style={{ padding: 24 }}>
                <p className="section-title" style={{ marginBottom: 18 }}>Payment History</p>
                <div style={{ overflowX: "auto" }}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Semester</th>
                        <th style={{ textAlign: "right" }}>Amount</th>
                        <th style={{ textAlign: "right" }}>Paid</th>
                        <th style={{ textAlign: "right" }}>Due</th>
                        <th style={{ textAlign: "center" }}>Date</th>
                        <th style={{ textAlign: "center" }}>Status</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fees.length === 0 ? (
                        <tr><td colSpan={7} style={{ textAlign: "center", color: "rgba(148,163,184,0.4)", padding: 24 }}>No fee records found.</td></tr>
                      ) : fees.map(f => (
                        <tr key={f.id}>
                          <td className="td-main">{f.semester}</td>
                          <td style={{ textAlign: "right" }}>₹{(f.totalAmount || 0).toLocaleString()}</td>
                          <td style={{ textAlign: "right", color: "#34d399", fontWeight: 600 }}>₹{(f.paidAmount || 0).toLocaleString()}</td>
                          <td style={{ textAlign: "right", color: f.dueAmount > 0 ? "#fb7185" : "rgba(148,163,184,0.4)", fontWeight: f.dueAmount > 0 ? 600 : 400 }}>₹{(f.dueAmount || 0).toLocaleString()}</td>
                          <td style={{ textAlign: "center" }}>{f.paidDate || "—"}</td>
                          <td style={{ textAlign: "center" }}><span className={`badge ${statusBadge[f.status] || "badge-amber"}`}>{f.status}</span></td>
                          <td style={{ textAlign: "center" }}>
                            {f.dueAmount > 0
                              ? <button onClick={() => setPaying(f)} className="btn-primary" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>Pay Now</button>
                              : <span style={{ color: "rgba(148,163,184,0.2)", fontSize: "0.8rem" }}>—</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {isAdmin && (
            <div className="card" style={{ padding: 24 }}>
              <p className="section-title" style={{ marginBottom: 18 }}>Student Fee Status</p>
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Student ID</th><th>Semester</th><th>Year</th>
                      <th style={{ textAlign: "right" }}>Amount</th>
                      <th style={{ textAlign: "right" }}>Paid</th>
                      <th style={{ textAlign: "right" }}>Due</th>
                      <th style={{ textAlign: "center" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.length === 0 ? (
                      <tr><td colSpan={7} style={{ textAlign: "center", color: "rgba(148,163,184,0.4)", padding: 24 }}>No fee records found.</td></tr>
                    ) : fees.map(f => (
                      <tr key={f.id}>
                        <td className="td-main">{f.studentId}</td>
                        <td>{f.semester}</td>
                        <td>{f.academicYear}</td>
                        <td style={{ textAlign: "right" }}>₹{(f.totalAmount || 0).toLocaleString()}</td>
                        <td style={{ textAlign: "right", color: "#34d399", fontWeight: 600 }}>₹{(f.paidAmount || 0).toLocaleString()}</td>
                        <td style={{ textAlign: "right", color: f.dueAmount > 0 ? "#fb7185" : "rgba(148,163,184,0.4)" }}>₹{(f.dueAmount || 0).toLocaleString()}</td>
                        <td style={{ textAlign: "center" }}><span className={`badge ${statusBadge[f.status] || "badge-amber"}`}>{f.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {paying && (
        <div className="modal-overlay">
          <div className="modal-box">
            {success ? (
              <div style={{ textAlign: "center", padding: "28px 0" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>✅</div>
                <p style={{ color: "#34d399", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Payment Successful!</p>
                <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 6 }}>
                  ₹{Number(amount).toLocaleString()} paid via {method} for {paying.semester}
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div>
                    <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Pay Fees</p>
                    <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 4 }}>
                      {paying.semester} · Due: <span style={{ color: "#fb7185", fontWeight: 700 }}>₹{(paying.dueAmount || 0).toLocaleString()}</span>
                    </p>
                  </div>
                  <button onClick={() => setPaying(null)} className="btn-secondary" style={{ padding: "4px 10px" }}>✕</button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div>
                    <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Amount (₹)</label>
                    <input className="input-field" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder={paying.dueAmount} />
                  </div>
                  <div>
                    <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Payment Method</label>
                    <select className="input-field" value={method} onChange={e => setMethod(e.target.value)}>
                      <option>UPI</option>
                      <option>Net Banking</option>
                      <option>Credit / Debit Card</option>
                      <option>Demand Draft</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
                  <button onClick={handlePay} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Confirm Payment</button>
                  <button onClick={() => setPaying(null)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Fees;
