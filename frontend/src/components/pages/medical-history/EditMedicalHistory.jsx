import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import MedicalHistoryForm from "../../medical-history/MedicalHistoryForm";

import {
    getMedicalHistoryById,
    updateMedicalHistory
} from "../../../services/medicalHistoryService";

import API from "../../../api/axiosConfig";

import "./EditMedicalHistory.css";

const EditMedicalHistory = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [medicalHistory, setMedicalHistory] = useState(null);

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD DATA
    // =====================================================

    useEffect(() => {

        loadData();

    }, [id]);


    // =====================================================
    // LOAD MEDICAL HISTORY + PATIENTS + DOCTORS
    // =====================================================

    const loadData = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                historyResponse,
                patientsResponse,
                doctorsResponse
            ] = await Promise.all([
                getMedicalHistoryById(id),
                API.get("/patients"),
                API.get("/doctors")
            ]);


            // -------------------------------------------------
            // MEDICAL HISTORY
            // -------------------------------------------------

            setMedicalHistory(
                historyResponse
            );


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
                "Error loading medical history:",
                err
            );

            setError(
                getErrorMessage(
                    err,
                    "Unable to load medical history."
                )
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // UPDATE MEDICAL HISTORY
    // =====================================================

    const handleSubmit = async (formData) => {

        try {

            setSaving(true);
            setError("");

            console.log(
                "Updating Medical History:",
                formData
            );


            const response =
                await updateMedicalHistory(
                    id,
                    formData
                );


            console.log(
                "Medical History updated:",
                response
            );


            alert(
                "Medical History updated successfully."
            );


            navigate(
                "/medical-histories"
            );

        } catch (err) {

            console.error(
                "Error updating medical history:",
                err
            );

            const message =
                getErrorMessage(
                    err,
                    "Failed to update medical history."
                );

            setError(message);

            alert(message);

        } finally {

            setSaving(false);

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

        if (error?.response?.data) {

            const data =
                error.response.data;


            // String response
            if (typeof data === "string") {
                return data;
            }


            // Validation errors
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


            // Standard Spring message
            if (data.message) {
                return data.message;
            }


            if (data.error) {
                return data.error;
            }
        }


        // Network error
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
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="edit-medical-history-page">

                <div className="medical-history-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading medical history...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // ERROR / NOT FOUND
    // =====================================================

    if (!medicalHistory) {

        return (
            <div className="edit-medical-history-page">

                <div className="medical-history-not-found">

                    <h2>
                        Medical History Not Found
                    </h2>

                    <p>
                        {error ||
                            "The requested medical history does not exist."}
                    </p>

                    <button
                        type="button"
                        className="back-button"
                        onClick={handleCancel}
                    >
                        ← Back to Medical Histories
                    </button>

                </div>

            </div>
        );
    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="edit-medical-history-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="edit-medical-history-header">

                <div>

                    <h1>
                        Edit Medical History
                    </h1>

                    <p>
                        Update the patient's medical
                        history information.
                    </p>

                    {medicalHistory.historyNumber && (

                        <div className="history-number">

                            Record:
                            <strong>
                                {" "}
                                {medicalHistory.historyNumber}
                            </strong>

                        </div>

                    )}

                </div>


                <button
                    type="button"
                    className="back-button"
                    onClick={handleCancel}
                    disabled={saving}
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

            <div className="edit-medical-history-card">

                <MedicalHistoryForm

                    initialData={medicalHistory}

                    patients={patients}

                    doctors={doctors}

                    onSubmit={handleSubmit}

                    onCancel={handleCancel}

                    loading={saving}

                    isEdit={true}

                />

            </div>

        </div>
    );
};


export default EditMedicalHistory;