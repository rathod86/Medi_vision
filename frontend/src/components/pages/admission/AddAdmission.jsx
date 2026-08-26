import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdmissionForm from "../../admission/AdmissionForm";
import useAdmissions from "../../../hooks/useAdmissions";

import "./AddAdmission.css";

const AddAdmission = () => {

    const navigate = useNavigate();

    const { addAdmission, loading } = useAdmissions();

    const [formData, setFormData] = useState({

        patientId: "",

        doctorId: "",

        admissionDate: "",

        admissionTime: "",

        admissionType: "",

        department: "",

        ward: "",

        roomNumber: "",

        bedNumber: "",

        diagnosis: "",

        symptoms: "",

        reasonForAdmission: "",

        insuranceProvider: "",

        policyNumber: "",

        estimatedCost: "",

        initialDeposit: "",

        expectedStayDays: "",

        status: "Admitted",

        notes: ""

    });

    const handleSubmit = async (formData) => {

        try {

            await addAdmission(formData);

            alert("Admission Added Successfully.");

            navigate("/admissions");

        } catch (error) {

            console.error(error);

            alert("Failed to Add Admission.");

        }

    };

    return (

        <div className="add-admission-page">

            <AdmissionForm

                formData={formData}

                setFormData={setFormData}

                onSubmit={handleSubmit}

                buttonText="Add Admission"

                loading={loading}

            />

        </div>

    );

};

export default AddAdmission;