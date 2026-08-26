package com.medivision.repository;

import com.medivision.model.PregnancyRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PregnancyRecordRepository extends JpaRepository<PregnancyRecord, Long> {

}