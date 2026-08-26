import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getAllPrescriptions,
    deletePrescription,
    searchPatient,
} from "../../../services/prescriptionService";

import PrescriptionStats from "../../prescription/PrescriptionStats";
import PrescriptionSearch from "../../prescription/PrescriptionSearch";
import PrescriptionFilter from "../../prescription/PrescriptionFilter";
import PrescriptionTable from "../../prescription/PrescriptionTable";
import PrescriptionPagination from "../../prescription/PrescriptionPagination";

import { toArray } from "../../../utils/apiHelpers";

const PrescriptionList = () => {

    const [prescriptions, setPrescriptions] = useState([]);
    const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [status, setStatus] = useState("");

    const [patient, setPatient] = useState("");

    const [doctor, setDoctor] = useState("");

    const [prescriptionDate, setPrescriptionDate] = useState("");

    const [followUpDate, setFollowUpDate] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const prescriptionsPerPage = 10;

    useEffect(() => {

        loadPrescriptions();

    }, []);

    useEffect(() => {

        applyFilters();

    }, [
        prescriptions,
        status,
        patient,
        doctor,
        prescriptionDate,
        followUpDate
    ]);

    const loadPrescriptions = async () => {

        try {

            const prescriptionsData = await getAllPrescriptions();

            setPrescriptions(prescriptionsData);

            setFilteredPrescriptions(prescriptionsData);

        }

        catch (error) {

            console.error(error);

        }

    };

    const applyFilters = () => {

        let data = [...prescriptions];

        if (status !== "") {

            data = data.filter(

                item => item.status === status

            );

        }

        if (patient !== "") {

            data = data.filter(

                item =>

                    item.patientName
                        ?.toLowerCase()
                        .includes(patient.toLowerCase())

            );

        }

        if (doctor !== "") {

            data = data.filter(

                item =>

                    item.doctorName
                        ?.toLowerCase()
                        .includes(doctor.toLowerCase())

            );

        }

        if (prescriptionDate !== "") {

            data = data.filter(

                item =>

                    item.prescriptionDate === prescriptionDate

            );

        }

        if (followUpDate !== "") {

            data = data.filter(

                item =>

                    item.followUpDate === followUpDate

            );

        }

        setFilteredPrescriptions(data);

        setCurrentPage(1);

    };

    const handleSearch = async (value) => {

        setSearchTerm(value);

        if (value.trim() === "") {

            loadPrescriptions();

            return;

        }

        try {

            const data = await searchPatient(value);

            setFilteredPrescriptions(toArray(data));

            setCurrentPage(1);

        }

        catch (error) {

            console.error(error);

        }

    };

    const clearSearch = () => {

        setSearchTerm("");

        loadPrescriptions();

    };

    const resetFilters = () => {

        setSearchTerm("");

        setStatus("");

        setPatient("");

        setDoctor("");

        setPrescriptionDate("");

        setFollowUpDate("");

        loadPrescriptions();

    };

    const handleDelete = async (id) => {

        if (

            !window.confirm(

                "Delete this prescription?"

            )

        ) return;

        try {

            await deletePrescription(id);

            alert("Prescription deleted successfully.");

            loadPrescriptions();

        }

        catch (error) {

            console.error(error);

            alert("Unable to delete prescription.");

        }

    };

    const indexOfLast =
        currentPage * prescriptionsPerPage;

    const indexOfFirst =
        indexOfLast - prescriptionsPerPage;

    const currentPrescriptions =
        filteredPrescriptions.slice(

            indexOfFirst,

            indexOfLast

        );

    const totalPages = Math.ceil(

        filteredPrescriptions.length /

        prescriptionsPerPage

    );

    return (

        <div className="prescription-list-container">

            <div className="header">

                <h2>

                    Prescription Management

                </h2>

                <Link

                    to="/prescriptions/add"

                    className="add-btn"

                >

                    + Add Prescription

                </Link>

            </div>

            <PrescriptionStats />

            <PrescriptionSearch

                searchTerm={searchTerm}

                setSearchTerm={setSearchTerm}

                onSearch={handleSearch}

                onClear={clearSearch}

            />

            <PrescriptionFilter

                status={status}

                setStatus={setStatus}

                patient={patient}

                setPatient={setPatient}

                doctor={doctor}

                setDoctor={setDoctor}

                prescriptionDate={prescriptionDate}

                setPrescriptionDate={setPrescriptionDate}

                followUpDate={followUpDate}

                setFollowUpDate={setFollowUpDate}

                resetFilters={resetFilters}

            />

            <PrescriptionTable

                prescriptions={currentPrescriptions}

                onDelete={handleDelete}

            />

            <PrescriptionPagination

                currentPage={currentPage}

                totalPages={totalPages}

                onPageChange={setCurrentPage}

            />

        </div>

    );

};

export default PrescriptionList;