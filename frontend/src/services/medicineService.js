import API from "../api/axiosConfig";

/**
 * Get All Medicines
 */
export const getAllMedicines = async () => {
    const response = await API.get("/medicines");
    return response.data;
};

/**
 * Get Medicine By ID
 */
export const getMedicineById = (id) => {
    return API.get(`/medicines/${id}`);
};

/**
 * Add Medicine
 */
export const addMedicine = (medicine) => {
    return API.post("/medicines", medicine);
};

/**
 * Update Medicine
 */
export const updateMedicine = (id, medicine) => {
    return API.put(`/medicines/${id}`, medicine);
};

/**
 * Delete Medicine
 */
export const deleteMedicine = (id) => {
    return API.delete(`/medicines/${id}`);
};

/**
 * Search Medicine By Name
 */
export const searchMedicine = async (name) => {
    const response = await API.get(`/medicines/search?name=${name}`);
    return response.data;
};

/**
 * Search By Manufacturer
 */
export const searchManufacturer = (manufacturer) => {
    return API.get(`/medicines/manufacturer?manufacturer=${manufacturer}`);
};

/**
 * Get Medicines By Category
 */
export const getMedicinesByCategory = (category) => {
    return API.get(`/medicines/category/${category}`);
};

/**
 * Get Medicines By Status
 */
export const getMedicinesByStatus = (status) => {
    return API.get(`/medicines/status/${status}`);
};

/**
 * Get Low Stock Medicines
 */
export const getLowStockMedicines = () => {
    return API.get("/medicines/low-stock");
};

/**
 * Get Expiring Medicines
 */
export const getExpiringMedicines = () => {
    return API.get("/medicines/expiring");
};

/**
 * Get Expired Medicines
 */
export const getExpiredMedicines = () => {
    return API.get("/medicines/expired");
};

/**
 * Get Medicine Dashboard Statistics
 */
export const getMedicineStatistics = async () => {
    const response = await API.get("/medicines/stats");
    return response.data;
};