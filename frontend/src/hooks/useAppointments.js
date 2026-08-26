import { useEffect, useState } from "react";

import {
    getAllAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment,
} from "../services/appointmentService";

const useAppointments = () => {

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // Load Appointments
    // ==========================================

    const fetchAppointments = async () => {

        try {

            setLoading(true);

            const data = await getAllAppointments();

            setAppointments(data);

            setError("");

        } catch (err) {

            console.error(err);

            setError("Failed to load appointments.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchAppointments();

    }, []);

    // ==========================================
    // Add Appointment
    // ==========================================

    const addAppointment = async (appointment) => {

        try {

            const createdAppointment = await createAppointment(appointment);

            await fetchAppointments();

            return createdAppointment;

        } catch (err) {

            throw err;

        }

    };

    // ==========================================
    // Update Appointment
    // ==========================================

    const editAppointment = async (id, appointment) => {

        try {

            const updatedAppointment = await updateAppointment(id, appointment);

            await fetchAppointments();

            return updatedAppointment;

        } catch (err) {

            throw err;

        }

    };

    // ==========================================
    // Delete Appointment
    // ==========================================

    const removeAppointment = async (id) => {

        try {

            await deleteAppointment(id);

            fetchAppointments();

        } catch (err) {

            throw err;

        }

    };

    return {

        appointments,

        loading,

        error,

        addAppointment,

        editAppointment,

        removeAppointment,

        refreshAppointments: fetchAppointments,

    };

};

export default useAppointments;