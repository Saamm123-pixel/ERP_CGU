import random

random.seed(42)

first_names = ["Aarav","Aditya","Akash","Amit","Ananya","Anjali","Ankit","Arjun","Aryan","Ayush",
    "Bhavna","Deepak","Deepika","Devansh","Divya","Gaurav","Harish","Ishaan","Jyoti","Kabir",
    "Kajal","Karan","Kavya","Kishore","Komal","Kunal","Lakshmi","Manish","Meera","Mihir",
    "Monika","Nandini","Neha","Nikhil","Nilesh","Nisha","Omkar","Pallavi","Pankaj","Pooja",
    "Prachi","Pranav","Prashant","Prateek","Priya","Rahul","Raj","Rajesh","Rakesh","Ravi",
    "Ritesh","Rohit","Ruchi","Sachin","Sagar","Sahil","Sandeep","Sanjay","Sanya","Sarika",
    "Shivam","Shreya","Shruti","Simran","Sneha","Sonam","Sourav","Suresh","Swati","Tanvi",
    "Tarun","Tushar","Uday","Vaibhav","Vandana","Vijay","Vikram","Vinay","Vishal","Yash",
    "Yogesh","Abhishek","Alok","Amrita","Ankita","Ashish","Bharat","Chetan","Disha","Ekta",
    "Garima","Hemant","Isha","Jayesh","Kiran","Lalit","Madhu","Neeraj","Payal","Rohan"]

last_names = ["Agarwal","Barik","Behera","Biswal","Chakraborty","Choudhury","Das","Dey","Dubey",
    "Ghosh","Gupta","Jain","Jha","Kar","Kumar","Mahapatra","Majhi","Meher","Mishra","Mohapatra",
    "Mohanty","Nanda","Nayak","Panda","Panigrahi","Parida","Patel","Patnaik","Pradhan","Rath",
    "Rout","Sahoo","Sahu","Sarmah","Sethi","Shah","Sharma","Singh","Sinha","Swain",
    "Tripathy","Verma","Yadav","Behuria","Dalai","Dhal","Hota","Lenka","Mallick","Senapati"]

subjects    = ["Data Structures","Operating Systems","DBMS","Computer Networks","Software Engineering"]
grade_map   = [(90,100,"A+",10),(80,89,"A",9),(70,79,"B+",8),(60,69,"B",7),(50,59,"C",5),(0,49,"F",0)]
att_dates   = ["2025-01-06","2025-01-08","2025-01-10","2025-01-13","2025-01-15",
               "2025-01-20","2025-01-22","2025-01-24","2025-01-27","2025-01-29"]
att_subjs   = ["Data Structures","DBMS","Computer Networks"]
fee_methods = ["UPI","Net Banking","Credit / Debit Card","Demand Draft"]
gp_types    = ["Medical","Personal","Academic","Official"]
gp_reasons  = ["Medical appointment","Family function","Inter-college event","Sports tournament",
                "Dental checkup","Home visit","Cultural fest","Workshop attendance"]

used_emails = set()
out = []

def w(s): out.append(s)

w("USE cvrgu_erp;\n\n")

# ── 2000 STUDENTS ─────────────────────────────────────────────────────────────
student_info = []
w("-- 2000 STUDENTS\n")
CHUNK = 500
all_student_rows = []
for i in range(1, 2001):
    fn = random.choice(first_names)
    ln = random.choice(last_names)
    name = f"{fn} {ln}"
    email = f"{fn.lower()}{i}@cgu-odisha.ac.in"
    while email in used_emails:
        email = f"{fn.lower()}{i}x@cgu-odisha.ac.in"
    used_emails.add(email)
    student_info.append((name, email))
    all_student_rows.append(f"('{name}', '{email}', 'Student@123', 'student', 0)")

for c in range(0, len(all_student_rows), CHUNK):
    chunk = all_student_rows[c:c+CHUNK]
    w("INSERT IGNORE INTO users (name, email, password, role, banned) VALUES\n")
    w(",\n".join(chunk) + ";\n")
w("\n")

# ── 100 FACULTY ───────────────────────────────────────────────────────────────
faculty_info = []
w("-- 100 FACULTY\n")
all_fac_rows = []
for i in range(1, 101):
    fn = random.choice(first_names)
    ln = random.choice(last_names)
    prefix = random.choice(["Dr.","Prof.","Mr.","Ms."])
    name = f"{prefix} {fn} {ln}"
    email = f"fac{i}.{fn.lower()}@cgu-odisha.ac.in"
    while email in used_emails:
        email = f"fac{i}.{fn.lower()}x@cgu-odisha.ac.in"
    used_emails.add(email)
    faculty_info.append((name, email))
    all_fac_rows.append(f"('{name}', '{email}', 'Faculty@123', 'faculty', 0)")

w("INSERT IGNORE INTO users (name, email, password, role, banned) VALUES\n")
w(",\n".join(all_fac_rows) + ";\n\n")

# ── GRADES ────────────────────────────────────────────────────────────────────
w("-- GRADES for 2000 students\n")
grade_rows = []
for (name, email) in student_info:
    for subj in subjects:
        mid = random.randint(15, 30)
        end = random.randint(35, 70)
        total = mid + end
        grade, gpa = "B", 7
        for (lo, hi, g, gp) in grade_map:
            if lo <= total <= hi:
                grade, gpa = g, gp
                break
        grade_rows.append(f"  ROW('{email}', '{subj}', 5, '2024-25', {mid}, {end}, {total}, '{grade}', {gpa})")

w("INSERT INTO grades (student_id, student_name, subject, semester, academic_year, mid_marks, end_marks, total_marks, grade, grade_points)\n")
w("SELECT u.user_id, u.name, g.subject, g.semester, g.academic_year, g.mid_marks, g.end_marks, g.total_marks, g.grade, g.grade_points\n")
w("FROM users u\n")
w("JOIN (\n  VALUES\n")
w(",\n".join(grade_rows))
w("\n) AS g(email, subject, semester, academic_year, mid_marks, end_marks, total_marks, grade, grade_points)\n")
w("ON u.email = g.email AND u.role = 'student';\n\n")

# ── FEES ──────────────────────────────────────────────────────────────────────
w("-- FEES for 2000 students\n")
fee_rows = []
for (name, email) in student_info:
    for sem_num in [5, 6]:
        total = random.choice([45000, 47000, 50000, 52000])
        st = random.choices(["Paid","Partial","Pending"], weights=[60,25,15])[0]
        if st == "Paid":
            paid = total; due = 0
            pd = f"2024-{random.randint(7,12):02d}-{random.randint(1,28):02d}"
            method = random.choice(fee_methods)
            fee_rows.append(f"  ROW('{email}', 'Semester {sem_num}', '2024-25', {total}, {paid}, {due}, '{pd}', '{st}', '{method}')")
        elif st == "Partial":
            paid = random.randint(10000, total-5000); due = total - paid
            method = random.choice(fee_methods)
            fee_rows.append(f"  ROW('{email}', 'Semester {sem_num}', '2024-25', {total}, {paid}, {due}, NULL, '{st}', '{method}')")
        else:
            fee_rows.append(f"  ROW('{email}', 'Semester {sem_num}', '2024-25', {total}, 0, {total}, NULL, 'Pending', NULL)")

w("INSERT INTO fees (student_id, student_name, semester, academic_year, total_amount, paid_amount, due_amount, paid_date, status, payment_method)\n")
w("SELECT u.user_id, u.name, f.semester, f.academic_year, f.total_amount, f.paid_amount, f.due_amount, f.paid_date, f.status, f.payment_method\n")
w("FROM users u\n")
w("JOIN (\n  VALUES\n")
w(",\n".join(fee_rows))
w("\n) AS f(email, semester, academic_year, total_amount, paid_amount, due_amount, paid_date, status, payment_method)\n")
w("ON u.email = f.email AND u.role = 'student';\n\n")

# ── ATTENDANCE ────────────────────────────────────────────────────────────────
w("-- ATTENDANCE for 2000 students\n")
att_rows = []
for (name, email) in student_info:
    for subj in att_subjs:
        for dt in att_dates:
            st = random.choices(["present","absent"], weights=[80,20])[0]
            att_rows.append(f"  ROW('{email}', '{subj}', 'Faculty', '{dt}', '{st}', '2024-25')")

w("INSERT INTO attendance (student_id, student_name, subject, faculty, date, status, academic_year)\n")
w("SELECT u.user_id, u.name, a.subject, a.faculty, a.att_date, a.status, a.academic_year\n")
w("FROM users u\n")
w("JOIN (\n  VALUES\n")
w(",\n".join(att_rows))
w("\n) AS a(email, subject, faculty, att_date, status, academic_year)\n")
w("ON u.email = a.email AND u.role = 'student';\n\n")

# ── GATE PASSES ───────────────────────────────────────────────────────────────
w("-- GATE PASSES for 500 students\n")
gp_rows = []
for (name, email) in student_info[:500]:
    gtype  = random.choice(gp_types)
    reason = random.choice(gp_reasons)
    status = random.choices(["Approved","Pending","Rejected"], weights=[50,35,15])[0]
    out_d  = f"2025-{random.randint(3,5):02d}-{random.randint(1,28):02d}"
    app_d  = f"2025-{random.randint(2,4):02d}-{random.randint(1,28):02d}"
    gp_rows.append(f"  ROW('{email}', '{reason}', '{gtype}', '{out_d}', '10:00', '17:00', '{status}', '{app_d}')")

w("INSERT INTO gate_passes (student_id, student_name, reason, type, out_date, out_time, in_time, status, applied_on)\n")
w("SELECT u.user_id, u.name, g.reason, g.gtype, g.out_date, g.out_time, g.in_time, g.status, g.applied_on\n")
w("FROM users u\n")
w("JOIN (\n  VALUES\n")
w(",\n".join(gp_rows))
w("\n) AS g(email, reason, gtype, out_date, out_time, in_time, status, applied_on)\n")
w("ON u.email = g.email AND u.role = 'student';\n\n")

# ── NOTICES ───────────────────────────────────────────────────────────────────
w("-- NOTICES\n")
w("INSERT INTO notices (title, description, category, posted_by, posted_date, important, target_roles) VALUES\n")
notice_rows = [
    "('End Semester Exam Schedule Released','End semester examinations commence from 20th April 2025. Carry Hall Ticket. No mobile phones.','Exam','Academic Section','2025-04-02',1,'all')",
    "('Project Submission Deadline','All final year project reports must be submitted by 25th April 2025.','Academic','Department of CSE','2025-04-10',0,'student')",
    "('Annual Sports Day Registration','Annual sports day scheduled for 5th May 2025. Register before 28th April.','Event','Sports Committee','2025-04-18',0,'all')",
    "('Library Fine Clearance','All pending library fines must be cleared before 15th May 2025.','Admin','Library Administration','2025-05-05',1,'student')",
    "('Faculty Development Program','Faculty development program scheduled for 22nd May 2025. Attendance mandatory.','Faculty','HR Department','2025-05-15',0,'faculty')",
    "('New Elective Course Registration','Registration for elective courses open till 20th June 2025.','Academic','Academic Section','2025-06-03',0,'student')",
    "('Internal Assessment Marks Published','Internal assessment marks for Semester 5 published. Raise objections by 10th April.','Academic','Examination Cell','2025-04-01',0,'student')",
    "('Research Paper Submission Deadline','Faculty must submit research papers for annual journal by 30th May 2025.','Academic','Research Committee','2025-05-20',0,'faculty')",
    "('Anti-Ragging Committee Notice','Zero tolerance for ragging. Report incidents immediately.','Admin','Anti-Ragging Committee','2025-03-15',1,'all')",
    "('Scholarship Application Open','Merit and need-based scholarship applications open till 30th April 2025.','Academic','Scholarship Cell','2025-04-05',0,'student')",
]
w(",\n".join(notice_rows) + ";\n\n")

# ── COMPLAINTS ────────────────────────────────────────────────────────────────
w("-- COMPLAINTS\n")
w("INSERT INTO complaints (title, category, priority, description, submitted_by, submitted_by_role, submitted_date, status, response) VALUES\n")
complaint_rows = [
    "('Classroom projector not working in Room 204','Infrastructure','Medium','The projector in Room 204 has not been working for 2 weeks.','Anwesha Majhi','student','2025-03-15','Resolved','Projector has been repaired and is now fully functional.')",
    "('Wi-Fi not working in Block B hostel','IT','High','Wi-Fi in Block B hostel has been very slow or completely down since last Monday.','Riya','student','2025-03-20','In Progress','IT team is working on upgrading the router.')",
    "('Canteen food quality issue','Facilities','Low','Quality of food in the main canteen has deteriorated significantly.','Sthita','student','2025-03-25','Open',NULL)",
    "('Lab computers need maintenance','IT','High','Several computers in CS Lab 3 are running very slowly with outdated software.','Dr. Priya Nayak','faculty','2025-03-18','In Progress','Maintenance scheduled for this weekend.')",
    "('Library books not updated for new syllabus','Academic','Medium','Library does not have latest editions of textbooks for Semester 5.','Riya','student','2025-04-01','Open',NULL)",
    "('Attendance portal showing incorrect data','IT','High','Attendance portal is showing wrong percentages for some CSE students.','Dr. Rahul Das','faculty','2025-04-05','Resolved','Data has been corrected. Sync error has been fixed.')",
    "('Drinking water issue in Block C','Facilities','High','Water cooler in Block C has been non-functional for 3 days.','Ayush Rout','student','2025-04-08','Open',NULL)",
    "('Exam hall seating arrangement issue','Admin','Medium','Seating arrangement for end-sem exams has not been published yet.','Debasmita Panda','student','2025-04-10','In Progress','Seating chart will be published 2 days before exams.')",
]
w(",\n".join(complaint_rows) + ";\n\n")

with open("cvrgu_data.sql", "w", encoding="utf-8") as f:
    f.writelines(out)

print("Done!")
print(f"  Students: 2000, Faculty: 100")
print(f"  Grade rows: {len(grade_rows)}")
print(f"  Fee rows:   {len(fee_rows)}")
print(f"  Att rows:   {len(att_rows)}")
print(f"  GP rows:    {len(gp_rows)}")
