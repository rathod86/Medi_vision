package com.medivision.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "prescriptions")
public class Prescription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Prescription Information
    // ==========================================

    @Column(name = "prescription_number", unique = true, nullable = false)
    private String prescriptionNumber;

    @NotNull(message = "Patient is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @NotNull(message = "Doctor is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    // Optional
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id")
    private Appointment appointment;

    // Optional
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admission_id")
    private Admission admission;

    // ==========================================
    // Clinical Details
    // ==========================================

    @Column(length = 500)
    private String symptoms;

    @Column(length = 500)
    private String diagnosis;

    @Column(length = 1000)
    private String allergies;

    @Column(length = 2000)
    private String clinicalNotes;

    @Column(length = 2000)
    private String doctorRemarks;

    // ==========================================
    // Dates
    // ==========================================

    @NotNull
    private LocalDate prescriptionDate;

    private LocalDate followUpDate;

    // ==========================================
    // Status
    // ==========================================

    @NotBlank
    private String status;

    // Draft
    // Issued
    // Dispensed
    // Completed
    // Cancelled

    // ==========================================
    // Medicines
    // ==========================================

    @OneToMany(
            mappedBy = "prescription",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<PrescriptionMedicine> medicines = new ArrayList<>();

    // ==========================================
    // Audit
    // ==========================================

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // ==========================================
    // Constructors
    // ==========================================

    public Prescription() {
        this.prescriptionDate = LocalDate.now();
        this.status = "Draft";
    }

    // ==========================================
    // Helper Methods
    // ==========================================

    public void addMedicine(PrescriptionMedicine medicine) {

        medicines.add(medicine);

        medicine.setPrescription(this);

    }

    public void removeMedicine(PrescriptionMedicine medicine) {

        medicines.remove(medicine);

        medicine.setPrescription(null);

    }

    // ==========================================
    // Getters and Setters
    // ==========================================

    public Long getId() {
        return id;
    }

    public String getPrescriptionNumber() {
        return prescriptionNumber;
    }

    public void setPrescriptionNumber(String prescriptionNumber) {
        this.prescriptionNumber = prescriptionNumber;
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

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public Admission getAdmission() {
        return admission;
    }

    public void setAdmission(Admission admission) {
        this.admission = admission;
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

    public List<PrescriptionMedicine> getMedicines() {
        return medicines;
    }

    public void setMedicines(List<PrescriptionMedicine> medicines) {
        this.medicines = medicines;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}