package com.medivision.repository;

import com.medivision.model.Discharge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DischargeRepository extends JpaRepository<Discharge, Long> {

}