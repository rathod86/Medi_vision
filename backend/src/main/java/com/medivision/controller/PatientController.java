package com.medivision.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medivision.dto.PatientRequest;
import com.medivision.dto.PatientResponse;
import com.medivision.service.PatientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*")
public class PatientController {

    @Autowired
    private PatientService patientService;

    // =====================================================
    // Add Patient
    // =====================================================

    @PostMapping
    public ResponseEntity<PatientResponse> savePatient(
            @Valid @RequestBody PatientRequest request) {

        PatientResponse response = patientService.savePatient(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // =====================================================
    // Get All Patients
    // =====================================================

    @GetMapping
    public ResponseEntity<List<PatientResponse>> getAllPatients() {

        List<PatientResponse> patients = patientService.getAllPatients();

        return ResponseEntity.ok(patients);
    }

    // =====================================================
    // Get Patient By ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponse> getPatientById(
            @PathVariable Long id) {

        PatientResponse patient = patientService.getPatientById(id);

        return ResponseEntity.ok(patient);
    }

    // =====================================================
    // Update Patient
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<PatientResponse> updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequest request) {

        PatientResponse updatedPatient =
                patientService.updatePatient(id, request);

        return ResponseEntity.ok(updatedPatient);
    }

    // =====================================================
    // Delete Patient
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(
            @PathVariable Long id) {

        patientService.deletePatient(id);

        return ResponseEntity.ok("Patient Deleted Successfully");
    }

}