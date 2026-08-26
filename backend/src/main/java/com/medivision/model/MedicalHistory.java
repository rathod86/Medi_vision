package com.medivision.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "medical_histories")
public class MedicalHistory {

    // =====================================================
    // PRIMARY KEY
    // =====================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =====================================================
    // HISTORY NUMBER
    // Example: MH0001
    // =====================================================

    @Column(
        name = "history_number",
        length = 20,
        unique = true,
        nullable = false
    )
    private String historyNumber;


    // =====================================================
    // PATIENT
    // =====================================================

    @ManyToOne
    @JoinColumn(
        name = "patient_id",
        nullable = false
    )
    private Patient patient;


    // =====================================================
    // DOCTOR
    // =====================================================

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;


    // =====================================================
    // HISTORY DATE
    // =====================================================

    @Column(name = "history_date")
    private LocalDate historyDate;


    // =====================================================
    // ALLERGIES
    // =====================================================

    @Column(
        name = "allergies",
        columnDefinition = "TEXT"
    )
    private String allergies;


    // =====================================================
    // CHRONIC DISEASES
    // =====================================================

    @Column(
        name = "chronic_diseases",
        columnDefinition = "TEXT"
    )
    private String chronicDiseases;


    // =====================================================
    // FAMILY HISTORY
    // =====================================================

    @Column(
        name = "family_history",
        columnDefinition = "TEXT"
    )
    private String familyHistory;


    // =====================================================
    // PREVIOUS MEDICATIONS
    // =====================================================

    @Column(
        name = "previous_medications",
        columnDefinition = "TEXT"
    )
    private String previousMedications;


    // =====================================================
    // CURRENT MEDICATIONS
    // =====================================================

    @Column(
        name = "current_medications",
        columnDefinition = "TEXT"
    )
    private String currentMedications;


    // =====================================================
    // PREVIOUS SURGERIES
    // =====================================================

    @Column(
        name = "previous_surgeries",
        columnDefinition = "TEXT"
    )
    private String previousSurgeries;


    // =====================================================
    // PREVIOUS HOSPITALIZATIONS
    // =====================================================

    @Column(
        name = "previous_hospitalizations",
        columnDefinition = "TEXT"
    )
    private String previousHospitalizations;


    // =====================================================
    // MAJOR ILLNESSES
    // =====================================================

    @Column(
        name = "major_illnesses",
        columnDefinition = "TEXT"
    )
    private String majorIllnesses;


    // =====================================================
    // IMMUNIZATION HISTORY
    // =====================================================

    @Column(
        name = "immunization_history",
        columnDefinition = "TEXT"
    )
    private String immunizationHistory;


    // =====================================================
    // TREATMENT GIVEN
    // =====================================================

    @Column(
        name = "treatment_given",
        columnDefinition = "TEXT"
    )
    private String treatmentGiven;


    // =====================================================
    // PROCEDURES PERFORMED
    // =====================================================

    @Column(
        name = "procedures_performed",
        columnDefinition = "TEXT"
    )
    private String proceduresPerformed;


    // =====================================================
    // DIAGNOSIS
    // =====================================================

    @Column(
        name = "diagnosis",
        columnDefinition = "TEXT"
    )
    private String diagnosis;


    // =====================================================
    // BLOOD GROUP
    // =====================================================

    @Column(
        name = "blood_group",
        length = 20
    )
    private String bloodGroup;


    // =====================================================
    // SMOKING HISTORY
    // =====================================================

    @Column(
        name = "smoking_history",
        columnDefinition = "TEXT"
    )
    private String smokingHistory;


    // =====================================================
    // ALCOHOL HISTORY
    // =====================================================

    @Column(
        name = "alcohol_history",
        columnDefinition = "TEXT"
    )
    private String alcoholHistory;


    // =====================================================
    // SUBSTANCE HISTORY
    // =====================================================

    @Column(
        name = "substance_history",
        columnDefinition = "TEXT"
    )
    private String substanceHistory;


    // =====================================================
    // DISABILITY INFORMATION
    // =====================================================

    @Column(
        name = "disability_information",
        columnDefinition = "TEXT"
    )
    private String disabilityInformation;


    // =====================================================
    // EMERGENCY NOTES
    // =====================================================

    @Column(
        name = "emergency_notes",
        columnDefinition = "TEXT"
    )
    private String emergencyNotes;


    // =====================================================
    // ADDITIONAL NOTES
    // =====================================================

    @Column(
        name = "additional_notes",
        columnDefinition = "TEXT"
    )
    private String additionalNotes;


    // =====================================================
    // STATUS
    // =====================================================

    @Column(
        name = "status",
        length = 30
    )
    private String status;


    // =====================================================
    // LAST REVIEWED DATE
    // =====================================================

    @Column(name = "last_reviewed_date")
    private LocalDate lastReviewedDate;


    // =====================================================
    // CREATED AT
    // =====================================================

    @Column(
        name = "created_at",
        nullable = false,
        updatable = false
    )
    private LocalDateTime createdAt;


    // =====================================================
    // UPDATED AT
    // =====================================================

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public MedicalHistory() {
    }


    // =====================================================
    // PRE PERSIST
    // =====================================================

    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        this.createdAt = now;
        this.updatedAt = now;

        if (this.historyDate == null) {
            this.historyDate = LocalDate.now();
        }

        if (this.status == null || this.status.trim().isEmpty()) {
            this.status = "ACTIVE";
        }
    }


    // =====================================================
    // PRE UPDATE
    // =====================================================

    @PreUpdate
    protected void onUpdate() {

        this.updatedAt = LocalDateTime.now();
    }


    // =====================================================
    // GETTERS AND SETTERS
    // =====================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getHistoryNumber() {
        return historyNumber;
    }

    public void setHistoryNumber(String historyNumber) {
        this.historyNumber = historyNumber;
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


    public LocalDate getHistoryDate() {
        return historyDate;
    }

    public void setHistoryDate(LocalDate historyDate) {
        this.historyDate = historyDate;
    }


    public String getAllergies() {
        return allergies;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }


    public String getChronicDiseases() {
        return chronicDiseases;
    }

    public void setChronicDiseases(String chronicDiseases) {
        this.chronicDiseases = chronicDiseases;
    }


    public String getFamilyHistory() {
        return familyHistory;
    }

    public void setFamilyHistory(String familyHistory) {
        this.familyHistory = familyHistory;
    }


    public String getPreviousMedications() {
        return previousMedications;
    }

    public void setPreviousMedications(String previousMedications) {
        this.previousMedications = previousMedications;
    }


    public String getCurrentMedications() {
        return currentMedications;
    }

    public void setCurrentMedications(String currentMedications) {
        this.currentMedications = currentMedications;
    }


    public String getPreviousSurgeries() {
        return previousSurgeries;
    }

    public void setPreviousSurgeries(String previousSurgeries) {
        this.previousSurgeries = previousSurgeries;
    }


    public String getPreviousHospitalizations() {
        return previousHospitalizations;
    }

    public void setPreviousHospitalizations(String previousHospitalizations) {
        this.previousHospitalizations = previousHospitalizations;
    }


    public String getMajorIllnesses() {
        return majorIllnesses;
    }

    public void setMajorIllnesses(String majorIllnesses) {
        this.majorIllnesses = majorIllnesses;
    }


    public String getImmunizationHistory() {
        return immunizationHistory;
    }

    public void setImmunizationHistory(String immunizationHistory) {
        this.immunizationHistory = immunizationHistory;
    }


    public String getTreatmentGiven() {
        return treatmentGiven;
    }

    public void setTreatmentGiven(String treatmentGiven) {
        this.treatmentGiven = treatmentGiven;
    }


    public String getProceduresPerformed() {
        return proceduresPerformed;
    }

    public void setProceduresPerformed(String proceduresPerformed) {
        this.proceduresPerformed = proceduresPerformed;
    }


    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }


    public String getBloodGroup() {
        return bloodGroup;
    }

    public void setBloodGroup(String bloodGroup) {
        this.bloodGroup = bloodGroup;
    }


    public String getSmokingHistory() {
        return smokingHistory;
    }

    public void setSmokingHistory(String smokingHistory) {
        this.smokingHistory = smokingHistory;
    }


    public String getAlcoholHistory() {
        return alcoholHistory;
    }

    public void setAlcoholHistory(String alcoholHistory) {
        this.alcoholHistory = alcoholHistory;
    }


    public String getSubstanceHistory() {
        return substanceHistory;
    }

    public void setSubstanceHistory(String substanceHistory) {
        this.substanceHistory = substanceHistory;
    }


    public String getDisabilityInformation() {
        return disabilityInformation;
    }

    public void setDisabilityInformation(String disabilityInformation) {
        this.disabilityInformation = disabilityInformation;
    }


    public String getEmergencyNotes() {
        return emergencyNotes;
    }

    public void setEmergencyNotes(String emergencyNotes) {
        this.emergencyNotes = emergencyNotes;
    }


    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


    public LocalDate getLastReviewedDate() {
        return lastReviewedDate;
    }

    public void setLastReviewedDate(LocalDate lastReviewedDate) {
        this.lastReviewedDate = lastReviewedDate;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }


    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}