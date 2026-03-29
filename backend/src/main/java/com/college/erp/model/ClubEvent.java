package com.college.erp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "club_events")
public class ClubEvent {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String title;
    @Column(nullable = false) private String clubName;
    @Column(nullable = false) private String date;
    @Column(nullable = false) private String venue;
    @Column(nullable = false) private String type;
    @Column(nullable = false) private String color;

    public ClubEvent() {}
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getClubName() { return clubName; }
    public String getDate() { return date; }
    public String getVenue() { return venue; }
    public String getType() { return type; }
    public String getColor() { return color; }
    public void setId(Long id) { this.id = id; }
    public void setTitle(String t) { this.title = t; }
    public void setClubName(String c) { this.clubName = c; }
    public void setDate(String d) { this.date = d; }
    public void setVenue(String v) { this.venue = v; }
    public void setType(String t) { this.type = t; }
    public void setColor(String c) { this.color = c; }
}
