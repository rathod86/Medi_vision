import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBillingById } from "../../../services/billingService";
import "./ViewBilling.css";

const ViewBilling = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [billing, setBilling] = useState({});

    useEffect(() => {
        loadBilling();
    }, []);

    const loadBilling = async () => {
        try {
            const data = await getBillingById(id);
            setBilling(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="view-billing-container">

            <div className="view-header">

                <h2>Billing Details</h2>

                <button
                    className="back-btn"
                    onClick={() => navigate("/billing")}
                >
                    Back
                </button>

            </div>

            <div className="billing-card">

                <div className="billing-row">
                    <label>Bill Number</label>
                    <span>{billing.billNumber}</span>
                </div>

                <div className="billing-row">
                    <label>Patient</label>
                    <span>{billing.patientName}</span>
                </div>

                <div className="billing-row">
                    <label>Doctor</label>
                    <span>{billing.doctorName}</span>
                </div>

                <div className="billing-row">
                    <label>Admission ID</label>
                    <span>{billing.admissionId}</span>
                </div>

                <div className="billing-row">
                    <label>Consultation Charges</label>
                    <span>₹ {billing.consultationCharges}</span>
                </div>

                <div className="billing-row">
                    <label>Room Charges</label>
                    <span>₹ {billing.roomCharges}</span>
                </div>

                <div className="billing-row">
                    <label>Medicine Charges</label>
                    <span>₹ {billing.medicineCharges}</span>
                </div>

                <div className="billing-row">
                    <label>Lab Charges</label>
                    <span>₹ {billing.labCharges}</span>
                </div>

                <div className="billing-row">
                    <label>Surgery Charges</label>
                    <span>₹ {billing.surgeryCharges}</span>
                </div>

                <div className="billing-row">
                    <label>ICU Charges</label>
                    <span>₹ {billing.icuCharges}</span>
                </div>

                <div className="billing-row">
                    <label>Other Charges</label>
                    <span>₹ {billing.otherCharges}</span>
                </div>

                <div className="billing-row">
                    <label>Discount</label>
                    <span>₹ {billing.discount}</span>
                </div>

                <div className="billing-row">
                    <label>Tax</label>
                    <span>₹ {billing.tax}</span>
                </div>

                <div className="billing-row">
                    <label>Total Amount</label>
                    <span>₹ {billing.totalAmount}</span>
                </div>

                <div className="billing-row">
                    <label>Paid Amount</label>
                    <span>₹ {billing.paidAmount}</span>
                </div>

                <div className="billing-row">
                    <label>Balance Amount</label>
                    <span>₹ {billing.balanceAmount}</span>
                </div>

                <div className="billing-row">
                    <label>Payment Status</label>
                    <span>{billing.paymentStatus}</span>
                </div>

                <div className="billing-row">
                    <label>Payment Method</label>
                    <span>{billing.paymentMethod}</span>
                </div>

                <div className="billing-row">
                    <label>Billing Date</label>
                    <span>{billing.billingDate}</span>
                </div>

                <div className="billing-row">
                    <label>Due Date</label>
                    <span>{billing.dueDate}</span>
                </div>

                <div className="billing-row">
                    <label>Notes</label>
                    <span>{billing.notes}</span>
                </div>

            </div>

            <div className="button-group">

                <button
                    className="print-btn"
                    onClick={() => window.print()}
                >
                    Print Invoice
                </button>

            </div>

        </div>

    );
};

export default ViewBilling;