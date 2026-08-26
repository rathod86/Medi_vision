import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BillingList from "./BillingList";
import { getAllBillings } from "../../../services/billingService";
import "./Billing.css";

const Billing = () => {

    const [stats, setStats] = useState({
        totalBills: 0,
        paidBills: 0,
        pendingBills: 0,
        totalRevenue: 0,
        outstandingAmount: 0
    });

    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const billings = await getAllBillings();

            const totalBills = billings.length;

            const paidBills = billings.filter(
                bill => bill.paymentStatus === "PAID"
            ).length;

            const pendingBills = billings.filter(
                bill =>
                    bill.paymentStatus === "PENDING" ||
                    bill.paymentStatus === "PARTIALLY_PAID"
            ).length;

            const totalRevenue = billings.reduce(
                (sum, bill) => sum + (bill.paidAmount || 0),
                0
            );

            const outstandingAmount = billings.reduce(
                (sum, bill) => sum + (bill.balanceAmount || 0),
                0
            );

            setStats({
                totalBills,
                paidBills,
                pendingBills,
                totalRevenue,
                outstandingAmount
            });

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div className="billing-page">

            <div className="billing-title">

                <div>

                    <h1>Billing</h1>

                    <p>
                        Manage hospital billing and payments.
                    </p>

                </div>

                <Link
                    to="/add-billing"
                    className="add-billing-btn"
                >
                    + Add Billing
                </Link>

            </div>

            <div className="billing-cards">

                <div className="billing-card blue">
                    <h3>Total Bills</h3>
                    <h1>{stats.totalBills}</h1>
                </div>

                <div className="billing-card green">
                    <h3>Paid Bills</h3>
                    <h1>{stats.paidBills}</h1>
                </div>

                <div className="billing-card orange">
                    <h3>Pending Bills</h3>
                    <h1>{stats.pendingBills}</h1>
                </div>

                <div className="billing-card purple">
                    <h3>Total Revenue</h3>
                    <h1>₹ {stats.totalRevenue}</h1>
                </div>

                <div className="billing-card red">
                    <h3>Outstanding</h3>
                    <h1>₹ {stats.outstandingAmount}</h1>
                </div>

            </div>

            <div className="billing-search">

                <input
                    type="text"
                    placeholder="Search by Bill Number, Patient or Doctor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>

            <BillingList searchTerm={searchTerm} />

        </div>

    );

};

export default Billing;