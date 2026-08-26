package com.medivision.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    // =====================================================
    // PRIMARY KEY
    // =====================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =====================================================
    // LOGIN INFORMATION
    // =====================================================

    @Column(
        nullable = false,
        unique = true,
        length = 100
    )
    private String username;


    @Column(
        nullable = false,
        unique = true,
        length = 150
    )
    private String email;


    // =====================================================
    // PASSWORD
    // =====================================================

    @JsonIgnore
    @Column(
        nullable = false,
        length = 255
    )
    private String password;


    // =====================================================
    // ROLE
    // =====================================================

    @Column(
        nullable = false,
        length = 50
    )
    private String role;


    // =====================================================
    // PERSONAL INFORMATION
    // =====================================================

    @Column(length = 100)
    private String fullName;


    @Column(length = 20)
    private String phone;


    // =====================================================
    // ACCOUNT STATUS
    // =====================================================

    /*
     * true  = user can login
     * false = user cannot login
     */

    @Column(
        nullable = false
    )
    private Boolean active = true;


    /*
     * true  = account locked
     * false = account unlocked
     */

    @Column(
        nullable = false
    )
    private Boolean accountLocked = false;


    // =====================================================
    // FAILED LOGIN ATTEMPTS
    // =====================================================

    /*
     * Number of consecutive failed login attempts.
     *
     * Example:
     *
     * 0 = no failed attempts
     * 1 = first failed attempt
     * 2 = second failed attempt
     *
     * This can be used to automatically lock an account
     * after a configured number of failed attempts.
     */

    @Column(
        name = "failed_login_attempts",
        nullable = false
    )
    private Integer failedLoginAttempts = 0;


    // =====================================================
    // CREATED / UPDATED INFORMATION
    // =====================================================

    @Column
    private LocalDateTime createdAt;


    @Column
    private LocalDateTime updatedAt;


    // =====================================================
    // AUDIT USER INFORMATION
    // =====================================================

    @Column(
        length = 100
    )
    private String createdBy;


    @Column(
        length = 100
    )
    private String updatedBy;


    // =====================================================
    // LAST LOGIN
    // =====================================================

    @Column
    private LocalDateTime lastLogin;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public User() {
    }


    // =====================================================
    // PRE PERSIST
    // =====================================================

    @PrePersist
    protected void onCreate() {

        LocalDateTime now =
                LocalDateTime.now();

        createdAt = now;
        updatedAt = now;


        // -------------------------------------------------
        // Active
        // -------------------------------------------------

        if (active == null) {
            active = true;
        }


        // -------------------------------------------------
        // Account Locked
        // -------------------------------------------------

        if (accountLocked == null) {
            accountLocked = false;
        }


        // -------------------------------------------------
        // Failed Login Attempts
        // -------------------------------------------------

        if (failedLoginAttempts == null) {
            failedLoginAttempts = 0;
        }
    }


    // =====================================================
    // PRE UPDATE
    // =====================================================

    @PreUpdate
    protected void onUpdate() {

        updatedAt =
                LocalDateTime.now();


        if (active == null) {
            active = true;
        }


        if (accountLocked == null) {
            accountLocked = false;
        }


        if (failedLoginAttempts == null) {
            failedLoginAttempts = 0;
        }
    }


    // =====================================================
    // GET ID
    // =====================================================

    public Long getId() {
        return id;
    }


    public void setId(Long id) {
        this.id = id;
    }


    // =====================================================
    // GET USERNAME
    // =====================================================

    public String getUsername() {
        return username;
    }


    public void setUsername(String username) {
        this.username = username;
    }


    // =====================================================
    // GET EMAIL
    // =====================================================

    public String getEmail() {
        return email;
    }


    public void setEmail(String email) {
        this.email = email;
    }


    // =====================================================
    // GET PASSWORD
    // =====================================================

    public String getPassword() {
        return password;
    }


    public void setPassword(String password) {
        this.password = password;
    }


    // =====================================================
    // GET ROLE
    // =====================================================

    public String getRole() {
        return role;
    }


    public void setRole(String role) {
        this.role = role;
    }


    // =====================================================
    // GET FULL NAME
    // =====================================================

    public String getFullName() {
        return fullName;
    }


    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    // =====================================================
    // GET PHONE
    // =====================================================

    public String getPhone() {
        return phone;
    }


    public void setPhone(String phone) {
        this.phone = phone;
    }


    // =====================================================
    // GET ACTIVE
    // =====================================================

    public Boolean getActive() {
        return active;
    }


    public void setActive(Boolean active) {
        this.active = active;
    }


    // =====================================================
    // GET ACCOUNT LOCKED
    // =====================================================

    public Boolean getAccountLocked() {
        return accountLocked;
    }


    public void setAccountLocked(
            Boolean accountLocked) {

        this.accountLocked =
                accountLocked;
    }


    // =====================================================
    // GET FAILED LOGIN ATTEMPTS
    // =====================================================

    public Integer getFailedLoginAttempts() {
        return failedLoginAttempts;
    }


    public void setFailedLoginAttempts(
            Integer failedLoginAttempts) {

        this.failedLoginAttempts =
                failedLoginAttempts;
    }


    // =====================================================
    // GET CREATED AT
    // =====================================================

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }


    public void setCreatedAt(
            LocalDateTime createdAt) {

        this.createdAt =
                createdAt;
    }


    // =====================================================
    // GET UPDATED AT
    // =====================================================

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }


    public void setUpdatedAt(
            LocalDateTime updatedAt) {

        this.updatedAt =
                updatedAt;
    }


    // =====================================================
    // GET CREATED BY
    // =====================================================

    public String getCreatedBy() {
        return createdBy;
    }


    public void setCreatedBy(
            String createdBy) {

        this.createdBy =
                createdBy;
    }


    // =====================================================
    // GET UPDATED BY
    // =====================================================

    public String getUpdatedBy() {
        return updatedBy;
    }


    public void setUpdatedBy(
            String updatedBy) {

        this.updatedBy =
                updatedBy;
    }


    // =====================================================
    // GET LAST LOGIN
    // =====================================================

    public LocalDateTime getLastLogin() {
        return lastLogin;
    }


    public void setLastLogin(
            LocalDateTime lastLogin) {

        this.lastLogin =
                lastLogin;
    }
}