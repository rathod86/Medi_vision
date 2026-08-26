import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getDoctorById } from "../../../services/doctorService";

import "./ViewDoctor.css";

const ViewDoctor = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ======================================
  // Load Doctor
  // ======================================

  useEffect(() => {

    loadDoctor();

  }, []);

  const loadDoctor = async () => {

    try {

      const data = await getDoctorById(id);

      setDoctor(data);

    } catch (err) {

      console.error(err);

      setError("Failed to load doctor.");

    } finally {

      setLoading(false);

    }

  };

  // ======================================
  // Loading
  // ======================================

  if (loading) {

    return (
      <div className="view-loading">
        Loading Doctor...
      </div>
    );

  }

  // ======================================
  // Error
  // ======================================

  if (error) {

    return (
      <div className="view-error">
        {error}
      </div>
    );

  }

  // ======================================
  // Default Image
  // ======================================

  const defaultImage =
    "https://cdn-icons-png.flaticon.com/512/387/387561.png";

  const imageUrl =
    doctor.profileImage &&
    doctor.profileImage.trim() !== ""
      ? `http://localhost:8080/uploads/${doctor.profileImage}`
      : defaultImage;

  // ======================================
  // UI
  // ======================================

  return (

    <div className="view-doctor-page">

      <div className="view-header">

        <h2>Doctor Details</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/doctors")}
        >
          Back
        </button>

      </div>

      <div className="doctor-card">

        <div className="doctor-image">

          <img
            src={imageUrl}
            alt={doctor.fullName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />

        </div>

        <div className="doctor-details">

          <div className="detail-row">
            <span>Doctor Code</span>
            <p>{doctor.doctorCode}</p>
          </div>

          <div className="detail-row">
            <span>Name</span>
            <p>{doctor.fullName}</p>
          </div>

          <div className="detail-row">
            <span>Email</span>
            <p>{doctor.email}</p>
          </div>

          <div className="detail-row">
            <span>Phone</span>
            <p>{doctor.phone}</p>
          </div>

          <div className="detail-row">
            <span>Gender</span>
            <p>{doctor.gender}</p>
          </div>

          <div className="detail-row">
            <span>Date of Birth</span>
            <p>{doctor.dateOfBirth}</p>
          </div>

          <div className="detail-row">
            <span>Department</span>
            <p>{doctor.department}</p>
          </div>

          <div className="detail-row">
            <span>Specialization</span>
            <p>{doctor.specialization}</p>
          </div>

          <div className="detail-row">
            <span>Qualification</span>
            <p>{doctor.qualification}</p>
          </div>

          <div className="detail-row">
            <span>Experience</span>
            <p>{doctor.experience} Years</p>
          </div>

          <div className="detail-row">
            <span>Consultation Fee</span>
            <p>₹ {doctor.consultationFee}</p>
          </div>

          <div className="detail-row">
            <span>License Number</span>
            <p>{doctor.licenseNumber}</p>
          </div>

          <div className="detail-row">
            <span>Joining Date</span>
            <p>{doctor.joiningDate}</p>
          </div>

          <div className="detail-row">
            <span>Status</span>
            <p>{doctor.status}</p>
          </div>

          <div className="detail-row">
            <span>Address</span>
            <p>{doctor.address || "-"}</p>
          </div>

        </div>

      </div>

    </div>

  );

};

export default ViewDoctor;