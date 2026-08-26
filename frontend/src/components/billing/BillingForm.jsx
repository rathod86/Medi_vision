import React from "react";
import "./BillingForm.css";

const BillingForm = ({
  billing,
  errors,
  patients,
  doctors,
  admissions,
  loading,
  handleChange,
  handleSubmit,
  navigate,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grid">
        {/* ===========================
                    Bill Number
                =========================== */}

        <div className="form-group">
          <label>Bill Number *</label>

          <input
            type="text"
            name="billNumber"
            placeholder="Enter Bill Number"
            value={billing.billNumber}
            onChange={handleChange}
          />

          {errors.billNumber && (
            <small className="error">{errors.billNumber}</small>
          )}
        </div>

        {/* ===========================
                    Patient
                =========================== */}

        <div className="form-group">
          <label>Patient *</label>

          <select
            name="patientId"
            value={billing.patientId}
            onChange={handleChange}
          >
            <option value="">Select Patient</option>

            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.fullName}
              </option>
            ))}
          </select>

          {errors.patientId && (
            <small className="error">{errors.patientId}</small>
          )}
        </div>

        {/* ===========================
                    Doctor
                =========================== */}

        <div className="form-group">
          <label>Doctor *</label>

          <select
            name="doctorId"
            value={billing.doctorId}
            onChange={handleChange}
          >
            <option value="">Select Doctor</option>

            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.fullName}
              </option>
            ))}
          </select>

          {errors.doctorId && (
            <small className="error">{errors.doctorId}</small>
          )}
        </div>

        {/* ===========================
                    Admission
                =========================== */}

        <div className="form-group">
          <label>Admission</label>

          <select
            name="admissionId"
            value={billing.admissionId}
            onChange={handleChange}
          >
            <option value="">Select Admission</option>

            {admissions.map((admission) => (
              <option key={admission.id} value={admission.id}>
                Admission #{admission.id}
              </option>
            ))}
          </select>
        </div>

        {/* ===========================
                    Consultation Charges
                =========================== */}

        <div className="form-group">
          <label>Consultation Charges</label>

          <input
            type="number"
            name="consultationCharges"
            value={billing.consultationCharges}
            onChange={handleChange}
          />
        </div>

        {/* ===========================
                    Room Charges
                =========================== */}

        <div className="form-group">
          <label>Room Charges</label>

          <input
            type="number"
            name="roomCharges"
            value={billing.roomCharges}
            onChange={handleChange}
          />
        </div>

        {/* ===========================
                    Medicine Charges
                =========================== */}

        <div className="form-group">
          <label>Medicine Charges</label>

          <input
            type="number"
            name="medicineCharges"
            value={billing.medicineCharges}
            onChange={handleChange}
          />
        </div>

        {/* ===========================
                    Lab Charges
                =========================== */}

        <div className="form-group">
          <label>Lab Charges</label>

          <input
            type="number"
            name="labCharges"
            value={billing.labCharges}
            onChange={handleChange}
          />
        </div>
        {/* ===========================
                    Surgery Charges
                =========================== */}

        <div className="form-group">
          <label>Surgery Charges</label>

          <input
            type="number"
            name="surgeryCharges"
            value={billing.surgeryCharges}
            onChange={handleChange}
          />
        </div>

        {/* ===========================
                    ICU Charges
                =========================== */}

        <div className="form-group">
          <label>ICU Charges</label>

          <input
            type="number"
            name="icuCharges"
            value={billing.icuCharges}
            onChange={handleChange}
          />
        </div>

        {/* ===========================
                    Other Charges
                =========================== */}

        <div className="form-group">
          <label>Other Charges</label>

          <input
            type="number"
            name="otherCharges"
            value={billing.otherCharges}
            onChange={handleChange}
          />
        </div>

        {/* ===========================
                    Discount
                =========================== */}

        <div className="form-group">
          <label>Discount</label>

          <input
            type="number"
            name="discount"
            value={billing.discount}
            onChange={handleChange}
          />
        </div>

        {/* ===========================
                    Tax
                =========================== */}

        <div className="form-group">
          <label>Tax</label>

          <input
            type="number"
            name="tax"
            value={billing.tax}
            onChange={handleChange}
          />
        </div>

        {/* ===========================
                    Paid Amount
                =========================== */}

        <div className="form-group">
          <label>Paid Amount</label>

          <input
            type="number"
            name="paidAmount"
            value={billing.paidAmount}
            onChange={handleChange}
          />
        </div>

        {/* ===========================
                    Payment Status
                =========================== */}

        <div className="form-group">
          <label>Payment Status *</label>

          <select
            name="paymentStatus"
            value={billing.paymentStatus}
            onChange={handleChange}
          >
            <option value="PENDING">Pending</option>
            <option value="PAID">Paid</option>
            <option value="PARTIALLY_PAID">Partially Paid</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* ===========================
                    Payment Method
                =========================== */}

        <div className="form-group">
          <label>Payment Method *</label>

          <select
            name="paymentMethod"
            value={billing.paymentMethod}
            onChange={handleChange}
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="UPI">UPI</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Insurance">Insurance</option>
          </select>

          {errors.paymentMethod && (
            <small className="error">{errors.paymentMethod}</small>
          )}
        </div>

        {/* ===========================
                    Billing Date
                =========================== */}

        <div className="form-group">
          <label>Billing Date *</label>

          <input
            type="date"
            name="billingDate"
            value={billing.billingDate}
            onChange={handleChange}
          />

          {errors.billingDate && (
            <small className="error">{errors.billingDate}</small>
          )}
        </div>

        {/* ===========================
                    Due Date
                =========================== */}

        <div className="form-group">
          <label>Due Date</label>

          <input
            type="date"
            name="dueDate"
            value={billing.dueDate}
            onChange={handleChange}
          />
        </div>

        {/* ===========================
                    Notes
                =========================== */}

        <div className="form-group full-width">
          <label>Notes</label>

          <textarea
            name="notes"
            rows="4"
            placeholder="Enter Notes"
            value={billing.notes}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* ===========================
                Buttons
            =========================== */}

      <div className="button-group">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save Billing"}
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/billing")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default BillingForm;
