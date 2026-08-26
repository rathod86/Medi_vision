package com.medivision.controller;

import com.medivision.dto.MedicineRequest;
import com.medivision.dto.MedicineResponse;
import com.medivision.dto.MedicineStatsResponse;
import com.medivision.service.MedicineService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicines")
@CrossOrigin(origins = "http://localhost:3000")
public class MedicineController {

    @Autowired
    private MedicineService medicineService;

    /**
     * Add Medicine
     */
    @PostMapping
    public ResponseEntity<MedicineResponse> addMedicine(
            @Valid @RequestBody MedicineRequest request) {

        MedicineResponse response = medicineService.addMedicine(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * Get All Medicines
     */
    @GetMapping
    public ResponseEntity<List<MedicineResponse>> getAllMedicines() {

        return ResponseEntity.ok(medicineService.getAllMedicines());
    }

    /**
     * Get Medicine By ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<MedicineResponse> getMedicineById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                medicineService.getMedicineById(id));
    }

    /**
     * Update Medicine
     */
    @PutMapping("/{id}")
    public ResponseEntity<MedicineResponse> updateMedicine(
            @PathVariable Long id,
            @Valid @RequestBody MedicineRequest request) {

        return ResponseEntity.ok(
                medicineService.updateMedicine(id, request));
    }

    /**
     * Delete Medicine
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMedicine(
            @PathVariable Long id) {

        medicineService.deleteMedicine(id);

        return ResponseEntity.ok("Medicine deleted successfully.");
    }

    /**
     * Search Medicine By Name
     */
    @GetMapping("/search")
    public ResponseEntity<List<MedicineResponse>> searchMedicine(
            @RequestParam String name) {

        return ResponseEntity.ok(
                medicineService.searchMedicineByName(name));
    }

    /**
     * Search By Manufacturer
     */
    @GetMapping("/manufacturer")
    public ResponseEntity<List<MedicineResponse>> searchManufacturer(
            @RequestParam String manufacturer) {

        return ResponseEntity.ok(
                medicineService.searchByManufacturer(manufacturer));
    }

    /**
     * Filter By Category
     */
    @GetMapping("/category/{category}")
    public ResponseEntity<List<MedicineResponse>> getByCategory(
            @PathVariable String category) {

        return ResponseEntity.ok(
                medicineService.getMedicinesByCategory(category));
    }

    /**
     * Filter By Status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<MedicineResponse>> getByStatus(
            @PathVariable String status) {

        return ResponseEntity.ok(
                medicineService.getMedicinesByStatus(status));
    }

    /**
     * Low Stock Medicines
     */
    @GetMapping("/low-stock")
    public ResponseEntity<List<MedicineResponse>> getLowStockMedicines() {

        return ResponseEntity.ok(
                medicineService.getLowStockMedicines());
    }

    /**
     * Expiring Medicines
     */
    @GetMapping("/expiring")
    public ResponseEntity<List<MedicineResponse>> getExpiringMedicines() {

        return ResponseEntity.ok(
                medicineService.getExpiringMedicines());
    }

    /**
     * Expired Medicines
     */
    @GetMapping("/expired")
    public ResponseEntity<List<MedicineResponse>> getExpiredMedicines() {

        return ResponseEntity.ok(
                medicineService.getExpiredMedicines());
    }

    /**
     * Medicine Dashboard Statistics
     */
    @GetMapping("/stats")
    public ResponseEntity<MedicineStatsResponse> getMedicineStatistics() {

        return ResponseEntity.ok(
                medicineService.getMedicineStatistics());
    }

}