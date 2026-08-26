import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import LabReportForm from "../../laboratory/LabReportForm";

import { addLabReport } from "../../../services/labReportService";
import { getAllPatients } from "../../../services/patientService";
import { getAllDoctors } from "../../../services/doctorService";
import { getAllPrescriptions } from "../../../services/prescriptionService";

import "./AddLabReport.css";

const AddLabReport = () => {

    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [prescriptions, setPrescriptions] = useState([]);

    const [formData, setFormData] = useState({

        patientId: "",

        doctorId: "",

        prescriptionId: "",

        testName: "",

        testCategory: "",

        sampleType: "",

        testDate: new Date().toISOString().split("T")[0],

        reportDate: "",

        result: "",

        normalRange: "",

        remarks: "",

        labTechnicianName: "",

        labTechnicianDegree: "",

        labName: "",

        reportFilePath: "",

        status: "Pending"

    });

    useEffect(() => {

        loadMasterData();

    }, []);

    const loadMasterData = async () => {

        try {

            const [

                patientRes,

                doctorRes,

                prescriptionRes

            ] = await Promise.all([

                getAllPatients(),

                getAllDoctors(),

                getAllPrescriptions()

            ]);

            setPatients(patientRes?.data ?? patientRes);

            setDoctors(doctorRes?.data ?? doctorRes);

            setPrescriptions(prescriptionRes?.data ?? prescriptionRes);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load master data.");

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]: value

        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addLabReport(formData);

            alert("Laboratory Report Added Successfully.");

            navigate("/lab-reports");

        }

        catch (error) {

            console.error(error);

            alert("Unable to save laboratory report.");

        }

    };

    return (

        <LabReportForm

            formData={formData}

            handleChange={handleChange}

            handleSubmit={handleSubmit}

            patients={patients}

            doctors={doctors}

            prescriptions={prescriptions}

            buttonText="Add"

        />

    );

};

export default AddLabReport;