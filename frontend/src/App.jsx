import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login          from "./pages/Login";
import Register       from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import Profile        from "./pages/Profile";
import Attendance     from "./pages/Attendance";
import Timetable      from "./pages/Timetable";
import Fees           from "./pages/Fees";
import NoticeBoard    from "./pages/NoticeBoard";
import Grades         from "./pages/Grades";
import Assignments    from "./pages/Assignments";
import ClubActivities from "./pages/ClubActivities";
import Complaints     from "./pages/Complaints";
import Placement      from "./pages/Placement";
import Library        from "./pages/Library";
import AcademicCalendar from "./pages/AcademicCalendar";
import Quiz               from "./pages/Quiz";
import StudentRegistration from "./pages/StudentRegistration";
import GatePass           from "./pages/GatePass";

function ProtectedRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

function wrap(roles, Comp) {
  return <ProtectedRoute roles={roles}><Comp /></ProtectedRoute>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin */}
        <Route path="/admin"                  element={wrap(["admin"], AdminDashboard)} />
        <Route path="/admin/students"         element={wrap(["admin"], AdminDashboard)} />
        <Route path="/admin/faculty"          element={wrap(["admin"], AdminDashboard)} />
        <Route path="/admin/attendance"       element={wrap(["admin"], Attendance)} />
        <Route path="/admin/fees"             element={wrap(["admin"], Fees)} />
        <Route path="/admin/timetable"        element={wrap(["admin"], Timetable)} />
        <Route path="/admin/notices"          element={wrap(["admin"], NoticeBoard)} />
        <Route path="/admin/assignments"      element={wrap(["admin"], Assignments)} />
        <Route path="/admin/clubs"            element={wrap(["admin"], ClubActivities)} />
        <Route path="/admin/complaints"       element={wrap(["admin"], Complaints)} />
        <Route path="/admin/placement"        element={wrap(["admin"], Placement)} />
        <Route path="/admin/library"          element={wrap(["admin"], Library)} />
        <Route path="/admin/calendar"         element={wrap(["admin"], AcademicCalendar)} />
        <Route path="/admin/quiz"             element={wrap(["admin"], Quiz)} />
        <Route path="/admin/registration"     element={wrap(["admin"], StudentRegistration)} />
        <Route path="/admin/gatepass"         element={wrap(["admin"], GatePass)} />
        <Route path="/admin/profile"          element={wrap(["admin"], Profile)} />

        {/* Student */}
        <Route path="/student"                element={wrap(["student"], StudentDashboard)} />
        <Route path="/student/attendance"     element={wrap(["student"], Attendance)} />
        <Route path="/student/grades"         element={wrap(["student"], Grades)} />
        <Route path="/student/fees"           element={wrap(["student"], Fees)} />
        <Route path="/student/timetable"      element={wrap(["student"], Timetable)} />
        <Route path="/student/notices"        element={wrap(["student"], NoticeBoard)} />
        <Route path="/student/assignments"    element={wrap(["student"], Assignments)} />
        <Route path="/student/clubs"          element={wrap(["student"], ClubActivities)} />
        <Route path="/student/complaints"     element={wrap(["student"], Complaints)} />
        <Route path="/student/placement"      element={wrap(["student"], Placement)} />
        <Route path="/student/library"        element={wrap(["student"], Library)} />
        <Route path="/student/calendar"       element={wrap(["student"], AcademicCalendar)} />
        <Route path="/student/quiz"           element={wrap(["student"], Quiz)} />
        <Route path="/student/registration"   element={wrap(["student"], StudentRegistration)} />
        <Route path="/student/gatepass"       element={wrap(["student"], GatePass)} />
        <Route path="/student/profile"        element={wrap(["student"], Profile)} />

        {/* Faculty */}
        <Route path="/faculty"                element={wrap(["faculty"], FacultyDashboard)} />
        <Route path="/faculty/students"       element={wrap(["faculty"], FacultyDashboard)} />
        <Route path="/faculty/attendance"     element={wrap(["faculty"], Attendance)} />
        <Route path="/faculty/timetable"      element={wrap(["faculty"], Timetable)} />
        <Route path="/faculty/notices"        element={wrap(["faculty"], NoticeBoard)} />
        <Route path="/faculty/assignments"    element={wrap(["faculty"], Assignments)} />
        <Route path="/faculty/clubs"          element={wrap(["faculty"], ClubActivities)} />
        <Route path="/faculty/complaints"     element={wrap(["faculty"], Complaints)} />
        <Route path="/faculty/placement"      element={wrap(["faculty"], Placement)} />
        <Route path="/faculty/library"        element={wrap(["faculty"], Library)} />
        <Route path="/faculty/calendar"       element={wrap(["faculty"], AcademicCalendar)} />
        <Route path="/faculty/quiz"           element={wrap(["faculty"], Quiz)} />
        <Route path="/faculty/gatepass"       element={wrap(["faculty"], GatePass)} />
        <Route path="/faculty/profile"        element={wrap(["faculty"], Profile)} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
