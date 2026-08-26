package com.medivision.service;

import com.medivision.dto.MedicineRequest;

import com.medivision.dto.MedicineResponse;
import com.medivision.model.Medicine;
import com.medivision.repository.MedicineRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import java.time.LocalDate;
import com.medivision.dto.MedicineStatsResponse;

@Service
public class MedicineService {

    @Autowired
    private MedicineRepository medicineRepository;

    /**
     * Convert Entity to Response DTO
     */
    private MedicineResponse mapToResponse(Medicine medicine) {

        MedicineResponse response = new MedicineResponse();

        response.setId(medicine.getId());
        response.setMedicineCode(medicine.getMedicineCode());
        response.setMedicineName(medicine.getMedicineName());
        response.setCategory(medicine.getCategory());
        response.setDosage(medicine.getDosage());
        response.setManufacturer(medicine.getManufacturer());
        response.setBatchNumber(medicine.getBatchNumber());
        response.setExpiryDate(medicine.getExpiryDate());
        response.setQuantity(medicine.getQuantity());
        response.setMinimumStock(medicine.getMinimumStock());
        response.setPurchasePrice(medicine.getPurchasePrice());
        response.setSellingPrice(medicine.getSellingPrice());
        response.setSupplier(medicine.getSupplier());
        response.setStorageLocation(medicine.getStorageLocation());
        response.setDescription(medicine.getDescription());
        response.setStatus(medicine.getStatus());
        response.setCreatedAt(medicine.getCreatedAt());
        response.setUpdatedAt(medicine.getUpdatedAt());

        return response;
    }

    /**
     * Convert Request DTO to Entity
     */
    private Medicine mapToEntity(MedicineRequest request) {

        Medicine medicine = new Medicine();

        medicine.setMedicineCode(request.getMedicineCode());
        medicine.setMedicineName(request.getMedicineName());
        medicine.setCategory(request.getCategory());
        medicine.setDosage(request.getDosage());
        medicine.setManufacturer(request.getManufacturer());
        medicine.setBatchNumber(request.getBatchNumber());
        medicine.setExpiryDate(request.getExpiryDate());
        medicine.setQuantity(request.getQuantity());
        medicine.setMinimumStock(request.getMinimumStock());
        medicine.setPurchasePrice(request.getPurchasePrice());
        medicine.setSellingPrice(request.getSellingPrice());
        medicine.setSupplier(request.getSupplier());
        medicine.setStorageLocation(request.getStorageLocation());
        medicine.setDescription(request.getDescription());

        return medicine;
    }
    
    /**
     * Add New Medicine
     */
    public MedicineResponse addMedicine(MedicineRequest request) {

        if (medicineRepository.existsByMedicineCode(request.getMedicineCode())) {
            throw new RuntimeException("Medicine Code already exists.");
        }

        if (medicineRepository.existsByBatchNumber(request.getBatchNumber())) {
            throw new RuntimeException("Batch Number already exists.");
        }

        Medicine medicine = mapToEntity(request);

        Medicine savedMedicine = medicineRepository.save(medicine);

        return mapToResponse(savedMedicine);
    }

    /**
     * Update Medicine
     */
    public MedicineResponse updateMedicine(Long id, MedicineRequest request) {

        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with ID : " + id));

        // Check duplicate Medicine Code
        medicineRepository.findByMedicineCode(request.getMedicineCode())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new RuntimeException("Medicine Code already exists.");
                    }
                });

        // Check duplicate Batch Number
        medicineRepository.findByBatchNumber(request.getBatchNumber())
                .ifPresent(existing -> {
                    if (!existing.getId().equals(id)) {
                        throw new RuntimeException("Batch Number already exists.");
                    }
                });

        medicine.setMedicineCode(request.getMedicineCode());
        medicine.setMedicineName(request.getMedicineName());
        medicine.setCategory(request.getCategory());
        medicine.setDosage(request.getDosage());
        medicine.setManufacturer(request.getManufacturer());
        medicine.setBatchNumber(request.getBatchNumber());
        medicine.setExpiryDate(request.getExpiryDate());
        medicine.setQuantity(request.getQuantity());
        medicine.setMinimumStock(request.getMinimumStock());
        medicine.setPurchasePrice(request.getPurchasePrice());
        medicine.setSellingPrice(request.getSellingPrice());
        medicine.setSupplier(request.getSupplier());
        medicine.setStorageLocation(request.getStorageLocation());
        medicine.setDescription(request.getDescription());

        Medicine updatedMedicine = medicineRepository.save(medicine);

        return mapToResponse(updatedMedicine);
    }
    
    /**
     * Get All Medicines
     */
    public List<MedicineResponse> getAllMedicines() {

        return medicineRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get Medicine By ID
     */
    public MedicineResponse getMedicineById(Long id) {

        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Medicine not found with ID : " + id));

        return mapToResponse(medicine);
    }

    /**
     * Delete Medicine
     */
    public void deleteMedicine(Long id) {

        Medicine medicine = medicineRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Medicine not found with ID : " + id));

        medicineRepository.delete(medicine);
    }
    
    /**
     * Search Medicines by Name
     */
    public List<MedicineResponse> searchMedicineByName(String medicineName) {

        return medicineRepository
                .findByMedicineNameContainingIgnoreCase(medicineName)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Search Medicines by Manufacturer
     */
    public List<MedicineResponse> searchByManufacturer(String manufacturer) {

        return medicineRepository
                .findByManufacturerContainingIgnoreCase(manufacturer)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Filter Medicines by Category
     */
    public List<MedicineResponse> getMedicinesByCategory(String category) {

        return medicineRepository
                .findByCategory(category)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Filter Medicines by Status
     */
    public List<MedicineResponse> getMedicinesByStatus(String status) {

        return medicineRepository
                .findByStatus(status)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get Low Stock Medicines
     */
    public List<MedicineResponse> getLowStockMedicines() {

        return medicineRepository.findAll()
                .stream()
                .filter(medicine ->
                        medicine.getQuantity() <= medicine.getMinimumStock())
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get Expiring Medicines
     * (Next 30 Days)
     */
    public List<MedicineResponse> getExpiringMedicines() {

        return medicineRepository
                .findByExpiryDateLessThanEqual(
                        java.time.LocalDate.now().plusDays(30))
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Get Expired Medicines
     */
    public List<MedicineResponse> getExpiredMedicines() {

        return medicineRepository
                .findByExpiryDateBefore(java.time.LocalDate.now())
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    /**
     * Get Medicine Dashboard Statistics
     */
    public MedicineStatsResponse getMedicineStatistics() {

        // Total Medicines
        long totalMedicines = medicineRepository.count();

        // Available Medicines
        long availableMedicines = medicineRepository.countByStatus("Available");

        // Out Of Stock Medicines
        long outOfStockMedicines = medicineRepository.countByQuantity(0);

        // Medicines Expiring Within Next 30 Days
        long expiringMedicines = medicineRepository.countByExpiryDateBetween(
                LocalDate.now(),
                LocalDate.now().plusDays(30)
        );

        // Low Stock Medicines
        long lowStockMedicines = medicineRepository.findAll()
                .stream()
                .filter(medicine ->
                        medicine.getQuantity() > 0 &&
                        medicine.getQuantity() <= medicine.getMinimumStock())
                .count();

        return new MedicineStatsResponse(
                totalMedicines,
                availableMedicines,
                lowStockMedicines,
                outOfStockMedicines,
                expiringMedicines
        );
    }

}