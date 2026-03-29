package com.college.erp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "attendance")
public class Attendance {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long studentId;
    @Column(nullable = false) private String studentName;
    @Column(nullable = false) private String subject;
    @Column(nullable = false) private String faculty;
    @Column(nullable = false) private LocalDate date;
    @Column(nullable = false) private String status; // present / absent
    @Column(nullable = false) private String academicYear;

    public Attendance() {}
    public Long getId() { return id; }
    public Long getStudentId() { return studentId; }
    public String getStudentName() { return studentName; }
    public String getSubject() { return subject; }
    public String getFaculty() { return faculty; }
    public LocalDate getDate() { return date; }
    public String getStatus() { return status; }
    public String getAcademicYear() { return academicYear; }
    public void setId(Long id) { this.id = id; }
    public void setStudentId(Long s) { this.studentId = s; }
    public void setStudentName(String s) { this.studentName = s; }
    public void setSubject(String s) { this.subject = s; }
    public void setFaculty(String f) { this.faculty = f; }
    public void setDate(LocalDate d) { this.date = d; }
    public void setStatus(String s) { this.status = s; }
    public void setAcademicYear(String y) { this.academicYear = y; }
}
