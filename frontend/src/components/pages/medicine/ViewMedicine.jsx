import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMedicineById } from "../../../services/medicineService";
import "./ViewMedicine.css";

const ViewMedicine = () => {

    const { id } = useParams();

    const [medicine, setMedicine] = useState(null);

    useEffect(() => {
        loadMedicine();
    }, []);

    const loadMedicine = async () => {
        try {
            const response = await getMedicineById(id);
            setMedicine(response.data);
        } catch (error) {
            console.error(error);
            alert("Unable to load medicine details.");
        }
    };

    if (!medicine) {
        return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }

    return (
        <div className="view-medicine-container">

            <div className="medicine-card">

                <div className="card-header">
                    <h2>Medicine Details</h2>
                </div>

                <div className="details-grid">

                    <div className="detail-item">
                        <label>Medicine Code</label>
                        <span>{medicine.medicineCode}</span>
                    </div>

                    <div className="detail-item">
                        <label>Medicine Name</label>
                        <span>{medicine.medicineName}</span>
                    </div>

                    <div className="detail-item">
                        <label>Category</label>
                        <span>{medicine.category}</span>
                    </div>

                    <div className="detail-item">
                        <label>Dosage</label>
                        <span>{medicine.dosage}</span>
                    </div>

                    <div className="detail-item">
                        <label>Manufacturer</label>
                        <span>{medicine.manufacturer}</span>
                    </div>

                    <div className="detail-item">
                        <label>Batch Number</label>
                        <span>{medicine.batchNumber}</span>
                    </div>

                    <div className="detail-item">
                        <label>Expiry Date</label>
                        <span>{medicine.expiryDate}</span>
                    </div>

                    <div className="detail-item">
                        <label>Quantity</label>
                        <span>{medicine.quantity}</span>
                    </div>

                    <div className="detail-item">
                        <label>Minimum Stock</label>
                        <span>{medicine.minimumStock}</span>
                    </div>

                    <div className="detail-item">
                        <label>Purchase Price</label>
                        <span>₹ {medicine.purchasePrice}</span>
                    </div>

                    <div className="detail-item">
                        <label>Selling Price</label>
                        <span>₹ {medicine.sellingPrice}</span>
                    </div>

                    <div className="detail-item">
                        <label>Supplier</label>
                        <span>{medicine.supplier}</span>
                    </div>

                    <div className="detail-item">
                        <label>Storage Location</label>
                        <span>{medicine.storageLocation}</span>
                    </div>

                    <div className="detail-item">
                        <label>Status</label>
                        <span>{medicine.status}</span>
                    </div>

                    <div className="detail-item full-width">
                        <label>Description</label>
                        <span>{medicine.description}</span>
                    </div>

                </div>

                <div className="button-group">

                    <Link
                        to={`/medicines/edit/${medicine.id}`}
                        className="edit-btn"
                    >
                        Edit
                    </Link>

                    <Link
                        to="/medicines"
                        className="back-btn"
                    >
                        Back
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default ViewMedicine;
