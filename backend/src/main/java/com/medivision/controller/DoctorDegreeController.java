package com.medivision.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.medivision.model.DoctorDegree;
import com.medivision.service.DoctorDegreeService;

@RestController

@RequestMapping("/api/doctor-degrees")

@CrossOrigin("*")

public class DoctorDegreeController {

    @Autowired

    private DoctorDegreeService doctorDegreeService;

    // Save Degree

    @PostMapping

    public DoctorDegree saveDoctorDegree(@RequestBody DoctorDegree doctorDegree) {

        return doctorDegreeService.saveDoctorDegree(doctorDegree);
    }

    // Get All Degrees

    @GetMapping

    public List<DoctorDegree> getAllDoctorDegrees() {

        return doctorDegreeService.getAllDoctorDegrees();
    }

    // Get By Id

    @GetMapping("/{id}")

    public DoctorDegree getDoctorDegreeById(@PathVariable Long id) {

        return doctorDegreeService.getDoctorDegreeById(id);
    }

    // Delete

    @DeleteMapping("/{id}")

    public String deleteDoctorDegree(@PathVariable Long id) {

        doctorDegreeService.deleteDoctorDegree(id);

        return "Doctor Degree Deleted Successfully";
    }
}