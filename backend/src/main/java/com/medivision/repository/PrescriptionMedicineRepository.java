package com.medivision.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medivision.model.Prescription;
import com.medivision.model.PrescriptionMedicine;

@Repository
public interface PrescriptionMedicineRepository
        extends JpaRepository<PrescriptionMedicine, Long> {

    // ==========================================
    // Prescription
    // ==========================================

    List<PrescriptionMedicine> findByPrescription(
            Prescription prescription);

    List<PrescriptionMedicine> findByPrescriptionId(
            Long prescriptionId);

    void deleteByPrescriptionId(
            Long prescriptionId);

    long countByPrescriptionId(
            Long prescriptionId);

    // ==========================================
    // Medicine
    // ==========================================

    List<PrescriptionMedicine> findByMedicineId(
            Long medicineId);

    List<PrescriptionMedicine> findByMedicineMedicineNameContainingIgnoreCase(
            String medicineName);

    List<PrescriptionMedicine> findByMedicineMedicineCode(
            String medicineCode);

    // ==========================================
    // Patient History
    // ==========================================

    List<PrescriptionMedicine> findByPrescriptionPatientId(
            Long patientId);

    List<PrescriptionMedicine> findByPrescriptionPatientFullNameContainingIgnoreCase(
            String patientName);

    // ==========================================
    // Doctor History
    // ==========================================

    List<PrescriptionMedicine> findByPrescriptionDoctorId(
            Long doctorId);

    List<PrescriptionMedicine> findByPrescriptionDoctorFullNameContainingIgnoreCase(
            String doctorName);

    // ==========================================
    // Status
    // ==========================================

    List<PrescriptionMedicine> findByStatus(
            String status);

    // ==========================================
    // Reminder
    // ==========================================

    List<PrescriptionMedicine> findByReminderEnabledTrue();

    // ==========================================
    // Food Instruction
    // ==========================================

    List<PrescriptionMedicine> findByFoodInstruction(
            String foodInstruction);

    // ==========================================
    // Frequency
    // ==========================================

    List<PrescriptionMedicine> findByFrequency(
            String frequency);

    // ==========================================
    // Route
    // ==========================================

    List<PrescriptionMedicine> findByRoute(
            String route);

    // ==========================================
    // Duration
    // ==========================================

    List<PrescriptionMedicine> findByDuration(
            String duration);

}