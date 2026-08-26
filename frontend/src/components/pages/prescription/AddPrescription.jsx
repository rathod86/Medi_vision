import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PrescriptionForm from "../../prescription/PrescriptionForm";

import { addPrescription } from "../../../services/prescriptionService";
import { getErrorMessage } from "../../../utils/apiHelpers";
import { getAllPatients } from "../../../services/patientService";
import { getAllDoctors } from "../../../services/doctorService";
import { getAllMedicines } from "../../../services/medicineService";
import { getAllAppointments } from "../../../services/appointmentService";
import { getAllAdmissions } from "../../../services/admissionService";

import "./AddPrescription.css";

const AddPrescription = () => {

    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [medicines, setMedicines] = useState([]);

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({

        patientId: "",

        doctorId: "",

        appointmentId: "",

        admissionId: "",

        symptoms: "",

        diagnosis: "",

        allergies: "",

        clinicalNotes: "",

        doctorRemarks: "",

        prescriptionDate: new Date()
            .toISOString()
            .split("T")[0],

        followUpDate: "",

        status: "Draft",

        medicines: [
            {
                medicineId: "",

                dosage: "",

                route: "",

                frequency: "",

                duration: "",

                quantity: 1,

                morning: false,

                afternoon: false,

                night: false,

                morningTime: "",

                afternoonTime: "",

                nightTime: "",

                foodInstruction: "",

                specialInstructions: "",

                reminderEnabled: false
            }
        ]

    });

    useEffect(() => {

        loadMasterData();

    }, []);

    // ==========================================
    // Load Master Data
    // ==========================================

    const loadMasterData = async () => {

        try {

            setLoading(true);

            const [
                patientRes,
                doctorRes,
                medicineRes,
                appointmentRes,
                admissionRes
            ] = await Promise.all([
                getAllPatients(),
                getAllDoctors(),
                getAllMedicines(),
                getAllAppointments(),
                getAllAdmissions()
            ]);

            console.log("Patients :", patientRes);
            console.log("Doctors :", doctorRes);
            console.log("Medicines :", medicineRes);
            console.log("Appointments :", appointmentRes);
            console.log("Admissions :", admissionRes);

            setPatients(Array.isArray(patientRes) ? patientRes : []);
            setDoctors(Array.isArray(doctorRes) ? doctorRes : []);
            setMedicines(Array.isArray(medicineRes) ? medicineRes : []);
            setAppointments(Array.isArray(appointmentRes) ? appointmentRes : []);
            setAdmissions(Array.isArray(admissionRes) ? admissionRes : []);

        } catch (error) {

            console.error("Load Master Data Error :", error);

            alert("Unable to load master data.");

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Handle Input Change
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    // ==========================================
    // Handle Medicine Change
    // ==========================================

    const handleMedicineChange = (
        index,
        field,
        value
    ) => {

        const updatedMedicines = [...formData.medicines];

        updatedMedicines[index][field] = value;

        setFormData((prev) => ({
            ...prev,
            medicines: updatedMedicines
        }));

    };

    // ==========================================
    // Add Medicine
    // ==========================================

    const addMedicine = () => {

        setFormData((prev) => ({

            ...prev,

            medicines: [

                ...prev.medicines,

                {

                    medicineId: "",

                    dosage: "",

                    route: "",

                    frequency: "",

                    duration: "",

                    quantity: 1,

                    morning: false,

                    afternoon: false,

                    night: false,

                    morningTime: "",

                    afternoonTime: "",

                    nightTime: "",

                    foodInstruction: "",

                    specialInstructions: "",

                    reminderEnabled: false

                }

            ]

        }));

    };

    // ==========================================
    // Remove Medicine
    // ==========================================

    const removeMedicine = (index) => {

        const updatedMedicines = [...formData.medicines];

        updatedMedicines.splice(index, 1);

        setFormData((prev) => ({
            ...prev,
            medicines: updatedMedicines
        }));

    };

    // ==========================================
    // Submit
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (
            !formData.patientId ||
            !formData.doctorId
        ) {
            alert("Please select a patient and doctor.");
            return;
        }

        if (
            !formData.symptoms?.trim() ||
            !formData.diagnosis?.trim()
        ) {
            alert("Symptoms and diagnosis are required.");
            return;
        }

        const validMedicines =
            (formData.medicines || []).filter(
                (item) =>
                    item.medicineId &&
                    item.dosage?.trim() &&
                    item.route?.trim() &&
                    item.frequency?.trim() &&
                    item.duration?.trim()
            );

        if (validMedicines.length === 0) {
            alert(
                "Add at least one medicine with dosage, route, frequency, and duration."
            );
            return;
        }

        try {

            await addPrescription({
                ...formData,
                medicines: validMedicines
            });

            alert("Prescription added successfully.");

            navigate("/prescriptions");

        } catch (error) {

            console.error(error);

            alert(
                getErrorMessage(
                    error,
                    "Unable to save prescription. Fill all required fields."
                )
            );

        }

    };

    if (loading) {

        return <h2>Loading Master Data...</h2>;

    }

    return (

        <PrescriptionForm

            formData={formData}

            handleChange={handleChange}

            handleMedicineChange={handleMedicineChange}

            addMedicine={addMedicine}

            removeMedicine={removeMedicine}

            handleSubmit={handleSubmit}

            patients={patients}

            doctors={doctors}

            appointments={appointments}

            admissions={admissions}

            medicines={medicines}

            buttonText="Add"

        />

    );

};

export default AddPrescription;