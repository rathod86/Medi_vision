package com.medivision.dto;

import java.time.LocalDate;

public class LabReportResponse {

    // ==========================================
    // ID
    // ==========================================

    private Long id;

    private String reportCode;

    // ==========================================
    // Patient
    // ==========================================

    private Long patientId;

    private String patientCode;

    private String patientName;

    // ==========================================
    // Doctor
    // ==========================================

    private Long doctorId;

    private String doctorCode;

    private String doctorName;

    // ==========================================
    // Prescription
    // ==========================================

    private Long prescriptionId;

    private String prescriptionNumber;

    // ==========================================
    // Test Details
    // ==========================================

    private String testName;

    private String testCategory;

    private String sampleType;

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

    private String labTechnicianName;

    private String labTechnicianDegree;

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReportCode() {
        return reportCode;
    }

    public void setReportCode(String reportCode) {
        this.reportCode = reportCode;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getPatientCode() {
        return patientCode;
    }

    public void setPatientCode(String patientCode) {
        this.patientCode = patientCode;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorCode() {
        return doctorCode;
    }

    public void setDoctorCode(String doctorCode) {
        this.doctorCode = doctorCode;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public Long getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(Long prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    public String getPrescriptionNumber() {
        return prescriptionNumber;
    }

    public void setPrescriptionNumber(String prescriptionNumber) {
        this.prescriptionNumber = prescriptionNumber;
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