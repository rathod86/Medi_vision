import API from "../api/axiosConfig";

const API_URL = "/billings";

const normalizeBillingPayload = (billingData = {}) => ({
    billNumber: (billingData.billNumber || "").trim(),
    patientId: billingData.patientId ? Number(billingData.patientId) : null,
    doctorId: billingData.doctorId ? Number(billingData.doctorId) : null,
    admissionId: billingData.admissionId ? Number(billingData.admissionId) : null,
    consultationCharges: billingData.consultationCharges ? Number(billingData.consultationCharges) : 0,
    roomCharges: billingData.roomCharges ? Number(billingData.roomCharges) : 0,
    medicineCharges: billingData.medicineCharges ? Number(billingData.medicineCharges) : 0,
    labCharges: billingData.labCharges ? Number(billingData.labCharges) : 0,
    surgeryCharges: billingData.surgeryCharges ? Number(billingData.surgeryCharges) : 0,
    icuCharges: billingData.icuCharges ? Number(billingData.icuCharges) : 0,
    otherCharges: billingData.otherCharges ? Number(billingData.otherCharges) : 0,
    discount: billingData.discount ? Number(billingData.discount) : 0,
    tax: billingData.tax ? Number(billingData.tax) : 0,
    paidAmount: billingData.paidAmount ? Number(billingData.paidAmount) : 0,
    paymentStatus: (billingData.paymentStatus || "PENDING").trim(),
    paymentMethod: (billingData.paymentMethod || "").trim(),
    billingDate: billingData.billingDate || null,
    dueDate: billingData.dueDate || null,
    notes: (billingData.notes || "").trim(),
});

export const getAllBillings = async () => {
    const response = await API.get(API_URL);
    return response.data;
};

export const getBillingById = async (id) => {
    const response = await API.get(`${API_URL}/${id}`);
    return response.data;
};

export const createBilling = async (billing) => {
    const payload = normalizeBillingPayload(billing);
    const response = await API.post(API_URL, payload);
    return response.data;
};

export const updateBilling = async (id, billing) => {
    const payload = normalizeBillingPayload(billing);
    const response = await API.put(`${API_URL}/${id}`, payload);
    return response.data;
};

export const deleteBilling = async (id) => {
    const response = await API.delete(`${API_URL}/${id}`);
    return response.data;
};