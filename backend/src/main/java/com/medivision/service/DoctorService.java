package com.medivision.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.medivision.dto.DoctorRequest;
import com.medivision.dto.DoctorResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Doctor;
import com.medivision.repository.DoctorRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private ModelMapper modelMapper;

    // =====================================================
    // Add Doctor
    // =====================================================

    
    public DoctorResponse saveDoctor(DoctorRequest request) {

        String email = request.getEmail().trim();
        String phone = request.getPhone().trim();

        if (doctorRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists.");
        }

        if (doctorRepository.existsByPhone(phone)) {
            throw new RuntimeException("Phone number already exists.");
        }

        Doctor doctor = modelMapper.map(request, Doctor.class);

        doctor.setDoctorCode(generateDoctorCode());

        doctor.setEmail(email);
        doctor.setPhone(phone);

        if (request.getStatus() == null || request.getStatus().isBlank()) {
            doctor.setStatus("Active");
        } else {
            doctor.setStatus(request.getStatus());
        }

        Doctor savedDoctor = doctorRepository.save(doctor);

        return modelMapper.map(savedDoctor, DoctorResponse.class);
    }

    // =====================================================
    // Get All Doctors
    // =====================================================

    public List<DoctorResponse> getAllDoctors() {

        return doctorRepository.findAll()
                .stream()
                .map(doctor -> modelMapper.map(doctor, DoctorResponse.class))
                .collect(Collectors.toList());
    }

    // =====================================================
    // Get Doctor By ID
    // =====================================================

    public DoctorResponse getDoctorById(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with ID : " + id));

        return modelMapper.map(doctor, DoctorResponse.class);
    }

    // =====================================================
    // Update Doctor
    // =====================================================

    public DoctorResponse updateDoctor(Long id, DoctorRequest request) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with ID : " + id));

        String email = request.getEmail().trim();
        String phone = request.getPhone().trim();

        Optional<Doctor> existingEmail =
                doctorRepository.findByEmail(email);

        if (existingEmail.isPresent()
                && !existingEmail.get().getId().equals(id)) {

            throw new RuntimeException("Email already exists.");
        }

        Optional<Doctor> existingPhone =
                doctorRepository.findByPhone(phone);

        if (existingPhone.isPresent()
                && !existingPhone.get().getId().equals(id)) {

            throw new RuntimeException("Phone number already exists.");
        }

        doctor.setFullName(request.getFullName());
        doctor.setEmail(email);
        doctor.setPhone(phone);
        doctor.setGender(request.getGender());
        doctor.setDateOfBirth(request.getDateOfBirth());
        doctor.setDepartment(request.getDepartment());
        doctor.setSpecialization(request.getSpecialization());
        doctor.setQualification(request.getQualification());
        doctor.setExperience(request.getExperience());
        doctor.setConsultationFee(request.getConsultationFee());
        doctor.setLicenseNumber(request.getLicenseNumber());
        doctor.setJoiningDate(request.getJoiningDate());
        doctor.setAddress(request.getAddress());
        doctor.setProfileImage(request.getProfileImage());

        if (request.getStatus() == null || request.getStatus().isBlank()) {
            doctor.setStatus("Active");
        } else {
            doctor.setStatus(request.getStatus());
        }

        Doctor updatedDoctor = doctorRepository.save(doctor);

        return modelMapper.map(updatedDoctor, DoctorResponse.class);
    }

    // =====================================================
    // Delete Doctor
    // =====================================================

    public void deleteDoctor(Long id) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Doctor not found with ID : " + id));

        try {

            doctorRepository.delete(doctor);

        } catch (DataIntegrityViolationException e) {

            throw new RuntimeException(
                    "Cannot delete doctor because it is referenced by appointments, ICU records, prescriptions or other records.");
        }
    }

    // =====================================================
    // Generate Doctor Code
    // =====================================================

    private String generateDoctorCode() {

        Long maxId = doctorRepository.findMaxDoctorId();

        long nextId = (maxId == null) ? 1 : maxId + 1;

        return String.format("DOC%03d", nextId);
    }
}