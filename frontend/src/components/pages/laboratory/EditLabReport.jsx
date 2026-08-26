import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import LabReportForm from "../../laboratory/LabReportForm";

import {
    getLabReportById,
    updateLabReport
} from "../../../services/labReportService";

import { getAllPatients } from "../../../services/patientService";
import { getAllDoctors } from "../../../services/doctorService";
import { getAllPrescriptions } from "../../../services/prescriptionService";

import "./EditLabReport.css";

const EditLabReport = () => {

    const { id } = useParams();

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

        testDate: "",
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

        loadReport();

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

        } catch (error) {

            console.error(error);

        }

    };

    const loadReport = async () => {

        try {

            const response = await getLabReportById(id);

            setFormData(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateLabReport(id, formData);

            alert("Laboratory Report Updated Successfully.");

            navigate("/lab-reports");

        } catch (error) {

            console.error(error);

            alert("Unable to update laboratory report.");

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

            buttonText="Update"

        />

    );

};

export default EditLabReport;