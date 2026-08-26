package com.medivision.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medivision.dto.BillingRequest;
import com.medivision.dto.BillingResponse;
import com.medivision.service.BillingService;

@RestController
@RequestMapping("/api/billings")
@CrossOrigin(origins = "*")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    // ==========================================
    // CREATE BILL
    // ==========================================

    @PostMapping
    public ResponseEntity<BillingResponse> createBilling(
            @Valid @RequestBody BillingRequest request) {

        BillingResponse response = billingService.createBilling(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // ==========================================
    // GET ALL BILLS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<BillingResponse>> getAllBillings() {

        return ResponseEntity.ok(billingService.getAllBillings());
    }

    // ==========================================
    // GET BILL BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<BillingResponse> getBillingById(
            @PathVariable Long id) {

        return ResponseEntity.ok(billingService.getBillingById(id));
    }

    // ==========================================
    // UPDATE BILL
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<BillingResponse> updateBilling(
            @PathVariable Long id,
            @Valid @RequestBody BillingRequest request) {

        return ResponseEntity.ok(
                billingService.updateBilling(id, request));
    }

    // ==========================================
    // DELETE BILL
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBilling(
            @PathVariable Long id) {

        billingService.deleteBilling(id);

        return ResponseEntity.ok("Billing deleted successfully.");
    }

}