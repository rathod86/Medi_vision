package com.medivision.dto;

import java.time.LocalDateTime;
import java.time.LocalTime;

public class PrescriptionMedicineResponse {

    // ==========================================
    // Primary Key
    // ==========================================

    private Long id;

    // ==========================================
    // Medicine Information
    // ==========================================

    private Long medicineId;

    private String medicineCode;

    private String medicineName;

    private String category;

    private String manufacturer;

    // ==========================================
    // Prescription Details
    // ==========================================

    private String dosage;

    // Oral / IV / IM / Topical
    private String route;

    // Once Daily / Twice Daily / 1-0-1
    private String frequency;

    // 5 Days / 7 Days
    private String duration;

    private Integer quantity;

    // ==========================================
    // Schedule
    // ==========================================

    private Boolean morning;

    private Boolean afternoon;

    private Boolean night;

    private LocalTime morningTime;

    private LocalTime afternoonTime;

    private LocalTime nightTime;

    // ==========================================
    // Food Instructions
    // ==========================================

    private String foodInstruction;

    // ==========================================
    // Additional Instructions
    // ==========================================

    private String specialInstructions;

    // ==========================================
    // Reminder
    // ==========================================

    private Boolean reminderEnabled;

    // ==========================================
    // Status
    // ==========================================

    private String status;

    // ==========================================
    // Audit
    // ==========================================

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // ==========================================
    // Getters & Setters
    // ==========================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getMedicineId() {
        return medicineId;
    }

    public void setMedicineId(Long medicineId) {
        this.medicineId = medicineId;
    }

    public String getMedicineCode() {
        return medicineCode;
    }

    public void setMedicineCode(String medicineCode) {
        this.medicineCode = medicineCode;
    }

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
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