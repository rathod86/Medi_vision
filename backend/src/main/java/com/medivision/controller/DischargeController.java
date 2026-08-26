package com.medivision.controller;

import com.medivision.model.Discharge;
import com.medivision.service.DischargeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/discharges")
@CrossOrigin(origins = "*")
public class DischargeController {

    @Autowired
    private DischargeService dischargeService;

    @GetMapping
    public List<Discharge> getAllDischarges() {
        return dischargeService.getAllDischarges();
    }

    @GetMapping("/{id}")
    public Discharge getDischargeById(@PathVariable Long id) {
        return dischargeService.getDischargeById(id);
    }

    @PostMapping
    public Discharge createDischarge(@RequestBody Discharge discharge) {
        return dischargeService.createDischarge(discharge);
    }

    @PutMapping("/{id}")
    public Discharge updateDischarge(
            @PathVariable Long id,
            @RequestBody Discharge discharge) {

        return dischargeService.updateDischarge(id, discharge);
    }

    @DeleteMapping("/{id}")
    public String deleteDischarge(@PathVariable Long id) {

        dischargeService.deleteDischarge(id);

        return "Discharge deleted successfully";
    }
}