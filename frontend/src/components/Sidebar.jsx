import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Icons = {
  dashboard:   <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-4a1 1 0 00-1 1v3H6a1 1 0 000 2h3v3a1 1 0 002 0v-3h3a1 1 0 000-2h-3V7a1 1 0 00-1-1z" clipRule="evenodd" fillRule="evenodd"/></svg>,
  students:    <svg viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z"/></svg>,
  faculty:     <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>,
  attendance:  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg>,
  grades:      <svg viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>,
  fees:        <svg viewBox="0 0 20 20" fill="currentColor"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"/></svg>,
  timetable:   <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/></svg>,
  notices:     <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd"/></svg>,
  assignments: <svg viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg>,
  clubs:       <svg viewBox="0 0 20 20" fill="currentColor"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 14.094A5.973 5.973 0 004 17v1H1v-1a3 3 0 013.75-2.906z"/></svg>,
  complaints:  <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>,
  placement:   <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"/><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/></svg>,
  library:     <svg viewBox="0 0 20 20" fill="currentColor"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg>,
  calendar:    <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg>,
  quiz:        <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>,
  registration:<svg viewBox="0 0 20 20" fill="currentColor"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/></svg>,
  gatepass:    <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>,
  profile:     <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>,
  logout:      <svg viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/></svg>,
};

const navConfig = {
  admin: [
    { section: "Main", items: [
      { to: "/admin",          label: "Dashboard",        icon: "dashboard" },
    ]},
    { section: "Management", items: [
      { to: "/admin/students",   label: "Students",         icon: "students" },
      { to: "/admin/faculty",    label: "Faculty",          icon: "faculty" },
      { to: "/admin/attendance", label: "Attendance",       icon: "attendance" },
      { to: "/admin/fees",       label: "Fees",             icon: "fees" },
    ]},
    { section: "Academic", items: [
      { to: "/admin/timetable",    label: "Timetable",          icon: "timetable" },
      { to: "/admin/assignments",  label: "Assignments",        icon: "assignments" },
      { to: "/admin/quiz",         label: "Quizzes",            icon: "quiz" },
      { to: "/admin/notices",      label: "Notices",            icon: "notices" },
      { to: "/admin/clubs",        label: "Club Activities",    icon: "clubs" },
      { to: "/admin/placement",    label: "Placement",          icon: "placement" },
      { to: "/admin/library",      label: "Library",            icon: "library" },
      { to: "/admin/calendar",     label: "Academic Calendar",  icon: "calendar" },
    ]},
    { section: "Support", items: [
      { to: "/admin/complaints",   label: "Complaints",         icon: "complaints" },
      { to: "/admin/registration", label: "Registration",       icon: "registration" },
      { to: "/admin/gatepass",     label: "Gate Pass",          icon: "gatepass" },
    ]},
    { section: "Account", items: [
      { to: "/admin/profile",      label: "Profile",            icon: "profile" },
    ]},
  ],
  student: [
    { section: "Main", items: [
      { to: "/student",            label: "Dashboard",          icon: "dashboard" },
    ]},
    { section: "Academic", items: [
      { to: "/student/attendance",  label: "Attendance",        icon: "attendance" },
      { to: "/student/grades",      label: "Grades",            icon: "grades" },
      { to: "/student/timetable",   label: "Timetable",         icon: "timetable" },
      { to: "/student/assignments", label: "Assignments",       icon: "assignments" },
      { to: "/student/quiz",        label: "Quizzes",           icon: "quiz" },
    ]},
    { section: "Campus", items: [
      { to: "/student/fees",         label: "Fees",             icon: "fees" },
      { to: "/student/notices",      label: "Notices",          icon: "notices" },
      { to: "/student/clubs",        label: "Club Activities",  icon: "clubs" },
      { to: "/student/placement",    label: "Placement",        icon: "placement" },
      { to: "/student/library",      label: "Library",          icon: "library" },
      { to: "/student/calendar",     label: "Academic Calendar",icon: "calendar" },
      { to: "/student/registration", label: "Registration",     icon: "registration" },
      { to: "/student/gatepass",     label: "Gate Pass",        icon: "gatepass" },
      { to: "/student/complaints",   label: "Complaints",       icon: "complaints" },
    ]},
    { section: "Account", items: [
      { to: "/student/profile",    label: "Profile",            icon: "profile" },
    ]},
  ],
  faculty: [
    { section: "Main", items: [
      { to: "/faculty",            label: "Dashboard",          icon: "dashboard" },
    ]},
    { section: "Teaching", items: [
      { to: "/faculty/students",    label: "Students",          icon: "students" },
      { to: "/faculty/attendance",  label: "Attendance",        icon: "attendance" },
      { to: "/faculty/timetable",   label: "Timetable",         icon: "timetable" },
      { to: "/faculty/assignments", label: "Assignments",       icon: "assignments" },
      { to: "/faculty/quiz",        label: "Quizzes",           icon: "quiz" },
    ]},
    { section: "Campus", items: [
      { to: "/faculty/notices",     label: "Notices",           icon: "notices" },
      { to: "/faculty/clubs",       label: "Club Activities",   icon: "clubs" },
      { to: "/faculty/placement",   label: "Placement",         icon: "placement" },
      { to: "/faculty/library",     label: "Library",           icon: "library" },
      { to: "/faculty/calendar",    label: "Academic Calendar", icon: "calendar" },
      { to: "/faculty/gatepass",    label: "Gate Pass",         icon: "gatepass" },
      { to: "/faculty/complaints",  label: "Complaints",        icon: "complaints" },
    ]},
    { section: "Account", items: [
      { to: "/faculty/profile",    label: "Profile",            icon: "profile" },
    ]},
  ],
};

const roleLabel = { admin: "Administrator", student: "Student", faculty: "Faculty" };
const roleBadge = {
  admin:   "badge-violet",
  student: "badge-sky",
  faculty: "badge-emerald",
};

function Sidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const sections = navConfig[user?.role] || [];

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={() => setOpen(false)} />
      )}
      <aside className={`sidebar fixed top-0 left-0 h-full z-30 flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

        {/* Logo Header */}
        <div className="sidebar-logo-header">
          <div className="sidebar-logo-glow" />
          <img src={logo} alt="CGU Logo" className="sidebar-logo-img" />
          <div>
            <p className="sidebar-logo-title">CGU Portal</p>
            <p className="sidebar-logo-sub">College ERP System</p>
          </div>
        </div>

        {/* User */}
        <div className="px-4 py-3" style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{background:"rgba(255,255,255,0.04)"}}>
            <div className="avatar w-8 h-8 text-sm flex-shrink-0">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate leading-none">{user?.name}</p>
              <p className="text-xs mt-0.5 truncate" style={{color:"rgba(148,163,184,0.45)"}}>{roleLabel[user?.role]}</p>
            </div>
            <span className={`badge ${roleBadge[user?.role]} flex-shrink-0`}>{user?.role}</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
          {sections.map((sec) => (
            <div key={sec.section}>
              <p className="nav-section-label">{sec.section}</p>
              {sec.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === `/${user?.role}`}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                >
                  <span className="nav-icon">{Icons[item.icon]}</span>
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-3" style={{borderTop:"1px solid rgba(255,255,255,0.06)"}}>
          <button onClick={() => { localStorage.removeItem("user"); navigate("/"); }}
            className="nav-link w-full" style={{color:"rgba(248,113,113,0.8)"}}>
            <span className="nav-icon">{Icons.logout}</span>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
