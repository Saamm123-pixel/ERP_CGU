package com.college.erp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "gate_passes")
public class GatePass {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long studentId;
    @Column(nullable = false) private String studentName;
    @Column(nullable = false) private String reason;
    @Column(nullable = false) private String type;
    @Column(nullable = false) private LocalDate outDate;
    @Column(nullable = false) private String outTime;
    @Column(nullable = false) private String inTime;
    private String parentPhone;
    private String notes;
    @Column(nullable = false) private String status; // Pending / Approved / Rejected
    private String approvedBy;
    @Column(nullable = false) private LocalDate appliedOn;

    public GatePass() {}
    public Long getId() { return id; }
    public Long getStudentId() { return studentId; }
    public String getStudentName() { return studentName; }
    public String getReason() { return reason; }
    public String getType() { return type; }
    public LocalDate getOutDate() { return outDate; }
    public String getOutTime() { return outTime; }
    public String getInTime() { return inTime; }
    public String getParentPhone() { return parentPhone; }
    public String getNotes() { return notes; }
    public String getStatus() { return status; }
    public String getApprovedBy() { return approvedBy; }
    public LocalDate getAppliedOn() { return appliedOn; }
    public void setId(Long id) { this.id = id; }
    public void setStudentId(Long s) { this.studentId = s; }
    public void setStudentName(String s) { this.studentName = s; }
    public void setReason(String r) { this.reason = r; }
    public void setType(String t) { this.type = t; }
    public void setOutDate(LocalDate d) { this.outDate = d; }
    public void setOutTime(String t) { this.outTime = t; }
    public void setInTime(String t) { this.inTime = t; }
    public void setParentPhone(String p) { this.parentPhone = p; }
    public void setNotes(String n) { this.notes = n; }
    public void setStatus(String s) { this.status = s; }
    public void setApprovedBy(String a) { this.approvedBy = a; }
    public void setAppliedOn(LocalDate d) { this.appliedOn = d; }
}
