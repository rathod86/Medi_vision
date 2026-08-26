package com.medivision.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medivision.dto.AppointmentRequest;
import com.medivision.dto.AppointmentResponse;
import com.medivision.service.AppointmentService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // =====================================================
    // Add Appointment
    // =====================================================

    @PostMapping
    public ResponseEntity<AppointmentResponse> saveAppointment(
            @Valid @RequestBody AppointmentRequest request) {

        AppointmentResponse response =
                appointmentService.saveAppointment(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // =====================================================
    // Get All Appointments
    // =====================================================

    @GetMapping
    public ResponseEntity<List<AppointmentResponse>> getAllAppointments() {

        List<AppointmentResponse> appointments =
                appointmentService.getAllAppointments();

        return ResponseEntity.ok(appointments);
    }

    // =====================================================
    // Get Appointment By ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<AppointmentResponse> getAppointmentById(
            @PathVariable Long id) {

        AppointmentResponse appointment =
                appointmentService.getAppointmentById(id);

        return ResponseEntity.ok(appointment);
    }

    // =====================================================
    // Update Appointment
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<AppointmentResponse> updateAppointment(
            @PathVariable Long id,
            @Valid @RequestBody AppointmentRequest request) {

        AppointmentResponse appointment =
                appointmentService.updateAppointment(id, request);

        return ResponseEntity.ok(appointment);
    }

    // =====================================================
    // Delete Appointment
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAppointment(
            @PathVariable Long id) {

        appointmentService.deleteAppointment(id);

        return ResponseEntity.ok("Appointment Deleted Successfully");
    }

}