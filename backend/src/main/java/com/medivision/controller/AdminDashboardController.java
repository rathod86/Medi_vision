package com.medivision.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medivision.dto.AdminDashboardResponse;
import com.medivision.service.AdminDashboardService;

@RestController
@RequestMapping("/api/admin/dashboard")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    public AdminDashboardController(
            AdminDashboardService adminDashboardService) {

        this.adminDashboardService = adminDashboardService;
    }

    @GetMapping
    public ResponseEntity<AdminDashboardResponse>
    getFullDashboard() {

        return ResponseEntity.ok(
                adminDashboardService.getAdminDashboard()
        );
    }

    @GetMapping("/overview")
    public ResponseEntity<AdminDashboardResponse.OverviewStats>
    getOverview() {

        return ResponseEntity.ok(
                adminDashboardService
                        .getAdminDashboard()
                        .getOverview()
        );
    }

    @GetMapping("/users")
    public ResponseEntity<AdminDashboardResponse.UserStats>
    getUserStats() {

        return ResponseEntity.ok(
                adminDashboardService
                        .getAdminDashboard()
                        .getUsers()
        );
    }

    @GetMapping("/billing")
    public ResponseEntity<AdminDashboardResponse.BillingStats>
    getBillingStats() {

        return ResponseEntity.ok(
                adminDashboardService
                        .getAdminDashboard()
                        .getBilling()
        );
    }

    @GetMapping("/medicines")
    public ResponseEntity<com.medivision.dto.MedicineStatsResponse>
    getMedicineStats() {

        return ResponseEntity.ok(
                adminDashboardService
                        .getAdminDashboard()
                        .getMedicines()
        );
    }
}
