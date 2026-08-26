import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MedicineForm from "../../medicine/MedicineForm";
import { addMedicine } from "../../../services/medicineService";
import "./AddMedicine.css";

const AddMedicine = () => {
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
        description: ""
    });

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
            await addMedicine(formData);

            alert("Medicine added successfully.");

            navigate("/medicines");

        } catch (error) {

            console.error(error);

            if (error.response && error.response.data) {
                alert(error.response.data);
            } else {
                alert("Unable to add medicine.");
            }
        }
    };

    return (
        <MedicineForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            buttonText="Add"
        />
    );
};

export default AddMedicine;