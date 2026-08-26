import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppointmentForm from "../../appointment/AppointmentForm";

import {
    getAppointmentById
} from "../../../services/appointmentService";

import {
    getAllDoctors
} from "../../../services/doctorService";

import {
    getAllPatients
} from "../../../services/patientService";

import useAppointments from "../../../hooks/useAppointments";

import "./EditAppointment.css";

const EditAppointment = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { editAppointment } = useAppointments();

    const [appointment, setAppointment] = useState({});

    const [doctors, setDoctors] = useState([]);

    const [patients, setPatients] = useState([]);

    const [loading, setLoading] = useState(true);

    // ==========================================
    // Load Appointment
    // ==========================================

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const appointmentData =
                await getAppointmentById(id);

            const doctorData =
                await getAllDoctors();

            const patientData =
                await getAllPatients();

            setAppointment(appointmentData);

            setDoctors(doctorData);

            setPatients(patientData);

        } catch (error) {

            console.error(error);

            alert("Failed to load appointment.");

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Update Appointment
    // ==========================================

    const handleSubmit = async (formData) => {

        try {

            await editAppointment(id, formData);

            alert("Appointment Updated Successfully");

            navigate("/appointments");

        } catch (error) {

            console.error(error);

            alert("Unable to update appointment.");

        }

    };

    if (loading) {

        return (

            <div className="loading">

                Loading Appointment...

            </div>

        );

    }

    return (

        <div className="edit-appointment-page">

            <div className="page-header">

                <h2>Edit Appointment</h2>

                <p>Update appointment details.</p>

            </div>

            <AppointmentForm

                initialData={appointment}

                doctors={doctors}

                patients={patients}

                onSubmit={handleSubmit}

            />

        </div>

    );

};

export default EditAppointment;