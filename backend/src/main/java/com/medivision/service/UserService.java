package com.medivision.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medivision.dto.UserRequest;
import com.medivision.dto.UserResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.User;
import com.medivision.model.UserRole;
import com.medivision.repository.UserRepository;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserResponse> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<UserResponse> searchUsers(String search) {

        String term = search == null ? "" : search.trim();

        if (term.isEmpty()) {
            return getAllUsers();
        }

        return userRepository
                .findByUsernameContainingIgnoreCaseOrFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                        term,
                        term,
                        term
                )
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {

        User user = findUserOrThrow(id);
        return mapToResponse(user);
    }

    public UserResponse createUser(UserRequest request) {

        String username = request.getUsername().trim().toLowerCase();
        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByUsernameIgnoreCase(username)) {
            throw new IllegalArgumentException("Username already exists.");
        }

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new IllegalArgumentException("Email already exists.");
        }

        if (request.getPassword() == null
                || request.getPassword().isBlank()) {

            throw new IllegalArgumentException(
                    "Password is required when creating a user."
            );
        }

        User user = new User();
        user.setUsername(username);
        user.setFullName(request.getFullName().trim());
        user.setEmail(email);
        user.setPhone(normalizePhone(request.getPhone()));
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setRole(UserRole.normalize(request.getRole()));
        user.setActive(
                request.getActive() != null
                        ? request.getActive()
                        : true
        );
        user.setAccountLocked(
                request.getAccountLocked() != null
                        ? request.getAccountLocked()
                        : false
        );
        user.setFailedLoginAttempts(0);
        user.setCreatedBy("ADMIN");
        user.setUpdatedBy("ADMIN");

        return mapToResponse(userRepository.save(user));
    }

    public UserResponse updateUser(
            Long id,
            UserRequest request) {

        User user = findUserOrThrow(id);

        String username = request.getUsername().trim().toLowerCase();
        String email = request.getEmail().trim().toLowerCase();

        userRepository.findByEmailIgnoreCase(email)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new IllegalArgumentException(
                            "Email already exists."
                    );
                });

        if (userRepository.existsByUsernameIgnoreCase(username)
                && !username.equalsIgnoreCase(user.getUsername())) {

            throw new IllegalArgumentException(
                    "Username already exists."
            );
        }

        user.setUsername(username);
        user.setFullName(request.getFullName().trim());
        user.setEmail(email);
        user.setPhone(normalizePhone(request.getPhone()));
        user.setRole(UserRole.normalize(request.getRole()));

        if (request.getPassword() != null
                && !request.getPassword().isBlank()) {

            user.setPassword(
                    passwordEncoder.encode(
                            request.getPassword()
                    )
            );
        }

        if (request.getActive() != null) {
            user.setActive(request.getActive());
        }

        if (request.getAccountLocked() != null) {
            user.setAccountLocked(request.getAccountLocked());
        }

        user.setUpdatedBy("ADMIN");

        return mapToResponse(userRepository.save(user));
    }

    public void deleteUser(Long id) {

        User user = findUserOrThrow(id);
        userRepository.delete(user);
    }

    public UserResponse activateUser(Long id) {

        User user = findUserOrThrow(id);
        user.setActive(true);
        user.setUpdatedBy("ADMIN");
        return mapToResponse(userRepository.save(user));
    }

    public UserResponse deactivateUser(Long id) {

        User user = findUserOrThrow(id);
        user.setActive(false);
        user.setUpdatedBy("ADMIN");
        return mapToResponse(userRepository.save(user));
    }

    public UserResponse lockUser(Long id) {

        User user = findUserOrThrow(id);
        user.setAccountLocked(true);
        user.setUpdatedBy("ADMIN");
        return mapToResponse(userRepository.save(user));
    }

    public UserResponse unlockUser(Long id) {

        User user = findUserOrThrow(id);
        user.setAccountLocked(false);
        user.setFailedLoginAttempts(0);
        user.setUpdatedBy("ADMIN");
        return mapToResponse(userRepository.save(user));
    }

    private User findUserOrThrow(Long id) {

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with ID : " + id
                        )
                );
    }

    private String normalizePhone(String phone) {

        if (phone == null || phone.isBlank()) {
            return null;
        }

        return phone.trim();
    }

    private UserResponse mapToResponse(User user) {

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole());
        response.setActive(user.getActive());
        response.setAccountLocked(user.getAccountLocked());
        response.setCreatedAt(user.getCreatedAt());
        response.setUpdatedAt(user.getUpdatedAt());
        response.setLastLogin(user.getLastLogin());
        response.setCreatedBy(user.getCreatedBy());
        response.setUpdatedBy(user.getUpdatedBy());
        return response;
    }
}
