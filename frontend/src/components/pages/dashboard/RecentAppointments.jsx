import { useEffect, useState } from "react";

import "./RecentAppointments.css";

import { getAllAppointments } from "../../../services/appointmentService";
import { toArray } from "../../../utils/apiHelpers";
import { resolveDoctorId, resolvePatientId } from "../../../utils/entityResolver";

import { useAuth } from "../../../context/AuthContext";


const RecentAppointments = () => {

    const { user } = useAuth();

    const [appointments, setAppointments] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadAppointments = async () => {

            try {

                setLoading(true);

                const data =
                    toArray(
                        await getAllAppointments()
                    );


                const role =
                    user?.role
                        ?.trim()
                        .toUpperCase();


                // =================================================
                // ADMIN
                // =================================================

                if (role === "ADMIN") {

                    setAppointments(
                        data.slice(0, 5)
                    );

                    return;
                }


                // =================================================
                // DOCTOR
                // =================================================

                if (role === "DOCTOR") {

                    const doctorId =
                        await resolveDoctorId(user);

                    const doctorAppointments =
                        data.filter(
                            (appointment) =>
                                Number(
                                    appointment?.doctorId
                                ) === doctorId
                        );

                    setAppointments(
                        doctorAppointments.slice(0, 5)
                    );

                    return;
                }


                // =================================================
                // PATIENT
                // =================================================

                if (role === "PATIENT") {

                    const patientId =
                        await resolvePatientId(user);

                    const patientAppointments =
                        data.filter(
                            (appointment) =>
                                Number(
                                    appointment?.patientId
                                ) === patientId
                        );

                    setAppointments(
                        patientAppointments.slice(0, 5)
                    );

                    return;
                }


                // =================================================
                // OTHER ROLES
                // =================================================

                setAppointments(
                    data.slice(0, 5)
                );

            } catch (error) {

                console.error(
                    "Error loading recent appointments:",
                    error
                );

                setAppointments([]);

            } finally {

                setLoading(false);
            }
        };


        if (user) {

            loadAppointments();

        }

    }, [user]);


    return (

        <div className="recent-appointments">

            <h3>
                Recent Appointments
            </h3>


            {loading ? (

                <div className="dashboard-widget-loading">
                    Loading appointments...
                </div>

            ) : (

                <div className="table-responsive">

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    ID
                                </th>

                                <th>
                                    Patient
                                </th>

                                <th>
                                    Doctor
                                </th>

                                <th>
                                    Date
                                </th>

                                <th>
                                    Time
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {appointments.length === 0 ? (

                                <tr>

                                    <td colSpan="6">

                                        No appointments found.

                                    </td>

                                </tr>

                            ) : (

                                appointments.map(
                                    (appointment) => (

                                        <tr
                                            key={
                                                appointment.id
                                            }
                                        >

                                            <td>

                                                {
                                                    appointment.appointmentNumber ||
                                                    appointment.id
                                                }

                                            </td>


                                            <td>

                                                {
                                                    appointment.patientName ||
                                                    appointment.patient?.fullName ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    appointment.doctorName ||
                                                    appointment.doctor?.fullName ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    appointment.appointmentDate ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    appointment.appointmentTime ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        (
                                                            appointment.status ||
                                                            "pending"
                                                        )
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )
                                                    }
                                                >

                                                    {
                                                        appointment.status ||
                                                        "Pending"
                                                    }

                                                </span>

                                            </td>

                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};


export default RecentAppointments;