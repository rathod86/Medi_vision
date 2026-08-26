import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AppointmentForm from "../../appointment/AppointmentForm";

import useAppointments from "../../../hooks/useAppointments";

import { getAllDoctors } from "../../../services/doctorService";
import { getAllPatients } from "../../../services/patientService";

import "./AddAppointment.css";

const AddAppointment = () => {

    const navigate = useNavigate();

    const { addAppointment } = useAppointments();

    const [doctors, setDoctors] = useState([]);

    const [patients, setPatients] = useState([]);

    const [loading, setLoading] = useState(false);

    // ==========================================
    // Load Doctors & Patients
    // ==========================================

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const doctorData = await getAllDoctors();

            const patientData = await getAllPatients();

            setDoctors(doctorData);

            setPatients(patientData);

        } catch (error) {

            console.error(error);

            alert("Failed to load Doctors or Patients.");

        }

    };

    // ==========================================
    // Save Appointment
    // ==========================================

    const handleSubmit = async (formData) => {

        try {

            setLoading(true);

            await addAppointment(formData);

            alert("Appointment Added Successfully");

            navigate("/appointments");

        } catch (error) {

            console.error(error);

            alert("Unable to save appointment.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="add-appointment-page">

            <div className="page-header">

                <h2>Add Appointment</h2>

                <p>Create a new appointment.</p>

            </div>

            <AppointmentForm

                onSubmit={handleSubmit}

                doctors={doctors}

                patients={patients}

                loading={loading}

            />

        </div>

    );

};

export default AddAppointment;