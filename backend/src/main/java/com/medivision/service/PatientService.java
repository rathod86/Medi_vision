package com.medivision.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.medivision.dto.PatientRequest;
import com.medivision.dto.PatientResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Patient;
import com.medivision.repository.PatientRepository;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;

    // =====================================================
    // Add Patient
    // =====================================================

    public PatientResponse savePatient(PatientRequest request) {

        // Duplicate Email Check

        if (patientRepository.existsByEmail(request.getEmail())) {

            throw new RuntimeException("Email already exists.");

        }

        // Duplicate Phone Check

        if (patientRepository.existsByPhone(request.getPhone())) {

            throw new RuntimeException("Phone number already exists.");

        }

        // DTO -> Entity

        Patient patient = modelMapper.map(request, Patient.class);

        // Generate Patient Code

        patient.setPatientCode(generatePatientCode());

        // Default Status

        if (request.getStatus() == null || request.getStatus().isBlank()) {

            patient.setStatus("Active");

        } else {

            patient.setStatus(request.getStatus());

        }

        Patient savedPatient = patientRepository.save(patient);

        return modelMapper.map(savedPatient, PatientResponse.class);

    }

    // =====================================================
    // Get All Patients
    // =====================================================

    public List<PatientResponse> getAllPatients() {

        return patientRepository.findAll()

                .stream()

                .map(patient ->
                        modelMapper.map(
                                patient,
                                PatientResponse.class))

                .collect(Collectors.toList());

    }

    // =====================================================
    // Get Patient By ID
    // =====================================================

    public PatientResponse getPatientById(Long id) {

        Patient patient = patientRepository.findById(id)

                .orElseThrow(() ->

                        new ResourceNotFoundException(

                                "Patient not found with ID : " + id));

        return modelMapper.map(

                patient,

                PatientResponse.class);

    }

    // =====================================================
    // Update Patient
    // =====================================================

    public PatientResponse updatePatient(

            Long id,

            PatientRequest request) {

        Patient patient = patientRepository.findById(id)

                .orElseThrow(() ->

                        new ResourceNotFoundException(

                                "Patient not found with ID : " + id));

        // Duplicate Email Check

        Optional<Patient> existingEmail =

                patientRepository.findByEmail(

                        request.getEmail());

        if (existingEmail.isPresent()

                && !existingEmail.get()

                .getId()

                .equals(id)) {

            throw new RuntimeException(

                    "Email already exists.");

        }

        // Duplicate Phone Check

        Optional<Patient> existingPhone =

                patientRepository.findByPhone(

                        request.getPhone());

        if (existingPhone.isPresent()

                && !existingPhone.get()

                .getId()

                .equals(id)) {

            throw new RuntimeException(

                    "Phone number already exists.");

        }

        // Update Basic Details

        patient.setFullName(request.getFullName());

        patient.setEmail(request.getEmail());

        patient.setPhone(request.getPhone());

        patient.setGender(request.getGender());

        patient.setDateOfBirth(request.getDateOfBirth());

        patient.setAge(request.getAge());

        patient.setBloodGroup(request.getBloodGroup());

        patient.setMaritalStatus(request.getMaritalStatus());

        patient.setOccupation(request.getOccupation());

        patient.setHeight(request.getHeight());

        patient.setWeight(request.getWeight());

        patient.setAssignedDoctor(request.getAssignedDoctor());

        patient.setAllergies(request.getAllergies());

        patient.setMedicalHistory(request.getMedicalHistory());

        patient.setEmergencyContactName(
                request.getEmergencyContactName());

        patient.setEmergencyContactPhone(
                request.getEmergencyContactPhone());

        patient.setAddress(request.getAddress());

        patient.setCity(request.getCity());

        patient.setState(request.getState());

        patient.setPincode(request.getPincode());

        patient.setAdmissionDate(
                request.getAdmissionDate());

        patient.setDischargeDate(
                request.getDischargeDate());

        patient.setConsultationFee(
                request.getConsultationFee());

        patient.setProfileImage(
                request.getProfileImage());

        if (request.getStatus() == null
                || request.getStatus().isBlank()) {

            patient.setStatus("Active");

        } else {

            patient.setStatus(request.getStatus());

        }
        Patient updatedPatient = patientRepository.save(patient);

        return modelMapper.map(
                updatedPatient,
                PatientResponse.class);
    }

    // =====================================================
    // Delete Patient
    // =====================================================

    public void deletePatient(Long id) {

        Patient patient = patientRepository.findById(id)

                .orElseThrow(() ->

                        new ResourceNotFoundException(

                                "Patient not found with ID : " + id));

        try {

            patientRepository.delete(patient);

        } catch (DataIntegrityViolationException e) {

            throw new RuntimeException(

                    "Cannot delete patient because it is referenced by other records.");

        }

    }

    // =====================================================
    // Generate Patient Code
    // =====================================================

    private String generatePatientCode() {

        Long maxId = patientRepository.findMaxPatientId();

        long nextId = (maxId == null) ? 1 : maxId + 1;

        return String.format("PAT%03d", nextId);

    }

}
        