import React from "react";

import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
    canAccessPath,
    getHomeRouteForRole,
    normalizeRole,
} from "../utils/roleConfig";


const ProtectedRoute = ({
    adminOnly = false,
    allowedRoles = null,
}) => {

    const {
        isAuthenticated,
        loading,
        isAdmin,
        userRole,
    } = useAuth();


    const location =
        useLocation();


    // =====================================================
    // AUTH LOADING
    // =====================================================

    if (loading) {

        return (

            <div
                className="protected-route-loading"
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "12px",
                }}
            >

                <div
                    className="spinner-border"
                    role="status"
                />

                <p>
                    Checking authentication...
                </p>

            </div>
        );
    }


    // =====================================================
    // NOT AUTHENTICATED
    // =====================================================

    if (!isAuthenticated) {

        return (

            <Navigate
                to="/login"
                replace
                state={{
                    from:
                        location.pathname +
                        location.search,
                }}
            />

        );
    }


    // =====================================================
    // NORMALIZE ROLE
    // =====================================================

    const normalizedRole =
        normalizeRole(
            userRole
        );


    // =====================================================
    // INVALID ROLE
    // =====================================================

    if (!normalizedRole) {

        return (

            <Navigate
                to="/login"
                replace
            />

        );
    }


    // =====================================================
    // ADMIN ONLY
    // =====================================================

    if (
        adminOnly &&
        !isAdmin
    ) {

        return (

            <Navigate
                to="/dashboard"
                replace
            />

        );
    }


    // =====================================================
    // EXPLICIT ROLE RESTRICTION
    // =====================================================

    if (
        Array.isArray(
            allowedRoles
        ) &&
        allowedRoles.length > 0
    ) {

        const normalizedAllowedRoles =
            allowedRoles.map(
                (role) =>
                    normalizeRole(role)
            );


        if (
            !normalizedAllowedRoles.includes(
                normalizedRole
            )
        ) {

            return (

                <Navigate
                    to="/dashboard"
                    replace
                />

            );
        }
    }


    // =====================================================
    // PATH-BASED PERMISSION
    // =====================================================

    if (
        !canAccessPath(
            normalizedRole,
            location.pathname
        )
    ) {

        return (

            <Navigate
                to="/dashboard"
                replace
            />

        );
    }


    // =====================================================
    // AUTHORIZED
    // =====================================================

    return <Outlet />;
};


export default ProtectedRoute;