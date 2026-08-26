package com.medivision.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "billings")
public class Billing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ==========================================
    // Bill Information
    // ==========================================

    @Column(name = "bill_number", unique = true, nullable = false)
    private String billNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admission_id")
    private Admission admission;

    // ==========================================
    // Charges
    // ==========================================

    @Column(name = "consultation_charges")
    private BigDecimal consultationCharges = BigDecimal.ZERO;

    @Column(name = "room_charges")
    private BigDecimal roomCharges = BigDecimal.ZERO;

    @Column(name = "medicine_charges")
    private BigDecimal medicineCharges = BigDecimal.ZERO;

    @Column(name = "lab_charges")
    private BigDecimal labCharges = BigDecimal.ZERO;

    @Column(name = "surgery_charges")
    private BigDecimal surgeryCharges = BigDecimal.ZERO;

    @Column(name = "icu_charges")
    private BigDecimal icuCharges = BigDecimal.ZERO;

    @Column(name = "other_charges")
    private BigDecimal otherCharges = BigDecimal.ZERO;

    @Column(name = "discount")
    private BigDecimal discount = BigDecimal.ZERO;

    @Column(name = "tax")
    private BigDecimal tax = BigDecimal.ZERO;

    // ==========================================
    // Amounts
    // ==========================================

    @Column(name = "total_amount")
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Column(name = "paid_amount")
    private BigDecimal paidAmount = BigDecimal.ZERO;

    @Column(name = "balance_amount")
    private BigDecimal balanceAmount = BigDecimal.ZERO;

    // ==========================================
    // Payment
    // ==========================================

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status")
    private BillingStatus paymentStatus = BillingStatus.PENDING;

    @Column(name = "payment_method")
    private String paymentMethod;

    // ==========================================
    // Dates
    // ==========================================

    @Column(name = "billing_date")
    private LocalDate billingDate;

    @Column(name = "due_date")
    private LocalDate dueDate;

    // ==========================================
    // Notes
    // ==========================================

    @Column(length = 1000)
    private String notes;

    // ==========================================
    // Audit
    // ==========================================

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();

        if (billingDate == null) {
            billingDate = LocalDate.now();
        }

        if (paymentStatus == null) {
            paymentStatus = BillingStatus.PENDING;
        }
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // ==========================================
    // Business Logic
    // ==========================================

    public void calculateBill() {

        BigDecimal subtotal =
                consultationCharges
                        .add(roomCharges)
                        .add(medicineCharges)
                        .add(labCharges)
                        .add(surgeryCharges)
                        .add(icuCharges)
                        .add(otherCharges);

        totalAmount = subtotal
                .subtract(discount)
                .add(tax);

        balanceAmount = totalAmount.subtract(paidAmount);
    }

    // Generate Getters and Setters
    
    public Billing() {
    }

    // ==========================
    // Getters and Setters
    // ==========================

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

    public Admission getAdmission() {
        return admission;
    }

    public void setAdmission(Admission admission) {
        this.admission = admission;
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