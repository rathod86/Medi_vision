package com.medivision.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medivision.model.LabReport;

@Repository
public interface LabReportRepository extends JpaRepository<LabReport, Long> {

    // =====================================================
    // Report Code
    // =====================================================

    Optional<LabReport> findByReportCode(String reportCode);

    boolean existsByReportCode(String reportCode);

    // =====================================================
    // Patient
    // =====================================================

    List<LabReport> findByPatientId(Long patientId);

    List<LabReport> findByPatientFullNameContainingIgnoreCase(String patientName);

    // =====================================================
    // Doctor
    // =====================================================

    List<LabReport> findByDoctorId(Long doctorId);

    List<LabReport> findByDoctorFullNameContainingIgnoreCase(String doctorName);

    // =====================================================
    // Prescription
    // =====================================================

    List<LabReport> findByPrescriptionId(Long prescriptionId);

    // =====================================================
    // Test Name
    // =====================================================

    List<LabReport> findByTestNameContainingIgnoreCase(String testName);

    // =====================================================
    // Test Category
    // =====================================================

    List<LabReport> findByTestCategoryContainingIgnoreCase(String testCategory);

    // =====================================================
    // Sample Type
    // =====================================================

    List<LabReport> findBySampleTypeContainingIgnoreCase(String sampleType);

    // =====================================================
    // Status
    // =====================================================

    List<LabReport> findByStatusIgnoreCase(String status);

    // =====================================================
    // Laboratory Name
    // =====================================================

    List<LabReport> findByLabNameContainingIgnoreCase(String labName);

    // =====================================================
    // Technician
    // =====================================================

    List<LabReport> findByLabTechnicianNameContainingIgnoreCase(
            String technicianName);

    // =====================================================
    // Test Date
    // =====================================================

    List<LabReport> findByTestDate(LocalDate testDate);

    List<LabReport> findByTestDateBetween(
            LocalDate startDate,
            LocalDate endDate);

    // =====================================================
    // Report Date
    // =====================================================

    List<LabReport> findByReportDate(LocalDate reportDate);

    List<LabReport> findByReportDateBetween(
            LocalDate startDate,
            LocalDate endDate);

    // =====================================================
    // Dashboard Statistics
    // =====================================================

    long countByStatusIgnoreCase(String status);

    long countByPatientId(Long patientId);

    long countByDoctorId(Long doctorId);

    long countByTestDate(LocalDate testDate);

    // =====================================================
    // Latest Reports
    // =====================================================

    List<LabReport> findTop10ByOrderByTestDateDesc();

    // =====================================================
    // Generate Report Code
    // =====================================================

    @Query("SELECT MAX(l.id) FROM LabReport l")
    Long findMaxLabReportId();

}