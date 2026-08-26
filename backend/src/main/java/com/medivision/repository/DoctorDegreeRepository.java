package com.medivision.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medivision.model.DoctorDegree;

public interface DoctorDegreeRepository extends JpaRepository<DoctorDegree, Long> {

}