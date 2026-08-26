package com.medivision.security;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    // =====================================================
    // JWT SECRET KEY
    // =====================================================

    private final Key key;

    // =====================================================
    // TOKEN EXPIRATION
    // =====================================================

    private final long expiration;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration}") long expiration) {

        if (secret == null || secret.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "JWT secret is required."
            );
        }

        byte[] secretBytes =
                secret.getBytes(StandardCharsets.UTF_8);

        /*
         * HS256 requires a sufficiently strong secret.
         * 32 bytes is the minimum we enforce here.
         */
        if (secretBytes.length < 32) {
            throw new IllegalArgumentException(
                    "JWT secret must contain at least 32 bytes."
            );
        }

        if (expiration <= 0) {
            throw new IllegalArgumentException(
                    "JWT expiration must be greater than 0."
            );
        }

        this.key =
                Keys.hmacShaKeyFor(secretBytes);

        this.expiration =
                expiration;
    }

    // =====================================================
    // GENERATE TOKEN
    // =====================================================

    public String generateToken(
            String email,
            String role) {

        if (email == null ||
                email.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Email is required to generate JWT."
            );
        }

        String normalizedEmail =
                email.trim().toLowerCase();

        String normalizedRole =
                normalizeRole(role);

        Date now =
                new Date();

        Date expiry =
                new Date(
                        now.getTime() + expiration
                );

        return Jwts.builder()

                // -------------------------------------------------
                // SUBJECT
                // -------------------------------------------------

                .setSubject(
                        normalizedEmail
                )

                // -------------------------------------------------
                // ROLE
                // -------------------------------------------------

                .claim(
                        "role",
                        normalizedRole
                )

                // -------------------------------------------------
                // ISSUED TIME
                // -------------------------------------------------

                .setIssuedAt(now)

                // -------------------------------------------------
                // EXPIRATION
                // -------------------------------------------------

                .setExpiration(expiry)

                // -------------------------------------------------
                // SIGNATURE
                // -------------------------------------------------

                .signWith(
                        key,
                        SignatureAlgorithm.HS256
                )

                .compact();
    }

    // =====================================================
    // EXTRACT EMAIL
    // =====================================================

    public String extractEmail(
            String token) {

        return extractClaims(token)
                .getSubject();
    }

    // =====================================================
    // EXTRACT ROLE
    // =====================================================

    public String extractRole(
            String token) {

        String role =
                extractClaims(token)
                        .get(
                                "role",
                                String.class
                        );

        return normalizeRole(role);
    }

    // =====================================================
    // VALIDATE TOKEN
    // =====================================================

    public boolean validateToken(
            String token) {

        try {

            Claims claims =
                    extractClaims(token);

            String email =
                    claims.getSubject();

            if (email == null ||
                    email.trim().isEmpty()) {

                return false;
            }

            Date expirationDate =
                    claims.getExpiration();

            if (expirationDate == null) {

                return false;
            }

            return expirationDate.after(
                    new Date()
            );

        } catch (Exception e) {

            return false;
        }
    }

    // =====================================================
    // EXTRACT ALL CLAIMS
    // =====================================================

    private Claims extractClaims(
            String token) {

        if (token == null ||
                token.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "JWT token is required."
            );
        }

        return Jwts.parserBuilder()

                .setSigningKey(key)

                .build()

                .parseClaimsJws(token)

                .getBody();
    }

    // =====================================================
    // NORMALIZE ROLE
    // =====================================================

    private String normalizeRole(
            String role) {

        if (role == null ||
                role.trim().isEmpty()) {

            return "USER";
        }

        return role
                .trim()
                .toUpperCase();
    }
}