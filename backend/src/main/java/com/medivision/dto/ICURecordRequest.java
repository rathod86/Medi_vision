package com.medivision.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class ICURecordRequest {

    // =====================================================
    // RELATIONSHIPS
    // =====================================================

    /**
     * Patient is mandatory for an ICU record.
     */
    @NotNull(message = "Patient is required")
    private Long patientId;


    /**
     * Doctor responsible for the ICU patient.
     */
    @NotNull(message = "Doctor is required")
    private Long doctorId;


    /**
     * Nurse is optional.
     */
    private Long nurseId;


    /**
     * Admission is optional.
     */
    private Long admissionId;


    /**
     * Prescription is optional.
     */
    private Long prescriptionId;


    // =====================================================
    // ICU DETAILS
    // =====================================================

    @NotNull(message = "ICU Start Date is required")
    private LocalDate icuStartDate;


    private LocalDate icuEndDate;


    @NotBlank(message = "Bed Number is required")
    @Size(max = 30, message = "Bed Number cannot exceed 30 characters")
    private String bedNumber;


    @NotBlank(message = "Ward Number is required")
    @Size(max = 30, message = "Ward Number cannot exceed 30 characters")
    private String wardNumber;


    @NotBlank(message = "Critical Level is required")
    @Size(max = 50, message = "Critical Level cannot exceed 50 characters")
    private String criticalLevel;


    /**
     * Default = false.
     */
    private Boolean ventilatorRequired = false;


    /**
     * Default = false.
     */
    private Boolean isolationRequired = false;


    // =====================================================
    // DIAGNOSIS
    // =====================================================

    @Size(max = 1000, message = "Diagnosis cannot exceed 1000 characters")
    private String diagnosis;


    @Size(max = 1000, message = "Treatment plan cannot exceed 1000 characters")
    private String treatmentPlan;


    // =====================================================
    // VITAL SIGNS
    // =====================================================

    @Size(max = 30, message = "Oxygen level cannot exceed 30 characters")
    private String oxygenLevel;


    @Size(max = 30, message = "Heart rate cannot exceed 30 characters")
    private String heartRate;


    @Size(max = 30, message = "Blood pressure cannot exceed 30 characters")
    private String bloodPressure;


    @Size(max = 30, message = "Respiratory rate cannot exceed 30 characters")
    private String respiratoryRate;


    @Size(max = 30, message = "Body temperature cannot exceed 30 characters")
    private String bodyTemperature;


    // =====================================================
    // DOCTOR INFORMATION
    // =====================================================

    @Size(max = 100, message = "Doctor degree cannot exceed 100 characters")
    private String doctorDegree;


    // =====================================================
    // DAILY MONITORING
    // =====================================================

    private String dailyNotes;

    private String medicationsGiven;

    private String proceduresPerformed;


    // =====================================================
    // DISCHARGE
    // =====================================================

    private String dischargeSummary;


    // =====================================================
    // STATUS
    // =====================================================

    /**
     * Default status for a new ICU record.
     */
    private String status = "Admitted";


    // =====================================================
    // DEFAULT CONSTRUCTOR
    // =====================================================

    public ICURecordRequest() {
    }


    // =====================================================
    // PATIENT ID
    // =====================================================

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }


    // =====================================================
    // DOCTOR ID
    // =====================================================

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }


    // =====================================================
    // NURSE ID
    // =====================================================

    public Long getNurseId() {
        return nurseId;
    }

    public void setNurseId(Long nurseId) {
        this.nurseId = nurseId;
    }


    // =====================================================
    // ADMISSION ID
    // =====================================================

    public Long getAdmissionId() {
        return admissionId;
    }

    public void setAdmissionId(Long admissionId) {
        this.admissionId = admissionId;
    }


    // =====================================================
    // PRESCRIPTION ID
    // =====================================================

    public Long getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(Long prescriptionId) {
        this.prescriptionId = prescriptionId;
    }


    // =====================================================
    // ICU START DATE
    // =====================================================

    public LocalDate getIcuStartDate() {
        return icuStartDate;
    }

    public void setIcuStartDate(LocalDate icuStartDate) {
        this.icuStartDate = icuStartDate;
    }


    // =====================================================
    // ICU END DATE
    // =====================================================

    public LocalDate getIcuEndDate() {
        return icuEndDate;
    }

    public void setIcuEndDate(LocalDate icuEndDate) {
        this.icuEndDate = icuEndDate;
    }


    // =====================================================
    // BED NUMBER
    // =====================================================

    public String getBedNumber() {
        return bedNumber;
    }

    public void setBedNumber(String bedNumber) {
        this.bedNumber = bedNumber;
    }


    // =====================================================
    // WARD NUMBER
    // =====================================================

    public String getWardNumber() {
        return wardNumber;
    }

    public void setWardNumber(String wardNumber) {
        this.wardNumber = wardNumber;
    }


    // =====================================================
    // CRITICAL LEVEL
    // =====================================================

    public String getCriticalLevel() {
        return criticalLevel;
    }

    public void setCriticalLevel(String criticalLevel) {
        this.criticalLevel = criticalLevel;
    }


    // =====================================================
    // VENTILATOR REQUIRED
    // =====================================================

    public Boolean getVentilatorRequired() {
        return ventilatorRequired;
    }

    public void setVentilatorRequired(Boolean ventilatorRequired) {
        this.ventilatorRequired = ventilatorRequired;
    }


    // =====================================================
    // ISOLATION REQUIRED
    // =====================================================

    public Boolean getIsolationRequired() {
        return isolationRequired;
    }

    public void setIsolationRequired(Boolean isolationRequired) {
        this.isolationRequired = isolationRequired;
    }


    // =====================================================
    // DIAGNOSIS
    // =====================================================

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }


    // =====================================================
    // TREATMENT PLAN
    // =====================================================

    public String getTreatmentPlan() {
        return treatmentPlan;
    }

    public void setTreatmentPlan(String treatmentPlan) {
        this.treatmentPlan = treatmentPlan;
    }


    // =====================================================
    // OXYGEN LEVEL
    // =====================================================

    public String getOxygenLevel() {
        return oxygenLevel;
    }

    public void setOxygenLevel(String oxygenLevel) {
        this.oxygenLevel = oxygenLevel;
    }


    // =====================================================
    // HEART RATE
    // =====================================================

    public String getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(String heartRate) {
        this.heartRate = heartRate;
    }


    // =====================================================
    // BLOOD PRESSURE
    // =====================================================

    public String getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
    }


    // =====================================================
    // RESPIRATORY RATE
    // =====================================================

    public String getRespiratoryRate() {
        return respiratoryRate;
    }

    public void setRespiratoryRate(String respiratoryRate) {
        this.respiratoryRate = respiratoryRate;
    }


    // =====================================================
    // BODY TEMPERATURE
    // =====================================================

    public String getBodyTemperature() {
        return bodyTemperature;
    }

    public void setBodyTemperature(String bodyTemperature) {
        this.bodyTemperature = bodyTemperature;
    }


    // =====================================================
    // DOCTOR DEGREE
    // =====================================================

    public String getDoctorDegree() {
        return doctorDegree;
    }

    public void setDoctorDegree(String doctorDegree) {
        this.doctorDegree = doctorDegree;
    }


    // =====================================================
    // DAILY NOTES
    // =====================================================

    public String getDailyNotes() {
        return dailyNotes;
    }

    public void setDailyNotes(String dailyNotes) {
        this.dailyNotes = dailyNotes;
    }


    // =====================================================
    // MEDICATIONS GIVEN
    // =====================================================

    public String getMedicationsGiven() {
        return medicationsGiven;
    }

    public void setMedicationsGiven(String medicationsGiven) {
        this.medicationsGiven = medicationsGiven;
    }


    // =====================================================
    // PROCEDURES PERFORMED
    // =====================================================

    public String getProceduresPerformed() {
        return proceduresPerformed;
    }

    public void setProceduresPerformed(String proceduresPerformed) {
        this.proceduresPerformed = proceduresPerformed;
    }


    // =====================================================
    // DISCHARGE SUMMARY
    // =====================================================

    public String getDischargeSummary() {
        return dischargeSummary;
    }

    public void setDischargeSummary(String dischargeSummary) {
        this.dischargeSummary = dischargeSummary;
    }


    // =====================================================
    // STATUS
    // =====================================================

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}