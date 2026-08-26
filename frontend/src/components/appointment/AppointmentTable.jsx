import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./AppointmentTable.css";

const AppointmentTable = ({
    appointments,
    onDelete,
    onEdit,
}) => {

    const navigate = useNavigate();

    if (!appointments || appointments.length === 0) {

        return (

            <div className="no-data">

                No Appointments Found

            </div>

        );

    }

    return (

        <div className="appointment-table-container">

            <table className="appointment-table">

                <thead>

                    <tr>

                        <th>Appointment Code</th>

                        <th>Patient</th>

                        <th>Doctor</th>

                        <th>Department</th>

                        <th>Date</th>

                        <th>Time</th>

                        <th>Token</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {appointments.map((appointment) => (

                        <tr key={appointment.id}>

                            <td>
                                {appointment.appointmentCode}
                            </td>

                            <td>
                                {appointment.patientName}
                            </td>

                            <td>
                                {appointment.doctorName}
                            </td>

                            <td>
                                {appointment.department}
                            </td>

                            <td>
                                {appointment.appointmentDate}
                            </td>

                            <td>
                                {appointment.appointmentTime}
                            </td>

                            <td>
                                {appointment.tokenNumber}
                            </td>

                            <td>

                                <span
                                    className={`status ${appointment.status?.toLowerCase().replace(/\s+/g, "-")}`}
                                >

                                    {appointment.status}

                                </span>

                            </td>

                            <td>

                                <button
                                    className="view-btn"
                                    onClick={() =>
                                        navigate(`/appointments/view/${appointment.id}`)
                                    }
                                >
                                    <FaEye />
                                </button>

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        onEdit(appointment.id)
                                    }
                                >
                                    <FaEdit />
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => {

                                        if (
                                            window.confirm(
                                                "Delete this appointment?"
                                            )
                                        ) {

                                            onDelete(
                                                appointment.id
                                            );

                                        }

                                    }}
                                >
                                    <FaTrash />
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default AppointmentTable;