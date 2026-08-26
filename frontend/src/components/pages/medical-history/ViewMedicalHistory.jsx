import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getMedicalHistoryById
} from "../../../services/medicalHistoryService";

import "./ViewMedicalHistory.css";

const ViewMedicalHistory = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [medicalHistory, setMedicalHistory] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD MEDICAL HISTORY
    // =====================================================

    useEffect(() => {

        loadMedicalHistory();

    }, [id]);


    // =====================================================
    // GET MEDICAL HISTORY
    // =====================================================

    const loadMedicalHistory = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getMedicalHistoryById(id);

            setMedicalHistory(data);

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
    // ERROR MESSAGE
    // =====================================================

    const getErrorMessage = (
        error,
        defaultMessage
    ) => {

        if (error?.response?.data) {

            const data =
                error.response.data;

            if (typeof data === "string") {
                return data;
            }

            if (data.message) {
                return data.message;
            }

            if (data.error) {
                return data.error;
            }

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
        }


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
    // NAVIGATION
    // =====================================================

    const handleBack = () => {

        navigate(
            "/medical-histories"
        );
    };


    const handleEdit = () => {

        navigate(
            `/medical-histories/edit/${id}`
        );
    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "Not available";
        }

        try {

            const parsedDate =
                new Date(date);

            if (Number.isNaN(
                parsedDate.getTime()
            )) {
                return date;
            }

            return parsedDate.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        } catch {

            return date;
        }
    };


    // =====================================================
    // DISPLAY VALUE
    // =====================================================

    const displayValue = (value) => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "Not available";
        }

        return value;
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="view-medical-history-page">

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
    // NOT FOUND
    // =====================================================

    if (!medicalHistory) {

        return (
            <div className="view-medical-history-page">

                <div className="medical-history-not-found">

                    <h2>
                        Medical History Not Found
                    </h2>

                    <p>
                        {error ||
                            "The requested medical history could not be found."}
                    </p>

                    <button
                        type="button"
                        className="back-button"
                        onClick={handleBack}
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

        <div className="view-medical-history-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="view-medical-history-header">

                <div>

                    <h1>
                        Medical History
                    </h1>

                    <p>
                        Complete medical history
                        record details.
                    </p>

                </div>


                <div className="header-actions">

                    <button
                        type="button"
                        className="back-button"
                        onClick={handleBack}
                    >
                        ← Back
                    </button>


                    <button
                        type="button"
                        className="edit-button"
                        onClick={handleEdit}
                    >
                        Edit Record
                    </button>

                </div>

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
                RECORD HEADER
            ================================================= */}

            <div className="medical-record-card">

                <div className="medical-record-header">

                    <div>

                        <span className="record-label">
                            Medical History Number
                        </span>

                        <h2>
                            {displayValue(
                                medicalHistory.historyNumber
                            )}
                        </h2>

                    </div>


                    <div className="status-container">

                        <span className="record-label">
                            Status
                        </span>

                        <span
                            className={
                                `status-badge status-${(
                                    medicalHistory.status ||
                                    "unknown"
                                ).toLowerCase()}`
                            }
                        >
                            {displayValue(
                                medicalHistory.status
                            )}
                        </span>

                    </div>

                </div>


                {/* =================================================
                    PATIENT INFORMATION
                ================================================= */}

                <section className="record-section">

                    <h3>
                        Patient Information
                    </h3>

                    <div className="record-grid">

                        <div className="record-field">

                            <span>
                                Patient ID
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.patientId
                                )}
                            </strong>

                        </div>


                        <div className="record-field">

                            <span>
                                Patient Code
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.patientCode
                                )}
                            </strong>

                        </div>


                        <div className="record-field">

                            <span>
                                Patient Name
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.patientName
                                )}
                            </strong>

                        </div>


                        <div className="record-field">

                            <span>
                                History Date
                            </span>

                            <strong>
                                {formatDate(
                                    medicalHistory.historyDate
                                )}
                            </strong>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    DOCTOR INFORMATION
                ================================================= */}

                <section className="record-section">

                    <h3>
                        Doctor Information
                    </h3>

                    <div className="record-grid">

                        <div className="record-field">

                            <span>
                                Doctor ID
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.doctorId
                                )}
                            </strong>

                        </div>


                        <div className="record-field">

                            <span>
                                Doctor Name
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.doctorName
                                )}
                            </strong>

                        </div>


                        <div className="record-field">

                            <span>
                                Qualification
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.doctorDegree
                                )}
                            </strong>

                        </div>


                        <div className="record-field">

                            <span>
                                Last Reviewed
                            </span>

                            <strong>
                                {formatDate(
                                    medicalHistory.lastReviewedDate
                                )}
                            </strong>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    MEDICAL HISTORY
                ================================================= */}

                <section className="record-section">

                    <h3>
                        Medical History
                    </h3>

                    <div className="record-text-grid">

                        <div className="record-text-field">

                            <span>
                                Allergies
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.allergies
                                )}
                            </p>

                        </div>


                        <div className="record-text-field">

                            <span>
                                Chronic Diseases
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.chronicDiseases
                                )}
                            </p>

                        </div>


                        <div className="record-text-field">

                            <span>
                                Family History
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.familyHistory
                                )}
                            </p>

                        </div>


                        <div className="record-text-field">

                            <span>
                                Major Illnesses
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.majorIllnesses
                                )}
                            </p>

                        </div>


                        <div className="record-text-field">

                            <span>
                                Previous Medications
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.previousMedications
                                )}
                            </p>

                        </div>


                        <div className="record-text-field">

                            <span>
                                Current Medications
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.currentMedications
                                )}
                            </p>

                        </div>


                        <div className="record-text-field">

                            <span>
                                Previous Surgeries
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.previousSurgeries
                                )}
                            </p>

                        </div>


                        <div className="record-text-field">

                            <span>
                                Previous Hospitalizations
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.previousHospitalizations
                                )}
                            </p>

                        </div>


                        <div className="record-text-field">

                            <span>
                                Immunization History
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.immunizationHistory
                                )}
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    DIAGNOSIS & TREATMENT
                ================================================= */}

                <section className="record-section">

                    <h3>
                        Diagnosis & Treatment
                    </h3>

                    <div className="record-text-grid">

                        <div className="record-text-field">

                            <span>
                                Diagnosis
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.diagnosis
                                )}
                            </p>

                        </div>


                        <div className="record-text-field">

                            <span>
                                Treatment Given
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.treatmentGiven
                                )}
                            </p>

                        </div>


                        <div className="record-text-field">

                            <span>
                                Procedures Performed
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.proceduresPerformed
                                )}
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    LIFESTYLE & RISK INFORMATION
                ================================================= */}

                <section className="record-section">

                    <h3>
                        Lifestyle & Risk Information
                    </h3>

                    <div className="record-grid">

                        <div className="record-field">

                            <span>
                                Blood Group
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.bloodGroup
                                )}
                            </strong>

                        </div>


                        <div className="record-field">

                            <span>
                                Smoking History
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.smokingHistory
                                )}
                            </strong>

                        </div>


                        <div className="record-field">

                            <span>
                                Alcohol History
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.alcoholHistory
                                )}
                            </strong>

                        </div>


                        <div className="record-field">

                            <span>
                                Substance History
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.substanceHistory
                                )}
                            </strong>

                        </div>

                    </div>


                    <div className="record-text-field standalone-field">

                        <span>
                            Disability Information
                        </span>

                        <p>
                            {displayValue(
                                medicalHistory.disabilityInformation
                            )}
                        </p>

                    </div>

                </section>


                {/* =================================================
                    NOTES
                ================================================= */}

                <section className="record-section">

                    <h3>
                        Notes
                    </h3>

                    <div className="record-text-grid">

                        <div className="record-text-field">

                            <span>
                                Emergency Notes
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.emergencyNotes
                                )}
                            </p>

                        </div>


                        <div className="record-text-field">

                            <span>
                                Additional Notes
                            </span>

                            <p>
                                {displayValue(
                                    medicalHistory.additionalNotes
                                )}
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    AUDIT INFORMATION
                ================================================= */}

                <section className="record-section audit-section">

                    <h3>
                        Record Information
                    </h3>

                    <div className="record-grid">

                        <div className="record-field">

                            <span>
                                Record ID
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.id
                                )}
                            </strong>

                        </div>


                        <div className="record-field">

                            <span>
                                Created At
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.createdAt
                                )}
                            </strong>

                        </div>


                        <div className="record-field">

                            <span>
                                Updated At
                            </span>

                            <strong>
                                {displayValue(
                                    medicalHistory.updatedAt
                                )}
                            </strong>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    FOOTER ACTIONS
                ================================================= */}

                <div className="record-footer-actions">

                    <button
                        type="button"
                        className="back-button"
                        onClick={handleBack}
                    >
                        ← Back to List
                    </button>

                    <button
                        type="button"
                        className="edit-button"
                        onClick={handleEdit}
                    >
                        Edit Medical History
                    </button>

                </div>

            </div>

        </div>
    );
};

export default ViewMedicalHistory;