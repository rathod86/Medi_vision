package com.medivision.dto;

import java.time.LocalTime;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PrescriptionMedicineRequest {

    // ==========================================
    // Medicine Information
    // ==========================================

    @NotNull(message = "Medicine is required")
    private Long medicineId;

    @NotBlank(message = "Dosage is required")
    private String dosage;

    @NotBlank(message = "Route is required")
    private String route;

    @NotBlank(message = "Frequency is required")
    private String frequency;

    @NotBlank(message = "Duration is required")
    private String duration;

    @NotNull(message = "Quantity is required")
    @Min(value = 1, message = "Quantity must be greater than zero")
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

    private String foodInstruction;

    // ==========================================
    // Special Instructions
    // ==========================================

    private String specialInstructions;

    // ==========================================
    // Reminder
    // ==========================================

    private Boolean reminderEnabled = false;

    // ==========================================
    // Getters & Setters
    // ==========================================

    public Long getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Long medicineId) {
        this.medicineId = medicineId;
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

}