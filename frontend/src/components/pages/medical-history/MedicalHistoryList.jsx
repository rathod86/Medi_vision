import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllMedicalHistories,
    deleteMedicalHistory,
    getMedicalHistoryStatistics
} from "../../../services/medicalHistoryService";

import "./MedicalHistoryList.css";

const MedicalHistoryList = () => {

    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [medicalHistories, setMedicalHistories] = useState([]);

    const [filteredHistories, setFilteredHistories] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [statistics, setStatistics] = useState({
        total: 0,
        active: 0,
        chronic: 0,
        resolved: 0
    });


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadMedicalHistories();

    }, []);


    // =====================================================
    // FILTER
    // =====================================================

    useEffect(() => {

        applyFilters();

    }, [
        medicalHistories,
        searchTerm,
        statusFilter
    ]);


    // =====================================================
    // LOAD MEDICAL HISTORIES
    // =====================================================

    const loadMedicalHistories = async () => {

        try {

            setLoading(true);
            setError("");

            const data =
                await getAllMedicalHistories();

            const records =
                Array.isArray(data)
                    ? data
                    : data?.content || [];

            setMedicalHistories(records);

            calculateStatistics(records);

        } catch (err) {

            console.error(
                "Error loading medical histories:",
                err
            );

            setError(
                getErrorMessage(
                    err,
                    "Unable to load medical histories."
                )
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // CALCULATE STATISTICS
    // =====================================================

    const calculateStatistics = (records) => {

        const total = records.length;

        const active =
            records.filter(
                (record) =>
                    record.status?.toUpperCase() ===
                    "ACTIVE"
            ).length;

        const chronic =
            records.filter(
                (record) =>
                    record.status?.toUpperCase() ===
                    "CHRONIC"
            ).length;

        const resolved =
            records.filter(
                (record) =>
                    record.status?.toUpperCase() ===
                    "RESOLVED"
            ).length;

        setStatistics({
            total,
            active,
            chronic,
            resolved
        });
    };


    // =====================================================
    // APPLY SEARCH + FILTER
    // =====================================================

    const applyFilters = () => {

        let records = [...medicalHistories];


        // -------------------------------------------------
        // SEARCH
        // -------------------------------------------------

        if (searchTerm.trim()) {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();

            records = records.filter(
                (record) => {

                    return (
                        String(
                            record.historyNumber || ""
                        )
                            .toLowerCase()
                            .includes(search)

                        ||

                        String(
                            record.patientCode || ""
                        )
                            .toLowerCase()
                            .includes(search)

                        ||

                        String(
                            record.patientName || ""
                        )
                            .toLowerCase()
                            .includes(search)

                        ||

                        String(
                            record.doctorName || ""
                        )
                            .toLowerCase()
                            .includes(search)

                        ||

                        String(
                            record.diagnosis || ""
                        )
                            .toLowerCase()
                            .includes(search)

                        ||

                        String(
                            record.chronicDiseases || ""
                        )
                            .toLowerCase()
                            .includes(search)
                    );
                }
            );
        }


        // -------------------------------------------------
        // STATUS FILTER
        // -------------------------------------------------

        if (statusFilter !== "ALL") {

            records = records.filter(
                (record) =>
                    record.status?.toUpperCase() ===
                    statusFilter
            );
        }


        setFilteredHistories(records);
    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this medical history record?"
            );

        if (!confirmed) {
            return;
        }


        try {

            await deleteMedicalHistory(id);

            alert(
                "Medical History deleted successfully."
            );

            await loadMedicalHistories();

        } catch (err) {

            console.error(
                "Error deleting medical history:",
                err
            );

            const message =
                getErrorMessage(
                    err,
                    "Failed to delete medical history."
                );

            alert(message);
        }
    };


    // =====================================================
    // NAVIGATION
    // =====================================================

    const handleAdd = () => {

        navigate(
            "/medical-histories/add"
        );
    };


    const handleView = (id) => {

        navigate(
            `/medical-histories/view/${id}`
        );
    };


    const handleEdit = (id) => {

        navigate(
            `/medical-histories/edit/${id}`
        );
    };


    // =====================================================
    // CLEAR FILTERS
    // =====================================================

    const clearFilters = () => {

        setSearchTerm("");
        setStatusFilter("ALL");
    };


    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        try {

            const parsedDate =
                new Date(date);

            if (
                Number.isNaN(
                    parsedDate.getTime()
                )
            ) {
                return date;
            }

            return parsedDate.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        } catch {

            return date;
        }
    };


    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {

        if (!status) {
            return "status-unknown";
        }

        return (
            `status-${status
                .toLowerCase()
                .replace(/\s+/g, "-")}`
        );
    };


    // =====================================================
    // ERROR MESSAGE
    // =====================================================

    const getErrorMessage = (
        error,
        defaultMessage
    ) => {

        if (error?.response?.data) {

            const data =
                error.response.data;


            if (typeof data === "string") {
                return data;
            }


            if (data.message) {
                return data.message;
            }


            if (data.error) {
                return data.error;
            }


            if (data.errors) {

                if (Array.isArray(data.errors)) {

                    return data.errors
                        .map(
                            (item) =>
                                item.defaultMessage ||
                                item.message ||
                                String(item)
                        )
                        .join("\n");
                }


                if (
                    typeof data.errors === "object"
                ) {

                    return Object.values(
                        data.errors
                    ).join("\n");
                }
            }
        }


        if (
            error?.request &&
            !error?.response
        ) {

            return (
                "Unable to connect to the server. " +
                "Please make sure Spring Boot is running on port 8080."
            );
        }


        return defaultMessage;
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="medical-history-list-page">

                <div className="medical-history-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading medical histories...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // PAGE
    // =====================================================

    return (

        <div className="medical-history-list-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="medical-history-list-header">

                <div>

                    <h1>
                        Medical History
                    </h1>

                    <p>
                        Manage and review patient
                        medical history records.
                    </p>

                </div>


                <button
                    type="button"
                    className="add-medical-history-button"
                    onClick={handleAdd}
                >
                    + Add Medical History
                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="medical-history-list-error">

                    <strong>
                        Error:
                    </strong>

                    <span>
                        {error}
                    </span>

                </div>

            )}


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="medical-history-statistics">

                <div className="stat-card">

                    <div className="stat-content">

                        <span>
                            Total Records
                        </span>

                        <strong>
                            {statistics.total}
                        </strong>

                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-content">

                        <span>
                            Active
                        </span>

                        <strong>
                            {statistics.active}
                        </strong>

                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-content">

                        <span>
                            Chronic
                        </span>

                        <strong>
                            {statistics.chronic}
                        </strong>

                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-content">

                        <span>
                            Resolved
                        </span>

                        <strong>
                            {statistics.resolved}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                FILTERS
            ================================================= */}

            <div className="medical-history-filters">

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search by history number, patient, doctor, diagnosis..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
                        }
                    />

                </div>


                <div className="status-filter">

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                    >

                        <option value="ALL">
                            All Status
                        </option>

                        <option value="ACTIVE">
                            Active
                        </option>

                        <option value="CHRONIC">
                            Chronic
                        </option>

                        <option value="RESOLVED">
                            Resolved
                        </option>

                        <option value="INACTIVE">
                            Inactive
                        </option>

                    </select>

                </div>


                <button
                    type="button"
                    className="clear-filter-button"
                    onClick={clearFilters}
                >
                    Clear
                </button>

            </div>


            {/* =================================================
                RESULT COUNT
            ================================================= */}

            <div className="medical-history-result-info">

                Showing{" "}
                <strong>
                    {filteredHistories.length}
                </strong>{" "}
                of{" "}
                <strong>
                    {medicalHistories.length}
                </strong>{" "}
                records

            </div>


            {/* =================================================
                TABLE
            ================================================= */}

            <div className="medical-history-table-card">

                {filteredHistories.length === 0 ? (

                    <div className="no-medical-history">

                        <h3>
                            No Medical History Found
                        </h3>

                        <p>
                            No records match your
                            current search or filter.
                        </p>

                        <button
                            type="button"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </button>

                    </div>

                ) : (

                    <div className="medical-history-table-wrapper">

                        <table className="medical-history-table">

                            <thead>

                                <tr>

                                    <th>
                                        History No.
                                    </th>

                                    <th>
                                        Patient
                                    </th>

                                    <th>
                                        Doctor
                                    </th>

                                    <th>
                                        History Date
                                    </th>

                                    <th>
                                        Diagnosis
                                    </th>

                                    <th>
                                        Status
                                    </th>

                                    <th>
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredHistories.map(
                                    (record) => (

                                        <tr
                                            key={
                                                record.id
                                            }
                                        >

                                            {/* History Number */}

                                            <td>

                                                <strong>
                                                    {record.historyNumber ||
                                                        `MH-${record.id}`}
                                                </strong>

                                            </td>


                                            {/* Patient */}

                                            <td>

                                                <div className="patient-info">

                                                    <strong>
                                                        {
                                                            record.patientName ||
                                                            "-"
                                                        }
                                                    </strong>

                                                    {record.patientCode && (

                                                        <small>
                                                            {
                                                                record.patientCode
                                                            }
                                                        </small>

                                                    )}

                                                </div>

                                            </td>


                                            {/* Doctor */}

                                            <td>

                                                <div className="doctor-info">

                                                    <strong>
                                                        {
                                                            record.doctorName ||
                                                            "-"
                                                        }
                                                    </strong>

                                                    {record.doctorDegree && (

                                                        <small>
                                                            {
                                                                record.doctorDegree
                                                            }
                                                        </small>

                                                    )}

                                                </div>

                                            </td>


                                            {/* Date */}

                                            <td>
                                                {formatDate(
                                                    record.historyDate
                                                )}
                                            </td>


                                            {/* Diagnosis */}

                                            <td>

                                                <div className="diagnosis-text">

                                                    {record.diagnosis ||
                                                        record.chronicDiseases ||
                                                        "No diagnosis recorded"}

                                                </div>

                                            </td>


                                            {/* Status */}

                                            <td>

                                                <span
                                                    className={
                                                        `history-status-badge ${getStatusClass(
                                                            record.status
                                                        )}`
                                                    }
                                                >

                                                    {record.status ||
                                                        "UNKNOWN"}

                                                </span>

                                            </td>


                                            {/* Actions */}

                                            <td>

                                                <div className="table-actions">

                                                    <button
                                                        type="button"
                                                        className="view-action"
                                                        onClick={() =>
                                                            handleView(
                                                                record.id
                                                            )
                                                        }
                                                        title="View"
                                                    >
                                                        View
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="edit-action"
                                                        onClick={() =>
                                                            handleEdit(
                                                                record.id
                                                            )
                                                        }
                                                        title="Edit"
                                                    >
                                                        Edit
                                                    </button>


                                                    <button
                                                        type="button"
                                                        className="delete-action"
                                                        onClick={() =>
                                                            handleDelete(
                                                                record.id
                                                            )
                                                        }
                                                        title="Delete"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};


export default MedicalHistoryList;