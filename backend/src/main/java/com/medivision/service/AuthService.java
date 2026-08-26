package com.medivision.service;

import java.time.LocalDateTime;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medivision.dto.LoginRequest;
import com.medivision.dto.LoginResponse;
import com.medivision.dto.SignupRequest;
import com.medivision.dto.UserResponse;
import com.medivision.model.User;
import com.medivision.repository.UserRepository;
import com.medivision.security.JwtUtil;

@Service
@Transactional
public class AuthService {

    // =====================================================
    // CONSTANTS
    // =====================================================

    private static final int MAX_FAILED_ATTEMPTS = 5;

    // =====================================================
    // DEPENDENCIES
    // =====================================================

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil) {

        this.userRepository =
                userRepository;

        this.passwordEncoder =
                passwordEncoder;

        this.authenticationManager =
                authenticationManager;

        this.jwtUtil =
                jwtUtil;
    }

    // =====================================================
    // SIGNUP
    // =====================================================

    public UserResponse signup(
            SignupRequest request) {

        // -------------------------------------------------
        // Normalize username
        // -------------------------------------------------

        String username =
                request.getUsername()
                        .trim()
                        .toLowerCase();

        // -------------------------------------------------
        // Normalize email
        // -------------------------------------------------

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        // -------------------------------------------------
        // Check duplicate username
        // -------------------------------------------------

        if (userRepository
                .existsByUsernameIgnoreCase(username)) {

            throw new IllegalArgumentException(
                    "Username already exists"
            );
        }

        // -------------------------------------------------
        // Check duplicate email
        // -------------------------------------------------

        if (userRepository
                .existsByEmailIgnoreCase(email)) {

            throw new IllegalArgumentException(
                    "Email already exists"
            );
        }

        // -------------------------------------------------
        // Create User
        // -------------------------------------------------

        User user =
                new User();

        user.setUsername(
                username
        );

        user.setEmail(
                email
        );

        user.setFullName(
                request.getFullName()
                        .trim()
        );

        // -------------------------------------------------
        // Phone
        // -------------------------------------------------

        if (request.getPhone() != null &&
                !request.getPhone().isBlank()) {

            user.setPhone(
                    request.getPhone().trim()
            );

        } else {

            user.setPhone(null);
        }

        // -------------------------------------------------
        // Encrypt Password
        // -------------------------------------------------

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        // -------------------------------------------------
        // IMPORTANT
        //
        // Public signup creates PATIENT only.
        //
        // The frontend does NOT send role.
        // -------------------------------------------------

        user.setRole(
                "PATIENT"
        );

        // -------------------------------------------------
        // Account status
        // -------------------------------------------------

        user.setActive(true);

        user.setAccountLocked(false);

        user.setFailedLoginAttempts(0);

        // -------------------------------------------------
        // Audit information
        // -------------------------------------------------

        user.setCreatedBy(
                "SELF_SIGNUP"
        );

        user.setUpdatedBy(
                "SELF_SIGNUP"
        );

        // -------------------------------------------------
        // Save
        // -------------------------------------------------

        User savedUser =
                userRepository.save(user);

        // -------------------------------------------------
        // Return safe response
        // -------------------------------------------------

        return convertToResponse(
                savedUser
        );
    }

    // =====================================================
    // LOGIN
    // =====================================================

    public LoginResponse login(
            LoginRequest request) {

        // -------------------------------------------------
        // Normalize email
        // -------------------------------------------------

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        // -------------------------------------------------
        // Find user
        // -------------------------------------------------

        User user =
                userRepository
                        .findByEmailIgnoreCase(email)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Invalid email or password"
                                )
                        );

        // -------------------------------------------------
        // Check active status
        // -------------------------------------------------

        if (!Boolean.TRUE.equals(
                user.getActive())) {

            throw new IllegalArgumentException(
                    "Account is inactive"
            );
        }

        // -------------------------------------------------
        // Check locked status
        // -------------------------------------------------

        if (Boolean.TRUE.equals(
                user.getAccountLocked())) {

            throw new IllegalArgumentException(
                    "Account is locked"
            );
        }

        // -------------------------------------------------
        // Authenticate
        // -------------------------------------------------

        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            email,
                            request.getPassword()
                    )
            );

        } catch (BadCredentialsException e) {

            handleFailedLogin(user);

            throw new IllegalArgumentException(
                    "Invalid email or password"
            );

        } catch (AuthenticationException e) {

            handleFailedLogin(user);

            throw new IllegalArgumentException(
                    "Authentication failed"
            );
        }

        // =================================================
        // LOGIN SUCCESS
        // =================================================

        user.setFailedLoginAttempts(0);

        user.setLastLogin(
                LocalDateTime.now()
        );

        user.setUpdatedBy(
                email
        );

        User savedUser =
                userRepository.save(user);

        // -------------------------------------------------
        // Generate JWT
        // -------------------------------------------------

        String role =
                savedUser.getRole()
                        .trim()
                        .toUpperCase();

        String token =
                jwtUtil.generateToken(
                        email,
                        role
                );

        // -------------------------------------------------
        // Return response
        // -------------------------------------------------

        return new LoginResponse(
                token,
                convertToResponse(
                        savedUser
                )
        );
    }

    // =====================================================
    // FAILED LOGIN
    // =====================================================

    private void handleFailedLogin(
            User user) {

        int attempts =
                user.getFailedLoginAttempts() == null
                        ? 0
                        : user.getFailedLoginAttempts();

        attempts++;

        user.setFailedLoginAttempts(
                attempts
        );

        // -------------------------------------------------
        // Lock account after maximum attempts
        // -------------------------------------------------

        if (attempts >= MAX_FAILED_ATTEMPTS) {

            user.setAccountLocked(true);
        }

        userRepository.save(user);
    }

    // =====================================================
    // CONVERT USER TO RESPONSE
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