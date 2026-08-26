package com.medivision.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class NurseRequest {

    // =====================================================
    // Nurse Identification
    // =====================================================

    @NotBlank(message = "Employee code is required")
    @Size(max = 30, message = "Employee code cannot exceed 30 characters")
    private String employeeCode;

    @NotBlank(message = "Full name is required")
    @Size(max = 100, message = "Full name cannot exceed 100 characters")
    private String fullName;


    // =====================================================
    // Professional Information
    // =====================================================

    @NotBlank(message = "Degree is required")
    @Size(max = 100, message = "Degree cannot exceed 100 characters")
    private String degree;

    @Size(max = 100, message = "Specialization cannot exceed 100 characters")
    private String specialization;

    @Size(max = 50, message = "License number cannot exceed 50 characters")
    private String licenseNumber;

    @Min(value = 0, message = "Experience years cannot be negative")
    private Integer experienceYears;


    // =====================================================
    // Contact Information
    // =====================================================

    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "Phone number must contain exactly 10 digits"
    )
    private String phone;

    @Email(message = "Invalid email address")
    @Size(max = 150, message = "Email cannot exceed 150 characters")
    private String email;

    @Size(max = 500, message = "Address cannot exceed 500 characters")
    private String address;


    // =====================================================
    // Personal Information
    // =====================================================

    private LocalDate dateOfBirth;

    @Size(max = 20, message = "Gender cannot exceed 20 characters")
    private String gender;


    // =====================================================
    // Hospital Information
    // =====================================================

    @NotBlank(message = "Shift is required")
    @Size(max = 50, message = "Shift cannot exceed 50 characters")
    private String shift;

    @NotBlank(message = "Department is required")
    @Size(max = 100, message = "Department cannot exceed 100 characters")
    private String department;

    @NotBlank(message = "Employment type is required")
    @Size(max = 50, message = "Employment type cannot exceed 50 characters")
    private String employmentType;

    @NotNull(message = "Joining date is required")
    private LocalDate joiningDate;

    @Size(max = 100, message = "Reporting manager cannot exceed 100 characters")
    private String reportingManager;


    // =====================================================
    // Status
    // =====================================================

    @NotBlank(message = "Status is required")
    @Size(max = 30, message = "Status cannot exceed 30 characters")
    private String status;


    // =====================================================
    // Emergency Contact
    // =====================================================

    @Size(max = 100, message = "Emergency contact name cannot exceed 100 characters")
    private String emergencyContactName;

    @Pattern(
        regexp = "^$|^[0-9]{10}$",
        message = "Emergency contact phone must contain exactly 10 digits"
    )
    private String emergencyContactPhone;

    @Size(max = 50, message = "Emergency contact relation cannot exceed 50 characters")
    private String emergencyContactRelation;


    // =====================================================
    // Getters and Setters
    // =====================================================

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

    public void setEmergencyContactRelation(String emergencyContactRelation) {
        this.emergencyContactRelation = emergencyContactRelation;
    }
}