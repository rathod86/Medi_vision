package com.medivision.model;

public enum UserRole {

    ADMIN,
    DOCTOR,
    PATIENT,
    NURSE,
    RECEPTIONIST,
    LAB_TECHNICIAN,
    PHARMACIST;

    public static boolean isValid(String role) {

        if (role == null || role.isBlank()) {
            return false;
        }

        try {
            valueOf(role.trim().toUpperCase());
            return true;
        } catch (IllegalArgumentException ex) {
            return false;
        }
    }

    public static String normalize(String role) {

        if (!isValid(role)) {
            throw new IllegalArgumentException(
                    "Invalid role. Allowed roles: ADMIN, DOCTOR, PATIENT, NURSE, "
                            + "RECEPTIONIST, LAB_TECHNICIAN, PHARMACIST"
            );
        }

        return role.trim().toUpperCase();
    }
}
