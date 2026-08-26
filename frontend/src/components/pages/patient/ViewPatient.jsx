import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getPatientById } from "../../../services/patientService";

import "./ViewPatient.css";

const ViewPatient = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // =====================================
  // Load Patient
  // =====================================

  useEffect(() => {

    loadPatient();

  }, []);

  const loadPatient = async () => {

    try {

      const data = await getPatientById(id);

      setPatient(data);

    } catch (err) {

      console.error(err);

      setError("Failed to load patient.");

    } finally {

      setLoading(false);

    }

  };

  // =====================================
  // Loading
  // =====================================

  if (loading) {

    return (

      <div className="patient-loading">

        Loading Patient...

      </div>

    );

  }

  // =====================================
  // Error
  // =====================================

  if (error) {

    return (

      <div className="patient-error">

        {error}

      </div>

    );

  }

  // =====================================
  // Image
  // =====================================

  const imageUrl =
    patient.profileImage &&
    patient.profileImage.trim() !== ""
      ? `http://localhost:8080/uploads/${patient.profileImage}`
      : "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  // =====================================
  // UI
  // =====================================

  return (

    <div className="view-patient-page">

      <div className="view-header">

        <h2>Patient Details</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/patients")}
        >
          Back
        </button>

      </div>

      <div className="patient-card">

        {/* ===========================
            Left
        ============================ */}

        <div className="patient-image">

          <img
            src={imageUrl}
            alt={patient.fullName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            }}
          />

          <h3>{patient.fullName}</h3>

          <span className={`status ${patient.status?.toLowerCase().replace(/\s/g, "-")}`}>

            {patient.status}

          </span>

        </div>

        {/* ===========================
            Right
        ============================ */}

        <div className="patient-details">

          <div className="detail-row">

            <span>Patient Code</span>

            <p>{patient.patientCode}</p>

          </div>

          <div className="detail-row">

            <span>Email</span>

            <p>{patient.email}</p>

          </div>

          <div className="detail-row">

            <span>Phone</span>

            <p>{patient.phone}</p>

          </div>

          <div className="detail-row">

            <span>Gender</span>

            <p>{patient.gender}</p>

          </div>

          <div className="detail-row">

            <span>Date of Birth</span>

            <p>{patient.dateOfBirth}</p>

          </div>

          <div className="detail-row">

            <span>Blood Group</span>

            <p>{patient.bloodGroup}</p>

          </div>

          <div className="detail-row">

            <span>Marital Status</span>

            <p>{patient.maritalStatus}</p>

          </div>

          <div className="detail-row">

            <span>Occupation</span>

            <p>{patient.occupation}</p>

          </div>

          <div className="detail-row">

            <span>Height</span>

            <p>{patient.height} cm</p>

          </div>

          <div className="detail-row">

            <span>Weight</span>

            <p>{patient.weight} kg</p>

          </div>

          <div className="detail-row">

            <span>Assigned Doctor</span>

            <p>{patient.assignedDoctor}</p>

          </div>

          <div className="detail-row">

            <span>Allergies</span>

            <p>{patient.allergies || "-"}</p>

          </div>

          <div className="detail-row">

            <span>Medical History</span>

            <p>{patient.medicalHistory || "-"}</p>

          </div>

          <div className="detail-row">

            <span>Emergency Contact</span>

            <p>{patient.emergencyContactName}</p>

          </div>

          <div className="detail-row">

            <span>Emergency Phone</span>

            <p>{patient.emergencyContactPhone}</p>

          </div>

          <div className="detail-row">

            <span>Address</span>

            <p>{patient.address}</p>

          </div>

          <div className="detail-row">

            <span>City</span>

            <p>{patient.city}</p>

          </div>

          <div className="detail-row">

            <span>State</span>

            <p>{patient.state}</p>

          </div>

          <div className="detail-row">

            <span>Pincode</span>

            <p>{patient.pincode}</p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ViewPatient;