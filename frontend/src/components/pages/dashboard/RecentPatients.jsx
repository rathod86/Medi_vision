import { useEffect, useState } from "react";

import "./RecentPatients.css";

import { getAllPatients } from "../../../services/patientService";
import { getAllAppointments } from "../../../services/appointmentService";

import { toArray } from "../../../utils/apiHelpers";

import { useAuth } from "../../../context/AuthContext";


const RecentPatients = () => {

    const { user } = useAuth();

    const [patients, setPatients] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadPatients = async () => {

            try {

                setLoading(true);

                const role =
                    user?.role
                        ?.trim()
                        .toUpperCase();


                // =================================================
                // GET ALL PATIENTS
                // =================================================

                const allPatients =
                    toArray(
                        await getAllPatients()
                    );


                // =================================================
                // ADMIN
                // =================================================

                if (role === "ADMIN") {

                    setPatients(
                        allPatients.slice(0, 5)
                    );

                    return;
                }


                // =================================================
                // DOCTOR
                // =================================================

                if (role === "DOCTOR") {

                    const doctorId =
                        Number(user?.id);


                    const allAppointments =
                        toArray(
                            await getAllAppointments()
                        );


                    // ---------------------------------------------
                    // Get patient IDs belonging to this doctor
                    // ---------------------------------------------

                    const doctorPatientIds =
                        new Set(

                            allAppointments
                                .filter(
                                    (appointment) =>
                                        Number(
                                            appointment?.doctorId
                                        ) === doctorId
                                )
                                .map(
                                    (appointment) =>
                                        Number(
                                            appointment?.patientId
                                        )
                                )
                                .filter(
                                    (id) =>
                                        !Number.isNaN(id)
                                )
                        );


                    // ---------------------------------------------
                    // Match patient records
                    // ---------------------------------------------

                    const doctorPatients =
                        allPatients.filter(
                            (patient) =>
                                doctorPatientIds.has(
                                    Number(patient.id)
                                )
                        );


                    setPatients(
                        doctorPatients.slice(0, 5)
                    );

                    return;
                }


                // =================================================
                // OTHER ROLES
                // =================================================

                setPatients(
                    allPatients.slice(0, 5)
                );

            } catch (error) {

                console.error(
                    "Error loading recent patients:",
                    error
                );

                setPatients([]);

            } finally {

                setLoading(false);
            }

        };


        if (user) {

            loadPatients();

        }

    }, [user]);


    return (

        <div className="recent-patients">

            <h3>
                Recent Patients
            </h3>


            {loading ? (

                <div className="dashboard-widget-loading">
                    Loading patients...
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
                                    Name
                                </th>

                                <th>
                                    Age
                                </th>

                                <th>
                                    Gender
                                </th>

                                <th>
                                    Blood Group
                                </th>

                                <th>
                                    Status
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {patients.length === 0 ? (

                                <tr>

                                    <td colSpan="6">

                                        No patients found.

                                    </td>

                                </tr>

                            ) : (

                                patients.map(
                                    (patient) => (

                                        <tr
                                            key={
                                                patient.id
                                            }
                                        >

                                            <td>

                                                {
                                                    patient.patientCode ||
                                                    patient.id
                                                }

                                            </td>


                                            <td>

                                                {
                                                    patient.fullName ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    patient.age ??
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    patient.gender ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                {
                                                    patient.bloodGroup ||
                                                    "-"
                                                }

                                            </td>


                                            <td>

                                                <span
                                                    className={
                                                        (
                                                            patient.status ||
                                                            "active"
                                                        )
                                                            .toLowerCase()
                                                            .replace(
                                                                /\s+/g,
                                                                "-"
                                                            )
                                                    }
                                                >

                                                    {
                                                        patient.status ||
                                                        "Active"
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


export default RecentPatients;