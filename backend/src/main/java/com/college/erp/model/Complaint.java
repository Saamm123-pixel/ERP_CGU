package com.college.erp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "complaints")
public class Complaint {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String title;
    @Column(nullable = false) private String category;
    @Column(nullable = false) private String priority;
    @Column(nullable = false, length = 2000) private String description;
    @Column(nullable = false) private String submittedBy;
    private String submittedByRole;
    @Column(nullable = false) private LocalDate submittedDate;
    @Column(nullable = false) private String status; // Open / In Progress / Resolved
    @Column(length = 2000) private String response;

    public Complaint() {}
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCategory() { return category; }
    public String getPriority() { return priority; }
    public String getDescription() { return description; }
    public String getSubmittedBy() { return submittedBy; }
    public String getSubmittedByRole() { return submittedByRole; }
    public LocalDate getSubmittedDate() { return submittedDate; }
    public String getStatus() { return status; }
    public String getResponse() { return response; }
    public void setId(Long id) { this.id = id; }
    public void setTitle(String t) { this.title = t; }
    public void setCategory(String c) { this.category = c; }
    public void setPriority(String p) { this.priority = p; }
    public void setDescription(String d) { this.description = d; }
    public void setSubmittedBy(String s) { this.submittedBy = s; }
    public void setSubmittedByRole(String r) { this.submittedByRole = r; }
    public void setSubmittedDate(LocalDate d) { this.submittedDate = d; }
    public void setStatus(String s) { this.status = s; }
    public void setResponse(String r) { this.response = r; }
}
