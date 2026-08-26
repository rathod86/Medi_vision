package com.medivision.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medivision.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // =====================================================
    // Find Appointment Code
    // =====================================================

    Optional<Appointment> findByAppointmentCode(String appointmentCode);

    boolean existsByAppointmentCode(String appointmentCode);

    // =====================================================
    // Search
    // =====================================================

    List<Appointment> findByStatusIgnoreCase(String status);

    List<Appointment> findByDepartmentIgnoreCase(String department);

    List<Appointment> findByAppointmentDate(LocalDate appointmentDate);

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorIdAndAppointmentDate(
            Long doctorId,
            LocalDate appointmentDate);

    // =====================================================
    // Dashboard
    // =====================================================

    long countByAppointmentDate(LocalDate appointmentDate);

    long countByStatusIgnoreCase(String status);

    long countByDoctorId(Long doctorId);

    long countByPatientId(Long patientId);

    // =====================================================
    // Generate Appointment Code
    // =====================================================

    @Query("SELECT MAX(a.id) FROM Appointment a")
    Long findMaxAppointmentId();

    // =====================================================
    // Generate Token Number
    // =====================================================

    @Query("""
            SELECT COALESCE(MAX(a.tokenNumber),0)
            FROM Appointment a
            WHERE a.appointmentDate = :appointmentDate
            """)
    Integer findMaxTokenNumber(LocalDate appointmentDate);

    // =====================================================
    // Check Duplicate Time Slot
    // =====================================================

    boolean existsByDoctorIdAndAppointmentDateAndAppointmentTime(
            Long doctorId,
            LocalDate appointmentDate,
            LocalTime appointmentTime);

    // =====================================================
    // Doctor Dashboard
    // =====================================================

    @Query("""
            SELECT a.doctor.fullName,
                   COUNT(a)
            FROM Appointment a
            GROUP BY a.doctor.fullName
            """)
    List<Object[]> getDoctorAppointmentStats();

}