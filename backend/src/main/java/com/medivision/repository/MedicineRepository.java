package com.medivision.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medivision.model.Medicine;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Long> {

    // ===========================
    // Find Methods
    // ===========================

    // Find by Medicine Code
    Optional<Medicine> findByMedicineCode(String medicineCode);

    // Find by Batch Number
    Optional<Medicine> findByBatchNumber(String batchNumber);

    // ===========================
    // Exists Methods
    // ===========================

    // Check Duplicate Medicine Code
    boolean existsByMedicineCode(String medicineCode);

    // Check Duplicate Batch Number
    boolean existsByBatchNumber(String batchNumber);

    // ===========================
    // Search Methods
    // ===========================

    // Search by Medicine Name
    List<Medicine> findByMedicineNameContainingIgnoreCase(String medicineName);

    // Search by Manufacturer
    List<Medicine> findByManufacturerContainingIgnoreCase(String manufacturer);

    // Search by Category
    List<Medicine> findByCategory(String category);

    // Search by Status
    List<Medicine> findByStatus(String status);

    // ===========================
    // Expiry Methods
    // ===========================

    // Expired Medicines
    List<Medicine> findByExpiryDateBefore(LocalDate date);

    // Medicines Expiring Before a Date
    List<Medicine> findByExpiryDateLessThanEqual(LocalDate date);

    // Medicines Expiring Between Dates
    List<Medicine> findByExpiryDateBetween(LocalDate startDate, LocalDate endDate);

    // ===========================
    // Stock Methods
    // ===========================

    // Low Stock Medicines
    List<Medicine> findByQuantityLessThanEqual(Integer quantity);

    // Out Of Stock Medicines
    List<Medicine> findByQuantity(Integer quantity);

    // ===========================
    // Statistics Methods
    // ===========================

    // Total Medicines
    long count();

    // Available Medicines
    long countByStatus(String status);

    // Out Of Stock Medicines
    long countByQuantity(Integer quantity);

    // Medicines Expiring Within Date Range
    long countByExpiryDateBetween(LocalDate startDate, LocalDate endDate);

    @Query("""
            SELECT COUNT(m)
            FROM Medicine m
            WHERE m.quantity <= m.minimumStock
            """)
    long countLowStockMedicines();

}