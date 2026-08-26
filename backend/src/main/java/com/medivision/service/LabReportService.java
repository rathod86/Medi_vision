package com.medivision.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medivision.dto.LabReportRequest;
import com.medivision.dto.LabReportResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Doctor;
import com.medivision.model.LabReport;
import com.medivision.model.Patient;
import com.medivision.model.Prescription;
import com.medivision.repository.DoctorRepository;
import com.medivision.repository.LabReportRepository;
import com.medivision.repository.PatientRepository;
import com.medivision.repository.PrescriptionRepository;

@Service
public class LabReportService {

    @Autowired
    private LabReportRepository labReportRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    // =====================================================
    // Save Lab Report
    // =====================================================

    public LabReportResponse saveLabReport(
            LabReportRequest request) {

        Patient patient =
                patientRepository.findById(
                        request.getPatientId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Patient not found"));

        Doctor doctor =
                doctorRepository.findById(
                        request.getDoctorId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Doctor not found"));

        Prescription prescription = null;

        if (request.getPrescriptionId() != null) {

            prescription =
                    prescriptionRepository.findById(
                            request.getPrescriptionId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Prescription not found"));
        }

        LabReport report = new LabReport();

        report.setReportCode(generateReportCode());

        report.setPatient(patient);

        report.setDoctor(doctor);

        report.setPrescription(prescription);

        report.setTestName(request.getTestName());

        report.setTestCategory(request.getTestCategory());

        report.setSampleType(request.getSampleType());

        report.setTestDate(request.getTestDate());

        report.setReportDate(request.getReportDate());

        report.setResult(request.getResult());

        report.setNormalRange(request.getNormalRange());

        report.setRemarks(request.getRemarks());

        report.setLabTechnicianName(
                request.getLabTechnicianName());

        report.setLabTechnicianDegree(
                request.getLabTechnicianDegree());

        report.setLabName(
                request.getLabName());

        report.setReportFilePath(
                request.getReportFilePath());

        if (request.getStatus() == null ||
                request.getStatus().isBlank()) {

            report.setStatus("Pending");

        } else {

            report.setStatus(request.getStatus());

        }

        LabReport saved =
                labReportRepository.save(report);

        return convertToResponse(saved);
    }

    // =====================================================
    // Get All Reports
    // =====================================================

    public List<LabReportResponse> getAllLabReports() {

        return labReportRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

    }
    
    // =====================================================
    // Get Report By Id
    // =====================================================

    public LabReportResponse getLabReportById(
            Long id) {

        LabReport report =
                labReportRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Lab Report not found with ID : " + id));

        return convertToResponse(report);
    }

    // =====================================================
    // Update Report
    // =====================================================

    public LabReportResponse updateLabReport(
            Long id,
            LabReportRequest request) {

        LabReport report =
                labReportRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Lab Report not found with ID : " + id));

        Patient patient =
                patientRepository.findById(
                        request.getPatientId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Patient not found"));

        Doctor doctor =
                doctorRepository.findById(
                        request.getDoctorId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Doctor not found"));

        Prescription prescription = null;

        if (request.getPrescriptionId() != null) {

            prescription =
                    prescriptionRepository.findById(
                            request.getPrescriptionId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Prescription not found"));
        }

        report.setPatient(patient);

        report.setDoctor(doctor);

        report.setPrescription(prescription);

        report.setTestName(request.getTestName());

        report.setTestCategory(request.getTestCategory());

        report.setSampleType(request.getSampleType());

        report.setTestDate(request.getTestDate());

        report.setReportDate(request.getReportDate());

        report.setResult(request.getResult());

        report.setNormalRange(request.getNormalRange());

        report.setRemarks(request.getRemarks());

        report.setLabTechnicianName(
                request.getLabTechnicianName());

        report.setLabTechnicianDegree(
                request.getLabTechnicianDegree());

        report.setLabName(
                request.getLabName());

        report.setReportFilePath(
                request.getReportFilePath());

        report.setStatus(
                request.getStatus());

        LabReport updated =
                labReportRepository.save(report);

        return convertToResponse(updated);

    }

    // =====================================================
    // Delete Report
    // =====================================================

    public void deleteLabReport(Long id) {

        LabReport report =
                labReportRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Lab Report not found with ID : " + id));

        labReportRepository.delete(report);

    }

    // =====================================================
    // Search By Patient
    // =====================================================

    public List<LabReportResponse> getReportsByPatient(
            Long patientId) {

        return labReportRepository
                .findByPatientId(patientId)
                .stream()
                .map(this::convertToResponse)
                .toList();

    }

    // =====================================================
    // Search By Doctor
    // =====================================================

    public List<LabReportResponse> getReportsByDoctor(
            Long doctorId) {

        return labReportRepository
                .findByDoctorId(doctorId)
                .stream()
                .map(this::convertToResponse)
                .toList();

    }

    // =====================================================
    // Search By Test Name
    // =====================================================

    public List<LabReportResponse> searchTestName(
            String testName) {

        return labReportRepository
                .findByTestNameContainingIgnoreCase(testName)
                .stream()
                .map(this::convertToResponse)
                .toList();

    }

    // =====================================================
    // Search By Status
    // =====================================================

    public List<LabReportResponse> getReportsByStatus(
            String status) {

        return labReportRepository
                .findByStatusIgnoreCase(status)
                .stream()
                .map(this::convertToResponse)
                .toList();

    }
    
    // =====================================================
    // Total Reports
    // =====================================================

    public long getTotalReports() {

        return labReportRepository.count();

    }

    // =====================================================
    // Today's Reports
    // =====================================================

    public long getTodayReports() {

        return labReportRepository.countByTestDate(
                LocalDate.now());

    }

    // =====================================================
    // Patient Report Count
    // =====================================================

    public long getPatientReportCount(
            Long patientId) {

        return labReportRepository
                .countByPatientId(patientId);

    }

    // =====================================================
    // Doctor Report Count
    // =====================================================

    public long getDoctorReportCount(
            Long doctorId) {

        return labReportRepository
                .countByDoctorId(doctorId);

    }

    // =====================================================
    // Latest Reports
    // =====================================================

    public List<LabReportResponse> getLatestReports() {

        return labReportRepository
                .findTop10ByOrderByTestDateDesc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

    }

    // =====================================================
    // Convert Entity To DTO
    // =====================================================

    private LabReportResponse convertToResponse(
            LabReport report) {

        LabReportResponse response =
                new LabReportResponse();

        response.setId(report.getId());

        response.setReportCode(
                report.getReportCode());

        // ==========================
        // Patient
        // ==========================

        if (report.getPatient() != null) {

            response.setPatientId(
                    report.getPatient().getId());

            response.setPatientCode(
                    report.getPatient().getPatientCode());

            response.setPatientName(
                    report.getPatient().getFullName());

        }

        // ==========================
        // Doctor
        // ==========================

        if (report.getDoctor() != null) {

            response.setDoctorId(
                    report.getDoctor().getId());

            response.setDoctorCode(
                    report.getDoctor().getDoctorCode());

            response.setDoctorName(
                    report.getDoctor().getFullName());

        }

        // ==========================
        // Prescription
        // ==========================

        if (report.getPrescription() != null) {

            response.setPrescriptionId(
                    report.getPrescription().getId());

            response.setPrescriptionNumber(
                    report.getPrescription()
                            .getPrescriptionNumber());

        }

        // ==========================
        // Test Details
        // ==========================

        response.setTestName(
                report.getTestName());

        response.setTestCategory(
                report.getTestCategory());

        response.setSampleType(
                report.getSampleType());

        response.setTestDate(
                report.getTestDate());

        response.setReportDate(
                report.getReportDate());

        // ==========================
        // Result
        // ==========================

        response.setResult(
                report.getResult());

        response.setNormalRange(
                report.getNormalRange());

        response.setRemarks(
                report.getRemarks());

        // ==========================
        // Laboratory
        // ==========================

        response.setLabTechnicianName(
                report.getLabTechnicianName());

        response.setLabTechnicianDegree(
                report.getLabTechnicianDegree());

        response.setLabName(
                report.getLabName());

        // ==========================
        // File
        // ==========================

        response.setReportFilePath(
                report.getReportFilePath());

        // ==========================
        // Status
        // ==========================

        response.setStatus(
                report.getStatus());

        return response;

    }

    // =====================================================
    // Generate Report Code
    // =====================================================

    private String generateReportCode() {

        Long maxId =
                labReportRepository.findMaxLabReportId();

        long nextId =
                (maxId == null)
                        ? 1
                        : maxId + 1;

        return String.format(
                "LAB%03d",
                nextId);

    }

}