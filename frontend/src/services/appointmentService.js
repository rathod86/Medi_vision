import API from "../api/axiosConfig";

// ==========================================
// API Base URL
// ==========================================

const API_URL = "/appointments";

const normalizeAppointmentPayload = (appointmentData = {}) => ({
    ...appointmentData,
    patientId: appointmentData.patientId ? Number(appointmentData.patientId) : null,
    doctorId: appointmentData.doctorId ? Number(appointmentData.doctorId) : null,
    consultationFee:
        appointmentData.consultationFee === "" || appointmentData.consultationFee == null
            ? 0
            : Number(appointmentData.consultationFee),
    department: appointmentData.department?.trim() || "",
    reason: appointmentData.reason?.trim() || "",
    notes: appointmentData.notes?.trim() || "",
    status: appointmentData.status || "Scheduled",
});

// ==========================================
// Get All Appointments
// ==========================================

export const getAllAppointments = async () => {

    try {

        const response = await API.get(API_URL);

        return response.data;

    } catch (error) {

        console.error("Error fetching appointments:", error);

        throw error;

    }

};

// ==========================================
// Get Appointment By ID
// ==========================================

export const getAppointmentById = async (id) => {

    try {

        const response = await API.get(`${API_URL}/${id}`);

        return response.data;

    } catch (error) {

        console.error("Error fetching appointment:", error);

        throw error;

    }

};

// ==========================================
// Create Appointment
// ==========================================

export const createAppointment = async (appointmentData) => {

    try {

        const payload = normalizeAppointmentPayload(appointmentData);

        const response = await API.post(
            API_URL,
            payload
        );

        return response.data;

    } catch (error) {

        console.error("Error creating appointment:", error);

        throw error;

    }

};

// ==========================================
// Update Appointment
// ==========================================

export const updateAppointment = async (
    id,
    appointmentData
) => {

    try {

        const payload = normalizeAppointmentPayload(appointmentData);

        const response = await API.put(
            `${API_URL}/${id}`,
            payload
        );

        return response.data;

    } catch (error) {

        console.error("Error updating appointment:", error);

        throw error;

    }

};

// ==========================================
// Delete Appointment
// ==========================================

export const deleteAppointment = async (id) => {

    try {

        const response = await API.delete(
            `${API_URL}/${id}`
        );

        return response.data;

    } catch (error) {

        console.error("Error deleting appointment:", error);

        throw error;

    }

};

// ==========================================
// Search Appointments
// ==========================================

export const searchAppointments = async (keyword) => {

    try {

        const response = await API.get(
            `${API_URL}/search`,
            {
                params: {
                    keyword,
                },
            }
        );

        return response.data;

    } catch (error) {

        console.error("Error searching appointments:", error);

        throw error;

    }

};

// ==========================================
// Filter Appointments
// ==========================================

export const filterAppointments = async (filters) => {

    try {

        const response = await API.get(
            `${API_URL}/filter`,
            {
                params: filters,
            }
        );

        return response.data;

    } catch (error) {

        console.error("Error filtering appointments:", error);

        throw error;

    }

};

// ==========================================
// Export Appointments to Excel
// ==========================================

export const exportAppointmentsExcel = async () => {

    try {

        const response = await API.get(
            `${API_URL}/export/excel`,
            {
                responseType: "blob",
            }
        );

        return response.data;

    } catch (error) {

        console.error("Error exporting Excel:", error);

        throw error;

    }

};

// ==========================================
// Export Appointments to PDF
// ==========================================

export const exportAppointmentsPdf = async () => {

    try {

        const response = await API.get(
            `${API_URL}/export/pdf`,
            {
                responseType: "blob",
            }
        );

        return response.data;

    } catch (error) {

        console.error("Error exporting PDF:", error);

        throw error;

    }

};