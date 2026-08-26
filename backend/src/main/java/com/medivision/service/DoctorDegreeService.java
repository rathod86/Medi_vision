package com.medivision.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medivision.model.DoctorDegree;
import com.medivision.repository.DoctorDegreeRepository;

@Service

public class DoctorDegreeService {

    @Autowired

    private DoctorDegreeRepository doctorDegreeRepository;

    // Save Doctor Degree

    public DoctorDegree saveDoctorDegree(DoctorDegree doctorDegree) {

        return doctorDegreeRepository.save(doctorDegree);
    }

    // Get All Degrees

    public List<DoctorDegree> getAllDoctorDegrees() {

        return doctorDegreeRepository.findAll();
    }

    // Get By Id

    public DoctorDegree getDoctorDegreeById(Long id) {

        return doctorDegreeRepository.findById(id).orElse(null);
    }

    // Delete

    public void deleteDoctorDegree(Long id) {

        doctorDegreeRepository.deleteById(id);
    }
}