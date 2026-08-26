package com.medivision.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pregnancy_records")
public class PregnancyRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    private LocalDate expectedDeliveryDate;

    private Integer pregnancyWeek;

    private String riskLevel;

    private Integer babyCount;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    private String doctorDegree;

    private String bloodPressure;

    private Double weight;

    @Column(length = 1000)
    private String remarks;

    public PregnancyRecord() {
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

    public LocalDate getExpectedDeliveryDate() {
        return expectedDeliveryDate;
    }

    public void setExpectedDeliveryDate(LocalDate expectedDeliveryDate) {
        this.expectedDeliveryDate = expectedDeliveryDate;
    }

    public Integer getPregnancyWeek() {
        return pregnancyWeek;
    }

    public void setPregnancyWeek(Integer pregnancyWeek) {
        this.pregnancyWeek = pregnancyWeek;
    }

    public String getRiskLevel() {
        return riskLevel;
    }

    public void setRiskLevel(String riskLevel) {
        this.riskLevel = riskLevel;
    }

    public Integer getBabyCount() {
        return babyCount;
    }

    public void setBabyCount(Integer babyCount) {
        this.babyCount = babyCount;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public String getDoctorDegree() {
        return doctorDegree;
    }

    public void setDoctorDegree(String doctorDegree) {
        this.doctorDegree = doctorDegree;
    }

    public String getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(String bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}