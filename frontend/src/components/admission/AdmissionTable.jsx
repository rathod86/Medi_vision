import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./AdmissionTable.css";

const AdmissionTable = ({
    admissions,
    onDelete,
    onEdit,
}) => {

    const navigate = useNavigate();

    if (!admissions || admissions.length === 0) {

        return (

            <div className="no-data">

                No Admissions Found

            </div>

        );

    }

    return (

        <div className="admission-table-container">

            <table className="admission-table">

                <thead>

                    <tr>

                        <th>Admission No</th>

                        <th>Patient</th>

                        <th>Doctor</th>

                        <th>Department</th>

                        <th>Ward</th>

                        <th>Room</th>

                        <th>Admission Date</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {admissions.map((admission) => (

                        <tr key={admission.id}>

                            <td>

                                {admission.admissionNumber}

                            </td>

                            <td>

                                {admission.patientName}

                            </td>

                            <td>

                                {admission.doctorName}

                            </td>

                            <td>

                                {admission.department}

                            </td>

                            <td>

                                {admission.ward}

                            </td>

                            <td>

                                {admission.roomNumber}

                            </td>

                            <td>

                                {admission.admissionDate}

                            </td>

                            <td>

                                <span
                                    className={`status ${admission.status?.toLowerCase().replace(/\s+/g, "-")}`}
                                >

                                    {admission.status}

                                </span>

                            </td>

                            <td>

                                <button
                                    className="view-btn"
                                    onClick={() =>
                                        navigate(`/admissions/view/${admission.id}`)
                                    }
                                >

                                    <FaEye />

                                </button>

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        onEdit(admission.id)
                                    }
                                >

                                    <FaEdit />

                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => {

                                        if (
                                            window.confirm(
                                                "Delete this admission?"
                                            )
                                        ) {

                                            onDelete(
                                                admission.id
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

export default AdmissionTable;