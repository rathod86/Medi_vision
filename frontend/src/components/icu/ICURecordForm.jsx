import React, { useEffect, useState } from "react";

import { getAllPatients } from "../../services/patientService";
import { getAllDoctors } from "../../services/doctorService";
import { getAllNurses } from "../../services/nurseService";

import "./ICURecordForm.css";

const ICURecordForm = ({
    initialData = {},
    onSubmit,
    onCancel,
    loading = false,
    mode = "add"
}) => {

    // =====================================================
    // Dropdown Data
    // =====================================================

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [nurses, setNurses] = useState([]);

    const [loadingPatients, setLoadingPatients] =
        useState(true);

    const [loadingDoctors, setLoadingDoctors] =
        useState(true);

    const [loadingNurses, setLoadingNurses] =
        useState(true);


    // =====================================================
    // Form Data
    // =====================================================

    const [formData, setFormData] = useState({

        // Relationships
        patientId: initialData.patientId || "",
        doctorId: initialData.doctorId || "",
        nurseId: initialData.nurseId || "",
        admissionId: initialData.admissionId || "",
        prescriptionId:
            initialData.prescriptionId || "",

        // ICU Details
        icuStartDate:
            initialData.icuStartDate || "",

        icuEndDate:
            initialData.icuEndDate || "",

        bedNumber:
            initialData.bedNumber || "",

        wardNumber:
            initialData.wardNumber || "",

        criticalLevel:
            initialData.criticalLevel || "Critical",

        ventilatorRequired:
            initialData.ventilatorRequired ?? false,

        isolationRequired:
            initialData.isolationRequired ?? false,

        // Diagnosis
        diagnosis:
            initialData.diagnosis || "",

        treatmentPlan:
            initialData.treatmentPlan || "",

        // Vital Signs
        oxygenLevel:
            initialData.oxygenLevel || "",

        heartRate:
            initialData.heartRate || "",

        bloodPressure:
            initialData.bloodPressure || "",

        respiratoryRate:
            initialData.respiratoryRate || "",

        bodyTemperature:
            initialData.bodyTemperature || "",

        // Doctor
        doctorDegree:
            initialData.doctorDegree || "",

        // Monitoring
        dailyNotes:
            initialData.dailyNotes || "",

        medicationsGiven:
            initialData.medicationsGiven || "",

        proceduresPerformed:
            initialData.proceduresPerformed || "",

        // Discharge
        dischargeSummary:
            initialData.dischargeSummary || "",

        // Status
        status:
            initialData.status || "Admitted"
    });


    // =====================================================
    // Errors
    // =====================================================

    const [errors, setErrors] = useState({});


    // =====================================================
    // Load Patients
    // =====================================================

    useEffect(() => {

        const loadPatients = async () => {

            try {

                setLoadingPatients(true);

                const response =
                    await getAllPatients();

                setPatients(
                    Array.isArray(response)
                        ? response
                        : []
                );

            } catch (error) {

                console.error(
                    "Error loading patients:",
                    error
                );

                setPatients([]);

            } finally {

                setLoadingPatients(false);
            }
        };

        loadPatients();

    }, []);


    // =====================================================
    // Load Doctors
    // =====================================================

    useEffect(() => {

        const loadDoctors = async () => {

            try {

                setLoadingDoctors(true);

                const response =
                    await getAllDoctors();

                setDoctors(
                    Array.isArray(response)
                        ? response
                        : []
                );

            } catch (error) {

                console.error(
                    "Error loading doctors:",
                    error
                );

                setDoctors([]);

            } finally {

                setLoadingDoctors(false);
            }
        };

        loadDoctors();

    }, []);


    // =====================================================
    // Load Nurses
    // =====================================================

    useEffect(() => {

        const loadNurses = async () => {

            try {

                setLoadingNurses(true);

                const response =
                    await getAllNurses();

                setNurses(
                    Array.isArray(response)
                        ? response
                        : []
                );

            } catch (error) {

                console.error(
                    "Error loading nurses:",
                    error
                );

                // Nurse is optional.
                setNurses([]);

            } finally {

                setLoadingNurses(false);
            }
        };

        loadNurses();

    }, []);


    // =====================================================
    // Handle Input Change
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value,
            type,
            checked
        } = event.target;


        setFormData((previous) => ({
            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));


        setErrors((previous) => ({
            ...previous,
            [name]: ""
        }));


        // -------------------------------------------------
        // Automatically set doctor degree
        // -------------------------------------------------

        if (name === "doctorId") {

            const selectedDoctor =
                doctors.find(
                    (doctor) =>
                        String(doctor.id) ===
                        String(value)
                );


            setFormData((previous) => ({
                ...previous,

                doctorId: value,

                doctorDegree:
                    selectedDoctor?.degree ||
                    selectedDoctor?.qualification ||
                    ""
            }));
        }
    };


    // =====================================================
    // Validate Form
    // =====================================================

    const validateForm = () => {

        const newErrors = {};


        // Patient
        if (!formData.patientId) {

            newErrors.patientId =
                "Patient is required.";
        }


        // Doctor
        if (!formData.doctorId) {

            newErrors.doctorId =
                "Doctor is required.";
        }


        // ICU Start Date
        if (!formData.icuStartDate) {

            newErrors.icuStartDate =
                "ICU start date is required.";
        }


        // Bed Number
        if (
            !formData.bedNumber ||
            !formData.bedNumber.trim()
        ) {

            newErrors.bedNumber =
                "Bed number is required.";
        }


        // Ward Number
        if (
            !formData.wardNumber ||
            !formData.wardNumber.trim()
        ) {

            newErrors.wardNumber =
                "Ward number is required.";
        }


        // Critical Level
        if (!formData.criticalLevel) {

            newErrors.criticalLevel =
                "Critical level is required.";
        }


        // Date Validation
        if (
            formData.icuStartDate &&
            formData.icuEndDate &&
            formData.icuEndDate <
                formData.icuStartDate
        ) {

            newErrors.icuEndDate =
                "ICU end date cannot be before start date.";
        }


        setErrors(newErrors);

        return (
            Object.keys(newErrors).length === 0
        );
    };


    // =====================================================
    // Submit Form
    // =====================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        if (!validateForm()) {
            return;
        }


        // =================================================
        // Build Backend Request
        // =================================================

        const payload = {

            // -------------------------------------------------
            // REQUIRED RELATIONSHIPS
            // -------------------------------------------------

            patientId:
                Number(formData.patientId),

            doctorId:
                Number(formData.doctorId),


            // -------------------------------------------------
            // OPTIONAL RELATIONSHIPS
            // -------------------------------------------------

            nurseId:
                formData.nurseId
                    ? Number(formData.nurseId)
                    : null,

            admissionId:
                formData.admissionId
                    ? Number(formData.admissionId)
                    : null,

            prescriptionId:
                formData.prescriptionId
                    ? Number(formData.prescriptionId)
                    : null,


            // -------------------------------------------------
            // ICU DETAILS
            // -------------------------------------------------

            icuStartDate:
                formData.icuStartDate,

            icuEndDate:
                formData.icuEndDate || null,

            bedNumber:
                formData.bedNumber.trim(),

            wardNumber:
                formData.wardNumber.trim(),

            criticalLevel:
                formData.criticalLevel,

            ventilatorRequired:
                Boolean(
                    formData.ventilatorRequired
                ),

            isolationRequired:
                Boolean(
                    formData.isolationRequired
                ),


            // -------------------------------------------------
            // DIAGNOSIS
            // -------------------------------------------------

            diagnosis:
                formData.diagnosis.trim(),

            treatmentPlan:
                formData.treatmentPlan.trim(),


            // -------------------------------------------------
            // VITAL SIGNS
            // -------------------------------------------------

            oxygenLevel:
                formData.oxygenLevel.trim(),

            heartRate:
                formData.heartRate.trim(),

            bloodPressure:
                formData.bloodPressure.trim(),

            respiratoryRate:
                formData.respiratoryRate.trim(),

            bodyTemperature:
                formData.bodyTemperature.trim(),


            // -------------------------------------------------
            // DOCTOR
            // -------------------------------------------------

            doctorDegree:
                formData.doctorDegree.trim(),


            // -------------------------------------------------
            // DAILY MONITORING
            // -------------------------------------------------

            dailyNotes:
                formData.dailyNotes.trim(),

            medicationsGiven:
                formData.medicationsGiven.trim(),

            proceduresPerformed:
                formData.proceduresPerformed.trim(),


            // -------------------------------------------------
            // DISCHARGE
            // -------------------------------------------------

            dischargeSummary:
                formData.dischargeSummary.trim(),


            // -------------------------------------------------
            // STATUS
            // -------------------------------------------------

            status:
                formData.status
        };


        try {

            await onSubmit(payload);

        } catch (error) {

            console.error(
                "ICU record form submission error:",
                error
            );
        }
    };


    // =====================================================
    // Render
    // =====================================================

    return (
        <div className="icu-form-container">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="icu-form-header">

                <div>

                    <h2>
                        {mode === "edit"
                            ? "Edit ICU Record"
                            : "Add ICU Record"}
                    </h2>

                    <p>
                        Manage ICU admission,
                        treatment and monitoring
                        information.
                    </p>

                </div>

            </div>


            <form
                className="icu-form"
                onSubmit={handleSubmit}
            >

                {/* =================================================
                    PATIENT & MEDICAL TEAM
                ================================================= */}

                <section className="icu-form-section">

                    <h3>
                        Patient & Medical Team
                    </h3>


                    <div className="icu-form-grid">

                        {/* Patient */}

                        <div className="form-group">

                            <label>
                                Patient
                                <span className="required">
                                    *
                                </span>
                            </label>


                            <select
                                name="patientId"
                                value={
                                    formData.patientId
                                }
                                onChange={handleChange}
                                disabled={loading}
                            >

                                <option value="">
                                    {loadingPatients
                                        ? "Loading patients..."
                                        : "Select Patient"}
                                </option>


                                {patients.map(
                                    (patient) => (

                                        <option
                                            key={patient.id}
                                            value={patient.id}
                                        >
                                            {patient.patientCode
                                                ? `${patient.patientCode} - `
                                                : ""}
                                            {patient.fullName ||
                                                patient.name}
                                        </option>

                                    )
                                )}

                            </select>


                            {errors.patientId && (

                                <small className="form-error">
                                    {errors.patientId}
                                </small>

                            )}

                        </div>


                        {/* Doctor */}

                        <div className="form-group">

                            <label>
                                Doctor
                                <span className="required">
                                    *
                                </span>
                            </label>


                            <select
                                name="doctorId"
                                value={
                                    formData.doctorId
                                }
                                onChange={handleChange}
                                disabled={loading}
                            >

                                <option value="">
                                    {loadingDoctors
                                        ? "Loading doctors..."
                                        : "Select Doctor"}
                                </option>


                                {doctors.map(
                                    (doctor) => (

                                        <option
                                            key={doctor.id}
                                            value={doctor.id}
                                        >
                                            {doctor.fullName ||
                                                doctor.name}
                                        </option>

                                    )
                                )}

                            </select>


                            {errors.doctorId && (

                                <small className="form-error">
                                    {errors.doctorId}
                                </small>

                            )}

                        </div>


                        {/* Nurse */}

                        <div className="form-group">

                            <label>
                                Nurse
                                <span className="optional">
                                    Optional
                                </span>
                            </label>


                            <select
                                name="nurseId"
                                value={
                                    formData.nurseId
                                }
                                onChange={handleChange}
                                disabled={loading}
                            >

                                <option value="">
                                    No Nurse Assigned
                                </option>


                                {nurses.map(
                                    (nurse) => (

                                        <option
                                            key={nurse.id}
                                            value={nurse.id}
                                        >
                                            {nurse.employeeCode
                                                ? `${nurse.employeeCode} - `
                                                : ""}
                                            {nurse.fullName}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        {/* Doctor Degree */}

                        <div className="form-group">

                            <label>
                                Doctor Degree
                            </label>


                            <input
                                type="text"
                                name="doctorDegree"
                                value={
                                    formData.doctorDegree
                                }
                                onChange={handleChange}
                                placeholder="MBBS / MD / MS"
                            />

                        </div>

                    </div>

                </section>


                {/* =================================================
                    ICU DETAILS
                ================================================= */}

                <section className="icu-form-section">

                    <h3>
                        ICU Details
                    </h3>


                    <div className="icu-form-grid">

                        {/* Start Date */}

                        <div className="form-group">

                            <label>
                                ICU Start Date
                                <span className="required">
                                    *
                                </span>
                            </label>


                            <input
                                type="date"
                                name="icuStartDate"
                                value={
                                    formData.icuStartDate
                                }
                                onChange={handleChange}
                            />


                            {errors.icuStartDate && (

                                <small className="form-error">
                                    {errors.icuStartDate}
                                </small>

                            )}

                        </div>


                        {/* End Date */}

                        <div className="form-group">

                            <label>
                                ICU End Date
                            </label>


                            <input
                                type="date"
                                name="icuEndDate"
                                value={
                                    formData.icuEndDate
                                }
                                onChange={handleChange}
                            />


                            {errors.icuEndDate && (

                                <small className="form-error">
                                    {errors.icuEndDate}
                                </small>

                            )}

                        </div>


                        {/* Bed */}

                        <div className="form-group">

                            <label>
                                Bed Number
                                <span className="required">
                                    *
                                </span>
                            </label>


                            <input
                                type="text"
                                name="bedNumber"
                                value={
                                    formData.bedNumber
                                }
                                onChange={handleChange}
                                placeholder="ICU-01"
                            />


                            {errors.bedNumber && (

                                <small className="form-error">
                                    {errors.bedNumber}
                                </small>

                            )}

                        </div>


                        {/* Ward */}

                        <div className="form-group">

                            <label>
                                Ward Number
                                <span className="required">
                                    *
                                </span>
                            </label>


                            <input
                                type="text"
                                name="wardNumber"
                                value={
                                    formData.wardNumber
                                }
                                onChange={handleChange}
                                placeholder="ICU-A"
                            />


                            {errors.wardNumber && (

                                <small className="form-error">
                                    {errors.wardNumber}
                                </small>

                            )}

                        </div>


                        {/* Critical Level */}

                        <div className="form-group">

                            <label>
                                Critical Level
                                <span className="required">
                                    *
                                </span>
                            </label>


                            <select
                                name="criticalLevel"
                                value={
                                    formData.criticalLevel
                                }
                                onChange={handleChange}
                            >

                                <option value="Critical">
                                    Critical
                                </option>

                                <option value="High">
                                    High
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="Low">
                                    Low
                                </option>

                            </select>

                        </div>


                        {/* Status */}

                        <div className="form-group">

                            <label>
                                Status
                            </label>


                            <select
                                name="status"
                                value={
                                    formData.status
                                }
                                onChange={handleChange}
                            >

                                <option value="Admitted">
                                    Admitted
                                </option>

                                <option value="Active">
                                    Active
                                </option>

                                <option value="Critical">
                                    Critical
                                </option>

                                <option value="Stable">
                                    Stable
                                </option>

                                <option value="Discharged">
                                    Discharged
                                </option>

                                <option value="Transferred">
                                    Transferred
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* =================================================
                        ICU OPTIONS
                    ================================================= */}

                    <div className="icu-checkbox-row">

                        <label className="checkbox-label">

                            <input
                                type="checkbox"
                                name="ventilatorRequired"
                                checked={
                                    formData.ventilatorRequired
                                }
                                onChange={handleChange}
                            />

                            <span>
                                Ventilator Required
                            </span>

                        </label>


                        <label className="checkbox-label">

                            <input
                                type="checkbox"
                                name="isolationRequired"
                                checked={
                                    formData.isolationRequired
                                }
                                onChange={handleChange}
                            />

                            <span>
                                Isolation Required
                            </span>

                        </label>

                    </div>

                </section>


                {/* =================================================
                    DIAGNOSIS & TREATMENT
                ================================================= */}

                <section className="icu-form-section">

                    <h3>
                        Diagnosis & Treatment
                    </h3>


                    <div className="form-group">

                        <label>
                            Diagnosis
                        </label>


                        <textarea
                            name="diagnosis"
                            value={
                                formData.diagnosis
                            }
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter patient diagnosis..."
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Treatment Plan
                        </label>


                        <textarea
                            name="treatmentPlan"
                            value={
                                formData.treatmentPlan
                            }
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter treatment plan..."
                        />

                    </div>

                </section>


                {/* =================================================
                    VITAL SIGNS
                ================================================= */}

                <section className="icu-form-section">

                    <h3>
                        Vital Signs
                    </h3>


                    <div className="icu-form-grid">

                        <div className="form-group">

                            <label>
                                Oxygen Level
                            </label>

                            <input
                                type="text"
                                name="oxygenLevel"
                                value={
                                    formData.oxygenLevel
                                }
                                onChange={handleChange}
                                placeholder="98%"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Heart Rate
                            </label>

                            <input
                                type="text"
                                name="heartRate"
                                value={
                                    formData.heartRate
                                }
                                onChange={handleChange}
                                placeholder="72 bpm"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Blood Pressure
                            </label>

                            <input
                                type="text"
                                name="bloodPressure"
                                value={
                                    formData.bloodPressure
                                }
                                onChange={handleChange}
                                placeholder="120/80 mmHg"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Respiratory Rate
                            </label>

                            <input
                                type="text"
                                name="respiratoryRate"
                                value={
                                    formData.respiratoryRate
                                }
                                onChange={handleChange}
                                placeholder="16 /min"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Body Temperature
                            </label>

                            <input
                                type="text"
                                name="bodyTemperature"
                                value={
                                    formData.bodyTemperature
                                }
                                onChange={handleChange}
                                placeholder="98.6 °F"
                            />

                        </div>

                    </div>

                </section>


                {/* =================================================
                    DAILY MONITORING
                ================================================= */}

                <section className="icu-form-section">

                    <h3>
                        Daily Monitoring
                    </h3>


                    <div className="form-group">

                        <label>
                            Daily Notes
                        </label>


                        <textarea
                            name="dailyNotes"
                            value={
                                formData.dailyNotes
                            }
                            onChange={handleChange}
                            rows="4"
                            placeholder="Enter daily ICU monitoring notes..."
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Medications Given
                        </label>


                        <textarea
                            name="medicationsGiven"
                            value={
                                formData.medicationsGiven
                            }
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter medications given..."
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Procedures Performed
                        </label>


                        <textarea
                            name="proceduresPerformed"
                            value={
                                formData.proceduresPerformed
                            }
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter procedures performed..."
                        />

                    </div>

                </section>


                {/* =================================================
                    DISCHARGE
                ================================================= */}

                <section className="icu-form-section">

                    <h3>
                        Discharge Information
                    </h3>


                    <div className="form-group">

                        <label>
                            Discharge Summary
                        </label>


                        <textarea
                            name="dischargeSummary"
                            value={
                                formData.dischargeSummary
                            }
                            onChange={handleChange}
                            rows="4"
                            placeholder="Enter discharge summary..."
                        />

                    </div>

                </section>


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="icu-form-actions">

                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >

                        {loading
                            ? "Saving..."
                            : mode === "edit"
                                ? "Update ICU Record"
                                : "Create ICU Record"}

                    </button>

                </div>

            </form>

        </div>
    );
};

export default ICURecordForm;