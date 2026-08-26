import API from "../api/axiosConfig";


const normalizeTime = (value) => {

    if (!value || String(value).trim() === "") {
        return null;
    }

    return value;
};


const normalizePrescriptionPayload = (data = {}) => {

    const payload = {
        patientId: Number(data.patientId),
        doctorId: Number(data.doctorId),
        symptoms: data.symptoms?.trim() || "",
        diagnosis: data.diagnosis?.trim() || "",
        allergies: data.allergies?.trim() || null,
        clinicalNotes: data.clinicalNotes?.trim() || null,
        doctorRemarks: data.doctorRemarks?.trim() || null,
        prescriptionDate: data.prescriptionDate,
        followUpDate: data.followUpDate || null,
        status: data.status || "Draft",
        medicines: (data.medicines || []).map((medicine) => ({
            medicineId: Number(medicine.medicineId),
            dosage: medicine.dosage?.trim() || "",
            route: medicine.route?.trim() || "",
            frequency: medicine.frequency?.trim() || "",
            duration: medicine.duration?.trim() || "",
            quantity: Number(medicine.quantity) || 1,
            morning: Boolean(medicine.morning),
            afternoon: Boolean(medicine.afternoon),
            night: Boolean(medicine.night),
            morningTime: normalizeTime(medicine.morningTime),
            afternoonTime: normalizeTime(medicine.afternoonTime),
            nightTime: normalizeTime(medicine.nightTime),
            foodInstruction: medicine.foodInstruction?.trim() || null,
            specialInstructions: medicine.specialInstructions?.trim() || null,
            reminderEnabled: Boolean(medicine.reminderEnabled),
        })),
    };

    if (data.appointmentId) {
        payload.appointmentId = Number(data.appointmentId);
    }

    if (data.admissionId) {
        payload.admissionId = Number(data.admissionId);
    }

    return payload;
};


export const addPrescription = (prescription) => {
    return API.post(
        "/prescriptions",
        normalizePrescriptionPayload(prescription)
    );
};


export const updatePrescription = (id, prescription) => {
    return API.put(
        `/prescriptions/${id}`,
        normalizePrescriptionPayload(prescription)
    );
};

/**
 * ==========================================
 * DELETE PRESCRIPTION
 * ==========================================
 */

export const deletePrescription = (id) => {
    return API.delete(`/prescriptions/${id}`);
};

/**
 * ==========================================
 * DELETE MULTIPLE PRESCRIPTIONS
 * ==========================================
 */

export const deleteMultiplePrescriptions = (ids) => {
    return API.delete("/prescriptions", {
        data: ids,
    });
};

/**
 * ==========================================
 * GET ALL PRESCRIPTIONS
 * ==========================================
 */

export const getAllPrescriptions = async () => {
    const response = await API.get("/prescriptions");
    return response.data;
};

/**
 * ==========================================
 * GET PRESCRIPTION BY ID
 * ==========================================
 */

export const getPrescriptionById = (id) => {
    return API.get(`/prescriptions/${id}`);
};

/**
 * ==========================================
 * GET PRESCRIPTION BY NUMBER
 * ==========================================
 */

export const getPrescriptionByNumber = (number) => {
    return API.get(`/prescriptions/number/${number}`);
};

/**
 * ==========================================
 * GET BY PATIENT
 * ==========================================
 */

export const getPrescriptionsByPatient = (patientId) => {
    return API.get(`/prescriptions/patient/${patientId}`);
};

/**
 * ==========================================
 * GET BY DOCTOR
 * ==========================================
 */

export const getPrescriptionsByDoctor = (doctorId) => {
    return API.get(`/prescriptions/doctor/${doctorId}`);
};

/**
 * ==========================================
 * GET LATEST PRESCRIPTIONS
 * ==========================================
 */

export const getLatestPrescriptions = () => {
    return API.get("/prescriptions/latest");
};

/**
 * ==========================================
 * SEARCH PATIENT
 * ==========================================
 */

export const searchPatient = async (patientName) => {
    const response = await API.get(
        `/prescriptions/search/patient?patientName=${encodeURIComponent(patientName)}`
    );
    return response.data;
};

/**
 * ==========================================
 * SEARCH DOCTOR
 * ==========================================
 */

export const searchDoctor = (doctorName) => {
    return API.get(
        `/prescriptions/search/doctor?doctorName=${encodeURIComponent(doctorName)}`
    );
};

/**
 * ==========================================
 * SEARCH DIAGNOSIS
 * ==========================================
 */

export const searchDiagnosis = (diagnosis) => {
    return API.get(
        `/prescriptions/search/diagnosis?diagnosis=${encodeURIComponent(diagnosis)}`
    );
};

/**
 * ==========================================
 * SEARCH SYMPTOMS
 * ==========================================
 */

export const searchSymptoms = (symptoms) => {
    return API.get(
        `/prescriptions/search/symptoms?symptoms=${encodeURIComponent(symptoms)}`
    );
};

/**
 * ==========================================
 * FILTER BY STATUS
 * ==========================================
 */

export const getPrescriptionsByStatus = (status) => {
    return API.get(`/prescriptions/status/${status}`);
};

/**
 * ==========================================
 * FILTER BY DATE
 * ==========================================
 */

export const getPrescriptionsByDate = (date) => {
    return API.get(`/prescriptions/date?date=${date}`);
};

/**
 * ==========================================
 * FILTER BY DATE RANGE
 * ==========================================
 */

export const getPrescriptionsByDateRange = (
    startDate,
    endDate
) => {
    return API.get(
        `/prescriptions/date-range?startDate=${startDate}&endDate=${endDate}`
    );
};

/**
 * ==========================================
 * FOLLOW-UP DATE
 * ==========================================
 */

export const getFollowUpDate = (followUpDate) => {
    return API.get(
        `/prescriptions/follow-up?followUpDate=${followUpDate}`
    );
};

/**
 * ==========================================
 * FOLLOW-UP DATE RANGE
 * ==========================================
 */

export const getFollowUpDateRange = (
    startDate,
    endDate
) => {
    return API.get(
        `/prescriptions/follow-up-range?startDate=${startDate}&endDate=${endDate}`
    );
};

/**
 * ==========================================
 * DASHBOARD STATISTICS
 * ==========================================
 */

export const getPrescriptionStatistics = async () => {
    const response = await API.get("/prescriptions/statistics");
    return response.data;
};

/**
 * ==========================================
 * TOTAL PRESCRIPTIONS
 * ==========================================
 */

export const getTotalPrescriptions = () => {
    return API.get("/prescriptions/statistics/total");
};

/**
 * ==========================================
 * TODAY'S PRESCRIPTIONS
 * ==========================================
 */

export const getTodayPrescriptions = () => {
    return API.get("/prescriptions/statistics/today");
};

/**
 * ==========================================
 * PATIENT PRESCRIPTION COUNT
 * ==========================================
 */

export const getPatientPrescriptionCount = (
    patientId
) => {
    return API.get(
        `/prescriptions/statistics/patient/${patientId}`
    );
};

/**
 * ==========================================
 * DOCTOR PRESCRIPTION COUNT
 * ==========================================
 */

export const getDoctorPrescriptionCount = (
    doctorId
) => {
    return API.get(
        `/prescriptions/statistics/doctor/${doctorId}`
    );
};