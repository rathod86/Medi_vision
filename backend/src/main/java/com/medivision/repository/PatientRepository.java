package com.medivision.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medivision.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    // ==========================================
    // Find By Patient Code
    // ==========================================

    Optional<Patient> findByPatientCode(String patientCode);

    // ==========================================
    // Find By Email
    // ==========================================

    Optional<Patient> findByEmail(String email);

    // ==========================================
    // Find By Phone
    // ==========================================

    Optional<Patient> findByPhone(String phone);

    // ==========================================
    // Duplicate Checks
    // ==========================================

    boolean existsByPatientCode(String patientCode);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    // ==========================================
    // Search Methods
    // ==========================================

    List<Patient> findByFullNameContainingIgnoreCase(String fullName);

    List<Patient> findByBloodGroupIgnoreCase(String bloodGroup);

    List<Patient> findByGenderIgnoreCase(String gender);

    List<Patient> findByStatusIgnoreCase(String status);

    List<Patient> findByAssignedDoctorContainingIgnoreCase(String assignedDoctor);

    // ==========================================
    // Dashboard Statistics
    // ==========================================

    long countByStatusIgnoreCase(String status);

    long countByGenderIgnoreCase(String gender);

    long countByBloodGroupIgnoreCase(String bloodGroup);

    // ==========================================
    // Generate Patient Code
    // ==========================================

    @Query("SELECT MAX(p.id) FROM Patient p")
    Long findMaxPatientId();

}