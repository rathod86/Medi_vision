
package com.medivision.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotNull;

public class MedicalHistoryRequest {

    // =====================================================
    // PATIENT
    // =====================================================

    @NotNull(message = "Patient is required")
    private Long patientId;


    // =====================================================
    // DOCTOR
    // Optional
    // =====================================================

    private Long doctorId;


    // =====================================================
    // HISTORY DATE
    // =====================================================

    private LocalDate historyDate;


    // =====================================================
    // MEDICAL HISTORY
    // =====================================================

    private String allergies;

    private String chronicDiseases;

    private String familyHistory;

    private String previousMedications;

    private String currentMedications;

    private String previousSurgeries;

    private String previousHospitalizations;

    private String majorIllnesses;

    private String immunizationHistory;


    // =====================================================
    // TREATMENT
    // =====================================================

    private String treatmentGiven;

    private String proceduresPerformed;

    private String diagnosis;


    // =====================================================
    // PERSONAL / RISK INFORMATION
    // =====================================================

    private String bloodGroup;

    private String smokingHistory;

    private String alcoholHistory;

    private String substanceHistory;

    private String disabilityInformation;


    // =====================================================
    // NOTES
    // =====================================================

    private String emergencyNotes;

    private String additionalNotes;


    // =====================================================
    // STATUS
    // =====================================================

    private String status;


    // =====================================================
    // LAST REVIEWED DATE
    // =====================================================

    private LocalDate lastReviewedDate;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public MedicalHistoryRequest() {
    }


    // =====================================================
    // GETTERS AND SETTERS
    // =====================================================

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
}