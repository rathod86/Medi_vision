package com.medivision.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medivision.model.Visit;
import com.medivision.repository.VisitRepository;

@Service

public class VisitService {

    @Autowired

    private VisitRepository visitRepository;

    // Save Visit

    public Visit saveVisit(Visit visit) {

        return visitRepository.save(visit);
    }

    // Get All Visits

    public List<Visit> getAllVisits() {

        return visitRepository.findAll();
    }

    // Get Visit By Id

    public Visit getVisitById(Long id) {

        return visitRepository.findById(id).orElse(null);
    }

    // Delete Visit

    public void deleteVisit(Long id) {

        visitRepository.deleteById(id);
    }
}