package com.medivision.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class AdmissionRequest {

    @NotNull(message = "Patient is required")
    private Long patientId;

    @NotNull(message = "Doctor is required")
    private Long doctorId;

    @NotNull(message = "Admission date is required")
    @FutureOrPresent(message = "Admission date cannot be in the past")
    private LocalDate admissionDate;

    @NotNull(message = "Admission time is required")
    private LocalTime admissionTime;

    @NotBlank(message = "Admission type is required")
    private String admissionType;

    @NotBlank(message = "Department is required")
    private String department;

    @NotBlank(message = "Ward is required")
    private String ward;

    @NotBlank(message = "Room Number is required")
    private String roomNumber;

    @NotBlank(message = "Bed Number is required")
    private String bedNumber;

    @NotBlank(message = "Diagnosis is required")
    private String diagnosis;

    private String symptoms;

    private String reasonForAdmission;

    private String insuranceProvider;

    private String policyNumber;

    @DecimalMin(value = "0.0", message = "Estimated cost cannot be negative")
    private BigDecimal estimatedCost;

    @DecimalMin(value = "0.0", message = "Initial deposit cannot be negative")
    private BigDecimal initialDeposit;

    @Positive(message = "Expected stay must be greater than 0")
    private Integer expectedStayDays;

    // Optional - defaults to "Admitted" in the entity if empty
    private String status;

    private String notes;

    // Getters and Setters

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDate getAdmissionDate() {
        return admissionDate;
    }

    public void setAdmissionDate(LocalDate admissionDate) {
        this.admissionDate = admissionDate;
    }

    public LocalTime getAdmissionTime() {
        return admissionTime;
    }

    public void setAdmissionTime(LocalTime admissionTime) {
        this.admissionTime = admissionTime;
    }

    public String getAdmissionType() {
        return admissionType;
    }

    public void setAdmissionType(String admissionType) {
        this.admissionType = admissionType;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getWard() {
        return ward;
    }

    public void setWard(String ward) {
        this.ward = ward;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getBedNumber() {
        return bedNumber;
    }

    public void setBedNumber(String bedNumber) {
        this.bedNumber = bedNumber;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getReasonForAdmission() {
        return reasonForAdmission;
    }

    public void setReasonForAdmission(String reasonForAdmission) {
        this.reasonForAdmission = reasonForAdmission;
    }

    public String getInsuranceProvider() {
        return insuranceProvider;
    }

    public void setInsuranceProvider(String insuranceProvider) {
        this.insuranceProvider = insuranceProvider;
    }

    public String getPolicyNumber() {
        return policyNumber;
    }

    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }

    public BigDecimal getEstimatedCost() {
        return estimatedCost;
    }

    public void setEstimatedCost(BigDecimal estimatedCost) {
        this.estimatedCost = estimatedCost;
    }

    public BigDecimal getInitialDeposit() {
        return initialDeposit;
    }

    public void setInitialDeposit(BigDecimal initialDeposit) {
        this.initialDeposit = initialDeposit;
    }

    public Integer getExpectedStayDays() {
        return expectedStayDays;
    }

    public void setExpectedStayDays(Integer expectedStayDays) {
        this.expectedStayDays = expectedStayDays;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}