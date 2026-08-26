package com.medivision.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medivision.model.ICURecord;

@Repository
public interface ICURecordRepository
        extends JpaRepository<ICURecord, Long> {

    // =====================================================
    // FIND BY ICU RECORD NUMBER
    // =====================================================

    Optional<ICURecord> findByIcuRecordNumber(
            String icuRecordNumber
    );


    // =====================================================
    // SEARCH BY PATIENT
    // =====================================================

    List<ICURecord> findByPatient_Id(
            Long patientId
    );


    // =====================================================
    // SEARCH BY DOCTOR
    // =====================================================

    List<ICURecord> findByDoctor_Id(
            Long doctorId
    );


    // =====================================================
    // SEARCH BY NURSE
    // =====================================================

    List<ICURecord> findByNurse_Id(
            Long nurseId
    );


    // =====================================================
    // SEARCH BY STATUS
    // =====================================================

    List<ICURecord> findByStatusIgnoreCase(
            String status
    );


    // =====================================================
    // SEARCH BY CRITICAL LEVEL
    // =====================================================

    List<ICURecord> findByCriticalLevelIgnoreCase(
            String criticalLevel
    );


    // =====================================================
    // SEARCH BY VENTILATOR
    // =====================================================

    List<ICURecord> findByVentilatorRequired(
            Boolean ventilatorRequired
    );


    // =====================================================
    // SEARCH BY ISOLATION
    // =====================================================

    List<ICURecord> findByIsolationRequired(
            Boolean isolationRequired
    );


    // =====================================================
    // SEARCH BY ICU START DATE
    // =====================================================

    List<ICURecord> findByIcuStartDate(
            LocalDate icuStartDate
    );


    // =====================================================
    // SEARCH BETWEEN ICU START DATES
    // =====================================================

    List<ICURecord> findByIcuStartDateBetween(
            LocalDate startDate,
            LocalDate endDate
    );


    // =====================================================
    // LATEST ICU RECORDS
    // =====================================================

    List<ICURecord> findTop10ByOrderByIdDesc();


    // =====================================================
    // DASHBOARD STATISTICS
    // =====================================================

    long countByStatusIgnoreCase(
            String status
    );


    long countByVentilatorRequired(
            Boolean ventilatorRequired
    );


    long countByIsolationRequired(
            Boolean isolationRequired
    );


    long countByCriticalLevelIgnoreCase(
            String criticalLevel
    );


    // =====================================================
    // TODAY'S ICU ADMISSIONS
    // =====================================================

    long countByIcuStartDate(
            LocalDate icuStartDate
    );


    // =====================================================
    // TOTAL ICU RECORDS
    // =====================================================

    @Query("SELECT COUNT(i) FROM ICURecord i")
    Long getTotalICURecords();


    // =====================================================
    // LAST ICU RECORD ID
    // Used for ICU number generation
    // Example: ICU0001
    // =====================================================

    @Query("SELECT MAX(i.id) FROM ICURecord i")
    Long findMaxICURecordId();
}