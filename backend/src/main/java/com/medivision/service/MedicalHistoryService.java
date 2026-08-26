package com.medivision.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medivision.dto.MedicalHistoryRequest;
import com.medivision.dto.MedicalHistoryResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Doctor;
import com.medivision.model.MedicalHistory;
import com.medivision.model.Patient;
import com.medivision.repository.DoctorRepository;
import com.medivision.repository.MedicalHistoryRepository;
import com.medivision.repository.PatientRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class MedicalHistoryService {

    // =====================================================
    // REPOSITORIES
    // =====================================================

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;


    // =====================================================
    // CREATE MEDICAL HISTORY
    // POST /api/medical-histories
    // =====================================================

    public MedicalHistoryResponse saveMedicalHistory(
            MedicalHistoryRequest request) {

        // -------------------------------------------------
        // Validate Patient
        // -------------------------------------------------

        Patient patient = patientRepository
                .findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with ID: "
                                        + request.getPatientId()
                        )
                );

        // -------------------------------------------------
        // Create Entity
        // -------------------------------------------------

        MedicalHistory medicalHistory =
                new MedicalHistory();

        // -------------------------------------------------
        // Generate History Number
        // -------------------------------------------------

        medicalHistory.setHistoryNumber(
                generateHistoryNumber()
        );

        // -------------------------------------------------
        // Set Patient
        // -------------------------------------------------

        medicalHistory.setPatient(patient);

        // -------------------------------------------------
        // Set Doctor
        // -------------------------------------------------

        if (request.getDoctorId() != null) {

            Doctor doctor = doctorRepository
                    .findById(request.getDoctorId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Doctor not found with ID: "
                                            + request.getDoctorId()
                            )
                    );

            medicalHistory.setDoctor(doctor);
        }

        // -------------------------------------------------
        // Copy Request Data
        // -------------------------------------------------

        setRequestData(
                medicalHistory,
                request
        );

        // -------------------------------------------------
        // Save
        // -------------------------------------------------

        MedicalHistory savedHistory =
                medicalHistoryRepository.save(
                        medicalHistory
                );

        return convertToResponse(
                savedHistory
        );
    }


    // =====================================================
    // GET ALL MEDICAL HISTORIES
    // =====================================================

    public List<MedicalHistoryResponse>
    getAllMedicalHistories() {

        return medicalHistoryRepository
                .findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET MEDICAL HISTORY BY ID
    // =====================================================

    public MedicalHistoryResponse
    getMedicalHistoryById(Long id) {

        MedicalHistory medicalHistory =
                getMedicalHistoryEntity(id);

        return convertToResponse(
                medicalHistory
        );
    }


    // =====================================================
    // UPDATE MEDICAL HISTORY
    // =====================================================

    public MedicalHistoryResponse updateMedicalHistory(
            Long id,
            MedicalHistoryRequest request) {

        // -------------------------------------------------
        // Find Existing Record
        // -------------------------------------------------

        MedicalHistory medicalHistory =
                getMedicalHistoryEntity(id);

        // -------------------------------------------------
        // Validate Patient
        // -------------------------------------------------

        Patient patient =
                patientRepository
                        .findById(request.getPatientId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Patient not found with ID: "
                                                + request.getPatientId()
                                )
                        );

        medicalHistory.setPatient(patient);

        // -------------------------------------------------
        // Update Doctor
        // -------------------------------------------------

        if (request.getDoctorId() != null) {

            Doctor doctor =
                    doctorRepository
                            .findById(request.getDoctorId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException(
                                            "Doctor not found with ID: "
                                                    + request.getDoctorId()
                                    )
                            );

            medicalHistory.setDoctor(doctor);

        } else {

            medicalHistory.setDoctor(null);
        }

        // -------------------------------------------------
        // Update Other Fields
        // -------------------------------------------------

        setRequestData(
                medicalHistory,
                request
        );

        // -------------------------------------------------
        // Save
        // -------------------------------------------------

        MedicalHistory updatedHistory =
                medicalHistoryRepository.save(
                        medicalHistory
                );

        return convertToResponse(
                updatedHistory
        );
    }


    // =====================================================
    // DELETE MEDICAL HISTORY
    // =====================================================

    public void deleteMedicalHistory(Long id) {

        MedicalHistory medicalHistory =
                getMedicalHistoryEntity(id);

        medicalHistoryRepository.delete(
                medicalHistory
        );
    }


    // =====================================================
    // GET BY PATIENT
    // =====================================================

    public List<MedicalHistoryResponse>
    getMedicalHistoriesByPatient(
            Long patientId) {

        validatePatient(patientId);

        return medicalHistoryRepository
                .findByPatient_Id(patientId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET BY DOCTOR
    // =====================================================

    public List<MedicalHistoryResponse>
    getMedicalHistoriesByDoctor(
            Long doctorId) {

        validateDoctor(doctorId);

        return medicalHistoryRepository
                .findByDoctor_Id(doctorId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET BY STATUS
    // =====================================================

    public List<MedicalHistoryResponse>
    getMedicalHistoriesByStatus(
            String status) {

        return medicalHistoryRepository
                .findByStatusIgnoreCase(status)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET BY PATIENT + STATUS
    // =====================================================

    public List<MedicalHistoryResponse>
    getMedicalHistoriesByPatientAndStatus(
            Long patientId,
            String status) {

        validatePatient(patientId);

        return medicalHistoryRepository
                .findByPatient_IdAndStatusIgnoreCase(
                        patientId,
                        status
                )
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET BY HISTORY DATE
    // =====================================================

    public List<MedicalHistoryResponse>
    getMedicalHistoriesByDate(
            LocalDate date) {

        return medicalHistoryRepository
                .findByHistoryDate(date)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET BETWEEN DATES
    // =====================================================

    public List<MedicalHistoryResponse>
    getMedicalHistoriesBetweenDates(
            LocalDate startDate,
            LocalDate endDate) {

        if (startDate == null || endDate == null) {

            throw new IllegalArgumentException(
                    "Start date and end date are required."
            );
        }

        if (startDate.isAfter(endDate)) {

            throw new IllegalArgumentException(
                    "Start date cannot be after end date."
            );
        }

        return medicalHistoryRepository
                .findByHistoryDateBetween(
                        startDate,
                        endDate
                )
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET LATEST 10
    // =====================================================

    public List<MedicalHistoryResponse>
    getLatestMedicalHistories() {

        return medicalHistoryRepository
                .findTop10ByOrderByIdDesc()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // GET LATEST 10 BY PATIENT
    // =====================================================

    public List<MedicalHistoryResponse>
    getLatestMedicalHistoriesByPatient(
            Long patientId) {

        validatePatient(patientId);

        return medicalHistoryRepository
                .findTop10ByPatient_IdOrderByIdDesc(
                        patientId
                )
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }


    // =====================================================
    // TOTAL MEDICAL HISTORIES
    // =====================================================

    public long getTotalMedicalHistories() {

        return medicalHistoryRepository.count();
    }


    // =====================================================
    // ACTIVE HISTORIES
    // =====================================================

    public long getActiveMedicalHistories() {

        return medicalHistoryRepository
                .countByStatusIgnoreCase("ACTIVE");
    }


    // =====================================================
    // RESOLVED HISTORIES
    // =====================================================

    public long getResolvedMedicalHistories() {

        return medicalHistoryRepository
                .countByStatusIgnoreCase("RESOLVED");
    }


    // =====================================================
    // CHRONIC HISTORIES
    // =====================================================

    public long getChronicMedicalHistories() {

        return medicalHistoryRepository
                .countByStatusIgnoreCase("CHRONIC");
    }


    // =====================================================
    // TODAY'S HISTORIES
    // =====================================================

    public long getTodayMedicalHistories() {

        return medicalHistoryRepository
                .countByHistoryDate(
                        LocalDate.now()
                );
    }


    // =====================================================
    // PATIENT HISTORY COUNT
    // =====================================================

    public long getPatientHistoryCount(
            Long patientId) {

        validatePatient(patientId);

        return medicalHistoryRepository
                .countByPatient_Id(patientId);
    }


    // =====================================================
    // GENERATE HISTORY NUMBER
    // =====================================================

    private String generateHistoryNumber() {

        long nextNumber = 1;

        /*
         * Use the number of existing records as a starting
         * point, then check for duplicates.
         */
        long totalRecords =
                medicalHistoryRepository.count();

        nextNumber = totalRecords + 1;

        String historyNumber;

        do {

            historyNumber =
                    String.format(
                            "MH%04d",
                            nextNumber
                    );

            nextNumber++;

        } while (
                medicalHistoryRepository
                        .existsByHistoryNumber(
                                historyNumber
                        )
        );

        return historyNumber;
    }


    // =====================================================
    // COPY REQUEST -> ENTITY
    // =====================================================

    private void setRequestData(
            MedicalHistory medicalHistory,
            MedicalHistoryRequest request) {

        // -------------------------------------------------
        // HISTORY DATE
        // -------------------------------------------------

        if (request.getHistoryDate() != null) {

            medicalHistory.setHistoryDate(
                    request.getHistoryDate()
            );
        }


        // -------------------------------------------------
        // MEDICAL INFORMATION
        // -------------------------------------------------

        medicalHistory.setAllergies(
                request.getAllergies()
        );

        medicalHistory.setChronicDiseases(
                request.getChronicDiseases()
        );

        medicalHistory.setFamilyHistory(
                request.getFamilyHistory()
        );

        medicalHistory.setPreviousMedications(
                request.getPreviousMedications()
        );

        medicalHistory.setCurrentMedications(
                request.getCurrentMedications()
        );

        medicalHistory.setPreviousSurgeries(
                request.getPreviousSurgeries()
        );

        medicalHistory.setPreviousHospitalizations(
                request.getPreviousHospitalizations()
        );

        medicalHistory.setMajorIllnesses(
                request.getMajorIllnesses()
        );

        medicalHistory.setImmunizationHistory(
                request.getImmunizationHistory()
        );


        // -------------------------------------------------
        // TREATMENT
        // -------------------------------------------------

        medicalHistory.setTreatmentGiven(
                request.getTreatmentGiven()
        );

        medicalHistory.setProceduresPerformed(
                request.getProceduresPerformed()
        );

        medicalHistory.setDiagnosis(
                request.getDiagnosis()
        );


        // -------------------------------------------------
        // PERSONAL / RISK INFORMATION
        // -------------------------------------------------

        medicalHistory.setBloodGroup(
                request.getBloodGroup()
        );

        medicalHistory.setSmokingHistory(
                request.getSmokingHistory()
        );

        medicalHistory.setAlcoholHistory(
                request.getAlcoholHistory()
        );

        medicalHistory.setSubstanceHistory(
                request.getSubstanceHistory()
        );

        medicalHistory.setDisabilityInformation(
                request.getDisabilityInformation()
        );


        // -------------------------------------------------
        // NOTES
        // -------------------------------------------------

        medicalHistory.setEmergencyNotes(
                request.getEmergencyNotes()
        );

        medicalHistory.setAdditionalNotes(
                request.getAdditionalNotes()
        );


        // -------------------------------------------------
        // STATUS
        // -------------------------------------------------

        if (request.getStatus() != null
                && !request.getStatus().trim().isEmpty()) {

            medicalHistory.setStatus(
                    request.getStatus().trim()
            );
        }


        // -------------------------------------------------
        // LAST REVIEWED DATE
        // -------------------------------------------------

        if (request.getLastReviewedDate() != null) {

            medicalHistory.setLastReviewedDate(
                    request.getLastReviewedDate()
            );
        }
    }


    // =====================================================
    // ENTITY -> RESPONSE
    // =====================================================

    private MedicalHistoryResponse convertToResponse(
            MedicalHistory medicalHistory) {

        MedicalHistoryResponse response =
                new MedicalHistoryResponse();


        // -------------------------------------------------
        // BASIC INFORMATION
        // -------------------------------------------------

        response.setId(
                medicalHistory.getId()
        );

        response.setHistoryNumber(
                medicalHistory.getHistoryNumber()
        );


        // -------------------------------------------------
        // PATIENT INFORMATION
        // -------------------------------------------------

        if (medicalHistory.getPatient() != null) {

            Patient patient =
                    medicalHistory.getPatient();

            response.setPatientId(
                    patient.getId()
            );

            response.setPatientCode(
                    patient.getPatientCode()
            );

            response.setPatientName(
                    patient.getFullName()
            );
        }


        // -------------------------------------------------
        // DOCTOR INFORMATION
        // -------------------------------------------------

        if (medicalHistory.getDoctor() != null) {

            Doctor doctor =
                    medicalHistory.getDoctor();

            response.setDoctorId(
                    doctor.getId()
            );

            response.setDoctorName(
                    doctor.getFullName()
            );

            response.setDoctorDegree(
                    doctor.getQualification()
            );
        }


        // -------------------------------------------------
        // DATES
        // -------------------------------------------------

        response.setHistoryDate(
                medicalHistory.getHistoryDate()
        );

        response.setLastReviewedDate(
                medicalHistory.getLastReviewedDate()
        );


        // -------------------------------------------------
        // MEDICAL INFORMATION
        // -------------------------------------------------

        response.setAllergies(
                medicalHistory.getAllergies()
        );

        response.setChronicDiseases(
                medicalHistory.getChronicDiseases()
        );

        response.setFamilyHistory(
                medicalHistory.getFamilyHistory()
        );

        response.setPreviousMedications(
                medicalHistory.getPreviousMedications()
        );

        response.setCurrentMedications(
                medicalHistory.getCurrentMedications()
        );

        response.setPreviousSurgeries(
                medicalHistory.getPreviousSurgeries()
        );

        response.setPreviousHospitalizations(
                medicalHistory.getPreviousHospitalizations()
        );

        response.setMajorIllnesses(
                medicalHistory.getMajorIllnesses()
        );

        response.setImmunizationHistory(
                medicalHistory.getImmunizationHistory()
        );


        // -------------------------------------------------
        // TREATMENT
        // -------------------------------------------------

        response.setTreatmentGiven(
                medicalHistory.getTreatmentGiven()
        );

        response.setProceduresPerformed(
                medicalHistory.getProceduresPerformed()
        );

        response.setDiagnosis(
                medicalHistory.getDiagnosis()
        );


        // -------------------------------------------------
        // PERSONAL / RISK INFORMATION
        // -------------------------------------------------

        response.setBloodGroup(
                medicalHistory.getBloodGroup()
        );

        response.setSmokingHistory(
                medicalHistory.getSmokingHistory()
        );

        response.setAlcoholHistory(
                medicalHistory.getAlcoholHistory()
        );

        response.setSubstanceHistory(
                medicalHistory.getSubstanceHistory()
        );

        response.setDisabilityInformation(
                medicalHistory.getDisabilityInformation()
        );


        // -------------------------------------------------
        // NOTES
        // -------------------------------------------------

        response.setEmergencyNotes(
                medicalHistory.getEmergencyNotes()
        );

        response.setAdditionalNotes(
                medicalHistory.getAdditionalNotes()
        );


        // -------------------------------------------------
        // STATUS
        // -------------------------------------------------

        response.setStatus(
                medicalHistory.getStatus()
        );


        // -------------------------------------------------
        // AUDIT
        // -------------------------------------------------

        response.setCreatedAt(
                medicalHistory.getCreatedAt()
        );

        response.setUpdatedAt(
                medicalHistory.getUpdatedAt()
        );


        return response;
    }


    // =====================================================
    // FIND ENTITY BY ID
    // =====================================================

    private MedicalHistory getMedicalHistoryEntity(
            Long id) {

        return medicalHistoryRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Medical History not found with ID: "
                                        + id
                        )
                );
    }


    // =====================================================
    // VALIDATE PATIENT
    // =====================================================

    private void validatePatient(
            Long patientId) {

        if (!patientRepository.existsById(patientId)) {

            throw new ResourceNotFoundException(
                    "Patient not found with ID: "
                            + patientId
            );
        }
    }


    // =====================================================
    // VALIDATE DOCTOR
    // =====================================================

    private void validateDoctor(
            Long doctorId) {

        if (!doctorRepository.existsById(doctorId)) {

            throw new ResourceNotFoundException(
                    "Doctor not found with ID: "
                            + doctorId
            );
        }
    }
}
