package com.medivision.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medivision.model.Prescription;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {

    // =====================================================
    // Prescription Number
    // =====================================================

    Optional<Prescription> findByPrescriptionNumber(String prescriptionNumber);

    boolean existsByPrescriptionNumber(String prescriptionNumber);

    // =====================================================
    // Patient
    // =====================================================

    List<Prescription> findByPatientId(Long patientId);

    List<Prescription> findByPatientFullNameContainingIgnoreCase(String patientName);

    // =====================================================
    // Doctor
    // =====================================================

    List<Prescription> findByDoctorId(Long doctorId);

    List<Prescription> findByDoctorFullNameContainingIgnoreCase(String doctorName);

    // =====================================================
    // Diagnosis
    // =====================================================

    List<Prescription> findByDiagnosisContainingIgnoreCase(String diagnosis);

    // =====================================================
    // Symptoms
    // =====================================================

    List<Prescription> findBySymptomsContainingIgnoreCase(String symptoms);

    // =====================================================
    // Status
    // =====================================================

    List<Prescription> findByStatus(String status);

    // =====================================================
    // Date Filters
    // =====================================================

    List<Prescription> findByPrescriptionDate(LocalDate prescriptionDate);

    List<Prescription> findByPrescriptionDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    List<Prescription> findByPrescriptionDateAfter(LocalDate date);

    List<Prescription> findByPrescriptionDateBefore(LocalDate date);

    // =====================================================
    // Follow-up
    // =====================================================

    List<Prescription> findByFollowUpDate(LocalDate followUpDate);

    List<Prescription> findByFollowUpDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    // =====================================================
    // Appointment
    // =====================================================

    List<Prescription> findByAppointmentId(Long appointmentId);

    // =====================================================
    // Admission
    // =====================================================

    List<Prescription> findByAdmissionId(Long admissionId);

    // =====================================================
    // Statistics
    // =====================================================

    long countByStatus(String status);

    long countByPrescriptionDate(LocalDate prescriptionDate);

    long countByPatientId(Long patientId);

    long countByDoctorId(Long doctorId);

    // =====================================================
    // Dashboard
    // =====================================================

    List<Prescription> findTop10ByOrderByCreatedAtDesc();

}