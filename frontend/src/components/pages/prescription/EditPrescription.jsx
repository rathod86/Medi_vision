import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import PrescriptionForm from "../../prescription/PrescriptionForm";

import {
    getPrescriptionById,
    updatePrescription,
} from "../../../services/prescriptionService";

import { getAllPatients } from "../../../services/patientService";
import { getAllDoctors } from "../../../services/doctorService";
import { getAllMedicines } from "../../../services/medicineService";
import { getAllAppointments } from "../../../services/appointmentService";
import { getAllAdmissions } from "../../../services/admissionService";

import "./EditPrescription.css";

const EditPrescription = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [medicines, setMedicines] = useState([]);

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

        prescriptionDate: "",

        followUpDate: "",

        status: "Draft",

        medicines: []

    });

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const [

                prescriptionRes,

                patientRes,

                doctorRes,

                medicineRes,

                appointmentRes,

                admissionRes

            ] = await Promise.all([

                getPrescriptionById(id),

                getAllPatients(),

                getAllDoctors(),

                getAllMedicines(),

                getAllAppointments(),

                getAllAdmissions()

            ]);

            setPatients(patientRes.data);

            setDoctors(doctorRes.data);

            setMedicines(medicineRes);

            setAppointments(appointmentRes.data);

            setAdmissions(admissionRes.data);

            setFormData(prescriptionRes.data);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load prescription.");

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({

            ...prev,

            [name]: value

        }));

    };

    const handleMedicineChange = (
        index,
        field,
        value
    ) => {

        const updated = [...formData.medicines];

        updated[index][field] = value;

        setFormData({

            ...formData,

            medicines: updated

        });

    };

    const addMedicine = () => {

        setFormData({

            ...formData,

            medicines: [

                ...formData.medicines,

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

    };

    const removeMedicine = (index) => {

        const updated = [...formData.medicines];

        updated.splice(index, 1);

        setFormData({

            ...formData,

            medicines: updated

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updatePrescription(id, formData);

            alert("Prescription updated successfully.");

            navigate("/prescriptions");

        }

        catch (error) {

            console.error(error);

            alert("Unable to update prescription.");

        }

    };

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

            buttonText="Update"

        />

    );

};

export default EditPrescription;