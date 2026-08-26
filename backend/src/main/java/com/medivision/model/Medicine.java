package com.medivision.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Entity
@Table(name = "medicines")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "medicine_code", unique = true, nullable = false, length = 20)
    @NotBlank(message = "Medicine code is required")
    private String medicineCode;

    @Column(name = "medicine_name", nullable = false, length = 150)
    @NotBlank(message = "Medicine name is required")
    private String medicineName;

    @Column(nullable = false, length = 50)
    @NotBlank(message = "Category is required")
    private String category;

    @Column(nullable = false, length = 50)
    @NotBlank(message = "Dosage is required")
    private String dosage;

    @Column(nullable = false, length = 100)
    @NotBlank(message = "Manufacturer is required")
    private String manufacturer;

    @Column(name = "batch_number", nullable = false, unique = true)
    @NotBlank(message = "Batch number is required")
    private String batchNumber;

    @Column(name = "expiry_date", nullable = false)
    @NotNull(message = "Expiry date is required")
    @Future(message = "Expiry date must be in the future")
    private LocalDate expiryDate;

    @Column(nullable = false)
    @Min(value = 0, message = "Quantity cannot be negative")
    private Integer quantity;

    @Column(name = "minimum_stock", nullable = false)
    @Min(value = 0, message = "Minimum stock cannot be negative")
    private Integer minimumStock;

    @Column(name = "purchase_price", precision = 10, scale = 2)
    @Positive(message = "Purchase price must be greater than zero")
    private BigDecimal purchasePrice;

    @Column(name = "selling_price", precision = 10, scale = 2)
    @Positive(message = "Selling price must be greater than zero")
    private BigDecimal sellingPrice;

    @Column(length = 100)
    private String supplier;

    @Column(name = "storage_location")
    private String storageLocation;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String status = "Available";

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    @PreUpdate
    public void updateStatus() {

        if (quantity == null || quantity <= 0) {
            status = "Out Of Stock";
        } else if (quantity <= minimumStock) {
            status = "Low Stock";
        } else {
            status = "Available";
        }
    }

    public Long getId() {
        return id;
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

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getBatchNumber() {
        return batchNumber;
    }

    public void setBatchNumber(String batchNumber) {
        this.batchNumber = batchNumber;
    }

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getMinimumStock() {
        return minimumStock;
    }

    public void setMinimumStock(Integer minimumStock) {
        this.minimumStock = minimumStock;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public BigDecimal getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(BigDecimal sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public String getStorageLocation() {
        return storageLocation;
    }

    public void setStorageLocation(String storageLocation) {
        this.storageLocation = storageLocation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}