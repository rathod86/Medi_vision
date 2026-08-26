import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ICURecordForm from "../../icu/ICURecordForm";

import {
    getICURecordById,
    updateICURecord
} from "../../../services/icuRecordService";

import "./EditICURecord.css";


const EditICURecord = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    // =====================================================
    // STATE
    // =====================================================

    const [initialData, setInitialData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);


    // =====================================================
    // LOAD ICU RECORD
    // =====================================================

    useEffect(() => {

        const loadICURecord = async () => {

            try {

                setLoading(true);

                const data =
                    await getICURecordById(id);

                console.log(
                    "ICU Record loaded:",
                    data
                );

                setInitialData(data);

            } catch (error) {

                console.error(
                    "Error loading ICU record:",
                    error
                );

                const message =
                    error.response?.data?.message ||
                    error.response?.data?.error ||
                    "Failed to load ICU record.";

                alert(message);

                navigate("/icu-records");

            } finally {

                setLoading(false);
            }
        };


        if (id) {
            loadICURecord();
        } else {

            alert(
                "Invalid ICU record ID."
            );

            navigate("/icu-records");
        }

    }, [id, navigate]);


    // =====================================================
    // UPDATE ICU RECORD
    // =====================================================

    const handleSubmit = async (formData) => {

        try {

            setSaving(true);

            console.log(
                "Updating ICU Record:",
                formData
            );

            await updateICURecord(
                id,
                formData
            );

            alert(
                "ICU Record updated successfully."
            );

            navigate("/icu-records");

        } catch (error) {

            console.error(
                "Error updating ICU record:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to update ICU record.";

            alert(message);

        } finally {

            setSaving(false);
        }
    };


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancel = () => {

        navigate("/icu-records");
    };


    // =====================================================
    // PAGE LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="icu-edit-loading">

                <div className="icu-loading-spinner"></div>

                <p>
                    Loading ICU record...
                </p>

            </div>
        );
    }


    // =====================================================
    // NO DATA
    // =====================================================

    if (!initialData) {

        return (
            <div className="icu-edit-empty">

                <h2>
                    ICU Record Not Found
                </h2>

                <button
                    type="button"
                    onClick={handleCancel}
                >
                    Back to ICU Records
                </button>

            </div>
        );
    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="icu-edit-page">

            <ICURecordForm
                initialData={initialData}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={saving}
                mode="edit"
            />

        </div>
    );
};


export default EditICURecord;