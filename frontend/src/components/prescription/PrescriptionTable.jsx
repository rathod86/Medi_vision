import React from "react";
import { Link } from "react-router-dom";
import "./PrescriptionTable.css";

const PrescriptionTable = ({
    prescriptions,
    onDelete,
}) => {

    if (!prescriptions || prescriptions.length === 0) {

        return (

            <div className="no-data">

                No Prescriptions Found.

            </div>

        );

    }

    const getStatusClass = (status) => {

        switch (status) {

            case "Draft":
                return "status draft";

            case "Issued":
                return "status issued";

            case "Dispensed":
                return "status dispensed";

            case "Completed":
                return "status completed";

            case "Cancelled":
                return "status cancelled";

            default:
                return "status";
        }

    };

    return (

        <div className="prescription-table-container">

            <table className="prescription-table">

                <thead>

                    <tr>

                        <th>#</th>

                        <th>Prescription No</th>

                        <th>Patient</th>

                        <th>Doctor</th>

                        <th>Diagnosis</th>

                        <th>Date</th>

                        <th>Medicines</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {prescriptions.map((prescription, index) => (

                        <tr key={prescription.id}>

                            <td>{index + 1}</td>

                            <td>
                                {prescription.prescriptionNumber}
                            </td>

                            <td>
                                {prescription.patientName}
                            </td>

                            <td>
                                {prescription.doctorName}
                            </td>

                            <td>
                                {prescription.diagnosis}
                            </td>

                            <td>
                                {prescription.prescriptionDate}
                            </td>

                            <td>
                                {prescription.medicines?.length || 0}
                            </td>

                            <td>

                                <span
                                    className={getStatusClass(
                                        prescription.status
                                    )}
                                >
                                    {prescription.status}
                                </span>

                            </td>

                            <td>

                                <div className="action-buttons">

                                    <Link
                                        to={`/prescriptions/view/${prescription.id}`}
                                        className="btn view-btn"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/prescriptions/edit/${prescription.id}`}
                                        className="btn edit-btn"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="btn delete-btn"
                                        onClick={() =>
                                            onDelete(prescription.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default PrescriptionTable;