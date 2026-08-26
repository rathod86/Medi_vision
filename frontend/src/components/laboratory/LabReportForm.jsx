import React from "react";

import "./LabReportForm.css";

const LabReportForm = ({

    formData,

    handleChange,

    handleSubmit,

    patients,

    doctors,

    prescriptions,

    buttonText

}) => {

    return (

        <div className="lab-form-container">

            <h2 className="lab-title">

                {buttonText} Laboratory Report

            </h2>

            <form
                className="lab-form"
                onSubmit={handleSubmit}
            >

                {/* ========================= */}
                {/* Patient */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Patient

                    </label>

                    <select
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        required
                    >

                        <option value="">

                            Select Patient

                        </option>

                        {(patients || []).map((patient) => (

                            <option
                                key={patient.id}
                                value={patient.id}
                            >

                                {patient.patientCode}
                                {" - "}
                                {patient.fullName}

                            </option>

                        ))}

                    </select>

                </div>

                {/* ========================= */}
                {/* Doctor */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Doctor

                    </label>

                    <select
                        name="doctorId"
                        value={formData.doctorId}
                        onChange={handleChange}
                        required
                    >

                        <option value="">

                            Select Doctor

                        </option>

                        {(doctors || []).map((doctor) => (

                            <option
                                key={doctor.id}
                                value={doctor.id}
                            >

                                {doctor.doctorCode}
                                {" - "}
                                {doctor.fullName}

                            </option>

                        ))}

                    </select>

                </div>

                {/* ========================= */}
                {/* Prescription */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Prescription (Optional)

                    </label>

                    <select
                        name="prescriptionId"
                        value={formData.prescriptionId}
                        onChange={handleChange}
                    >

                        <option value="">

                            Select Prescription

                        </option>

                        {Array.isArray(prescriptions)
                            ? prescriptions.map((prescription) => (
                                <option
                                    key={prescription.id}
                                    value={prescription.id}
                                >
                                    {prescription.prescriptionNumber}
                                </option>
                            ))
                            : null}

                    </select>

                </div>

                {/* ========================= */}
                {/* Test Name */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Test Name

                    </label>

                    <input
                        type="text"
                        name="testName"
                        value={formData.testName}
                        onChange={handleChange}
                        placeholder="Enter Test Name"
                        required
                    />

                </div>

                                {/* ========================= */}
                {/* Test Category */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Test Category

                    </label>

                    <input
                        type="text"
                        name="testCategory"
                        value={formData.testCategory}
                        onChange={handleChange}
                        placeholder="Blood Test / X-Ray / MRI / CT Scan"
                        required
                    />

                </div>

                {/* ========================= */}
                {/* Sample Type */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Sample Type

                    </label>

                    <input
                        type="text"
                        name="sampleType"
                        value={formData.sampleType}
                        onChange={handleChange}
                        placeholder="Blood / Urine / Saliva"
                        required
                    />

                </div>

                {/* ========================= */}
                {/* Test Date */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Test Date

                    </label>

                    <input
                        type="date"
                        name="testDate"
                        value={formData.testDate}
                        onChange={handleChange}
                        required
                    />

                </div>

                {/* ========================= */}
                {/* Report Date */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Report Date

                    </label>

                    <input
                        type="date"
                        name="reportDate"
                        value={formData.reportDate}
                        onChange={handleChange}
                    />

                </div>

                {/* ========================= */}
                {/* Result */}
                {/* ========================= */}

                <div className="form-group full-width">

                    <label>

                        Result

                    </label>

                    <textarea
                        name="result"
                        value={formData.result}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Enter Test Result"
                    />

                </div>

                {/* ========================= */}
                {/* Normal Range */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Normal Range

                    </label>

                    <input
                        type="text"
                        name="normalRange"
                        value={formData.normalRange}
                        onChange={handleChange}
                        placeholder="Example : 4.5 - 11.0"
                    />

                </div>

                {/* ========================= */}
                {/* Remarks */}
                {/* ========================= */}

                <div className="form-group full-width">

                    <label>

                        Remarks

                    </label>

                    <textarea
                        name="remarks"
                        value={formData.remarks}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Additional Remarks"
                    />

                </div>
                              {/* ========================= */}
                {/* Lab Name */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Laboratory Name

                    </label>

                    <input
                        type="text"
                        name="labName"
                        value={formData.labName}
                        onChange={handleChange}
                        placeholder="Enter Laboratory Name"
                        required
                    />

                </div>

                {/* ========================= */}
                {/* Technician Name */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Technician Name

                    </label>

                    <input
                        type="text"
                        name="labTechnicianName"
                        value={formData.labTechnicianName}
                        onChange={handleChange}
                        placeholder="Enter Technician Name"
                        required
                    />

                </div>

                {/* ========================= */}
                {/* Technician Degree */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Technician Degree

                    </label>

                    <input
                        type="text"
                        name="labTechnicianDegree"
                        value={formData.labTechnicianDegree}
                        onChange={handleChange}
                        placeholder="Example : B.Sc MLT"
                    />

                </div>

                {/* ========================= */}
                {/* Report File */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Report File Path

                    </label>

                    <input
                        type="text"
                        name="reportFilePath"
                        value={formData.reportFilePath}
                        onChange={handleChange}
                        placeholder="Upload Path / PDF URL"
                    />

                </div>

                {/* ========================= */}
                {/* Status */}
                {/* ========================= */}

                <div className="form-group">

                    <label>

                        Status

                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >

                        <option value="Pending">
                            Pending
                        </option>

                        <option value="In Progress">
                            In Progress
                        </option>

                        <option value="Completed">
                            Completed
                        </option>

                    </select>

                </div>

                {/* ========================= */}
                {/* Submit */}
                {/* ========================= */}

                <div className="form-actions">

                    <button
                        type="submit"
                        className="save-btn"
                    >

                        {buttonText} Report

                    </button>

                </div>

            </form>

        </div>

    );

};

export default LabReportForm;  