package com.medivision.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.medivision.model.User;
import com.medivision.repository.UserRepository;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(
            UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(
            String email)
            throws UsernameNotFoundException {

        User user =
                userRepository
                        .findByEmailIgnoreCase(
                                email.trim()
                        )
                        .orElseThrow(() ->
                                new UsernameNotFoundException(
                                        "User not found"
                                )
                        );

        boolean enabled =
                Boolean.TRUE.equals(
                        user.getActive()
                );

        boolean accountNonLocked =
                !Boolean.TRUE.equals(
                        user.getAccountLocked()
                );

        String role =
                user.getRole() == null
                        ? "USER"
                        : user.getRole()
                                .trim()
                                .toUpperCase();

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .disabled(!enabled)
                .accountLocked(!accountNonLocked)
                .authorities(
                        new SimpleGrantedAuthority(
                                "ROLE_" + role
                        )
                )
                .build();
    }
}