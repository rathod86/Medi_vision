import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import NurseForm from "../../nurse/NurseForm";

import { addNurse } from "../../../services/nurseService";
import "./AddNurse.css";
const AddNurse = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    // =====================================================
    // SUBMIT NURSE
    // =====================================================

    const handleSubmit = async (formData) => {

        try {

            setLoading(true);

            await addNurse(formData);

            alert(
                "Nurse created successfully."
            );

            navigate("/nurses");

        } catch (error) {

            console.error(
                "Error creating nurse:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to create nurse.";

            alert(message);

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancel = () => {

        navigate("/nurses");

    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="nurse-add-page">

            <NurseForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={loading}
                mode="add"
            />

        </div>
    );
};


export default AddNurse;