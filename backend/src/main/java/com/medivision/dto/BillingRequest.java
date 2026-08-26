package com.medivision.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.medivision.model.BillingStatus;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class BillingRequest {

    @NotNull(message = "Patient is required")
    private Long patientId;

    @NotNull(message = "Doctor is required")
    private Long doctorId;

    private Long admissionId;

    @DecimalMin(value = "0.0", message = "Consultation charges cannot be negative")
    private BigDecimal consultationCharges = BigDecimal.ZERO;

    @DecimalMin(value = "0.0", message = "Room charges cannot be negative")
    private BigDecimal roomCharges = BigDecimal.ZERO;

    @DecimalMin(value = "0.0", message = "Medicine charges cannot be negative")
    private BigDecimal medicineCharges = BigDecimal.ZERO;

    @DecimalMin(value = "0.0", message = "Lab charges cannot be negative")
    private BigDecimal labCharges = BigDecimal.ZERO;

    @DecimalMin(value = "0.0", message = "Surgery charges cannot be negative")
    private BigDecimal surgeryCharges = BigDecimal.ZERO;

    @DecimalMin(value = "0.0", message = "ICU charges cannot be negative")
    private BigDecimal icuCharges = BigDecimal.ZERO;

    @DecimalMin(value = "0.0", message = "Other charges cannot be negative")
    private BigDecimal otherCharges = BigDecimal.ZERO;

    @DecimalMin(value = "0.0", message = "Discount cannot be negative")
    private BigDecimal discount = BigDecimal.ZERO;

    @DecimalMin(value = "0.0", message = "Tax cannot be negative")
    private BigDecimal tax = BigDecimal.ZERO;

    @DecimalMin(value = "0.0", message = "Paid amount cannot be negative")
    private BigDecimal paidAmount = BigDecimal.ZERO;

    @NotNull(message = "Payment status is required")
    private BillingStatus paymentStatus;

    @Size(max = 50)
    private String paymentMethod;

    @NotNull(message = "Billing date is required")
    private LocalDate billingDate;

    private LocalDate dueDate;

    @Size(max = 1000)
    private String notes;

    public BillingRequest() {
    }

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

    public Long getAdmissionId() {
        return admissionId;
    }

    public void setAdmissionId(Long admissionId) {
        this.admissionId = admissionId;
    }

    public BigDecimal getConsultationCharges() {
        return consultationCharges;
    }

    public void setConsultationCharges(BigDecimal consultationCharges) {
        this.consultationCharges = consultationCharges;
    }

    public BigDecimal getRoomCharges() {
        return roomCharges;
    }

    public void setRoomCharges(BigDecimal roomCharges) {
        this.roomCharges = roomCharges;
    }

    public BigDecimal getMedicineCharges() {
        return medicineCharges;
    }

    public void setMedicineCharges(BigDecimal medicineCharges) {
        this.medicineCharges = medicineCharges;
    }

    public BigDecimal getLabCharges() {
        return labCharges;
    }

    public void setLabCharges(BigDecimal labCharges) {
        this.labCharges = labCharges;
    }

    public BigDecimal getSurgeryCharges() {
        return surgeryCharges;
    }

    public void setSurgeryCharges(BigDecimal surgeryCharges) {
        this.surgeryCharges = surgeryCharges;
    }

    public BigDecimal getIcuCharges() {
        return icuCharges;
    }

    public void setIcuCharges(BigDecimal icuCharges) {
        this.icuCharges = icuCharges;
    }

    public BigDecimal getOtherCharges() {
        return otherCharges;
    }

    public void setOtherCharges(BigDecimal otherCharges) {
        this.otherCharges = otherCharges;
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public void setTax(BigDecimal tax) {
        this.tax = tax;
    }

    public BigDecimal getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(BigDecimal paidAmount) {
        this.paidAmount = paidAmount;
    }

    public BillingStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(BillingStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public LocalDate getBillingDate() {
        return billingDate;
    }

    public void setBillingDate(LocalDate billingDate) {
        this.billingDate = billingDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}