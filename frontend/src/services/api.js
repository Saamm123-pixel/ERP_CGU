import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: { "Content-Type": "application/json" },
});

// Auth
export const loginUser      = (data) => api.post("/auth/login", data);
export const registerUser   = (data) => api.post("/auth/register", data);
export const getUsersByRole = (role) => api.get(`/auth/users/role/${role}`);
export const deleteUser     = (id)   => api.delete(`/auth/users/${id}`);
export const banUser        = (id, data) => api.post(`/auth/users/${id}/ban`, data);
export const unbanUser      = (id)   => api.post(`/auth/users/${id}/unban`);

// Attendance
export const getStudentAttendance = (studentId, year) => api.get(`/attendance/student/${studentId}`, { params: { year } });
export const getAllAttendance      = ()                => api.get("/attendance/all");
export const markAttendance        = (data)            => api.post("/attendance/mark", data);

// Grades
export const getStudentGrades = (studentId)           => api.get(`/grades/student/${studentId}`);
export const getAllGrades      = ()                    => api.get("/grades/all");
export const createGrade       = (data)               => api.post("/grades", data);
export const updateGrade       = (id, data)           => api.put(`/grades/${id}`, data);
export const deleteGrade       = (id)                 => api.delete(`/grades/${id}`);

// Fees
export const getStudentFees = (studentId) => api.get(`/fees/student/${studentId}`);
export const getAllFees      = ()          => api.get("/fees/all");
export const createFee       = (data)     => api.post("/fees", data);
export const payFee          = (id, data) => api.post(`/fees/${id}/pay`, data);
export const deleteFee       = (id)       => api.delete(`/fees/${id}`);

// Notices
export const getNotices     = ()     => api.get("/notices");
export const getNoticesByRole = (role) => api.get(`/notices/role/${role}`);
export const createNotice   = (data) => api.post("/notices", data);
export const deleteNotice   = (id)   => api.delete(`/notices/${id}`);

// Complaints
export const getAllComplaints  = ()          => api.get("/complaints");
export const getUserComplaints = (name)      => api.get(`/complaints/user/${encodeURIComponent(name)}`);
export const createComplaint   = (data)      => api.post("/complaints", data);
export const respondComplaint  = (id, data)  => api.put(`/complaints/${id}/respond`, data);
export const deleteComplaint   = (id)        => api.delete(`/complaints/${id}`);

// Gate Passes
export const getAllGatePasses     = ()          => api.get("/gatepasses");
export const getStudentGatePasses = (studentId) => api.get(`/gatepasses/student/${studentId}`);
export const applyGatePass        = (data)      => api.post("/gatepasses", data);
export const approveGatePass      = (id, data)  => api.put(`/gatepasses/${id}/approve`, data);
export const rejectGatePass       = (id)        => api.put(`/gatepasses/${id}/reject`);

// Profile
export const getUser       = (id)        => api.get(`/auth/users/${id}`);
export const updateProfile = (id, data)  => api.put(`/auth/users/${id}/profile`, data);

export default api;
