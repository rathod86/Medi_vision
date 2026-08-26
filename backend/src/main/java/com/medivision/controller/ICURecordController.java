package com.medivision.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medivision.dto.ICURecordRequest;
import com.medivision.dto.ICURecordResponse;
import com.medivision.service.ICURecordService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/icu-records")
@CrossOrigin(origins = "*")
@Validated
public class ICURecordController {

    // =====================================================
    // SERVICE
    // =====================================================

    @Autowired
    private ICURecordService icuRecordService;


    // =====================================================
    // ADD ICU RECORD
    // POST /api/icu-records
    // =====================================================

    @PostMapping
    public ResponseEntity<ICURecordResponse> addICURecord(
            @Valid @RequestBody ICURecordRequest request) {

        ICURecordResponse response =
                icuRecordService.saveICURecord(request);

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // GET ALL ICU RECORDS
    // GET /api/icu-records
    // =====================================================

    @GetMapping
    public ResponseEntity<List<ICURecordResponse>> getAllICURecords() {

        List<ICURecordResponse> records =
                icuRecordService.getAllICURecords();

        return ResponseEntity.ok(records);
    }


    // =====================================================
    // GET ICU RECORD BY ID
    // GET /api/icu-records/{id}
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<ICURecordResponse> getICURecordById(
            @PathVariable Long id) {

        ICURecordResponse response =
                icuRecordService.getICURecordById(id);

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // UPDATE ICU RECORD
    // PUT /api/icu-records/{id}
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<ICURecordResponse> updateICURecord(
            @PathVariable Long id,
            @Valid @RequestBody ICURecordRequest request) {

        ICURecordResponse response =
                icuRecordService.updateICURecord(
                        id,
                        request
                );

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // DELETE ICU RECORD
    // DELETE /api/icu-records/{id}
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteICURecord(
            @PathVariable Long id) {

        icuRecordService.deleteICURecord(id);

        return ResponseEntity.ok(
                "ICU Record deleted successfully."
        );
    }


    // =====================================================
    // GET RECORDS BY PATIENT
    // GET /api/icu-records/patient/{patientId}
    // =====================================================

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<ICURecordResponse>>
    getRecordsByPatient(
            @PathVariable Long patientId) {

        List<ICURecordResponse> records =
                icuRecordService.getRecordsByPatient(
                        patientId
                );

        return ResponseEntity.ok(records);
    }


    // =====================================================
    // GET RECORDS BY DOCTOR
    // GET /api/icu-records/doctor/{doctorId}
    // =====================================================

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<ICURecordResponse>>
    getRecordsByDoctor(
            @PathVariable Long doctorId) {

        List<ICURecordResponse> records =
                icuRecordService.getRecordsByDoctor(
                        doctorId
                );

        return ResponseEntity.ok(records);
    }


    // =====================================================
    // GET RECORDS BY STATUS
    // GET /api/icu-records/status/{status}
    // =====================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<ICURecordResponse>>
    getRecordsByStatus(
            @PathVariable String status) {

        List<ICURecordResponse> records =
                icuRecordService.getRecordsByStatus(
                        status
                );

        return ResponseEntity.ok(records);
    }


    // =====================================================
    // GET LATEST ICU RECORDS
    // GET /api/icu-records/latest
    // =====================================================

    @GetMapping("/latest")
    public ResponseEntity<List<ICURecordResponse>>
    getLatestICURecords() {

        List<ICURecordResponse> records =
                icuRecordService.getLatestICURecords();

        return ResponseEntity.ok(records);
    }


    // =====================================================
    // TOTAL ICU RECORDS
    // GET /api/icu-records/statistics/total
    // =====================================================

    @GetMapping("/statistics/total")
    public ResponseEntity<Long> getTotalICURecords() {

        return ResponseEntity.ok(
                icuRecordService.getTotalICURecords()
        );
    }


    // =====================================================
    // TODAY'S ICU ADMISSIONS
    // GET /api/icu-records/statistics/today
    // =====================================================

    @GetMapping("/statistics/today")
    public ResponseEntity<Long> getTodayICUAdmissions() {

        return ResponseEntity.ok(
                icuRecordService.getTodayICUAdmissions()
        );
    }


    // =====================================================
    // CRITICAL PATIENTS
    // GET /api/icu-records/statistics/critical
    // =====================================================

    @GetMapping("/statistics/critical")
    public ResponseEntity<Long> getCriticalPatients() {

        return ResponseEntity.ok(
                icuRecordService.getCriticalPatients()
        );
    }


    // =====================================================
    // VENTILATOR PATIENTS
    // GET /api/icu-records/statistics/ventilator
    // =====================================================

    @GetMapping("/statistics/ventilator")
    public ResponseEntity<Long> getVentilatorPatients() {

        return ResponseEntity.ok(
                icuRecordService.getVentilatorPatients()
        );
    }


    // =====================================================
    // ISOLATION PATIENTS
    // GET /api/icu-records/statistics/isolation
    // =====================================================

    @GetMapping("/statistics/isolation")
    public ResponseEntity<Long> getIsolationPatients() {

        return ResponseEntity.ok(
                icuRecordService.getIsolationPatients()
        );
    }
}