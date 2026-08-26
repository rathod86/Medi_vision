import API from "../api/axiosConfig";

// =====================================================
// GET ALL MEDICAL HISTORIES
// GET /api/medical-histories
// =====================================================

export const getAllMedicalHistories = async () => {
    const response = await API.get("/medical-histories");

    return response.data;
};


// =====================================================
// GET MEDICAL HISTORY BY ID
// GET /api/medical-histories/{id}
// =====================================================

export const getMedicalHistoryById = async (id) => {

    if (!id) {
        throw new Error(
            "Medical History ID is required."
        );
    }

    const response = await API.get(
        `/medical-histories/${id}`
    );

    return response.data;
};


// =====================================================
// ADD MEDICAL HISTORY
// POST /api/medical-histories
// =====================================================

export const addMedicalHistory = async (
    medicalHistory
) => {

    if (!medicalHistory) {
        throw new Error(
            "Medical History data is required."
        );
    }

    const response = await API.post(
        "/medical-histories",
        medicalHistory
    );

    return response.data;
};


// =====================================================
// UPDATE MEDICAL HISTORY
// PUT /api/medical-histories/{id}
// =====================================================

export const updateMedicalHistory = async (
    id,
    medicalHistory
) => {

    if (!id) {
        throw new Error(
            "Medical History ID is required."
        );
    }

    if (!medicalHistory) {
        throw new Error(
            "Medical History data is required."
        );
    }

    const response = await API.put(
        `/medical-histories/${id}`,
        medicalHistory
    );

    return response.data;
};


// =====================================================
// DELETE MEDICAL HISTORY
// DELETE /api/medical-histories/{id}
// =====================================================

export const deleteMedicalHistory = async (id) => {

    if (!id) {
        throw new Error(
            "Medical History ID is required."
        );
    }

    const response = await API.delete(
        `/medical-histories/${id}`
    );

    return response.data;
};


// =====================================================
// GET MEDICAL HISTORIES BY PATIENT
// GET /api/medical-histories/patient/{patientId}
// =====================================================

export const getMedicalHistoriesByPatient = async (
    patientId
) => {

    if (!patientId) {
        throw new Error(
            "Patient ID is required."
        );
    }

    const response = await API.get(
        `/medical-histories/patient/${patientId}`
    );

    return response.data;
};


// =====================================================
// GET MEDICAL HISTORIES BY DOCTOR
// GET /api/medical-histories/doctor/{doctorId}
// =====================================================

export const getMedicalHistoriesByDoctor = async (
    doctorId
) => {

    if (!doctorId) {
        throw new Error(
            "Doctor ID is required."
        );
    }

    const response = await API.get(
        `/medical-histories/doctor/${doctorId}`
    );

    return response.data;
};


// =====================================================
// GET MEDICAL HISTORIES BY STATUS
// GET /api/medical-histories/status/{status}
// =====================================================

export const getMedicalHistoriesByStatus = async (
    status
) => {

    if (!status) {
        throw new Error(
            "Status is required."
        );
    }

    const response = await API.get(
        `/medical-histories/status/${encodeURIComponent(
            status
        )}`
    );

    return response.data;
};


// =====================================================
// GET LATEST MEDICAL HISTORIES
// GET /api/medical-histories/latest
// =====================================================

export const getLatestMedicalHistories = async () => {

    const response = await API.get(
        "/medical-histories/latest"
    );

    return response.data;
};


// =====================================================
// GET LATEST HISTORIES BY PATIENT
// GET /api/medical-histories/patient/{patientId}/latest
// =====================================================

export const getLatestMedicalHistoriesByPatient = async (
    patientId
) => {

    if (!patientId) {
        throw new Error(
            "Patient ID is required."
        );
    }

    const response = await API.get(
        `/medical-histories/patient/${patientId}/latest`
    );

    return response.data;
};


// =====================================================
// GET TOTAL MEDICAL HISTORIES
// GET /api/medical-histories/statistics/total
// =====================================================

export const getTotalMedicalHistories = async () => {

    const response = await API.get(
        "/medical-histories/statistics/total"
    );

    return response.data;
};


// =====================================================
// GET ACTIVE MEDICAL HISTORIES COUNT
// GET /api/medical-histories/statistics/active
// =====================================================

export const getActiveMedicalHistories = async () => {

    const response = await API.get(
        "/medical-histories/statistics/active"
    );

    return response.data;
};


// =====================================================
// GET CHRONIC MEDICAL HISTORIES COUNT
// GET /api/medical-histories/statistics/chronic
// =====================================================

export const getChronicMedicalHistories = async () => {

    const response = await API.get(
        "/medical-histories/statistics/chronic"
    );

    return response.data;
};


// =====================================================
// GET RESOLVED MEDICAL HISTORIES COUNT
// GET /api/medical-histories/statistics/resolved
// =====================================================

export const getResolvedMedicalHistories = async () => {

    const response = await API.get(
        "/medical-histories/statistics/resolved"
    );

    return response.data;
};


// =====================================================
// GET STATISTICS
//
// NOTE:
// This function first tries a combined statistics
// endpoint. If your backend does not have that endpoint,
// the list page can calculate statistics locally.
// =====================================================

export const getMedicalHistoryStatistics = async () => {

    try {

        const response = await API.get(
            "/medical-histories/statistics"
        );

        return response.data;

    } catch (error) {

        // Keep the original error available to the caller.
        throw error;
    }
};