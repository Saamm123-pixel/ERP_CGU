import random
random.seed(42)

first_names = [
    "Aarav","Aditya","Akash","Amit","Ananya","Anjali","Ankit","Arjun","Aryan","Ayush",
    "Bhavna","Deepak","Deepika","Devansh","Divya","Gaurav","Harish","Ishaan","Jyoti","Kabir",
    "Kajal","Karan","Kavya","Kishore","Komal","Kunal","Lakshmi","Manish","Meera","Mihir",
    "Monika","Nandini","Neha","Nikhil","Nilesh","Nisha","Omkar","Pallavi","Pankaj","Pooja",
    "Prachi","Pranav","Prashant","Prateek","Priya","Rahul","Raj","Rajesh","Rakesh","Ravi",
    "Ritesh","Rohit","Ruchi","Sachin","Sagar","Sahil","Sandeep","Sanjay","Sanya","Sarika",
    "Shivam","Shreya","Shruti","Simran","Sneha","Sonam","Sourav","Suresh","Swati","Tanvi",
    "Tarun","Tushar","Uday","Vaibhav","Vandana","Vijay","Vikram","Vinay","Vishal","Yash",
    "Yogesh","Abhishek","Alok","Amrita","Ankita","Ashish","Bharat","Chetan","Disha","Ekta",
    "Garima","Hemant","Isha","Jayesh","Kiran","Lalit","Madhu","Neeraj","Payal","Rohan"
]

last_names = [
    "Agarwal","Barik","Behera","Biswal","Chakraborty","Choudhury","Das","Dey","Dubey","Ghosh",
    "Gupta","Jain","Jha","Kar","Kumar","Mahapatra","Majhi","Meher","Mishra","Mohapatra",
    "Mohanty","Nanda","Nayak","Panda","Panigrahi","Parida","Patel","Patnaik","Pradhan","Rath",
    "Rout","Sahoo","Sahu","Sarmah","Sethi","Shah","Sharma","Singh","Sinha","Swain",
    "Tripathy","Verma","Yadav","Behuria","Dalai","Dhal","Hota","Lenka","Mallick","Senapati"
]

departments_list = ["Computer Science & Engineering","Electronics & Communication","Electrical Engineering","Mechanical Engineering","Civil Engineering"]
dept_codes       = ["CSE","ECE","EEE","ME","CE"]
batch_years      = [2021,2022,2023,2024]
semesters_list   = ["Semester 1","Semester 2","Semester 3","Semester 4","Semester 5","Semester 6","Semester 7","Semester 8"]
subjects         = ["Data Structures","Operating Systems","DBMS","Computer Networks","Software Engineering"]
grade_map        = [(90,100,"A+",10),(80,89,"A",9),(70,79,"B+",8),(60,69,"B",7),(50,59,"C",5),(0,49,"F",0)]
att_dates        = ["2025-01-06","2025-01-08","2025-01-10","2025-01-13","2025-01-15",
                    "2025-01-20","2025-01-22","2025-01-24","2025-01-27","2025-01-29",
                    "2025-02-03","2025-02-05","2025-02-07","2025-02-10","2025-02-12"]
att_subjs        = ["Data Structures","DBMS","Computer Networks","Operating Systems","Software Engineering"]
fee_methods      = ["UPI","Net Banking","Credit / Debit Card","Demand Draft"]
gp_types         = ["Medical","Personal","Academic","Official"]
gp_reasons       = ["Medical appointment at Apollo Hospital","Family function - parents anniversary",
                    "Inter-college hackathon at NIT Rourkela","State level sports tournament",
                    "Dental checkup at City Dental Clinic","Home visit - parents unwell",
                    "Cultural fest at nearby college","Workshop on Machine Learning",
                    "Blood donation camp","Eye checkup at Vision Care Hospital"]
designations     = ["Assistant Professor","Associate Professor","Professor","Senior Lecturer","Lecturer"]
qualifications   = ["M.Tech","Ph.D","M.E","M.Sc","MBA"]
specializations  = ["Artificial Intelligence","Data Structures","Computer Networks","VLSI Design",
                    "Power Systems","Thermodynamics","Structural Engineering","Digital Electronics",
                    "Machine Learning","Database Systems","Embedded Systems","Control Systems"]
blood_groups     = ["A+","A-","B+","B-","O+","O-","AB+","AB-"]
cities           = ["Bhubaneswar","Cuttack","Rourkela","Berhampur","Sambalpur","Puri","Balasore","Brahmapur"]
streets          = ["MG Road","Station Road","College Road","Gandhi Nagar","Nehru Street","Rajpath","Civil Lines"]

used_emails = set()
# existing emails
used_emails.update(["Sam@bad.boy","saamm@gmail.com","Sammmm@bad.boy","sdsd@gmail.com"])

lines = []
def w(s): lines.append(s)

w("USE cvrgu_erp;\n\n")

# ── 100 STUDENTS ──────────────────────────────────────────────────────────────
student_data = []  # (id_placeholder, name, email, dept, batch, sem_num, phone, dob, address, blood)
w("-- ============================================================\n")
w("-- 100 STUDENTS\n")
w("-- ============================================================\n")
w("INSERT INTO users (name, email, password, role, banned, phone, dob, address, department, bio) VALUES\n")

student_rows = []
for i in range(1, 101):
    fn   = random.choice(first_names)
    ln   = random.choice(last_names)
    name = f"{fn} {ln}"
    dept_idx = (i-1) % 5
    dept = departments_list[dept_idx]
    dcode = dept_codes[dept_idx]
    batch = random.choice(batch_years)
    sem_num = random.randint(1, 8)
    phone = f"+91 {random.randint(70000,99999):05d}{random.randint(10000,99999):05d}"
    dob_y = random.randint(2000,2005); dob_m = random.randint(1,12); dob_d = random.randint(1,28)
    dob   = f"{dob_y}-{dob_m:02d}-{dob_d:02d}"
    addr  = f"{random.randint(1,999)}, {random.choice(streets)}, {random.choice(cities)}, Odisha"
    blood = random.choice(blood_groups)
    bio   = f"B.Tech {dcode} student, Batch {batch}. Passionate about technology and innovation."

    email = f"{fn.lower()}.{ln.lower()}{i}@cgu.ac.in"
    while email in used_emails:
        email = f"{fn.lower()}.{ln.lower()}{i}x@cgu.ac.in"
    used_emails.add(email)

    student_data.append((name, email, dept, dcode, batch, sem_num, phone, dob, addr, blood))
    student_rows.append(f"('{name}', '{email}', 'Student@123', 'student', 0, '{phone}', '{dob}', '{addr}', '{dept}', '{bio}')")

w(",\n".join(student_rows) + ";\n\n")

# ── 20 FACULTY ────────────────────────────────────────────────────────────────
faculty_data = []  # (name, email, dept, designation, qual, spec, phone, emp_id)
w("-- ============================================================\n")
w("-- 20 FACULTY\n")
w("-- ============================================================\n")
w("INSERT INTO users (name, email, password, role, banned, phone, department, bio) VALUES\n")

faculty_rows = []
for i in range(1, 21):
    fn     = random.choice(first_names)
    ln     = random.choice(last_names)
    prefix = random.choice(["Dr.","Prof.","Mr.","Ms."])
    name   = f"{prefix} {fn} {ln}"
    dept_idx = (i-1) % 5
    dept   = departments_list[dept_idx]
    desig  = random.choice(designations)
    qual   = random.choice(qualifications)
    spec   = random.choice(specializations)
    phone  = f"+91 {random.randint(70000,99999):05d}{random.randint(10000,99999):05d}"
    emp_id = f"CGU-FAC-{i:03d}"
    bio    = f"{desig}, {dept}. Specialization: {spec}. Qualification: {qual}."

    email = f"faculty{i}.{fn.lower()}@cgu.ac.in"
    while email in used_emails:
        email = f"faculty{i}.{fn.lower()}x@cgu.ac.in"
    used_emails.add(email)

    faculty_data.append((name, email, dept, desig, qual, spec, phone, emp_id))
    faculty_rows.append(f"('{name}', '{email}', 'Faculty@123', 'faculty', 0, '{phone}', '{dept}', '{bio}')")

w(",\n".join(faculty_rows) + ";\n\n")

# ── GRADES (100 students × 5 subjects = 500 rows) ────────────────────────────
w("-- ============================================================\n")
w("-- GRADES: 100 students × 5 subjects\n")
w("-- ============================================================\n")
w("INSERT INTO grades (student_id, student_name, subject, semester, academic_year, mid_marks, end_marks, total_marks, grade, grade_points)\n")
w("SELECT u.id, u.name, g.subject, g.semester, g.academic_year, g.mid_marks, g.end_marks, g.total_marks, g.grade, g.grade_points\n")
w("FROM users u JOIN (\n  VALUES\n")

grade_rows = []
for (name, email, dept, dcode, batch, sem_num, *_) in student_data:
    for subj in subjects:
        mid = random.randint(15, 30)
        end = random.randint(35, 70)
        total = mid + end
        grade, gpa = "B", 7
        for (lo, hi, g, gp) in grade_map:
            if lo <= total <= hi:
                grade, gpa = g, gp
                break
        grade_rows.append(f"  ROW('{email}', '{subj}', {sem_num}, '2024-25', {mid}, {end}, {total}, '{grade}', {gpa})")

w(",\n".join(grade_rows))
w("\n) AS g(email, subject, semester, academic_year, mid_marks, end_marks, total_marks, grade, grade_points)\n")
w("ON u.email = g.email AND u.role = 'student';\n\n")

# ── FEES (100 students × 6 semesters = 600 rows) ─────────────────────────────
w("-- ============================================================\n")
w("-- FEES: 100 students × 6 semesters\n")
w("-- ============================================================\n")
w("INSERT INTO fees (student_id, student_name, semester, academic_year, total_amount, paid_amount, due_amount, paid_date, status, payment_method)\n")
w("SELECT u.id, u.name, f.semester, f.academic_year, f.total_amount, f.paid_amount, f.due_amount, f.paid_date, f.status, f.payment_method\n")
w("FROM users u JOIN (\n  VALUES\n")

fee_rows = []
for (name, email, dept, dcode, batch, sem_num, *_) in student_data:
    for sn in range(1, 7):
        total = random.choice([45000, 47000, 50000, 52000])
        if sn < sem_num:
            # past semesters — mostly paid
            st = random.choices(["Paid","Partial"], weights=[85,15])[0]
        elif sn == sem_num:
            # current semester — mix
            st = random.choices(["Paid","Partial","Pending"], weights=[50,30,20])[0]
        else:
            # future semesters — pending
            st = "Pending"

        if st == "Paid":
            paid = total; due = 0
            yr = batch + (sn-1)//2
            pd = f"{yr}-{random.randint(7,12):02d}-{random.randint(1,28):02d}"
            method = random.choice(fee_methods)
            fee_rows.append(f"  ROW('{email}', 'Semester {sn}', '2024-25', {total}, {paid}, {due}, '{pd}', 'Paid', '{method}')")
        elif st == "Partial":
            paid = random.randint(15000, total-5000); due = total - paid
            method = random.choice(fee_methods)
            fee_rows.append(f"  ROW('{email}', 'Semester {sn}', '2024-25', {total}, {paid}, {due}, NULL, 'Partial', '{method}')")
        else:
            fee_rows.append(f"  ROW('{email}', 'Semester {sn}', '2024-25', {total}, 0, {total}, NULL, 'Pending', NULL)")

w(",\n".join(fee_rows))
w("\n) AS f(email, semester, academic_year, total_amount, paid_amount, due_amount, paid_date, status, payment_method)\n")
w("ON u.email = f.email AND u.role = 'student';\n\n")

# ── ATTENDANCE (100 students × 5 subjects × 15 dates = 7500 rows) ────────────
w("-- ============================================================\n")
w("-- ATTENDANCE: 100 students × 5 subjects × 15 dates\n")
w("-- ============================================================\n")
w("INSERT INTO attendance (student_id, student_name, subject, faculty, date, status, academic_year)\n")
w("SELECT u.id, u.name, a.subject, a.faculty, a.att_date, a.status, a.academic_year\n")
w("FROM users u JOIN (\n  VALUES\n")

att_rows = []
fac_names = [fd[0] for fd in faculty_data]
for (name, email, *_) in student_data:
    for subj in att_subjs:
        fac = random.choice(fac_names)
        for dt in att_dates:
            st = random.choices(["present","absent"], weights=[80,20])[0]
            att_rows.append(f"  ROW('{email}', '{subj}', '{fac}', '{dt}', '{st}', '2024-25')")

w(",\n".join(att_rows))
w("\n) AS a(email, subject, faculty, att_date, status, academic_year)\n")
w("ON u.email = a.email AND u.role = 'student';\n\n")

# ── GATE PASSES (100 students × 2 passes = 200 rows) ─────────────────────────
w("-- ============================================================\n")
w("-- GATE PASSES: 100 students × 2 passes each\n")
w("-- ============================================================\n")
w("INSERT INTO gate_passes (student_id, student_name, reason, type, out_date, out_time, in_time, parent_phone, status, approved_by, applied_on)\n")
w("SELECT u.id, u.name, g.reason, g.gtype, g.out_date, g.out_time, g.in_time, g.parent_phone, g.status, g.approved_by, g.applied_on\n")
w("FROM users u JOIN (\n  VALUES\n")

gp_rows = []
fac_emails_names = [(fd[0], fd[1]) for fd in faculty_data]
for (name, email, *rest) in student_data:
    phone = rest[2]  # phone is index 2 in student_data after dept,dcode,batch,sem_num
    for pass_num in range(2):
        gtype  = random.choice(gp_types)
        reason = random.choice(gp_reasons)
        status = random.choices(["Approved","Pending","Rejected"], weights=[55,35,10])[0]
        out_m  = random.randint(3,5); out_d = random.randint(1,28)
        out_date = f"2025-{out_m:02d}-{out_d:02d}"
        app_m  = out_m if out_d > 2 else max(1, out_m-1)
        app_date = f"2025-{app_m:02d}-{random.randint(1,out_d):02d}"
        out_time = f"{random.randint(8,11):02d}:00"
        in_time  = f"{random.randint(15,19):02d}:00"
        approved_by = random.choice(fac_emails_names)[0] if status == "Approved" else "NULL_VAL"
        if approved_by == "NULL_VAL":
            gp_rows.append(f"  ROW('{email}', '{reason}', '{gtype}', '{out_date}', '{out_time}', '{in_time}', '{phone}', '{status}', NULL, '{app_date}')")
        else:
            gp_rows.append(f"  ROW('{email}', '{reason}', '{gtype}', '{out_date}', '{out_time}', '{in_time}', '{phone}', '{status}', '{approved_by}', '{app_date}')")

w(",\n".join(gp_rows))
w("\n) AS g(email, reason, gtype, out_date, out_time, in_time, parent_phone, status, approved_by, applied_on)\n")
w("ON u.email = g.email AND u.role = 'student';\n\n")

# ── NOTICES (10 notices) ──────────────────────────────────────────────────────
w("-- ============================================================\n")
w("-- NOTICES\n")
w("-- ============================================================\n")
w("INSERT INTO notices (title, description, category, posted_by, posted_date, important, target_roles) VALUES\n")
notice_rows = [
    "('End Semester Exam Schedule Released','End semester examinations commence from 20th April 2025. Students must carry Hall Ticket. No mobile phones allowed in exam hall.','Exam','Academic Section','2025-04-02',1,'all')",
    "('Project Submission Deadline','All final year project reports must be submitted by 25th April 2025. Late submissions will not be accepted under any circumstances.','Academic','Department of CSE','2025-04-10',0,'student')",
    "('Annual Sports Day Registration','Annual sports day is scheduled for 5th May 2025. Students can register for events at the sports office before 28th April 2025.','Event','Sports Committee','2025-04-18',0,'all')",
    "('Library Fine Clearance Notice','All pending library fines must be cleared before 15th May 2025 to avoid restrictions on examination hall tickets.','Admin','Library Administration','2025-05-05',1,'student')",
    "('Faculty Development Program','A faculty development program is scheduled for 22nd May 2025. All faculty members are required to attend mandatorily.','Faculty','HR Department','2025-05-15',0,'faculty')",
    "('New Elective Course Registration Open','Registration for new elective courses for the upcoming odd semester is open till 20th June 2025. Login to portal to register.','Academic','Academic Section','2025-06-03',0,'student')",
    "('Internal Assessment Marks Published','Internal assessment marks for Semester 5 have been published on the student portal. Students may raise objections by 10th April 2025.','Academic','Examination Cell','2025-04-01',0,'student')",
    "('Research Paper Submission Deadline','Faculty members are reminded to submit their research papers for the annual journal by 30th May 2025.','Academic','Research Committee','2025-05-20',0,'faculty')",
    "('Anti-Ragging Committee Notice','Zero tolerance policy for ragging. Report any incidents to the anti-ragging committee immediately. Helpline: 1800-180-5522.','Admin','Anti-Ragging Committee','2025-03-15',1,'all')",
    "('Scholarship Application Open','Merit and need-based scholarship applications are open. Eligible students must apply before 30th April 2025 via the student portal.','Academic','Scholarship Cell','2025-04-05',0,'student')",
]
w(",\n".join(notice_rows) + ";\n\n")

# ── COMPLAINTS (20 complaints from students and faculty) ─────────────────────
w("-- ============================================================\n")
w("-- COMPLAINTS: 20 complaints\n")
w("-- ============================================================\n")
w("INSERT INTO complaints (title, category, priority, description, submitted_by, submitted_by_role, submitted_date, status, response) VALUES\n")

complaint_templates = [
    ("Classroom projector not working in Room {room}","Infrastructure","Medium",
     "The projector in Room {room} has not been working for the past {days} days. It affects all lectures scheduled in that room.",
     "Open",None),
    ("Wi-Fi connectivity issue in {block} Block","IT","High",
     "The Wi-Fi connection in {block} Block has been very slow or completely down since last {day}. This is affecting online assignments and research work.",
     "In Progress","Our IT team is actively working on the issue. Expected resolution within 48 hours."),
    ("Canteen food quality needs improvement","Facilities","Low",
     "The quality of food served in the main canteen has deteriorated significantly over the past month. Food is often cold and not fresh.",
     "Open",None),
    ("Lab computers require urgent maintenance","IT","High",
     "Several computers in the {lab} Lab are running very slowly. Some have outdated software that needs immediate updating for practical sessions.",
     "In Progress","Maintenance has been scheduled for this weekend. All systems will be updated."),
    ("Library does not have latest edition textbooks","Academic","Medium",
     "The library does not have the latest editions of textbooks recommended in the new syllabus for Semester {sem}. Students are facing difficulty.",
     "Open",None),
    ("Attendance portal showing incorrect percentage","IT","High",
     "The attendance portal is showing incorrect attendance percentages for students in the {dept} department. This is causing unnecessary concern.",
     "Resolved","Data has been corrected. The issue was due to a sync error which has now been permanently fixed."),
    ("Drinking water cooler not working in {block} Block","Facilities","High",
     "The water cooler in {block} Block has been non-functional for {days} days. Students are facing difficulty getting drinking water.",
     "Open",None),
    ("Exam hall seating arrangement not published","Admin","Medium",
     "The seating arrangement for the upcoming end-semester examinations has not been published yet. Students are anxious about the same.",
     "In Progress","Seating chart will be published 3 days before the examination commencement."),
    ("Hostel room maintenance required","Facilities","Medium",
     "The electrical fittings in hostel Block {block} Room {room} are faulty. There is a risk of short circuit. Immediate attention required.",
     "Open",None),
    ("Sports equipment in poor condition","Facilities","Low",
     "The sports equipment available in the sports room is in very poor condition. Badminton rackets, cricket bats need replacement urgently.",
     "Resolved","New sports equipment has been procured and will be available from next week."),
]

blocks = ["A","B","C","D"]
labs   = ["CS","ECE","Physics","Chemistry","Computer"]
days_of_week = ["Monday","Tuesday","Wednesday","Thursday"]
rooms  = [101,102,103,201,202,203,301,302]

complaint_rows = []
# Use first 10 students and first 5 faculty for complaints
for idx, (name, email, dept, dcode, *_) in enumerate(student_data[:10]):
    tmpl = complaint_templates[idx % len(complaint_templates)]
    title = tmpl[0].format(room=random.choice(rooms), block=random.choice(blocks), lab=random.choice(labs), day=random.choice(days_of_week), sem=random.randint(3,7), dept=dcode, days=random.randint(2,10))
    desc  = tmpl[3].format(room=random.choice(rooms), block=random.choice(blocks), lab=random.choice(labs), day=random.choice(days_of_week), sem=random.randint(3,7), dept=dcode, days=random.randint(2,10))
    status = tmpl[4]
    resp   = f"'{tmpl[5]}'" if tmpl[5] else "NULL"
    date   = f"2025-{random.randint(3,5):02d}-{random.randint(1,28):02d}"
    complaint_rows.append(f"('{title}', '{tmpl[1]}', '{tmpl[2]}', '{desc}', '{name}', 'student', '{date}', '{status}', {resp})")

for idx, (name, email, dept, desig, *_) in enumerate(faculty_data[:5]):
    tmpl = complaint_templates[(idx+5) % len(complaint_templates)]
    title = tmpl[0].format(room=random.choice(rooms), block=random.choice(blocks), lab=random.choice(labs), day=random.choice(days_of_week), sem=random.randint(3,7), dept=dept_codes[idx%5], days=random.randint(2,10))
    desc  = tmpl[3].format(room=random.choice(rooms), block=random.choice(blocks), lab=random.choice(labs), day=random.choice(days_of_week), sem=random.randint(3,7), dept=dept_codes[idx%5], days=random.randint(2,10))
    status = tmpl[4]
    resp   = f"'{tmpl[5]}'" if tmpl[5] else "NULL"
    date   = f"2025-{random.randint(3,5):02d}-{random.randint(1,28):02d}"
    complaint_rows.append(f"('{title}', '{tmpl[1]}', '{tmpl[2]}', '{desc}', '{name}', 'faculty', '{date}', '{status}', {resp})")

# Add 5 more from remaining students
for idx, (name, email, dept, dcode, *_) in enumerate(student_data[10:15]):
    tmpl = complaint_templates[idx % len(complaint_templates)]
    title = tmpl[0].format(room=random.choice(rooms), block=random.choice(blocks), lab=random.choice(labs), day=random.choice(days_of_week), sem=random.randint(3,7), dept=dcode, days=random.randint(2,10))
    desc  = tmpl[3].format(room=random.choice(rooms), block=random.choice(blocks), lab=random.choice(labs), day=random.choice(days_of_week), sem=random.randint(3,7), dept=dcode, days=random.randint(2,10))
    status = random.choice(["Open","In Progress","Resolved"])
    resp   = "'Issue has been noted and will be resolved shortly.'" if status != "Open" else "NULL"
    date   = f"2025-{random.randint(3,5):02d}-{random.randint(1,28):02d}"
    complaint_rows.append(f"('{title}', '{tmpl[1]}', '{tmpl[2]}', '{desc}', '{name}', 'student', '{date}', '{status}', {resp})")

w(",\n".join(complaint_rows) + ";\n\n")

with open("full_data.sql", "w", encoding="utf-8") as f:
    f.writelines(lines)

print("Generated full_data.sql")
print(f"  Students:    100")
print(f"  Faculty:     20")
print(f"  Grades:      {len(grade_rows)}")
print(f"  Fees:        {len(fee_rows)}")
print(f"  Attendance:  {len(att_rows)}")
print(f"  Gate passes: {len(gp_rows)}")
print(f"  Notices:     {len(notice_rows)}")
print(f"  Complaints:  {len(complaint_rows)}")
