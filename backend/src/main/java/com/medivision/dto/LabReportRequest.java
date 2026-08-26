package com.medivision.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class LabReportRequest {

    // ==========================================
    // Relationships
    // ==========================================

    @NotNull(message = "Patient is required")
    private Long patientId;

    @NotNull(message = "Doctor is required")
    private Long doctorId;

    // Optional
    private Long prescriptionId;

    // ==========================================
    // Test Details
    // ==========================================

    @NotBlank(message = "Test Name is required")
    private String testName;

    @NotBlank(message = "Test Category is required")
    private String testCategory;

    @NotBlank(message = "Sample Type is required")
    private String sampleType;

    @NotNull(message = "Test Date is required")
    private LocalDate testDate;

    private LocalDate reportDate;

    // ==========================================
    // Result
    // ==========================================

    private String result;

    private String normalRange;

    private String remarks;

    // ==========================================
    // Laboratory
    // ==========================================

    @NotBlank(message = "Lab Technician Name is required")
    private String labTechnicianName;

    private String labTechnicianDegree;

    @NotBlank(message = "Lab Name is required")
    private String labName;

    // ==========================================
    // Report File
    // ==========================================

    private String reportFilePath;

    // ==========================================
    // Status
    // ==========================================

    private String status;

    // ==========================================
    // Getters and Setters
    // ==========================================

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

    public Long getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(Long prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    public String getTestName() {
        return testName;
    }

    public void setTestName(String testName) {
        this.testName = testName;
    }

    public String getTestCategory() {
        return testCategory;
    }

    public void setTestCategory(String testCategory) {
        this.testCategory = testCategory;
    }

    public String getSampleType() {
        return sampleType;
    }

    public void setSampleType(String sampleType) {
        this.sampleType = sampleType;
    }

    public LocalDate getTestDate() {
        return testDate;
    }

    public void setTestDate(LocalDate testDate) {
        this.testDate = testDate;
    }

    public LocalDate getReportDate() {
        return reportDate;
    }

    public void setReportDate(LocalDate reportDate) {
        this.reportDate = reportDate;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getNormalRange() {
        return normalRange;
    }

    public void setNormalRange(String normalRange) {
        this.normalRange = normalRange;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getLabTechnicianName() {
        return labTechnicianName;
    }

    public void setLabTechnicianName(String labTechnicianName) {
        this.labTechnicianName = labTechnicianName;
    }

    public String getLabTechnicianDegree() {
        return labTechnicianDegree;
    }

    public void setLabTechnicianDegree(String labTechnicianDegree) {
        this.labTechnicianDegree = labTechnicianDegree;
    }

    public String getLabName() {
        return labName;
    }

    public void setLabName(String labName) {
        this.labName = labName;
    }

    public String getReportFilePath() {
        return reportFilePath;
    }

    public void setReportFilePath(String reportFilePath) {
        this.reportFilePath = reportFilePath;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}