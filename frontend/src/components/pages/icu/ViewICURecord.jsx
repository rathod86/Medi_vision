import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getICURecordById
} from "../../../services/icuRecordService";

import "./ViewICURecord.css";


const ViewICURecord = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [record, setRecord] = useState(null);

    const [loading, setLoading] = useState(true);


    // =====================================================
    // LOAD ICU RECORD
    // =====================================================

    useEffect(() => {

        const loadRecord = async () => {

            try {

                setLoading(true);

                const data =
                    await getICURecordById(id);

                console.log(
                    "ICU Record:",
                    data
                );

                setRecord(data);

            } catch (error) {

                console.error(
                    "Error loading ICU record:",
                    error
                );

                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Failed to load ICU record.";

                alert(message);

                navigate("/icu-records");

            } finally {

                setLoading(false);
            }
        };


        if (id) {

            loadRecord();

        } else {

            alert(
                "Invalid ICU record ID."
            );

            navigate("/icu-records");
        }

    }, [id, navigate]);


    // =====================================================
    // BACK
    // =====================================================

    const handleBack = () => {

        navigate("/icu-records");
    };


    // =====================================================
    // EDIT
    // =====================================================

    const handleEdit = () => {

        navigate(
            `/icu-records/edit/${id}`
        );
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="icu-view-loading">

                <div className="icu-view-spinner"></div>

                <p>
                    Loading ICU record...
                </p>

            </div>
        );
    }


    // =====================================================
    // NOT FOUND
    // =====================================================

    if (!record) {

        return (
            <div className="icu-view-empty">

                <h2>
                    ICU Record Not Found
                </h2>

                <button
                    type="button"
                    onClick={handleBack}
                >
                    Back to ICU Records
                </button>

            </div>
        );
    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="icu-view-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="icu-view-header">

                <div>

                    <h2>
                        ICU Record Details
                    </h2>

                    <p>
                        ICU Record Number:{" "}
                        <strong>
                            {record.icuRecordNumber ||
                                `ICU-${record.id}`}
                        </strong>
                    </p>

                </div>


                <div className="icu-view-header-actions">

                    <button
                        type="button"
                        className="icu-btn-secondary"
                        onClick={handleBack}
                    >
                        Back
                    </button>

                    <button
                        type="button"
                        className="icu-btn-primary"
                        onClick={handleEdit}
                    >
                        Edit Record
                    </button>

                </div>

            </div>


            {/* =================================================
                PATIENT & MEDICAL TEAM
            ================================================= */}

            <section className="icu-view-section">

                <h3>
                    Patient & Medical Team
                </h3>


                <div className="icu-view-grid">

                    <InfoItem
                        label="Patient Code"
                        value={
                            record.patientCode
                        }
                    />

                    <InfoItem
                        label="Patient Name"
                        value={
                            record.patientName
                        }
                    />

                    <InfoItem
                        label="Doctor"
                        value={
                            record.doctorName
                        }
                    />

                    <InfoItem
                        label="Doctor Degree"
                        value={
                            record.doctorDegree
                        }
                    />

                    <InfoItem
                        label="Nurse"
                        value={
                            record.nurseName ||
                            "No Nurse Assigned"
                        }
                    />

                    <InfoItem
                        label="Admission Number"
                        value={
                            record.admissionNumber ||
                            "Not Available"
                        }
                    />

                    <InfoItem
                        label="Prescription Number"
                        value={
                            record.prescriptionNumber ||
                            "Not Available"
                        }
                    />

                </div>

            </section>


            {/* =================================================
                ICU DETAILS
            ================================================= */}

            <section className="icu-view-section">

                <h3>
                    ICU Details
                </h3>


                <div className="icu-view-grid">

                    <InfoItem
                        label="ICU Start Date"
                        value={
                            record.icuStartDate
                        }
                    />

                    <InfoItem
                        label="ICU End Date"
                        value={
                            record.icuEndDate ||
                            "Ongoing"
                        }
                    />

                    <InfoItem
                        label="Bed Number"
                        value={
                            record.bedNumber
                        }
                    />

                    <InfoItem
                        label="Ward Number"
                        value={
                            record.wardNumber
                        }
                    />

                    <InfoItem
                        label="Critical Level"
                        value={
                            record.criticalLevel
                        }
                    />

                    <InfoItem
                        label="Status"
                        value={
                            record.status
                        }
                    />

                    <InfoItem
                        label="Ventilator Required"
                        value={
                            record.ventilatorRequired
                                ? "Yes"
                                : "No"
                        }
                    />

                    <InfoItem
                        label="Isolation Required"
                        value={
                            record.isolationRequired
                                ? "Yes"
                                : "No"
                        }
                    />

                </div>

            </section>


            {/* =================================================
                DIAGNOSIS & TREATMENT
            ================================================= */}

            <section className="icu-view-section">

                <h3>
                    Diagnosis & Treatment
                </h3>


                <div className="icu-view-full-width">

                    <InfoItem
                        label="Diagnosis"
                        value={
                            record.diagnosis
                        }
                    />

                    <InfoItem
                        label="Treatment Plan"
                        value={
                            record.treatmentPlan
                        }
                    />

                </div>

            </section>


            {/* =================================================
                VITAL SIGNS
            ================================================= */}

            <section className="icu-view-section">

                <h3>
                    Vital Signs
                </h3>


                <div className="icu-view-grid">

                    <InfoItem
                        label="Oxygen Level"
                        value={
                            record.oxygenLevel
                        }
                    />

                    <InfoItem
                        label="Heart Rate"
                        value={
                            record.heartRate
                        }
                    />

                    <InfoItem
                        label="Blood Pressure"
                        value={
                            record.bloodPressure
                        }
                    />

                    <InfoItem
                        label="Respiratory Rate"
                        value={
                            record.respiratoryRate
                        }
                    />

                    <InfoItem
                        label="Body Temperature"
                        value={
                            record.bodyTemperature
                        }
                    />

                </div>

            </section>


            {/* =================================================
                DAILY MONITORING
            ================================================= */}

            <section className="icu-view-section">

                <h3>
                    Daily Monitoring
                </h3>


                <div className="icu-view-full-width">

                    <InfoItem
                        label="Daily Notes"
                        value={
                            record.dailyNotes
                        }
                    />

                    <InfoItem
                        label="Medications Given"
                        value={
                            record.medicationsGiven
                        }
                    />

                    <InfoItem
                        label="Procedures Performed"
                        value={
                            record.proceduresPerformed
                        }
                    />

                </div>

            </section>


            {/* =================================================
                DISCHARGE
            ================================================= */}

            <section className="icu-view-section">

                <h3>
                    Discharge Information
                </h3>


                <div className="icu-view-full-width">

                    <InfoItem
                        label="Discharge Summary"
                        value={
                            record.dischargeSummary
                        }
                    />

                </div>

            </section>


            {/* =================================================
                FOOTER ACTIONS
            ================================================= */}

            <div className="icu-view-footer">

                <button
                    type="button"
                    className="icu-btn-secondary"
                    onClick={handleBack}
                >
                    Back to ICU Records
                </button>


                <button
                    type="button"
                    className="icu-btn-primary"
                    onClick={handleEdit}
                >
                    Edit ICU Record
                </button>

            </div>

        </div>
    );
};


// =====================================================
// REUSABLE INFO ITEM
// =====================================================

const InfoItem = ({
    label,
    value
}) => {

    return (
        <div className="icu-info-item">

            <span className="icu-info-label">
                {label}
            </span>

            <span className="icu-info-value">
                {value !== null &&
                value !== undefined &&
                String(value).trim() !== ""
                    ? value
                    : "Not Available"}
            </span>

        </div>
    );
};


export default ViewICURecord;