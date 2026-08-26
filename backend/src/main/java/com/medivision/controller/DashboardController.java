package com.medivision.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medivision.dto.AdminDashboardResponse;
import com.medivision.dto.AppointmentStatusResponse;
import com.medivision.dto.DashboardResponse;
import com.medivision.dto.DoctorAppointmentStatsResponse;
import com.medivision.dto.DoctorStatsResponse;
import com.medivision.dto.PatientStatsResponse;
import com.medivision.service.AdminDashboardService;
import com.medivision.service.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;
    private final AdminDashboardService adminDashboardService;

    public DashboardController(
            DashboardService dashboardService,
            AdminDashboardService adminDashboardService) {

        this.dashboardService = dashboardService;
        this.adminDashboardService = adminDashboardService;
    }

    @GetMapping
    public DashboardResponse getDashboardData() {
        return dashboardService.getDashboardData();
    }

    @GetMapping("/full")
    public ResponseEntity<AdminDashboardResponse>
    getFullDashboard() {

        return ResponseEntity.ok(
                adminDashboardService.getAdminDashboard()
        );
    }

    @GetMapping("/doctor-stats")
    public DoctorStatsResponse getDoctorStats() {
        return dashboardService.getDoctorStats();
    }

    @GetMapping("/patient-stats")
    public PatientStatsResponse getPatientStats() {
        return dashboardService.getPatientStats();
    }

    @GetMapping("/appointment-status")
    public AppointmentStatusResponse getAppointmentStatus() {
        return dashboardService.getAppointmentStatus();
    }

    @GetMapping("/doctor-appointments")
    public List<DoctorAppointmentStatsResponse>
    getDoctorAppointmentStats() {

        return dashboardService.getDoctorAppointmentStats();
    }
}
