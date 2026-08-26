import API from "../api/axiosConfig";

const API_URL = "/admissions";

const normalizeAdmissionPayload = (admissionData = {}) => ({
    patientId: admissionData.patientId ? Number(admissionData.patientId) : null,
    doctorId: admissionData.doctorId ? Number(admissionData.doctorId) : null,

    admissionDate: admissionData.admissionDate || null,
    admissionTime: admissionData.admissionTime || null,

    admissionType: admissionData.admissionType?.trim() || "",
    department: admissionData.department?.trim() || "",
    ward: admissionData.ward?.trim() || "",
    roomNumber: admissionData.roomNumber?.trim() || "",
    bedNumber: admissionData.bedNumber?.trim() || "",
    diagnosis: admissionData.diagnosis?.trim() || "",
    symptoms: admissionData.symptoms?.trim() || "",
    reasonForAdmission: admissionData.reasonForAdmission?.trim() || "",
    insuranceProvider: admissionData.insuranceProvider?.trim() || "",
    policyNumber: admissionData.policyNumber?.trim() || "",

    estimatedCost:
        admissionData.estimatedCost === "" || admissionData.estimatedCost == null
            ? 0
            : Number(admissionData.estimatedCost),

    initialDeposit:
        admissionData.initialDeposit === "" || admissionData.initialDeposit == null
            ? 0
            : Number(admissionData.initialDeposit),

    expectedStayDays:
        admissionData.expectedStayDays === "" || admissionData.expectedStayDays == null
            ? 1
            : Number(admissionData.expectedStayDays),

    status: admissionData.status?.trim() || "Admitted",
    notes: admissionData.notes?.trim() || ""
});

// ==========================================
// Get All Admissions
// ==========================================

export const getAllAdmissions = async () => {

    const response = await API.get(API_URL);

    return response.data;

};

// ==========================================
// Get Admission By ID
// ==========================================

export const getAdmissionById = async (id) => {

    const response = await API.get(`${API_URL}/${id}`);

    return response.data;

};

// ==========================================
// Add Admission
// ==========================================

export const createAdmission = async (admission) => {

    const payload = normalizeAdmissionPayload(admission);

    const response = await API.post(API_URL, payload);

    return response.data;

};

// ==========================================
// Update Admission
// ==========================================

export const updateAdmission = async (id, admission) => {

    const payload = normalizeAdmissionPayload(admission);

    const response = await API.put(
        `${API_URL}/${id}`,
        payload
    );

    return response.data;

};

// ==========================================
// Delete Admission
// ==========================================

export const deleteAdmission = async (id) => {

    const response = await API.delete(
        `${API_URL}/${id}`
    );

    return response.data;

};