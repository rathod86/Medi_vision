package com.medivision.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "surgeries")
public class Surgery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    private String surgeryName;

    private LocalDate surgeryDate;

    @Column(length = 2000)
    private String notes;

    private String surgeonDegree;

    private String operationTheatre;

    private String surgeryDuration;

    private String anesthesiaType;

    public Surgery() {
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

    public String getSurgeryName() {
        return surgeryName;
    }

    public void setSurgeryName(String surgeryName) {
        this.surgeryName = surgeryName;
    }

    public LocalDate getSurgeryDate() {
        return surgeryDate;
    }

    public void setSurgeryDate(LocalDate surgeryDate) {
        this.surgeryDate = surgeryDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getSurgeonDegree() {
        return surgeonDegree;
    }

    public void setSurgeonDegree(String surgeonDegree) {
        this.surgeonDegree = surgeonDegree;
    }

    public String getOperationTheatre() {
        return operationTheatre;
    }

    public void setOperationTheatre(String operationTheatre) {
        this.operationTheatre = operationTheatre;
    }

    public String getSurgeryDuration() {
        return surgeryDuration;
    }

    public void setSurgeryDuration(String surgeryDuration) {
        this.surgeryDuration = surgeryDuration;
    }

    public String getAnesthesiaType() {
        return anesthesiaType;
    }

    public void setAnesthesiaType(String anesthesiaType) {
        this.anesthesiaType = anesthesiaType;
    }
}