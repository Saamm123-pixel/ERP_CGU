package com.college.erp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "placements")
public class Placement {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String companyName;
    @Column(nullable = false) private String role;
    @Column(nullable = false) private String type; // Placement / Internship
    private String packageOrStipend;
    @Column(nullable = false) private String deadline;
    @Column(nullable = false) private String eligibility;
    @Column(nullable = false) private String status; // Open / Closed
    private String logo;
    private String color;
    private String description;

    public Placement() {}
    public Long getId() { return id; }
    public String getCompanyName() { return companyName; }
    public String getRole() { return role; }
    public String getType() { return type; }
    public String getPackageOrStipend() { return packageOrStipend; }
    public String getDeadline() { return deadline; }
    public String getEligibility() { return eligibility; }
    public String getStatus() { return status; }
    public String getLogo() { return logo; }
    public String getColor() { return color; }
    public String getDescription() { return description; }
    public void setId(Long id) { this.id = id; }
    public void setCompanyName(String c) { this.companyName = c; }
    public void setRole(String r) { this.role = r; }
    public void setType(String t) { this.type = t; }
    public void setPackageOrStipend(String p) { this.packageOrStipend = p; }
    public void setDeadline(String d) { this.deadline = d; }
    public void setEligibility(String e) { this.eligibility = e; }
    public void setStatus(String s) { this.status = s; }
    public void setLogo(String l) { this.logo = l; }
    public void setColor(String c) { this.color = c; }
    public void setDescription(String d) { this.description = d; }
}
