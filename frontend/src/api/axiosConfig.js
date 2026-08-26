import axios from "axios";


// =====================================================
// API CONFIGURATION
// =====================================================

const API = axios.create({

    baseURL: "http://localhost:8080",

    headers: {
        "Content-Type": "application/json"
    },

    timeout: 15000
});


// =====================================================
// NORMALIZE API PATHS
// =====================================================
//
// Backend routes live under /api/* (e.g. /api/patients).
// Auth stays at /auth/*.
// Services may call "/patients" or "/api/patients" — both work.
// =====================================================

const resolveApiPath = (url) => {

    if (!url || typeof url !== "string") {
        return url;
    }

    if (
        url.startsWith("http://") ||
        url.startsWith("https://")
    ) {
        return url;
    }

    if (
        url.startsWith("/auth") ||
        url.startsWith("/api/")
    ) {
        return url;
    }

    return `/api${url.startsWith("/") ? url : `/${url}`}`;
};


// =====================================================
// REQUEST INTERCEPTOR
// =====================================================
//
// Automatically sends JWT with every API request.
//
// Header:
//
// Authorization: Bearer <JWT>
// =====================================================

API.interceptors.request.use(

    (config) => {

        config.url = resolveApiPath(config.url);

        const token =
            localStorage.getItem(
                "accessToken"
            );


        // -------------------------------------------------
        // ADD JWT TOKEN
        // -------------------------------------------------

        if (token) {

            config.headers =
                config.headers || {};

            config.headers.Authorization =
                `Bearer ${token}`;
        }


        return config;
    },


    (error) => {

        return Promise.reject(
            error
        );
    }
);


// =====================================================
// RESPONSE INTERCEPTOR
// =====================================================
//
// Handles authentication failures.
//
// 401 = JWT missing / invalid / expired
//
// 403 = authenticated but not authorized
// =====================================================

API.interceptors.response.use(

    (response) => {

        return response;
    },


    (error) => {

        const status =
            error.response?.status;


        // =================================================
        // UNAUTHORIZED
        // =================================================

        if (status === 401) {

            localStorage.removeItem(
                "accessToken"
            );

            localStorage.removeItem(
                "currentUser"
            );


            // ---------------------------------------------
            // Notify AuthContext
            // ---------------------------------------------

            window.dispatchEvent(
                new Event(
                    "auth:logout"
                )
            );
        }


        // =================================================
        // FORBIDDEN
        // =================================================
        //
        // Do NOT logout automatically here.
        //
        // Example:
        // Normal user tries /api/users
        // Backend returns 403.
        //
        // User is still logged in.
        // =================================================

        if (status === 403) {

            console.warn(
                "Access denied. You do not have permission to access this resource."
            );
        }


        return Promise.reject(
            error
        );
    }
);


// =====================================================
// EXPORT
// =====================================================

export default API;