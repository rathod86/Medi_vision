package com.medivision.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.medivision.model.User;

@Repository
public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmailIgnoreCase(
            String email
    );

    boolean existsByEmailIgnoreCase(
            String email
    );

    boolean existsByUsernameIgnoreCase(
            String username
    );

    long countByActiveTrue();

    long countByActiveFalse();

    long countByAccountLockedTrue();

    long countByRoleIgnoreCase(
            String role
    );

    List<User>
    findByUsernameContainingIgnoreCaseOrFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String username,
            String fullName,
            String email
    );
}
