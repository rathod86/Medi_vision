import { useEffect, useState } from "react";
import API from "../../api/axiosConfig";
import "./AdmissionForm.css";

const AdmissionForm = ({

    formData,

    setFormData,

    onSubmit,

    buttonText,

    loading = false,

}) => {

    // ==========================================
    // State
    // ==========================================

    const [patients, setPatients] = useState([]);

    const [doctors, setDoctors] = useState([]);

    const [errors, setErrors] = useState({});

    useEffect(() => {

        const loadDropdowns = async () => {

            try {

                const patientResponse = await API.get("/patients");

                const doctorResponse = await API.get("/doctors");

                setPatients(patientResponse.data);

                setDoctors(doctorResponse.data);

            } catch (error) {

                console.error("Error loading dropdowns", error);

            }

        };

        loadDropdowns();

    }, []);
    // Handle Change
    // ==========================================

    const handleChange = (e) => {

        const {

            name,

            value,

        } = e.target;

        setFormData({

            ...formData,

            [name]: value,

        });

    };

    // ==========================================
    // Validation
    // ==========================================

    const validate = () => {

        const newErrors = {};

        if (!formData.patientId?.trim())
            newErrors.patientId = "Patient is required";

        if (!formData.doctorId?.trim())
            newErrors.doctorId = "Doctor is required";

        if (!formData.admissionDate?.trim())
            newErrors.admissionDate = "Admission Date is required";

        if (!formData.admissionTime?.trim())
            newErrors.admissionTime = "Admission Time is required";

        if (!formData.department?.trim())
            newErrors.department = "Department is required";

        if (!formData.ward?.trim())
            newErrors.ward = "Ward is required";

        if (!formData.roomNumber?.trim())
            newErrors.roomNumber = "Room Number is required";

        if (!formData.bedNumber?.trim())
            newErrors.bedNumber = "Bed Number is required";

        if (!formData.diagnosis?.trim())
            newErrors.diagnosis = "Diagnosis is required";

        const stayDays = Number(formData.expectedStayDays);
        if (!stayDays || stayDays <= 0)
            newErrors.expectedStayDays = "Expected stay must be greater than 0";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!validate()) return;

        const payload = {

            ...formData,

            patientId: formData.patientId ? String(formData.patientId) : "",

            doctorId: formData.doctorId ? String(formData.doctorId) : "",

            reasonForAdmission: (formData.reasonForAdmission || "").trim(),

            notes: (formData.notes || "").trim(),

            estimatedCost:
                formData.estimatedCost === ""
                    ? "0"
                    : String(formData.estimatedCost),

            initialDeposit:
                formData.initialDeposit === ""
                    ? "0"
                    : String(formData.initialDeposit),

            expectedStayDays:
                formData.expectedStayDays === ""
                    ? "1"
                    : String(formData.expectedStayDays),

        };

        onSubmit(payload);

    };

    return (

        <form
            className="admission-form"
            onSubmit={handleSubmit}
        >

            <h2>

                Admission Information

            </h2>

            <div className="form-grid">

                {/* Patient */}

                <div className="form-group">

                    <label>

                        Patient *

                    </label>

                    <select

                        name="patientId"

                        value={formData.patientId}

                        onChange={handleChange}

                        required

                    >

                        <option value="">

                            Select Patient

                        </option>

                        {patients.map((patient) => (

                            <option

                                key={patient.id}

                                value={patient.id}

                            >

                                {patient.fullName}

                            </option>

                        ))}

                    </select>

                    {errors.patientId && <small className="error">{errors.patientId}</small>}

                </div>

                {/* Doctor */}

                <div className="form-group">

                    <label>

                        Doctor *

                    </label>

                    <select

                        name="doctorId"

                        value={formData.doctorId}

                        onChange={handleChange}

                        required

                    >

                        <option value="">

                            Select Doctor

                        </option>

                        {doctors.map((doctor) => (

                            <option

                                key={doctor.id}

                                value={doctor.id}

                            >

                                {doctor.fullName}

                            </option>

                        ))}

                    </select>

                    {errors.doctorId && <small className="error">{errors.doctorId}</small>}

                </div>

                {/* Admission Date */}

                <div className="form-group">

                    <label>

                        Admission Date *

                    </label>

                   <input
    type="date"
    name="admissionDate"
    value={formData.admissionDate}
    onChange={handleChange}
    min={new Date().toISOString().split("T")[0]}
    required
/>

                    {errors.admissionDate && <small className="error">{errors.admissionDate}</small>}

                </div>

                {/* Admission Time */}

                <div className="form-group">

                    <label>

                        Admission Time *

                    </label>

                    <input

                        type="time"

                        name="admissionTime"

                        value={formData.admissionTime}

                        onChange={handleChange}

                        required

                    />

                    {errors.admissionTime && <small className="error">{errors.admissionTime}</small>}

                </div>

                {/* Admission Type */}

                <div className="form-group">

                    <label>

                        Admission Type

                    </label>

                    <select

                        name="admissionType"

                        value={formData.admissionType}

                        onChange={handleChange}

                    >

                        <option value="">

                            Select

                        </option>

                        <option>

                            Emergency

                        </option>

                        <option>

                            General

                        </option>

                        <option>

                            Surgery

                        </option>

                        <option>

                            ICU

                        </option>

                    </select>

                </div>

                {/* Department */}

                <div className="form-group">

                    <label>

                        Department *

                    </label>

                    <input

                        type="text"

                        name="department"

                        value={formData.department}

                        onChange={handleChange}

                        required

                    />

                    {errors.department && <small className="error">{errors.department}</small>}

                </div>

                              {/* Ward */}

                <div className="form-group">

                    <label>

                        Ward *

                    </label>

                    <input

                        type="text"

                        name="ward"

                        value={formData.ward}

                        onChange={handleChange}

                        placeholder="Ward"

                        required

                    />

                    {errors.ward && <small className="error">{errors.ward}</small>}

                </div>

                {/* Room Number */}

                <div className="form-group">

                    <label>

                        Room Number *

                    </label>

                    <input

                        type="text"

                        name="roomNumber"

                        value={formData.roomNumber}

                        onChange={handleChange}

                        placeholder="Room Number"

                        required

                    />

                    {errors.roomNumber && <small className="error">{errors.roomNumber}</small>}

                </div>

                {/* Bed Number */}

                <div className="form-group">

                    <label>

                        Bed Number *

                    </label>

                    <input

                        type="text"

                        name="bedNumber"

                        value={formData.bedNumber}

                        onChange={handleChange}

                        placeholder="Bed Number"

                        required

                    />

                    {errors.bedNumber && <small className="error">{errors.bedNumber}</small>}

                </div>

                {/* Diagnosis */}

                <div className="form-group">

                    <label>

                        Diagnosis *

                    </label>

                    <input

                        type="text"

                        name="diagnosis"

                        value={formData.diagnosis}

                        onChange={handleChange}

                        placeholder="Diagnosis"

                        required

                    />

                    {errors.diagnosis && <small className="error">{errors.diagnosis}</small>}

                </div>

                {/* Symptoms */}

                <div className="form-group full-width">

                    <label>

                        Symptoms

                    </label>

                    <textarea

                        name="symptoms"

                        value={formData.symptoms}

                        onChange={handleChange}

                        rows="3"

                    />

                </div>

                {/* Reason */}

                <div className="form-group full-width">

                    <label>

                        Reason For Admission

                    </label>

                    <textarea

                        name="reasonForAdmission"

                        value={formData.reasonForAdmission}

                        onChange={handleChange}

                        rows="3"

                    />

                </div>

                {/* Insurance */}

                <div className="form-group">

                    <label>

                        Insurance Provider

                    </label>

                    <input

                        type="text"

                        name="insuranceProvider"

                        value={formData.insuranceProvider}

                        onChange={handleChange}

                    />

                </div>

                {/* Policy Number */}

                <div className="form-group">

                    <label>

                        Policy Number

                    </label>

                    <input

                        type="text"

                        name="policyNumber"

                        value={formData.policyNumber}

                        onChange={handleChange}

                    />

                </div>

                {/* Estimated Cost */}

                <div className="form-group">

                    <label>

                        Estimated Cost

                    </label>

                    <input

                        type="number"

                        name="estimatedCost"

                        value={formData.estimatedCost}

                        onChange={handleChange}

                    />

                </div>

                {/* Initial Deposit */}

                <div className="form-group">

                    <label>

                        Initial Deposit

                    </label>

                    <input

                        type="number"

                        name="initialDeposit"

                        value={formData.initialDeposit}

                        onChange={handleChange}

                    />

                </div>

                {/* Expected Stay */}

                <div className="form-group">

                    <label>

                        Expected Stay (Days) *

                    </label>

                    <input

                        type="number"

                        name="expectedStayDays"

                        value={formData.expectedStayDays}

                        onChange={handleChange}

                        min="1"

                        required

                    />

                    {errors.expectedStayDays && <small className="error">{errors.expectedStayDays}</small>}

                </div>

                {/* Status */}

                <div className="form-group">

                    <label>

                        Status

                    </label>

                    <select

                        name="status"

                        value={formData.status}

                        onChange={handleChange}

                    >

                        <option value="">

                            Select Status

                        </option>

                        <option value="Admitted">

                            Admitted

                        </option>

                        <option value="Under Observation">

                            Under Observation

                        </option>

                        <option value="Transferred">

                            Transferred

                        </option>

                        <option value="Discharged">

                            Discharged

                        </option>

                    </select>

                </div>

                {/* Notes */}

                <div className="form-group full-width">

                    <label>

                        Notes

                    </label>

                    <textarea

                        name="notes"

                        value={formData.notes}

                        onChange={handleChange}

                        rows="4"

                    />

                </div>

            </div>

            {/* Submit */}

            <div className="form-actions">

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                >

                    {loading ? "Saving..." : buttonText}

                </button>

            </div>

        </form>

    );

};

export default AdmissionForm;  
