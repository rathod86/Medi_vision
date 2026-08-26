package com.medivision.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.medivision.dto.LabReportRequest;
import com.medivision.dto.LabReportResponse;
import com.medivision.service.LabReportService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/lab-reports")
@CrossOrigin(origins = "*")
@Validated
public class LabReportController {

    @Autowired
    private LabReportService labReportService;

    // =====================================================
    // Add Lab Report
    // =====================================================

    @PostMapping
    public ResponseEntity<LabReportResponse> addLabReport(
            @Valid @RequestBody LabReportRequest request) {

        return ResponseEntity.ok(
                labReportService.saveLabReport(request));

    }

    // =====================================================
    // Get All Lab Reports
    // =====================================================

    @GetMapping
    public ResponseEntity<List<LabReportResponse>> getAllLabReports() {

        return ResponseEntity.ok(
                labReportService.getAllLabReports());

    }

    // =====================================================
    // Get Lab Report By Id
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<LabReportResponse> getLabReportById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                labReportService.getLabReportById(id));

    }

    // =====================================================
    // Update Lab Report
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<LabReportResponse> updateLabReport(
            @PathVariable Long id,
            @Valid @RequestBody LabReportRequest request) {

        return ResponseEntity.ok(
                labReportService.updateLabReport(id, request));

    }

    // =====================================================
    // Delete Lab Report
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLabReport(
            @PathVariable Long id) {

        labReportService.deleteLabReport(id);

        return ResponseEntity.ok(
                "Lab Report deleted successfully.");

    }

    // =====================================================
    // Search By Patient
    // =====================================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<LabReportResponse>> getReportsByPatient(
            @PathVariable Long patientId) {

        return ResponseEntity.ok(
                labReportService.getReportsByPatient(patientId));

    }

    // =====================================================
    // Search By Doctor
    // =====================================================

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<LabReportResponse>> getReportsByDoctor(
            @PathVariable Long doctorId) {

        return ResponseEntity.ok(
                labReportService.getReportsByDoctor(doctorId));

    }

    // =====================================================
    // Search By Test Name
    // =====================================================

    @GetMapping("/search/test")
    public ResponseEntity<List<LabReportResponse>> searchByTestName(
            @RequestParam String testName) {

        return ResponseEntity.ok(
                labReportService.searchTestName(testName));

    }

    // =====================================================
    // Search By Status
    // =====================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<LabReportResponse>> getReportsByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                labReportService.getReportsByStatus(status));

    }

    // =====================================================
    // Latest Reports
    // =====================================================

    @GetMapping("/latest")
    public ResponseEntity<List<LabReportResponse>> getLatestReports() {

        return ResponseEntity.ok(
                labReportService.getLatestReports());

    }

    // =====================================================
    // Dashboard Statistics
    // =====================================================

    @GetMapping("/statistics/total")
    public ResponseEntity<Long> getTotalReports() {

        return ResponseEntity.ok(
                labReportService.getTotalReports());

    }

    @GetMapping("/statistics/today")
    public ResponseEntity<Long> getTodayReports() {

        return ResponseEntity.ok(
                labReportService.getTodayReports());

    }

    @GetMapping("/statistics/patient/{patientId}")
    public ResponseEntity<Long> getPatientReportCount(
            @PathVariable Long patientId) {

        return ResponseEntity.ok(
                labReportService.getPatientReportCount(patientId));

    }

    @GetMapping("/statistics/doctor/{doctorId}")
    public ResponseEntity<Long> getDoctorReportCount(
            @PathVariable Long doctorId) {

        return ResponseEntity.ok(
                labReportService.getDoctorReportCount(doctorId));

    }

}