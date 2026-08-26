import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import "./LabReportList.css";

import {

    getAllLabReports,

    deleteLabReport

} from "../../../services/labReportService";

import { toArray } from "../../../utils/apiHelpers";

const LabReportList = () => {

    const [reports, setReports] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        try {

            const data = await getAllLabReports();

            setReports(toArray(data));

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this report?"

        );

        if (!confirmDelete) return;

        try {

            await deleteLabReport(id);

            loadReports();

        }

        catch (error) {

            console.error(error);

        }

    };

    const filteredReports = reports.filter((report) =>

        report.patientName?.toLowerCase().includes(search.toLowerCase()) ||

        report.testName?.toLowerCase().includes(search.toLowerCase()) ||

        report.reportCode?.toLowerCase().includes(search.toLowerCase()) ||

        report.status?.toLowerCase().includes(search.toLowerCase())

    );

    return (

        <div className="lab-list-container">

            <div className="lab-list-header">

                <h2>

                    Laboratory Reports

                </h2>

                <Link

                    to="/lab-reports/add"

                    className="add-btn"

                >

                    + Add Report

                </Link>

            </div>

            <input

                className="search-box"

                type="text"

                placeholder="Search Report..."

                value={search}

                onChange={(e) =>

                    setSearch(e.target.value)

                }

            />

            <div className="lab-table-wrapper">

            <table className="lab-table">

                <thead>

                    <tr>

                        <th>Report Code</th>

                        <th>Patient</th>

                        <th>Doctor</th>

                        <th>Test</th>

                        <th>Date</th>

                        <th>Status</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>
                                        {filteredReports.length > 0 ? (

                        filteredReports.map((report) => (

                            <tr key={report.id}>

                                <td>

                                    {report.reportCode}

                                </td>

                                <td>

                                    {report.patientName}

                                </td>

                                <td>

                                    {report.doctorName}

                                </td>

                                <td>

                                    {report.testName}

                                </td>

                                <td>

                                    {report.testDate}

                                </td>

                                <td>

                                    <span
                                        className={`status ${report.status?.toLowerCase().replace(/\s+/g, "-")}`}
                                    >

                                        {report.status}

                                    </span>

                                </td>

                                <td className="action-buttons">

                                    <Link
                                        to={`/lab-reports/view/${report.id}`}
                                        className="view-btn"
                                    >

                                        View

                                    </Link>

                                    <Link
                                        to={`/lab-reports/edit/${report.id}`}
                                        className="edit-btn"
                                    >

                                        Edit

                                    </Link>

                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            handleDelete(report.id)
                                        }
                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="7"
                                className="no-data"
                            >

                                No Laboratory Reports Found

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

            </div>

        </div>

    );

};

export default LabReportList;
                