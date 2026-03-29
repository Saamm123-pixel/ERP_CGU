const XLSX = require('xlsx');
const fs   = require('fs');
const path = require('path');

const wb = XLSX.readFile(path.join(__dirname, '../src/assets/timetable.xlsx'));

const TIME_SLOTS = [
  "9:30–10:30","10:30–11:30","11:30–12:30","12:30–1:30",
  "1:30–2:30","2:30–3:30","3:30–4:30","4:30–5:30",
];

const DAY_MAP = {
  MON:"Monday",TUE:"Tuesday",WED:"Wednesday",
  THU:"Thursday",FRI:"Friday",SAT:"Saturday",
};

const SKIP = ["Sheet14","Sheet15","Sheet16","Sheet20","Sheet24","Sheet30","Copy of MCA_MSC_1st Sem"];

function parseSheet(name) {
  const ws   = wb.Sheets[name];
  const rows = XLSX.utils.sheet_to_json(ws, { header:1, defval:"" });

  const info     = String((rows[2]||[""])[0]||"");
  const semMatch = info.match(/(\d+)(st|nd|rd|th)\s*Sem/i);
  const grpMatch = info.match(/Group\s*[:\-]\s*(\d+)/i) || name.match(/Gr[- ]?(\d+)/i);
  const semester = semMatch ? parseInt(semMatch[1]) : parseInt(name.match(/(\d+)/)?.[1])||1;
  const group    = grpMatch ? parseInt(grpMatch[1]) : 1;

  // Derive branch from sheet name
  const branch = name.split("_")[0].replace(/^\s+|\s+$/g,"").toUpperCase();

  // Parse schedule rows 4-9
  const schedule = [];
  for (let r = 4; r <= 9; r++) {
    const row = rows[r];
    if (!row || !row[0]) continue;
    const dayKey = String(row[0]).trim().toUpperCase().slice(0,3);
    const day    = DAY_MAP[dayKey];
    if (!day) continue;
    const slots = [];
    for (let c = 1; c <= 8; c++) {
      const cell = String(row[c]||"").trim();
      slots.push(cell === "" || cell.toLowerCase().includes("lunch") ? null : cell);
    }
    schedule.push({ day, slots });
  }

  // Parse subjects from row 13+
  const subjects = [];
  for (let r = 13; r < rows.length; r++) {
    const row = rows[r];
    if (!row[0] || typeof row[0] !== "number") continue;
    subjects.push({
      abbr:       String(row[1]||"").trim(),
      code:       String(row[2]||"").trim(),
      name:       String(row[3]||"").trim(),
      credits:    String(row[4]||"").trim(),
      faculty:    String(row[5]||"").trim(),
      department: String(row[6]||"").trim(),
    });
  }

  // Coordinator from row 11
  const coord     = String((rows[11]||[""])[0]||"");
  const coordName = coord.match(/(?:CO-ORDINATOR|COORDINATOR)\s*[:\-]\s*([^C]+?)(?:Contact|$)/i)?.[1]?.trim()||"";
  const coordPhone= coord.match(/Contact\s*no\s*[:\-]\s*([\d\/\s]+)/i)?.[1]?.trim()||"";
  const coordEmail= coord.match(/Email\s*[:\-]\s*(\S+)/i)?.[1]||"";

  return { sheetName:name, branch, semester, group,
    coordinator:{ name:coordName, phone:coordPhone, email:coordEmail },
    schedule, subjects, timeSlots:TIME_SLOTS };
}

const timetables = wb.SheetNames
  .filter(n => !SKIP.includes(n))
  .map(n => { try { return parseSheet(n); } catch(e){ console.warn("Skip",n,e.message); return null; } })
  .filter(Boolean);

// Build grouped index — use sheetName as unique label to avoid duplicate group numbers
const grouped = {};
timetables.forEach(tt => {
  const key = `${tt.branch}_Sem${tt.semester}`;
  if (!grouped[key]) grouped[key] = { branch:tt.branch, semester:tt.semester, groups:[] };
  // Create a clean display label from sheetName
  const label = tt.sheetName.trim()
    .replace(/^CSE_|^5th Sem_CSE_|^7th Sem_CSE_/i, '')
    .replace(/_/g, ' ').trim();
  grouped[key].groups.push({ group: tt.group, sheetName: tt.sheetName, label });
});

const out = {
  generated: new Date().toISOString(),
  total: timetables.length,
  timeSlots: TIME_SLOTS,
  index: Object.values(grouped),
  timetables,
};

fs.writeFileSync(
  path.join(__dirname,'../src/assets/timetable-data.json'),
  JSON.stringify(out, null, 2)
);
console.log(`Parsed ${timetables.length} sheets`);
console.log('Branches:', [...new Set(timetables.map(t=>t.branch))].join(', '));
