import React from "react";
import { Link } from "react-router-dom";
import useBillings from "../../../hooks/useBillings";
import "./BillingList.css";

const BillingList = () => {

    const { billings, removeBilling } = useBillings();

    const handleDelete = (id) => {

        if (window.confirm("Are you sure you want to delete this billing?")) {
            removeBilling(id);
        }

    };

    return (

        <div className="billing-container">

            <div className="billing-header">

                <h2>Billing Management</h2>

                <Link
                    to="/billing/add"
                    className="add-btn"
                >
                    + Add Billing
                </Link>

            </div>

            <table className="billing-table">

                <thead>

                    <tr>

                        <th>Bill No</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Total Amount</th>
                        <th>Paid</th>
                        <th>Balance</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {billings && billings.length > 0 ? (

                        billings.map((billing) => (

                            <tr key={billing.id}>

                                <td>{billing.billNumber}</td>

                                <td>{billing.patientName || "-"}</td>

                                <td>{billing.doctorName || "-"}</td>

                                <td>₹ {billing.totalAmount ?? 0}</td>

                                <td>₹ {billing.paidAmount ?? 0}</td>

                                <td>₹ {billing.balanceAmount ?? 0}</td>

                                <td>

                                    <span className={`status ${billing.paymentStatus?.toLowerCase()}`}>
                                        {billing.paymentStatus}
                                    </span>

                                </td>

                                <td className="action-buttons">

                                    <Link
                                        to={`/billing/view/${billing.id}`}
                                        className="view-btn"
                                    >
                                        View
                                    </Link>

                                    <Link
                                        to={`/billing/edit/${billing.id}`}
                                        className="edit-btn"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(billing.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="8"
                                className="no-data"
                            >
                                No Billing Records Found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

};

export default BillingList;