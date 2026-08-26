package com.medivision.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medivision.model.Visit;

public interface VisitRepository extends JpaRepository<Visit, Long> {

}