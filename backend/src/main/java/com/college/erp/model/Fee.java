package com.college.erp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "fees")
public class Fee {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long studentId;
    @Column(nullable = false) private String studentName;
    @Column(nullable = false) private String semester;
    @Column(nullable = false) private String academicYear;
    @Column(nullable = false) private double totalAmount;
    @Column(nullable = false) private double paidAmount;
    @Column(nullable = false) private double dueAmount;
    private String paidDate;
    @Column(nullable = false) private String status; // Paid / Partial / Pending
    private String paymentMethod;

    public Fee() {}
    public Long getId() { return id; }
    public Long getStudentId() { return studentId; }
    public String getStudentName() { return studentName; }
    public String getSemester() { return semester; }
    public String getAcademicYear() { return academicYear; }
    public double getTotalAmount() { return totalAmount; }
    public double getPaidAmount() { return paidAmount; }
    public double getDueAmount() { return dueAmount; }
    public String getPaidDate() { return paidDate; }
    public String getStatus() { return status; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setId(Long id) { this.id = id; }
    public void setStudentId(Long s) { this.studentId = s; }
    public void setStudentName(String s) { this.studentName = s; }
    public void setSemester(String s) { this.semester = s; }
    public void setAcademicYear(String y) { this.academicYear = y; }
    public void setTotalAmount(double a) { this.totalAmount = a; }
    public void setPaidAmount(double a) { this.paidAmount = a; }
    public void setDueAmount(double a) { this.dueAmount = a; }
    public void setPaidDate(String d) { this.paidDate = d; }
    public void setStatus(String s) { this.status = s; }
    public void setPaymentMethod(String m) { this.paymentMethod = m; }
}
