import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getLabReportById } from "../../../services/labReportService";

import "./ViewLabReport.css";

const ViewLabReport = () => {

    const { id } = useParams();

    const [report, setReport] = useState(null);

    useEffect(() => {

        loadReport();

    }, []);

    const loadReport = async () => {

        try {

            const response = await getLabReportById(id);

            setReport(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    if (!report) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="lab-report-view">

            {/* Hospital Header */}

            <div className="hospital-header">

                <h1>MediVision Hospital</h1>

                <p>Bengaluru, Karnataka</p>

                <hr />

            </div>

            {/* Report Header */}

            <div className="report-header">

                <div>

                    <h3>Report Code</h3>

                    <p>{report.reportCode}</p>

                </div>

                <div>

                    <h3>Report Date</h3>

                    <p>{report.reportDate}</p>

                </div>

                <div>

                    <h3>Status</h3>

                    <p>{report.status}</p>

                </div>

            </div>

            {/* Patient */}

            <div className="section">

                <h2>Patient Information</h2>

                <p>

                    <strong>Patient Code :</strong>

                    {report.patientCode}

                </p>

                <p>

                    <strong>Patient Name :</strong>

                    {report.patientName}

                </p>

            </div>

            {/* Doctor */}

            <div className="section">

                <h2>Doctor Information</h2>

                <p>

                    <strong>Doctor Code :</strong>

                    {report.doctorCode}

                </p>

                <p>

                    <strong>Doctor Name :</strong>

                    {report.doctorName}

                </p>

            </div>

            {/* Prescription */}

            <div className="section">

                <h2>Prescription</h2>

                <p>

                    <strong>Prescription Number :</strong>

                    {report.prescriptionNumber || "N/A"}

                </p>

            </div>

            {/* Test */}

            <div className="section">

                <h2>Test Details</h2>

                <p>

                    <strong>Test Name :</strong>

                    {report.testName}

                </p>

                <p>

                    <strong>Category :</strong>

                    {report.testCategory}

                </p>

                <p>

                    <strong>Sample Type :</strong>

                    {report.sampleType}

                </p>

                <p>

                    <strong>Test Date :</strong>

                    {report.testDate}

                </p>

            </div>

            {/* Result */}

            <div className="section">

                <h2>Test Result</h2>

                <p>

                    <strong>Result :</strong>

                </p>

                <div className="result-box">

                    {report.result}

                </div>

                <p>

                    <strong>Normal Range :</strong>

                    {report.normalRange}

                </p>

                <p>

                    <strong>Remarks :</strong>

                    {report.remarks}

                </p>

            </div>

            {/* Laboratory */}

            <div className="section">

                <h2>Laboratory Details</h2>

                <p>

                    <strong>Laboratory :</strong>

                    {report.labName}

                </p>

                <p>

                    <strong>Technician :</strong>

                    {report.labTechnicianName}

                </p>

                <p>

                    <strong>Qualification :</strong>

                    {report.labTechnicianDegree}

                </p>

            </div>

            {/* File */}

            <div className="section">

                <h2>Report File</h2>

                <p>

                    {report.reportFilePath || "No File Uploaded"}

                </p>

            </div>

            {/* Footer */}

            <div className="footer">

                <button

                    className="print-btn"

                    onClick={() => window.print()}

                >

                    Print Report

                </button>

            </div>

        </div>

    );

};

export default ViewLabReport;