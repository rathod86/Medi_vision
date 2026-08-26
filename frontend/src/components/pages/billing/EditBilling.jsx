import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import API from "../../../api/axiosConfig";
import { toArray } from "../../../utils/apiHelpers";
import BillingForm from "../../../components/billing/BillingForm";

import useBillings from "../../../hooks/useBillings";
import { getBillingById } from "../../../services/billingService";

import "./EditBilling.css";

const EditBilling = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { editBilling, loading } = useBillings();

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [errors, setErrors] = useState({});

    const [billing, setBilling] = useState({
        billNumber: "",
        patientId: "",
        doctorId: "",
        admissionId: "",
        consultationCharges: "",
        roomCharges: "",
        medicineCharges: "",
        labCharges: "",
        surgeryCharges: "",
        icuCharges: "",
        otherCharges: "",
        discount: "",
        tax: "",
        paidAmount: "",
        paymentStatus: "PENDING",
        paymentMethod: "",
        billingDate: "",
        dueDate: "",
        notes: ""
    });

    useEffect(() => {

        loadBilling();
        loadPatients();
        loadDoctors();
        loadAdmissions();

    }, [id]);

    const loadBilling = async () => {

        try {

            const data = await getBillingById(id);

            setBilling({

                ...data,

                consultationCharges: data.consultationCharges ?? "",
                roomCharges: data.roomCharges ?? "",
                medicineCharges: data.medicineCharges ?? "",
                labCharges: data.labCharges ?? "",
                surgeryCharges: data.surgeryCharges ?? "",
                icuCharges: data.icuCharges ?? "",
                otherCharges: data.otherCharges ?? "",
                discount: data.discount ?? "",
                tax: data.tax ?? "",
                paidAmount: data.paidAmount ?? "",
                billingDate: data.billingDate ?? "",
                dueDate: data.dueDate ?? "",
                notes: data.notes ?? ""

            });

        } catch (error) {

            console.error(error);

        }

    };

    const loadPatients = async () => {

        try {

            const response = await API.get("/patients");

            setPatients(toArray(response.data));

        } catch (error) {

            console.error(error);

        }

    };

    const loadDoctors = async () => {

        try {

            const response = await API.get("/doctors");

            setDoctors(toArray(response.data));

        } catch (error) {

            console.error(error);

        }

    };

    const loadAdmissions = async () => {

        try {

            const response = await API.get("/admissions");

            setAdmissions(toArray(response.data));

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setBilling((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const validate = () => {

        let temp = {};

        if (!billing.billNumber.trim())
            temp.billNumber = "Bill Number is required.";

        if (!billing.patientId)
            temp.patientId = "Please select a patient.";

        if (!billing.doctorId)
            temp.doctorId = "Please select a doctor.";

        if (!billing.billingDate)
            temp.billingDate = "Billing Date is required.";

        if (!billing.paymentMethod)
            temp.paymentMethod = "Payment Method is required.";

        setErrors(temp);

        return Object.keys(temp).length === 0;

    };

    const handleUpdate = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            await editBilling(id, billing);

            alert("Billing Updated Successfully");

            navigate("/billing");

        } catch (error) {

            console.error(error);

            alert("Failed to update billing.");

        }

    };

    return (

        <div className="billing-form-container">

            <div className="page-header">

                <h2>Edit Billing</h2>

                <p>Update the billing details.</p>

            </div>

            <BillingForm
                billing={billing}
                errors={errors}
                patients={patients}
                doctors={doctors}
                admissions={admissions}
                loading={loading}
                handleChange={handleChange}
                handleSubmit={handleUpdate}
                navigate={navigate}
            />

        </div>

    );

};

export default EditBilling;