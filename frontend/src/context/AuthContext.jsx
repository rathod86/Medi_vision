import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    login as loginRequest,
    logout as logoutRequest,
    getCurrentUser,
} from "../services/authService";

import {
    normalizeRole,
    getHomeRouteForRole,
} from "../utils/roleConfig";


const AuthContext = createContext(null);


// =====================================================
// JWT USER EXTRACTION
// =====================================================

const getUserFromToken = (token) => {

    if (!token) {
        return null;
    }

    try {

        const parts = token.split(".");

        if (parts.length !== 3) {
            return null;
        }


        const base64Payload =
            parts[1]
                .replace(/-/g, "+")
                .replace(/_/g, "/");


        const payload =
            JSON.parse(
                atob(base64Payload)
            );


        // =================================================
        // TOKEN EXPIRATION
        // =================================================

        if (
            payload.exp &&
            payload.exp * 1000 <= Date.now()
        ) {
            return null;
        }


        const email =
            payload.sub || null;


        const role =
            payload.role
                ? String(
                    payload.role
                )
                    .trim()
                    .toUpperCase()
                : null;


        if (!email) {
            return null;
        }


        return {
            email,
            role,
        };

    } catch (error) {

        console.error(
            "Unable to read JWT:",
            error
        );

        return null;
    }
};


// =====================================================
// CLEAR AUTH DATA
// =====================================================

const clearAuthStorage = () => {

    localStorage.removeItem(
        "accessToken"
    );

    localStorage.removeItem(
        "currentUser"
    );
};


// =====================================================
// GET INITIAL USER
// =====================================================

const getInitialUser = () => {

    const token =
        localStorage.getItem(
            "accessToken"
        );


    if (!token) {

        clearAuthStorage();

        return null;
    }


    const tokenUser =
        getUserFromToken(token);


    if (!tokenUser) {

        clearAuthStorage();

        return null;
    }


    const storedUser =
        localStorage.getItem(
            "currentUser"
        );


    if (storedUser) {

        try {

            const parsedUser =
                JSON.parse(
                    storedUser
                );


            return {
                ...parsedUser,

                email:
                    parsedUser.email ||
                    tokenUser.email,

                role:
                    parsedUser.role ||
                    tokenUser.role,
            };

        } catch (error) {

            console.error(
                "Invalid stored user:",
                error
            );

            localStorage.removeItem(
                "currentUser"
            );
        }
    }


    localStorage.setItem(
        "currentUser",
        JSON.stringify(
            tokenUser
        )
    );


    return tokenUser;
};


// =====================================================
// AUTH PROVIDER
// =====================================================

export const AuthProvider = ({
    children,
}) => {

    const [user, setUser] =
        useState(
            getInitialUser
        );


    const [loading, setLoading] =
        useState(true);


    // =================================================
    // LOAD CURRENT USER
    // =================================================

    const loadCurrentUser = async () => {

        const token =
            localStorage.getItem(
                "accessToken"
            );


        if (!token) {

            setUser(null);

            setLoading(false);

            return;
        }


        const tokenUser =
            getUserFromToken(token);


        if (!tokenUser) {

            clearAuthStorage();

            setUser(null);

            setLoading(false);

            return;
        }


        try {

            /*
             * Ask backend for the latest user.
             *
             * This gives us:
             * id
             * username
             * fullName
             * email
             * phone
             * role
             * active
             * accountLocked
             * createdAt
             * updatedAt
             * lastLogin
             */

            const currentUser =
                await getCurrentUser();


            const updatedUser = {

                ...tokenUser,

                ...currentUser,

                email:
                    currentUser?.email ||
                    tokenUser.email,

                role:
                    currentUser?.role ||
                    tokenUser.role,
            };


            localStorage.setItem(
                "currentUser",
                JSON.stringify(
                    updatedUser
                )
            );


            setUser(
                updatedUser
            );

        } catch (error) {

            console.error(
                "Unable to load current user:",
                error
            );


            /*
             * Do not immediately delete the token
             * for every network error.
             *
             * The JWT itself is still valid.
             */

            setUser(
                tokenUser
            );

        } finally {

            setLoading(false);
        }
    };


    // =================================================
    // INITIAL AUTH CHECK
    // =================================================

    useEffect(() => {

        loadCurrentUser();

    }, []);


    // =================================================
    // LOGIN
    // =================================================

    const login = async (
        email,
        password
    ) => {

        setLoading(true);


        try {

            const data =
                await loginRequest(
                    email,
                    password
                );


            // =================================================
            // TOKEN CHECK
            // =================================================

            if (
                !data ||
                !data.token
            ) {

                throw new Error(
                    "Login failed. Authentication token was not received."
                );
            }


            // =================================================
            // SAVE TOKEN
            // =================================================

            localStorage.setItem(
                "accessToken",
                data.token
            );


            // =================================================
            // READ JWT
            // =================================================

            const tokenUser =
                getUserFromToken(
                    data.token
                );


            if (!tokenUser) {

                throw new Error(
                    "Invalid authentication token received."
                );
            }


            // =================================================
            // BACKEND USER
            // =================================================

            const backendUser =
                data.user || {};


            const loggedInUser = {

                ...tokenUser,

                ...backendUser,

                email:
                    backendUser.email ||
                    tokenUser.email,

                role:
                    backendUser.role ||
                    tokenUser.role,
            };


            // =================================================
            // SAVE USER
            // =================================================

            localStorage.setItem(
                "currentUser",
                JSON.stringify(
                    loggedInUser
                )
            );


            // =================================================
            // UPDATE STATE
            // =================================================

            setUser(
                loggedInUser
            );


            return {
                ...data,

                user:
                    loggedInUser,
            };

        } catch (error) {

            clearAuthStorage();

            setUser(null);

            throw error;

        } finally {

            setLoading(false);
        }
    };


    // =================================================
    // LOGOUT
    // =================================================

    const logout = async () => {

        try {

            await logoutRequest();

        } catch (error) {

            console.error(
                "Logout request failed:",
                error
            );

        } finally {

            clearAuthStorage();

            setUser(null);


            window.dispatchEvent(
                new Event(
                    "auth:logout"
                )
            );
        }
    };


    // =================================================
    // AUTO LOGOUT EVENT
    // =================================================

    useEffect(() => {

        const handleLogout = () => {

            clearAuthStorage();

            setUser(null);
        };


        window.addEventListener(
            "auth:logout",
            handleLogout
        );


        return () => {

            window.removeEventListener(
                "auth:logout",
                handleLogout
            );
        };

    }, []);


    // =================================================
    // TOKEN EXPIRATION CHECK
    // =================================================

    useEffect(() => {

        const checkToken = () => {

            const token =
                localStorage.getItem(
                    "accessToken"
                );


            if (!token) {

                if (user) {
                    setUser(null);
                }

                return;
            }


            const tokenUser =
                getUserFromToken(
                    token
                );


            if (!tokenUser) {

                clearAuthStorage();

                setUser(null);

                window.dispatchEvent(
                    new Event(
                        "auth:logout"
                    )
                );
            }
        };


        checkToken();


        const interval =
            setInterval(
                checkToken,
                60 * 1000
            );


        return () => {

            clearInterval(
                interval
            );
        };

    }, [user]);


    // =================================================
    // ROLE
    // =================================================

    const userRole =
        normalizeRole(
            user?.role
        );


    // =================================================
    // AUTHENTICATION
    // =================================================

    const isAuthenticated =
        !!user &&
        !!localStorage.getItem(
            "accessToken"
        );


    // =================================================
    // ROLE FLAGS
    // =================================================

    const isAdmin =
        userRole === "ADMIN";


    const isDoctor =
        userRole === "DOCTOR";


    const isPatient =
        userRole === "PATIENT";


    const isNurse =
        userRole === "NURSE";


    const isReceptionist =
        userRole === "RECEPTIONIST";


    const isLabTechnician =
        userRole === "LAB_TECHNICIAN";


    const isPharmacist =
        userRole === "PHARMACIST";


    // =================================================
    // HOME ROUTE
    // =================================================

    const getHomeRoute = () => {

        return getHomeRouteForRole(
            userRole
        );
    };


    // =================================================
    // CONTEXT VALUE
    // =================================================

    const value = {

        // -----------------------------------------------
        // USER
        // -----------------------------------------------

        user,

        // -----------------------------------------------
        // LOADING
        // -----------------------------------------------

        loading,

        // -----------------------------------------------
        // AUTHENTICATION
        // -----------------------------------------------

        isAuthenticated,

        // -----------------------------------------------
        // ROLE
        // -----------------------------------------------

        userRole,

        // -----------------------------------------------
        // ROLE FLAGS
        // -----------------------------------------------

        isAdmin,

        isDoctor,

        isPatient,

        isNurse,

        isReceptionist,

        isLabTechnician,

        isPharmacist,

        // -----------------------------------------------
        // ROUTING
        // -----------------------------------------------

        getHomeRoute,

        // -----------------------------------------------
        // ACTIONS
        // -----------------------------------------------

        login,

        logout,
    };


    // =================================================
    // PROVIDER
    // =================================================

    return (

        <AuthContext.Provider
            value={value}
        >

            {children}

        </AuthContext.Provider>
    );
};


// =====================================================
// USE AUTH
// =====================================================

export const useAuth = () => {

    const context =
        useContext(
            AuthContext
        );


    if (!context) {

        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }


    return context;
};