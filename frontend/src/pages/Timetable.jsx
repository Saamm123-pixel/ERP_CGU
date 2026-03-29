import { useState, useMemo } from "react";
import Layout from "../components/Layout";
import timetableData from "../assets/timetable-data.json";

const { timeSlots, index, timetables } = timetableData;

// Unique branches from index
const branches = [...new Set(index.map(i => i.branch))].sort();

// Color palette for subjects
const COLORS = [
  "#818cf8","#38bdf8","#fb7185","#fbbf24",
  "#34d399","#a78bfa","#f97316","#6ee7b7",
  "#fda4af","#93c5fd","#86efac","#fde68a",
];

function getColorMap(subjects) {
  const map = {};
  subjects.forEach((s, i) => { map[s.abbr] = COLORS[i % COLORS.length]; });
  return map;
}

function getSlotColor(slot, colorMap) {
  if (!slot) return null;
  const abbr = slot.split("(")[0].trim().split(" ")[0];
  return colorMap[abbr] || COLORS[Math.abs(abbr.split("").reduce((a,c)=>a+c.charCodeAt(0),0)) % COLORS.length];
}

const today = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];

function Timetable() {
  const user = JSON.parse(localStorage.getItem("user"));

  // Selectors
  const [branch,   setBranch]   = useState(branches[0] || "");
  const [semester, setSemester] = useState("");
  const [sheetName, setSheetName] = useState("");

  // Derived options
  const semesters = useMemo(() =>
    [...new Set(index.filter(i => i.branch === branch).map(i => i.semester))].sort((a,b)=>a-b),
    [branch]
  );

  const groups = useMemo(() => {
    const entry = index.find(i => i.branch === branch && i.semester === parseInt(semester));
    return entry ? entry.groups.sort((a,b)=>a.group-b.group) : [];
  }, [branch, semester]);

  // Selected timetable — match by sheetName for uniqueness
  const selected = useMemo(() => {
    if (!branch || !semester || !sheetName) return null;
    return timetables.find(t => t.sheetName === sheetName) || null;
  }, [branch, semester, sheetName]);

  const colorMap = useMemo(() =>
    selected ? getColorMap(selected.subjects) : {},
    [selected]
  );

  // Auto-select first semester when branch changes
  const handleBranch = (b) => {
    setBranch(b);
    setSemester("");
    setSheetName("");
  };
  const handleSemester = (s) => {
    setSemester(s);
    setSheetName("");
  };

  return (
    <Layout>
      <div style={{ marginBottom: 24 }}>
        <h1 className="page-title">Timetable</h1>
        <p className="page-sub">Odd Semester 2025–26 · W.E.F. 28/07/2025 · All Branches</p>
      </div>

      {/* Selectors */}
      <div className="card" style={{ padding: 20, marginBottom: 20 }}>
        <p className="section-title" style={{ marginBottom: 14 }}>Select Your Timetable</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 14 }}>
          {/* Branch */}
          <div>
            <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Branch / Program</label>
            <select className="input-field" value={branch} onChange={e => handleBranch(e.target.value)}>
              <option value="">-- Select Branch --</option>
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          {/* Semester */}
          <div>
            <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Semester</label>
            <select className="input-field" value={semester} onChange={e => handleSemester(e.target.value)} disabled={!branch}>
              <option value="">-- Select Semester --</option>
              {semesters.map(s => <option key={s} value={s}>{s === 1 ? "1st" : s === 2 ? "2nd" : s === 3 ? "3rd" : `${s}th`} Semester</option>)}
            </select>
          </div>

          {/* Group */}
          <div>
            <label className="text-label" style={{ display: "block", marginBottom: 6 }}>Group / Section</label>
            <select className="input-field" value={sheetName} onChange={e => setSheetName(e.target.value)} disabled={!semester}>
              <option value="">-- Select Group --</option>
              {groups.map(g => <option key={g.sheetName} value={g.sheetName}>{g.label || `Group ${g.group}`}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* No selection state */}
      {!selected && (
        <div className="card" style={{ padding: 48, textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>📅</div>
          <p style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "0.9375rem", marginBottom: 6 }}>Select Branch, Semester & Group</p>
          <p style={{ color: "rgba(148,163,184,0.4)", fontSize: "0.8125rem" }}>
            {timetableData.total} timetables available across {branches.length} branches
          </p>
        </div>
      )}

      {/* Timetable grid */}
      {selected && (
        <>
          {/* Info bar */}
          <div className="card" style={{ padding: 16, marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <div>
                <p style={{ margin: 0, color: "rgba(148,163,184,0.4)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Branch</p>
                <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.875rem" }}>{selected.branch}</p>
              </div>
              <div>
                <p style={{ margin: 0, color: "rgba(148,163,184,0.4)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Semester</p>
                <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.875rem" }}>{selected.semester}</p>
              </div>
              <div>
                <p style={{ margin: 0, color: "rgba(148,163,184,0.4)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Group</p>
                <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.875rem" }}>{selected.group}</p>
              </div>
              {selected.coordinator?.name && (
                <div>
                  <p style={{ margin: 0, color: "rgba(148,163,184,0.4)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Coordinator</p>
                  <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.875rem" }}>{selected.coordinator.name}</p>
                </div>
              )}
            </div>
            <span className="badge badge-emerald">Odd Sem 2025–26</span>
          </div>

          {/* Schedule table */}
          <div className="card" style={{ padding: 20, marginBottom: 16, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800, fontSize: "0.8rem" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.08)" }}>
                  <th style={{ padding: "12px 14px", textAlign: "left", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.5)", width: 100, background: "rgba(255,255,255,0.03)", borderRight: "1px solid rgba(255,255,255,0.07)" }}>Day</th>
                  {timeSlots.map(t => (
                    <th key={t} style={{ padding: "12px 8px", textAlign: "center", fontSize: "0.65rem", fontWeight: 600, color: "rgba(148,163,184,0.45)", whiteSpace: "nowrap", minWidth: 90 }}>{t}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {selected.schedule.map((row, ri) => {
                  const isToday = row.day === today;

                  const buildCells = (slots, offset) => {
                    const cells = [];
                    let i = 0;
                    while (i < slots.length) {
                      const slot = slots[i];
                      const isLab = slot && slot.toUpperCase().includes("LAB");
                      const nextTwoNull = slots[i+1] === null && slots[i+2] === null;
                      if (isLab && nextTwoNull) {
                        cells.push({ slot, colSpan: 3, idx: offset + i });
                        i += 3;
                      } else {
                        cells.push({ slot, colSpan: 1, idx: offset + i });
                        i += 1;
                      }
                    }
                    return cells;
                  };

                  const allCells = buildCells(row.slots, 0);
                  const rowBg = isToday ? "rgba(99,102,241,0.05)" : ri % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)";

                  const renderCell = (cell, ci) => {
                    const color = cell.slot ? getSlotColor(cell.slot, colorMap) : null;
                    const isLab = cell.colSpan === 3;
                    return (
                      <td key={ci} colSpan={cell.colSpan} style={{ padding: "8px 6px", textAlign: "center", verticalAlign: "middle" }}>
                        {cell.slot ? (
                          <div style={{
                            background: isLab ? `${color}22` : `${color}15`,
                            border: `1px solid ${isLab ? color + "55" : color + "30"}`,
                            borderRadius: 8,
                            padding: isLab ? "8px 10px" : "6px",
                            color,
                            fontSize: isLab ? "0.72rem" : "0.68rem",
                            fontWeight: isLab ? 700 : 500,
                            lineHeight: 1.4,
                            minHeight: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                          }}>
                            {cell.slot}
                          </div>
                        ) : (
                          <div style={{ height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ color: "rgba(148,163,184,0.1)", fontSize: "1rem" }}>·</span>
                          </div>
                        )}
                      </td>
                    );
                  };

                  // Split cells into before lunch (slots 0-3) and after lunch (slots 4-7)
                  const beforeLunch = allCells.filter(c => c.idx <= 3);
                  const afterLunch  = allCells.filter(c => c.idx >= 4);

                  return (
                    <>
                      {/* Main row */}
                      <tr key={row.day} style={{ borderBottom: "none", background: rowBg }}>
                        <td rowSpan={2} style={{ padding: "10px 14px", whiteSpace: "nowrap", background: isToday ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.07)", verticalAlign: "middle" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                            <span style={{ fontWeight: 700, fontSize: "0.8125rem", color: isToday ? "#a5b4fc" : "#e2e8f0" }}>{row.day}</span>
                            {isToday && <span className="badge badge-indigo" style={{ fontSize: "0.58rem", padding: "1px 6px", width: "fit-content" }}>Today</span>}
                          </div>
                        </td>
                        {beforeLunch.map(renderCell)}
                        {afterLunch.map(renderCell)}
                      </tr>
                      {/* Lunch break row — only under 1:30–2:30 slot (index 4) */}
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        {/* empty cells under morning slots 0-3 */}
                        {[0,1,2,3].map(i => <td key={i} style={{ padding: 0, borderTop: "none" }} />)}
                        {/* lunch cell under slot 4 */}
                        <td style={{ padding: "3px 6px", background: "rgba(245,158,11,0.06)", borderTop: "1px dashed rgba(245,158,11,0.25)", textAlign: "center" }}>
                          <span style={{ fontSize: "0.62rem", color: "rgba(251,191,36,0.7)", fontWeight: 600, whiteSpace: "nowrap" }}>🍽 Lunch Break</span>
                        </td>
                        {/* empty cells under afternoon slots 5-7 */}
                        {[5,6,7].map(i => <td key={i} style={{ padding: 0, borderTop: "none" }} />)}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Subject details */}
          {selected.subjects.length > 0 && (
            <div className="card" style={{ padding: 20, marginBottom: 16 }}>
              <p className="section-title" style={{ marginBottom: 14 }}>Subject Details</p>
              <div style={{ overflowX: "auto" }}>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Abbr</th>
                      <th>Subject Name</th>
                      <th>Code</th>
                      <th>Credits</th>
                      <th>Faculty</th>
                      <th>Dept</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.subjects.map((s, i) => {
                      const color = colorMap[s.abbr] || COLORS[i % COLORS.length];
                      return (
                        <tr key={s.abbr || i}>
                          <td style={{ color: "rgba(148,163,184,0.3)", width: 32 }}>{i + 1}</td>
                          <td>
                            <span style={{ background: `${color}18`, color, border: `1px solid ${color}35`, padding: "3px 8px", borderRadius: 6, fontSize: "0.72rem", fontWeight: 700 }}>
                              {s.abbr}
                            </span>
                          </td>
                          <td className="td-main">{s.name || "—"}</td>
                          <td style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>{s.code || "—"}</td>
                          <td style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>{s.credits || "—"}</td>
                          <td style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.6)", maxWidth: 200 }}>{s.faculty || "—"}</td>
                          <td style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>{s.department || "—"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Coordinator card */}
          {selected.coordinator?.name && (
            <div className="card" style={{ padding: 16, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <div className="avatar" style={{ width: 40, height: 40, fontSize: "1rem", flexShrink: 0 }}>
                {selected.coordinator.name[0]}
              </div>
              <div>
                <p style={{ margin: 0, color: "rgba(148,163,184,0.4)", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Class Coordinator</p>
                <p style={{ margin: 0, color: "#e2e8f0", fontWeight: 600, fontSize: "0.875rem" }}>{selected.coordinator.name}</p>
                <div style={{ display: "flex", gap: 16, marginTop: 4, flexWrap: "wrap" }}>
                  {selected.coordinator.phone && <span style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>📞 {selected.coordinator.phone}</span>}
                  {selected.coordinator.email && <span style={{ fontSize: "0.78rem", color: "rgba(148,163,184,0.5)" }}>✉️ {selected.coordinator.email}</span>}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

export default Timetable;
