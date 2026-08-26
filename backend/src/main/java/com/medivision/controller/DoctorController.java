package com.medivision.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import com.medivision.dto.DoctorRequest;
import com.medivision.dto.DoctorResponse;
import com.medivision.service.DoctorService;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "*")
@Validated
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    // ==========================================
    // Add Doctor
    // ==========================================

    @PostMapping
    public DoctorResponse saveDoctor(
            @Valid @RequestBody DoctorRequest request) {

        return doctorService.saveDoctor(request);
    }

    // ==========================================
    // Get All Doctors
    // ==========================================

    @GetMapping
    public List<DoctorResponse> getAllDoctors() {

        return doctorService.getAllDoctors();
    }

    // ==========================================
    // Get Doctor By Id
    // ==========================================

    @GetMapping("/{id}")
    public DoctorResponse getDoctorById(
            @PathVariable Long id) {

        return doctorService.getDoctorById(id);
    }

    // ==========================================
    // Update Doctor
    // ==========================================

    @PutMapping("/{id}")
    public DoctorResponse updateDoctor(
            @PathVariable Long id,
            @Valid @RequestBody DoctorRequest request) {

        return doctorService.updateDoctor(id, request);
    }

    // ==========================================
    // Delete Doctor
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDoctor(
            @PathVariable Long id) {

        doctorService.deleteDoctor(id);

        return ResponseEntity.ok("Doctor deleted successfully.");
    }

}