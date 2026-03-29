package com.college.erp.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "notices")
public class Notice {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String title;
    @Column(nullable = false, length = 2000) private String description;
    @Column(length = 5000) private String fullDetails;
    @Column(nullable = false) private String category;
    @Column(nullable = false) private String postedBy;
    @Column(nullable = false) private LocalDate postedDate;
    @Column(nullable = false) private boolean important = false;
    @Column(nullable = false) private String targetRoles; // all / student / faculty / admin

    public Notice() {}
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getFullDetails() { return fullDetails; }
    public String getCategory() { return category; }
    public String getPostedBy() { return postedBy; }
    public LocalDate getPostedDate() { return postedDate; }
    public boolean isImportant() { return important; }
    public String getTargetRoles() { return targetRoles; }
    public void setId(Long id) { this.id = id; }
    public void setTitle(String t) { this.title = t; }
    public void setDescription(String d) { this.description = d; }
    public void setFullDetails(String f) { this.fullDetails = f; }
    public void setCategory(String c) { this.category = c; }
    public void setPostedBy(String p) { this.postedBy = p; }
    public void setPostedDate(LocalDate d) { this.postedDate = d; }
    public void setImportant(boolean i) { this.important = i; }
    public void setTargetRoles(String t) { this.targetRoles = t; }
}
