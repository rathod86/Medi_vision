package com.medivision.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.medivision.model.Visit;
import com.medivision.service.VisitService;

@RestController

@RequestMapping("/api/visits")

@CrossOrigin("*")

public class VisitController {

    @Autowired

    private VisitService visitService;

    // Save Visit

    @PostMapping

    public Visit saveVisit(@RequestBody Visit visit) {

        return visitService.saveVisit(visit);
    }

    // Get All Visits

    @GetMapping

    public List<Visit> getAllVisits() {

        return visitService.getAllVisits();
    }

    // Get Visit By Id

    @GetMapping("/{id}")

    public Visit getVisitById(@PathVariable Long id) {

        return visitService.getVisitById(id);
    }

    // Delete Visit

    @DeleteMapping("/{id}")

    public String deleteVisit(@PathVariable Long id) {

        visitService.deleteVisit(id);

        return "Visit Deleted Successfully";
    }
}