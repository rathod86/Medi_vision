package com.medivision.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.medivision.model.BillingStatus;

public class BillingResponse {

    private Long id;
    private String billNumber;

    private Long patientId;
    private String patientName;

    private Long doctorId;
    private String doctorName;

    private Long admissionId;

    private BigDecimal consultationCharges;
    private BigDecimal roomCharges;
    private BigDecimal medicineCharges;
    private BigDecimal labCharges;
    private BigDecimal surgeryCharges;
    private BigDecimal icuCharges;
    private BigDecimal otherCharges;

    private BigDecimal discount;
    private BigDecimal tax;

    private BigDecimal totalAmount;
    private BigDecimal paidAmount;
    private BigDecimal balanceAmount;

    private BillingStatus paymentStatus;
    private String paymentMethod;

    private LocalDate billingDate;
    private LocalDate dueDate;

    private String notes;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public BillingResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBillNumber() {
        return billNumber;
    }

    public void setBillNumber(String billNumber) {
        this.billNumber = billNumber;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
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

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BigDecimal getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(BigDecimal paidAmount) {
        this.paidAmount = paidAmount;
    }

    public BigDecimal getBalanceAmount() {
        return balanceAmount;
    }

    public void setBalanceAmount(BigDecimal balanceAmount) {
        this.balanceAmount = balanceAmount;
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