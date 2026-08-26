package com.medivision.service;

import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Discharge;
import com.medivision.repository.DischargeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DischargeService {

    @Autowired
    private DischargeRepository dischargeRepository;

    public List<Discharge> getAllDischarges() {
        return dischargeRepository.findAll();
    }

    public Discharge getDischargeById(Long id) {
        return dischargeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Discharge not found with id: " + id));
    }

    public Discharge createDischarge(Discharge discharge) {
        return dischargeRepository.save(discharge);
    }

    public Discharge updateDischarge(Long id, Discharge dischargeDetails) {

        Discharge discharge = getDischargeById(id);

        discharge.setPatient(dischargeDetails.getPatient());
        discharge.setDoctor(dischargeDetails.getDoctor());
        discharge.setDischargeDate(dischargeDetails.getDischargeDate());
        discharge.setDischargeTime(dischargeDetails.getDischargeTime());
        discharge.setFinalDiagnosis(dischargeDetails.getFinalDiagnosis());
        discharge.setSummary(dischargeDetails.getSummary());
        discharge.setFollowUpDate(dischargeDetails.getFollowUpDate());
        discharge.setDischargeCondition(dischargeDetails.getDischargeCondition());
        discharge.setDischargeRemarks(dischargeDetails.getDischargeRemarks());

        return dischargeRepository.save(discharge);
    }

    public void deleteDischarge(Long id) {

        Discharge discharge = getDischargeById(id);

        dischargeRepository.delete(discharge);
    }
}