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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.medivision.dto.NurseRequest;
import com.medivision.dto.NurseResponse;
import com.medivision.service.NurseService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/nurses")
@CrossOrigin(origins = "*")
@Validated
public class NurseController {

    @Autowired
    private NurseService nurseService;


    // =====================================================
    // ADD NURSE
    // POST /api/nurses
    // =====================================================

    @PostMapping
    public ResponseEntity<NurseResponse> addNurse(
            @Valid @RequestBody NurseRequest request) {

        NurseResponse response =
                nurseService.saveNurse(request);

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // GET ALL NURSES
    // GET /api/nurses
    // =====================================================

    @GetMapping
    public ResponseEntity<List<NurseResponse>> getAllNurses() {

        List<NurseResponse> nurses =
                nurseService.getAllNurses();

        return ResponseEntity.ok(nurses);
    }


    // =====================================================
    // SEARCH BY NAME
    // GET /api/nurses/search/name?name=John
    // =====================================================

    @GetMapping("/search/name")
    public ResponseEntity<List<NurseResponse>> searchByName(
            @RequestParam String name) {

        List<NurseResponse> nurses =
                nurseService.searchByName(name);

        return ResponseEntity.ok(nurses);
    }


    // =====================================================
    // GET NURSES BY DEPARTMENT
    // GET /api/nurses/department/{department}
    // =====================================================

    @GetMapping("/department/{department}")
    public ResponseEntity<List<NurseResponse>> getByDepartment(
            @PathVariable String department) {

        List<NurseResponse> nurses =
                nurseService.getByDepartment(department);

        return ResponseEntity.ok(nurses);
    }


    // =====================================================
    // GET NURSES BY SHIFT
    // GET /api/nurses/shift/{shift}
    // =====================================================

    @GetMapping("/shift/{shift}")
    public ResponseEntity<List<NurseResponse>> getByShift(
            @PathVariable String shift) {

        List<NurseResponse> nurses =
                nurseService.getByShift(shift);

        return ResponseEntity.ok(nurses);
    }


    // =====================================================
    // GET NURSES BY STATUS
    // GET /api/nurses/status/{status}
    // =====================================================

    @GetMapping("/status/{status}")
    public ResponseEntity<List<NurseResponse>> getByStatus(
            @PathVariable String status) {

        List<NurseResponse> nurses =
                nurseService.getByStatus(status);

        return ResponseEntity.ok(nurses);
    }


    // =====================================================
    // GET BY DEPARTMENT + STATUS
    // GET /api/nurses/department/{department}/status/{status}
    // =====================================================

    @GetMapping("/department/{department}/status/{status}")
    public ResponseEntity<List<NurseResponse>>
    getByDepartmentAndStatus(
            @PathVariable String department,
            @PathVariable String status) {

        List<NurseResponse> nurses =
                nurseService.getByDepartmentAndStatus(
                        department,
                        status
                );

        return ResponseEntity.ok(nurses);
    }


    // =====================================================
    // TOTAL NURSES
    // GET /api/nurses/statistics/total
    // =====================================================

    @GetMapping("/statistics/total")
    public ResponseEntity<Long> getTotalNurses() {

        long total =
                nurseService.getTotalNurses();

        return ResponseEntity.ok(total);
    }


    // =====================================================
    // ACTIVE NURSES
    // GET /api/nurses/statistics/active
    // =====================================================

    @GetMapping("/statistics/active")
    public ResponseEntity<Long> getActiveNurses() {

        long active =
                nurseService.getActiveNurses();

        return ResponseEntity.ok(active);
    }


    // =====================================================
    // INACTIVE NURSES
    // GET /api/nurses/statistics/inactive
    // =====================================================

    @GetMapping("/statistics/inactive")
    public ResponseEntity<Long> getInactiveNurses() {

        long inactive =
                nurseService.getInactiveNurses();

        return ResponseEntity.ok(inactive);
    }


    // =====================================================
    // ON LEAVE NURSES
    // GET /api/nurses/statistics/on-leave
    // =====================================================

    @GetMapping("/statistics/on-leave")
    public ResponseEntity<Long> getOnLeaveNurses() {

        long onLeave =
                nurseService.getOnLeaveNurses();

        return ResponseEntity.ok(onLeave);
    }


    // =====================================================
    // GET NURSE BY ID
    // GET /api/nurses/{id}
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<NurseResponse> getNurseById(
            @PathVariable Long id) {

        NurseResponse response =
                nurseService.getNurseById(id);

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // UPDATE NURSE
    // PUT /api/nurses/{id}
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<NurseResponse> updateNurse(
            @PathVariable Long id,
            @Valid @RequestBody NurseRequest request) {

        NurseResponse response =
                nurseService.updateNurse(
                        id,
                        request
                );

        return ResponseEntity.ok(response);
    }


    // =====================================================
    // DELETE NURSE
    // DELETE /api/nurses/{id}
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNurse(
            @PathVariable Long id) {

        nurseService.deleteNurse(id);

        return ResponseEntity.ok(
                "Nurse deleted successfully."
        );
    }
}