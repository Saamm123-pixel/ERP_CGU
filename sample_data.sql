USE college_erp;

-- ============================================================
-- GRADES  (students: 1=Anwesha, 6=Riya, 7=Sthita)
-- ============================================================
INSERT INTO grades (student_id, student_name, subject, semester, academic_year, mid_marks, end_marks, total_marks, grade, grade_points) VALUES
-- Anwesha Majhi (id=1)
(1,'Anwesha Majhi','Data Structures',      5,'2024-25',28,62,90,'A', 9.0),
(1,'Anwesha Majhi','Operating Systems',    5,'2024-25',22,55,77,'B+',8.0),
(1,'Anwesha Majhi','DBMS',                 5,'2024-25',30,65,95,'A+',10.0),
(1,'Anwesha Majhi','Computer Networks',    5,'2024-25',20,50,70,'B', 7.0),
(1,'Anwesha Majhi','Software Engineering', 5,'2024-25',25,58,83,'A', 9.0),
-- Riya (id=6)
(6,'Riya','Data Structures',      5,'2024-25',26,58,84,'A', 9.0),
(6,'Riya','Operating Systems',    5,'2024-25',18,48,66,'B', 7.0),
(6,'Riya','DBMS',                 5,'2024-25',29,63,92,'A+',10.0),
(6,'Riya','Computer Networks',    5,'2024-25',24,54,78,'B+',8.0),
(6,'Riya','Software Engineering', 5,'2024-25',27,60,87,'A', 9.0),
-- Sthita (id=7)
(7,'Sthita','Data Structures',      5,'2024-25',20,45,65,'B', 7.0),
(7,'Sthita','Operating Systems',    5,'2024-25',25,55,80,'A', 9.0),
(7,'Sthita','DBMS',                 5,'2024-25',28,60,88,'A', 9.0),
(7,'Sthita','Computer Networks',    5,'2024-25',15,40,55,'C', 5.0),
(7,'Sthita','Software Engineering', 5,'2024-25',22,52,74,'B+',8.0);

-- ============================================================
-- ATTENDANCE  (multiple days per subject per student)
-- ============================================================
INSERT INTO attendance (student_id, student_name, subject, faculty, date, status, academic_year) VALUES
-- Anwesha (id=1)
(1,'Anwesha Majhi','Data Structures',      'Anwesha Majhi','2025-01-06','present','2024-25'),
(1,'Anwesha Majhi','Data Structures',      'Anwesha Majhi','2025-01-08','present','2024-25'),
(1,'Anwesha Majhi','Data Structures',      'Anwesha Majhi','2025-01-10','absent', '2024-25'),
(1,'Anwesha Majhi','Data Structures',      'Anwesha Majhi','2025-01-13','present','2024-25'),
(1,'Anwesha Majhi','Data Structures',      'Anwesha Majhi','2025-01-15','present','2024-25'),
(1,'Anwesha Majhi','Operating Systems',    'Anwesha Majhi','2025-01-07','present','2024-25'),
(1,'Anwesha Majhi','Operating Systems',    'Anwesha Majhi','2025-01-09','absent', '2024-25'),
(1,'Anwesha Majhi','Operating Systems',    'Anwesha Majhi','2025-01-14','present','2024-25'),
(1,'Anwesha Majhi','Operating Systems',    'Anwesha Majhi','2025-01-16','absent', '2024-25'),
(1,'Anwesha Majhi','DBMS',                 'Anwesha Majhi','2025-01-06','present','2024-25'),
(1,'Anwesha Majhi','DBMS',                 'Anwesha Majhi','2025-01-08','present','2024-25'),
(1,'Anwesha Majhi','DBMS',                 'Anwesha Majhi','2025-01-10','present','2024-25'),
(1,'Anwesha Majhi','DBMS',                 'Anwesha Majhi','2025-01-13','present','2024-25'),
(1,'Anwesha Majhi','Computer Networks',    'Anwesha Majhi','2025-01-07','present','2024-25'),
(1,'Anwesha Majhi','Computer Networks',    'Anwesha Majhi','2025-01-09','absent', '2024-25'),
(1,'Anwesha Majhi','Computer Networks',    'Anwesha Majhi','2025-01-14','present','2024-25'),
(1,'Anwesha Majhi','Software Engineering', 'Anwesha Majhi','2025-01-06','present','2024-25'),
(1,'Anwesha Majhi','Software Engineering', 'Anwesha Majhi','2025-01-08','present','2024-25'),
(1,'Anwesha Majhi','Software Engineering', 'Anwesha Majhi','2025-01-10','present','2024-25'),
-- Riya (id=6)
(6,'Riya','Data Structures',      'Anwesha Majhi','2025-01-06','present','2024-25'),
(6,'Riya','Data Structures',      'Anwesha Majhi','2025-01-08','absent', '2024-25'),
(6,'Riya','Data Structures',      'Anwesha Majhi','2025-01-10','present','2024-25'),
(6,'Riya','Data Structures',      'Anwesha Majhi','2025-01-13','present','2024-25'),
(6,'Riya','Data Structures',      'Anwesha Majhi','2025-01-15','absent', '2024-25'),
(6,'Riya','Operating Systems',    'Anwesha Majhi','2025-01-07','present','2024-25'),
(6,'Riya','Operating Systems',    'Anwesha Majhi','2025-01-09','present','2024-25'),
(6,'Riya','Operating Systems',    'Anwesha Majhi','2025-01-14','absent', '2024-25'),
(6,'Riya','DBMS',                 'Anwesha Majhi','2025-01-06','present','2024-25'),
(6,'Riya','DBMS',                 'Anwesha Majhi','2025-01-08','present','2024-25'),
(6,'Riya','DBMS',                 'Anwesha Majhi','2025-01-10','present','2024-25'),
(6,'Riya','Computer Networks',    'Anwesha Majhi','2025-01-07','absent', '2024-25'),
(6,'Riya','Computer Networks',    'Anwesha Majhi','2025-01-09','present','2024-25'),
(6,'Riya','Computer Networks',    'Anwesha Majhi','2025-01-14','present','2024-25'),
(6,'Riya','Software Engineering', 'Anwesha Majhi','2025-01-06','present','2024-25'),
(6,'Riya','Software Engineering', 'Anwesha Majhi','2025-01-08','present','2024-25'),
-- Sthita (id=7)
(7,'Sthita','Data Structures',      'Anwesha Majhi','2025-01-06','absent', '2024-25'),
(7,'Sthita','Data Structures',      'Anwesha Majhi','2025-01-08','present','2024-25'),
(7,'Sthita','Data Structures',      'Anwesha Majhi','2025-01-10','absent', '2024-25'),
(7,'Sthita','Data Structures',      'Anwesha Majhi','2025-01-13','present','2024-25'),
(7,'Sthita','Operating Systems',    'Anwesha Majhi','2025-01-07','present','2024-25'),
(7,'Sthita','Operating Systems',    'Anwesha Majhi','2025-01-09','present','2024-25'),
(7,'Sthita','Operating Systems',    'Anwesha Majhi','2025-01-14','present','2024-25'),
(7,'Sthita','DBMS',                 'Anwesha Majhi','2025-01-06','present','2024-25'),
(7,'Sthita','DBMS',                 'Anwesha Majhi','2025-01-08','absent', '2024-25'),
(7,'Sthita','DBMS',                 'Anwesha Majhi','2025-01-10','present','2024-25'),
(7,'Sthita','Computer Networks',    'Anwesha Majhi','2025-01-07','absent', '2024-25'),
(7,'Sthita','Computer Networks',    'Anwesha Majhi','2025-01-09','absent', '2024-25'),
(7,'Sthita','Software Engineering', 'Anwesha Majhi','2025-01-06','present','2024-25'),
(7,'Sthita','Software Engineering', 'Anwesha Majhi','2025-01-08','present','2024-25'),
(7,'Sthita','Software Engineering', 'Anwesha Majhi','2025-01-10','absent', '2024-25');

-- ============================================================
-- FEES  (6 semesters per student)
-- ============================================================
INSERT INTO fees (student_id, student_name, semester, academic_year, total_amount, paid_amount, due_amount, paid_date, status, payment_method) VALUES
-- Anwesha (id=1)
(1,'Anwesha Majhi','Semester 1','2021-22',45000,45000,0,'2021-07-10','Paid','UPI'),
(1,'Anwesha Majhi','Semester 2','2021-22',45000,45000,0,'2022-01-08','Paid','Net Banking'),
(1,'Anwesha Majhi','Semester 3','2022-23',47000,47000,0,'2022-07-12','Paid','UPI'),
(1,'Anwesha Majhi','Semester 4','2022-23',47000,47000,0,'2023-01-10','Paid','UPI'),
(1,'Anwesha Majhi','Semester 5','2023-24',50000,30000,20000,NULL,'Partial','UPI'),
(1,'Anwesha Majhi','Semester 6','2023-24',50000,0,50000,NULL,'Pending',NULL),
-- Riya (id=6)
(6,'Riya','Semester 1','2021-22',45000,45000,0,'2021-07-15','Paid','UPI'),
(6,'Riya','Semester 2','2021-22',45000,45000,0,'2022-01-12','Paid','Credit / Debit Card'),
(6,'Riya','Semester 3','2022-23',47000,47000,0,'2022-07-18','Paid','UPI'),
(6,'Riya','Semester 4','2022-23',47000,47000,0,'2023-01-14','Paid','Net Banking'),
(6,'Riya','Semester 5','2023-24',50000,50000,0,'2024-07-10','Paid','UPI'),
(6,'Riya','Semester 6','2023-24',50000,10000,40000,NULL,'Partial','UPI'),
-- Sthita (id=7)
(7,'Sthita','Semester 1','2021-22',45000,45000,0,'2021-07-20','Paid','Demand Draft'),
(7,'Sthita','Semester 2','2021-22',45000,45000,0,'2022-01-18','Paid','UPI'),
(7,'Sthita','Semester 3','2022-23',47000,47000,0,'2022-07-22','Paid','UPI'),
(7,'Sthita','Semester 4','2022-23',47000,0,47000,NULL,'Pending',NULL),
(7,'Sthita','Semester 5','2023-24',50000,0,50000,NULL,'Pending',NULL),
(7,'Sthita','Semester 6','2023-24',50000,0,50000,NULL,'Pending',NULL);

-- ============================================================
-- NOTICES
-- ============================================================
INSERT INTO notices (title, description, full_details, category, posted_by, posted_date, important, target_roles) VALUES
('End Semester Exam Schedule Released',
 'End semester examinations will commence from 20th April 2025. Students are advised to check the detailed schedule on the portal.',
 'Examinations start 20th April 2025. Carry Hall Ticket. No entry 30 min after start. No mobile phones. Pending fees = no Hall Ticket.',
 'Exam','Academic Section','2025-04-02',1,'all'),

('Project Submission Deadline',
 'All final year project reports must be submitted by 25th April 2025. Late submissions will not be accepted.',
 'Hard copy (2 copies) to department office. Soft copy PDF on portal. Follow prescribed format. Plagiarism report required.',
 'Academic','Department of CSE','2025-04-10',0,'student'),

('Annual Sports Day Registration',
 'Annual sports day is scheduled for 5th May 2025. Students can register for events at the sports office before 28th April.',
 'Events: Track & Field, Long Jump, Cricket, Football, Volleyball, Basketball, Table Tennis, Chess. Max 3 individual events per student.',
 'Event','Sports Committee','2025-04-18',0,'all'),

('Library Fine Clearance',
 'All pending library fines must be cleared before 15th May 2025 to avoid restrictions on exam hall tickets.',
 'Fine: Rs 5 per day per book. Visit Library Counter 9AM-4PM. Online payment via student portal. Lost books must be replaced.',
 'Admin','Library Administration','2025-05-05',1,'student'),

('Faculty Development Program',
 'A faculty development program is scheduled for 22nd May 2025. All faculty members are required to attend.',
 'Theme: Innovative Pedagogical Approaches. Date: 22nd May 2025. Venue: University Auditorium. Attendance MANDATORY.',
 'Faculty','HR Department','2025-05-15',0,'faculty'),

('New Elective Course Registration',
 'Registration for new elective courses for the upcoming odd semester is open till 20th June 2025.',
 'Courses: ML & AI, Cloud Computing, Blockchain, Cyber Security, IoT. Max 30 students per elective. CGPA >= 6.0 required.',
 'Academic','Academic Section','2025-06-03',0,'student'),

('Internal Assessment Marks Published',
 'Internal assessment marks for Semester 5 have been published on the student portal. Students may raise objections by 10th April.',
 'Login to portal > Academics > Internal Marks. Objection window: 5th-10th April 2025. Contact respective faculty for queries.',
 'Academic','Examination Cell','2025-04-01',0,'student'),

('Research Paper Submission Deadline',
 'Faculty members are reminded to submit their research papers for the annual journal by 30th May 2025.',
 'Submit to research@cgu-odisha.ac.in. Format: IEEE double-column. Max 8 pages. Include abstract and keywords.',
 'Academic','Research Committee','2025-05-20',0,'faculty');

-- ============================================================
-- COMPLAINTS
-- ============================================================
INSERT INTO complaints (title, category, priority, description, submitted_by, submitted_by_role, submitted_date, status, response) VALUES
('Classroom projector not working in Room 204',
 'Infrastructure','Medium',
 'The projector in Room 204 has not been working for the past 2 weeks. It affects all lectures scheduled in that room.',
 'Anwesha Majhi','student','2025-03-15','Resolved',
 'The projector has been repaired and is now fully functional. Thank you for reporting.'),

('Wi-Fi not working in Block B hostel',
 'IT','High',
 'The Wi-Fi connection in Block B hostel has been very slow or completely down since last Monday. Affects online assignments.',
 'Riya','student','2025-03-20','In Progress',
 'Our IT team is working on upgrading the router in Block B. Expected resolution by end of week.'),

('Canteen food quality issue',
 'Facilities','Low',
 'The quality of food in the main canteen has deteriorated significantly. The food is often cold and not fresh.',
 'Sthita','student','2025-03-25','Open',NULL),

('Lab computers need maintenance',
 'IT','High',
 'Several computers in the CS Lab (Lab 3) are running very slowly. Some have outdated software that needs updating.',
 'Anwesha Majhi','faculty','2025-03-18','In Progress',
 'Maintenance scheduled for this weekend. All systems will be updated.'),

('Library books not updated for new syllabus',
 'Academic','Medium',
 'The library does not have the latest editions of textbooks recommended in the new syllabus for Semester 5.',
 'Riya','student','2025-04-01','Open',NULL),

('Attendance portal showing incorrect data',
 'IT','High',
 'The attendance portal is showing wrong attendance percentages for some students in the CSE department.',
 'Anwesha Majhi','faculty','2025-04-05','Resolved',
 'Data has been corrected. The issue was due to a sync error which has now been fixed.');

-- ============================================================
-- GATE PASSES
-- ============================================================
INSERT INTO gate_passes (student_id, student_name, reason, type, out_date, out_time, in_time, parent_phone, notes, status, approved_by, applied_on) VALUES
(1,'Anwesha Majhi','Medical appointment at Apollo Hospital','Medical','2025-04-10','10:00','16:00','+91 98765 43210','Follow-up checkup','Approved','Anwesha Majhi','2025-04-08'),
(1,'Anwesha Majhi','Family function - sister wedding','Personal','2025-04-18','08:00','20:00','+91 98765 43210','Will return same evening','Pending',NULL,'2025-04-14'),
(1,'Anwesha Majhi','Inter-college hackathon at NIT Rourkela','Academic','2025-04-05','07:00','20:00','+91 98765 43210','Team of 4 students participating','Approved','Anwesha Majhi','2025-04-02'),
(6,'Riya','Dental checkup at City Dental Clinic','Medical','2025-04-12','14:00','18:00','+91 87654 32109','Routine checkup','Approved','Anwesha Majhi','2025-04-10'),
(6,'Riya','Sports tournament at State Sports Complex','Academic','2025-04-22','07:00','19:00','+91 87654 32109','State level badminton tournament','Pending',NULL,'2025-04-18'),
(6,'Riya','Home visit - parents unwell','Personal','2025-03-28','09:00','18:00','+91 87654 32109','Emergency visit','Rejected',NULL,'2025-03-26'),
(7,'Sthita','Eye checkup at Vision Care Hospital','Medical','2025-04-15','11:00','15:00','+91 76543 21098','Prescribed by college doctor','Approved','Anwesha Majhi','2025-04-13'),
(7,'Sthita','Cultural fest at nearby college','Academic','2025-04-25','09:00','20:00','+91 76543 21098','Representing CGU in dance competition','Pending',NULL,'2025-04-20');
