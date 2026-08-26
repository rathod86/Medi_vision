package com.medivision.security;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    // =====================================================
    // JWT FILTER
    // =====================================================

    private final JwtFilter jwtFilter;

    // =====================================================
    // OBJECT MAPPER
    // =====================================================

    private final ObjectMapper objectMapper;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public SecurityConfig(
            JwtFilter jwtFilter,
            ObjectMapper objectMapper) {

        this.jwtFilter = jwtFilter;
        this.objectMapper = objectMapper;
    }

    // =====================================================
    // SECURITY FILTER CHAIN
    // =====================================================

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {

        http

            // =================================================
            // CSRF
            // =================================================

            .csrf(csrf ->
                    csrf.disable()
            )

            // =================================================
            // CORS
            // =================================================

            .cors(cors ->
                    cors.configurationSource(
                            corsConfigurationSource()
                    )
            )

            // =================================================
            // SESSION MANAGEMENT
            // =================================================

            .sessionManagement(session ->
                    session.sessionCreationPolicy(
                            SessionCreationPolicy.STATELESS
                    )
            )

            // =================================================
            // EXCEPTION HANDLING
            // =================================================

            .exceptionHandling(ex -> ex

                    // -----------------------------------------
                    // 401 UNAUTHORIZED
                    // -----------------------------------------

                    .authenticationEntryPoint(
                            (request,
                             response,
                             authException) ->

                                    writeError(
                                            response,
                                            HttpStatus.UNAUTHORIZED,
                                            "Authentication required"
                                    )
                    )

                    // -----------------------------------------
                    // 403 FORBIDDEN
                    // -----------------------------------------

                    .accessDeniedHandler(
                            (request,
                             response,
                             accessDeniedException) ->

                                    writeError(
                                            response,
                                            HttpStatus.FORBIDDEN,
                                            "Access denied"
                                    )
                    )
            )

            // =================================================
            // AUTHORIZATION
            // =================================================

            .authorizeHttpRequests(auth -> auth

                    // =================================================
                    // PUBLIC ENDPOINTS
                    // =================================================

                    .requestMatchers(

                            // Authentication
                            "/auth/login",
                            "/auth/signup",

                            // Swagger
                            "/swagger-ui/**",
                            "/swagger-ui.html",
                            "/v3/api-docs/**",

                            // Uploaded files
                            "/uploads/**"
                    )
                    .permitAll()


                    // =================================================
                    // ADMIN ONLY
                    // =================================================

                    .requestMatchers(
                            "/api/users/**",
                            "/api/dashboard/**",
                            "/api/admin/**"
                    )
                    .hasRole("ADMIN")


                    // =================================================
                    // AUTHENTICATED USER
                    // =================================================

                    .requestMatchers(
                            "/auth/me"
                    )
                    .authenticated()


                    // =================================================
                    // ALL OTHER API ENDPOINTS
                    // =================================================

                    .requestMatchers(
                            "/api/**"
                    )
                    .authenticated()


                    // =================================================
                    // OTHER REQUESTS
                    // =================================================

                    .anyRequest()
                    .permitAll()
            )

            // =================================================
            // JWT FILTER
            // =================================================

            .addFilterBefore(
                    jwtFilter,
                    UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }

    // =====================================================
    // ERROR RESPONSE
    // =====================================================

    private void writeError(
            HttpServletResponse response,
            HttpStatus status,
            String message)
            throws IOException {

        response.setStatus(
                status.value()
        );

        response.setContentType(
                MediaType.APPLICATION_JSON_VALUE
        );

        Map<String, String> body =
                new HashMap<>();

        body.put(
                "message",
                message
        );

        objectMapper.writeValue(
                response.getOutputStream(),
                body
        );
    }

    // =====================================================
    // CORS CONFIGURATION
    // =====================================================

    @Bean
    public CorsConfigurationSource
    corsConfigurationSource() {

        CorsConfiguration config =
                new CorsConfiguration();

        // -------------------------------------------------
        // Frontend URLs
        // -------------------------------------------------

        config.setAllowedOrigins(
                List.of(
                        "http://localhost:5173",
                        "http://localhost:5174",
                        "http://localhost:5175"
                )
        );

        // -------------------------------------------------
        // HTTP methods
        // -------------------------------------------------

        config.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        // -------------------------------------------------
        // Headers
        // -------------------------------------------------

        config.setAllowedHeaders(
                List.of("*")
        );

        // -------------------------------------------------
        // Response headers
        // -------------------------------------------------

        config.setExposedHeaders(
                List.of(
                        "Authorization"
                )
        );

        // -------------------------------------------------
        // Credentials
        // -------------------------------------------------

        config.setAllowCredentials(true);

        // -------------------------------------------------
        // Register CORS configuration
        // -------------------------------------------------

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                config
        );

        return source;
    }

    // =====================================================
    // AUTHENTICATION MANAGER
    // =====================================================

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration
                .getAuthenticationManager();
    }
}