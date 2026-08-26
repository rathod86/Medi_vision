package com.medivision.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medivision.dto.AdmissionRequest;
import com.medivision.dto.AdmissionResponse;
import com.medivision.service.AdmissionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admissions")
@CrossOrigin(origins = "*")
public class AdmissionController {

    @Autowired
    private AdmissionService admissionService;

    // =====================================================
    // Add Admission
    // =====================================================

    @PostMapping
    public ResponseEntity<AdmissionResponse> saveAdmission(
            @Valid @RequestBody AdmissionRequest request) {

        AdmissionResponse response =
                admissionService.saveAdmission(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    // =====================================================
    // Get All Admissions
    // =====================================================

    @GetMapping
    public ResponseEntity<List<AdmissionResponse>> getAllAdmissions() {

        List<AdmissionResponse> admissions =
                admissionService.getAllAdmissions();

        return ResponseEntity.ok(admissions);

    }

    // =====================================================
    // Get Admission By ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<AdmissionResponse> getAdmissionById(
            @PathVariable Long id) {

        AdmissionResponse admission =
                admissionService.getAdmissionById(id);

        return ResponseEntity.ok(admission);

    }

    // =====================================================
    // Update Admission
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<AdmissionResponse> updateAdmission(
            @PathVariable Long id,
            @Valid @RequestBody AdmissionRequest request) {

        AdmissionResponse admission =
                admissionService.updateAdmission(id, request);

        return ResponseEntity.ok(admission);

    }

    // =====================================================
    // Delete Admission
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdmission(
            @PathVariable Long id) {

        admissionService.deleteAdmission(id);

        return ResponseEntity.ok("Admission Deleted Successfully");

    }

}