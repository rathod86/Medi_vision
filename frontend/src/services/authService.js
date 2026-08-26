import API from "../api/axiosConfig";


// =====================================================
// LOGIN
// POST /auth/login
// =====================================================

export const login = async (email, password) => {

    if (!email || !password) {
        throw new Error(
            "Email and password are required."
        );
    }

    try {

        const response =
            await API.post(
                "/auth/login",
                {
                    email:
                        email
                            .trim()
                            .toLowerCase(),

                    password,
                }
            );

        if (!response.data?.token) {
            throw new Error(
                "Login failed. Authentication token was not received."
            );
        }

        return response.data;

    } catch (error) {

        console.error(
            "Login error:",
            error
        );

        if (error.response?.data) {

            const data =
                error.response.data;

            if (typeof data === "string") {
                throw new Error(data);
            }

            if (data.message) {
                throw new Error(
                    data.message
                );
            }

            if (data.error) {
                throw new Error(
                    data.error
                );
            }
        }

        if (error.response?.status === 401) {
            throw new Error(
                "Invalid email or password."
            );
        }

        if (error.response?.status === 403) {
            throw new Error(
                "Your account is inactive or locked."
            );
        }

        if (error.response?.status === 400) {
            throw new Error(
                "Invalid login request. Please check your email and password."
            );
        }

        if (error.response?.status === 500) {
            throw new Error(
                "Server error. Please try again later."
            );
        }

        if (!error.response) {
            throw new Error(
                "Unable to connect to the server."
            );
        }

        throw error;
    }
};


// =====================================================
// SIGNUP
// POST /auth/signup
// =====================================================

export const signup = async (userData) => {

    if (!userData) {
        throw new Error(
            "Signup information is required."
        );
    }

    try {

        const payload = {

            username:
                userData.username
                    ?.trim(),

            fullName:
                userData.fullName
                    ?.trim(),

            email:
                userData.email
                    ?.trim()
                    .toLowerCase(),

            phone:
                userData.phone
                    ?.trim() || null,

            password:
                userData.password,
        };

        const response =
            await API.post(
                "/auth/signup",
                payload
            );

        if (!response.data) {
            throw new Error(
                "Signup failed. No response received."
            );
        }

        return response.data;

    } catch (error) {

        console.error(
            "Signup error:",
            error
        );

        if (error.response?.data) {

            const data =
                error.response.data;

            if (typeof data === "string") {
                throw new Error(data);
            }

            if (data.message) {
                throw new Error(
                    data.message
                );
            }

            if (data.error) {
                throw new Error(
                    data.error
                );
            }

            if (data.errors) {
                const messages =
                    Object.values(
                        data.errors
                    ).join(", ");

                throw new Error(messages);
            }
        }

        if (error.response?.status === 400) {
            throw new Error(
                "Invalid signup information. Please check all fields."
            );
        }

        if (error.response?.status === 409) {
            throw new Error(
                "Email or username already exists."
            );
        }

        if (error.response?.status === 500) {
            throw new Error(
                "Server error. Please try again later."
            );
        }

        if (!error.response) {
            throw new Error(
                "Unable to connect to the server."
            );
        }

        throw error;
    }
};


// =====================================================
// CURRENT USER
// GET /auth/me
// =====================================================

export const getCurrentUser = async () => {

    try {

        const response =
            await API.get(
                "/auth/me"
            );

        return response.data;

    } catch (error) {

        console.error(
            "Get current user error:",
            error
        );

        if (error.response?.status === 401) {
            throw new Error(
                "Authentication required."
            );
        }

        if (!error.response) {
            throw new Error(
                "Unable to connect to the server."
            );
        }

        throw error;
    }
};


// =====================================================
// LOGOUT
// =====================================================
//
// Backend uses JWT — no server-side logout endpoint.
// Token removal is handled by AuthContext.
// =====================================================

export const logout = async () => {
    return Promise.resolve();
};
