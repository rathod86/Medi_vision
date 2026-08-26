package com.medivision.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.medivision.dto.AdmissionRequest;
import com.medivision.dto.AdmissionResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Admission;
import com.medivision.model.Doctor;
import com.medivision.model.Patient;
import com.medivision.repository.AdmissionRepository;
import com.medivision.repository.DoctorRepository;
import com.medivision.repository.PatientRepository;

@Service
public class AdmissionService {

    @Autowired
    private AdmissionRepository admissionRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ModelMapper modelMapper;

    // =====================================================
    // Add Admission
    // =====================================================

    public AdmissionResponse saveAdmission(AdmissionRequest request) {

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with ID : "
                                        + request.getPatientId()));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with ID : "
                                        + request.getDoctorId()));

        Admission admission = new Admission();

        admission.setAdmissionNumber(generateAdmissionNumber());

        admission.setPatient(patient);

        admission.setDoctor(doctor);

        admission.setAdmissionDate(request.getAdmissionDate());

        admission.setAdmissionTime(request.getAdmissionTime());

        admission.setAdmissionType(request.getAdmissionType());

        admission.setDepartment(request.getDepartment());

        admission.setWard(request.getWard());

        admission.setRoomNumber(request.getRoomNumber());

        admission.setBedNumber(request.getBedNumber());

        admission.setDiagnosis(request.getDiagnosis());

        admission.setSymptoms(request.getSymptoms());

        admission.setReasonForAdmission(
                request.getReasonForAdmission());

        admission.setInsuranceProvider(
                request.getInsuranceProvider());

        admission.setPolicyNumber(
                request.getPolicyNumber());

        admission.setEstimatedCost(
                request.getEstimatedCost());

        admission.setInitialDeposit(
                request.getInitialDeposit());

        admission.setExpectedStayDays(
                request.getExpectedStayDays());

        if (request.getStatus() == null
                || request.getStatus().isBlank()) {

            admission.setStatus("Admitted");

        } else {

            admission.setStatus(request.getStatus());

        }

        admission.setNotes(request.getNotes());

        Admission savedAdmission =
                admissionRepository.save(admission);

        AdmissionResponse response =
                modelMapper.map(
                        savedAdmission,
                        AdmissionResponse.class);

        response.setPatientId(patient.getId());

        response.setPatientName(patient.getFullName());

        response.setDoctorId(doctor.getId());

        response.setDoctorName(doctor.getFullName());

        return response;

    }

    // =====================================================
    // Get All Admissions
    // =====================================================

    public List<AdmissionResponse> getAllAdmissions() {

        return admissionRepository.findAll()

                .stream()

                .map(admission -> {

                    AdmissionResponse response =
                            modelMapper.map(
                                    admission,
                                    AdmissionResponse.class);

                    response.setPatientId(
                            admission.getPatient().getId());

                    response.setPatientName(
                            admission.getPatient().getFullName());

                    response.setDoctorId(
                            admission.getDoctor().getId());

                    response.setDoctorName(
                            admission.getDoctor().getFullName());

                    return response;

                })

                .collect(Collectors.toList());

    }

    // =====================================================
    // Get Admission By ID
    // =====================================================

    public AdmissionResponse getAdmissionById(Long id) {

        Admission admission =
                admissionRepository.findById(id)

                        .orElseThrow(() ->

                                new ResourceNotFoundException(
                                        "Admission not found with ID : "
                                                + id));

        AdmissionResponse response =
                modelMapper.map(
                        admission,
                        AdmissionResponse.class);

        response.setPatientId(
                admission.getPatient().getId());

        response.setPatientName(
                admission.getPatient().getFullName());

        response.setDoctorId(
                admission.getDoctor().getId());

        response.setDoctorName(
                admission.getDoctor().getFullName());

        return response;

    }

    // =====================================================
    // Update Admission
    // =====================================================

    public AdmissionResponse updateAdmission(
            Long id,
            AdmissionRequest request) {

        Admission admission = admissionRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Admission not found with ID : " + id));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with ID : "
                                        + request.getPatientId()));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with ID : "
                                        + request.getDoctorId()));

        admission.setPatient(patient);

        admission.setDoctor(doctor);

        admission.setAdmissionDate(request.getAdmissionDate());

        admission.setAdmissionTime(request.getAdmissionTime());

        admission.setAdmissionType(request.getAdmissionType());

        admission.setDepartment(request.getDepartment());

        admission.setWard(request.getWard());

        admission.setRoomNumber(request.getRoomNumber());

        admission.setBedNumber(request.getBedNumber());

        admission.setDiagnosis(request.getDiagnosis());

        admission.setSymptoms(request.getSymptoms());

        admission.setReasonForAdmission(
                request.getReasonForAdmission());

        admission.setInsuranceProvider(
                request.getInsuranceProvider());

        admission.setPolicyNumber(
                request.getPolicyNumber());

        admission.setEstimatedCost(
                request.getEstimatedCost());

        admission.setInitialDeposit(
                request.getInitialDeposit());

        admission.setExpectedStayDays(
                request.getExpectedStayDays());

        admission.setStatus(request.getStatus());

        admission.setNotes(request.getNotes());

        Admission updatedAdmission =
                admissionRepository.save(admission);

        AdmissionResponse response =
                modelMapper.map(
                        updatedAdmission,
                        AdmissionResponse.class);

        response.setPatientId(patient.getId());

        response.setPatientName(patient.getFullName());

        response.setDoctorId(doctor.getId());

        response.setDoctorName(doctor.getFullName());

        return response;

    }

    // =====================================================
    // Delete Admission
    // =====================================================

    public void deleteAdmission(Long id) {

        Admission admission =
                admissionRepository.findById(id)

                        .orElseThrow(() ->

                                new ResourceNotFoundException(
                                        "Admission not found with ID : "
                                                + id));

        try {

            admissionRepository.delete(admission);

        } catch (DataIntegrityViolationException e) {

            throw new RuntimeException(
                    "Unable to delete admission because it is referenced by other records.");

        }

    }

    // =====================================================
    // Generate Admission Number
    // =====================================================

    private String generateAdmissionNumber() {

        long nextNumber = admissionRepository.count() + 1;

        return String.format("ADM%03d", nextNumber);

    }

}