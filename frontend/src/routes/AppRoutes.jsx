import React from "react";

import {
    Routes,
    Route,
    Navigate,
} from "react-router-dom";


// =====================================================
// LAYOUT
// =====================================================

import MainLayout from "../layouts/MainLayout";


// =====================================================
// AUTH
// =====================================================

import Login from "../components/pages/auth/Login";
import Signup from "../components/pages/auth/Signup";


// =====================================================
// DASHBOARD
// =====================================================

import Dashboard from "../components/dashboard/Dashboard";


// =====================================================
// PROTECTION
// =====================================================

import ProtectedRoute from "./ProtectedRoute";


// =====================================================
// MODULE ROUTES
// =====================================================

import doctorRoutes from "./DoctorRoutes";
import patientRoutes from "./PatientRoutes";
import appointmentRoutes from "./AppointmentRoutes";
import admissionRoutes from "./AdmissionRoutes";
import billingRoutes from "./BillingRoutes";
import medicineRoutes from "./MedicineRoutes";
import prescriptionRoutes from "./PrescriptionRoutes";
import laboratoryRoutes from "./LaboratoryRoutes";
import icuRecordRoutes from "./ICURecordRoutes";
import nurseRoutes from "./NurseRoutes";
import medicalHistoryRoutes from "./MedicalHistoryRoutes";
import settingsRoutes from "./SettingsRoutes";
import userRoutes from "./UserRoutes";


// =====================================================
// APP ROUTES
// =====================================================

const AppRoutes = () => {

    return (

        <Routes>


            {/* =================================================
                PUBLIC ROUTES
            ================================================= */}

            {/* LOGIN */}

            <Route
                path="/login"
                element={
                    <Login />
                }
            />


            {/* SIGNUP */}

            <Route
                path="/signup"
                element={
                    <Signup />
                }
            />


            {/* =================================================
                PROTECTED APPLICATION
            ================================================= */}

            <Route
                element={
                    <ProtectedRoute />
                }
            >

                <Route
                    element={
                        <MainLayout />
                    }
                >


                    {/* =================================================
                        DASHBOARD
                    ================================================= */}

                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard />
                        }
                    />


                    {/* =================================================
                        ROOT
                    ================================================= */}

                    <Route
                        path="/"
                        element={
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        }
                    />


                    {/* =================================================
                        DOCTORS
                    ================================================= */}

                    {doctorRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        PATIENTS
                    ================================================= */}

                    {patientRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        APPOINTMENTS
                    ================================================= */}

                    {appointmentRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        ADMISSIONS
                    ================================================= */}

                    {admissionRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        BILLING
                    ================================================= */}

                    {billingRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        MEDICINES
                    ================================================= */}

                    {medicineRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        PRESCRIPTIONS
                    ================================================= */}

                    {prescriptionRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        LABORATORY
                    ================================================= */}

                    {laboratoryRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        ICU
                    ================================================= */}

                    {icuRecordRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        NURSES
                    ================================================= */}

                    {nurseRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        MEDICAL HISTORY
                    ================================================= */}

                    {medicalHistoryRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        SETTINGS
                    ================================================= */}

                    {settingsRoutes.map(
                        (route) => (

                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />

                        )
                    )}


                    {/* =================================================
                        ADMIN USER MANAGEMENT
                    ================================================= */}

                    <Route
                        element={
                            <ProtectedRoute
                                adminOnly={true}
                            />
                        }
                    >

                        {userRoutes.map(
                            (route) => (

                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={route.element}
                                />

                            )
                        )}

                    </Route>


                    {/* =================================================
                        LEGACY ROUTES
                    ================================================= */}

                    <Route
                        path="/laboratory"
                        element={
                            <Navigate
                                to="/lab-reports"
                                replace
                            />
                        }
                    />


                </Route>

            </Route>


            {/* =================================================
                404
            ================================================= */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/dashboard"
                        replace
                    />
                }
            />

        </Routes>
    );
};


export default AppRoutes;