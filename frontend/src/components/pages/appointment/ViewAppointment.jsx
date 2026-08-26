import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAppointmentById } from "../../../services/appointmentService";

import "./ViewAppointment.css";

const ViewAppointment = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);

    const [loading, setLoading] = useState(true);

    // ==========================================
    // Load Appointment
    // ==========================================

    useEffect(() => {

        loadAppointment();

    }, []);

    const loadAppointment = async () => {

        try {

            const data = await getAppointmentById(id);

            setAppointment(data);

        } catch (error) {

            console.error(error);

            alert("Unable to load appointment.");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="loading-container">

                <h2>Loading Appointment...</h2>

            </div>

        );

    }

    if (!appointment) {

        return (

            <div className="loading-container">

                <h2>Appointment Not Found</h2>

            </div>

        );

    }

    return (

        <div className="view-appointment-page">

            <div className="page-header">

                <h2>Appointment Details</h2>

                <button
                    className="back-btn"
                    onClick={() => navigate("/appointments")}
                >
                    Back
                </button>

            </div>

            <div className="appointment-card">

                <div className="info-grid">

                    <div className="info-item">
                        <label>Appointment Code</label>
                        <p>{appointment.appointmentCode}</p>
                    </div>

                    <div className="info-item">
                        <label>Patient</label>
                        <p>{appointment.patientName}</p>
                    </div>

                    <div className="info-item">
                        <label>Doctor</label>
                        <p>{appointment.doctorName}</p>
                    </div>

                    <div className="info-item">
                        <label>Department</label>
                        <p>{appointment.department}</p>
                    </div>

                    <div className="info-item">
                        <label>Appointment Date</label>
                        <p>{appointment.appointmentDate}</p>
                    </div>

                    <div className="info-item">
                        <label>Appointment Time</label>
                        <p>{appointment.appointmentTime}</p>
                    </div>

                    <div className="info-item">
                        <label>Token Number</label>
                        <p>{appointment.tokenNumber}</p>
                    </div>

                    <div className="info-item">
                        <label>Consultation Type</label>
                        <p>{appointment.consultationType}</p>
                    </div>

                    <div className="info-item">
                        <label>Consultation Fee</label>
                        <p>₹ {appointment.consultationFee}</p>
                    </div>

                    <div className="info-item">
                        <label>Status</label>
                        <p>{appointment.status}</p>
                    </div>

                    <div className="info-item full-width">
                        <label>Reason</label>
                        <p>{appointment.reason}</p>
                    </div>

                    <div className="info-item full-width">
                        <label>Notes</label>
                        <p>{appointment.notes || "-"}</p>
                    </div>

                    <div className="info-item">
                        <label>Created At</label>
                        <p>{appointment.createdAt}</p>
                    </div>

                    <div className="info-item">
                        <label>Updated At</label>
                        <p>{appointment.updatedAt}</p>
                    </div>

                </div>

            </div>

        </div>

    );

};

export default ViewAppointment;