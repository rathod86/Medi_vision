package com.medivision.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medivision.dto.MedicalHistoryRequest;
import com.medivision.dto.MedicalHistoryResponse;
import com.medivision.service.MedicalHistoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/medical-histories")
@CrossOrigin(origins = "*")
@Validated
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;


    // =====================================================
    // ADD MEDICAL HISTORY
    // POST /api/medical-histories
    // =====================================================

    @PostMapping
    public ResponseEntity<MedicalHistoryResponse> addMedicalHistory(
            @Valid @RequestBody MedicalHistoryRequest request) {

        MedicalHistoryResponse response =
                medicalHistoryService.saveMedicalHistory(request);

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // GET ALL MEDICAL HISTORIES
    // GET /api/medical-histories
    // =====================================================

    @GetMapping
    public ResponseEntity<List<MedicalHistoryResponse>>
    getAllMedicalHistories() {

        List<MedicalHistoryResponse> histories =
                medicalHistoryService.getAllMedicalHistories();

        return ResponseEntity.ok(histories);
    }


    // =====================================================
    // GET MEDICAL HISTORY BY ID
    // GET /api/medical-histories/{id}
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<MedicalHistoryResponse>
    getMedicalHistoryById(
            @PathVariable Long id) {

        MedicalHistoryResponse response =
                medicalHistoryService.getMedicalHistoryById(id);

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // UPDATE MEDICAL HISTORY
    // PUT /api/medical-histories/{id}
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<MedicalHistoryResponse>
    updateMedicalHistory(
            @PathVariable Long id,
            @Valid @RequestBody MedicalHistoryRequest request) {

        MedicalHistoryResponse response =
                medicalHistoryService.updateMedicalHistory(
                        id,
                        request
                );

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // DELETE MEDICAL HISTORY
    // DELETE /api/medical-histories/{id}
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedicalHistory(
            @PathVariable Long id) {

        medicalHistoryService.deleteMedicalHistory(id);

        return ResponseEntity.ok(
                "Medical History deleted successfully."
        );
    }


    // =====================================================
    // GET BY PATIENT
    // GET /api/medical-histories/patient/{patientId}
    // =====================================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<MedicalHistoryResponse>>
    getMedicalHistoriesByPatient(
            @PathVariable Long patientId) {

        List<MedicalHistoryResponse> histories =
                medicalHistoryService
                        .getMedicalHistoriesByPatient(
                                patientId
                        );

        return ResponseEntity.ok(histories);
    }


    // =====================================================
    // GET BY DOCTOR
    // GET /api/medical-histories/doctor/{doctorId}
    // =====================================================

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<MedicalHistoryResponse>>
    getMedicalHistoriesByDoctor(
            @PathVariable Long doctorId) {

        List<MedicalHistoryResponse> histories =
                medicalHistoryService
                        .getMedicalHistoriesByDoctor(
                                doctorId
                        );

        return ResponseEntity.ok(histories);
    }


    // =====================================================
    // GET BY STATUS
    // GET /api/medical-histories/status/{status}
    // =====================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<MedicalHistoryResponse>>
    getMedicalHistoriesByStatus(
            @PathVariable String status) {

        List<MedicalHistoryResponse> histories =
                medicalHistoryService
                        .getMedicalHistoriesByStatus(
                                status
                        );

        return ResponseEntity.ok(histories);
    }


    // =====================================================
    // GET PATIENT + STATUS
    //
    // GET
    // /api/medical-histories/patient/{patientId}/status/{status}
    // =====================================================

    @GetMapping(
            "/patient/{patientId}/status/{status}"
    )
    public ResponseEntity<List<MedicalHistoryResponse>>
    getMedicalHistoriesByPatientAndStatus(
            @PathVariable Long patientId,
            @PathVariable String status) {

        List<MedicalHistoryResponse> histories =
                medicalHistoryService
                        .getMedicalHistoriesByPatientAndStatus(
                                patientId,
                                status
                        );

        return ResponseEntity.ok(histories);
    }


    // =====================================================
    // GET BY DATE
    //
    // GET
    // /api/medical-histories/date?date=2026-08-10
    // =====================================================

    @GetMapping("/date")
    public ResponseEntity<List<MedicalHistoryResponse>>
    getMedicalHistoriesByDate(
            @RequestParam LocalDate date) {

        List<MedicalHistoryResponse> histories =
                medicalHistoryService
                        .getMedicalHistoriesByDate(date);

        return ResponseEntity.ok(histories);
    }


    // =====================================================
    // GET BETWEEN DATES
    //
    // GET
    // /api/medical-histories/date-range
    // ?startDate=2026-08-01
    // &endDate=2026-08-10
    // =====================================================

    @GetMapping("/date-range")
    public ResponseEntity<List<MedicalHistoryResponse>>
    getMedicalHistoriesBetweenDates(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {

        List<MedicalHistoryResponse> histories =
                medicalHistoryService
                        .getMedicalHistoriesBetweenDates(
                                startDate,
                                endDate
                        );

        return ResponseEntity.ok(histories);
    }


    // =====================================================
    // GET LATEST MEDICAL HISTORIES
    // GET /api/medical-histories/latest
    // =====================================================

    @GetMapping("/latest")
    public ResponseEntity<List<MedicalHistoryResponse>>
    getLatestMedicalHistories() {

        List<MedicalHistoryResponse> histories =
                medicalHistoryService
                        .getLatestMedicalHistories();

        return ResponseEntity.ok(histories);
    }


    // =====================================================
    // GET LATEST BY PATIENT
    // GET /api/medical-histories/patient/{patientId}/latest
    // =====================================================

    @GetMapping("/patient/{patientId}/latest")
    public ResponseEntity<List<MedicalHistoryResponse>>
    getLatestMedicalHistoriesByPatient(
            @PathVariable Long patientId) {

        List<MedicalHistoryResponse> histories =
                medicalHistoryService
                        .getLatestMedicalHistoriesByPatient(
                                patientId
                        );

        return ResponseEntity.ok(histories);
    }


    // =====================================================
    // TOTAL MEDICAL HISTORIES
    // GET /api/medical-histories/statistics/total
    // =====================================================

    @GetMapping("/statistics/total")
    public ResponseEntity<Long>
    getTotalMedicalHistories() {

        return ResponseEntity.ok(
                medicalHistoryService
                        .getTotalMedicalHistories()
        );
    }


    // =====================================================
    // ACTIVE MEDICAL HISTORIES
    // GET /api/medical-histories/statistics/active
    // =====================================================

    @GetMapping("/statistics/active")
    public ResponseEntity<Long>
    getActiveMedicalHistories() {

        return ResponseEntity.ok(
                medicalHistoryService
                        .getActiveMedicalHistories()
        );
    }


    // =====================================================
    // RESOLVED MEDICAL HISTORIES
    // GET /api/medical-histories/statistics/resolved
    // =====================================================

    @GetMapping("/statistics/resolved")
    public ResponseEntity<Long>
    getResolvedMedicalHistories() {

        return ResponseEntity.ok(
                medicalHistoryService
                        .getResolvedMedicalHistories()
        );
    }


    // =====================================================
    // CHRONIC MEDICAL HISTORIES
    // GET /api/medical-histories/statistics/chronic
    // =====================================================

    @GetMapping("/statistics/chronic")
    public ResponseEntity<Long>
    getChronicMedicalHistories() {

        return ResponseEntity.ok(
                medicalHistoryService
                        .getChronicMedicalHistories()
        );
    }


    // =====================================================
    // TODAY'S MEDICAL HISTORIES
    // GET /api/medical-histories/statistics/today
    // =====================================================

    @GetMapping("/statistics/today")
    public ResponseEntity<Long>
    getTodayMedicalHistories() {

        return ResponseEntity.ok(
                medicalHistoryService
                        .getTodayMedicalHistories()
        );
    }


    // =====================================================
    // PATIENT HISTORY COUNT
    //
    // GET
    // /api/medical-histories/statistics/patient/{patientId}
    // =====================================================

    @GetMapping(
            "/statistics/patient/{patientId}"
    )
    public ResponseEntity<Long>
    getPatientHistoryCount(
            @PathVariable Long patientId) {

        return ResponseEntity.ok(
                medicalHistoryService
                        .getPatientHistoryCount(
                                patientId
                        )
        );
    }
}