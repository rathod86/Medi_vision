package com.medivision.controller;

import com.medivision.model.PregnancyRecord;
import com.medivision.service.PregnancyRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pregnancy-records")
@CrossOrigin(origins = "*")
public class PregnancyRecordController {

    @Autowired
    private PregnancyRecordService pregnancyRecordService;

    @GetMapping
    public List<PregnancyRecord> getAllPregnancyRecords() {
        return pregnancyRecordService.getAllPregnancyRecords();
    }

    @GetMapping("/{id}")
    public PregnancyRecord getPregnancyRecordById(@PathVariable Long id) {
        return pregnancyRecordService.getPregnancyRecordById(id);
    }

    @PostMapping
    public PregnancyRecord createPregnancyRecord(
            @RequestBody PregnancyRecord record) {

        return pregnancyRecordService.createPregnancyRecord(record);
    }

    @PutMapping("/{id}")
    public PregnancyRecord updatePregnancyRecord(
            @PathVariable Long id,
            @RequestBody PregnancyRecord record) {

        return pregnancyRecordService.updatePregnancyRecord(id, record);
    }

    @DeleteMapping("/{id}")
    public String deletePregnancyRecord(@PathVariable Long id) {

        pregnancyRecordService.deletePregnancyRecord(id);

        return "Pregnancy Record deleted successfully";
    }
}