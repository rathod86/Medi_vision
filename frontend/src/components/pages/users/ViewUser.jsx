import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getUserById } from "../../../services/userService";

import "./ViewUser.css";

const ViewUser = () => {

    // =====================================================
    // ROUTER
    // =====================================================

    const { id } = useParams();
    const navigate = useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD USER
    // =====================================================

    useEffect(() => {

        const loadUser = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getUserById(id);

                setUser(data);

            } catch (err) {

                console.error(
                    "Error loading user:",
                    err
                );

                const message =
                    err?.response?.data?.message ||
                    "Failed to load user details.";

                setError(message);

            } finally {

                setLoading(false);
            }
        };


        if (id) {
            loadUser();
        }

    }, [id]);


    // =====================================================
    // BACK
    // =====================================================

    const handleBack = () => {

        navigate("/users");
    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = () => {

        navigate(`/users/edit/${id}`);
    };


    // =====================================================
    // FORMAT ROLE
    // =====================================================

    const formatRole = (role) => {

        if (!role) {
            return "N/A";
        }

        return role
            .replace(/_/g, " ")
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };


    const formatDate = (date) => {

        if (!date) {
            return "N/A";
        }

        try {

            return new Date(date)
                .toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                });

        } catch {

            return "N/A";
        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="view-user-page">

                <div className="view-user-loading">
                    Loading user details...
                </div>

            </div>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (
            <div className="view-user-page">

                <div
                    className="view-user-error"
                    role="alert"
                >
                    {error}
                </div>

                <button
                    type="button"
                    className="view-user-btn secondary"
                    onClick={handleBack}
                >
                    Back to Users
                </button>

            </div>
        );
    }


    // =====================================================
    // USER NOT FOUND
    // =====================================================

    if (!user) {

        return (
            <div className="view-user-page">

                <div className="view-user-error">
                    User not found.
                </div>

                <button
                    type="button"
                    className="view-user-btn secondary"
                    onClick={handleBack}
                >
                    Back to Users
                </button>

            </div>
        );
    }


    // =====================================================
    // USER STATUS
    // =====================================================

    const isActive =
        user.active !== false;

    const isLocked =
        user.accountLocked === true;


    // =====================================================
    // JSX
    // =====================================================

    return (
        <div className="view-user-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="view-user-header">

                <div>

                    <h1>
                        User Details
                    </h1>

                    <p>
                        View hospital staff account
                        information.
                    </p>

                </div>


                <div className="view-user-header-actions">

                    <button
                        type="button"
                        className="view-user-btn secondary"
                        onClick={handleBack}
                    >
                        Back
                    </button>

                    <button
                        type="button"
                        className="view-user-btn primary"
                        onClick={handleEdit}
                    >
                        Edit User
                    </button>

                </div>

            </div>


            {/* =================================================
                USER PROFILE
            ================================================= */}

            <div className="view-user-card">

                <div className="view-user-profile">

                    <div className="view-user-avatar">
                        {(
                            user.fullName ||
                            user.username ||
                            "U"
                        )
                            .charAt(0)
                            .toUpperCase()}
                    </div>


                    <div className="view-user-profile-info">

                        <h2>
                            {user.fullName ||
                                user.username ||
                                "N/A"}
                        </h2>

                        <p>
                            @{user.username || "N/A"}
                        </p>

                    </div>

                </div>


                {/* =================================================
                    ACCOUNT STATUS
                ================================================= */}

                <div className="view-user-statuses">

                    <span
                        className={
                            isActive
                                ? "view-user-status active"
                                : "view-user-status inactive"
                        }
                    >
                        {isActive
                            ? "Active"
                            : "Inactive"}
                    </span>


                    <span
                        className={
                            isLocked
                                ? "view-user-status locked"
                                : "view-user-status normal"
                        }
                    >
                        {isLocked
                            ? "Account Locked"
                            : "Account Normal"}
                    </span>

                </div>

            </div>


            {/* =================================================
                USER INFORMATION
            ================================================= */}

            <div className="view-user-card">

                <h2 className="view-user-section-title">
                    User Information
                </h2>


                <div className="view-user-grid">

                    {/* ID */}

                    <div className="view-user-field">

                        <span>
                            User ID
                        </span>

                        <strong>
                            {user.id ?? "N/A"}
                        </strong>

                    </div>


                    {/* Username */}

                    <div className="view-user-field">

                        <span>
                            Username
                        </span>

                        <strong>
                            {user.username || "N/A"}
                        </strong>

                    </div>


                    {/* Full Name */}

                    <div className="view-user-field">

                        <span>
                            Full Name
                        </span>

                        <strong>
                            {user.fullName || "N/A"}
                        </strong>

                    </div>


                    {/* Email */}

                    <div className="view-user-field">

                        <span>
                            Email
                        </span>

                        <strong>
                            {user.email || "N/A"}
                        </strong>

                    </div>


                    {/* Phone */}

                    <div className="view-user-field">

                        <span>
                            Phone Number
                        </span>

                        <strong>
                            {user.phone || "N/A"}
                        </strong>

                    </div>


                    {/* Role */}

                    <div className="view-user-field">

                        <span>
                            Role
                        </span>

                        <strong>
                            {formatRole(user.role)}
                        </strong>

                    </div>


                    {/* Active */}

                    <div className="view-user-field">

                        <span>
                            Account Status
                        </span>

                        <strong>
                            {isActive
                                ? "Active"
                                : "Inactive"}
                        </strong>

                    </div>


                    {/* Locked */}

                    <div className="view-user-field">

                        <span>
                            Account Security
                        </span>

                        <strong>
                            {isLocked
                                ? "Locked"
                                : "Not Locked"}
                        </strong>

                    </div>


                    {/* Created At */}

                    <div className="view-user-field">

                        <span>
                            Created On
                        </span>

                        <strong>
                            {formatDate(user.createdAt)}
                        </strong>

                    </div>


                    {/* Updated At */}

                    <div className="view-user-field">

                        <span>
                            Last Updated
                        </span>

                        <strong>
                            {formatDate(user.updatedAt)}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="view-user-actions">

                <button
                    type="button"
                    className="view-user-btn secondary"
                    onClick={handleBack}
                >
                    Back to Users
                </button>

                <button
                    type="button"
                    className="view-user-btn primary"
                    onClick={handleEdit}
                >
                    Edit User
                </button>

            </div>

        </div>
    );
};

export default ViewUser;