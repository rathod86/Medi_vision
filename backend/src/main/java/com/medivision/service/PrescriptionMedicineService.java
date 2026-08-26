package com.medivision.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.medivision.dto.PrescriptionMedicineRequest;
import com.medivision.dto.PrescriptionMedicineResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Medicine;
import com.medivision.model.Prescription;
import com.medivision.model.PrescriptionMedicine;
import com.medivision.repository.MedicineRepository;
import com.medivision.repository.PrescriptionMedicineRepository;
import com.medivision.repository.PrescriptionRepository;

@Service
public class PrescriptionMedicineService {

    // ==========================================
    // Repositories
    // ==========================================

    private final PrescriptionMedicineRepository prescriptionMedicineRepository;

    private final PrescriptionRepository prescriptionRepository;

    private final MedicineRepository medicineRepository;

    // ==========================================
    // Constructor Injection
    // ==========================================

    public PrescriptionMedicineService(
            PrescriptionMedicineRepository prescriptionMedicineRepository,
            PrescriptionRepository prescriptionRepository,
            MedicineRepository medicineRepository) {

        this.prescriptionMedicineRepository = prescriptionMedicineRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.medicineRepository = medicineRepository;
    }

    // ==========================================
    // ENTITY → RESPONSE DTO
    // ==========================================

    private PrescriptionMedicineResponse mapToResponse(
            PrescriptionMedicine medicine) {

        PrescriptionMedicineResponse response =
                new PrescriptionMedicineResponse();

        response.setId(medicine.getId());

        // Medicine Details

        response.setMedicineId(
                medicine.getMedicine().getId());

        response.setMedicineCode(
                medicine.getMedicine().getMedicineCode());

        response.setMedicineName(
                medicine.getMedicine().getMedicineName());

        response.setCategory(
                medicine.getMedicine().getCategory());

        response.setManufacturer(
                medicine.getMedicine().getManufacturer());

        // Prescription Details

        response.setDosage(
                medicine.getDosage());

        response.setRoute(
                medicine.getRoute());

        response.setFrequency(
                medicine.getFrequency());

        response.setDuration(
                medicine.getDuration());

        response.setQuantity(
                medicine.getQuantity());

        // Schedule

        response.setMorning(
                medicine.getMorning());

        response.setAfternoon(
                medicine.getAfternoon());

        response.setNight(
                medicine.getNight());

        response.setMorningTime(
                medicine.getMorningTime());

        response.setAfternoonTime(
                medicine.getAfternoonTime());

        response.setNightTime(
                medicine.getNightTime());

        // Instructions

        response.setFoodInstruction(
                medicine.getFoodInstruction());

        response.setSpecialInstructions(
                medicine.getSpecialInstructions());

        // Reminder

        response.setReminderEnabled(
                medicine.getReminderEnabled());

        // Status

        response.setStatus(
                medicine.getStatus());

        // Audit

        response.setCreatedAt(
                medicine.getCreatedAt());

        response.setUpdatedAt(
                medicine.getUpdatedAt());

        return response;
    }

    // ==========================================
    // REQUEST DTO → ENTITY
    // ==========================================

    private PrescriptionMedicine mapToEntity(
            PrescriptionMedicineRequest request,
            Long prescriptionId) {

        Prescription prescription =
                prescriptionRepository.findById(prescriptionId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Prescription not found with ID : "
                                                + prescriptionId));

        Medicine medicine =
                medicineRepository.findById(request.getMedicineId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Medicine not found with ID : "
                                                + request.getMedicineId()));

        PrescriptionMedicine entity =
                new PrescriptionMedicine();

        entity.setPrescription(prescription);

        entity.setMedicine(medicine);

        entity.setDosage(request.getDosage());

        entity.setRoute(request.getRoute());

        entity.setFrequency(request.getFrequency());

        entity.setDuration(request.getDuration());

        entity.setQuantity(request.getQuantity());

        entity.setMorning(request.getMorning());

        entity.setAfternoon(request.getAfternoon());

        entity.setNight(request.getNight());

        entity.setMorningTime(request.getMorningTime());

        entity.setAfternoonTime(request.getAfternoonTime());

        entity.setNightTime(request.getNightTime());

        entity.setFoodInstruction(
                request.getFoodInstruction());

        entity.setSpecialInstructions(
                request.getSpecialInstructions());

        entity.setReminderEnabled(
                request.getReminderEnabled());

        return entity;
    }

    // ==========================================
    // PART 2 STARTS FROM HERE
    // ==========================================
    
    // ==========================================
    // ADD PRESCRIPTION MEDICINE
    // ==========================================

    public PrescriptionMedicineResponse addPrescriptionMedicine(
            Long prescriptionId,
            PrescriptionMedicineRequest request) {

        PrescriptionMedicine prescriptionMedicine =
                mapToEntity(request, prescriptionId);

        prescriptionMedicine.setStatus("Prescribed");

        PrescriptionMedicine savedMedicine =
                prescriptionMedicineRepository.save(
                        prescriptionMedicine);

        return mapToResponse(savedMedicine);
    }

    // ==========================================
    // UPDATE PRESCRIPTION MEDICINE
    // ==========================================

    public PrescriptionMedicineResponse updatePrescriptionMedicine(
            Long id,
            PrescriptionMedicineRequest request) {

        PrescriptionMedicine existingMedicine =
                prescriptionMedicineRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Prescription Medicine not found with ID : "
                                                + id));

        // ==========================================
        // Validate Medicine
        // ==========================================

        Medicine medicine =
                medicineRepository.findById(request.getMedicineId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Medicine not found with ID : "
                                                + request.getMedicineId()));

        existingMedicine.setMedicine(medicine);

        // ==========================================
        // Update Details
        // ==========================================

        existingMedicine.setDosage(
                request.getDosage());

        existingMedicine.setRoute(
                request.getRoute());

        existingMedicine.setFrequency(
                request.getFrequency());

        existingMedicine.setDuration(
                request.getDuration());

        existingMedicine.setQuantity(
                request.getQuantity());

        // ==========================================
        // Schedule
        // ==========================================

        existingMedicine.setMorning(
                request.getMorning());

        existingMedicine.setAfternoon(
                request.getAfternoon());

        existingMedicine.setNight(
                request.getNight());

        existingMedicine.setMorningTime(
                request.getMorningTime());

        existingMedicine.setAfternoonTime(
                request.getAfternoonTime());

        existingMedicine.setNightTime(
                request.getNightTime());

        // ==========================================
        // Instructions
        // ==========================================

        existingMedicine.setFoodInstruction(
                request.getFoodInstruction());

        existingMedicine.setSpecialInstructions(
                request.getSpecialInstructions());

        // ==========================================
        // Reminder
        // ==========================================

        existingMedicine.setReminderEnabled(
                request.getReminderEnabled());

        PrescriptionMedicine updatedMedicine =
                prescriptionMedicineRepository.save(
                        existingMedicine);

        return mapToResponse(updatedMedicine);
    }

    // ==========================================
    // PART 3 STARTS FROM HERE
    // ==========================================
    // ==========================================
    // GET ALL PRESCRIPTION MEDICINES
    // ==========================================

    public List<PrescriptionMedicineResponse> getAllPrescriptionMedicines() {

        return prescriptionMedicineRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET PRESCRIPTION MEDICINE BY ID
    // ==========================================

    public PrescriptionMedicineResponse getPrescriptionMedicineById(
            Long id) {

        PrescriptionMedicine medicine =
                prescriptionMedicineRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Prescription Medicine not found with ID : "
                                                + id));

        return mapToResponse(medicine);
    }

    // ==========================================
    // GET MEDICINES BY PRESCRIPTION ID
    // ==========================================

    public List<PrescriptionMedicineResponse>
            getPrescriptionMedicinesByPrescriptionId(
                    Long prescriptionId) {

        return prescriptionMedicineRepository
                .findByPrescriptionId(prescriptionId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET MEDICINES BY PATIENT ID
    // ==========================================

    public List<PrescriptionMedicineResponse>
            getPrescriptionMedicinesByPatientId(
                    Long patientId) {

        return prescriptionMedicineRepository
                .findByPrescriptionPatientId(patientId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET MEDICINES BY DOCTOR ID
    // ==========================================

    public List<PrescriptionMedicineResponse>
            getPrescriptionMedicinesByDoctorId(
                    Long doctorId) {

        return prescriptionMedicineRepository
                .findByPrescriptionDoctorId(doctorId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET MEDICINES BY MEDICINE ID
    // ==========================================

    public List<PrescriptionMedicineResponse>
            getPrescriptionMedicinesByMedicineId(
                    Long medicineId) {

        return prescriptionMedicineRepository
                .findByMedicineId(medicineId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET MEDICINES BY MEDICINE NAME
    // ==========================================

    public List<PrescriptionMedicineResponse>
            searchMedicineByName(
                    String medicineName) {

        return prescriptionMedicineRepository
                .findByMedicineMedicineNameContainingIgnoreCase(
                        medicineName)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET PATIENT PRESCRIPTION HISTORY
    // ==========================================

    public List<PrescriptionMedicineResponse>
            searchPatientHistory(
                    String patientName) {

        return prescriptionMedicineRepository
                .findByPrescriptionPatientFullNameContainingIgnoreCase(
                        patientName)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET DOCTOR PRESCRIPTION HISTORY
    // ==========================================

    public List<PrescriptionMedicineResponse>
            searchDoctorHistory(
                    String doctorName) {

        return prescriptionMedicineRepository
                .findByPrescriptionDoctorFullNameContainingIgnoreCase(
                        doctorName)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // PART 4 STARTS FROM HERE
    // ==========================================
    // ==========================================
    // DELETE PRESCRIPTION MEDICINE
    // ==========================================

    public void deletePrescriptionMedicine(Long id) {

        PrescriptionMedicine medicine =
                prescriptionMedicineRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Prescription Medicine not found with ID : "
                                                + id));

        prescriptionMedicineRepository.delete(medicine);
    }

    // ==========================================
    // DELETE ALL MEDICINES OF A PRESCRIPTION
    // ==========================================

    public void deleteMedicinesByPrescriptionId(
            Long prescriptionId) {

        prescriptionRepository.findById(prescriptionId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Prescription not found with ID : "
                                        + prescriptionId));

        prescriptionMedicineRepository
                .deleteByPrescriptionId(prescriptionId);
    }

    // ==========================================
    // GET REMINDER ENABLED MEDICINES
    // ==========================================

    public List<PrescriptionMedicineResponse>
            getReminderEnabledMedicines() {

        return prescriptionMedicineRepository
                .findByReminderEnabledTrue()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET MEDICINES BY STATUS
    // ==========================================

    public List<PrescriptionMedicineResponse>
            getMedicinesByStatus(
                    String status) {

        return prescriptionMedicineRepository
                .findByStatus(status)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET MEDICINES BY ROUTE
    // ==========================================

    public List<PrescriptionMedicineResponse>
            getMedicinesByRoute(
                    String route) {

        return prescriptionMedicineRepository
                .findByRoute(route)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET MEDICINES BY FREQUENCY
    // ==========================================

    public List<PrescriptionMedicineResponse>
            getMedicinesByFrequency(
                    String frequency) {

        return prescriptionMedicineRepository
                .findByFrequency(frequency)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET MEDICINES BY FOOD INSTRUCTION
    // ==========================================

    public List<PrescriptionMedicineResponse>
            getMedicinesByFoodInstruction(
                    String foodInstruction) {

        return prescriptionMedicineRepository
                .findByFoodInstruction(foodInstruction)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // COUNT MEDICINES IN A PRESCRIPTION
    // ==========================================

    public long countMedicinesInPrescription(
            Long prescriptionId) {

        return prescriptionMedicineRepository
                .countByPrescriptionId(prescriptionId);
    }

    // ==========================================
    // CHECK IF PRESCRIPTION HAS MEDICINES
    // ==========================================

    public boolean hasMedicines(Long prescriptionId) {

        return prescriptionMedicineRepository
                .countByPrescriptionId(prescriptionId) > 0;
    }

    // ==========================================
    // GET ALL MEDICINES OF A PRESCRIPTION ENTITY
    // ==========================================

    public List<PrescriptionMedicine> getPrescriptionMedicineEntities(
            Long prescriptionId) {

        return prescriptionMedicineRepository
                .findByPrescriptionId(prescriptionId);
    }

    // ==========================================
    // END OF SERVICE
    // ==========================================

}
    
    
    