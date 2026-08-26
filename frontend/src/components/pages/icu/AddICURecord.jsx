import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ICURecordForm from "../../icu/ICURecordForm";

import { addICURecord } from "../../../services/icuRecordService";

const AddICURecord = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    // =====================================================
    // CREATE ICU RECORD
    // =====================================================

    const handleSubmit = async (formData) => {

        try {

            setLoading(true);

            console.log(
                "Submitting ICU Record:",
                formData
            );

            await addICURecord(formData);

            alert(
                "ICU Record created successfully."
            );

            navigate("/icu-records");

        } catch (error) {

            console.error(
                "Error creating ICU record:",
                error
            );

            let message =
                "Failed to create ICU record.";

            if (error.response?.data?.message) {

                message =
                    error.response.data.message;

            } else if (error.response?.data?.error) {

                message =
                    error.response.data.error;

            } else if (error.message) {

                message =
                    error.message;
            }

            alert(message);

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // CANCEL
    // =====================================================

    const handleCancel = () => {

        navigate("/icu-records");
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="icu-add-page">

            <ICURecordForm
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={loading}
                mode="add"
            />

        </div>
    );
};


export default AddICURecord;