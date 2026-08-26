package com.medivision.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medivision.model.Admission;

@Repository
public interface AdmissionRepository extends JpaRepository<Admission, Long> {

    // ==========================================
    // Dashboard Statistics
    // ==========================================

    long countByAdmissionDate(LocalDate admissionDate);

    long countByStatus(String status);

    // ==========================================
    // Search
    // ==========================================

    List<Admission> findByAdmissionNumberContainingIgnoreCase(String admissionNumber);

    List<Admission> findByStatusIgnoreCase(String status);

    List<Admission> findByDepartmentIgnoreCase(String department);

    // ==========================================
    // Dashboard - Department Wise Admissions
    // ==========================================

    @Query("""
            SELECT a.department,
                   COUNT(a)
            FROM Admission a
            GROUP BY a.department
            """)
    List<Object[]> getDepartmentAdmissionStats();

    // ==========================================
    // Dashboard - Doctor Wise Admissions
    // ==========================================

    @Query("""
            SELECT a.doctor.fullName,
                   COUNT(a)
            FROM Admission a
            GROUP BY a.doctor.fullName
            """)
    List<Object[]> getDoctorAdmissionStats();

}