import { useEffect, useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({
    onSubmit,
    initialData = {},
    doctors = [],
    patients = [],
    loading = false,
}) => {

    // ==========================================
    // Form State
    // ==========================================

    const [formData, setFormData] = useState({

        patientId: "",

        doctorId: "",

        department: "",

        appointmentDate: "",

        appointmentTime: "",

        consultationType: "",

        reason: "",

        consultationFee: "",

        status: "Scheduled",

        notes: "",

    });

    const [errors, setErrors] = useState({});

    // ==========================================
    // Edit Mode
    // ==========================================

    useEffect(() => {

        if (initialData.id) {

            setFormData({

                patientId: initialData.patientId || "",

                doctorId: initialData.doctorId || "",

                department: initialData.department || "",

                appointmentDate:
                    initialData.appointmentDate || "",

                appointmentTime:
                    initialData.appointmentTime || "",

                consultationType:
                    initialData.consultationType || "",

                reason:
                    initialData.reason || "",

                consultationFee:
                    initialData.consultationFee || "",

                status:
                    initialData.status || "Scheduled",

                notes:
                    initialData.notes || "",

            });

        }

    }, [initialData]);

    // ==========================================
    // Handle Change
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "doctorId") {

            const doctor = doctors.find(
                d => String(d.id) === String(value)
            );

            setFormData(prev => ({

                ...prev,

                [name]: value,

                department:
                    doctor?.department || prev.department,

            }));

        } else {

            setFormData((prev) => ({

                ...prev,

                [name]: value,

            }));

        }

    };

    // ==========================================
    // Validation
    // ==========================================

    const validate = () => {

        const newErrors = {};

        if (!formData.patientId)

            newErrors.patientId =
                "Patient is required";

        if (!formData.doctorId)

            newErrors.doctorId =
                "Doctor is required";

        if (!formData.appointmentDate)

            newErrors.appointmentDate =
                "Appointment Date is required";

        if (!formData.appointmentTime)

            newErrors.appointmentTime =
                "Appointment Time is required";

        if (!formData.consultationType)

            newErrors.consultationType =
                "Consultation Type is required";

        if (!formData.reason.trim())

            newErrors.reason =
                "Reason is required";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate()) return;

        const payload = {

            ...formData,

            patientId: formData.patientId ? String(formData.patientId) : "",

            doctorId: formData.doctorId ? String(formData.doctorId) : "",

            reason: (formData.reason || "").trim(),

            notes: (formData.notes || "").trim(),

            consultationFee:
                formData.consultationFee === ""
                    ? "0"
                    : String(formData.consultationFee),

        };

        onSubmit(payload);

    };

    return (

        <form
            className="appointment-form"
            onSubmit={handleSubmit}
        >
                        {/* ========================================== */}
            {/* Patient */}
            {/* ========================================== */}

            <div className="form-group">

                <label>Patient *</label>

                <select
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleChange}
                >
                    <option value="">Select Patient</option>

                    {patients.map((patient) => (

                        <option
                            key={patient.id}
                            value={patient.id}
                        >
                            {patient.patientCode} - {patient.fullName}
                        </option>

                    ))}

                </select>

                <small>{errors.patientId}</small>

            </div>

            {/* ========================================== */}
            {/* Doctor */}
            {/* ========================================== */}

            <div className="form-group">

                <label>Doctor *</label>

                <select
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                >
                    <option value="">Select Doctor</option>

                    {doctors.map((doctor) => (

                        <option
                            key={doctor.id}
                            value={doctor.id}
                        >
                            {doctor.doctorCode} - {doctor.fullName}
                        </option>

                    ))}

                </select>

                <small>{errors.doctorId}</small>

            </div>

            {/* ========================================== */}
            {/* Department */}
            {/* ========================================== */}

            <div className="form-group">

                <label>Department</label>

                <input
                    type="text"
                    name="department"
                    value={formData.department}
                    readOnly
                />

            </div>

            {/* ========================================== */}
            {/* Appointment Date */}
            {/* ========================================== */}

            <div className="form-group">

                <label>Appointment Date *</label>

                <input
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                />

                <small>{errors.appointmentDate}</small>

            </div>

            {/* ========================================== */}
            {/* Appointment Time */}
            {/* ========================================== */}

            <div className="form-group">

                <label>Appointment Time *</label>

                <input
                    type="time"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                />

                <small>{errors.appointmentTime}</small>

            </div>

            {/* ========================================== */}
            {/* Consultation Type */}
            {/* ========================================== */}

            <div className="form-group">

                <label>Consultation Type *</label>

                <select
                    name="consultationType"
                    value={formData.consultationType}
                    onChange={handleChange}
                >
                    <option value="">Select Type</option>

                    <option value="Walk-In">
                        Walk-In
                    </option>

                    <option value="Online">
                        Online
                    </option>

                    <option value="Follow-up">
                        Follow-up
                    </option>

                    <option value="Emergency">
                        Emergency
                    </option>

                </select>

                <small>{errors.consultationType}</small>

            </div>

            {/* ========================================== */}
            {/* Consultation Fee */}
            {/* ========================================== */}

            <div className="form-group">

                <label>Consultation Fee</label>

                <input
                    type="number"
                    name="consultationFee"
                    value={formData.consultationFee}
                    onChange={handleChange}
                    placeholder="Enter Fee"
                />

            </div>

            {/* ========================================== */}
            {/* Status */}
            {/* ========================================== */}

            <div className="form-group">

                <label>Status</label>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="Scheduled">
                        Scheduled
                    </option>

                    <option value="Completed">
                        Completed
                    </option>

                    <option value="Cancelled">
                        Cancelled
                    </option>

                    <option value="No Show">
                        No Show
                    </option>

                </select>

            </div>

            {/* ========================================== */}
            {/* Reason */}
            {/* ========================================== */}

            <div className="form-group full-width">

                <label>Reason *</label>

                <textarea
                    rows="4"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Reason for Visit"
                />

                <small>{errors.reason}</small>

            </div>

            {/* ========================================== */}
            {/* Notes */}
            {/* ========================================== */}

            <div className="form-group full-width">

                <label>Notes</label>

                <textarea
                    rows="4"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Additional Notes"
                />

            </div>

            {/* ========================================== */}
            {/* Submit Button */}
            {/* ========================================== */}

            <div className="form-actions">

                <button
                    type="submit"
                    disabled={loading}
                    className="save-btn"
                >
                    {loading
                        ? "Saving..."
                        : initialData.id
                            ? "Update Appointment"
                            : "Save Appointment"}
                </button>

            </div>

        </form>

    );

};

export default AppointmentForm;
