import api from "../api/axiosConfig";

// =====================================================
// GET ALL USERS
// =====================================================

export const getUsers = async () => {

    const response = await api.get("/api/users");

    return response.data;
};


// =====================================================
// GET USER BY ID
// =====================================================

export const getUserById = async (id) => {

    const response =
        await api.get(`/api/users/${id}`);

    return response.data;
};


// =====================================================
// CREATE USER
// =====================================================

export const createUser = async (userData) => {

    const response =
        await api.post(
            "/api/users",
            userData
        );

    return response.data;
};


// =====================================================
// UPDATE USER
// =====================================================

export const updateUser = async (
    id,
    userData
) => {

    const response =
        await api.put(
            `/api/users/${id}`,
            userData
        );

    return response.data;
};


// =====================================================
// DELETE USER
// =====================================================

export const deleteUser = async (id) => {

    const response =
        await api.delete(
            `/api/users/${id}`
        );

    return response.data;
};


// =====================================================
// ACTIVATE USER
// =====================================================

export const activateUser = async (id) => {

    const response =
        await api.patch(
            `/api/users/${id}/activate`
        );

    return response.data;
};


// =====================================================
// DEACTIVATE USER
// =====================================================

export const deactivateUser = async (id) => {

    const response =
        await api.patch(
            `/api/users/${id}/deactivate`
        );

    return response.data;
};


// =====================================================
// LOCK USER
// =====================================================

export const lockUser = async (id) => {

    const response =
        await api.patch(
            `/api/users/${id}/lock`
        );

    return response.data;
};


// =====================================================
// UNLOCK USER
// =====================================================

export const unlockUser = async (id) => {

    const response =
        await api.patch(
            `/api/users/${id}/unlock`
        );

    return response.data;
};


// =====================================================
// SEARCH USERS
// =====================================================

export const searchUsers = async (keyword) => {

    const response =
        await api.get(
            "/api/users/search",
            {
                params: {
                    keyword: keyword
                }
            }
        );

    return response.data;
};


// =====================================================
// GET USERS BY ROLE
// =====================================================

export const getUsersByRole = async (role) => {

    const response =
        await api.get(
            "/api/users/role",
            {
                params: {
                    role: role
                }
            }
        );

    return response.data;
};


// =====================================================
// GET ACTIVE USERS
// =====================================================

export const getActiveUsers = async () => {

    const response =
        await api.get(
            "/api/users/active"
        );

    return response.data;
};


// =====================================================
// GET INACTIVE USERS
// =====================================================

export const getInactiveUsers = async () => {

    const response =
        await api.get(
            "/api/users/inactive"
        );

    return response.data;
};


// =====================================================
// GET LOCKED USERS
// =====================================================

export const getLockedUsers = async () => {

    const response =
        await api.get(
            "/api/users/locked"
        );

    return response.data;
};


// =====================================================
// GET UNLOCKED USERS
// =====================================================

export const getUnlockedUsers = async () => {

    const response =
        await api.get(
            "/api/users/unlocked"
        );

    return response.data;
};

// Backwards-compatible alias: some components import `getAllUsers`
export { getUsers as getAllUsers };