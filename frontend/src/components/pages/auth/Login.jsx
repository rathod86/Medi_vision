import React, {
    useState
} from "react";

import {
    Link,
    useLocation,
    useNavigate
} from "react-router-dom";

import {
    useAuth
} from "../../../context/AuthContext";

import "./Login.css";


const Login = () => {

    const navigate =
        useNavigate();

    const location =
        useLocation();

    const {
        login,
        loading,
        getHomeRoute
    } = useAuth();


    // =====================================================
    // FORM STATE
    // =====================================================

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");


    // =====================================================
    // HANDLE LOGIN
    // =====================================================

    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        setError("");


        // =================================================
        // VALIDATION
        // =================================================

        if (!email.trim()) {

            setError(
                "Email is required."
            );

            return;
        }


        if (!password) {

            setError(
                "Password is required."
            );

            return;
        }


        try {

            // =============================================
            // LOGIN
            // =============================================

            await login(
                email,
                password
            );


            // =============================================
            // GET ROLE-BASED HOME
            // =============================================

            const homeRoute =
                getHomeRoute();


            // =============================================
            // CHECK PREVIOUS LOCATION
            // =============================================

            const from =
                location.state?.from;


            /*
             * If ProtectedRoute redirected the user
             * to login, send them back to that page.
             *
             * Otherwise go to the role dashboard.
             */

            const destination =
                from || homeRoute;


            navigate(
                destination,
                {
                    replace: true
                }
            );


        } catch (err) {

            console.error(
                "Login error:",
                err
            );


            // =============================================
            // STATUS
            // =============================================

            const status =
                err?.response?.status;


            const message =
                err?.message || "";


            // =============================================
            // ACCOUNT LOCKED / INACTIVE
            // =============================================

            if (
                status === 403 ||
                message.toLowerCase().includes(
                    "inactive or locked"
                )
            ) {

                setError(
                    "Your account is inactive or locked."
                );

                return;
            }


            // =============================================
            // INVALID CREDENTIALS
            // =============================================

            if (
                status === 401 ||
                message.toLowerCase().includes(
                    "invalid email or password"
                )
            ) {

                setError(
                    "Invalid email or password."
                );

                return;
            }


            // =============================================
            // BAD REQUEST
            // =============================================

            if (
                status === 400
            ) {

                setError(
                    message ||
                    "Invalid login request. Please check your email and password."
                );

                return;
            }


            // =============================================
            // SERVER ERROR
            // =============================================

            if (
                status === 500
            ) {

                setError(
                    "Server error. Please try again later."
                );

                return;
            }


            // =============================================
            // NETWORK ERROR
            // =============================================

            if (
                !err?.response
            ) {

                setError(
                    "Cannot reach the server. Start the backend on port 8080."
                );

                return;
            }


            // =============================================
            // DEFAULT ERROR
            // =============================================

            if (message) {

                setError(
                    message
                );

            } else {

                setError(
                    "Unable to login. Please try again."
                );
            }
        }
    };


    // =====================================================
    // JSX
    // =====================================================

    return (

        <div className="login-page">

            <div className="login-card">


                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="login-header">

                    <h1>
                        Medi Vision
                    </h1>

                    <p>
                        Hospital Management System
                    </p>

                </div>


                {/* =================================================
                    LOGIN FORM
                ================================================= */}

                <form
                    onSubmit={
                        handleSubmit
                    }
                >


                    {/* =============================================
                        EMAIL
                    ============================================= */}

                    <label htmlFor="login-email">
                        Email
                    </label>

                    <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(event) => {

                            setEmail(
                                event.target.value
                            );

                            if (error) {
                                setError("");
                            }
                        }}
                        placeholder="Enter email"
                        autoComplete="email"
                        disabled={loading}
                    />


                    {/* =============================================
                        PASSWORD
                    ============================================= */}

                    <label htmlFor="login-password">
                        Password
                    </label>

                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(event) => {

                            setPassword(
                                event.target.value
                            );

                            if (error) {
                                setError("");
                            }
                        }}
                        placeholder="Enter password"
                        autoComplete="current-password"
                        disabled={loading}
                    />


                    {/* =============================================
                        ERROR
                    ============================================= */}

                    {error && (

                        <div
                            className="login-error"
                            role="alert"
                        >
                            {error}
                        </div>

                    )}


                    {/* =============================================
                        LOGIN BUTTON
                    ============================================= */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Signing in..."
                            : "Login"
                        }

                    </button>

                </form>


                {/* =================================================
                    SIGNUP SECTION
                ================================================= */}

                <div className="signup-link">

                    <span>
                        Don't have an account?
                    </span>

                    <Link to="/signup">
                        Create Patient Account
                    </Link>

                </div>


                {/* =================================================
                    DEMO / DEVELOPMENT ACCOUNTS
                ================================================= */}

                <div className="login-hint">

                    <div className="login-hint-title">
                        Development Accounts
                    </div>


                    <p>
                        <strong>
                            Admin:
                        </strong>

                        {" "}

                        admin@medivision.com

                        {" / "}

                        Admin@12345
                    </p>


                    <p>
                        <strong>
                            Doctor:
                        </strong>

                        {" "}

                        doctor@medivision.com

                        {" / "}

                        Doctor@12345
                    </p>


                    <p>
                        <strong>
                            Patient:
                        </strong>

                        {" "}

                        patient@medivision.com

                        {" / "}

                        Patient@12345
                    </p>


                    <p>
                        <strong>
                            Nurse:
                        </strong>

                        {" "}

                        nurse@medivision.com

                        {" / "}

                        Nurse@12345
                    </p>


                    <p>
                        <strong>
                            Receptionist:
                        </strong>

                        {" "}

                        receptionist@medivision.com

                        {" / "}

                        Receptionist@12345
                    </p>


                    <p>
                        <strong>
                            Lab Tech:
                        </strong>

                        {" "}

                        lab@medivision.com

                        {" / "}

                        Lab@12345
                    </p>


                    <p>
                        <strong>
                            Pharmacist:
                        </strong>

                        {" "}

                        pharmacist@medivision.com

                        {" / "}

                        Pharmacist@12345
                    </p>

                </div>


                {/* =================================================
                    PATIENT SIGNUP INFORMATION
                ================================================= */}

                <div className="signup-info">

                    <strong>
                        New Patient?
                    </strong>

                    <span>
                        Create your account to access
                        appointments, medical records,
                        prescriptions and more.
                    </span>

                </div>


            </div>

        </div>
    );
};


export default Login;