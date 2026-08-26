package com.medivision.service;

import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Surgery;
import com.medivision.repository.SurgeryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SurgeryService {

    @Autowired
    private SurgeryRepository surgeryRepository;

    public List<Surgery> getAllSurgeries() {
        return surgeryRepository.findAll();
    }

    public Surgery getSurgeryById(Long id) {
        return surgeryRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Surgery not found with id: " + id));
    }

    public Surgery createSurgery(Surgery surgery) {
        return surgeryRepository.save(surgery);
    }

    public Surgery updateSurgery(Long id, Surgery details) {

        Surgery surgery = getSurgeryById(id);

        surgery.setPatient(details.getPatient());
        surgery.setDoctor(details.getDoctor());
        surgery.setSurgeryName(details.getSurgeryName());
        surgery.setSurgeryDate(details.getSurgeryDate());
        surgery.setNotes(details.getNotes());
        surgery.setSurgeonDegree(details.getSurgeonDegree());
        surgery.setOperationTheatre(details.getOperationTheatre());
        surgery.setSurgeryDuration(details.getSurgeryDuration());
        surgery.setAnesthesiaType(details.getAnesthesiaType());

        return surgeryRepository.save(surgery);
    }

    public void deleteSurgery(Long id) {

        Surgery surgery = getSurgeryById(id);

        surgeryRepository.delete(surgery);
    }
}