
package com.medivision.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medivision.model.MedicalHistory;

@Repository
public interface MedicalHistoryRepository
        extends JpaRepository<MedicalHistory, Long> {

    // =====================================================
    // FIND BY HISTORY NUMBER
    // =====================================================

    Optional<MedicalHistory> findByHistoryNumber(
            String historyNumber
    );

    // =====================================================
    // CHECK HISTORY NUMBER EXISTS
    // =====================================================

    boolean existsByHistoryNumber(
            String historyNumber
    );

    // =====================================================
    // FIND BY PATIENT
    // =====================================================

    List<MedicalHistory> findByPatient_Id(
            Long patientId
    );

    // =====================================================
    // FIND BY DOCTOR
    // =====================================================

    List<MedicalHistory> findByDoctor_Id(
            Long doctorId
    );

    // =====================================================
    // FIND BY STATUS
    // =====================================================

    List<MedicalHistory> findByStatusIgnoreCase(
            String status
    );

    // =====================================================
    // FIND BY PATIENT + STATUS
    // =====================================================

    List<MedicalHistory> findByPatient_IdAndStatusIgnoreCase(
            Long patientId,
            String status
    );

    // =====================================================
    // FIND BY HISTORY DATE
    // =====================================================

    List<MedicalHistory> findByHistoryDate(
            LocalDate historyDate
    );

    // =====================================================
    // FIND BETWEEN HISTORY DATES
    // =====================================================

    List<MedicalHistory> findByHistoryDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );

    // =====================================================
    // LATEST 10 MEDICAL HISTORIES
    // =====================================================

    List<MedicalHistory> findTop10ByOrderByIdDesc();

    // =====================================================
    // LATEST 10 HISTORIES BY PATIENT
    // =====================================================

    List<MedicalHistory> findTop10ByPatient_IdOrderByIdDesc(
            Long patientId
    );

    // =====================================================
    // COUNT BY STATUS
    // =====================================================

    long countByStatusIgnoreCase(
            String status
    );

    // =====================================================
    // COUNT BY PATIENT
    // =====================================================

    long countByPatient_Id(
            Long patientId
    );

    // =====================================================
    // COUNT BY DOCTOR
    // =====================================================

    long countByDoctor_Id(
            Long doctorId
    );

    // =====================================================
    // COUNT BY HISTORY DATE
    // =====================================================

    long countByHistoryDate(
            LocalDate historyDate
    );
}