import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import PatientStats from "../../patient/PatientStats";
import PatientSearch from "../../patient/PatientSearch";
import PatientFilter from "../../patient/PatientFilter";
import PatientTable from "../../patient/PatientTable";
import PatientPagination from "../../patient/PatientPagination";

import usePatients from "../../../hooks/usePatients";

import "./PatientList.css";

const PatientList = () => {

  const navigate = useNavigate();

  // ==========================================
  // Search & Filter States
  // ==========================================

  const [search, setSearch] = useState("");

  const [gender, setGender] = useState("");

  const [status, setStatus] = useState("");

  // ==========================================
  // Pagination States
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ==========================================
  // Fetch Patients
  // ==========================================

  const {
    patients,
    loading,
    error,
    removePatient,
  } = usePatients();

  // ==========================================
  // Edit Patient
  // ==========================================

  const handleEdit = (id) => {
    navigate(`/patients/edit/${id}`);
  };

  // ==========================================
  // Search + Filter
  // ==========================================

  const filteredPatients = patients.filter((patient) => {

    const keyword = search.toLowerCase();

    const matchesSearch =

      patient.patientCode?.toLowerCase().includes(keyword) ||

      patient.fullName?.toLowerCase().includes(keyword) ||

      patient.email?.toLowerCase().includes(keyword) ||

      patient.phone?.toLowerCase().includes(keyword) ||

      patient.gender?.toLowerCase().includes(keyword) ||

      patient.bloodGroup?.toLowerCase().includes(keyword);

    const matchesGender =

      gender === "" ||

      patient.gender === gender;

    const matchesStatus =

      status === "" ||

      patient.status === status;

    return (

      matchesSearch &&

      matchesGender &&

      matchesStatus

    );

  });

  // ==========================================
  // Pagination Logic
  // ==========================================

  const indexOfLastPatient = currentPage * rowsPerPage;

  const indexOfFirstPatient = indexOfLastPatient - rowsPerPage;

  const currentPatients = filteredPatients.slice(
    indexOfFirstPatient,
    indexOfLastPatient
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPatients.length / rowsPerPage)
  );

  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="patient-list-page">

      {/* ======================================
          Header
      ====================================== */}

      <div className="patient-header">

        <div>

          <h2>Patients</h2>

          <p>Manage all hospital patients.</p>

        </div>

        <button
          className="add-patient-btn"
          onClick={() => navigate("/patients/add")}
        >
          <FaPlus />
          &nbsp;Add Patient
        </button>

      </div>

      {/* ======================================
          Dashboard
      ====================================== */}

      <PatientStats />

      {/* ======================================
          Search
      ====================================== */}

      <PatientSearch
        search={search}
        setSearch={setSearch}
      />

      {/* ======================================
          Filter
      ====================================== */}

      <PatientFilter
        gender={gender}
        setGender={setGender}
        status={status}
        setStatus={setStatus}
      />

      {/* ======================================
          Loading
      ====================================== */}

      {loading && (

        <div className="loading-container">

          <h3>Loading Patients...</h3>

        </div>

      )}

      {/* ======================================
          Error
      ====================================== */}

      {error && (

        <div className="error-container">

          <h3>{error}</h3>

        </div>

      )}

      {/* ======================================
          Patient Table
      ====================================== */}

      {!loading && !error && (

        <PatientTable
          patients={currentPatients}
          onDelete={removePatient}
          onEdit={handleEdit}
        />

      )}

      {/* ======================================
          Pagination
      ====================================== */}

      {!loading && !error && (

        <PatientPagination
          currentPage={currentPage}
          totalPages={totalPages}
          rowsPerPage={rowsPerPage}
          totalRecords={filteredPatients.length}
          startRecord={
            filteredPatients.length === 0
              ? 0
              : indexOfFirstPatient + 1
          }
          endRecord={Math.min(
            indexOfLastPatient,
            filteredPatients.length
          )}
          setCurrentPage={setCurrentPage}
          setRowsPerPage={setRowsPerPage}
        />

      )}

    </div>

  );

};

export default PatientList;