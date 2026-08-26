package com.medivision.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(
    name = "nurses",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_nurse_employee_code",
            columnNames = "employee_code"
        ),
        @UniqueConstraint(
            name = "uk_nurse_phone",
            columnNames = "phone"
        ),
        @UniqueConstraint(
            name = "uk_nurse_email",
            columnNames = "email"
        ),
        @UniqueConstraint(
            name = "uk_nurse_license_number",
            columnNames = "license_number"
        )
    }
)
public class Nurse {

    // =====================================================
    // Primary Key
    // =====================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =====================================================
    // Nurse Identification
    // =====================================================

    @Column(
        name = "employee_code",
        nullable = false,
        unique = true,
        length = 30
    )
    private String employeeCode;


    @Column(
        name = "full_name",
        nullable = false,
        length = 100
    )
    private String fullName;


    // =====================================================
    // Professional Information
    // =====================================================

    @Column(
        nullable = false,
        length = 100
    )
    private String degree;


    @Column(
        name = "specialization",
        length = 100
    )
    private String specialization;


    @Column(
        name = "license_number",
        unique = true,
        length = 50
    )
    private String licenseNumber;


    @Column(
        name = "experience_years"
    )
    private Integer experienceYears;


    // =====================================================
    // Contact Information
    // =====================================================

    @Column(
        nullable = false,
        unique = true,
        length = 15
    )
    private String phone;


    @Column(
        unique = true,
        length = 150
    )
    private String email;


    @Column(
        name = "address",
        length = 500
    )
    private String address;


    // =====================================================
    // Personal Information
    // =====================================================

    @Column(
        name = "date_of_birth"
    )
    private LocalDate dateOfBirth;


    @Column(
        length = 20
    )
    private String gender;


    // =====================================================
    // Hospital Information
    // =====================================================

    @Column(
        nullable = false,
        length = 50
    )
    private String shift;


    @Column(
        nullable = false,
        length = 100
    )
    private String department;


    @Column(
        name = "employment_type",
        nullable = false,
        length = 50
    )
    private String employmentType;


    @Column(
        name = "joining_date",
        nullable = false
    )
    private LocalDate joiningDate;


    @Column(
        name = "reporting_manager",
        length = 100
    )
    private String reportingManager;


    // =====================================================
    // Status
    // =====================================================

    @Column(
        nullable = false,
        length = 30
    )
    private String status;


    // =====================================================
    // Emergency Contact
    // =====================================================

    @Column(
        name = "emergency_contact_name",
        length = 100
    )
    private String emergencyContactName;


    @Column(
        name = "emergency_contact_phone",
        length = 15
    )
    private String emergencyContactPhone;


    @Column(
        name = "emergency_contact_relation",
        length = 50
    )
    private String emergencyContactRelation;


    // =====================================================
    // Constructors
    // =====================================================

    public Nurse() {
    }


    // =====================================================
    // Lifecycle Methods
    // =====================================================

    @PrePersist
    @PreUpdate
    private void normalizeData() {

        if (employeeCode != null) {
            employeeCode = employeeCode.trim().toUpperCase();
        }

        if (fullName != null) {
            fullName = fullName.trim();
        }

        if (degree != null) {
            degree = degree.trim();
        }

        if (specialization != null) {
            specialization = specialization.trim();
        }

        if (licenseNumber != null) {
            licenseNumber = licenseNumber.trim().toUpperCase();
        }

        if (phone != null) {
            phone = phone.trim();
        }

        if (email != null) {
            email = email.trim().toLowerCase();
        }

        if (address != null) {
            address = address.trim();
        }

        if (gender != null) {
            gender = gender.trim().toUpperCase();
        }

        if (shift != null) {
            shift = shift.trim().toUpperCase();
        }

        if (department != null) {
            department = department.trim();
        }

        if (employmentType != null) {
            employmentType =
                    employmentType.trim().toUpperCase();
        }

        if (reportingManager != null) {
            reportingManager = reportingManager.trim();
        }

        if (status != null) {
            status = status.trim().toUpperCase();
        }

        if (emergencyContactName != null) {
            emergencyContactName =
                    emergencyContactName.trim();
        }

        if (emergencyContactPhone != null) {
            emergencyContactPhone =
                    emergencyContactPhone.trim();
        }

        if (emergencyContactRelation != null) {
            emergencyContactRelation =
                    emergencyContactRelation.trim();
        }
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

    public void setEmergencyContactName(
            String emergencyContactName) {

        this.emergencyContactName =
                emergencyContactName;
    }


    public String getEmergencyContactPhone() {
        return emergencyContactPhone;
    }

    public void setEmergencyContactPhone(
            String emergencyContactPhone) {

        this.emergencyContactPhone =
                emergencyContactPhone;
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