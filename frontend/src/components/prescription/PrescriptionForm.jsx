import React from "react";
import "./PrescriptionForm.css";

const PrescriptionForm = ({
    formData,
    handleChange,
    handleMedicineChange,
    addMedicine,
    removeMedicine,
    handleSubmit,
    patients = [],
    doctors = [],
    appointments = [],
    admissions = [],
    medicines = [],
    buttonText,
}) => {

    return (

        <div className="prescription-form-container">

            <form
                className="prescription-form"
                onSubmit={handleSubmit}
            >

                <h2>{buttonText} Prescription</h2>

                <div className="form-grid">

                    {/* Patient */}

                    <div className="form-group">

                        <label>Patient</label>

                        <select
                            name="patientId"
                            value={formData.patientId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Patient
                            </option>

                            {patients.map(patient => (

                                <option
                                    key={patient.id}
                                    value={patient.id}
                                >
                                    {patient.patientCode} - {patient.fullName}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Doctor */}

                    <div className="form-group">

                        <label>Doctor</label>

                        <select
                            name="doctorId"
                            value={formData.doctorId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Doctor
                            </option>

                            {doctors.map(doctor => (

                                <option
                                    key={doctor.id}
                                    value={doctor.id}
                                >
                                    {doctor.doctorCode} - {doctor.fullName}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Appointment */}

                    <div className="form-group">

                        <label>Appointment</label>

                        <select
                            name="appointmentId"
                            value={formData.appointmentId}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Appointment
                            </option>

                            {appointments.map(appointment => (

                                <option
                                    key={appointment.id}
                                    value={appointment.id}
                                >
                                    {appointment.id}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Admission */}

                    <div className="form-group">

                        <label>Admission</label>

                        <select
                            name="admissionId"
                            value={formData.admissionId}
                            onChange={handleChange}
                        >

                            <option value="">
                                Select Admission
                            </option>

                            {admissions.map(admission => (

                                <option
                                    key={admission.id}
                                    value={admission.id}
                                >
                                    {admission.id}
                                </option>

                            ))}

                        </select>

                    </div>

                    {/* Symptoms */}

                    <div className="form-group full-width">

                        <label>Symptoms</label>

                        <textarea
                            name="symptoms"
                            rows="3"
                            value={formData.symptoms}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* Diagnosis */}

                    <div className="form-group full-width">

                        <label>Diagnosis</label>

                        <textarea
                            name="diagnosis"
                            rows="3"
                            value={formData.diagnosis}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* Allergies */}

                    <div className="form-group full-width">

                        <label>Allergies</label>

                        <textarea
                            name="allergies"
                            rows="3"
                            value={formData.allergies}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Clinical Notes */}

                    <div className="form-group full-width">

                        <label>Clinical Notes</label>

                        <textarea
                            name="clinicalNotes"
                            rows="4"
                            value={formData.clinicalNotes}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Doctor Remarks */}

                    <div className="form-group full-width">

                        <label>Doctor Remarks</label>

                        <textarea
                            name="doctorRemarks"
                            rows="4"
                            value={formData.doctorRemarks}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Prescription Date */}

                    <div className="form-group">

                        <label>Prescription Date</label>

                        <input
                            type="date"
                            name="prescriptionDate"
                            value={formData.prescriptionDate}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* Follow Up */}

                    <div className="form-group">

                        <label>Follow Up Date</label>

                        <input
                            type="date"
                            name="followUpDate"
                            value={formData.followUpDate}
                            onChange={handleChange}
                        />

                    </div>

                    {/* Status */}

                    <div className="form-group">

                        <label>Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >

                            <option value="Draft">Draft</option>

                            <option value="Issued">Issued</option>

                            <option value="Dispensed">Dispensed</option>

                            <option value="Completed">Completed</option>

                            <option value="Cancelled">Cancelled</option>

                        </select>

                    </div>

                </div>

                {/* ===================================== */}
                {/* Medicines */}
                {/* ===================================== */}

                <div className="medicine-section">

                    <div className="medicine-header">

                        <h3>Prescribed Medicines</h3>

                        <button
                            type="button"
                            className="add-medicine-btn"
                            onClick={addMedicine}
                        >
                            + Add Medicine
                        </button>

                    </div>

                    {Array.isArray(formData.medicines) && formData.medicines.map((item, index) => (

                        <div
                            key={index}
                            className="medicine-card"
                        >

                            {/* Medicine */}

                            <div className="form-group">

                                <label>Medicine</label>

                                <select
                                    value={item.medicineId}
                                    onChange={(e) =>
                                        handleMedicineChange(
                                            index,
                                            "medicineId",
                                            e.target.value
                                        )
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Medicine
                                    </option>

                                    {medicines.map((medicine) => (

                                        <option
                                            key={medicine.id}
                                            value={medicine.id}
                                        >
                                            {medicine.medicineName}
                                        </option>

                                    ))}

                                </select>

                            </div>

                            {/* Dosage */}

                            <div className="form-group">

                                <label>Dosage</label>

                                <input
                                    type="text"
                                    value={item.dosage}
                                    onChange={(e) =>
                                        handleMedicineChange(
                                            index,
                                            "dosage",
                                            e.target.value
                                        )
                                    }
                                    placeholder="500 mg"
                                />

                            </div>

                            {/* Route */}

                            <div className="form-group">

                                <label>Route</label>

                                <select
                                    value={item.route}
                                    onChange={(e) =>
                                        handleMedicineChange(
                                            index,
                                            "route",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">Select</option>
                                    <option value="Oral">Oral</option>
                                    <option value="IV">IV</option>
                                    <option value="IM">IM</option>
                                    <option value="Topical">Topical</option>
                                    <option value="Eye">Eye</option>
                                    <option value="Ear">Ear</option>

                                </select>

                            </div>

                            {/* Frequency */}

                            <div className="form-group">

                                <label>Frequency</label>

                                <select
                                    value={item.frequency}
                                    onChange={(e) =>
                                        handleMedicineChange(
                                            index,
                                            "frequency",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="Once Daily">
                                        Once Daily
                                    </option>

                                    <option value="Twice Daily">
                                        Twice Daily
                                    </option>

                                    <option value="Three Times Daily">
                                        Three Times Daily
                                    </option>

                                    <option value="SOS">
                                        SOS
                                    </option>

                                </select>

                            </div>

                            {/* Duration */}

                            <div className="form-group">

                                <label>Duration</label>

                                <input
                                    type="text"
                                    value={item.duration}
                                    onChange={(e) =>
                                        handleMedicineChange(
                                            index,
                                            "duration",
                                            e.target.value
                                        )
                                    }
                                    placeholder="5 Days"
                                />

                            </div>

                            {/* Quantity */}

                            <div className="form-group">

                                <label>Quantity</label>

                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleMedicineChange(
                                            index,
                                            "quantity",
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                                                        {/* Morning */}

                            <div className="form-group checkbox-group">

                                <label>

                                    <input
                                        type="checkbox"
                                        checked={item.morning}
                                        onChange={(e) =>
                                            handleMedicineChange(
                                                index,
                                                "morning",
                                                e.target.checked
                                            )
                                        }
                                    />

                                    Morning

                                </label>

                            </div>

                            {/* Afternoon */}

                            <div className="form-group checkbox-group">

                                <label>

                                    <input
                                        type="checkbox"
                                        checked={item.afternoon}
                                        onChange={(e) =>
                                            handleMedicineChange(
                                                index,
                                                "afternoon",
                                                e.target.checked
                                            )
                                        }
                                    />

                                    Afternoon

                                </label>

                            </div>

                            {/* Night */}

                            <div className="form-group checkbox-group">

                                <label>

                                    <input
                                        type="checkbox"
                                        checked={item.night}
                                        onChange={(e) =>
                                            handleMedicineChange(
                                                index,
                                                "night",
                                                e.target.checked
                                            )
                                        }
                                    />

                                    Night

                                </label>

                            </div>

                            {/* Morning Time */}

                            <div className="form-group">

                                <label>Morning Time</label>

                                <input
                                    type="time"
                                    value={item.morningTime}
                                    onChange={(e) =>
                                        handleMedicineChange(
                                            index,
                                            "morningTime",
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            {/* Afternoon Time */}

                            <div className="form-group">

                                <label>Afternoon Time</label>

                                <input
                                    type="time"
                                    value={item.afternoonTime}
                                    onChange={(e) =>
                                        handleMedicineChange(
                                            index,
                                            "afternoonTime",
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            {/* Night Time */}

                            <div className="form-group">

                                <label>Night Time</label>

                                <input
                                    type="time"
                                    value={item.nightTime}
                                    onChange={(e) =>
                                        handleMedicineChange(
                                            index,
                                            "nightTime",
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            {/* Food Instruction */}

                            <div className="form-group">

                                <label>Food Instruction</label>

                                <select
                                    value={item.foodInstruction}
                                    onChange={(e) =>
                                        handleMedicineChange(
                                            index,
                                            "foodInstruction",
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="">
                                        Select
                                    </option>

                                    <option value="Before Food">
                                        Before Food
                                    </option>

                                    <option value="After Food">
                                        After Food
                                    </option>

                                    <option value="With Food">
                                        With Food
                                    </option>

                                </select>

                            </div>

                            {/* Special Instructions */}

                            <div className="form-group full-width">

                                <label>Special Instructions</label>

                                <textarea
                                    rows="2"
                                    value={item.specialInstructions}
                                    onChange={(e) =>
                                        handleMedicineChange(
                                            index,
                                            "specialInstructions",
                                            e.target.value
                                        )
                                    }
                                />

                            </div>

                            {/* Reminder */}

                            <div className="form-group checkbox-group">

                                <label>

                                    <input
                                        type="checkbox"
                                        checked={item.reminderEnabled}
                                        onChange={(e) =>
                                            handleMedicineChange(
                                                index,
                                                "reminderEnabled",
                                                e.target.checked
                                            )
                                        }
                                    />

                                    Enable Reminder

                                </label>

                            </div>

                            {/* Remove Button */}

                            <div className="form-group">

                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() =>
                                        removeMedicine(index)
                                    }
                                >
                                    Remove Medicine
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

                {/* Submit */}

                <button
                    type="submit"
                    className="save-btn"
                >
                    {buttonText}
                </button>

            </form>

        </div>

    );

};

export default PrescriptionForm;