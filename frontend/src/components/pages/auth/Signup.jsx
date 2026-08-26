import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { signup } from "../../../services/authService";

import "./Signup.css";


const Signup = () => {

    const navigate = useNavigate();


    // =====================================================
    // FORM STATE
    // =====================================================

    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });


    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };


    // =====================================================
    // VALIDATION
    // =====================================================

    const validateForm = () => {

        if (!formData.username.trim()) {
            return "Username is required.";
        }

        if (formData.username.trim().length < 3) {
            return "Username must contain at least 3 characters.";
        }


        if (!formData.fullName.trim()) {
            return "Full name is required.";
        }


        if (!formData.email.trim()) {
            return "Email is required.";
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(formData.email.trim())) {
            return "Please enter a valid email address.";
        }


        if (
            formData.phone &&
            !/^[0-9]{10}$/.test(formData.phone.trim())
        ) {
            return "Phone number must contain 10 digits.";
        }


        if (!formData.password) {
            return "Password is required.";
        }


        if (formData.password.length < 8) {
            return "Password must contain at least 8 characters.";
        }


        if (
            formData.password !==
            formData.confirmPassword
        ) {
            return "Passwords do not match.";
        }


        return null;
    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        const validationError =
            validateForm();

        if (validationError) {

            setError(validationError);

            return;
        }


        try {

            setLoading(true);


            const response = await signup({
                username:
                    formData.username.trim(),

                fullName:
                    formData.fullName.trim(),

                email:
                    formData.email.trim().toLowerCase(),

                phone:
                    formData.phone.trim(),

                password:
                    formData.password,
            });


            console.log(
                "Signup successful:",
                response
            );


            setSuccess(
                "Account created successfully. Redirecting to login..."
            );


            // Clear password fields

            setFormData((previous) => ({
                ...previous,
                password: "",
                confirmPassword: "",
            }));


            // Redirect to login

            setTimeout(() => {

                navigate("/login", {
                    replace: true,
                    state: {
                        email:
                            formData.email
                                .trim()
                                .toLowerCase(),

                        signupSuccess: true,
                    },
                });

            }, 1200);


        } catch (error) {

            console.error(
                "Signup error:",
                error
            );


            const message =
                error?.message ||
                "Unable to create account.";

            setError(message);


        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="signup-page">

            <div className="signup-card">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="signup-header">

                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Create your Medi Vision account
                    </p>

                </div>


                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (

                    <div className="signup-error">
                        {error}
                    </div>

                )}


                {/* =================================================
                    SUCCESS
                ================================================= */}

                {success && (

                    <div className="signup-success">
                        {success}
                    </div>

                )}


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                    onSubmit={handleSubmit}
                >


                    {/* USERNAME */}

                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            autoComplete="username"
                        />

                    </div>


                    {/* FULL NAME */}

                    <div className="form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            autoComplete="name"
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="form-group">

                        <label>
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            autoComplete="email"
                        />

                    </div>


                    {/* PHONE */}

                    <div className="form-group">

                        <label>
                            Phone
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter 10-digit phone number"
                            maxLength={10}
                            autoComplete="tel"
                        />

                    </div>


                    {/* PASSWORD */}

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Minimum 8 characters"
                            autoComplete="new-password"
                        />

                    </div>


                    {/* CONFIRM PASSWORD */}

                    <div className="form-group">

                        <label>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm password"
                            autoComplete="new-password"
                        />

                    </div>


                    {/* SUBMIT */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="signup-button"
                    >

                        {loading
                            ? "Creating Account..."
                            : "Create Account"
                        }

                    </button>

                </form>


                {/* =================================================
                    LOGIN LINK
                ================================================= */}

                <div className="signup-footer">

                    <span>
                        Already have an account?
                    </span>

                    {" "}

                    <Link to="/login">
                        Login
                    </Link>

                </div>


                {/* =================================================
                    DEVELOPMENT WARNING
                ================================================= */}

                <div className="signup-note">

                    <strong>
                        Patient Registration
                    </strong>

                    <p>
                        New accounts are created as patients.
                        Staff roles are assigned by an administrator.
                    </p>

                </div>

            </div>

        </div>
    );
};


export default Signup;