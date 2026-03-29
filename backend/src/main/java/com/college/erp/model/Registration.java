package com.college.erp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "registrations")
public class Registration {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long studentId;
    @Column(nullable = false) private String studentName;
    @Column(nullable = false) private String type;
    @Column(nullable = false) private String semester;
    private String reason;
    private String notes;
    @Column(nullable = false) private String status; // Pending / Approved / Rejected
    private String remarks;
    @Column(nullable = false) private LocalDate submittedOn;

    public Registration() {}
    public Long getId() { return id; }
    public Long getStudentId() { return studentId; }
    public String getStudentName() { return studentName; }
    public String getType() { return type; }
    public String getSemester() { return semester; }
    public String getReason() { return reason; }
    public String getNotes() { return notes; }
    public String getStatus() { return status; }
    public String getRemarks() { return remarks; }
    public LocalDate getSubmittedOn() { return submittedOn; }
    public void setId(Long id) { this.id = id; }
    public void setStudentId(Long s) { this.studentId = s; }
    public void setStudentName(String s) { this.studentName = s; }
    public void setType(String t) { this.type = t; }
    public void setSemester(String s) { this.semester = s; }
    public void setReason(String r) { this.reason = r; }
    public void setNotes(String n) { this.notes = n; }
    public void setStatus(String s) { this.status = s; }
    public void setRemarks(String r) { this.remarks = r; }
    public void setSubmittedOn(LocalDate d) { this.submittedOn = d; }
}
