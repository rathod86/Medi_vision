package com.medivision.service;

import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.PregnancyRecord;
import com.medivision.repository.PregnancyRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PregnancyRecordService {

    @Autowired
    private PregnancyRecordRepository pregnancyRecordRepository;

    public List<PregnancyRecord> getAllPregnancyRecords() {
        return pregnancyRecordRepository.findAll();
    }

    public PregnancyRecord getPregnancyRecordById(Long id) {
        return pregnancyRecordRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Pregnancy Record not found with id: " + id));
    }

    public PregnancyRecord createPregnancyRecord(PregnancyRecord record) {
        return pregnancyRecordRepository.save(record);
    }

    public PregnancyRecord updatePregnancyRecord(Long id,
                                                 PregnancyRecord details) {

        PregnancyRecord record = getPregnancyRecordById(id);

        record.setPatient(details.getPatient());
        record.setExpectedDeliveryDate(details.getExpectedDeliveryDate());
        record.setPregnancyWeek(details.getPregnancyWeek());
        record.setRiskLevel(details.getRiskLevel());
        record.setBabyCount(details.getBabyCount());
        record.setDoctor(details.getDoctor());
        record.setDoctorDegree(details.getDoctorDegree());
        record.setBloodPressure(details.getBloodPressure());
        record.setWeight(details.getWeight());
        record.setRemarks(details.getRemarks());

        return pregnancyRecordRepository.save(record);
    }

    public void deletePregnancyRecord(Long id) {

        PregnancyRecord record = getPregnancyRecordById(id);

        pregnancyRecordRepository.delete(record);
    }
}