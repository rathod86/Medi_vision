import { getAllDoctors } from "../services/doctorService";
import { getAllPatients } from "../services/patientService";
import { toArray } from "./apiHelpers";


/**
 * Resolve the clinical doctor record ID for an authenticated user.
 * Falls back to user.doctorId, email/name match, then user.id.
 */
export const resolveDoctorId = async (user) => {

    if (!user) {
        return null;
    }

    if (user.doctorId) {
        return Number(user.doctorId);
    }

    try {

        const doctors = toArray(await getAllDoctors());
        const email = user.email?.trim().toLowerCase();
        const fullName = user.fullName?.trim().toLowerCase();

        const match = doctors.find((doctor) => {

            const doctorEmail =
                doctor.email?.trim().toLowerCase();

            const doctorName =
                doctor.fullName?.trim().toLowerCase();

            return (
                (email && doctorEmail === email) ||
                (fullName && doctorName === fullName)
            );
        });

        if (match?.id) {
            return Number(match.id);
        }

    } catch (error) {

        console.error("Unable to resolve doctor ID:", error);
    }

    return user.id ? Number(user.id) : null;
};


/**
 * Resolve the clinical patient record ID for an authenticated user.
 * Falls back to user.patientId, email/name match, then user.id.
 */
export const resolvePatientId = async (user) => {

    if (!user) {
        return null;
    }

    if (user.patientId) {
        return Number(user.patientId);
    }

    try {

        const patients = toArray(await getAllPatients());
        const email = user.email?.trim().toLowerCase();
        const fullName = user.fullName?.trim().toLowerCase();

        const match = patients.find((patient) => {

            const patientEmail =
                patient.email?.trim().toLowerCase();

            const patientName =
                patient.fullName?.trim().toLowerCase();

            return (
                (email && patientEmail === email) ||
                (fullName && patientName === fullName)
            );
        });

        if (match?.id) {
            return Number(match.id);
        }

    } catch (error) {

        console.error("Unable to resolve patient ID:", error);
    }

    return user.id ? Number(user.id) : null;
};
