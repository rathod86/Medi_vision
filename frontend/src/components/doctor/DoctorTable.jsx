import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaUserMd,
} from "react-icons/fa";

import "./DoctorTable.css";

const DoctorTable = ({
  doctors = [],
  onDelete,
  onEdit,
}) => {

  const navigate = useNavigate();

  // ==========================================
  // Delete Doctor
  // ==========================================

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );

    if (!confirmDelete) return;

    onDelete(id);

  };

  return (

    <div className="doctor-table-container">

      <table className="doctor-table">

        <thead>

          <tr>

            <th>Photo</th>

            <th>Doctor Code</th>

            <th>Name</th>

            <th>Department</th>

            <th>Specialization</th>

            <th>Experience</th>

            <th>Phone</th>

            <th>Email</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {doctors.length > 0 ? (

            doctors.map((doctor) => (

              <tr key={doctor.id}>

                {/* Doctor Photo */}

               <td>

  <img
    src={
      doctor.profileImage && doctor.profileImage.trim() !== ""
        ? `http://localhost:8080/uploads/${doctor.profileImage}`
        : "https://cdn-icons-png.flaticon.com/512/387/387561.png"
    }
    alt={doctor.fullName}
    className="doctor-photo"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src =
        "https://cdn-icons-png.flaticon.com/512/387/387561.png";
    }}
  />

</td>

                {/* Doctor Code */}

                <td>{doctor.doctorCode}</td>

                {/* Doctor Name */}

                <td>{doctor.fullName}</td>

                {/* Department */}

                <td>{doctor.department}</td>

                {/* Specialization */}

                <td>{doctor.specialization}</td>

                {/* Experience */}

                <td>{doctor.experience} Years</td>

                {/* Phone */}

                <td>{doctor.phone}</td>

                {/* Email */}

                <td>{doctor.email}</td>

                {/* Status */}

                <td>

                  <span
                    className={`status ${doctor.status?.toLowerCase().replace(/\s/g, "-")}`}
                  >

                    {doctor.status}

                  </span>

                </td>

                {/* Action Buttons */}

                <td>

                  <div className="action-buttons">

                    {/* View */}

                    <button
                      className="view-btn"
                      title="View Doctor"
                      onClick={() =>
                        navigate(`/doctors/view/${doctor.id}`)
                      }
                    >
                      <FaEye />
                    </button>

                    {/* Edit */}

                    <button
                      className="edit-btn"
                      title="Edit Doctor"
                      onClick={() => onEdit(doctor.id)}
                    >
                      <FaEdit />
                    </button>

                    {/* Delete */}

                    <button
                      className="delete-btn"
                      title="Delete Doctor"
                      onClick={() => handleDelete(doctor.id)}
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan="10"
                className="no-data"
              >

                No Doctors Found

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};

export default DoctorTable;