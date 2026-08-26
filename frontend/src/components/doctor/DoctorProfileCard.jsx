import {
  FaUserMd,
  FaEnvelope,
  FaPhone,
  FaHospital,
  FaStethoscope,
  FaGraduationCap,
  FaCalendarAlt,
  FaIdBadge,
} from "react-icons/fa";

import "./DoctorProfileCard.css";

const DoctorProfileCard = () => {

  // Temporary Dummy Data
  const doctor = {

    doctorId: "DOC001",

    name: "Dr. Rajesh Kumar",

    email: "rajesh@gmail.com",

    phone: "9876543210",

    department: "Cardiology",

    specialization: "Cardiologist",

    qualification: "MBBS, MD",

    experience: "12 Years",

    joiningDate: "15 Jun 2018",

    status: "Available",

    photo: null,

  };

  return (

    <div className="doctor-profile-card">

      <div className="profile-header">

        <div className="profile-avatar">

          {doctor.photo ? (

            <img
              src={doctor.photo}
              alt={doctor.name}
            />

          ) : (

            <FaUserMd />

          )}

        </div>

        <div>

          <h2>{doctor.name}</h2>

          <p>{doctor.specialization}</p>

          <span className="profile-status">

            {doctor.status}

          </span>

        </div>

      </div>

      <div className="profile-grid">

        <div className="profile-item">
          <FaIdBadge />
          <span>{doctor.doctorId}</span>
        </div>

        <div className="profile-item">
          <FaEnvelope />
          <span>{doctor.email}</span>
        </div>

        <div className="profile-item">
          <FaPhone />
          <span>{doctor.phone}</span>
        </div>

        <div className="profile-item">
          <FaHospital />
          <span>{doctor.department}</span>
        </div>

        <div className="profile-item">
          <FaStethoscope />
          <span>{doctor.specialization}</span>
        </div>

        <div className="profile-item">
          <FaGraduationCap />
          <span>{doctor.qualification}</span>
        </div>

        <div className="profile-item">
          <FaCalendarAlt />
          <span>{doctor.experience}</span>
        </div>

        <div className="profile-item">
          <FaCalendarAlt />
          <span>{doctor.joiningDate}</span>
        </div>

      </div>

    </div>

  );

};

export default DoctorProfileCard;