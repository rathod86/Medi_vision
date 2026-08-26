import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MedicalHistoryForm from "../../medical-history/MedicalHistoryForm";

import {
    addMedicalHistory
} from "../../../services/medicalHistoryService";

import API from "../../../api/axiosConfig";

import "./AddMedicalHistory.css";

const AddMedicalHistory = () => {

    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD PATIENTS + DOCTORS
    // =====================================================

    useEffect(() => {

        loadFormData();

    }, []);


    // =====================================================
    // LOAD FORM DATA
    // =====================================================

    const loadFormData = async () => {

        try {

            setLoadingData(true);
            setError("");

            const [
                patientsResponse,
                doctorsResponse
            ] = await Promise.all([
                API.get("/patients"),
                API.get("/doctors")
            ]);


            // -------------------------------------------------
            // PATIENTS
            // -------------------------------------------------

            const patientData =
                Array.isArray(patientsResponse.data)
                    ? patientsResponse.data
                    : patientsResponse.data?.content || [];

            setPatients(patientData);


            // -------------------------------------------------
            // DOCTORS
            // -------------------------------------------------

            const doctorData =
                Array.isArray(doctorsResponse.data)
                    ? doctorsResponse.data
                    : doctorsResponse.data?.content || [];

            setDoctors(doctorData);

        } catch (err) {

            console.error(
                "Error loading patients/doctors:",
                err
            );

            setError(
                getErrorMessage(
                    err,
                    "Unable to load patients and doctors."
                )
            );

        } finally {

            setLoadingData(false);

        }
    };


    // =====================================================
    // SUBMIT MEDICAL HISTORY
    // =====================================================

    const handleSubmit = async (formData) => {

        try {

            setLoading(true);
            setError("");

            console.log(
                "Submitting Medical History:",
                formData
            );


            // -------------------------------------------------
            // API CALL
            // -------------------------------------------------

            const response =
                await addMedicalHistory(formData);


            console.log(
                "Medical History created:",
                response
            );


            // -------------------------------------------------
            // SUCCESS
            // -------------------------------------------------

            alert(
                "Medical History added successfully."
            );


            navigate(
                "/medical-histories"
            );

        } catch (err) {

            console.error(
                "Error creating medical history:",
                err
            );

            const message =
                getErrorMessage(
                    err,
                    "Failed to create medical history."
                );

            setError(message);

            alert(message);

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancel = () => {

        navigate(
            "/medical-histories"
        );
    };


    // =====================================================
    // ERROR MESSAGE
    // =====================================================

    const getErrorMessage = (
        error,
        defaultMessage
    ) => {

        // -------------------------------------------------
        // Backend response
        // -------------------------------------------------

        if (error?.response?.data) {

            const data =
                error.response.data;


            // String response
            if (typeof data === "string") {
                return data;
            }


            // Spring validation errors
            if (data.errors) {

                if (Array.isArray(data.errors)) {

                    return data.errors
                        .map(
                            (item) =>
                                item.defaultMessage ||
                                item.message ||
                                String(item)
                        )
                        .join("\n");
                }


                if (
                    typeof data.errors === "object"
                ) {

                    return Object.values(
                        data.errors
                    ).join("\n");
                }
            }


            // Standard message
            if (data.message) {
                return data.message;
            }


            // Error field
            if (data.error) {
                return data.error;
            }
        }


        // -------------------------------------------------
        // Network error
        // -------------------------------------------------

        if (
            error?.request &&
            !error?.response
        ) {

            return (
                "Unable to connect to the server. " +
                "Please make sure Spring Boot is running on port 8080."
            );
        }


        return defaultMessage;
    };


    // =====================================================
    // LOADING SCREEN
    // =====================================================

    if (loadingData) {

        return (
            <div className="add-medical-history-page">

                <div className="medical-history-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading patients and doctors...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="add-medical-history-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="add-medical-history-header">

                <div>

                    <h1>
                        Add Medical History
                    </h1>

                    <p>
                        Create a new medical history
                        record for a patient.
                    </p>

                </div>


                <button
                    type="button"
                    className="back-button"
                    onClick={handleCancel}
                    disabled={loading}
                >
                    ← Back to Medical Histories
                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="medical-history-error">

                    <strong>
                        Error:
                    </strong>

                    <span>
                        {error}
                    </span>

                </div>

            )}


            {/* =================================================
                FORM
            ================================================= */}

            <div className="add-medical-history-card">

                <MedicalHistoryForm

                    patients={patients}

                    doctors={doctors}

                    onSubmit={handleSubmit}

                    onCancel={handleCancel}

                    loading={loading}

                    isEdit={false}

                />

            </div>

        </div>
    );
};


export default AddMedicalHistory;