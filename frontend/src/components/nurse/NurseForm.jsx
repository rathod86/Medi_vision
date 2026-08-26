import React, { useEffect, useState } from "react";

import "./NurseForm.css";

const initialFormData = {
    employeeCode: "",
    fullName: "",
    degree: "",
    specialization: "",
    licenseNumber: "",
    experienceYears: "",
    phone: "",
    email: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    shift: "",
    department: "",
    employmentType: "",
    joiningDate: "",
    reportingManager: "",
    status: "ACTIVE",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: ""
};

const NurseForm = ({
    initialData = null,
    onSubmit,
    onCancel,
    loading = false,
    mode = "add"
}) => {

    const [formData, setFormData] = useState(
        initialData || initialFormData
    );

    const [errors, setErrors] = useState({});


    // =====================================================
    // LOAD DATA FOR EDIT
    // =====================================================

    useEffect(() => {

        if (initialData) {

            setFormData({
                ...initialFormData,
                ...initialData,

                experienceYears:
                    initialData.experienceYears ?? "",

                dateOfBirth:
                    initialData.dateOfBirth ?? "",

                joiningDate:
                    initialData.joiningDate ?? ""
            });
        }

    }, [initialData]);


    // =====================================================
    // HANDLE INPUT
    // =====================================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        if (errors[name]) {

            setErrors((previous) => ({
                ...previous,
                [name]: ""
            }));
        }
    };


    // =====================================================
    // VALIDATION
    // =====================================================

    const validate = () => {

        const newErrors = {};


        if (!formData.employeeCode.trim()) {
            newErrors.employeeCode =
                "Employee code is required.";
        }


        if (!formData.fullName.trim()) {
            newErrors.fullName =
                "Full name is required.";
        }


        if (!formData.degree.trim()) {
            newErrors.degree =
                "Degree is required.";
        }


        if (!formData.phone.trim()) {
            newErrors.phone =
                "Phone number is required.";
        }
        else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone =
                "Phone number must contain exactly 10 digits.";
        }


        if (
            formData.email &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email
            )
        ) {
            newErrors.email =
                "Enter a valid email address.";
        }


        if (!formData.shift) {
            newErrors.shift =
                "Shift is required.";
        }


        if (!formData.department.trim()) {
            newErrors.department =
                "Department is required.";
        }


        if (!formData.employmentType) {
            newErrors.employmentType =
                "Employment type is required.";
        }


        if (!formData.joiningDate) {
            newErrors.joiningDate =
                "Joining date is required.";
        }


        if (!formData.status) {
            newErrors.status =
                "Status is required.";
        }


        if (
            formData.experienceYears !== "" &&
            (
                Number(formData.experienceYears) < 0 ||
                !Number.isInteger(
                    Number(formData.experienceYears)
                )
            )
        ) {
            newErrors.experienceYears =
                "Enter a valid experience in years.";
        }


        if (
            formData.emergencyContactPhone &&
            !/^[0-9]{10}$/.test(
                formData.emergencyContactPhone
            )
        ) {
            newErrors.emergencyContactPhone =
                "Emergency phone must contain exactly 10 digits.";
        }


        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();

        if (!validate()) {
            return;
        }


        const payload = {
            ...formData,

            employeeCode:
                formData.employeeCode.trim(),

            fullName:
                formData.fullName.trim(),

            degree:
                formData.degree.trim(),

            specialization:
                formData.specialization.trim() || null,

            licenseNumber:
                formData.licenseNumber.trim() || null,

            experienceYears:
                formData.experienceYears === ""
                    ? null
                    : Number(formData.experienceYears),

            phone:
                formData.phone.trim(),

            email:
                formData.email.trim() || null,

            address:
                formData.address.trim() || null,

            dateOfBirth:
                formData.dateOfBirth || null,

            gender:
                formData.gender || null,

            shift:
                formData.shift,

            department:
                formData.department.trim(),

            employmentType:
                formData.employmentType,

            joiningDate:
                formData.joiningDate,

            reportingManager:
                formData.reportingManager.trim() || null,

            status:
                formData.status,

            emergencyContactName:
                formData.emergencyContactName.trim() || null,

            emergencyContactPhone:
                formData.emergencyContactPhone.trim() || null,

            emergencyContactRelation:
                formData.emergencyContactRelation.trim() || null
        };


        onSubmit(payload);
    };


    return (
        <div className="nurse-form-container">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="nurse-form-header">

                <div>
                    <h2>
                        {mode === "edit"
                            ? "Edit Nurse"
                            : "Add Nurse"}
                    </h2>

                    <p>
                        {mode === "edit"
                            ? "Update nurse information"
                            : "Register a new nurse"}
                    </p>
                </div>

            </div>


            <form
                className="nurse-form"
                onSubmit={handleSubmit}
            >

                {/* =================================================
                    IDENTIFICATION
                ================================================= */}

                <div className="form-section">

                    <h3>Nurse Identification</h3>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Employee Code
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="employeeCode"
                                value={formData.employeeCode}
                                onChange={handleChange}
                                placeholder="Example: NUR001"
                                disabled={mode === "edit"}
                            />

                            {errors.employeeCode && (
                                <small className="error">
                                    {errors.employeeCode}
                                </small>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Full Name
                                <span>*</span>
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter full name"
                            />

                            {errors.fullName && (
                                <small className="error">
                                    {errors.fullName}
                                </small>
                            )}

                        </div>

                    </div>

                </div>


                {/* =================================================
                    PROFESSIONAL INFORMATION
                ================================================= */}

                <div className="form-section">

                    <h3>Professional Information</h3>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Degree
                                <span>*</span>
                            </label>

                            <select
                                name="degree"
                                value={formData.degree}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Degree
                                </option>

                                <option value="GNM">
                                    GNM
                                </option>

                                <option value="BSc Nursing">
                                    B.Sc Nursing
                                </option>

                                <option value="MSc Nursing">
                                    M.Sc Nursing
                                </option>

                                <option value="ANM">
                                    ANM
                                </option>

                                <option value="Post Basic BSc Nursing">
                                    Post Basic B.Sc Nursing
                                </option>

                            </select>

                            {errors.degree && (
                                <small className="error">
                                    {errors.degree}
                                </small>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Specialization
                            </label>

                            <input
                                type="text"
                                name="specialization"
                                value={formData.specialization}
                                onChange={handleChange}
                                placeholder="Example: Critical Care"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                License Number
                            </label>

                            <input
                                type="text"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleChange}
                                placeholder="Nursing license number"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Experience (Years)
                            </label>

                            <input
                                type="number"
                                name="experienceYears"
                                value={formData.experienceYears}
                                onChange={handleChange}
                                min="0"
                                placeholder="Example: 5"
                            />

                            {errors.experienceYears && (
                                <small className="error">
                                    {errors.experienceYears}
                                </small>
                            )}

                        </div>

                    </div>

                </div>


                {/* =================================================
                    CONTACT INFORMATION
                ================================================= */}

                <div className="form-section">

                    <h3>Contact Information</h3>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Phone
                                <span>*</span>
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                maxLength="10"
                                placeholder="10 digit phone number"
                            />

                            {errors.phone && (
                                <small className="error">
                                    {errors.phone}
                                </small>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="nurse@example.com"
                            />

                            {errors.email && (
                                <small className="error">
                                    {errors.email}
                                </small>
                            )}

                        </div>


                        <div className="form-group full-width">

                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Enter complete address"
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    PERSONAL INFORMATION
                ================================================= */}

                <div className="form-section">

                    <h3>Personal Information</h3>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Gender
                            </label>

                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Gender
                                </option>

                                <option value="MALE">
                                    Male
                                </option>

                                <option value="FEMALE">
                                    Female
                                </option>

                                <option value="OTHER">
                                    Other
                                </option>

                            </select>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    HOSPITAL INFORMATION
                ================================================= */}

                <div className="form-section">

                    <h3>Hospital Information</h3>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Shift
                                <span>*</span>
                            </label>

                            <select
                                name="shift"
                                value={formData.shift}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Shift
                                </option>

                                <option value="MORNING">
                                    Morning
                                </option>

                                <option value="EVENING">
                                    Evening
                                </option>

                                <option value="NIGHT">
                                    Night
                                </option>

                            </select>

                            {errors.shift && (
                                <small className="error">
                                    {errors.shift}
                                </small>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Department
                                <span>*</span>
                            </label>

                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Department
                                </option>

                                <option value="ICU">
                                    ICU
                                </option>

                                <option value="GENERAL">
                                    General Ward
                                </option>

                                <option value="EMERGENCY">
                                    Emergency
                                </option>

                                <option value="OT">
                                    Operation Theatre
                                </option>

                                <option value="PEDIATRICS">
                                    Pediatrics
                                </option>

                                <option value="MATERNITY">
                                    Maternity
                                </option>

                                <option value="CARDIOLOGY">
                                    Cardiology
                                </option>

                                <option value="NEUROLOGY">
                                    Neurology
                                </option>

                            </select>

                            {errors.department && (
                                <small className="error">
                                    {errors.department}
                                </small>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Employment Type
                                <span>*</span>
                            </label>

                            <select
                                name="employmentType"
                                value={formData.employmentType}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Employment Type
                                </option>

                                <option value="FULL_TIME">
                                    Full Time
                                </option>

                                <option value="PART_TIME">
                                    Part Time
                                </option>

                                <option value="CONTRACT">
                                    Contract
                                </option>

                            </select>

                            {errors.employmentType && (
                                <small className="error">
                                    {errors.employmentType}
                                </small>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Joining Date
                                <span>*</span>
                            </label>

                            <input
                                type="date"
                                name="joiningDate"
                                value={formData.joiningDate}
                                onChange={handleChange}
                            />

                            {errors.joiningDate && (
                                <small className="error">
                                    {errors.joiningDate}
                                </small>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Reporting Manager
                            </label>

                            <input
                                type="text"
                                name="reportingManager"
                                value={formData.reportingManager}
                                onChange={handleChange}
                                placeholder="Manager name"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Status
                                <span>*</span>
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >

                                <option value="ACTIVE">
                                    Active
                                </option>

                                <option value="INACTIVE">
                                    Inactive
                                </option>

                                <option value="ON_LEAVE">
                                    On Leave
                                </option>

                            </select>

                            {errors.status && (
                                <small className="error">
                                    {errors.status}
                                </small>
                            )}

                        </div>

                    </div>

                </div>


                {/* =================================================
                    EMERGENCY CONTACT
                ================================================= */}

                <div className="form-section">

                    <h3>Emergency Contact</h3>

                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Contact Name
                            </label>

                            <input
                                type="text"
                                name="emergencyContactName"
                                value={
                                    formData.emergencyContactName
                                }
                                onChange={handleChange}
                                placeholder="Emergency contact name"
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Contact Phone
                            </label>

                            <input
                                type="tel"
                                name="emergencyContactPhone"
                                value={
                                    formData.emergencyContactPhone
                                }
                                onChange={handleChange}
                                maxLength="10"
                                placeholder="10 digit phone number"
                            />

                            {errors.emergencyContactPhone && (
                                <small className="error">
                                    {
                                        errors.emergencyContactPhone
                                    }
                                </small>
                            )}

                        </div>


                        <div className="form-group">

                            <label>
                                Relationship
                            </label>

                            <input
                                type="text"
                                name="emergencyContactRelation"
                                value={
                                    formData.emergencyContactRelation
                                }
                                onChange={handleChange}
                                placeholder="Example: Father"
                            />

                        </div>

                    </div>

                </div>


                {/* =================================================
                    BUTTONS
                ================================================= */}

                <div className="form-actions">

                    <button
                        type="button"
                        className="btn btn-cancel"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="btn btn-submit"
                        disabled={loading}
                    >

                        {loading
                            ? "Saving..."
                            : mode === "edit"
                                ? "Update Nurse"
                                : "Add Nurse"}

                    </button>

                </div>

            </form>

        </div>
    );
};

export default NurseForm;