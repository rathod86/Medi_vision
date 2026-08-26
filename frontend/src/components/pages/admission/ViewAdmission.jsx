import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAdmissionById } from "../../../services/admissionService";

import "./ViewAdmission.css";

const ViewAdmission = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [admission, setAdmission] = useState(null);

    const [loading, setLoading] = useState(true);

    // ==========================================
    // Load Admission
    // ==========================================

    useEffect(() => {

        loadAdmission();

    }, []);

    const loadAdmission = async () => {

        try {

            const data = await getAdmissionById(id);

            setAdmission(data);

        } catch (error) {

            console.error(error);

            alert("Unable to load Admission.");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="loading-container">

                <h2>Loading Admission...</h2>

            </div>

        );

    }

    if (!admission) {

        return (

            <div className="loading-container">

                <h2>Admission Not Found</h2>

            </div>

        );

    }

    return (

        <div className="view-admission-page">

            <div className="page-header">

                <h2>Admission Details</h2>

                <button
                    className="back-btn"
                    onClick={() => navigate("/admissions")}
                >
                    Back
                </button>

            </div>

            <div className="admission-card">

                <div className="info-grid">

                    <div className="info-item">
                        <label>Admission Number</label>
                        <p>{admission.admissionNumber}</p>
                    </div>

                    <div className="info-item">
                        <label>Patient</label>
                        <p>{admission.patientName}</p>
                    </div>

                    <div className="info-item">
                        <label>Doctor</label>
                        <p>{admission.doctorName}</p>
                    </div>

                    <div className="info-item">
                        <label>Department</label>
                        <p>{admission.department}</p>
                    </div>

                    <div className="info-item">
                        <label>Admission Date</label>
                        <p>{admission.admissionDate}</p>
                    </div>

                    <div className="info-item">
                        <label>Admission Time</label>
                        <p>{admission.admissionTime}</p>
                    </div>

                    <div className="info-item">
                        <label>Admission Type</label>
                        <p>{admission.admissionType}</p>
                    </div>

                    <div className="info-item">
                        <label>Ward</label>
                        <p>{admission.ward}</p>
                    </div>

                    <div className="info-item">
                        <label>Room Number</label>
                        <p>{admission.roomNumber}</p>
                    </div>

                    <div className="info-item">
                        <label>Bed Number</label>
                        <p>{admission.bedNumber}</p>
                    </div>

                    <div className="info-item full-width">
                        <label>Diagnosis</label>
                        <p>{admission.diagnosis}</p>
                    </div>

                    <div className="info-item full-width">
                        <label>Symptoms</label>
                        <p>{admission.symptoms || "-"}</p>
                    </div>

                    <div className="info-item full-width">
                        <label>Reason For Admission</label>
                        <p>{admission.reasonForAdmission || "-"}</p>
                    </div>

                    <div className="info-item">
                        <label>Insurance Provider</label>
                        <p>{admission.insuranceProvider || "-"}</p>
                    </div>

                    <div className="info-item">
                        <label>Policy Number</label>
                        <p>{admission.policyNumber || "-"}</p>
                    </div>

                    <div className="info-item">
                        <label>Estimated Cost</label>
                        <p>₹ {admission.estimatedCost}</p>
                    </div>

                    <div className="info-item">
                        <label>Initial Deposit</label>
                        <p>₹ {admission.initialDeposit}</p>
                    </div>

                    <div className="info-item">
                        <label>Expected Stay</label>
                        <p>{admission.expectedStayDays} Days</p>
                    </div>

                    <div className="info-item">
                        <label>Status</label>
                        <p>{admission.status}</p>
                    </div>

                    <div className="info-item full-width">
                        <label>Notes</label>
                        <p>{admission.notes || "-"}</p>
                    </div>

                    <div className="info-item">
                        <label>Created At</label>
                        <p>{admission.createdAt}</p>
                    </div>

                    <div className="info-item">
                        <label>Updated At</label>
                        <p>{admission.updatedAt}</p>
                    </div>

                </div>

            </div>

        </div>

    );

};

export default ViewAdmission;