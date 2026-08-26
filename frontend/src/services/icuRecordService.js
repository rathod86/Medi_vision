import API from "../api/axiosConfig";

// =====================================================
// GET ALL ICU RECORDS
// GET /api/icu-records
// =====================================================

export const getAllICURecords = async () => {
    const response = await API.get("/icu-records");

    return response.data;
};


// =====================================================
// GET ICU RECORD BY ID
// GET /api/icu-records/{id}
// =====================================================

export const getICURecordById = async (id) => {
    const response = await API.get(
        `/icu-records/${id}`
    );

    return response.data;
};


// =====================================================
// ADD ICU RECORD
// POST /api/icu-records
// =====================================================

export const addICURecord = async (icuRecord) => {
    const response = await API.post(
        "/icu-records",
        icuRecord
    );

    return response.data;
};


// =====================================================
// UPDATE ICU RECORD
// PUT /api/icu-records/{id}
// =====================================================

export const updateICURecord = async (
    id,
    icuRecord
) => {
    const response = await API.put(
        `/icu-records/${id}`,
        icuRecord
    );

    return response.data;
};


// =====================================================
// DELETE ICU RECORD
// DELETE /api/icu-records/{id}
// =====================================================

export const deleteICURecord = async (id) => {
    const response = await API.delete(
        `/icu-records/${id}`
    );

    return response.data;
};


// =====================================================
// GET RECORDS BY PATIENT
// GET /api/icu-records/patient/{patientId}
// =====================================================

export const getICURecordsByPatient = async (
    patientId
) => {
    const response = await API.get(
        `/icu-records/patient/${patientId}`
    );

    return response.data;
};


// =====================================================
// GET RECORDS BY DOCTOR
// GET /api/icu-records/doctor/{doctorId}
// =====================================================

export const getICURecordsByDoctor = async (
    doctorId
) => {
    const response = await API.get(
        `/icu-records/doctor/${doctorId}`
    );

    return response.data;
};


// =====================================================
// GET RECORDS BY STATUS
// GET /api/icu-records/status/{status}
// =====================================================

export const getICURecordsByStatus = async (
    status
) => {
    const response = await API.get(
        `/icu-records/status/${status}`
    );

    return response.data;
};


// =====================================================
// GET LATEST ICU RECORDS
// GET /api/icu-records/latest
// =====================================================

export const getLatestICURecords = async () => {
    const response = await API.get(
        "/icu-records/latest"
    );

    return response.data;
};


// =====================================================
// GET TOTAL ICU RECORDS
// GET /api/icu-records/statistics/total
// =====================================================

export const getTotalICURecords = async () => {
    const response = await API.get(
        "/icu-records/statistics/total"
    );

    return response.data;
};


// =====================================================
// GET TODAY'S ICU ADMISSIONS
// GET /api/icu-records/statistics/today
// =====================================================

export const getTodayICUAdmissions = async () => {
    const response = await API.get(
        "/icu-records/statistics/today"
    );

    return response.data;
};


// =====================================================
// GET CRITICAL PATIENTS
// GET /api/icu-records/statistics/critical
// =====================================================

export const getCriticalPatients = async () => {
    const response = await API.get(
        "/icu-records/statistics/critical"
    );

    return response.data;
};


// =====================================================
// GET VENTILATOR PATIENTS
// GET /api/icu-records/statistics/ventilator
// =====================================================

export const getVentilatorPatients = async () => {
    const response = await API.get(
        "/icu-records/statistics/ventilator"
    );

    return response.data;
};


// =====================================================
// GET ISOLATION PATIENTS
// GET /api/icu-records/statistics/isolation
// =====================================================

export const getIsolationPatients = async () => {
    const response = await API.get(
        "/icu-records/statistics/isolation"
    );

    return response.data;
};