package com.medivision.model;

import jakarta.persistence.*;

@Entity
@Table(name = "doctor_degrees")

public class DoctorDegree {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    private String degreeName;

    private String collegeName;

    private int yearCompleted;

    @ManyToOne
    @JoinColumn(name = "doctor_id")

    private Doctor doctor;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDegreeName() {
        return degreeName;
    }

    public void setDegreeName(String degreeName) {
        this.degreeName = degreeName;
    }

    public String getCollegeName() {
        return collegeName;
    }

    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }

    public int getYearCompleted() {
        return yearCompleted;
    }

    public void setYearCompleted(int yearCompleted) {
        this.yearCompleted = yearCompleted;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }
}