package com.medivision.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "lab_reports")
public class LabReport {

    // ==========================================
    // ID
    // ==========================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Lab Report Code
    // ==========================================

    @Column(unique = true, nullable = false)
    private String reportCode;

    // ==========================================
    // Patient
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    // ==========================================
    // Doctor
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    // ==========================================
    // Prescription (Optional)
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id")
    private Prescription prescription;

    // ==========================================
    // Test Details
    // ==========================================

    @Column(nullable = false)
    private String testName;

    private String testCategory;

    private String sampleType;

    private LocalDate testDate;

    private LocalDate reportDate;

    // ==========================================
    // Result
    // ==========================================

    @Column(columnDefinition = "TEXT")
    private String result;

    private String normalRange;

    @Column(columnDefinition = "TEXT")
    private String remarks;

    // ==========================================
    // Technician Details
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
    // Constructors
    // ==========================================

    public LabReport() {
    }

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

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
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