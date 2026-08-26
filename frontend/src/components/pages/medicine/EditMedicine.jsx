import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MedicineForm from "../../medicine/MedicineForm";
import {
    getMedicineById,
    updateMedicine,
} from "../../../services/medicineService";
import "./AddMedicine.css";

const EditMedicine = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        medicineCode: "",
        medicineName: "",
        category: "",
        dosage: "",
        manufacturer: "",
        batchNumber: "",
        expiryDate: "",
        quantity: "",
        minimumStock: "",
        purchasePrice: "",
        sellingPrice: "",
        supplier: "",
        storageLocation: "",
        description: "",
    });

    useEffect(() => {
        loadMedicine();
    }, []);

    const loadMedicine = async () => {
        try {

            const response = await getMedicineById(id);

            setFormData({
                medicineCode: response.data.medicineCode || "",
                medicineName: response.data.medicineName || "",
                category: response.data.category || "",
                dosage: response.data.dosage || "",
                manufacturer: response.data.manufacturer || "",
                batchNumber: response.data.batchNumber || "",
                expiryDate: response.data.expiryDate || "",
                quantity: response.data.quantity || "",
                minimumStock: response.data.minimumStock || "",
                purchasePrice: response.data.purchasePrice || "",
                sellingPrice: response.data.sellingPrice || "",
                supplier: response.data.supplier || "",
                storageLocation: response.data.storageLocation || "",
                description: response.data.description || "",
            });

        } catch (error) {
            console.error(error);
            alert("Unable to load medicine details.");
        }
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateMedicine(id, formData);

            alert("Medicine updated successfully.");

            navigate("/medicines");

        } catch (error) {

            console.error(error);

            if (error.response && error.response.data) {
                alert(error.response.data);
            } else {
                alert("Unable to update medicine.");
            }
        }
    };

    return (
        <div className="add-medicine-page">

            <h1 className="page-title">
                Edit Medicine
            </h1>

            <p className="page-subtitle">
                Update medicine details below.
            </p>

            <MedicineForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buttonText="Update"
            />

        </div>
    );
};

export default EditMedicine;