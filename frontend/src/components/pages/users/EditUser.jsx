import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import UserForm from "../../user/UserForm";
import {
    getUserById,
    updateUser
} from "../../../services/userService";

import "./EditUser.css";

const EditUser = () => {

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

    const [saving, setSaving] = useState(false);

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
                    "Failed to load user.";

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
    // UPDATE USER
    // =====================================================

    const handleSubmit = async (userData) => {

        try {

            setSaving(true);
            setError("");

            await updateUser(
                id,
                userData
            );

            navigate(
                "/users",
                {
                    state: {
                        message:
                            "User account updated successfully."
                    }
                }
            );

        } catch (err) {

            console.error(
                "Error updating user:",
                err
            );

            const message =
                err?.response?.data?.message ||
                err?.response?.data ||
                "Failed to update user.";

            setError(
                typeof message === "string"
                    ? message
                    : "Failed to update user."
            );

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancel = () => {

        navigate("/users");
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="user-page">

                <div className="user-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading user...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // USER NOT FOUND
    // =====================================================

    if (!user && !error) {

        return (
            <div className="user-page">

                <div className="user-error">
                    User not found.
                </div>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                >
                    Back to Users
                </button>

            </div>
        );
    }


    // =====================================================
    // JSX
    // =====================================================

    return (
        <div className="user-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="user-page-header">

                <div className="user-page-header-content">

                    <h1>
                        Edit User
                    </h1>

                    <p>
                        Update hospital staff account
                        information.
                    </p>

                </div>

                <button
                    type="button"
                    className="user-back-btn"
                    onClick={handleCancel}
                    disabled={saving}
                >
                    <FaArrowLeft />
                    Back to Users
                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div
                    className="user-error"
                    role="alert"
                >
                    {error}
                </div>

            )}


            {/* =================================================
                FORM
            ================================================= */}

            {user && (

                <UserForm
                    initialData={user}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    isEdit={true}
                    loading={saving}
                />

            )}

        </div>
    );
};

export default EditUser;