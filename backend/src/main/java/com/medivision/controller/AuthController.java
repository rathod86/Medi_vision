package com.medivision.controller;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.medivision.dto.LoginRequest;
import com.medivision.dto.LoginResponse;
import com.medivision.dto.SignupRequest;
import com.medivision.dto.UserResponse;
import com.medivision.model.User;
import com.medivision.repository.UserRepository;
import com.medivision.security.JwtUtil;
import com.medivision.service.SignupService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175"
        }
)
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserRepository userRepository;

    private final JwtUtil jwtUtil;

    private final SignupService signupService;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public AuthController(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            JwtUtil jwtUtil,
            SignupService signupService) {

        this.authenticationManager =
                authenticationManager;

        this.userRepository =
                userRepository;

        this.jwtUtil =
                jwtUtil;

        this.signupService =
                signupService;
    }


    // =====================================================
    // SIGNUP
    // POST /auth/signup
    // =====================================================

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> signup(
            @Valid
            @RequestBody SignupRequest request) {

        User user =
                signupService.signup(
                        request
                );

        UserResponse response =
                convertToResponse(user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // =====================================================
    // LOGIN
    // POST /auth/login
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid
            @RequestBody LoginRequest request) {

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();


        // -------------------------------------------------
        // AUTHENTICATE
        // -------------------------------------------------

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                email,
                                request.getPassword()
                        )
                );


        // -------------------------------------------------
        // FIND USER
        // -------------------------------------------------

        User user =
                userRepository
                        .findByEmailIgnoreCase(email)
                        .orElseThrow();


        // -------------------------------------------------
        // ROLE
        // -------------------------------------------------

        String role =
                user.getRole()
                        .trim()
                        .toUpperCase();


        // -------------------------------------------------
        // GENERATE JWT
        // -------------------------------------------------

        String token =
                jwtUtil.generateToken(
                        email,
                        role
                );


        // -------------------------------------------------
        // UPDATE LOGIN INFORMATION
        // -------------------------------------------------

        user.setLastLogin(
                LocalDateTime.now()
        );

        user.setFailedLoginAttempts(0);

        userRepository.save(user);


        // -------------------------------------------------
        // RESPONSE
        // -------------------------------------------------

        return ResponseEntity.ok(
                new LoginResponse(
                        token,
                        convertToResponse(user)
                )
        );
    }


    // =====================================================
    // CURRENT USER
    // GET /auth/me
    // =====================================================

    @GetMapping("/me")
    public ResponseEntity<UserResponse>
    getCurrentUser() {

        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();


        User user =
                userRepository
                        .findByEmailIgnoreCase(email)
                        .orElseThrow();


        return ResponseEntity.ok(
                convertToResponse(user)
        );
    }


    // =====================================================
    // USER → USER RESPONSE
    // =====================================================

    private UserResponse convertToResponse(
            User user) {

        UserResponse response =
                new UserResponse();


        response.setId(
                user.getId()
        );

        response.setUsername(
                user.getUsername()
        );

        response.setFullName(
                user.getFullName()
        );

        response.setEmail(
                user.getEmail()
        );

        response.setPhone(
                user.getPhone()
        );

        response.setRole(
                user.getRole()
        );

        response.setActive(
                user.getActive()
        );

        response.setAccountLocked(
                user.getAccountLocked()
        );

        response.setCreatedAt(
                user.getCreatedAt()
        );

        response.setUpdatedAt(
                user.getUpdatedAt()
        );

        response.setLastLogin(
                user.getLastLogin()
        );

        response.setCreatedBy(
                user.getCreatedBy()
        );

        response.setUpdatedBy(
                user.getUpdatedBy()
        );


        return response;
    }
}