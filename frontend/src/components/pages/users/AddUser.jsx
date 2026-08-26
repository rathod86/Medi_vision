import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

import UserForm from "../../user/UserForm";
import { createUser } from "../../../services/userService";

import "./AddUser.css";

const AddUser = () => {

    // =====================================================
    // NAVIGATION
    // =====================================================

    const navigate = useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    // =====================================================
    // CREATE USER
    // =====================================================

    const handleSubmit = async (userData) => {

        // Prevent duplicate submission
        if (loading) {
            return;
        }


        try {

            setLoading(true);

            setError("");


            // =================================================
            // CREATE USER API
            // =================================================

            await createUser(userData);


            // =================================================
            // SUCCESS
            // =================================================

            navigate(
                "/users",
                {
                    replace: true,
                    state: {
                        message:
                            "User account created successfully."
                    }
                }
            );

        } catch (err) {

            console.error(
                "Error creating user:",
                err
            );


            // =================================================
            // GET BACKEND ERROR
            // =================================================

            let message =
                "Failed to create user. Please try again.";


            if (err?.response?.data) {

                const data =
                    err.response.data;


                // Spring Boot message
                if (
                    typeof data === "object"
                    && data.message
                ) {

                    message =
                        data.message;

                }

                // Backend returns String
                else if (
                    typeof data === "string"
                ) {

                    message =
                        data;
                }

                // Validation errors
                else if (
                    typeof data === "object"
                    && data.errors
                ) {

                    if (Array.isArray(data.errors)) {

                        message =
                            data.errors.join(", ");

                    } else {

                        message =
                            Object.values(
                                data.errors
                            ).join(", ");
                    }
                }
            }


            // =================================================
            // DISPLAY ERROR
            // =================================================

            setError(message);

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancel = () => {

        if (loading) {
            return;
        }


        navigate("/users");
    };


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
                        Add User
                    </h1>

                    <p>
                        Create a new hospital staff account.
                    </p>

                </div>

                <button
                    type="button"
                    className="user-back-btn"
                    onClick={handleCancel}
                    disabled={loading}
                >
                    <FaArrowLeft />
                    Back to Users
                </button>

            </div>


            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

                <div
                    className="user-error"
                    role="alert"
                    aria-live="polite"
                >

                    {error}

                </div>

            )}


            {/* =================================================
                USER FORM
            ================================================= */}

            <UserForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isEdit={false}
                loading={loading}
            />

        </div>
    );
};


export default AddUser;