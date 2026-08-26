import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllNurses,
    deleteNurse
} from "../../../services/nurseService";

import "./NurseList.css";

const NurseList = () => {

    const navigate = useNavigate();

    const [nurses, setNurses] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [deletingId, setDeletingId] = useState(null);


    // =====================================================
    // LOAD NURSES
    // =====================================================

    const loadNurses = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllNurses();

            setNurses(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Error loading nurses:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to load nurses.";

            setError(message);

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // INITIAL LOAD
    // =====================================================

    useEffect(() => {

        loadNurses();

    }, []);


    // =====================================================
    // DELETE NURSE
    // =====================================================

    const handleDelete = async (id, name) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete nurse "${name}"?`
        );

        if (!confirmed) {
            return;
        }


        try {

            setDeletingId(id);

            await deleteNurse(id);

            setNurses((previous) =>
                previous.filter(
                    (nurse) => nurse.id !== id
                )
            );

            alert(
                "Nurse deleted successfully."
            );

        } catch (error) {

            console.error(
                "Error deleting nurse:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Failed to delete nurse.";

            alert(message);

        } finally {

            setDeletingId(null);
        }
    };


    // =====================================================
    // FILTER NURSES
    // =====================================================

    const filteredNurses = useMemo(() => {

        const search =
            searchTerm
                .trim()
                .toLowerCase();


        return nurses.filter((nurse) => {

            const matchesSearch =
                !search ||
                nurse.fullName
                    ?.toLowerCase()
                    .includes(search) ||
                nurse.employeeCode
                    ?.toLowerCase()
                    .includes(search) ||
                nurse.phone
                    ?.toLowerCase()
                    .includes(search) ||
                nurse.department
                    ?.toLowerCase()
                    .includes(search);


            const matchesStatus =
                statusFilter === "ALL" ||
                nurse.status === statusFilter;


            return (
                matchesSearch &&
                matchesStatus
            );
        });

    }, [
        nurses,
        searchTerm,
        statusFilter
    ]);


    // =====================================================
    // STATUS LABEL
    // =====================================================

    const getStatusLabel = (status) => {

        if (!status) {
            return "Unknown";
        }

        return status
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };


    // =====================================================
    // STATUS CLASS
    // =====================================================

    const getStatusClass = (status) => {

        switch (status) {

            case "ACTIVE":
                return "status-active";

            case "INACTIVE":
                return "status-inactive";

            case "ON_LEAVE":
                return "status-leave";

            default:
                return "status-default";
        }
    };


    // =====================================================
    // DEPARTMENT LABEL
    // =====================================================

    const getDepartmentLabel = (
        department
    ) => {

        if (!department) {
            return "Not provided";
        }

        return department
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };


    // =====================================================
    // SHIFT LABEL
    // =====================================================

    const getShiftLabel = (shift) => {

        if (!shift) {
            return "Not provided";
        }

        return shift
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };


    // =====================================================
    // RETRY
    // =====================================================

    const handleRetry = () => {

        loadNurses();

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="nurse-list-page">

                <div className="nurse-list-loading">

                    <div className="nurse-spinner"></div>

                    <p>
                        Loading nurses...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="nurse-list-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="nurse-list-header">

                <div>

                    <h2>
                        Nurses
                    </h2>

                    <p>
                        Manage hospital nursing staff
                    </p>

                </div>


                <button
                    type="button"
                    className="nurse-add-button"
                    onClick={() =>
                        navigate("/nurses/add")
                    }
                >
                    + Add Nurse
                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div className="nurse-list-error">

                    <div>
                        <strong>
                            Unable to load nurses
                        </strong>

                        <p>
                            {error}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleRetry}
                    >
                        Retry
                    </button>

                </div>
            )}


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="nurse-statistics">

                <div className="nurse-stat-card">

                    <span>
                        Total Nurses
                    </span>

                    <strong>
                        {nurses.length}
                    </strong>

                </div>


                <div className="nurse-stat-card">

                    <span>
                        Active
                    </span>

                    <strong>
                        {
                            nurses.filter(
                                (nurse) =>
                                    nurse.status ===
                                    "ACTIVE"
                            ).length
                        }
                    </strong>

                </div>


                <div className="nurse-stat-card">

                    <span>
                        On Leave
                    </span>

                    <strong>
                        {
                            nurses.filter(
                                (nurse) =>
                                    nurse.status ===
                                    "ON_LEAVE"
                            ).length
                        }
                    </strong>

                </div>


                <div className="nurse-stat-card">

                    <span>
                        Inactive
                    </span>

                    <strong>
                        {
                            nurses.filter(
                                (nurse) =>
                                    nurse.status ===
                                    "INACTIVE"
                            ).length
                        }
                    </strong>

                </div>

            </div>


            {/* =================================================
                FILTERS
            ================================================= */}

            <div className="nurse-list-filters">

                <div className="nurse-search">

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
                        }
                        placeholder="Search by name, employee code, phone or department..."
                    />

                </div>


                <div className="nurse-status-filter">

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

                        <option value="ON_LEAVE">
                            On Leave
                        </option>

                        <option value="INACTIVE">
                            Inactive
                        </option>

                    </select>

                </div>

            </div>


            {/* =================================================
                RESULT COUNT
            ================================================= */}

            <div className="nurse-result-info">

                Showing{" "}

                <strong>
                    {filteredNurses.length}
                </strong>

                {" "}of{" "}

                <strong>
                    {nurses.length}
                </strong>

                {" "}nurses

            </div>


            {/* =================================================
                EMPTY STATE
            ================================================= */}

            {filteredNurses.length === 0 ? (

                <div className="nurse-empty-state">

                    <div className="nurse-empty-icon">
                        👩‍⚕️
                    </div>

                    <h3>
                        No nurses found
                    </h3>

                    <p>
                        {nurses.length === 0
                            ? "No nurses have been registered yet."
                            : "Try changing your search or filter."}
                    </p>


                    {nurses.length === 0 && (

                        <button
                            type="button"
                            className="nurse-add-button"
                            onClick={() =>
                                navigate(
                                    "/nurses/add"
                                )
                            }
                        >
                            + Add First Nurse
                        </button>
                    )}

                </div>

            ) : (

                /* =================================================
                   TABLE
                ================================================= */

                <div className="nurse-table-container">

                    <table className="nurse-table">

                        <thead>

                            <tr>

                                <th>
                                    Employee Code
                                </th>

                                <th>
                                    Nurse
                                </th>

                                <th>
                                    Phone
                                </th>

                                <th>
                                    Department
                                </th>

                                <th>
                                    Shift
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

                            {filteredNurses.map(
                                (nurse) => (

                                    <tr
                                        key={nurse.id}
                                    >

                                        {/* Employee Code */}

                                        <td>

                                            <strong>
                                                {
                                                    nurse.employeeCode ||
                                                    "-"
                                                }
                                            </strong>

                                        </td>


                                        {/* Nurse */}

                                        <td>

                                            <div className="nurse-table-person">

                                                <div className="nurse-table-avatar">

                                                    {nurse.fullName
                                                        ?.charAt(0)
                                                        ?.toUpperCase() ||
                                                        "N"}

                                                </div>


                                                <div>

                                                    <strong>
                                                        {
                                                            nurse.fullName ||
                                                            "Unknown"
                                                        }
                                                    </strong>

                                                    <span>
                                                        {
                                                            nurse.degree ||
                                                            "-"
                                                        }
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        {/* Phone */}

                                        <td>
                                            {
                                                nurse.phone ||
                                                "-"
                                            }
                                        </td>


                                        {/* Department */}

                                        <td>
                                            {
                                                getDepartmentLabel(
                                                    nurse.department
                                                )
                                            }
                                        </td>


                                        {/* Shift */}

                                        <td>
                                            {
                                                getShiftLabel(
                                                    nurse.shift
                                                )
                                            }
                                        </td>


                                        {/* Status */}

                                        <td>

                                            <span
                                                className={`nurse-status ${getStatusClass(
                                                    nurse.status
                                                )}`}
                                            >
                                                {
                                                    getStatusLabel(
                                                        nurse.status
                                                    )
                                                }
                                            </span>

                                        </td>


                                        {/* Actions */}

                                        <td>

                                            <div className="nurse-actions">

                                                <button
                                                    type="button"
                                                    className="action-view"
                                                    title="View Nurse"
                                                    onClick={() =>
                                                        navigate(
                                                            `/nurses/view/${nurse.id}`
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>


                                                <button
                                                    type="button"
                                                    className="action-edit"
                                                    title="Edit Nurse"
                                                    onClick={() =>
                                                        navigate(
                                                            `/nurses/edit/${nurse.id}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    type="button"
                                                    className="action-delete"
                                                    title="Delete Nurse"
                                                    disabled={
                                                        deletingId ===
                                                        nurse.id
                                                    }
                                                    onClick={() =>
                                                        handleDelete(
                                                            nurse.id,
                                                            nurse.fullName
                                                        )
                                                    }
                                                >
                                                    {deletingId ===
                                                    nurse.id
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

export default NurseList;