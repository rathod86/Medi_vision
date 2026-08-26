import API from "../api/axiosConfig";

/**
 * ==========================================
 * CREATE LAB REPORT
 * ==========================================
 */

export const addLabReport = (labReport) => {
    return API.post("/lab-reports", labReport);
};

/**
 * ==========================================
 * UPDATE LAB REPORT
 * ==========================================
 */

export const updateLabReport = (id, labReport) => {
    return API.put(`/lab-reports/${id}`, labReport);
};

/**
 * ==========================================
 * DELETE LAB REPORT
 * ==========================================
 */

export const deleteLabReport = (id) => {
    return API.delete(`/lab-reports/${id}`);
};

/**
 * ==========================================
 * GET ALL LAB REPORTS
 * ==========================================
 */

export const getAllLabReports = async () => {
    const response = await API.get("/lab-reports");
    return response.data;
};

/**
 * ==========================================
 * GET LAB REPORT BY ID
 * ==========================================
 */

export const getLabReportById = (id) => {
    return API.get(`/lab-reports/${id}`);
};

/**
 * ==========================================
 * GET REPORTS BY PATIENT
 * ==========================================
 */

export const getReportsByPatient = (patientId) => {
    return API.get(`/lab-reports/patient/${patientId}`);
};

/**
 * ==========================================
 * GET REPORTS BY DOCTOR
 * ==========================================
 */

export const getReportsByDoctor = (doctorId) => {
    return API.get(`/lab-reports/doctor/${doctorId}`);
};

/**
 * ==========================================
 * SEARCH TEST NAME
 * ==========================================
 */

export const searchTestName = (testName) => {
    return API.get(
        `/lab-reports/search/test?testName=${encodeURIComponent(testName)}`
    );
};

/**
 * ==========================================
 * GET REPORTS BY STATUS
 * ==========================================
 */

export const getReportsByStatus = (status) => {
    return API.get(`/lab-reports/status/${status}`);
};

/**
 * ==========================================
 * GET LATEST REPORTS
 * ==========================================
 */

export const getLatestReports = () => {
    return API.get("/lab-reports/latest");
};

/**
 * ==========================================
 * TOTAL REPORTS
 * ==========================================
 */

export const getTotalReports = () => {
    return API.get("/lab-reports/statistics/total");
};

/**
 * ==========================================
 * TODAY REPORTS
 * ==========================================
 */

export const getTodayReports = () => {
    return API.get("/lab-reports/statistics/today");
};

/**
 * ==========================================
 * PATIENT REPORT COUNT
 * ==========================================
 */

export const getPatientReportCount = (patientId) => {
    return API.get(`/lab-reports/statistics/patient/${patientId}`);
};

/**
 * ==========================================
 * DOCTOR REPORT COUNT
 * ==========================================
 */

export const getDoctorReportCount = (doctorId) => {
    return API.get(`/lab-reports/statistics/doctor/${doctorId}`);
};