package com.medivision.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.medivision.dto.ICURecordRequest;
import com.medivision.dto.ICURecordResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Admission;
import com.medivision.model.Doctor;
import com.medivision.model.ICURecord;
import com.medivision.model.Nurse;
import com.medivision.model.Patient;
import com.medivision.model.Prescription;
import com.medivision.repository.AdmissionRepository;
import com.medivision.repository.DoctorRepository;
import com.medivision.repository.ICURecordRepository;
import com.medivision.repository.NurseRepository;
import com.medivision.repository.PatientRepository;
import com.medivision.repository.PrescriptionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ICURecordService {

    @Autowired
    private ICURecordRepository icuRecordRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private NurseRepository nurseRepository;

    @Autowired
    private AdmissionRepository admissionRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    // =====================================================
    // ADD ICU RECORD
    // =====================================================

    public ICURecordResponse saveICURecord(ICURecordRequest request) {

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Patient not found with ID : " + request.getPatientId()));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Doctor not found with ID : " + request.getDoctorId()));

        ICURecord record = new ICURecord();

        record.setPatient(patient);
        record.setDoctor(doctor);
        record.setIcuRecordNumber(generateICURecordNumber());

        setRequestValues(record, request);

        if (request.getNurseId() != null) {
            Nurse nurse = nurseRepository.findById(request.getNurseId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Nurse not found with ID : " + request.getNurseId()));
            record.setNurse(nurse);
        }

        if (request.getAdmissionId() != null) {
            Admission admission = admissionRepository.findById(request.getAdmissionId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Admission not found with ID : " + request.getAdmissionId()));
            record.setAdmission(admission);
        }

        if (request.getPrescriptionId() != null) {
            Prescription prescription = prescriptionRepository.findById(request.getPrescriptionId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Prescription not found with ID : " + request.getPrescriptionId()));
            record.setPrescription(prescription);
        }

        return convertToResponse(icuRecordRepository.save(record));
    }

    // =====================================================
    // GET ALL ICU RECORDS
    // =====================================================

    public List<ICURecordResponse> getAllICURecords() {
        return icuRecordRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // GET ICU RECORD BY ID
    // =====================================================

    public ICURecordResponse getICURecordById(Long id) {
        ICURecord record = icuRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "ICU Record not found with ID : " + id));

        return convertToResponse(record);
    }

    // =====================================================
    // UPDATE ICU RECORD
    // =====================================================

    public ICURecordResponse updateICURecord(Long id, ICURecordRequest request) {

        ICURecord record = icuRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "ICU Record not found with ID : " + id));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Patient not found with ID : " + request.getPatientId()));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Doctor not found with ID : " + request.getDoctorId()));

        record.setPatient(patient);
        record.setDoctor(doctor);
        setRequestValues(record, request);

        if (request.getNurseId() != null) {
            Nurse nurse = nurseRepository.findById(request.getNurseId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Nurse not found with ID : " + request.getNurseId()));
            record.setNurse(nurse);
        } else {
            record.setNurse(null);
        }

        if (request.getAdmissionId() != null) {
            Admission admission = admissionRepository.findById(request.getAdmissionId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Admission not found with ID : " + request.getAdmissionId()));
            record.setAdmission(admission);
        } else {
            record.setAdmission(null);
        }

        if (request.getPrescriptionId() != null) {
            Prescription prescription = prescriptionRepository.findById(request.getPrescriptionId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Prescription not found with ID : " + request.getPrescriptionId()));
            record.setPrescription(prescription);
        } else {
            record.setPrescription(null);
        }

        return convertToResponse(icuRecordRepository.save(record));
    }

    // =====================================================
    // DELETE ICU RECORD
    // =====================================================

    public void deleteICURecord(Long id) {

        ICURecord record = icuRecordRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "ICU Record not found with ID : " + id));

        try {
            icuRecordRepository.delete(record);
        } catch (DataIntegrityViolationException e) {
            throw new RuntimeException(
                    "Unable to delete ICU Record because it is referenced by another record.");
        }
    }

    // =====================================================
    // GET RECORDS BY PATIENT
    // =====================================================

    public List<ICURecordResponse> getRecordsByPatient(Long patientId) {
        return icuRecordRepository.findByPatient_Id(patientId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // GET RECORDS BY DOCTOR
    // =====================================================

    public List<ICURecordResponse> getRecordsByDoctor(Long doctorId) {
        return icuRecordRepository.findByDoctor_Id(doctorId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // GET RECORDS BY STATUS
    // =====================================================

    public List<ICURecordResponse> getRecordsByStatus(String status) {
        return icuRecordRepository.findByStatusIgnoreCase(status)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // GET LATEST ICU RECORDS
    // =====================================================

    public List<ICURecordResponse> getLatestICURecords() {
        return icuRecordRepository.findTop10ByOrderByIdDesc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // DASHBOARD STATISTICS
    // =====================================================

    public Long getTotalICURecords() {
        return icuRecordRepository.getTotalICURecords();
    }

    public Long getTodayICUAdmissions() {
        return icuRecordRepository.countByIcuStartDate(LocalDate.now());
    }

    public Long getCriticalPatients() {
        return icuRecordRepository.countByCriticalLevelIgnoreCase("Critical");
    }

    public Long getVentilatorPatients() {
        return icuRecordRepository.countByVentilatorRequired(true);
    }

    public Long getIsolationPatients() {
        return icuRecordRepository.countByIsolationRequired(true);
    }

    // =====================================================
    // ICU RECORD NUMBER GENERATOR
    // =====================================================

    private String generateICURecordNumber() {
        Long maxId = icuRecordRepository.findMaxICURecordId();
        long nextId = (maxId == null) ? 1 : maxId + 1;
        return String.format("ICU%04d", nextId);
    }

    // =====================================================
    // COPY REQUEST VALUES TO ENTITY
    // =====================================================

    private void setRequestValues(ICURecord record, ICURecordRequest request) {

        record.setIcuStartDate(request.getIcuStartDate());
        record.setIcuEndDate(request.getIcuEndDate());
        record.setBedNumber(request.getBedNumber());
        record.setWardNumber(request.getWardNumber());
        record.setCriticalLevel(request.getCriticalLevel());
        record.setVentilatorRequired(request.getVentilatorRequired());
        record.setIsolationRequired(request.getIsolationRequired());

        record.setDiagnosis(request.getDiagnosis());
        record.setTreatmentPlan(request.getTreatmentPlan());
        record.setDoctorDegree(request.getDoctorDegree());

        record.setOxygenLevel(request.getOxygenLevel());
        record.setHeartRate(request.getHeartRate());
        record.setBloodPressure(request.getBloodPressure());
        record.setRespiratoryRate(request.getRespiratoryRate());
        record.setBodyTemperature(request.getBodyTemperature());

        record.setDailyNotes(request.getDailyNotes());
        record.setMedicationsGiven(request.getMedicationsGiven());
        record.setProceduresPerformed(request.getProceduresPerformed());

        record.setDischargeSummary(request.getDischargeSummary());
        record.setStatus(request.getStatus());
    }

    // =====================================================
    // CONVERT ENTITY -> RESPONSE DTO
    // ModelMapper intentionally removed.
    // This fixes the admissionNumber ambiguity that caused HTTP 500.
    // =====================================================

    private ICURecordResponse convertToResponse(ICURecord record) {

        ICURecordResponse response = new ICURecordResponse();

        // ICU details
        response.setId(record.getId());
        response.setIcuRecordNumber(record.getIcuRecordNumber());
        response.setIcuStartDate(record.getIcuStartDate());
        response.setIcuEndDate(record.getIcuEndDate());
        response.setBedNumber(record.getBedNumber());
        response.setWardNumber(record.getWardNumber());
        response.setCriticalLevel(record.getCriticalLevel());
        response.setVentilatorRequired(record.getVentilatorRequired());
        response.setIsolationRequired(record.getIsolationRequired());

        // Diagnosis
        response.setDiagnosis(record.getDiagnosis());
        response.setTreatmentPlan(record.getTreatmentPlan());

        // Vital signs
        response.setOxygenLevel(record.getOxygenLevel());
        response.setHeartRate(record.getHeartRate());
        response.setBloodPressure(record.getBloodPressure());
        response.setRespiratoryRate(record.getRespiratoryRate());
        response.setBodyTemperature(record.getBodyTemperature());

        // Doctor information
        response.setDoctorDegree(record.getDoctorDegree());

        // Monitoring
        response.setDailyNotes(record.getDailyNotes());
        response.setMedicationsGiven(record.getMedicationsGiven());
        response.setProceduresPerformed(record.getProceduresPerformed());

        // Discharge
        response.setDischargeSummary(record.getDischargeSummary());

        // Status
        response.setStatus(record.getStatus());

        // Patient
        if (record.getPatient() != null) {
            response.setPatientId(record.getPatient().getId());
            response.setPatientCode(record.getPatient().getPatientCode());
            response.setPatientName(record.getPatient().getFullName());
        }

        // Doctor
        if (record.getDoctor() != null) {
            response.setDoctorId(record.getDoctor().getId());
            response.setDoctorName(record.getDoctor().getFullName());
        }

        // Nurse
        if (record.getNurse() != null) {
            response.setNurseId(record.getNurse().getId());
            response.setNurseName(record.getNurse().getFullName());
        }

        // Admission
        if (record.getAdmission() != null) {
            response.setAdmissionId(record.getAdmission().getId());
            response.setAdmissionNumber(record.getAdmission().getAdmissionNumber());
        }

        // Prescription
        if (record.getPrescription() != null) {
            response.setPrescriptionId(record.getPrescription().getId());
            response.setPrescriptionNumber(record.getPrescription().getPrescriptionNumber());
        }

        return response;
    }
}