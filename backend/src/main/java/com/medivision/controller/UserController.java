package com.medivision.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medivision.dto.UserRequest;
import com.medivision.dto.UserResponse;
import com.medivision.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(
        origins = "http://localhost:5173"
)
public class UserController {

    private final UserService userService;

    public UserController(
            UserService userService) {

        this.userService = userService;
    }

    // =====================================================
    // GET ALL
    // =====================================================

    @GetMapping
    public ResponseEntity<List<UserResponse>>
    getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    // =====================================================
    // SEARCH (must be before /{id})
    // =====================================================

    @GetMapping("/search")
    public ResponseEntity<List<UserResponse>>
    searchUsers(
            @RequestParam String search) {

        return ResponseEntity.ok(
                userService.searchUsers(
                        search
                )
        );
    }

    // =====================================================
    // GET BY ID
    // =====================================================

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse>
    getUserById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.getUserById(id)
        );
    }

    // =====================================================
    // CREATE
    // =====================================================

    @PostMapping
    public ResponseEntity<UserResponse>
    createUser(
            @Valid
            @RequestBody UserRequest request) {

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        userService.createUser(
                                request
                        )
                );
    }

    // =====================================================
    // UPDATE
    // =====================================================

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse>
    updateUser(
            @PathVariable Long id,
            @Valid
            @RequestBody UserRequest request) {

        return ResponseEntity.ok(
                userService.updateUser(
                        id,
                        request
                )
        );
    }

    // =====================================================
    // DELETE
    // =====================================================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteUser(
            @PathVariable Long id) {

        userService.deleteUser(id);

        return ResponseEntity.noContent()
                .build();
    }

    // =====================================================
    // ACTIVATE
    // =====================================================

    @PatchMapping("/{id}/activate")
    public ResponseEntity<UserResponse>
    activateUser(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.activateUser(id)
        );
    }

    // =====================================================
    // DEACTIVATE
    // =====================================================

    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<UserResponse>
    deactivateUser(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.deactivateUser(id)
        );
    }

    // =====================================================
    // LOCK
    // =====================================================

    @PatchMapping("/{id}/lock")
    public ResponseEntity<UserResponse>
    lockUser(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.lockUser(id)
        );
    }

    // =====================================================
    // UNLOCK
    // =====================================================

    @PatchMapping("/{id}/unlock")
    public ResponseEntity<UserResponse>
    unlockUser(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                userService.unlockUser(id)
        );
    }
}