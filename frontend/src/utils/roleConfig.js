// =====================================================
// ROLE CONFIGURATION
// =====================================================

export const ROLES = {
    ADMIN: "ADMIN",
    DOCTOR: "DOCTOR",
    PATIENT: "PATIENT",
    NURSE: "NURSE",
    RECEPTIONIST: "RECEPTIONIST",
    LAB_TECHNICIAN: "LAB_TECHNICIAN",
    PHARMACIST: "PHARMACIST",
};


// =====================================================
// NORMALIZE ROLE
// =====================================================

export const normalizeRole = (role) => {

    if (
        !role ||
        typeof role !== "string"
    ) {
        return "";
    }

    return role
        .trim()
        .toUpperCase();
};


// =====================================================
// VALID ROLE
// =====================================================

export const isValidRole = (role) => {

    const normalizedRole =
        normalizeRole(role);

    return Object.values(
        ROLES
    ).includes(
        normalizedRole
    );
};


// =====================================================
// HOME ROUTE
// =====================================================

export const getHomeRouteForRole = (role) => {

    const normalizedRole =
        normalizeRole(role);

    if (
        isValidRole(
            normalizedRole
        )
    ) {
        return "/dashboard";
    }

    return "/login";
};


// =====================================================
// ROLE CHECK
// =====================================================

export const hasRole = (
    userRole,
    requiredRole
) => {

    return (
        normalizeRole(userRole) ===
        normalizeRole(requiredRole)
    );
};


// =====================================================
// MULTIPLE ROLE CHECK
// =====================================================

export const hasAnyRole = (
    userRole,
    allowedRoles = []
) => {

    const normalizedUserRole =
        normalizeRole(userRole);

    if (
        !Array.isArray(
            allowedRoles
        )
    ) {
        return false;
    }

    return allowedRoles.some(
        (role) =>
            normalizeRole(role) ===
            normalizedUserRole
    );
};


// =====================================================
// ROLE DISPLAY NAME
// =====================================================

export const getRoleDisplayName = (
    role
) => {

    switch (
        normalizeRole(role)
    ) {

        case ROLES.ADMIN:
            return "Administrator";

        case ROLES.DOCTOR:
            return "Doctor";

        case ROLES.PATIENT:
            return "Patient";

        case ROLES.NURSE:
            return "Nurse";

        case ROLES.RECEPTIONIST:
            return "Receptionist";

        case ROLES.LAB_TECHNICIAN:
            return "Lab Technician";

        case ROLES.PHARMACIST:
            return "Pharmacist";

        default:
            return "User";
    }
};


// =====================================================
// PATH PERMISSIONS
// =====================================================
//
// IMPORTANT:
// These are FRONTEND navigation permissions.
//
// Backend authorization must still protect the APIs.
// =====================================================

const PATH_RULES = [

    // =================================================
    // ADMIN USER MANAGEMENT
    // =================================================

    {
        pattern: /^\/users(?:\/.*)?$/,
        roles: [
            ROLES.ADMIN,
        ],
    },


    // =================================================
    // DOCTORS
    // =================================================

    {
        pattern: /^\/doctors$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
            ROLES.PATIENT,
        ],
    },

    {
        pattern: /^\/doctors\/view\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
            ROLES.PATIENT,
        ],
    },

    {
        pattern: /^\/doctors\/add$/,
        roles: [
            ROLES.ADMIN,
        ],
    },

    {
        pattern: /^\/doctors\/edit\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
        ],
    },


    // =================================================
    // PATIENTS
    // =================================================

    {
        pattern: /^\/patients$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
            ROLES.PHARMACIST,
        ],
    },

    {
        pattern: /^\/patients\/view\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
            ROLES.PHARMACIST,
            ROLES.PATIENT,
        ],
    },

    {
        pattern: /^\/patients\/add$/,
        roles: [
            ROLES.ADMIN,
            ROLES.RECEPTIONIST,
        ],
    },

    {
        pattern: /^\/patients\/edit\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
        ],
    },


    // =================================================
    // APPOINTMENTS
    // =================================================

    {
        pattern: /^\/appointments$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.PATIENT,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
        ],
    },

    {
        pattern: /^\/appointments\/add$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.PATIENT,
            ROLES.RECEPTIONIST,
        ],
    },

    {
        pattern: /^\/appointments\/view\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.PATIENT,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
        ],
    },

    {
        pattern: /^\/appointments\/edit\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.RECEPTIONIST,
        ],
    },


    // =================================================
    // ADMISSIONS
    // =================================================

    {
        pattern: /^\/admissions$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
            ROLES.PATIENT,
            ROLES.PHARMACIST,
        ],
    },

    {
        pattern: /^\/admissions\/view\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
            ROLES.PATIENT,
            ROLES.PHARMACIST,
        ],
    },

    {
        pattern: /^\/admissions\/add$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.RECEPTIONIST,
        ],
    },

    {
        pattern: /^\/admissions\/edit\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
        ],
    },


    // =================================================
    // BILLING
    // =================================================

    {
        pattern: /^\/billing$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.PATIENT,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
        ],
    },

    {
        pattern: /^\/billing\/view\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.PATIENT,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
        ],
    },

    {
        pattern: /^\/billing\/add$/,
        roles: [
            ROLES.ADMIN,
            ROLES.RECEPTIONIST,
        ],
    },

    {
        pattern: /^\/billing\/edit\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.RECEPTIONIST,
        ],
    },


    // =================================================
    // MEDICINES
    // =================================================

    {
        pattern: /^\/medicines$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
            ROLES.PHARMACIST,
        ],
    },

    {
        pattern: /^\/medicines\/view\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
            ROLES.PHARMACIST,
        ],
    },

    {
        pattern: /^\/medicines\/add$/,
        roles: [
            ROLES.ADMIN,
            ROLES.PHARMACIST,
        ],
    },

    {
        pattern: /^\/medicines\/edit\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.PHARMACIST,
        ],
    },


    // =================================================
    // PRESCRIPTIONS
    // =================================================

    {
        pattern: /^\/prescriptions$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.PATIENT,
            ROLES.NURSE,
            ROLES.PHARMACIST,
        ],
    },

    {
        pattern: /^\/prescriptions\/view\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.PATIENT,
            ROLES.NURSE,
            ROLES.PHARMACIST,
        ],
    },

    {
        pattern: /^\/prescriptions\/add$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
        ],
    },

    {
        pattern: /^\/prescriptions\/edit\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
        ],
    },


    // =================================================
    // LABORATORY
    // =================================================

    {
        pattern: /^\/lab-reports$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.PATIENT,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
            ROLES.LAB_TECHNICIAN,
        ],
    },

    {
        pattern: /^\/lab-reports\/view\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.PATIENT,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
            ROLES.LAB_TECHNICIAN,
        ],
    },

    {
        pattern: /^\/lab-reports\/add$/,
        roles: [
            ROLES.ADMIN,
            ROLES.LAB_TECHNICIAN,
        ],
    },

    {
        pattern: /^\/lab-reports\/edit\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.LAB_TECHNICIAN,
        ],
    },


    // =================================================
    // ICU
    // =================================================

    {
        pattern: /^\/icu$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.PATIENT,
        ],
    },

    {
        pattern: /^\/icu-records$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.PATIENT,
            ROLES.PHARMACIST,
        ],
    },

    {
        pattern: /^\/icu-records\/view\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.PATIENT,
            ROLES.PHARMACIST,
        ],
    },

    {
        pattern: /^\/icu-records\/add$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
        ],
    },

    {
        pattern: /^\/icu-records\/edit\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
        ],
    },


    // =================================================
    // NURSES
    // =================================================

    {
        pattern: /^\/nurses$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
        ],
    },

    {
        pattern: /^\/nurses\/view\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
        ],
    },

    {
        pattern: /^\/nurses\/add$/,
        roles: [
            ROLES.ADMIN,
        ],
    },

    {
        pattern: /^\/nurses\/edit\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
        ],
    },


    // =================================================
    // MEDICAL HISTORY
    // =================================================

    {
        pattern: /^\/medical-history$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.PATIENT,
        ],
    },

    {
        pattern: /^\/medical-histories$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.PATIENT,
        ],
    },

    {
        pattern: /^\/medical-histories\/view\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
            ROLES.PATIENT,
        ],
    },

    {
        pattern: /^\/medical-histories\/add$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
        ],
    },

    {
        pattern: /^\/medical-histories\/edit\/[^/]+$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.NURSE,
        ],
    },


    // =================================================
    // SETTINGS
    // =================================================

    {
        pattern: /^\/settings$/,
        roles: [
            ROLES.ADMIN,
            ROLES.DOCTOR,
            ROLES.PATIENT,
            ROLES.NURSE,
            ROLES.RECEPTIONIST,
            ROLES.LAB_TECHNICIAN,
            ROLES.PHARMACIST,
        ],
    },

];


// =====================================================
// PATH ACCESS
// =====================================================

export const canAccessPath = (
    userRole,
    pathname
) => {

    const normalizedRole =
        normalizeRole(
            userRole
        );


    if (
        !isValidRole(
            normalizedRole
        )
    ) {
        return false;
    }


    // Dashboard is available to every valid role.

    if (
        pathname === "/dashboard" ||
        pathname === "/"
    ) {
        return true;
    }


    const rule =
        PATH_RULES.find(
            (item) =>
                item.pattern.test(
                    pathname
                )
        );


    /*
     * If there is no rule, don't automatically
     * expose the page.
     *
     * This is safer for a startup application.
     */

    if (!rule) {
        return false;
    }


    return rule.roles.includes(
        normalizedRole
    );
};


// =====================================================
// ROLE ACCESS HELPER
// =====================================================

export const canAccessRole = (
    userRole,
    allowedRoles = []
) => {

    return hasAnyRole(
        userRole,
        allowedRoles
    );
};