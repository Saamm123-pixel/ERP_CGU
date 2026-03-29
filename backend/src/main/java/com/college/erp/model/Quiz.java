package com.college.erp.model;

import jakarta.persistence.*;

@Entity
@Table(name = "quizzes")
public class Quiz {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String title;
    @Column(nullable = false) private String subject;
    @Column(nullable = false) private String faculty;
    @Column(nullable = false) private int duration;
    @Column(nullable = false) private int questions;
    @Column(nullable = false) private int marks;
    @Column(nullable = false) private String deadline;
    @Column(nullable = false) private String status; // Active / Closed / Upcoming
    @Column(nullable = false, length = 5000) private String questionsJson; // JSON array of questions

    public Quiz() {}
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getSubject() { return subject; }
    public String getFaculty() { return faculty; }
    public int getDuration() { return duration; }
    public int getQuestions() { return questions; }
    public int getMarks() { return marks; }
    public String getDeadline() { return deadline; }
    public String getStatus() { return status; }
    public String getQuestionsJson() { return questionsJson; }
    public void setId(Long id) { this.id = id; }
    public void setTitle(String t) { this.title = t; }
    public void setSubject(String s) { this.subject = s; }
    public void setFaculty(String f) { this.faculty = f; }
    public void setDuration(int d) { this.duration = d; }
    public void setQuestions(int q) { this.questions = q; }
    public void setMarks(int m) { this.marks = m; }
    public void setDeadline(String d) { this.deadline = d; }
    public void setStatus(String s) { this.status = s; }
    public void setQuestionsJson(String q) { this.questionsJson = q; }
}
