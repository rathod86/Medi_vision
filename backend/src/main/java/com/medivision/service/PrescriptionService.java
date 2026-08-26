package com.medivision.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.medivision.dto.PrescriptionMedicineRequest;
import com.medivision.dto.PrescriptionMedicineResponse;
import com.medivision.dto.PrescriptionRequest;
import com.medivision.dto.PrescriptionResponse;
import com.medivision.dto.PrescriptionStatisticsResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Admission;
import com.medivision.model.Appointment;
import com.medivision.model.Doctor;
import com.medivision.model.Medicine;
import com.medivision.model.Patient;
import com.medivision.model.Prescription;
import com.medivision.model.PrescriptionMedicine;
import com.medivision.repository.AdmissionRepository;
import com.medivision.repository.AppointmentRepository;
import com.medivision.repository.DoctorRepository;
import com.medivision.repository.MedicineRepository;
import com.medivision.repository.PatientRepository;
import com.medivision.repository.PrescriptionMedicineRepository;
import com.medivision.repository.PrescriptionRepository;

@Service
public class PrescriptionService {

    // ==========================================
    // Repositories
    // ==========================================

    private final PrescriptionRepository prescriptionRepository;

    private final PrescriptionMedicineRepository prescriptionMedicineRepository;

    private final PatientRepository patientRepository;

    private final DoctorRepository doctorRepository;

    private final AppointmentRepository appointmentRepository;

    private final AdmissionRepository admissionRepository;

    private final MedicineRepository medicineRepository;

    // ==========================================
    // Constructor Injection
    // ==========================================

    public PrescriptionService(

            PrescriptionRepository prescriptionRepository,

            PrescriptionMedicineRepository prescriptionMedicineRepository,

            PatientRepository patientRepository,

            DoctorRepository doctorRepository,

            AppointmentRepository appointmentRepository,

            AdmissionRepository admissionRepository,

            MedicineRepository medicineRepository) {

        this.prescriptionRepository = prescriptionRepository;

        this.prescriptionMedicineRepository =
                prescriptionMedicineRepository;

        this.patientRepository = patientRepository;

        this.doctorRepository = doctorRepository;

        this.appointmentRepository = appointmentRepository;

        this.admissionRepository = admissionRepository;

        this.medicineRepository = medicineRepository;
    }

    // ==========================================
    // PART 2 STARTS FROM HERE
    // ==========================================
    // ==========================================
    // ENTITY → RESPONSE DTO
    // ==========================================

    private PrescriptionResponse mapToResponse(
            Prescription prescription) {

        PrescriptionResponse response =
                new PrescriptionResponse();

        // ==========================================
        // Basic Information
        // ==========================================

        response.setId(
                prescription.getId());

        response.setPrescriptionNumber(
                prescription.getPrescriptionNumber());

        // ==========================================
        // Patient
        // ==========================================

        response.setPatientId(
                prescription.getPatient().getId());

        response.setPatientCode(
                prescription.getPatient().getPatientCode());

        response.setPatientName(
                prescription.getPatient().getFullName());

        // ==========================================
        // Doctor
        // ==========================================

        response.setDoctorId(
                prescription.getDoctor().getId());

        response.setDoctorCode(
                prescription.getDoctor().getDoctorCode());

        response.setDoctorName(
                prescription.getDoctor().getFullName());

        response.setSpecialization(
                prescription.getDoctor().getSpecialization());

        // ==========================================
        // Appointment
        // ==========================================

        if (prescription.getAppointment() != null) {

            response.setAppointmentId(
                    prescription.getAppointment().getId());

        }

        // ==========================================
        // Admission
        // ==========================================

        if (prescription.getAdmission() != null) {

            response.setAdmissionId(
                    prescription.getAdmission().getId());

        }

        // ==========================================
        // Clinical Details
        // ==========================================

        response.setSymptoms(
                prescription.getSymptoms());

        response.setDiagnosis(
                prescription.getDiagnosis());

        response.setAllergies(
                prescription.getAllergies());

        response.setClinicalNotes(
                prescription.getClinicalNotes());

        response.setDoctorRemarks(
                prescription.getDoctorRemarks());

        // ==========================================
        // Dates
        // ==========================================

        response.setPrescriptionDate(
                prescription.getPrescriptionDate());

        response.setFollowUpDate(
                prescription.getFollowUpDate());

        // ==========================================
        // Status
        // ==========================================

        response.setStatus(
                prescription.getStatus());

        // ==========================================
        // Medicines
        // ==========================================

        List<PrescriptionMedicineResponse> medicineResponses =
                prescription.getMedicines()
                        .stream()
                        .map(this::mapMedicineResponse)
                        .collect(Collectors.toList());

        response.setMedicines(
                medicineResponses);

        // ==========================================
        // Audit
        // ==========================================

        response.setCreatedAt(
                prescription.getCreatedAt());

        response.setUpdatedAt(
                prescription.getUpdatedAt());

        return response;

    }

    // ==========================================
    // PART 3 STARTS FROM HERE
    // ==========================================
    
    // ==========================================
    // PRESCRIPTION MEDICINE → RESPONSE DTO
    // ==========================================

    private PrescriptionMedicineResponse mapMedicineResponse(
            PrescriptionMedicine medicine) {

        PrescriptionMedicineResponse response =
                new PrescriptionMedicineResponse();

        // ==========================================
        // Primary Key
        // ==========================================

        response.setId(
                medicine.getId());

        // ==========================================
        // Medicine Information
        // ==========================================

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

        // ==========================================
        // Prescription Details
        // ==========================================

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

        // ==========================================
        // Schedule
        // ==========================================

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

        // ==========================================
        // Food Instructions
        // ==========================================

        response.setFoodInstruction(
                medicine.getFoodInstruction());

        // ==========================================
        // Special Instructions
        // ==========================================

        response.setSpecialInstructions(
                medicine.getSpecialInstructions());

        // ==========================================
        // Reminder
        // ==========================================

        response.setReminderEnabled(
                medicine.getReminderEnabled());

        // ==========================================
        // Status
        // ==========================================

        response.setStatus(
                medicine.getStatus());

        // ==========================================
        // Audit
        // ==========================================

        response.setCreatedAt(
                medicine.getCreatedAt());

        response.setUpdatedAt(
                medicine.getUpdatedAt());

        return response;
    }

    // ==========================================
    // PART 4 STARTS FROM HERE
    // ==========================================
    
    // ==========================================
    // REQUEST DTO → ENTITY
    // ==========================================

    private Prescription mapToEntity(
            PrescriptionRequest request) {

        Prescription prescription = new Prescription();

        // ==========================================
        // Generate Prescription Number
        // ==========================================

        prescription.setPrescriptionNumber(
                generatePrescriptionNumber());

        // ==========================================
        // Patient
        // ==========================================

        Patient patient =
                patientRepository.findById(
                        request.getPatientId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Patient not found with ID : "
                                                + request.getPatientId()));

        prescription.setPatient(patient);

        // ==========================================
        // Doctor
        // ==========================================

        Doctor doctor =
                doctorRepository.findById(
                        request.getDoctorId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Doctor not found with ID : "
                                                + request.getDoctorId()));

        prescription.setDoctor(doctor);

        // ==========================================
        // Appointment (Optional)
        // ==========================================

        if (request.getAppointmentId() != null) {

            Appointment appointment =
                    appointmentRepository.findById(
                            request.getAppointmentId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Appointment not found with ID : "
                                                    + request.getAppointmentId()));

            prescription.setAppointment(appointment);
        }

        // ==========================================
        // Admission (Optional)
        // ==========================================

        if (request.getAdmissionId() != null) {

            Admission admission =
                    admissionRepository.findById(
                            request.getAdmissionId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Admission not found with ID : "
                                                    + request.getAdmissionId()));

            prescription.setAdmission(admission);
        }

        // ==========================================
        // Clinical Details
        // ==========================================

        prescription.setSymptoms(
                request.getSymptoms());

        prescription.setDiagnosis(
                request.getDiagnosis());

        prescription.setAllergies(
                request.getAllergies());

        prescription.setClinicalNotes(
                request.getClinicalNotes());

        prescription.setDoctorRemarks(
                request.getDoctorRemarks());

        // ==========================================
        // Dates
        // ==========================================

        prescription.setPrescriptionDate(
                request.getPrescriptionDate());

        prescription.setFollowUpDate(
                request.getFollowUpDate());

        // ==========================================
        // Status
        // ==========================================

        prescription.setStatus(
                request.getStatus());

        // ==========================================
        // Medicines
        // ==========================================

        List<PrescriptionMedicine> medicineList =
                new ArrayList<>();

        for (PrescriptionMedicineRequest medicineRequest
                : request.getMedicines()) {

            Medicine medicine =
                    medicineRepository.findById(
                            medicineRequest.getMedicineId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Medicine not found with ID : "
                                                    + medicineRequest.getMedicineId()));

            PrescriptionMedicine prescriptionMedicine =
                    new PrescriptionMedicine();

            prescriptionMedicine.setPrescription(
                    prescription);

            prescriptionMedicine.setMedicine(
                    medicine);

            prescriptionMedicine.setDosage(
                    medicineRequest.getDosage());

            prescriptionMedicine.setRoute(
                    medicineRequest.getRoute());

            prescriptionMedicine.setFrequency(
                    medicineRequest.getFrequency());

            prescriptionMedicine.setDuration(
                    medicineRequest.getDuration());

            prescriptionMedicine.setQuantity(
                    medicineRequest.getQuantity());

            prescriptionMedicine.setMorning(
                    medicineRequest.getMorning());

            prescriptionMedicine.setAfternoon(
                    medicineRequest.getAfternoon());

            prescriptionMedicine.setNight(
                    medicineRequest.getNight());

            prescriptionMedicine.setMorningTime(
                    medicineRequest.getMorningTime());

            prescriptionMedicine.setAfternoonTime(
                    medicineRequest.getAfternoonTime());

            prescriptionMedicine.setNightTime(
                    medicineRequest.getNightTime());

            prescriptionMedicine.setFoodInstruction(
                    medicineRequest.getFoodInstruction());

            prescriptionMedicine.setSpecialInstructions(
                    medicineRequest.getSpecialInstructions());

            prescriptionMedicine.setReminderEnabled(
                    medicineRequest.getReminderEnabled());

            prescriptionMedicine.setStatus("Prescribed");

            medicineList.add(prescriptionMedicine);
        }

        prescription.setMedicines(medicineList);

        return prescription;
    }

    // ==========================================
    // GENERATE PRESCRIPTION NUMBER
    // ==========================================

    private String generatePrescriptionNumber() {

        return "RX-" + System.currentTimeMillis();
    }

    // ==========================================
    // PART 5 STARTS FROM HERE
    // ==========================================
    
    // ==========================================
    // CREATE PRESCRIPTION
    // ==========================================

    public PrescriptionResponse addPrescription(
            PrescriptionRequest request) {

        // Convert Request DTO to Entity
        Prescription prescription = mapToEntity(request);

        // Save Prescription
        Prescription savedPrescription =
                prescriptionRepository.save(prescription);

        // Save Prescription Medicines
        if (savedPrescription.getMedicines() != null &&
                !savedPrescription.getMedicines().isEmpty()) {

            for (PrescriptionMedicine medicine :
                    savedPrescription.getMedicines()) {

                medicine.setPrescription(savedPrescription);

                prescriptionMedicineRepository.save(medicine);
            }
        }

        // Return Response DTO
        return mapToResponse(savedPrescription);
    }

    // ==========================================
    // CREATE MULTIPLE PRESCRIPTIONS
    // ==========================================

    public List<PrescriptionResponse> addPrescriptions(
            List<PrescriptionRequest> requests) {

        List<PrescriptionResponse> responses =
                new ArrayList<>();

        for (PrescriptionRequest request : requests) {

            responses.add(addPrescription(request));

        }

        return responses;
    }

    // ==========================================
    // CHECK DUPLICATE PRESCRIPTION NUMBER
    // ==========================================

    public boolean existsPrescriptionNumber(
            String prescriptionNumber) {

        return prescriptionRepository
                .existsByPrescriptionNumber(
                        prescriptionNumber);

    }

    // ==========================================
    // PART 6 STARTS FROM HERE
    // ==========================================
    
    // ==========================================
    // UPDATE PRESCRIPTION
    // ==========================================

    public PrescriptionResponse updatePrescription(
            Long id,
            PrescriptionRequest request) {

        Prescription prescription =
                prescriptionRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Prescription not found with ID : "
                                                + id));

        // ==========================================
        // Patient
        // ==========================================

        Patient patient =
                patientRepository.findById(request.getPatientId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Patient not found with ID : "
                                                + request.getPatientId()));

        prescription.setPatient(patient);

        // ==========================================
        // Doctor
        // ==========================================

        Doctor doctor =
                doctorRepository.findById(request.getDoctorId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Doctor not found with ID : "
                                                + request.getDoctorId()));

        prescription.setDoctor(doctor);

        // ==========================================
        // Appointment
        // ==========================================

        if (request.getAppointmentId() != null) {

            Appointment appointment =
                    appointmentRepository.findById(
                            request.getAppointmentId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Appointment not found with ID : "
                                                    + request.getAppointmentId()));

            prescription.setAppointment(appointment);

        } else {

            prescription.setAppointment(null);

        }

        // ==========================================
        // Admission
        // ==========================================

        if (request.getAdmissionId() != null) {

            Admission admission =
                    admissionRepository.findById(
                            request.getAdmissionId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Admission not found with ID : "
                                                    + request.getAdmissionId()));

            prescription.setAdmission(admission);

        } else {

            prescription.setAdmission(null);

        }

        // ==========================================
        // Clinical Details
        // ==========================================

        prescription.setSymptoms(request.getSymptoms());

        prescription.setDiagnosis(request.getDiagnosis());

        prescription.setAllergies(request.getAllergies());

        prescription.setClinicalNotes(request.getClinicalNotes());

        prescription.setDoctorRemarks(request.getDoctorRemarks());

        prescription.setPrescriptionDate(
                request.getPrescriptionDate());

        prescription.setFollowUpDate(
                request.getFollowUpDate());

        prescription.setStatus(
                request.getStatus());

        // ==========================================
        // Remove Existing Medicines
        // ==========================================

        prescriptionMedicineRepository
                .deleteByPrescriptionId(id);

        prescription.getMedicines().clear();

        // ==========================================
        // Add Updated Medicines
        // ==========================================

        List<PrescriptionMedicine> medicineList =
                new ArrayList<>();

        for (PrescriptionMedicineRequest medicineRequest
                : request.getMedicines()) {

            Medicine medicine =
                    medicineRepository.findById(
                            medicineRequest.getMedicineId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Medicine not found with ID : "
                                                    + medicineRequest.getMedicineId()));

            PrescriptionMedicine prescriptionMedicine =
                    new PrescriptionMedicine();

            prescriptionMedicine.setPrescription(
                    prescription);

            prescriptionMedicine.setMedicine(
                    medicine);

            prescriptionMedicine.setDosage(
                    medicineRequest.getDosage());

            prescriptionMedicine.setRoute(
                    medicineRequest.getRoute());

            prescriptionMedicine.setFrequency(
                    medicineRequest.getFrequency());

            prescriptionMedicine.setDuration(
                    medicineRequest.getDuration());

            prescriptionMedicine.setQuantity(
                    medicineRequest.getQuantity());

            prescriptionMedicine.setMorning(
                    medicineRequest.getMorning());

            prescriptionMedicine.setAfternoon(
                    medicineRequest.getAfternoon());

            prescriptionMedicine.setNight(
                    medicineRequest.getNight());

            prescriptionMedicine.setMorningTime(
                    medicineRequest.getMorningTime());

            prescriptionMedicine.setAfternoonTime(
                    medicineRequest.getAfternoonTime());

            prescriptionMedicine.setNightTime(
                    medicineRequest.getNightTime());

            prescriptionMedicine.setFoodInstruction(
                    medicineRequest.getFoodInstruction());

            prescriptionMedicine.setSpecialInstructions(
                    medicineRequest.getSpecialInstructions());

            prescriptionMedicine.setReminderEnabled(
                    medicineRequest.getReminderEnabled());

            prescriptionMedicine.setStatus("Prescribed");

            medicineList.add(prescriptionMedicine);
        }

        prescription.setMedicines(medicineList);

        Prescription updatedPrescription =
                prescriptionRepository.save(prescription);

        return mapToResponse(updatedPrescription);
    }

    // ==========================================
    // PART 7 STARTS FROM HERE
    // ==========================================
    
    // ==========================================
    // GET ALL PRESCRIPTIONS
    // ==========================================

    public List<PrescriptionResponse> getAllPrescriptions() {

        return prescriptionRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET PRESCRIPTION BY ID
    // ==========================================

    public PrescriptionResponse getPrescriptionById(Long id) {

        Prescription prescription =
                prescriptionRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Prescription not found with ID : " + id));

        return mapToResponse(prescription);
    }

    // ==========================================
    // GET PRESCRIPTION BY NUMBER
    // ==========================================

    public PrescriptionResponse getPrescriptionByNumber(
            String prescriptionNumber) {

        Prescription prescription =
                prescriptionRepository
                        .findByPrescriptionNumber(prescriptionNumber)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Prescription not found : "
                                                + prescriptionNumber));

        return mapToResponse(prescription);
    }

    // ==========================================
    // GET PRESCRIPTIONS BY PATIENT
    // ==========================================

    public List<PrescriptionResponse> getPrescriptionsByPatient(
            Long patientId) {

        return prescriptionRepository
                .findByPatientId(patientId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // SEARCH PATIENT NAME
    // ==========================================

    public List<PrescriptionResponse> searchPatient(
            String patientName) {

        return prescriptionRepository
                .findByPatientFullNameContainingIgnoreCase(patientName)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET PRESCRIPTIONS BY DOCTOR
    // ==========================================

    public List<PrescriptionResponse> getPrescriptionsByDoctor(
            Long doctorId) {

        return prescriptionRepository
                .findByDoctorId(doctorId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // SEARCH DOCTOR NAME
    // ==========================================

    public List<PrescriptionResponse> searchDoctor(
            String doctorName) {

        return prescriptionRepository
                .findByDoctorFullNameContainingIgnoreCase(doctorName)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET BY STATUS
    // ==========================================

    public List<PrescriptionResponse> getByStatus(
            String status) {

        return prescriptionRepository
                .findByStatus(status)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET BY DIAGNOSIS
    // ==========================================

    public List<PrescriptionResponse> searchDiagnosis(
            String diagnosis) {

        return prescriptionRepository
                .findByDiagnosisContainingIgnoreCase(diagnosis)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET BY SYMPTOMS
    // ==========================================

    public List<PrescriptionResponse> searchSymptoms(
            String symptoms) {

        return prescriptionRepository
                .findBySymptomsContainingIgnoreCase(symptoms)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET BY DATE
    // ==========================================

    public List<PrescriptionResponse> getByPrescriptionDate(
            LocalDate date) {

        return prescriptionRepository
                .findByPrescriptionDate(date)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET BETWEEN DATES
    // ==========================================

    public List<PrescriptionResponse> getBetweenDates(
            LocalDate startDate,
            LocalDate endDate) {

        return prescriptionRepository
                .findByPrescriptionDateBetween(
                        startDate,
                        endDate)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET FOLLOW-UP DATE
    // ==========================================

    public List<PrescriptionResponse> getFollowUpDate(
            LocalDate followUpDate) {

        return prescriptionRepository
                .findByFollowUpDate(followUpDate)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET FOLLOW-UP BETWEEN DATES
    // ==========================================

    public List<PrescriptionResponse> getFollowUpBetweenDates(
            LocalDate startDate,
            LocalDate endDate) {

        return prescriptionRepository
                .findByFollowUpDateBetween(
                        startDate,
                        endDate)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // GET LATEST 10 PRESCRIPTIONS
    // ==========================================

    public List<PrescriptionResponse> getLatestPrescriptions() {

        return prescriptionRepository
                .findTop10ByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // ==========================================
    // PART 8 STARTS FROM HERE
    // ==========================================
    
    // ==========================================
    // DELETE PRESCRIPTION
    // ==========================================

    public void deletePrescription(Long id) {

        Prescription prescription =
                prescriptionRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Prescription not found with ID : "
                                                + id));

        // Delete child medicines first
        prescriptionMedicineRepository.deleteByPrescriptionId(id);

        // Delete prescription
        prescriptionRepository.delete(prescription);
    }

    // ==========================================
    // DELETE MULTIPLE PRESCRIPTIONS
    // ==========================================

    public void deletePrescriptions(List<Long> ids) {

        for (Long id : ids) {

            deletePrescription(id);

        }
    }

    // ==========================================
    // TOTAL PRESCRIPTIONS
    // ==========================================

    public long getTotalPrescriptions() {

        return prescriptionRepository.count();

    }

    // ==========================================
    // TOTAL TODAY'S PRESCRIPTIONS
    // ==========================================

    public long getTodayPrescriptions() {

        return prescriptionRepository.countByPrescriptionDate(
                LocalDate.now());

    }

    // ==========================================
    // TOTAL PATIENT PRESCRIPTIONS
    // ==========================================

    public long getPatientPrescriptionCount(
            Long patientId) {

        return prescriptionRepository.countByPatientId(
                patientId);

    }

    // ==========================================
    // TOTAL DOCTOR PRESCRIPTIONS
    // ==========================================

    public long getDoctorPrescriptionCount(
            Long doctorId) {

        return prescriptionRepository.countByDoctorId(
                doctorId);

    }

    // ==========================================
    // STATUS COUNTS
    // ==========================================

    public long getDraftCount() {

        return prescriptionRepository.countByStatus("Draft");

    }

    public long getIssuedCount() {

        return prescriptionRepository.countByStatus("Issued");

    }

    public long getDispensedCount() {

        return prescriptionRepository.countByStatus("Dispensed");

    }

    public long getCompletedCount() {

        return prescriptionRepository.countByStatus("Completed");

    }

    public long getCancelledCount() {

        return prescriptionRepository.countByStatus("Cancelled");

    }

    // ==========================================
    // DASHBOARD STATISTICS
    // ==========================================

    public PrescriptionStatisticsResponse getStatistics() {

        PrescriptionStatisticsResponse statistics =
                new PrescriptionStatisticsResponse();

        statistics.setTotalPrescriptions(
                prescriptionRepository.count());

        statistics.setTodayPrescriptions(
                prescriptionRepository.countByPrescriptionDate(
                        LocalDate.now()));

        statistics.setDraftPrescriptions(
                prescriptionRepository.countByStatus("Draft"));

        statistics.setIssuedPrescriptions(
                prescriptionRepository.countByStatus("Issued"));

        statistics.setDispensedPrescriptions(
                prescriptionRepository.countByStatus("Dispensed"));

        statistics.setCompletedPrescriptions(
                prescriptionRepository.countByStatus("Completed"));

        statistics.setCancelledPrescriptions(
                prescriptionRepository.countByStatus("Cancelled"));

        return statistics;
    }

}
    
    