package com.medivision.controller;

import com.medivision.model.Surgery;
import com.medivision.service.SurgeryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/surgeries")
@CrossOrigin(origins = "*")
public class SurgeryController {

    @Autowired
    private SurgeryService surgeryService;

    @GetMapping
    public List<Surgery> getAllSurgeries() {
        return surgeryService.getAllSurgeries();
    }

    @GetMapping("/{id}")
    public Surgery getSurgeryById(@PathVariable Long id) {
        return surgeryService.getSurgeryById(id);
    }

    @PostMapping
    public Surgery createSurgery(@RequestBody Surgery surgery) {
        return surgeryService.createSurgery(surgery);
    }

    @PutMapping("/{id}")
    public Surgery updateSurgery(
            @PathVariable Long id,
            @RequestBody Surgery surgery) {

        return surgeryService.updateSurgery(id, surgery);
    }

    @DeleteMapping("/{id}")
    public String deleteSurgery(@PathVariable Long id) {

        surgeryService.deleteSurgery(id);

        return "Surgery deleted successfully";
    }
}