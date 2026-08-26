package com.medivision.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medivision.dto.SignupRequest;
import com.medivision.model.User;
import com.medivision.model.UserRole;
import com.medivision.repository.UserRepository;

@Service
@Transactional
public class SignupService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public SignupService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository =
                userRepository;

        this.passwordEncoder =
                passwordEncoder;
    }


    // =====================================================
    // SIGNUP
    // =====================================================

    public User signup(
            SignupRequest request) {

        // -------------------------------------------------
        // Request validation
        // -------------------------------------------------

        if (request == null) {

            throw new IllegalArgumentException(
                    "Signup request is required."
            );
        }


        // -------------------------------------------------
        // Username
        // -------------------------------------------------

        if (request.getUsername() == null ||
                request.getUsername().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Username is required."
            );
        }


        // -------------------------------------------------
        // Full name
        // -------------------------------------------------

        if (request.getFullName() == null ||
                request.getFullName().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Full name is required."
            );
        }


        // -------------------------------------------------
        // Email
        // -------------------------------------------------

        if (request.getEmail() == null ||
                request.getEmail().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Email is required."
            );
        }


        // -------------------------------------------------
        // Password
        // -------------------------------------------------

        if (request.getPassword() == null ||
                request.getPassword().trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Password is required."
            );
        }


        // =================================================
        // NORMALIZE DATA
        // =================================================

        String username =
                request.getUsername()
                        .trim()
                        .toLowerCase();

        String fullName =
                request.getFullName()
                        .trim();

        String email =
                request.getEmail()
                        .trim()
                        .toLowerCase();

        String phone =
                request.getPhone() == null
                        ? null
                        : request.getPhone().trim();


        // =================================================
        // CHECK USERNAME
        // =================================================

        if (userRepository
                .existsByUsernameIgnoreCase(username)) {

            throw new IllegalArgumentException(
                    "Username already exists."
            );
        }


        // =================================================
        // CHECK EMAIL
        // =================================================

        if (userRepository
                .existsByEmailIgnoreCase(email)) {

            throw new IllegalArgumentException(
                    "Email already registered."
            );
        }


        // =================================================
        // CREATE USER
        // =================================================

        User user = new User();


        // -------------------------------------------------
        // Basic information
        // -------------------------------------------------

        user.setUsername(username);

        user.setFullName(fullName);

        user.setEmail(email);

        user.setPhone(
                phone == null || phone.isEmpty()
                        ? null
                        : phone
        );


        // =================================================
        // PASSWORD
        // =================================================

        /*
         * NEVER save the plain password.
         *
         * Example:
         *
         * Patient@123
         *
         * becomes a BCrypt hash.
         */

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );


        // =================================================
        // ROLE
        // =================================================

        /*
         * Public signup is PATIENT only.
         *
         * ADMIN can create:
         *
         * ADMIN
         * DOCTOR
         * NURSE
         * RECEPTIONIST
         * LAB_TECHNICIAN
         * PHARMACIST
         *
         * through User Management.
         */

        user.setRole(
                UserRole.PATIENT.name()
        );


        // =================================================
        // ACCOUNT STATUS
        // =================================================

        user.setActive(true);

        user.setAccountLocked(false);

        user.setFailedLoginAttempts(0);


        // =================================================
        // AUDIT
        // =================================================

        user.setCreatedBy(
                "SELF_SIGNUP"
        );

        user.setUpdatedBy(
                "SELF_SIGNUP"
        );


        // =================================================
        // SAVE
        // =================================================

        return userRepository.save(user);
    }
}