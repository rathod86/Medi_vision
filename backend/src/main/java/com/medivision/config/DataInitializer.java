package com.medivision.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.medivision.model.User;
import com.medivision.model.UserRole;
import com.medivision.repository.UserRepository;

@Configuration
public class DataInitializer {

    // =====================================================
    // INITIAL USERS
    // =====================================================

    @Bean
    @Order(1)
    CommandLineRunner seedDefaultUsers(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,

            // -------------------------------------------------
            // ADMIN
            // -------------------------------------------------

            @Value("${app.admin.email}")
            String adminEmail,

            @Value("${app.admin.password}")
            String adminPassword,

            @Value("${app.admin.username}")
            String adminUsername,

            @Value("${app.admin.full-name}")
            String adminFullName,

            @Value("${app.admin.role}")
            String adminRole,

            // -------------------------------------------------
            // DOCTOR
            // -------------------------------------------------

            @Value("${app.doctor.email}")
            String doctorEmail,

            @Value("${app.doctor.password}")
            String doctorPassword,

            @Value("${app.doctor.username}")
            String doctorUsername,

            @Value("${app.doctor.full-name}")
            String doctorFullName,

            @Value("${app.doctor.role}")
            String doctorRole,

            // -------------------------------------------------
            // PATIENT
            // -------------------------------------------------

            @Value("${app.patient.email}")
            String patientEmail,

            @Value("${app.patient.password}")
            String patientPassword,

            @Value("${app.patient.username}")
            String patientUsername,

            @Value("${app.patient.full-name}")
            String patientFullName,

            @Value("${app.patient.role}")
            String patientRole) {

        return args -> {

            // =================================================
            // CREATE DEFAULT ADMIN
            // =================================================

            createUserIfMissing(
                    userRepository,
                    passwordEncoder,
                    adminEmail,
                    adminPassword,
                    adminUsername,
                    adminFullName,
                    adminRole
            );

            // =================================================
            // CREATE DEFAULT DOCTOR
            // =================================================

            createUserIfMissing(
                    userRepository,
                    passwordEncoder,
                    doctorEmail,
                    doctorPassword,
                    doctorUsername,
                    doctorFullName,
                    doctorRole
            );

            // =================================================
            // CREATE DEFAULT PATIENT
            // =================================================

            createUserIfMissing(
                    userRepository,
                    passwordEncoder,
                    patientEmail,
                    patientPassword,
                    patientUsername,
                    patientFullName,
                    patientRole
            );
        };
    }

    // =====================================================
    // CREATE USER IF MISSING
    // =====================================================

    private void createUserIfMissing(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            String email,
            String password,
            String username,
            String fullName,
            String role) {

        // =================================================
        // VALIDATE REQUIRED VALUES
        // =================================================

        if (email == null ||
                email.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Seed user email cannot be empty."
            );
        }

        if (password == null ||
                password.isBlank()) {

            throw new IllegalArgumentException(
                    "Seed user password cannot be empty."
            );
        }

        if (username == null ||
                username.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Seed username cannot be empty."
            );
        }

        if (fullName == null ||
                fullName.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Seed user full name cannot be empty."
            );
        }

        // =================================================
        // NORMALIZE VALUES
        // =================================================

        String normalizedEmail =
                email.trim().toLowerCase();

        String normalizedUsername =
                username.trim().toLowerCase();

        String normalizedRole =
                UserRole.normalize(role);

        // =================================================
        // CHECK EMAIL
        // =================================================

        if (userRepository
                .existsByEmailIgnoreCase(
                        normalizedEmail)) {

            System.out.println(
                    "User already exists with email: "
                            + normalizedEmail
            );

            return;
        }

        // =================================================
        // CHECK USERNAME
        // =================================================

        if (userRepository
                .existsByUsernameIgnoreCase(
                        normalizedUsername)) {

            System.out.println(
                    "User already exists with username: "
                            + normalizedUsername
            );

            return;
        }

        // =================================================
        // CREATE USER
        // =================================================

        User user =
                new User();

        // -------------------------------------------------
        // Username
        // -------------------------------------------------

        user.setUsername(
                normalizedUsername
        );

        // -------------------------------------------------
        // Full Name
        // -------------------------------------------------

        user.setFullName(
                fullName.trim()
        );

        // -------------------------------------------------
        // Email
        // -------------------------------------------------

        user.setEmail(
                normalizedEmail
        );

        // -------------------------------------------------
        // Phone
        // -------------------------------------------------

        user.setPhone(null);

        // -------------------------------------------------
        // Password
        // -------------------------------------------------

        /*
         * IMPORTANT:
         * Never store the plain password.
         *
         * PasswordEncoder converts it to a secure
         * BCrypt hash before storing it.
         */

        user.setPassword(
                passwordEncoder.encode(
                        password
                )
        );

        // -------------------------------------------------
        // Role
        // -------------------------------------------------

        user.setRole(
                normalizedRole
        );

        // -------------------------------------------------
        // Account Active
        // -------------------------------------------------

        user.setActive(true);

        // -------------------------------------------------
        // Account Locked
        // -------------------------------------------------

        user.setAccountLocked(false);

        // -------------------------------------------------
        // Failed Login Attempts
        // -------------------------------------------------

        user.setFailedLoginAttempts(0);

        // -------------------------------------------------
        // Last Login
        // -------------------------------------------------

        user.setLastLogin(null);

        // -------------------------------------------------
        // Audit Information
        // -------------------------------------------------

        user.setCreatedBy(
                "SYSTEM"
        );

        user.setUpdatedBy(
                "SYSTEM"
        );

        // =================================================
        // SAVE USER
        // =================================================

        userRepository.save(user);

        // =================================================
        // LOG
        // =================================================

        System.out.println(
                "================================="
        );

        System.out.println(
                normalizedRole + " USER CREATED"
        );

        System.out.println(
                "Email: " + normalizedEmail
        );

        System.out.println(
                "Username: " + normalizedUsername
        );

        System.out.println(
                "================================="
        );
    }
}