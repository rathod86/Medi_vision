package com.medivision.dto;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class PrescriptionRequest {

    // ==========================================
    // Patient & Doctor Information
    // ==========================================

    @NotNull(message = "Patient is required")
    private Long patientId;

    @NotNull(message = "Doctor is required")
    private Long doctorId;

    // Optional
    private Long appointmentId;

    // Optional
    private Long admissionId;

    // ==========================================
    // Clinical Details
    // ==========================================

    @NotBlank(message = "Symptoms are required")
    private String symptoms;

    @NotBlank(message = "Diagnosis is required")
    private String diagnosis;

    private String allergies;

    private String clinicalNotes;

    private String doctorRemarks;

    // ==========================================
    // Dates
    // ==========================================

    @NotNull(message = "Prescription date is required")
    private LocalDate prescriptionDate;

    private LocalDate followUpDate;

    // ==========================================
    // Status
    // ==========================================

    private String status = "Draft";

    // ==========================================
    // Medicines
    // ==========================================

    @Valid
    @NotEmpty(message = "At least one medicine is required")
    private List<PrescriptionMedicineRequest> medicines;

    // ==========================================
    // Getters & Setters
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

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Long getAdmissionId() {
        return admissionId;
    }

    public void setAdmissionId(Long admissionId) {
        this.admissionId = admissionId;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    public String getAllergies() {
        return allergies;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public String getClinicalNotes() {
        return clinicalNotes;
    }

    public void setClinicalNotes(String clinicalNotes) {
        this.clinicalNotes = clinicalNotes;
    }

    public String getDoctorRemarks() {
        return doctorRemarks;
    }

    public void setDoctorRemarks(String doctorRemarks) {
        this.doctorRemarks = doctorRemarks;
    }

    public LocalDate getPrescriptionDate() {
        return prescriptionDate;
    }

    public void setPrescriptionDate(LocalDate prescriptionDate) {
        this.prescriptionDate = prescriptionDate;
    }

    public LocalDate getFollowUpDate() {
        return followUpDate;
    }

    public void setFollowUpDate(LocalDate followUpDate) {
        this.followUpDate = followUpDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<PrescriptionMedicineRequest> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<PrescriptionMedicineRequest> medicines) {
        this.medicines = medicines;
    }
}