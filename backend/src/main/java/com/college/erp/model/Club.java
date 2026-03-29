package com.college.erp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "clubs")
public class Club {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String name;
    @Column(nullable = false) private String category;
    @Column(nullable = false) private String lead;
    @Column(nullable = false) private int members;
    @Column(nullable = false) private String icon;
    @Column(nullable = false) private String color;
    @Column(nullable = false) private String bg;
    @Column(nullable = false) private String border;
    @Column(nullable = false, length = 500) private String description;

    public Club() {}
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getCategory() { return category; }
    public String getLead() { return lead; }
    public int getMembers() { return members; }
    public String getIcon() { return icon; }
    public String getColor() { return color; }
    public String getBg() { return bg; }
    public String getBorder() { return border; }
    public String getDescription() { return description; }
    public void setId(Long id) { this.id = id; }
    public void setName(String n) { this.name = n; }
    public void setCategory(String c) { this.category = c; }
    public void setLead(String l) { this.lead = l; }
    public void setMembers(int m) { this.members = m; }
    public void setIcon(String i) { this.icon = i; }
    public void setColor(String c) { this.color = c; }
    public void setBg(String b) { this.bg = b; }
    public void setBorder(String b) { this.border = b; }
    public void setDescription(String d) { this.description = d; }
}
