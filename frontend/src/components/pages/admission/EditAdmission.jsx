import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdmissionForm from "../../admission/AdmissionForm";

import {
    getAdmissionById,
} from "../../../services/admissionService";

import useAdmissions from "../../../hooks/useAdmissions";

import "./EditAdmission.css";

const EditAdmission = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { editAdmission, loading: hookLoading } = useAdmissions();

    const [loading, setLoading] = useState(true);

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

        status: "",

        notes: ""

    });

    // ==========================================
    // Load Admission
    // ==========================================

    useEffect(() => {

        loadAdmission();

    }, []);

    const loadAdmission = async () => {

        try {

            const data = await getAdmissionById(id);

            setFormData({

                patientId: data.patientId,

                doctorId: data.doctorId,

                admissionDate: data.admissionDate,

                admissionTime: data.admissionTime,

                admissionType: data.admissionType,

                department: data.department,

                ward: data.ward,

                roomNumber: data.roomNumber,

                bedNumber: data.bedNumber,

                diagnosis: data.diagnosis,

                symptoms: data.symptoms,

                reasonForAdmission: data.reasonForAdmission,

                insuranceProvider: data.insuranceProvider,

                policyNumber: data.policyNumber,

                estimatedCost: data.estimatedCost,

                initialDeposit: data.initialDeposit,

                expectedStayDays: data.expectedStayDays,

                status: data.status,

                notes: data.notes

            });

        } catch (error) {

            console.error(error);

            alert("Unable to load Admission.");

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Update Admission
    // ==========================================

    const handleSubmit = async (formData) => {

        try {

            await editAdmission(id, formData);

            alert("Admission Updated Successfully.");

            navigate("/admissions");

        } catch (error) {

            console.error(error);

            alert("Failed to Update Admission.");

        }

    };

    if (loading) {

        return (

            <div className="loading-container">

                <h2>Loading Admission...</h2>

            </div>

        );

    }

    return (

        <div className="edit-admission-page">

            <AdmissionForm

                formData={formData}

                setFormData={setFormData}

                onSubmit={handleSubmit}

                buttonText="Update Admission"

                loading={hookLoading}

            />

        </div>

    );

};

export default EditAdmission;