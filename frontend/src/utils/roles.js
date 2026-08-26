export const ROLES = {
    ADMIN: "ADMIN",
    DOCTOR: "DOCTOR",
    PATIENT: "PATIENT",
    NURSE: "NURSE",
    RECEPTIONIST: "RECEPTIONIST",
    LAB_TECHNICIAN: "LAB_TECHNICIAN",
    PHARMACIST: "PHARMACIST"
};

export const ROLE_LABELS = {
    ADMIN: "Administrator",
    DOCTOR: "Doctor",
    PATIENT: "Patient",
    NURSE: "Nurse",
    RECEPTIONIST: "Receptionist",
    LAB_TECHNICIAN: "Lab Technician",
    PHARMACIST: "Pharmacist"
};

export const normalizeRole = (role) => {
    if (!role) {
        return "";
    }

    return role.trim().toUpperCase();
};