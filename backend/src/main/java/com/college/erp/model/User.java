package com.college.erp.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, columnDefinition = "VARCHAR(255)")
    private String password;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private boolean banned = false;

    @Column
    private String banReason;

    @Column
    private LocalDateTime banUntil;

    // Profile fields
    @Column
    private String phone;

    @Column
    private String dob;

    @Column
    private String address;

    @Column
    private String department;

    @Column(length = 1000)
    private String bio;

    public User() {}

    public User(String name, String email, String password, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public String getRole() { return role; }
    public boolean isBanned() { return banned; }
    public String getBanReason() { return banReason; }
    public LocalDateTime getBanUntil() { return banUntil; }
    public String getPhone() { return phone; }
    public String getDob() { return dob; }
    public String getAddress() { return address; }
    public String getDepartment() { return department; }
    public String getBio() { return bio; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPassword(String password) { this.password = password; }
    public void setRole(String role) { this.role = role; }
    public void setBanned(boolean banned) { this.banned = banned; }
    public void setBanReason(String banReason) { this.banReason = banReason; }
    public void setBanUntil(LocalDateTime banUntil) { this.banUntil = banUntil; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setDob(String dob) { this.dob = dob; }
    public void setAddress(String address) { this.address = address; }
    public void setDepartment(String department) { this.department = department; }
    public void setBio(String bio) { this.bio = bio; }
}
