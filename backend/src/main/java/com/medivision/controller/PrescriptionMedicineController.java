package com.medivision.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medivision.dto.PrescriptionMedicineRequest;
import com.medivision.dto.PrescriptionMedicineResponse;
import com.medivision.service.PrescriptionMedicineService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/prescription-medicines")
@CrossOrigin(origins = "http://localhost:3000")
public class PrescriptionMedicineController {

    private final PrescriptionMedicineService prescriptionMedicineService;

    public PrescriptionMedicineController(
            PrescriptionMedicineService prescriptionMedicineService) {

        this.prescriptionMedicineService = prescriptionMedicineService;
    }

    // ==========================================
    // ADD PRESCRIPTION MEDICINE
    // ==========================================

    @PostMapping("/{prescriptionId}")
    public ResponseEntity<PrescriptionMedicineResponse>
            addPrescriptionMedicine(

                    @PathVariable Long prescriptionId,

                    @Valid @RequestBody PrescriptionMedicineRequest request) {

        return new ResponseEntity<>(

                prescriptionMedicineService
                        .addPrescriptionMedicine(
                                prescriptionId,
                                request),

                HttpStatus.CREATED
        );
    }

    // ==========================================
    // UPDATE PRESCRIPTION MEDICINE
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<PrescriptionMedicineResponse>
            updatePrescriptionMedicine(

                    @PathVariable Long id,

                    @Valid @RequestBody PrescriptionMedicineRequest request) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .updatePrescriptionMedicine(
                                id,
                                request)

        );
    }

    // ==========================================
    // GET ALL PRESCRIPTION MEDICINES
    // ==========================================

    @GetMapping
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            getAllPrescriptionMedicines() {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .getAllPrescriptionMedicines()

        );
    }

    // ==========================================
    // GET PRESCRIPTION MEDICINE BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<PrescriptionMedicineResponse>
            getPrescriptionMedicineById(
                    @PathVariable Long id) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .getPrescriptionMedicineById(id)

        );
    }

    // ==========================================
    // GET MEDICINES BY PRESCRIPTION ID
    // ==========================================

    @GetMapping("/prescription/{prescriptionId}")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            getByPrescriptionId(
                    @PathVariable Long prescriptionId) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .getPrescriptionMedicinesByPrescriptionId(
                                prescriptionId)

        );
    }

    // ==========================================
    // GET MEDICINES BY PATIENT ID
    // ==========================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            getByPatientId(
                    @PathVariable Long patientId) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .getPrescriptionMedicinesByPatientId(
                                patientId)

        );
    }

    // ==========================================
    // GET MEDICINES BY DOCTOR ID
    // ==========================================

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            getByDoctorId(
                    @PathVariable Long doctorId) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .getPrescriptionMedicinesByDoctorId(
                                doctorId)

        );
    }

    // ==========================================
    // GET MEDICINES BY MEDICINE ID
    // ==========================================

    @GetMapping("/medicine/{medicineId}")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            getByMedicineId(
                    @PathVariable Long medicineId) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .getPrescriptionMedicinesByMedicineId(
                                medicineId)

        );
    }

    // ==========================================
    // SEARCH BY MEDICINE NAME
    // ==========================================

    @GetMapping("/search")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            searchMedicine(
                    @RequestParam String medicineName) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .searchMedicineByName(
                                medicineName)

        );
    }

    // ==========================================
    // SEARCH PATIENT HISTORY
    // ==========================================

    @GetMapping("/patient-history")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            searchPatientHistory(
                    @RequestParam String patientName) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .searchPatientHistory(
                                patientName)

        );
    }

    // ==========================================
    // SEARCH DOCTOR HISTORY
    // ==========================================

    @GetMapping("/doctor-history")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            searchDoctorHistory(
                    @RequestParam String doctorName) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .searchDoctorHistory(
                                doctorName)

        );
    }

    // ==========================================
    // FILTER BY STATUS
    // ==========================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            getByStatus(
                    @PathVariable String status) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .getMedicinesByStatus(status)

        );
    }

    // ==========================================
    // FILTER BY ROUTE
    // ==========================================

    @GetMapping("/route/{route}")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            getByRoute(
                    @PathVariable String route) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .getMedicinesByRoute(route)

        );
    }

    // ==========================================
    // FILTER BY FREQUENCY
    // ==========================================

    @GetMapping("/frequency/{frequency}")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            getByFrequency(
                    @PathVariable String frequency) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .getMedicinesByFrequency(
                                frequency)

        );
    }

    // ==========================================
    // FILTER BY FOOD INSTRUCTION
    // ==========================================

    @GetMapping("/food/{foodInstruction}")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            getByFoodInstruction(
                    @PathVariable String foodInstruction) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .getMedicinesByFoodInstruction(
                                foodInstruction)

        );
    }

    // ==========================================
    // REMINDER ENABLED MEDICINES
    // ==========================================

    @GetMapping("/reminders")
    public ResponseEntity<List<PrescriptionMedicineResponse>>
            getReminderEnabledMedicines() {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .getReminderEnabledMedicines()

        );
    }

    // ==========================================
    // COUNT MEDICINES IN PRESCRIPTION
    // ==========================================

    @GetMapping("/count/{prescriptionId}")
    public ResponseEntity<Long>
            countMedicines(
                    @PathVariable Long prescriptionId) {

        return ResponseEntity.ok(

                prescriptionMedicineService
                        .countMedicinesInPrescription(
                                prescriptionId)

        );
    }

    // ==========================================
    // DELETE PRESCRIPTION MEDICINE
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String>
            deletePrescriptionMedicine(
                    @PathVariable Long id) {

        prescriptionMedicineService
                .deletePrescriptionMedicine(id);

        return ResponseEntity.ok(
                "Prescription medicine deleted successfully.");
    }

    // ==========================================
    // DELETE ALL MEDICINES OF A PRESCRIPTION
    // ==========================================

    @DeleteMapping("/prescription/{prescriptionId}")
    public ResponseEntity<String>
            deleteByPrescription(
                    @PathVariable Long prescriptionId) {

        prescriptionMedicineService
                .deleteMedicinesByPrescriptionId(
                        prescriptionId);

        return ResponseEntity.ok(
                "All medicines deleted successfully.");
    }

}