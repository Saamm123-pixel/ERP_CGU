package com.college.erp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "grades")
public class Grade {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long studentId;
    @Column(nullable = false) private String studentName;
    @Column(nullable = false) private String subject;
    @Column(nullable = false) private int semester;
    @Column(nullable = false) private String academicYear;
    @Column(nullable = false) private int midMarks;
    @Column(nullable = false) private int endMarks;
    @Column(nullable = false) private int totalMarks;
    @Column(nullable = false) private String grade;
    @Column(nullable = false) private double gradePoints;

    public Grade() {}
    public Long getId() { return id; }
    public Long getStudentId() { return studentId; }
    public String getStudentName() { return studentName; }
    public String getSubject() { return subject; }
    public int getSemester() { return semester; }
    public String getAcademicYear() { return academicYear; }
    public int getMidMarks() { return midMarks; }
    public int getEndMarks() { return endMarks; }
    public int getTotalMarks() { return totalMarks; }
    public String getGrade() { return grade; }
    public double getGradePoints() { return gradePoints; }
    public void setId(Long id) { this.id = id; }
    public void setStudentId(Long s) { this.studentId = s; }
    public void setStudentName(String s) { this.studentName = s; }
    public void setSubject(String s) { this.subject = s; }
    public void setSemester(int s) { this.semester = s; }
    public void setAcademicYear(String y) { this.academicYear = y; }
    public void setMidMarks(int m) { this.midMarks = m; }
    public void setEndMarks(int e) { this.endMarks = e; }
    public void setTotalMarks(int t) { this.totalMarks = t; }
    public void setGrade(String g) { this.grade = g; }
    public void setGradePoints(double g) { this.gradePoints = g; }
}
