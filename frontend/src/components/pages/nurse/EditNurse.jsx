import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NurseForm from "../../nurse/NurseForm";

import {
    getNurseById,
    updateNurse
} from "../../../services/nurseService";

import "./EditNurse.css";

const EditNurse = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [nurse, setNurse] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD NURSE
    // =====================================================

    useEffect(() => {

        const loadNurse = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await getNurseById(id);

                setNurse(data);

            } catch (error) {

                console.error(
                    "Error loading nurse:",
                    error
                );

                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Failed to load nurse details.";

                setError(message);

            } finally {

                setLoading(false);
            }
        };


        if (id) {
            loadNurse();
        } else {

            setError(
                "Nurse ID is missing."
            );

            setLoading(false);
        }

    }, [id]);


    // =====================================================
    // UPDATE NURSE
    // =====================================================

    const handleSubmit = async (formData) => {

        try {

            setSaving(true);
            setError("");

            await updateNurse(
                id,
                formData
            );

            alert(
                "Nurse updated successfully."
            );

            navigate("/nurses");

        } catch (error) {

            console.error(
                "Error updating nurse:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to update nurse.";

            setError(message);

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancel = () => {

        navigate("/nurses");

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="nurse-edit-page">

                <div className="nurse-edit-loading">
                    Loading nurse details...
                </div>

            </div>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error && !nurse) {

        return (
            <div className="nurse-edit-page">

                <div className="nurse-edit-error">

                    <h3>
                        Unable to load nurse
                    </h3>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/nurses")
                        }
                    >
                        Back to Nurses
                    </button>

                </div>

            </div>
        );
    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="nurse-edit-page">

            {error && (
                <div className="nurse-edit-alert">
                    {error}
                </div>
            )}

            {nurse && (
                <NurseForm
                    initialData={nurse}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                    loading={saving}
                    mode="edit"
                />
            )}

        </div>
    );
};


export default EditNurse;