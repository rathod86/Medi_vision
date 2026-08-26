import React, { useEffect, useState } from "react";
import "./UserForm.css";
const UserForm = ({
    initialData = {},
    onSubmit,
    onCancel,
    isEdit = false,
    loading = false
}) => {

    // =====================================================
    // FORM DATA
    // =====================================================

    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        active: true,
        accountLocked: false
    });


    // =====================================================
    // LOAD INITIAL DATA
    // =====================================================

    useEffect(() => {

        setFormData({
            username: initialData.username || "",
            fullName: initialData.fullName || "",
            email: initialData.email || "",
            phone: initialData.phone || "",
            password: "",
            role: initialData.role || "",
            active:
                initialData.active !== undefined
                    ? initialData.active
                    : true,
            accountLocked:
                initialData.accountLocked !== undefined
                    ? initialData.accountLocked
                    : false
        });

    }, [initialData]);


    // =====================================================
    // ROLE OPTIONS
    // =====================================================

    const roles = [
        { value: "ADMIN", label: "Admin" },
        { value: "DOCTOR", label: "Doctor" },
        { value: "PATIENT", label: "Patient" },
        { value: "NURSE", label: "Nurse" },
        { value: "RECEPTIONIST", label: "Receptionist" },
        { value: "LAB_TECHNICIAN", label: "Lab Technician" },
        { value: "PHARMACIST", label: "Pharmacist" },
        { value: "BILLING_STAFF", label: "Billing Staff" }
    ];


    // =====================================================
    // HANDLE INPUT CHANGE
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
    };


    // =====================================================
    // HANDLE SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();

        const data = {
            username: formData.username.trim(),
            fullName: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            phone: formData.phone.trim(),
            role: formData.role,
            active: formData.active,
            accountLocked: formData.accountLocked
        };


        // -------------------------------------------------
        // Password
        // -------------------------------------------------

        if (
            !isEdit ||
            formData.password.trim() !== ""
        ) {
            data.password = formData.password;
        }


        // -------------------------------------------------
        // Send data to parent
        // -------------------------------------------------

        onSubmit(data);
    };


    // =====================================================
    // JSX
    // =====================================================

    return (
        <form
            className="user-form"
            onSubmit={handleSubmit}
        >

            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <div className="form-section">

                <h2 className="form-section-title">
                    Personal Information
                </h2>


                <div className="form-row">

                    {/* Full Name */}

                    <div className="form-group">

                        <label htmlFor="fullName">
                            Full Name
                            <span className="required">
                                *
                            </span>
                        </label>

                        <input
                            id="fullName"
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            maxLength={100}
                            required
                        />

                    </div>


                    {/* Phone */}

                    <div className="form-group">

                        <label htmlFor="phone">
                            Phone Number
                        </label>

                        <input
                            id="phone"
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91 98765 43210"
                            maxLength={20}
                            pattern="[+]?[0-9\s-]{7,20}"
                        />

                    </div>

                </div>

            </div>


            {/* =================================================
                LOGIN INFORMATION
            ================================================= */}

            <div className="form-section">

                <h2 className="form-section-title">
                    Login Information
                </h2>


                <div className="form-row">

                    {/* Username */}

                    <div className="form-group">

                        <label htmlFor="username">
                            Username
                            <span className="required">
                                *
                            </span>
                        </label>

                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            minLength={3}
                            maxLength={100}
                            required
                            readOnly={isEdit}
                            className={
                                isEdit
                                    ? "input-readonly"
                                    : ""
                            }
                        />

                        {isEdit && (
                            <small className="form-help">
                                Username cannot be changed
                                after account creation.
                            </small>
                        )}

                    </div>


                    {/* Email */}

                    <div className="form-group">

                        <label htmlFor="email">
                            Email
                            <span className="required">
                                *
                            </span>
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="staff@hospital.com"
                            maxLength={150}
                            required
                        />

                    </div>

                </div>


                {/* Password */}

                <div className="form-group">

                    <label htmlFor="password">

                        {isEdit
                            ? "New Password"
                            : "Password"}

                        {!isEdit && (
                            <span className="required">
                                *
                            </span>
                        )}

                    </label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={
                            isEdit
                                ? "Leave blank to keep current password"
                                : "Minimum 8 characters"
                        }
                        minLength={
                            isEdit
                                ? undefined
                                : 8
                        }
                        maxLength={100}
                        required={!isEdit}
                    />

                    {isEdit ? (
                        <small className="form-help">
                            Leave blank to keep the
                            current password.
                        </small>
                    ) : (
                        <small className="form-help">
                            Use at least 8 characters with
                            letters and numbers.
                        </small>
                    )}

                </div>

            </div>


            {/* =================================================
                ROLE & ACCESS
            ================================================= */}

            <div className="form-section">

                <h2 className="form-section-title">
                    Role & Access
                </h2>


                {/* Role */}

                <div className="form-group">

                    <label htmlFor="role">
                        Role
                        <span className="required">
                            *
                        </span>
                    </label>

                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >

                        <option value="">
                            Select role
                        </option>

                        {roles.map((role) => (
                            <option
                                key={role.value}
                                value={role.value}
                            >
                                {role.label}
                            </option>
                        ))}

                    </select>

                </div>


                {/* Active Account */}

                <div className="checkbox-group">

                    <input
                        id="active"
                        type="checkbox"
                        name="active"
                        checked={formData.active}
                        onChange={handleChange}
                    />

                    <label htmlFor="active">
                        Active Account
                    </label>

                </div>


                {/* Locked Account */}

                <div className="checkbox-group">

                    <input
                        id="accountLocked"
                        type="checkbox"
                        name="accountLocked"
                        checked={
                            formData.accountLocked
                        }
                        onChange={handleChange}
                    />

                    <label htmlFor="accountLocked">
                        Lock Account
                    </label>

                </div>

            </div>


            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div className="form-actions">

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </button>


                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : isEdit
                            ? "Update User"
                            : "Create User"}
                </button>

            </div>

        </form>
    );
};

export default UserForm;