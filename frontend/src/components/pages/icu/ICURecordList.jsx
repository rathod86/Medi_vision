import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllICURecords,
    deleteICURecord
} from "../../../services/icuRecordService";

import "./ICURecordList.css";

const ICURecordList = () => {

    const navigate = useNavigate();

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);

    const [deletingId, setDeletingId] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("");


    // =====================================================
    // LOAD ICU RECORDS
    // =====================================================

    const loadRecords = async () => {

        try {

            setLoading(true);

            const data =
                await getAllICURecords();

            setRecords(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Error loading ICU records:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to load ICU records.";

            alert(message);

            setRecords([]);

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadRecords();

    }, []);


    // =====================================================
    // DELETE ICU RECORD
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this ICU record?"
            );

        if (!confirmed) {
            return;
        }


        try {

            setDeletingId(id);

            await deleteICURecord(id);

            alert(
                "ICU Record deleted successfully."
            );

            await loadRecords();

        } catch (error) {

            console.error(
                "Error deleting ICU record:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to delete ICU record.";

            alert(message);

        } finally {

            setDeletingId(null);
        }
    };


    // =====================================================
    // FILTER RECORDS
    // =====================================================

    const filteredRecords =
        records.filter((record) => {

            const search =
                searchTerm
                    .trim()
                    .toLowerCase();


            const matchesSearch =
                !search ||
                String(
                    record.icuRecordNumber || ""
                )
                    .toLowerCase()
                    .includes(search) ||

                String(
                    record.patientName || ""
                )
                    .toLowerCase()
                    .includes(search) ||

                String(
                    record.patientCode || ""
                )
                    .toLowerCase()
                    .includes(search) ||

                String(
                    record.doctorName || ""
                )
                    .toLowerCase()
                    .includes(search) ||

                String(
                    record.nurseName || ""
                )
                    .toLowerCase()
                    .includes(search) ||

                String(
                    record.bedNumber || ""
                )
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                !statusFilter ||
                String(
                    record.status || ""
                ).toLowerCase() ===
                    statusFilter.toLowerCase();


            return (
                matchesSearch &&
                matchesStatus
            );
        });


    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {

        switch (
            String(status || "")
                .toLowerCase()
        ) {

            case "critical":
                return "status-critical";

            case "active":
                return "status-active";

            case "admitted":
                return "status-admitted";

            case "stable":
                return "status-stable";

            case "discharged":
                return "status-discharged";

            case "transferred":
                return "status-transferred";

            default:
                return "status-default";
        }
    };


    // =====================================================
    // CRITICAL LEVEL CLASS
    // =====================================================

    const getCriticalClass = (
        criticalLevel
    ) => {

        switch (
            String(criticalLevel || "")
                .toLowerCase()
        ) {

            case "critical":
                return "critical-critical";

            case "high":
                return "critical-high";

            case "medium":
                return "critical-medium";

            case "low":
                return "critical-low";

            default:
                return "critical-default";
        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="icu-list-loading">

                <div className="icu-list-spinner"></div>

                <p>
                    Loading ICU records...
                </p>

            </div>
        );
    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="icu-list-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="icu-list-header">

                <div>

                    <h2>
                        ICU Records
                    </h2>

                    <p>
                        Manage and monitor ICU
                        patient records.
                    </p>

                </div>


                <button
                    type="button"
                    className="icu-add-button"
                    onClick={() =>
                        navigate(
                            "/icu-records/add"
                        )
                    }
                >
                    + Add ICU Record
                </button>

            </div>


            {/* =================================================
                FILTER BAR
            ================================================= */}

            <div className="icu-filter-bar">

                <div className="icu-search-box">

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
                        }
                        placeholder="Search ICU record, patient, doctor, bed..."
                    />

                </div>


                <div className="icu-status-filter">

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value
                            )
                        }
                    >

                        <option value="">
                            All Status
                        </option>

                        <option value="Admitted">
                            Admitted
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Critical">
                            Critical
                        </option>

                        <option value="Stable">
                            Stable
                        </option>

                        <option value="Discharged">
                            Discharged
                        </option>

                        <option value="Transferred">
                            Transferred
                        </option>

                    </select>

                </div>


                <button
                    type="button"
                    className="icu-refresh-button"
                    onClick={loadRecords}
                >
                    Refresh
                </button>

            </div>


            {/* =================================================
                SUMMARY
            ================================================= */}

            <div className="icu-list-summary">

                <span>
                    Total Records:
                    <strong>
                        {" "}
                        {records.length}
                    </strong>
                </span>

                <span>
                    Showing:
                    <strong>
                        {" "}
                        {filteredRecords.length}
                    </strong>
                </span>

            </div>


            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {filteredRecords.length === 0 ? (

                <div className="icu-empty-state">

                    <div className="icu-empty-icon">
                        🏥
                    </div>

                    <h3>
                        No ICU Records Found
                    </h3>

                    <p>
                        {records.length === 0
                            ? "No ICU records have been created yet."
                            : "No records match your search or filter."}
                    </p>


                    {records.length === 0 && (

                        <button
                            type="button"
                            className="icu-add-button"
                            onClick={() =>
                                navigate(
                                    "/icu-records/add"
                                )
                            }
                        >
                            Add First ICU Record
                        </button>

                    )}

                </div>

            ) : (

                /* =================================================
                   TABLE
                ================================================= */

                <div className="icu-table-container">

                    <table className="icu-record-table">

                        <thead>

                            <tr>

                                <th>
                                    ICU Record
                                </th>

                                <th>
                                    Patient
                                </th>

                                <th>
                                    Doctor
                                </th>

                                <th>
                                    Nurse
                                </th>

                                <th>
                                    Bed / Ward
                                </th>

                                <th>
                                    Critical Level
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Ventilator
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredRecords.map(
                                (record) => (

                                    <tr
                                        key={
                                            record.id
                                        }
                                    >

                                        {/* ICU Record */}

                                        <td>

                                            <div className="icu-record-number">

                                                {record.icuRecordNumber ||
                                                    `ICU-${record.id}`}

                                            </div>

                                            <small>
                                                Start:{" "}
                                                {record.icuStartDate ||
                                                    "N/A"}
                                            </small>

                                        </td>


                                        {/* Patient */}

                                        <td>

                                            <div className="patient-name">

                                                {record.patientName ||
                                                    "N/A"}

                                            </div>

                                            <small>

                                                {record.patientCode ||
                                                    `ID: ${record.patientId || "N/A"}`}

                                            </small>

                                        </td>


                                        {/* Doctor */}

                                        <td>

                                            <div>

                                                {record.doctorName ||
                                                    "N/A"}

                                            </div>

                                            {record.doctorDegree && (

                                                <small>
                                                    {
                                                        record.doctorDegree
                                                    }
                                                </small>

                                            )}

                                        </td>


                                        {/* Nurse */}

                                        <td>

                                            {record.nurseName ||
                                                "Not Assigned"}

                                        </td>


                                        {/* Bed / Ward */}

                                        <td>

                                            <div>
                                                <strong>
                                                    {record.bedNumber ||
                                                        "N/A"}
                                                </strong>
                                            </div>

                                            <small>
                                                {record.wardNumber ||
                                                    "N/A"}
                                            </small>

                                        </td>


                                        {/* Critical Level */}

                                        <td>

                                            <span
                                                className={
                                                    `icu-critical-badge ${
                                                        getCriticalClass(
                                                            record.criticalLevel
                                                        )
                                                    }`
                                                }
                                            >
                                                {
                                                    record.criticalLevel ||
                                                    "N/A"
                                                }
                                            </span>

                                        </td>


                                        {/* Status */}

                                        <td>

                                            <span
                                                className={
                                                    `icu-status-badge ${
                                                        getStatusClass(
                                                            record.status
                                                        )
                                                    }`
                                                }
                                            >
                                                {
                                                    record.status ||
                                                    "N/A"
                                                }
                                            </span>

                                        </td>


                                        {/* Ventilator */}

                                        <td>

                                            <span
                                                className={
                                                    record.ventilatorRequired
                                                        ? "ventilator-yes"
                                                        : "ventilator-no"
                                                }
                                            >
                                                {record.ventilatorRequired
                                                    ? "Yes"
                                                    : "No"}
                                            </span>

                                        </td>


                                        {/* Actions */}

                                        <td>

                                            <div className="icu-action-buttons">

                                                <button
                                                    type="button"
                                                    className="action-view"
                                                    title="View"
                                                    onClick={() =>
                                                        navigate(
                                                            `/icu-records/view/${record.id}`
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>


                                                <button
                                                    type="button"
                                                    className="action-edit"
                                                    title="Edit"
                                                    onClick={() =>
                                                        navigate(
                                                            `/icu-records/edit/${record.id}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    type="button"
                                                    className="action-delete"
                                                    title="Delete"
                                                    disabled={
                                                        deletingId ===
                                                        record.id
                                                    }
                                                    onClick={() =>
                                                        handleDelete(
                                                            record.id
                                                        )
                                                    }
                                                >
                                                    {deletingId ===
                                                    record.id
                                                        ? "Deleting..."
                                                        : "Delete"}
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
    );
};


export default ICURecordList;