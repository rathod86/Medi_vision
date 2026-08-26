import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getPrescriptionById } from "../../../services/prescriptionService";

import "./ViewPrescription.css";

const ViewPrescription = () => {

    const { id } = useParams();

    const [prescription, setPrescription] = useState(null);

    useEffect(() => {
        loadPrescription();
    }, []);

    const loadPrescription = async () => {

        try {

            const response = await getPrescriptionById(id);

            setPrescription(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!prescription) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="prescription-view">

            {/* Hospital */}

            <div className="hospital-header">

                <h1>MediVision Hospital</h1>

                <p>
                    Bengaluru, Karnataka
                </p>

                <hr />

            </div>

            {/* Header */}

            <div className="prescription-header">

                <div>

                    <h3>Prescription Number</h3>

                    <p>{prescription.prescriptionNumber}</p>

                </div>

                <div>

                    <h3>Date</h3>

                    <p>{prescription.prescriptionDate}</p>

                </div>

                <div>

                    <h3>Status</h3>

                    <p>{prescription.status}</p>

                </div>

            </div>

            {/* Patient */}

            <div className="section">

                <h2>Patient Information</h2>

                <p>

                    <strong>Name : </strong>

                    {prescription.patientName}

                </p>

                <p>

                    <strong>Patient Code : </strong>

                    {prescription.patientCode}

                </p>

            </div>

            {/* Doctor */}

            <div className="section">

                <h2>Doctor Information</h2>

                <p>

                    <strong>Name : </strong>

                    {prescription.doctorName}

                </p>

            </div>

            {/* Clinical */}

            <div className="section">

                <h2>Clinical Details</h2>

                <p>

                    <strong>Symptoms :</strong>

                    {prescription.symptoms}

                </p>

                <p>

                    <strong>Diagnosis :</strong>

                    {prescription.diagnosis}

                </p>

                <p>

                    <strong>Allergies :</strong>

                    {prescription.allergies}

                </p>

                <p>

                    <strong>Clinical Notes :</strong>

                    {prescription.clinicalNotes}

                </p>

            </div>

            {/* Medicines */}

            <div className="table-container">

                <h2>Medicines</h2>

                <table className="medicine-table">

                    <thead>

                        <tr>

                             <th>Medicine</th>
        <th>Dosage</th>
        <th>Route</th>
        <th>Frequency</th>
        <th>Duration</th>
        <th>Qty</th>
        <th>Morning</th>
        <th>Afternoon</th>
        <th>Night</th>
        <th>Morning Time</th>
        <th>Afternoon Time</th>
        <th>Night Time</th>
        <th>Food</th>
        <th>Special Instructions</th>
        <th>Reminder</th>
                        </tr>

                    </thead>

                    <tbody>

                        {prescription.medicines?.map((medicine) => (

                            <tr key={medicine.id}>

                                <td>{medicine.medicineName}</td>

                                <td>{medicine.dosage}</td>

                                <td>{medicine.route}</td>

                                <td>{medicine.frequency}</td>

                                <td>{medicine.duration}</td>

                                <td>{medicine.quantity}</td>

                                <td>{medicine.morning}</td>

                                <td>{medicine.afternoon}</td>

                                <td>{medicine.night}</td>

                                <td>{medicine.morningTime}</td>

                                <td>{medicine.afternoonTime}</td>

                                <td>{medicine.nightTime}</td>

                                <td>{medicine.food}</td>

                                <td>{medicine.specialInstructions}</td>

                                <td>{medicine.reminder}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Follow-up */}

            <div className="section">

                <h2>Follow-up</h2>

                <p>

                    {prescription.followUpDate || "Not Scheduled"}

                </p>

            </div>

            {/* Remarks */}

            <div className="section">

                <h2>Doctor Remarks</h2>

                <p>

                    {prescription.doctorRemarks}

                </p>

            </div>

            {/* Footer */}

            <div className="footer">

                <button
                    className="print-btn"
                    onClick={() => window.print()}
                >
                    Print Prescription
                </button>

            </div>

        </div>

    );

};

export default ViewPrescription;