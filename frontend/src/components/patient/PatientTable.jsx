import { useNavigate } from "react-router-dom";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaUserInjured,
} from "react-icons/fa";

import "./PatientTable.css";

const PatientTable = ({
  patients = [],
  onDelete,
  onEdit,
}) => {

  const navigate = useNavigate();

  // ==========================================
  // Delete Patient
  // ==========================================

  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient?"
    );

    if (!confirmDelete) return;

    onDelete(id);

  };

  return (

    <div className="patient-table-container">

      <table className="patient-table">

        <thead>

          <tr>

            <th>Photo</th>

            <th>Patient Code</th>

            <th>Name</th>

            <th>Gender</th>

            <th>Blood Group</th>

            <th>Phone</th>

            <th>Email</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {patients.length > 0 ? (

            patients.map((patient) => (

              <tr key={patient.id}>

                {/* Photo */}

                <td>

                  {patient.profileImage ? (

                    <img
                      src={`http://localhost:8080/uploads/${patient.profileImage}`}
                      alt={patient.fullName}
                      className="patient-photo"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://cdn-icons-png.flaticon.com/512/387/387561.png";
                      }}
                    />

                  ) : (

                    <div className="patient-avatar">

                      <FaUserInjured />

                    </div>

                  )}

                </td>

                {/* Patient Code */}

                <td>{patient.patientCode}</td>

                {/* Name */}

                <td>{patient.fullName}</td>

                {/* Gender */}

                <td>{patient.gender}</td>

                {/* Blood Group */}

                <td>{patient.bloodGroup}</td>

                {/* Phone */}

                <td>{patient.phone}</td>

                {/* Email */}

                <td>{patient.email}</td>

                {/* Status */}

                <td>

                  <span
                    className={`status ${patient.status
                      ?.toLowerCase()
                      .replace(/\s/g, "-")}`}
                  >
                    {patient.status}
                  </span>

                </td>

                {/* Actions */}

                <td>

                  <div className="action-buttons">

                    <button
                      className="view-btn"
                      title="View Patient"
                      onClick={() =>
                        navigate(`/patients/view/${patient.id}`)
                      }
                    >
                      <FaEye />
                    </button>

                    <button
                      className="edit-btn"
                      title="Edit Patient"
                      onClick={() => onEdit(patient.id)}
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="delete-btn"
                      title="Delete Patient"
                      onClick={() => handleDelete(patient.id)}
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
                colSpan="9"
                className="no-data"
              >
                No Patients Found
              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  );

};

export default PatientTable;