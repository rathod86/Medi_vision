
import API from "../api/axiosConfig";

// =====================================================
// GET ALL NURSES
// GET /api/nurses
// =====================================================

export const getAllNurses = async () => {
    const response = await API.get("/nurses");

    return response.data;
};


// =====================================================
// GET NURSE BY ID
// GET /api/nurses/{id}
// =====================================================

export const getNurseById = async (id) => {
    const response = await API.get(
        `/nurses/${id}`
    );

    return response.data;
};


// =====================================================
// ADD NURSE
// POST /api/nurses
// =====================================================

export const addNurse = async (nurse) => {
    const response = await API.post(
        "/nurses",
        nurse
    );

    return response.data;
};


// =====================================================
// UPDATE NURSE
// PUT /api/nurses/{id}
// =====================================================

export const updateNurse = async (
    id,
    nurse
) => {
    const response = await API.put(
        `/nurses/${id}`,
        nurse
    );

    return response.data;
};


// =====================================================
// DELETE NURSE
// DELETE /api/nurses/{id}
// =====================================================

export const deleteNurse = async (id) => {
    const response = await API.delete(
        `/nurses/${id}`
    );

    return response.data;
};


// =====================================================
// SEARCH NURSES BY NAME
// GET /api/nurses/search/name?name=John
// =====================================================

export const searchNursesByName = async (name) => {
    const response = await API.get(
        "/nurses/search/name",
        {
            params: {
                name
            }
        }
    );

    return response.data;
};


// =====================================================
// GET NURSES BY DEPARTMENT
// GET /api/nurses/department/{department}
// =====================================================

export const getNursesByDepartment = async (
    department
) => {
    const response = await API.get(
        `/nurses/department/${encodeURIComponent(department)}`
    );

    return response.data;
};


// =====================================================
// GET NURSES BY SHIFT
// GET /api/nurses/shift/{shift}
// =====================================================

export const getNursesByShift = async (
    shift
) => {
    const response = await API.get(
        `/nurses/shift/${encodeURIComponent(shift)}`
    );

    return response.data;
};


// =====================================================
// GET NURSES BY STATUS
// GET /api/nurses/status/{status}
// =====================================================

export const getNursesByStatus = async (
    status
) => {
    const response = await API.get(
        `/nurses/status/${encodeURIComponent(status)}`
    );

    return response.data;
};


// =====================================================
// GET NURSES BY DEPARTMENT + STATUS
// GET /api/nurses/department/{department}/status/{status}
// =====================================================

export const getNursesByDepartmentAndStatus = async (
    department,
    status
) => {
    const response = await API.get(
        `/nurses/department/${encodeURIComponent(department)}/status/${encodeURIComponent(status)}`
    );

    return response.data;
};


// =====================================================
// GET TOTAL NURSES
// GET /api/nurses/statistics/total
// =====================================================

export const getTotalNurses = async () => {
    const response = await API.get(
        "/nurses/statistics/total"
    );

    return response.data;
};


// =====================================================
// GET ACTIVE NURSES
// GET /api/nurses/statistics/active
// =====================================================

export const getActiveNurses = async () => {
    const response = await API.get(
        "/nurses/statistics/active"
    );

    return response.data;
};


// =====================================================
// GET INACTIVE NURSES
// GET /api/nurses/statistics/inactive
// =====================================================

export const getInactiveNurses = async () => {
    const response = await API.get(
        "/nurses/statistics/inactive"
    );

    return response.data;
};


// =====================================================
// GET NURSES ON LEAVE
// GET /api/nurses/statistics/on-leave
// =====================================================

export const getOnLeaveNurses = async () => {
    const response = await API.get(
        "/nurses/statistics/on-leave"
    );

    return response.data;
};