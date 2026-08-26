package com.medivision.dto;

import java.time.LocalDate;

public class NurseResponse {

    // =====================================================
    // Primary Key
    // =====================================================

    private Long id;


    // =====================================================
    // Nurse Identification
    // =====================================================

    private String employeeCode;

    private String fullName;


    // =====================================================
    // Professional Information
    // =====================================================

    private String degree;

    private String specialization;

    private String licenseNumber;

    private Integer experienceYears;


    // =====================================================
    // Contact Information
    // =====================================================

    private String phone;

    private String email;

    private String address;


    // =====================================================
    // Personal Information
    // =====================================================

    private LocalDate dateOfBirth;

    private String gender;


    // =====================================================
    // Hospital Information
    // =====================================================

    private String shift;

    private String department;

    private String employmentType;

    private LocalDate joiningDate;

    private String reportingManager;


    // =====================================================
    // Status
    // =====================================================

    private String status;


    // =====================================================
    // Emergency Contact
    // =====================================================

    private String emergencyContactName;

    private String emergencyContactPhone;

    private String emergencyContactRelation;


    // =====================================================
    // Constructor
    // =====================================================

    public NurseResponse() {
    }


    // =====================================================
    // Getters and Setters
    // =====================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }


    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }


    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }


    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }


    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }


    public Integer getExperienceYears() {
        return experienceYears;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }


    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }


    public String getShift() {
        return shift;
    }

    public void setShift(String shift) {
        this.shift = shift;
    }


    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }


    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }


    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }


    public String getReportingManager() {
        return reportingManager;
    }

    public void setReportingManager(String reportingManager) {
        this.reportingManager = reportingManager;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public void setEmergencyContactName(String emergencyContactName) {
        this.emergencyContactName = emergencyContactName;
    }


    public String getEmergencyContactPhone() {
        return emergencyContactPhone;
    }

    public void setEmergencyContactPhone(String emergencyContactPhone) {
        this.emergencyContactPhone = emergencyContactPhone;
    }


    public String getEmergencyContactRelation() {
        return emergencyContactRelation;
    }

    public void setEmergencyContactRelation(
            String emergencyContactRelation) {

        this.emergencyContactRelation =
                emergencyContactRelation;
    }
}