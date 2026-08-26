import React from "react";
import { Link } from "react-router-dom";
import "./MedicineTable.css";

const MedicineTable = ({
    medicines = [],
    onDelete,
    currentPage = 1,
    medicinesPerPage = 10,
}) => {

    const getStatusClass = (status = "") => {

        switch (status.toLowerCase()) {

            case "available":
                return "status available";

            case "low stock":
                return "status low";

            case "out of stock":
                return "status out";

            case "expired":
                return "status expired";

            default:
                return "status";
        }
    };

    if (medicines.length === 0) {
        return (
            <div className="no-data">
                No medicines found.
            </div>
        );
    }

    return (

        <div className="medicine-table-container">

            <table className="medicine-table">

                <thead>

                    <tr>

                        <th>#</th>
                        <th>Code</th>
                        <th>Medicine Name</th>
                        <th>Category</th>
                        <th>Manufacturer</th>
                        <th>Quantity</th>
                        <th>Purchase Price</th>
                        <th>Selling Price</th>
                        <th>Expiry Date</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {medicines.map((medicine, index) => (

                        <tr key={medicine.id}>

                            <td>
                                {(currentPage - 1) * medicinesPerPage + index + 1}
                            </td>

                            <td>{medicine.medicineCode || "-"}</td>

                            <td>{medicine.medicineName || "-"}</td>

                            <td>{medicine.category || "-"}</td>

                            <td>{medicine.manufacturer || "-"}</td>

                            <td>{medicine.quantity ?? 0}</td>

                            <td>
                                ₹ {medicine.purchasePrice ?? 0}
                            </td>

                            <td>
                                ₹ {medicine.sellingPrice ?? 0}
                            </td>

                            <td>
                                {medicine.expiryDate || "-"}
                            </td>

                            <td>

                                <span
                                    className={getStatusClass(medicine.status)}
                                >
                                    {medicine.status}
                                </span>

                            </td>

                            <td>

                                <div className="action-buttons">

                                    <Link
                                        to={`/medicines/view/${medicine.id}`}
                                        className="btn view-btn"
                                    >
                                        👁 View
                                    </Link>

                                    <Link
                                        to={`/medicines/edit/${medicine.id}`}
                                        className="btn edit-btn"
                                    >
                                        ✏ Edit
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn delete-btn"
                                        onClick={() => onDelete(medicine.id)}
                                    >
                                        🗑 Delete
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

};

export default MedicineTable;