package com.medivision.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;

@Entity
@Table(name = "icu_records")
public class ICURecord {

    // =====================================================
    // PRIMARY KEY
    // =====================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    // =====================================================
    // ICU RECORD NUMBER
    // Example: ICU0001
    // =====================================================

    @Column(
        name = "icu_record_number",
        nullable = false,
        unique = true,
        length = 20
    )
    private String icuRecordNumber;


    // =====================================================
    // PATIENT
    // REQUIRED
    // =====================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "patient_id",
        nullable = false
    )
    private Patient patient;


    // =====================================================
    // DOCTOR
    // REQUIRED
    // =====================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "doctor_id",
        nullable = false
    )
    private Doctor doctor;


    // =====================================================
    // NURSE
    // OPTIONAL
    // =====================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "nurse_id",
        nullable = true
    )
    private Nurse nurse;


    // =====================================================
    // ADMISSION
    // OPTIONAL
    // =====================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "admission_id",
        nullable = true
    )
    private Admission admission;


    // =====================================================
    // PRESCRIPTION
    // OPTIONAL
    // =====================================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
        name = "prescription_id",
        nullable = true
    )
    private Prescription prescription;


    // =====================================================
    // ICU DETAILS
    // =====================================================

    @Column(
        name = "icu_start_date",
        nullable = false
    )
    private LocalDate icuStartDate;


    @Column(
        name = "icu_end_date"
    )
    private LocalDate icuEndDate;


    @Column(
        name = "bed_number",
        length = 30
    )
    private String bedNumber;


    @Column(
        name = "ward_number",
        length = 30
    )
    private String wardNumber;


    @Column(
        name = "critical_level",
        length = 50
    )
    private String criticalLevel;


    @Column(
        name = "ventilator_required"
    )
    private Boolean ventilatorRequired;


    @Column(
        name = "isolation_required"
    )
    private Boolean isolationRequired;


    // =====================================================
    // DIAGNOSIS
    // =====================================================

    @Column(
        name = "diagnosis",
        length = 1000
    )
    private String diagnosis;


    @Column(
        name = "treatment_plan",
        length = 1000
    )
    private String treatmentPlan;


    // =====================================================
    // VITAL SIGNS
    // =====================================================

    @Column(
        name = "oxygen_level",
        length = 30
    )
    private String oxygenLevel;


    @Column(
        name = "heart_rate",
        length = 30
    )
    private String heartRate;


    @Column(
        name = "blood_pressure",
        length = 30
    )
    private String bloodPressure;


    @Column(
        name = "respiratory_rate",
        length = 30
    )
    private String respiratoryRate;


    @Column(
        name = "body_temperature",
        length = 30
    )
    private String bodyTemperature;


    // =====================================================
    // DOCTOR INFORMATION
    // =====================================================

    @Column(
        name = "doctor_degree",
        length = 100
    )
    private String doctorDegree;


    // =====================================================
    // DAILY MONITORING
    // =====================================================

    @Column(
        name = "daily_notes",
        columnDefinition = "TEXT"
    )
    private String dailyNotes;


    @Column(
        name = "medications_given",
        columnDefinition = "TEXT"
    )
    private String medicationsGiven;


    @Column(
        name = "procedures_performed",
        columnDefinition = "TEXT"
    )
    private String proceduresPerformed;


    // =====================================================
    // DISCHARGE
    // =====================================================

    @Column(
        name = "discharge_summary",
        columnDefinition = "TEXT"
    )
    private String dischargeSummary;


    // =====================================================
    // STATUS
    // =====================================================

    @Column(
        name = "status",
        length = 30
    )
    private String status;


    // =====================================================
    // AUDIT FIELDS
    // =====================================================

    @Column(
        name = "created_at",
        nullable = false,
        updatable = false
    )
    private LocalDateTime createdAt;


    @Column(
        name = "updated_at",
        nullable = false
    )
    private LocalDateTime updatedAt;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public ICURecord() {
    }


    // =====================================================
    // PRE-PERSIST
    // =====================================================

    @PrePersist
    protected void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;


        // Default status

        if (status == null || status.trim().isEmpty()) {
            status = "Admitted";
        }


        // Default ventilator flag

        if (ventilatorRequired == null) {
            ventilatorRequired = false;
        }


        // Default isolation flag

        if (isolationRequired == null) {
            isolationRequired = false;
        }
    }


    // =====================================================
    // PRE-UPDATE
    // =====================================================

    @PreUpdate
    protected void onUpdate() {

        updatedAt = LocalDateTime.now();
    }


    // =====================================================
    // BASIC GETTERS AND SETTERS
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

    public void setIcuRecordNumber(
            String icuRecordNumber) {

        this.icuRecordNumber = icuRecordNumber;
    }


    // =====================================================
    // PATIENT
    // =====================================================

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }


    // =====================================================
    // DOCTOR
    // =====================================================

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }


    // =====================================================
    // NURSE
    // =====================================================

    public Nurse getNurse() {
        return nurse;
    }

    public void setNurse(Nurse nurse) {
        this.nurse = nurse;
    }


    // =====================================================
    // ADMISSION
    // =====================================================

    public Admission getAdmission() {
        return admission;
    }

    public void setAdmission(Admission admission) {
        this.admission = admission;
    }


    // =====================================================
    // PRESCRIPTION
    // =====================================================

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(
            Prescription prescription) {

        this.prescription = prescription;
    }


    // =====================================================
    // ICU DATES
    // =====================================================

    public LocalDate getIcuStartDate() {
        return icuStartDate;
    }

    public void setIcuStartDate(
            LocalDate icuStartDate) {

        this.icuStartDate = icuStartDate;
    }


    public LocalDate getIcuEndDate() {
        return icuEndDate;
    }

    public void setIcuEndDate(
            LocalDate icuEndDate) {

        this.icuEndDate = icuEndDate;
    }


    // =====================================================
    // ICU BED / WARD
    // =====================================================

    public String getBedNumber() {
        return bedNumber;
    }

    public void setBedNumber(
            String bedNumber) {

        this.bedNumber = bedNumber;
    }


    public String getWardNumber() {
        return wardNumber;
    }

    public void setWardNumber(
            String wardNumber) {

        this.wardNumber = wardNumber;
    }


    // =====================================================
    // CRITICAL LEVEL
    // =====================================================

    public String getCriticalLevel() {
        return criticalLevel;
    }

    public void setCriticalLevel(
            String criticalLevel) {

        this.criticalLevel = criticalLevel;
    }


    // =====================================================
    // VENTILATOR
    // =====================================================

    public Boolean getVentilatorRequired() {
        return ventilatorRequired;
    }

    public void setVentilatorRequired(
            Boolean ventilatorRequired) {

        this.ventilatorRequired =
                ventilatorRequired;
    }


    // =====================================================
    // ISOLATION
    // =====================================================

    public Boolean getIsolationRequired() {
        return isolationRequired;
    }

    public void setIsolationRequired(
            Boolean isolationRequired) {

        this.isolationRequired =
                isolationRequired;
    }


    // =====================================================
    // DIAGNOSIS
    // =====================================================

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(
            String diagnosis) {

        this.diagnosis = diagnosis;
    }


    // =====================================================
    // TREATMENT PLAN
    // =====================================================

    public String getTreatmentPlan() {
        return treatmentPlan;
    }

    public void setTreatmentPlan(
            String treatmentPlan) {

        this.treatmentPlan = treatmentPlan;
    }


    // =====================================================
    // VITAL SIGNS
    // =====================================================

    public String getOxygenLevel() {
        return oxygenLevel;
    }

    public void setOxygenLevel(
            String oxygenLevel) {

        this.oxygenLevel = oxygenLevel;
    }


    public String getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(
            String heartRate) {

        this.heartRate = heartRate;
    }


    public String getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(
            String bloodPressure) {

        this.bloodPressure = bloodPressure;
    }


    public String getRespiratoryRate() {
        return respiratoryRate;
    }

    public void setRespiratoryRate(
            String respiratoryRate) {

        this.respiratoryRate =
                respiratoryRate;
    }


    public String getBodyTemperature() {
        return bodyTemperature;
    }

    public void setBodyTemperature(
            String bodyTemperature) {

        this.bodyTemperature =
                bodyTemperature;
    }


    // =====================================================
    // DOCTOR DEGREE
    // =====================================================

    public String getDoctorDegree() {
        return doctorDegree;
    }

    public void setDoctorDegree(
            String doctorDegree) {

        this.doctorDegree =
                doctorDegree;
    }


    // =====================================================
    // DAILY MONITORING
    // =====================================================

    public String getDailyNotes() {
        return dailyNotes;
    }

    public void setDailyNotes(
            String dailyNotes) {

        this.dailyNotes = dailyNotes;
    }


    public String getMedicationsGiven() {
        return medicationsGiven;
    }

    public void setMedicationsGiven(
            String medicationsGiven) {

        this.medicationsGiven =
                medicationsGiven;
    }


    public String getProceduresPerformed() {
        return proceduresPerformed;
    }

    public void setProceduresPerformed(
            String proceduresPerformed) {

        this.proceduresPerformed =
                proceduresPerformed;
    }


    // =====================================================
    // DISCHARGE
    // =====================================================

    public String getDischargeSummary() {
        return dischargeSummary;
    }

    public void setDischargeSummary(
            String dischargeSummary) {

        this.dischargeSummary =
                dischargeSummary;
    }


    // =====================================================
    // STATUS
    // =====================================================

    public String getStatus() {
        return status;
    }

    public void setStatus(
            String status) {

        this.status = status;
    }


    // =====================================================
    // AUDIT FIELDS
    // =====================================================

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(
            LocalDateTime createdAt) {

        this.createdAt = createdAt;
    }


    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(
            LocalDateTime updatedAt) {

        this.updatedAt = updatedAt;
    }


    // =====================================================
    // EXPLICIT RESPONSE HELPER GETTERS
    //
    // These are NOT database columns.
    //
    // They provide direct properties to ModelMapper
    // and prevent it from guessing through nested
    // Admission / Patient / Doctor / Nurse objects.
    // =====================================================

    @Transient
    public String getAdmissionNumber() {

        if (admission == null) {
            return null;
        }

        return admission.getAdmissionNumber();
    }


    @Transient
    public String getPrescriptionNumber() {

        if (prescription == null) {
            return null;
        }

        return prescription.getPrescriptionNumber();
    }


    @Transient
    public Long getPatientId() {

        if (patient == null) {
            return null;
        }

        return patient.getId();
    }


    @Transient
    public Long getDoctorId() {

        if (doctor == null) {
            return null;
        }

        return doctor.getId();
    }


    @Transient
    public Long getNurseId() {

        if (nurse == null) {
            return null;
        }

        return nurse.getId();
    }


    @Transient
    public Long getAdmissionId() {

        if (admission == null) {
            return null;
        }

        return admission.getId();
    }


    @Transient
    public Long getPrescriptionId() {

        if (prescription == null) {
            return null;
        }

        return prescription.getId();
    }
}