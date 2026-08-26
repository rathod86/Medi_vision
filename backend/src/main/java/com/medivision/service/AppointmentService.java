package com.medivision.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.medivision.dto.AppointmentRequest;
import com.medivision.dto.AppointmentResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Appointment;
import com.medivision.model.Doctor;
import com.medivision.model.Patient;
import com.medivision.repository.AppointmentRepository;
import com.medivision.repository.DoctorRepository;
import com.medivision.repository.PatientRepository;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private ModelMapper modelMapper;

    // =====================================================
    // Add Appointment
    // =====================================================

    public AppointmentResponse saveAppointment(AppointmentRequest request) {

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with ID : "
                                        + request.getDoctorId()));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with ID : "
                                        + request.getPatientId()));

        // Check duplicate appointment slot

        if (appointmentRepository
                .existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                        doctor.getId(),
                        request.getAppointmentDate(),
                        request.getAppointmentTime())) {

            throw new RuntimeException(
                    "Appointment already exists for this doctor at the selected date and time.");
        }

        Appointment appointment = new Appointment();

        // Generate Appointment Code
        appointment.setAppointmentCode(generateAppointmentCode());

        // Generate Token Number
        appointment.setTokenNumber(
                generateTokenNumber(request.getAppointmentDate()));

        appointment.setAppointmentDate(request.getAppointmentDate());

        appointment.setAppointmentTime(request.getAppointmentTime());

        appointment.setConsultationType(request.getConsultationType());

        appointment.setReason(request.getReason());

        appointment.setNotes(request.getNotes());

        appointment.setConsultationFee(request.getConsultationFee());

        appointment.setDoctor(doctor);

        appointment.setPatient(patient);

        // Department from Doctor
        appointment.setDepartment(doctor.getDepartment());

        // Default Status
        if (request.getStatus() == null
                || request.getStatus().isBlank()) {

            appointment.setStatus("Scheduled");

        } else {

            appointment.setStatus(request.getStatus());

        }

        Appointment savedAppointment =
                appointmentRepository.save(appointment);

        AppointmentResponse response =
                modelMapper.map(savedAppointment,
                        AppointmentResponse.class);

        response.setDoctorId(doctor.getId());
        response.setDoctorName(doctor.getFullName());

        response.setPatientId(patient.getId());
        response.setPatientName(patient.getFullName());

        return response;
    }

    // =====================================================
    // Get All Appointments
    // =====================================================

    public List<AppointmentResponse> getAllAppointments() {

        return appointmentRepository.findAll()

                .stream()

                .map(appointment -> {

                    AppointmentResponse response =
                            modelMapper.map(
                                    appointment,
                                    AppointmentResponse.class);

                    response.setDoctorId(
                            appointment.getDoctor().getId());

                    response.setDoctorName(
                            appointment.getDoctor().getFullName());

                    response.setPatientId(
                            appointment.getPatient().getId());

                    response.setPatientName(
                            appointment.getPatient().getFullName());

                    return response;

                })

                .collect(Collectors.toList());

    }

    // =====================================================
    // Get Appointment By ID
    // =====================================================

    public AppointmentResponse getAppointmentById(Long id) {

        Appointment appointment =
                appointmentRepository.findById(id)

                        .orElseThrow(() ->

                                new ResourceNotFoundException(
                                        "Appointment not found with ID : "
                                                + id));

        AppointmentResponse response =
                modelMapper.map(
                        appointment,
                        AppointmentResponse.class);

        response.setDoctorId(
                appointment.getDoctor().getId());

        response.setDoctorName(
                appointment.getDoctor().getFullName());

        response.setPatientId(
                appointment.getPatient().getId());

        response.setPatientName(
                appointment.getPatient().getFullName());

        return response;

    }

    // =====================================================
    // Update Appointment
    // =====================================================

    public AppointmentResponse updateAppointment(
            Long id,
            AppointmentRequest request) {

        Appointment appointment =
                appointmentRepository.findById(id)

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Appointment not found with ID : " + id));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with ID : "
                                        + request.getDoctorId()));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Patient not found with ID : "
                                        + request.getPatientId()));

        appointment.setAppointmentDate(request.getAppointmentDate());

        appointment.setAppointmentTime(request.getAppointmentTime());

        appointment.setConsultationType(request.getConsultationType());

        appointment.setReason(request.getReason());

        appointment.setNotes(request.getNotes());

        appointment.setConsultationFee(request.getConsultationFee());

        appointment.setDoctor(doctor);

        appointment.setPatient(patient);

        appointment.setDepartment(doctor.getDepartment());

        if (request.getStatus() == null
                || request.getStatus().isBlank()) {

            appointment.setStatus("Scheduled");

        } else {

            appointment.setStatus(request.getStatus());

        }

        Appointment updatedAppointment =
                appointmentRepository.save(appointment);

        AppointmentResponse response =
                modelMapper.map(updatedAppointment,
                        AppointmentResponse.class);

        response.setDoctorId(doctor.getId());

        response.setDoctorName(doctor.getFullName());

        response.setPatientId(patient.getId());

        response.setPatientName(patient.getFullName());

        return response;

    }

    // =====================================================
    // Delete Appointment
    // =====================================================

    public void deleteAppointment(Long id) {

        Appointment appointment =
                appointmentRepository.findById(id)

                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Appointment not found with ID : " + id));

        try {

            appointmentRepository.delete(appointment);

        } catch (DataIntegrityViolationException e) {

            throw new RuntimeException(
                    "Cannot delete appointment because it is referenced by other records.");

        }

    }

    // =====================================================
    // Generate Appointment Code
    // =====================================================

    private String generateAppointmentCode() {

        Long maxId = appointmentRepository.findMaxAppointmentId();

        long nextId = (maxId == null) ? 1 : maxId + 1;

        return String.format("APT%03d", nextId);

    }

    // =====================================================
    // Generate Token Number
    // =====================================================

    private Integer generateTokenNumber(
            java.time.LocalDate appointmentDate) {

        Integer maxToken =
                appointmentRepository.findMaxTokenNumber(
                        appointmentDate);

        if (maxToken == null) {

            return 1;

        }

        return maxToken + 1;

    }

}
    
    