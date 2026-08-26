package com.medivision.exception;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, String>>
    handleResourceNotFound(
            ResourceNotFoundException ex) {

        return buildResponse(
                ex.getMessage(),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>>
    handleIllegalArgument(
            IllegalArgumentException ex) {

        return buildResponse(
                ex.getMessage(),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>>
    handleValidationErrors(
            MethodArgumentNotValidException ex) {

        String message =
                ex.getBindingResult()
                        .getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .collect(Collectors.joining(", "));

        return buildResponse(
                message,
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>>
    handleBadCredentials(
            BadCredentialsException ex) {

        return buildResponse(
                "Invalid email or password",
                HttpStatus.UNAUTHORIZED
        );
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<Map<String, String>>
    handleDisabledAccount(
            DisabledException ex) {

        return buildResponse(
                "Account is deactivated",
                HttpStatus.FORBIDDEN
        );
    }

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<Map<String, String>>
    handleLockedAccount(
            LockedException ex) {

        return buildResponse(
                "Account is locked",
                HttpStatus.FORBIDDEN
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, String>>
    handleAccessDenied(
            AccessDeniedException ex) {

        return buildResponse(
                "Access denied",
                HttpStatus.FORBIDDEN
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>>
    handleException(
            Exception ex) {

        return buildResponse(
                ex.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }

    private ResponseEntity<Map<String, String>>
    buildResponse(
            String message,
            HttpStatus status) {

        Map<String, String> error =
                new HashMap<>();

        error.put("message", message);

        return new ResponseEntity<>(
                error,
                status
        );
    }
}
