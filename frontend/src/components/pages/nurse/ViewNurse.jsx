import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getNurseById
} from "../../../services/nurseService";

import "./ViewNurse.css";

const ViewNurse = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [nurse, setNurse] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD NURSE
    // =====================================================

    useEffect(() => {

        const loadNurse = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getNurseById(id);

                setNurse(data);

            } catch (error) {

                console.error(
                    "Error loading nurse:",
                    error
                );

                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Failed to load nurse details.";

                setError(message);

            } finally {

                setLoading(false);
            }
        };


        if (id) {

            loadNurse();

        } else {

            setError(
                "Nurse ID is missing."
            );

            setLoading(false);
        }

    }, [id]);


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "Not provided";
        }

        try {

            return new Date(
                `${date}T00:00:00`
            ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric"
            });

        } catch {

            return date;
        }
    };


    // =====================================================
    // FORMAT VALUE
    // =====================================================

    const displayValue = (value) => {

        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "Not provided";
        }

        return value;
    };


    // =====================================================
    // STATUS LABEL
    // =====================================================

    const getStatusLabel = (status) => {

        if (!status) {
            return "Not provided";
        }

        return status
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };


    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {

        switch (status) {

            case "ACTIVE":
                return "status-active";

            case "INACTIVE":
                return "status-inactive";

            case "ON_LEAVE":
                return "status-leave";

            default:
                return "status-default";
        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="nurse-view-page">

                <div className="nurse-view-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading nurse details...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error || !nurse) {

        return (

            <div className="nurse-view-page">

                <div className="nurse-view-error">

                    <h3>
                        Unable to load nurse
                    </h3>

                    <p>
                        {error ||
                            "Nurse record not found."}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/nurses")
                        }
                    >
                        Back to Nurses
                    </button>

                </div>

            </div>
        );
    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="nurse-view-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="nurse-view-header">

                <div>

                    <h2>
                        Nurse Details
                    </h2>

                    <p>
                        View complete nurse information
                    </p>

                </div>


                <div className="nurse-view-header-actions">

                    <button
                        type="button"
                        className="btn-back"
                        onClick={() =>
                            navigate("/nurses")
                        }
                    >
                        ← Back
                    </button>


                    <button
                        type="button"
                        className="btn-edit"
                        onClick={() =>
                            navigate(
                                `/nurses/edit/${nurse.id}`
                            )
                        }
                    >
                        Edit Nurse
                    </button>

                </div>

            </div>


            {/* =================================================
                BASIC INFORMATION CARD
            ================================================= */}

            <div className="nurse-profile-card">

                <div className="nurse-avatar">

                    {nurse.fullName
                        ?.charAt(0)
                        ?.toUpperCase() || "N"}

                </div>


                <div className="nurse-profile-info">

                    <h1>
                        {displayValue(
                            nurse.fullName
                        )}
                    </h1>

                    <p>
                        {displayValue(
                            nurse.degree
                        )}
                    </p>

                    <span
                        className={`nurse-status ${getStatusClass(
                            nurse.status
                        )}`}
                    >
                        {getStatusLabel(
                            nurse.status
                        )}
                    </span>

                </div>


                <div className="nurse-employee-code">

                    <span>
                        Employee Code
                    </span>

                    <strong>
                        {displayValue(
                            nurse.employeeCode
                        )}
                    </strong>

                </div>

            </div>


            {/* =================================================
                PROFESSIONAL INFORMATION
            ================================================= */}

            <div className="nurse-details-card">

                <div className="card-title">

                    <h3>
                        Professional Information
                    </h3>

                </div>


                <div className="details-grid">

                    <div className="detail-item">

                        <span>
                            Degree
                        </span>

                        <strong>
                            {displayValue(
                                nurse.degree
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Specialization
                        </span>

                        <strong>
                            {displayValue(
                                nurse.specialization
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            License Number
                        </span>

                        <strong>
                            {displayValue(
                                nurse.licenseNumber
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Experience
                        </span>

                        <strong>
                            {nurse.experienceYears !==
                                null &&
                            nurse.experienceYears !==
                                undefined
                                ? `${nurse.experienceYears} years`
                                : "Not provided"}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                CONTACT INFORMATION
            ================================================= */}

            <div className="nurse-details-card">

                <div className="card-title">

                    <h3>
                        Contact Information
                    </h3>

                </div>


                <div className="details-grid">

                    <div className="detail-item">

                        <span>
                            Phone
                        </span>

                        <strong>
                            {displayValue(
                                nurse.phone
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Email
                        </span>

                        <strong>
                            {displayValue(
                                nurse.email
                            )}
                        </strong>

                    </div>


                    <div className="detail-item full-width">

                        <span>
                            Address
                        </span>

                        <strong>
                            {displayValue(
                                nurse.address
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <div className="nurse-details-card">

                <div className="card-title">

                    <h3>
                        Personal Information
                    </h3>

                </div>


                <div className="details-grid">

                    <div className="detail-item">

                        <span>
                            Date of Birth
                        </span>

                        <strong>
                            {formatDate(
                                nurse.dateOfBirth
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Gender
                        </span>

                        <strong>
                            {displayValue(
                                nurse.gender
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                HOSPITAL INFORMATION
            ================================================= */}

            <div className="nurse-details-card">

                <div className="card-title">

                    <h3>
                        Hospital Information
                    </h3>

                </div>


                <div className="details-grid">

                    <div className="detail-item">

                        <span>
                            Department
                        </span>

                        <strong>
                            {displayValue(
                                nurse.department
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Shift
                        </span>

                        <strong>
                            {nurse.shift
                                ? getStatusLabel(
                                      nurse.shift
                                  )
                                : "Not provided"}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Employment Type
                        </span>

                        <strong>
                            {nurse.employmentType
                                ? getStatusLabel(
                                      nurse.employmentType
                                  )
                                : "Not provided"}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Joining Date
                        </span>

                        <strong>
                            {formatDate(
                                nurse.joiningDate
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Reporting Manager
                        </span>

                        <strong>
                            {displayValue(
                                nurse.reportingManager
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Current Status
                        </span>

                        <strong
                            className={`inline-status ${getStatusClass(
                                nurse.status
                            )}`}
                        >
                            {getStatusLabel(
                                nurse.status
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                EMERGENCY CONTACT
            ================================================= */}

            <div className="nurse-details-card">

                <div className="card-title">

                    <h3>
                        Emergency Contact
                    </h3>

                </div>


                <div className="details-grid">

                    <div className="detail-item">

                        <span>
                            Contact Name
                        </span>

                        <strong>
                            {displayValue(
                                nurse.emergencyContactName
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Contact Phone
                        </span>

                        <strong>
                            {displayValue(
                                nurse.emergencyContactPhone
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span>
                            Relationship
                        </span>

                        <strong>
                            {displayValue(
                                nurse.emergencyContactRelation
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                FOOTER ACTIONS
            ================================================= */}

            <div className="nurse-view-footer">

                <button
                    type="button"
                    className="btn-back"
                    onClick={() =>
                        navigate("/nurses")
                    }
                >
                    Back to Nurse List
                </button>


                <button
                    type="button"
                    className="btn-edit"
                    onClick={() =>
                        navigate(
                            `/nurses/edit/${nurse.id}`
                        )
                    }
                >
                    Edit Nurse
                </button>

            </div>

        </div>
    );
};


export default ViewNurse;