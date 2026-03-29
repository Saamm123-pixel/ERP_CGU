import { useNavigate, useLocation } from "react-router-dom";

const breadcrumbMap = {
  "/admin":            ["Dashboard"],
  "/admin/students":   ["Dashboard", "Students"],
  "/admin/faculty":    ["Dashboard", "Faculty"],
  "/admin/attendance": ["Dashboard", "Attendance"],
  "/admin/fees":       ["Dashboard", "Fees"],
  "/admin/timetable":  ["Dashboard", "Timetable"],
  "/admin/notices":    ["Dashboard", "Notices"],
  "/admin/profile":    ["Dashboard", "Profile"],
  "/student":            ["Dashboard"],
  "/student/attendance": ["Dashboard", "Attendance"],
  "/student/grades":     ["Dashboard", "Grades"],
  "/student/fees":       ["Dashboard", "Fees"],
  "/student/timetable":  ["Dashboard", "Timetable"],
  "/student/notices":    ["Dashboard", "Notices"],
  "/student/profile":    ["Dashboard", "Profile"],
  "/faculty":            ["Dashboard"],
  "/faculty/students":   ["Dashboard", "Students"],
  "/faculty/attendance": ["Dashboard", "Attendance"],
  "/faculty/timetable":  ["Dashboard", "Timetable"],
  "/faculty/notices":    ["Dashboard", "Notices"],
  "/faculty/profile":    ["Dashboard", "Profile"],
};

function Navbar({ onMenuClick }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const user      = JSON.parse(localStorage.getItem("user"));
  const crumbs    = breadcrumbMap[location.pathname] || ["Dashboard"];
  const now       = new Date();
  const timeStr   = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const dateStr   = now.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });

  return (
    <header className="topbar sticky top-0 z-20 flex items-center justify-between px-5 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg transition"
          style={{color:"rgba(148,163,184,0.6)"}}
          onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.07)"}
          onMouseLeave={e => e.currentTarget.style.background="transparent"}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        {/* Breadcrumb */}
        <nav className="hidden sm:flex items-center gap-1.5 text-sm">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <svg className="w-3 h-3" style={{color:"rgba(148,163,184,0.25)"}} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>}
              <span style={{color: i === crumbs.length - 1 ? "#e2e8f0" : "rgba(148,163,184,0.4)", fontWeight: i === crumbs.length - 1 ? 600 : 400}}>
                {c}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Date/time */}
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs font-medium" style={{color:"#e2e8f0"}}>{timeStr}</span>
          <span className="text-xs" style={{color:"rgba(148,163,184,0.4)"}}>{dateStr}</span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6" style={{background:"rgba(255,255,255,0.08)"}} />

        {/* Notification */}
        <button className="relative p-2 rounded-lg transition" style={{color:"rgba(148,163,184,0.6)"}}
          onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.07)"}
          onMouseLeave={e => e.currentTarget.style.background="transparent"}>
          <svg className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{background:"#6366f1"}} />
        </button>

        {/* User */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="avatar w-8 h-8 text-sm">{user?.name?.[0]?.toUpperCase()}</div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-none" style={{color:"#e2e8f0"}}>{user?.name}</p>
            <p className="text-xs mt-0.5 capitalize" style={{color:"rgba(148,163,184,0.45)"}}>{user?.role}</p>
          </div>
        </div>

        {/* Logout */}
        <button onClick={() => { localStorage.removeItem("user"); navigate("/"); }}
          className="btn-secondary hidden sm:flex" style={{padding:"6px 12px"}}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
