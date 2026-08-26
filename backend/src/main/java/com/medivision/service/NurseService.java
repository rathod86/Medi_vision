package com.medivision.service;

import com.medivision.dto.NurseRequest;
import com.medivision.dto.NurseResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Nurse;
import com.medivision.repository.NurseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NurseService {

    @Autowired
    private NurseRepository nurseRepository;

    // =====================================================
    // CREATE NURSE
    // =====================================================

    public NurseResponse saveNurse(NurseRequest request) {

        // Employee code must be unique
        if (nurseRepository
                .findByEmployeeCode(request.getEmployeeCode())
                .isPresent()) {

            throw new IllegalArgumentException(
                    "Employee code already exists: "
                            + request.getEmployeeCode()
            );
        }

        // Phone must be unique
        if (nurseRepository
                .findByPhone(request.getPhone())
                .isPresent()) {

            throw new IllegalArgumentException(
                    "Phone number already exists."
            );
        }

        // Email is optional
        if (request.getEmail() != null
                && !request.getEmail().isBlank()
                && nurseRepository
                .findByEmail(request.getEmail())
                .isPresent()) {

            throw new IllegalArgumentException(
                    "Email already exists."
            );
        }

        Nurse nurse = new Nurse();

        mapRequestToEntity(request, nurse);

        Nurse savedNurse =
                nurseRepository.save(nurse);

        return mapToResponse(savedNurse);
    }


    // =====================================================
    // GET ALL NURSES
    // =====================================================

    public List<NurseResponse> getAllNurses() {

        return nurseRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET NURSE BY ID
    // =====================================================

    public NurseResponse getNurseById(Long id) {

        Nurse nurse = nurseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Nurse not found with id: " + id
                        )
                );

        return mapToResponse(nurse);
    }


    // =====================================================
    // UPDATE NURSE
    // =====================================================

    public NurseResponse updateNurse(
            Long id,
            NurseRequest request) {

        Nurse nurse = nurseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Nurse not found with id: " + id
                        )
                );

        // ---------------------------------------------
        // Employee Code Validation
        // ---------------------------------------------

        nurseRepository
                .findByEmployeeCode(
                        request.getEmployeeCode()
                )
                .ifPresent(existing -> {

                    if (!existing.getId().equals(id)) {

                        throw new IllegalArgumentException(
                                "Employee code already exists."
                        );
                    }
                });


        // ---------------------------------------------
        // Phone Validation
        // ---------------------------------------------

        nurseRepository
                .findByPhone(request.getPhone())
                .ifPresent(existing -> {

                    if (!existing.getId().equals(id)) {

                        throw new IllegalArgumentException(
                                "Phone number already exists."
                        );
                    }
                });


        // ---------------------------------------------
        // Email Validation
        // ---------------------------------------------

        if (request.getEmail() != null
                && !request.getEmail().isBlank()) {

            nurseRepository
                    .findByEmail(request.getEmail())
                    .ifPresent(existing -> {

                        if (!existing.getId().equals(id)) {

                            throw new IllegalArgumentException(
                                    "Email already exists."
                            );
                        }
                    });
        }


        mapRequestToEntity(request, nurse);

        Nurse updatedNurse =
                nurseRepository.save(nurse);

        return mapToResponse(updatedNurse);
    }


    // =====================================================
    // DELETE NURSE
    // =====================================================

    public void deleteNurse(Long id) {

        Nurse nurse = nurseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Nurse not found with id: " + id
                        )
                );

        nurseRepository.delete(nurse);
    }


    // =====================================================
    // SEARCH BY NAME
    // =====================================================

    public List<NurseResponse> searchByName(
            String name) {

        return nurseRepository
                .findByFullNameContainingIgnoreCase(name)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET BY DEPARTMENT
    // =====================================================

    public List<NurseResponse> getByDepartment(
            String department) {

        return nurseRepository
                .findByDepartmentIgnoreCase(department)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET BY SHIFT
    // =====================================================

    public List<NurseResponse> getByShift(
            String shift) {

        return nurseRepository
                .findByShiftIgnoreCase(shift)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET BY STATUS
    // =====================================================

    public List<NurseResponse> getByStatus(
            String status) {

        return nurseRepository
                .findByStatusIgnoreCase(status)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET BY DEPARTMENT + STATUS
    // =====================================================

    public List<NurseResponse> getByDepartmentAndStatus(
            String department,
            String status) {

        return nurseRepository
                .findByDepartmentIgnoreCaseAndStatusIgnoreCase(
                        department,
                        status
                )
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // TOTAL NURSES
    // =====================================================

    public long getTotalNurses() {

        return nurseRepository.count();
    }


    // =====================================================
    // ACTIVE NURSES
    // =====================================================

    public long getActiveNurses() {

        return nurseRepository
                .countByStatusIgnoreCase("ACTIVE");
    }


    // =====================================================
    // INACTIVE NURSES
    // =====================================================

    public long getInactiveNurses() {

        return nurseRepository
                .countByStatusIgnoreCase("INACTIVE");
    }


    // =====================================================
    // ON LEAVE NURSES
    // =====================================================

    public long getOnLeaveNurses() {

        return nurseRepository
                .countByStatusIgnoreCase("ON_LEAVE");
    }


    // =====================================================
    // MAP REQUEST -> ENTITY
    // =====================================================

    private void mapRequestToEntity(
            NurseRequest request,
            Nurse nurse) {

        nurse.setEmployeeCode(
                request.getEmployeeCode().trim()
        );

        nurse.setFullName(
                request.getFullName().trim()
        );

        nurse.setDegree(
                request.getDegree().trim()
        );

        nurse.setSpecialization(
                clean(request.getSpecialization())
        );

        nurse.setLicenseNumber(
                clean(request.getLicenseNumber())
        );

        nurse.setExperienceYears(
                request.getExperienceYears()
        );

        nurse.setPhone(
                request.getPhone().trim()
        );

        nurse.setEmail(
                clean(request.getEmail())
        );

        nurse.setAddress(
                clean(request.getAddress())
        );

        nurse.setDateOfBirth(
                request.getDateOfBirth()
        );

        nurse.setGender(
                clean(request.getGender())
        );

        nurse.setShift(
                request.getShift().trim()
        );

        nurse.setDepartment(
                request.getDepartment().trim()
        );

        nurse.setEmploymentType(
                request.getEmploymentType().trim()
        );

        nurse.setJoiningDate(
                request.getJoiningDate()
        );

        nurse.setReportingManager(
                clean(request.getReportingManager())
        );

        nurse.setStatus(
                request.getStatus().trim().toUpperCase()
        );

        nurse.setEmergencyContactName(
                clean(request.getEmergencyContactName())
        );

        nurse.setEmergencyContactPhone(
                clean(request.getEmergencyContactPhone())
        );

        nurse.setEmergencyContactRelation(
                clean(request.getEmergencyContactRelation())
        );
    }


    // =====================================================
    // MAP ENTITY -> RESPONSE
    // =====================================================

    private NurseResponse mapToResponse(
            Nurse nurse) {

        NurseResponse response =
                new NurseResponse();

        response.setId(
                nurse.getId()
        );

        response.setEmployeeCode(
                nurse.getEmployeeCode()
        );

        response.setFullName(
                nurse.getFullName()
        );

        response.setDegree(
                nurse.getDegree()
        );

        response.setSpecialization(
                nurse.getSpecialization()
        );

        response.setLicenseNumber(
                nurse.getLicenseNumber()
        );

        response.setExperienceYears(
                nurse.getExperienceYears()
        );

        response.setPhone(
                nurse.getPhone()
        );

        response.setEmail(
                nurse.getEmail()
        );

        response.setAddress(
                nurse.getAddress()
        );

        response.setDateOfBirth(
                nurse.getDateOfBirth()
        );

        response.setGender(
                nurse.getGender()
        );

        response.setShift(
                nurse.getShift()
        );

        response.setDepartment(
                nurse.getDepartment()
        );

        response.setEmploymentType(
                nurse.getEmploymentType()
        );

        response.setJoiningDate(
                nurse.getJoiningDate()
        );

        response.setReportingManager(
                nurse.getReportingManager()
        );

        response.setStatus(
                nurse.getStatus()
        );

        response.setEmergencyContactName(
                nurse.getEmergencyContactName()
        );

        response.setEmergencyContactPhone(
                nurse.getEmergencyContactPhone()
        );

        response.setEmergencyContactRelation(
                nurse.getEmergencyContactRelation()
        );

        return response;
    }


    // =====================================================
    // CLEAN OPTIONAL STRING
    // =====================================================

    private String clean(String value) {

        if (value == null) {
            return null;
        }

        String trimmed = value.trim();

        return trimmed.isEmpty()
                ? null
                : trimmed;
    }
}