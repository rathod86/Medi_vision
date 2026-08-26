package com.medivision.repository;

import com.medivision.model.Nurse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NurseRepository extends JpaRepository<Nurse, Long> {

    // =====================================================
    // Find By Employee Code
    // =====================================================

    Optional<Nurse> findByEmployeeCode(String employeeCode);


    // =====================================================
    // Find By Phone
    // =====================================================

    Optional<Nurse> findByPhone(String phone);


    // =====================================================
    // Find By Email
    // =====================================================

    Optional<Nurse> findByEmail(String email);


    // =====================================================
    // Search By Name
    // =====================================================

    List<Nurse> findByFullNameContainingIgnoreCase(
            String fullName
    );


    // =====================================================
    // Search By Department
    // =====================================================

    List<Nurse> findByDepartmentIgnoreCase(
            String department
    );


    // =====================================================
    // Search By Shift
    // =====================================================

    List<Nurse> findByShiftIgnoreCase(
            String shift
    );


    // =====================================================
    // Search By Status
    // =====================================================

    List<Nurse> findByStatusIgnoreCase(
            String status
    );


    // =====================================================
    // Search By Employment Type
    // =====================================================

    List<Nurse> findByEmploymentTypeIgnoreCase(
            String employmentType
    );


    // =====================================================
    // Department + Status
    // =====================================================

    List<Nurse> findByDepartmentIgnoreCaseAndStatusIgnoreCase(
            String department,
            String status
    );


    // =====================================================
    // Dashboard Statistics
    // =====================================================

    long countByStatusIgnoreCase(String status);


    long countByDepartmentIgnoreCase(String department);


    long countByShiftIgnoreCase(String shift);
}