import { useState } from "react";
import { createPortal } from "react-dom";
import Layout from "../components/Layout";

const books = [
  { id: 1,  title: "Introduction to Algorithms",       author: "Cormen et al.",      category: "CS",          available: 3,  total: 5,  isbn: "978-0262033848" },
  { id: 2,  title: "Clean Code",                       author: "Robert C. Martin",   category: "CS",          available: 0,  total: 3,  isbn: "978-0132350884" },
  { id: 3,  title: "Database System Concepts",         author: "Silberschatz",       category: "CS",          available: 2,  total: 4,  isbn: "978-0078022159" },
  { id: 4,  title: "Operating System Concepts",        author: "Silberschatz",       category: "CS",          available: 1,  total: 4,  isbn: "978-1118063330" },
  { id: 5,  title: "Computer Networks",                author: "Tanenbaum",          category: "CS",          available: 4,  total: 6,  isbn: "978-0132126953" },
  { id: 6,  title: "Engineering Mathematics",          author: "B.S. Grewal",        category: "Mathematics", available: 5,  total: 8,  isbn: "978-8174091955" },
  { id: 7,  title: "Principles of Management",         author: "Koontz & Weihrich",  category: "Management",  available: 2,  total: 3,  isbn: "978-0070681880" },
  { id: 8,  title: "Digital Electronics",              author: "Morris Mano",        category: "ECE",         available: 0,  total: 4,  isbn: "978-0131989245" },
  { id: 9,  title: "The Pragmatic Programmer",         author: "Hunt & Thomas",      category: "CS",          available: 1,  total: 2,  isbn: "978-0135957059" },
  { id: 10, title: "Signals and Systems",              author: "Oppenheim",          category: "ECE",         available: 3,  total: 5,  isbn: "978-0138147570" },
];

const myBorrowings = [
  { id: 1, title: "Introduction to Algorithms", issuedOn: "Nov 1, 2024",  dueDate: "Nov 22, 2024", status: "Overdue",  fine: 50 },
  { id: 2, title: "Clean Code",                 issuedOn: "Nov 10, 2024", dueDate: "Dec 1, 2024",  status: "Active",   fine: 0  },
  { id: 3, title: "Engineering Mathematics",    issuedOn: "Oct 15, 2024", dueDate: "Nov 5, 2024",  status: "Returned", fine: 0  },
];

const allBorrowings = [
  { student: "Ravi Kumar",   book: "Introduction to Algorithms", issuedOn: "Nov 1",  dueDate: "Nov 22", status: "Overdue",  fine: 50 },
  { student: "Priya Sharma", book: "Clean Code",                 issuedOn: "Nov 10", dueDate: "Dec 1",  status: "Active",   fine: 0  },
  { student: "Amit Singh",   book: "Database System Concepts",   issuedOn: "Nov 5",  dueDate: "Nov 26", status: "Active",   fine: 0  },
  { student: "Sneha Patel",  book: "Digital Electronics",        issuedOn: "Oct 20", dueDate: "Nov 10", status: "Overdue",  fine: 80 },
  { student: "Rahul Verma",  book: "Computer Networks",          issuedOn: "Nov 8",  dueDate: "Nov 29", status: "Active",   fine: 0  },
];

const statusBadge = {
  Active:   "badge-emerald",
  Overdue:  "badge-rose",
  Returned: "badge-slate",
};

const categories = ["All", "CS", "ECE", "Mathematics", "Management"];

function IssueModal({ book, onClose }) {
  const [done, setDone] = useState(false);
  const dueDate = new Date(Date.now() + 21 * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box">
        {done ? (
          <div style={{ textAlign: "center", padding: "28px 0" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>📚</div>
            <p style={{ color: "#34d399", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Book Issued Successfully!</p>
            <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 6, marginBottom: 20 }}>
              Return by <strong style={{ color: "#fbbf24" }}>{dueDate}</strong>
            </p>
            <button onClick={onClose} className="btn-primary" style={{ margin: "0 auto" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div>
                <p style={{ color: "#f1f5f9", fontWeight: 700, fontSize: "1rem", margin: 0 }}>Issue Book</p>
                <p style={{ color: "rgba(148,163,184,0.5)", fontSize: "0.8125rem", marginTop: 4 }}>{book.title}</p>
              </div>
              <button onClick={onClose} className="btn-secondary" style={{ padding: "4px 10px" }}>✕</button>
            </div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 14, marginBottom: 18 }}>
              {[
                { label: "Author",    value: book.author },
                { label: "Category",  value: book.category },
                { label: "ISBN",      value: book.isbn },
                { label: "Available", value: `${book.available} of ${book.total} copies` },
                { label: "Due Date",  value: dueDate },
              ].map(r => (
                <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.4)" }}>{r.label}</span>
                  <span style={{ fontSize: "0.78rem", color: "#e2e8f0", fontWeight: 500 }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, padding: "10px 14px", marginBottom: 18 }}>
              <p style={{ margin: 0, fontSize: "0.78rem", color: "#fbbf24" }}>⚠️ Late return fine: ₹5 per day after due date</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setDone(true)} className="btn-primary" style={{ flex: 1, justifyContent: "center" }}>Confirm Issue</button>
              <button onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

function Library() {
  const user     = JSON.parse(localStorage.getItem("user"));
  const isAdmin  = user?.role === "admin";
  const [activeTab,  setActiveTab]  = useState("catalog");
  const [search,     setSearch]     = useState("");
  const [catFilter,  setCatFilter]  = useState("All");
  const [issueBook,  setIssueBook]  = useState(null);

  const filtered = books.filter(b => {
    const matchCat    = catFilter === "All" || b.category === catFilter;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
                        b.author.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalFine = myBorrowings.reduce((s, b) => s + b.fine, 0);

  const stats = [
    { label: "Total Books",  value: books.reduce((s,b) => s + b.total, 0),     accent: "stat-indigo",  color: "#818cf8" },
    { label: "Available",    value: books.reduce((s,b) => s + b.available, 0), accent: "stat-emerald", color: "#34d399" },
    { label: "Issued",       value: books.reduce((s,b) => s + (b.total - b.available), 0), accent: "stat-amber", color: "#fbbf24" },
    { label: isAdmin ? "Overdue" : "My Fine",
      value: isAdmin ? allBorrowings.filter(b => b.status === "Overdue").length : `₹${totalFine}`,
      accent: "stat-rose", color: "#fb7185" },
  ];

  return (
    <Layout>
      {issueBook && <IssueModal book={issueBook} onClose={() => setIssueBook(null)} />}

      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Library</h1>
        <p className="page-sub">{isAdmin ? "Manage books, issuances and fines" : "Browse, borrow and track your books"}</p>
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
        {(isAdmin
          ? ["catalog", "issued books"]
          : ["catalog", "my books"]
        ).map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className={`tab-item ${activeTab === t ? "active" : ""}`}
            style={{ textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>

      {/* ── Catalog ── */}
      {activeTab === "catalog" && (
        <>
          {/* Search + filter */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, color: "rgba(148,163,184,0.4)" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
              </svg>
              <input className="input-field" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search by title or author..." style={{ paddingLeft: 38 }} />
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {categories.map(c => (
                <button key={c} onClick={() => setCatFilter(c)} style={{
                  padding: "7px 14px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 500, cursor: "pointer",
                  background: catFilter === c ? "#6366f1" : "rgba(255,255,255,0.05)",
                  color: catFilter === c ? "white" : "rgba(148,163,184,0.6)",
                  border: catFilter === c ? "1px solid #6366f1" : "1px solid rgba(255,255,255,0.08)",
                }}>{c}</button>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th style={{ textAlign: "center" }}>Category</th>
                    <th style={{ textAlign: "center" }}>Availability</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b, i) => (
                    <tr key={b.id}>
                      <td style={{ color: "rgba(148,163,184,0.3)", width: 40 }}>{i + 1}</td>
                      <td className="td-main">
                        <p style={{ margin: 0 }}>{b.title}</p>
                        <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(148,163,184,0.35)", marginTop: 2 }}>ISBN: {b.isbn}</p>
                      </td>
                      <td>{b.author}</td>
                      <td style={{ textAlign: "center" }}>
                        <span className="badge badge-indigo">{b.category}</span>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                          <div className="progress-track" style={{ width: 50 }}>
                            <div className={`progress-fill ${b.available > 0 ? "progress-emerald" : "progress-rose"}`}
                              style={{ width: `${(b.available / b.total) * 100}%` }} />
                          </div>
                          <span style={{ fontSize: "0.75rem", color: b.available > 0 ? "#34d399" : "#fb7185", fontWeight: 600 }}>
                            {b.available}/{b.total}
                          </span>
                        </div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {isAdmin ? (
                          <button className="btn-secondary" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>Issue</button>
                        ) : b.available > 0 ? (
                          <button onClick={() => setIssueBook(b)} className="btn-primary" style={{ padding: "4px 12px", fontSize: "0.75rem" }}>Borrow</button>
                        ) : (
                          <span className="badge badge-rose">Unavailable</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ── My Books ── */}
      {activeTab === "my books" && (
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <p className="section-title">My Borrowings</p>
            {totalFine > 0 && (
              <div style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)", borderRadius: 8, padding: "6px 14px" }}>
                <span style={{ fontSize: "0.8rem", color: "#fb7185", fontWeight: 600 }}>Total Fine: ₹{totalFine}</span>
              </div>
            )}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr><th>Book</th><th style={{ textAlign: "center" }}>Issued On</th><th style={{ textAlign: "center" }}>Due Date</th><th style={{ textAlign: "center" }}>Fine</th><th style={{ textAlign: "center" }}>Status</th></tr>
              </thead>
              <tbody>
                {myBorrowings.map((b) => (
                  <tr key={b.id}>
                    <td className="td-main">{b.title}</td>
                    <td style={{ textAlign: "center" }}>{b.issuedOn}</td>
                    <td style={{ textAlign: "center", color: b.status === "Overdue" ? "#fb7185" : "rgba(148,163,184,0.6)" }}>{b.dueDate}</td>
                    <td style={{ textAlign: "center", color: b.fine > 0 ? "#fb7185" : "rgba(148,163,184,0.3)", fontWeight: b.fine > 0 ? 700 : 400 }}>
                      {b.fine > 0 ? `₹${b.fine}` : "—"}
                    </td>
                    <td style={{ textAlign: "center" }}><span className={`badge ${statusBadge[b.status]}`}>{b.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Issued Books (Admin) ── */}
      {activeTab === "issued books" && (
        <div className="card" style={{ padding: 24 }}>
          <p className="section-title" style={{ marginBottom: 18 }}>All Issued Books</p>
          <div style={{ overflowX: "auto" }}>
            <table className="data-table">
              <thead>
                <tr><th>Student</th><th>Book</th><th style={{ textAlign: "center" }}>Issued</th><th style={{ textAlign: "center" }}>Due</th><th style={{ textAlign: "center" }}>Fine</th><th style={{ textAlign: "center" }}>Status</th></tr>
              </thead>
              <tbody>
                {allBorrowings.map((b) => (
                  <tr key={`${b.student}-${b.book}`}>
                    <td className="td-main">
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="avatar" style={{ width: 28, height: 28, fontSize: "0.7rem" }}>{b.student[0]}</div>
                        {b.student}
                      </div>
                    </td>
                    <td>{b.book}</td>
                    <td style={{ textAlign: "center" }}>{b.issuedOn}</td>
                    <td style={{ textAlign: "center", color: b.status === "Overdue" ? "#fb7185" : "rgba(148,163,184,0.6)" }}>{b.dueDate}</td>
                    <td style={{ textAlign: "center", color: b.fine > 0 ? "#fb7185" : "rgba(148,163,184,0.3)", fontWeight: b.fine > 0 ? 700 : 400 }}>
                      {b.fine > 0 ? `₹${b.fine}` : "—"}
                    </td>
                    <td style={{ textAlign: "center" }}><span className={`badge ${statusBadge[b.status]}`}>{b.status}</span></td>
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

export default Library;
