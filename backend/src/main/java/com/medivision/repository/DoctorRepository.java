package com.medivision.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medivision.model.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // ==============================
    // Find By Doctor Code
    // ==============================

    Optional<Doctor> findByDoctorCode(String doctorCode);

    // ==============================
    // Find By Email
    // ==============================

    Optional<Doctor> findByEmail(String email);

    // ==============================
    // Find By Phone
    // ==============================

    Optional<Doctor> findByPhone(String phone);

    // ==============================
    // Duplicate Checks
    // ==============================

    boolean existsByDoctorCode(String doctorCode);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    // ==============================
    // Search
    // ==============================

    List<Doctor> findByFullNameContainingIgnoreCase(String fullName);

    List<Doctor> findByDepartmentIgnoreCase(String department);

    List<Doctor> findBySpecializationContainingIgnoreCase(String specialization);

    List<Doctor> findByStatusIgnoreCase(String status);

    // ==============================
    // Dashboard
    // ==============================

    long countByStatusIgnoreCase(String status);

    // ==============================
    // Last Doctor ID
    // ==============================

    @Query("SELECT MAX(d.id) FROM Doctor d")
    Long findMaxDoctorId();
}