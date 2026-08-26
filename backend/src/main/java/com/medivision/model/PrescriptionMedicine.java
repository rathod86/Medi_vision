package com.medivision.model;

import java.time.LocalDateTime;
import java.time.LocalTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "prescription_medicines")
public class PrescriptionMedicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Relationships
    // ==========================================

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "prescription_id", nullable = false)
    private Prescription prescription;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    // ==========================================
    // Medicine Details
    // ==========================================

    @NotBlank(message = "Dosage is required")
    @Column(nullable = false)
    private String dosage;

    // Oral / IV / IM / Topical / Eye / Ear
    @NotBlank(message = "Route is required")
    @Column(nullable = false)
    private String route;

    // Once Daily / Twice Daily / 1-0-1
    @NotBlank(message = "Frequency is required")
    @Column(nullable = false)
    private String frequency;

    // 5 Days / 7 Days / 1 Month
    @NotBlank(message = "Duration is required")
    @Column(nullable = false)
    private String duration;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be at least 1")
    @Column(nullable = false)
    private Integer quantity;

    // ==========================================
    // Timing
    // ==========================================

    private Boolean morning = false;

    private Boolean afternoon = false;

    private Boolean night = false;

    private LocalTime morningTime;

    private LocalTime afternoonTime;

    private LocalTime nightTime;

    // ==========================================
    // Food Instructions
    // ==========================================

    // Before Food / After Food / With Food
    private String foodInstruction;

    // ==========================================
    // Additional Instructions
    // ==========================================

    @Column(length = 1000)
    private String specialInstructions;

    // ==========================================
    // Reminder
    // ==========================================

    private Boolean reminderEnabled = false;

    // ==========================================
    // Status
    // ==========================================

    // Prescribed / Dispensed / Completed / Cancelled
    private String status = "Prescribed";

    // ==========================================
    // Audit
    // ==========================================

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // ==========================================
    // Getters & Setters
    // ==========================================

    public Long getId() {
        return id;
    }

    public Prescription getPrescription() {
        return prescription;
    }

    public void setPrescription(Prescription prescription) {
        this.prescription = prescription;
    }

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Boolean getMorning() {
        return morning;
    }

    public void setMorning(Boolean morning) {
        this.morning = morning;
    }

    public Boolean getAfternoon() {
        return afternoon;
    }

    public void setAfternoon(Boolean afternoon) {
        this.afternoon = afternoon;
    }

    public Boolean getNight() {
        return night;
    }

    public void setNight(Boolean night) {
        this.night = night;
    }

    public LocalTime getMorningTime() {
        return morningTime;
    }

    public void setMorningTime(LocalTime morningTime) {
        this.morningTime = morningTime;
    }

    public LocalTime getAfternoonTime() {
        return afternoonTime;
    }

    public void setAfternoonTime(LocalTime afternoonTime) {
        this.afternoonTime = afternoonTime;
    }

    public LocalTime getNightTime() {
        return nightTime;
    }

    public void setNightTime(LocalTime nightTime) {
        this.nightTime = nightTime;
    }

    public String getFoodInstruction() {
        return foodInstruction;
    }

    public void setFoodInstruction(String foodInstruction) {
        this.foodInstruction = foodInstruction;
    }

    public String getSpecialInstructions() {
        return specialInstructions;
    }

    public void setSpecialInstructions(String specialInstructions) {
        this.specialInstructions = specialInstructions;
    }

    public Boolean getReminderEnabled() {
        return reminderEnabled;
    }

    public void setReminderEnabled(Boolean reminderEnabled) {
        this.reminderEnabled = reminderEnabled;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}