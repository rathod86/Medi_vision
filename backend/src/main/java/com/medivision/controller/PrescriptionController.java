package com.medivision.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medivision.dto.PrescriptionRequest;
import com.medivision.dto.PrescriptionResponse;
import com.medivision.dto.PrescriptionStatisticsResponse;
import com.medivision.service.PrescriptionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/prescriptions")
@CrossOrigin(origins = "http://localhost:3000")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(
            PrescriptionService prescriptionService) {

        this.prescriptionService = prescriptionService;
    }

    // ==========================================
    // CREATE PRESCRIPTION
    // ==========================================

    @PostMapping
    public ResponseEntity<PrescriptionResponse> addPrescription(
            @Valid @RequestBody PrescriptionRequest request) {

        PrescriptionResponse response =
                prescriptionService.addPrescription(request);

        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED);
    }

    // ==========================================
    // UPDATE PRESCRIPTION
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<PrescriptionResponse> updatePrescription(

            @PathVariable Long id,

            @Valid @RequestBody PrescriptionRequest request) {

        return ResponseEntity.ok(

                prescriptionService.updatePrescription(
                        id,
                        request)

        );
    }

    // ==========================================
    // PART 2 STARTS FROM HERE
    // ==========================================
    
    // ==========================================
    // GET ALL PRESCRIPTIONS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<PrescriptionResponse>>
            getAllPrescriptions() {

        return ResponseEntity.ok(
                prescriptionService.getAllPrescriptions());
    }

    // ==========================================
    // GET PRESCRIPTION BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<PrescriptionResponse>
            getPrescriptionById(
                    @PathVariable Long id) {

        return ResponseEntity.ok(
                prescriptionService.getPrescriptionById(id));
    }

    // ==========================================
    // GET PRESCRIPTION BY NUMBER
    // ==========================================

    @GetMapping("/number/{prescriptionNumber}")
    public ResponseEntity<PrescriptionResponse>
            getPrescriptionByNumber(
                    @PathVariable String prescriptionNumber) {

        return ResponseEntity.ok(
                prescriptionService.getPrescriptionByNumber(
                        prescriptionNumber));
    }

    // ==========================================
    // GET PRESCRIPTIONS BY PATIENT ID
    // ==========================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<PrescriptionResponse>>
            getPrescriptionsByPatient(
                    @PathVariable Long patientId) {

        return ResponseEntity.ok(
                prescriptionService.getPrescriptionsByPatient(
                        patientId));
    }

    // ==========================================
    // GET PRESCRIPTIONS BY DOCTOR ID
    // ==========================================

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<PrescriptionResponse>>
            getPrescriptionsByDoctor(
                    @PathVariable Long doctorId) {

        return ResponseEntity.ok(
                prescriptionService.getPrescriptionsByDoctor(
                        doctorId));
    }

    // ==========================================
    // GET LATEST PRESCRIPTIONS
    // ==========================================

    @GetMapping("/latest")
    public ResponseEntity<List<PrescriptionResponse>>
            getLatestPrescriptions() {

        return ResponseEntity.ok(
                prescriptionService.getLatestPrescriptions());
    }

    // ==========================================
    // PART 3 STARTS FROM HERE
    // ==========================================
    
    // ==========================================
    // SEARCH BY PATIENT NAME
    // ==========================================

    @GetMapping("/search/patient")
    public ResponseEntity<List<PrescriptionResponse>>
            searchPatient(
                    @RequestParam String patientName) {

        return ResponseEntity.ok(
                prescriptionService.searchPatient(patientName));
    }

    // ==========================================
    // SEARCH BY DOCTOR NAME
    // ==========================================

    @GetMapping("/search/doctor")
    public ResponseEntity<List<PrescriptionResponse>>
            searchDoctor(
                    @RequestParam String doctorName) {

        return ResponseEntity.ok(
                prescriptionService.searchDoctor(doctorName));
    }

    // ==========================================
    // SEARCH BY DIAGNOSIS
    // ==========================================

    @GetMapping("/search/diagnosis")
    public ResponseEntity<List<PrescriptionResponse>>
            searchDiagnosis(
                    @RequestParam String diagnosis) {

        return ResponseEntity.ok(
                prescriptionService.searchDiagnosis(diagnosis));
    }

    // ==========================================
    // SEARCH BY SYMPTOMS
    // ==========================================

    @GetMapping("/search/symptoms")
    public ResponseEntity<List<PrescriptionResponse>>
            searchSymptoms(
                    @RequestParam String symptoms) {

        return ResponseEntity.ok(
                prescriptionService.searchSymptoms(symptoms));
    }

    // ==========================================
    // FILTER BY STATUS
    // ==========================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<PrescriptionResponse>>
            getByStatus(
                    @PathVariable String status) {

        return ResponseEntity.ok(
                prescriptionService.getByStatus(status));
    }

    // ==========================================
    // FILTER BY PRESCRIPTION DATE
    // ==========================================

    @GetMapping("/date")
    public ResponseEntity<List<PrescriptionResponse>>
            getByPrescriptionDate(
                    @RequestParam String date) {

        return ResponseEntity.ok(
                prescriptionService.getByPrescriptionDate(
                        java.time.LocalDate.parse(date)));
    }

    // ==========================================
    // FILTER BY DATE RANGE
    // ==========================================

    @GetMapping("/date-range")
    public ResponseEntity<List<PrescriptionResponse>>
            getBetweenDates(

                    @RequestParam String startDate,

                    @RequestParam String endDate) {

        return ResponseEntity.ok(

                prescriptionService.getBetweenDates(

                        java.time.LocalDate.parse(startDate),

                        java.time.LocalDate.parse(endDate)

                )

        );
    }

    // ==========================================
    // FOLLOW-UP DATE
    // ==========================================

    @GetMapping("/follow-up")
    public ResponseEntity<List<PrescriptionResponse>>
            getFollowUpDate(
                    @RequestParam String followUpDate) {

        return ResponseEntity.ok(
                prescriptionService.getFollowUpDate(
                        java.time.LocalDate.parse(followUpDate)));
    }

    // ==========================================
    // FOLLOW-UP DATE RANGE
    // ==========================================

    @GetMapping("/follow-up-range")
    public ResponseEntity<List<PrescriptionResponse>>
            getFollowUpBetweenDates(

                    @RequestParam String startDate,

                    @RequestParam String endDate) {

        return ResponseEntity.ok(

                prescriptionService.getFollowUpBetweenDates(

                        java.time.LocalDate.parse(startDate),

                        java.time.LocalDate.parse(endDate)

                )

        );
    }

    // ==========================================
    // PART 4 STARTS FROM HERE
    // ==========================================
    // ==========================================
    // DELETE PRESCRIPTION
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePrescription(
            @PathVariable Long id) {

        prescriptionService.deletePrescription(id);

        return ResponseEntity.ok(
                "Prescription deleted successfully.");
    }

    // ==========================================
    // DELETE MULTIPLE PRESCRIPTIONS
    // ==========================================

    @DeleteMapping
    public ResponseEntity<String> deletePrescriptions(
            @RequestBody List<Long> ids) {

        prescriptionService.deletePrescriptions(ids);

        return ResponseEntity.ok(
                "Selected prescriptions deleted successfully.");
    }

    // ==========================================
    // DASHBOARD STATISTICS
    // ==========================================

    @GetMapping("/statistics")
    public ResponseEntity<PrescriptionStatisticsResponse>
            getStatistics() {

        return ResponseEntity.ok(
                prescriptionService.getStatistics());
    }

    // ==========================================
    // TOTAL PRESCRIPTIONS
    // ==========================================

    @GetMapping("/statistics/total")
    public ResponseEntity<Long> getTotalPrescriptions() {

        return ResponseEntity.ok(
                prescriptionService.getTotalPrescriptions());
    }

    // ==========================================
    // TODAY'S PRESCRIPTIONS
    // ==========================================

    @GetMapping("/statistics/today")
    public ResponseEntity<Long> getTodayPrescriptions() {

        return ResponseEntity.ok(
                prescriptionService.getTodayPrescriptions());
    }

    // ==========================================
    // PATIENT PRESCRIPTION COUNT
    // ==========================================

    @GetMapping("/statistics/patient/{patientId}")
    public ResponseEntity<Long> getPatientPrescriptionCount(
            @PathVariable Long patientId) {

        return ResponseEntity.ok(
                prescriptionService.getPatientPrescriptionCount(
                        patientId));
    }

    // ==========================================
    // DOCTOR PRESCRIPTION COUNT
    // ==========================================

    @GetMapping("/statistics/doctor/{doctorId}")
    public ResponseEntity<Long> getDoctorPrescriptionCount(
            @PathVariable Long doctorId) {

        return ResponseEntity.ok(
                prescriptionService.getDoctorPrescriptionCount(
                        doctorId));
    }

    // ==========================================
    // DRAFT COUNT
    // ==========================================

    @GetMapping("/statistics/draft")
    public ResponseEntity<Long> getDraftCount() {

        return ResponseEntity.ok(
                prescriptionService.getDraftCount());
    }

    // ==========================================
    // ISSUED COUNT
    // ==========================================

    @GetMapping("/statistics/issued")
    public ResponseEntity<Long> getIssuedCount() {

        return ResponseEntity.ok(
                prescriptionService.getIssuedCount());
    }

    // ==========================================
    // DISPENSED COUNT
    // ==========================================

    @GetMapping("/statistics/dispensed")
    public ResponseEntity<Long> getDispensedCount() {

        return ResponseEntity.ok(
                prescriptionService.getDispensedCount());
    }

    // ==========================================
    // COMPLETED COUNT
    // ==========================================

    @GetMapping("/statistics/completed")
    public ResponseEntity<Long> getCompletedCount() {

        return ResponseEntity.ok(
                prescriptionService.getCompletedCount());
    }

    // ==========================================
    // CANCELLED COUNT
    // ==========================================

    @GetMapping("/statistics/cancelled")
    public ResponseEntity<Long> getCancelledCount() {

        return ResponseEntity.ok(
                prescriptionService.getCancelledCount());
    }

}
    