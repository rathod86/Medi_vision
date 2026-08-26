package com.medivision.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "discharges")
public class Discharge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    private LocalDate dischargeDate;

    private LocalTime dischargeTime;

    @Column(length = 1000)
    private String finalDiagnosis;

    @Column(length = 2000)
    private String summary;

    private LocalDate followUpDate;

    private String dischargeCondition;

    @Column(length = 1000)
    private String dischargeRemarks;

    public Discharge() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDate getDischargeDate() {
        return dischargeDate;
    }

    public void setDischargeDate(LocalDate dischargeDate) {
        this.dischargeDate = dischargeDate;
    }

    public LocalTime getDischargeTime() {
        return dischargeTime;
    }

    public void setDischargeTime(LocalTime dischargeTime) {
        this.dischargeTime = dischargeTime;
    }

    public String getFinalDiagnosis() {
        return finalDiagnosis;
    }

    public void setFinalDiagnosis(String finalDiagnosis) {
        this.finalDiagnosis = finalDiagnosis;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public LocalDate getFollowUpDate() {
        return followUpDate;
    }

    public void setFollowUpDate(LocalDate followUpDate) {
        this.followUpDate = followUpDate;
    }

    public String getDischargeCondition() {
        return dischargeCondition;
    }

    public void setDischargeCondition(String dischargeCondition) {
        this.dischargeCondition = dischargeCondition;
    }

    public String getDischargeRemarks() {
        return dischargeRemarks;
    }

    public void setDischargeRemarks(String dischargeRemarks) {
        this.dischargeRemarks = dischargeRemarks;
    }
}