package com.medivision.dto;

import java.time.LocalDate;

public class ICURecordResponse {

    // =====================================================
    // IDs
    // =====================================================

    private Long id;

    private String icuRecordNumber;


    // =====================================================
    // Patient
    // =====================================================

    private Long patientId;

    private String patientCode;

    private String patientName;


    // =====================================================
    // Doctor
    // =====================================================

    private Long doctorId;

    private String doctorName;

    private String doctorDegree;


    // =====================================================
    // Nurse
    // =====================================================

    private Long nurseId;

    private String nurseName;


    // =====================================================
    // Admission
    // =====================================================

    private Long admissionId;

    private String admissionNumber;


    // =====================================================
    // Prescription
    // =====================================================

    private Long prescriptionId;

    private String prescriptionNumber;


    // =====================================================
    // ICU Details
    // =====================================================

    private LocalDate icuStartDate;

    private LocalDate icuEndDate;

    private String bedNumber;

    private String wardNumber;

    private String criticalLevel;

    private Boolean ventilatorRequired;

    private Boolean isolationRequired;


    // =====================================================
    // Diagnosis
    // =====================================================

    private String diagnosis;

    private String treatmentPlan;


    // =====================================================
    // Vital Signs
    // =====================================================

    private String oxygenLevel;

    private String heartRate;

    private String bloodPressure;

    private String respiratoryRate;

    private String bodyTemperature;


    // =====================================================
    // Monitoring
    // =====================================================

    private String dailyNotes;

    private String medicationsGiven;

    private String proceduresPerformed;


    // =====================================================
    // Discharge
    // =====================================================

    private String dischargeSummary;


    // =====================================================
    // Status
    // =====================================================

    private String status;


    // =====================================================
    // Constructor
    // =====================================================

    public ICURecordResponse() {
    }


    // =====================================================
    // ID Getters & Setters
    // =====================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIcuRecordNumber() {
        return icuRecordNumber;
    }

    public void setIcuRecordNumber(String icuRecordNumber) {
        this.icuRecordNumber = icuRecordNumber;
    }


    // =====================================================
    // Patient Getters & Setters
    // =====================================================

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


    // =====================================================
    // Doctor Getters & Setters
    // =====================================================

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getDoctorDegree() {
        return doctorDegree;
    }

    public void setDoctorDegree(String doctorDegree) {
        this.doctorDegree = doctorDegree;
    }


    // =====================================================
    // Nurse Getters & Setters
    // =====================================================

    public Long getNurseId() {
        return nurseId;
    }

    public void setNurseId(Long nurseId) {
        this.nurseId = nurseId;
    }

    public String getNurseName() {
        return nurseName;
    }

    public void setNurseName(String nurseName) {
        this.nurseName = nurseName;
    }


    // =====================================================
    // Admission Getters & Setters
    // =====================================================

    public Long getAdmissionId() {
        return admissionId;
    }

    public void setAdmissionId(Long admissionId) {
        this.admissionId = admissionId;
    }

    public String getAdmissionNumber() {
        return admissionNumber;
    }

    public void setAdmissionNumber(String admissionNumber) {
        this.admissionNumber = admissionNumber;
    }


    // =====================================================
    // Prescription Getters & Setters
    // =====================================================

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


    // =====================================================
    // ICU Details Getters & Setters
    // =====================================================

    public LocalDate getIcuStartDate() {
        return icuStartDate;
    }

    public void setIcuStartDate(LocalDate icuStartDate) {
        this.icuStartDate = icuStartDate;
    }

    public LocalDate getIcuEndDate() {
        return icuEndDate;
    }

    public void setIcuEndDate(LocalDate icuEndDate) {
        this.icuEndDate = icuEndDate;
    }

    public String getBedNumber() {
        return bedNumber;
    }

    public void setBedNumber(String bedNumber) {
        this.bedNumber = bedNumber;
    }

    public String getWardNumber() {
        return wardNumber;
    }

    public void setWardNumber(String wardNumber) {
        this.wardNumber = wardNumber;
    }

    public String getCriticalLevel() {
        return criticalLevel;
    }

    public void setCriticalLevel(String criticalLevel) {
        this.criticalLevel = criticalLevel;
    }

    public Boolean getVentilatorRequired() {
        return ventilatorRequired;
    }

    public void setVentilatorRequired(Boolean ventilatorRequired) {
        this.ventilatorRequired = ventilatorRequired;
    }

    public Boolean getIsolationRequired() {
        return isolationRequired;
    }

    public void setIsolationRequired(Boolean isolationRequired) {
        this.isolationRequired = isolationRequired;
    }


    // =====================================================
    // Diagnosis Getters & Setters
    // =====================================================

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getTreatmentPlan() {
        return treatmentPlan;
    }

    public void setTreatmentPlan(String treatmentPlan) {
        this.treatmentPlan = treatmentPlan;
    }


    // =====================================================
    // Vital Signs Getters & Setters
    // =====================================================

    public String getOxygenLevel() {
        return oxygenLevel;
    }

    public void setOxygenLevel(String oxygenLevel) {
        this.oxygenLevel = oxygenLevel;
    }

    public String getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(String heartRate) {
        this.heartRate = heartRate;
    }

    public String getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public String getRespiratoryRate() {
        return respiratoryRate;
    }

    public void setRespiratoryRate(String respiratoryRate) {
        this.respiratoryRate = respiratoryRate;
    }

    public String getBodyTemperature() {
        return bodyTemperature;
    }

    public void setBodyTemperature(String bodyTemperature) {
        this.bodyTemperature = bodyTemperature;
    }


    // =====================================================
    // Monitoring Getters & Setters
    // =====================================================

    public String getDailyNotes() {
        return dailyNotes;
    }

    public void setDailyNotes(String dailyNotes) {
        this.dailyNotes = dailyNotes;
    }

    public String getMedicationsGiven() {
        return medicationsGiven;
    }

    public void setMedicationsGiven(String medicationsGiven) {
        this.medicationsGiven = medicationsGiven;
    }

    public String getProceduresPerformed() {
        return proceduresPerformed;
    }

    public void setProceduresPerformed(String proceduresPerformed) {
        this.proceduresPerformed = proceduresPerformed;
    }


    // =====================================================
    // Discharge Getters & Setters
    // =====================================================

    public String getDischargeSummary() {
        return dischargeSummary;
    }

    public void setDischargeSummary(String dischargeSummary) {
        this.dischargeSummary = dischargeSummary;
    }


    // =====================================================
    // Status Getters & Setters
    // =====================================================

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}