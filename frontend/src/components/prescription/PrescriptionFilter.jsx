import React from "react";
import "./PrescriptionFilter.css";

const PrescriptionFilter = ({
    status,
    setStatus,
    patient,
    setPatient,
    doctor,
    setDoctor,
    prescriptionDate,
    setPrescriptionDate,
    followUpDate,
    setFollowUpDate,
    resetFilters,
}) => {

    return (

        <div className="prescription-filter">

            {/* Status */}

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >

                <option value="">All Status</option>

                <option value="Draft">Draft</option>

                <option value="Issued">Issued</option>

                <option value="Dispensed">Dispensed</option>

                <option value="Completed">Completed</option>

                <option value="Cancelled">Cancelled</option>

            </select>

            {/* Patient */}

            <input
                type="text"
                placeholder="Patient Name"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
            />

            {/* Doctor */}

            <input
                type="text"
                placeholder="Doctor Name"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
            />

            {/* Prescription Date */}

            <input
                type="date"
                value={prescriptionDate}
                onChange={(e) =>
                    setPrescriptionDate(e.target.value)
                }
            />

            {/* Follow-up Date */}

            <input
                type="date"
                value={followUpDate}
                onChange={(e) =>
                    setFollowUpDate(e.target.value)
                }
            />

            {/* Reset */}

            <button
                className="reset-btn"
                onClick={resetFilters}
            >
                Reset Filters
            </button>

        </div>

    );

};

export default PrescriptionFilter;