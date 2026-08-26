import React, { useEffect, useState } from "react";
import "./MedicalHistoryForm.css";

const MedicalHistoryForm = ({
    initialData = {},
    patients = [],
    doctors = [],
    onSubmit,
    onCancel,
    loading = false,
    isEdit = false
}) => {

    // =====================================================
    // FORM STATE
    // =====================================================

    const [formData, setFormData] = useState({
        patientId: "",
        doctorId: "",
        historyDate: "",

        allergies: "",
        chronicDiseases: "",
        familyHistory: "",
        previousMedications: "",
        currentMedications: "",
        previousSurgeries: "",
        previousHospitalizations: "",
        majorIllnesses: "",
        immunizationHistory: "",

        treatmentGiven: "",
        proceduresPerformed: "",
        diagnosis: "",

        bloodGroup: "",
        smokingHistory: "",
        alcoholHistory: "",
        substanceHistory: "",
        disabilityInformation: "",

        emergencyNotes: "",
        additionalNotes: "",

        status: "ACTIVE",
        lastReviewedDate: ""
    });


    // =====================================================
    // VALIDATION ERRORS
    // =====================================================

    const [errors, setErrors] = useState({});


    // =====================================================
    // LOAD INITIAL DATA
    // =====================================================

    useEffect(() => {

        if (initialData && Object.keys(initialData).length > 0) {

            setFormData({
                patientId: initialData.patientId ?? "",
                doctorId: initialData.doctorId ?? "",
                historyDate: initialData.historyDate ?? "",

                allergies: initialData.allergies ?? "",
                chronicDiseases: initialData.chronicDiseases ?? "",
                familyHistory: initialData.familyHistory ?? "",
                previousMedications:
                    initialData.previousMedications ?? "",
                currentMedications:
                    initialData.currentMedications ?? "",
                previousSurgeries:
                    initialData.previousSurgeries ?? "",
                previousHospitalizations:
                    initialData.previousHospitalizations ?? "",
                majorIllnesses:
                    initialData.majorIllnesses ?? "",
                immunizationHistory:
                    initialData.immunizationHistory ?? "",

                treatmentGiven:
                    initialData.treatmentGiven ?? "",
                proceduresPerformed:
                    initialData.proceduresPerformed ?? "",
                diagnosis:
                    initialData.diagnosis ?? "",

                bloodGroup:
                    initialData.bloodGroup ?? "",
                smokingHistory:
                    initialData.smokingHistory ?? "",
                alcoholHistory:
                    initialData.alcoholHistory ?? "",
                substanceHistory:
                    initialData.substanceHistory ?? "",
                disabilityInformation:
                    initialData.disabilityInformation ?? "",

                emergencyNotes:
                    initialData.emergencyNotes ?? "",
                additionalNotes:
                    initialData.additionalNotes ?? "",

                status:
                    initialData.status ?? "ACTIVE",

                lastReviewedDate:
                    initialData.lastReviewedDate ?? ""
            });
        }

    }, [initialData]);


    // =====================================================
    // HANDLE INPUT CHANGE
    // =====================================================

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        // Clear individual error
        if (errors[name]) {

            setErrors((previous) => ({
                ...previous,
                [name]: ""
            }));
        }
    };


    // =====================================================
    // VALIDATE FORM
    // =====================================================

    const validateForm = () => {

        const newErrors = {};

        if (!formData.patientId) {
            newErrors.patientId = "Patient is required.";
        }

        if (!formData.historyDate) {
            newErrors.historyDate =
                "History date is required.";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    // =====================================================
    // HANDLE SUBMIT
    // =====================================================

    const handleSubmit = (event) => {

        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Convert IDs to numbers before sending
        const requestData = {
            ...formData,

            patientId:
                formData.patientId
                    ? Number(formData.patientId)
                    : null,

            doctorId:
                formData.doctorId
                    ? Number(formData.doctorId)
                    : null
        };

        onSubmit(requestData);
    };


    // =====================================================
    // RESET FORM
    // =====================================================

    const handleReset = () => {

        setFormData({
            patientId: "",
            doctorId: "",
            historyDate: "",

            allergies: "",
            chronicDiseases: "",
            familyHistory: "",
            previousMedications: "",
            currentMedications: "",
            previousSurgeries: "",
            previousHospitalizations: "",
            majorIllnesses: "",
            immunizationHistory: "",

            treatmentGiven: "",
            proceduresPerformed: "",
            diagnosis: "",

            bloodGroup: "",
            smokingHistory: "",
            alcoholHistory: "",
            substanceHistory: "",
            disabilityInformation: "",

            emergencyNotes: "",
            additionalNotes: "",

            status: "ACTIVE",
            lastReviewedDate: ""
        });

        setErrors({});
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (
        <form
            className="medical-history-form"
            onSubmit={handleSubmit}
        >

            {/* =================================================
                PATIENT & DOCTOR
            ================================================= */}

            <section className="medical-history-section">

                <h2>Patient Information</h2>

                <div className="form-grid">

                    {/* Patient */}

                    <div className="form-group">

                        <label htmlFor="patientId">
                            Patient <span>*</span>
                        </label>

                        <select
                            id="patientId"
                            name="patientId"
                            value={formData.patientId}
                            onChange={handleChange}
                            disabled={loading}
                            className={
                                errors.patientId
                                    ? "input-error"
                                    : ""
                            }
                        >

                            <option value="">
                                Select Patient
                            </option>

                            {patients.map((patient) => (

                                <option
                                    key={patient.id}
                                    value={patient.id}
                                >
                                    {patient.patientCode
                                        ? `${patient.patientCode} - `
                                        : ""}
                                    {patient.fullName ||
                                        patient.patientName}
                                </option>

                            ))}

                        </select>

                        {errors.patientId && (
                            <small className="error-message">
                                {errors.patientId}
                            </small>
                        )}

                    </div>


                    {/* Doctor */}

                    <div className="form-group">

                        <label htmlFor="doctorId">
                            Doctor
                        </label>

                        <select
                            id="doctorId"
                            name="doctorId"
                            value={formData.doctorId}
                            onChange={handleChange}
                            disabled={loading}
                        >

                            <option value="">
                                Select Doctor
                            </option>

                            {doctors.map((doctor) => (

                                <option
                                    key={doctor.id}
                                    value={doctor.id}
                                >
                                    {doctor.fullName ||
                                        doctor.doctorName}
                                    {doctor.qualification
                                        ? ` - ${doctor.qualification}`
                                        : ""}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* History Date */}

                    <div className="form-group">

                        <label htmlFor="historyDate">
                            History Date <span>*</span>
                        </label>

                        <input
                            type="date"
                            id="historyDate"
                            name="historyDate"
                            value={formData.historyDate}
                            onChange={handleChange}
                            disabled={loading}
                            className={
                                errors.historyDate
                                    ? "input-error"
                                    : ""
                            }
                        />

                        {errors.historyDate && (
                            <small className="error-message">
                                {errors.historyDate}
                            </small>
                        )}

                    </div>


                    {/* Last Reviewed */}

                    <div className="form-group">

                        <label htmlFor="lastReviewedDate">
                            Last Reviewed Date
                        </label>

                        <input
                            type="date"
                            id="lastReviewedDate"
                            name="lastReviewedDate"
                            value={formData.lastReviewedDate}
                            onChange={handleChange}
                            disabled={loading}
                        />

                    </div>

                </div>

            </section>


            {/* =================================================
                MEDICAL HISTORY
            ================================================= */}

            <section className="medical-history-section">

                <h2>Medical History</h2>

                <div className="form-grid">

                    <div className="form-group full-width">

                        <label htmlFor="allergies">
                            Allergies
                        </label>

                        <textarea
                            id="allergies"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            placeholder="Enter known allergies..."
                            disabled={loading}
                        />

                    </div>


                    <div className="form-group full-width">

                        <label htmlFor="chronicDiseases">
                            Chronic Diseases
                        </label>

                        <textarea
                            id="chronicDiseases"
                            name="chronicDiseases"
                            value={formData.chronicDiseases}
                            onChange={handleChange}
                            placeholder="Enter chronic diseases..."
                            disabled={loading}
                        />

                    </div>


                    <div className="form-group full-width">

                        <label htmlFor="familyHistory">
                            Family History
                        </label>

                        <textarea
                            id="familyHistory"
                            name="familyHistory"
                            value={formData.familyHistory}
                            onChange={handleChange}
                            placeholder="Enter relevant family medical history..."
                            disabled={loading}
                        />

                    </div>


                    <div className="form-group full-width">

                        <label htmlFor="majorIllnesses">
                            Major Illnesses
                        </label>

                        <textarea
                            id="majorIllnesses"
                            name="majorIllnesses"
                            value={formData.majorIllnesses}
                            onChange={handleChange}
                            placeholder="Enter previous major illnesses..."
                            disabled={loading}
                        />

                    </div>

                </div>

            </section>


            {/* =================================================
                MEDICATIONS
            ================================================= */}

            <section className="medical-history-section">

                <h2>Medication History</h2>

                <div className="form-grid">

                    <div className="form-group full-width">

                        <label htmlFor="previousMedications">
                            Previous Medications
                        </label>

                        <textarea
                            id="previousMedications"
                            name="previousMedications"
                            value={formData.previousMedications}
                            onChange={handleChange}
                            placeholder="Enter previous medications..."
                            disabled={loading}
                        />

                    </div>


                    <div className="form-group full-width">

                        <label htmlFor="currentMedications">
                            Current Medications
                        </label>

                        <textarea
                            id="currentMedications"
                            name="currentMedications"
                            value={formData.currentMedications}
                            onChange={handleChange}
                            placeholder="Enter current medications..."
                            disabled={loading}
                        />

                    </div>

                </div>

            </section>


            {/* =================================================
                SURGICAL & HOSPITALIZATION HISTORY
            ================================================= */}

            <section className="medical-history-section">

                <h2>Surgical & Hospitalization History</h2>

                <div className="form-grid">

                    <div className="form-group full-width">

                        <label htmlFor="previousSurgeries">
                            Previous Surgeries
                        </label>

                        <textarea
                            id="previousSurgeries"
                            name="previousSurgeries"
                            value={formData.previousSurgeries}
                            onChange={handleChange}
                            placeholder="Enter previous surgeries..."
                            disabled={loading}
                        />

                    </div>


                    <div className="form-group full-width">

                        <label htmlFor="previousHospitalizations">
                            Previous Hospitalizations
                        </label>

                        <textarea
                            id="previousHospitalizations"
                            name="previousHospitalizations"
                            value={formData.previousHospitalizations}
                            onChange={handleChange}
                            placeholder="Enter previous hospitalizations..."
                            disabled={loading}
                        />

                    </div>


                    <div className="form-group full-width">

                        <label htmlFor="immunizationHistory">
                            Immunization History
                        </label>

                        <textarea
                            id="immunizationHistory"
                            name="immunizationHistory"
                            value={formData.immunizationHistory}
                            onChange={handleChange}
                            placeholder="Enter vaccination / immunization history..."
                            disabled={loading}
                        />

                    </div>

                </div>

            </section>


            {/* =================================================
                CURRENT DIAGNOSIS & TREATMENT
            ================================================= */}

            <section className="medical-history-section">

                <h2>Diagnosis & Treatment</h2>

                <div className="form-grid">

                    <div className="form-group full-width">

                        <label htmlFor="diagnosis">
                            Diagnosis
                        </label>

                        <textarea
                            id="diagnosis"
                            name="diagnosis"
                            value={formData.diagnosis}
                            onChange={handleChange}
                            placeholder="Enter diagnosis..."
                            disabled={loading}
                        />

                    </div>


                    <div className="form-group full-width">

                        <label htmlFor="treatmentGiven">
                            Treatment Given
                        </label>

                        <textarea
                            id="treatmentGiven"
                            name="treatmentGiven"
                            value={formData.treatmentGiven}
                            onChange={handleChange}
                            placeholder="Enter treatment given..."
                            disabled={loading}
                        />

                    </div>


                    <div className="form-group full-width">

                        <label htmlFor="proceduresPerformed">
                            Procedures Performed
                        </label>

                        <textarea
                            id="proceduresPerformed"
                            name="proceduresPerformed"
                            value={formData.proceduresPerformed}
                            onChange={handleChange}
                            placeholder="Enter procedures performed..."
                            disabled={loading}
                        />

                    </div>

                </div>

            </section>


            {/* =================================================
                LIFESTYLE & RISK INFORMATION
            ================================================= */}

            <section className="medical-history-section">

                <h2>Lifestyle & Risk Information</h2>

                <div className="form-grid">

                    {/* Blood Group */}

                    <div className="form-group">

                        <label htmlFor="bloodGroup">
                            Blood Group
                        </label>

                        <select
                            id="bloodGroup"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handleChange}
                            disabled={loading}
                        >

                            <option value="">
                                Select Blood Group
                            </option>

                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>

                        </select>

                    </div>


                    {/* Smoking */}

                    <div className="form-group">

                        <label htmlFor="smokingHistory">
                            Smoking History
                        </label>

                        <select
                            id="smokingHistory"
                            name="smokingHistory"
                            value={formData.smokingHistory}
                            onChange={handleChange}
                            disabled={loading}
                        >

                            <option value="">
                                Select
                            </option>

                            <option value="Never">
                                Never
                            </option>

                            <option value="Former">
                                Former Smoker
                            </option>

                            <option value="Current">
                                Current Smoker
                            </option>

                        </select>

                    </div>


                    {/* Alcohol */}

                    <div className="form-group">

                        <label htmlFor="alcoholHistory">
                            Alcohol History
                        </label>

                        <select
                            id="alcoholHistory"
                            name="alcoholHistory"
                            value={formData.alcoholHistory}
                            onChange={handleChange}
                            disabled={loading}
                        >

                            <option value="">
                                Select
                            </option>

                            <option value="Never">
                                Never
                            </option>

                            <option value="Former">
                                Former
                            </option>

                            <option value="Occasional">
                                Occasional
                            </option>

                            <option value="Regular">
                                Regular
                            </option>

                        </select>

                    </div>


                    {/* Substance */}

                    <div className="form-group">

                        <label htmlFor="substanceHistory">
                            Substance History
                        </label>

                        <input
                            type="text"
                            id="substanceHistory"
                            name="substanceHistory"
                            value={formData.substanceHistory}
                            onChange={handleChange}
                            placeholder="Enter substance history..."
                            disabled={loading}
                        />

                    </div>


                    {/* Disability */}

                    <div className="form-group full-width">

                        <label htmlFor="disabilityInformation">
                            Disability Information
                        </label>

                        <textarea
                            id="disabilityInformation"
                            name="disabilityInformation"
                            value={formData.disabilityInformation}
                            onChange={handleChange}
                            placeholder="Enter disability information..."
                            disabled={loading}
                        />

                    </div>

                </div>

            </section>


            {/* =================================================
                NOTES
            ================================================= */}

            <section className="medical-history-section">

                <h2>Additional Information</h2>

                <div className="form-grid">

                    <div className="form-group full-width">

                        <label htmlFor="emergencyNotes">
                            Emergency Notes
                        </label>

                        <textarea
                            id="emergencyNotes"
                            name="emergencyNotes"
                            value={formData.emergencyNotes}
                            onChange={handleChange}
                            placeholder="Enter important emergency information..."
                            disabled={loading}
                        />

                    </div>


                    <div className="form-group full-width">

                        <label htmlFor="additionalNotes">
                            Additional Notes
                        </label>

                        <textarea
                            id="additionalNotes"
                            name="additionalNotes"
                            value={formData.additionalNotes}
                            onChange={handleChange}
                            placeholder="Enter additional medical notes..."
                            disabled={loading}
                        />

                    </div>

                </div>

            </section>


            {/* =================================================
                STATUS
            ================================================= */}

            <section className="medical-history-section">

                <h2>Record Status</h2>

                <div className="form-grid">

                    <div className="form-group">

                        <label htmlFor="status">
                            Status
                        </label>

                        <select
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            disabled={loading}
                        >

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

                </div>

            </section>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="medical-history-form-actions">

                <button
                    type="button"
                    className="secondary-button"
                    onClick={
                        onCancel
                            ? onCancel
                            : handleReset
                    }
                    disabled={loading}
                >
                    Cancel
                </button>


                {!isEdit && (
                    <button
                        type="button"
                        className="reset-button"
                        onClick={handleReset}
                        disabled={loading}
                    >
                        Reset
                    </button>
                )}


                <button
                    type="submit"
                    className="primary-button"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : isEdit
                            ? "Update Medical History"
                            : "Save Medical History"}
                </button>

            </div>

        </form>
    );
};

export default MedicalHistoryForm;
