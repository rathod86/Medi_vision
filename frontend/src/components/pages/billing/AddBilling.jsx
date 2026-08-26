import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../../api/axiosConfig";
import { createBilling } from "../../../services/billingService";
import { toArray } from "../../../utils/apiHelpers";

import BillingForm from "../../../components/billing/BillingForm";

import "./AddBilling.css";

const AddBilling = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

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

        loadPatients();
        loadDoctors();
        loadAdmissions();

    }, []);

  const loadPatients = async () => {
    try {
        const data = await API.get("/patients");
        setPatients(toArray(data.data));
    } catch (error) {
        console.error("Failed to load patients", error);
    }
};

const loadDoctors = async () => {
    try {
        const data = await API.get("/doctors");
        setDoctors(toArray(data.data));
    } catch (error) {
        console.error("Failed to load doctors", error);
    }
};

const loadAdmissions = async () => {
    try {
        const data = await API.get("/admissions");
        setAdmissions(toArray(data.data));
    } catch (error) {
        console.error("Failed to load admissions", error);
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

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            setLoading(true);

            await createBilling(billing);

            alert("Billing created successfully.");

            navigate("/billing");

        } catch (error) {

            console.error(error);

            alert("Failed to create billing.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="billing-form-container">

            <div className="page-header">

                <h2>Add Billing</h2>

                <p>Create a new billing record.</p>

            </div>

            <BillingForm
                billing={billing}
                errors={errors}
                patients={patients}
                doctors={doctors}
                admissions={admissions}
                loading={loading}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                navigate={navigate}
            />

        </div>

    );

};

export default AddBilling;