import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import DoctorStats from "../../doctor/DoctorStats";
import DoctorSearch from "../../doctor/DoctorSearch";
import DoctorFilter from "../../doctor/DoctorFilter";
import DoctorTable from "../../doctor/DoctorTable";
import DoctorPagination from "../../doctor/DoctorPagination";

import useDoctors from "../../../hooks/useDoctors";

import "./DoctorList.css";

const DoctorList = () => {

  const navigate = useNavigate();

  // ==========================================
  // Search
  // ==========================================

  const [search, setSearch] = useState("");

  // ==========================================
  // Filters
  // ==========================================

  const [department, setDepartment] = useState("");

  const [status, setStatus] = useState("");

  // ==========================================
  // Pagination
  // ==========================================

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  // ==========================================
  // Load Doctors
  // ==========================================

  const {
    doctors,
    loading,
    error,
    removeDoctor,
  } = useDoctors();

  // ==========================================
  // Edit Doctor
  // ==========================================

  const handleEdit = (id) => {
    navigate(`/doctors/edit/${id}`);
  };

  // ==========================================
  // Search + Filter
  // ==========================================

  const filteredDoctors = doctors.filter((doctor) => {

    const keyword = search.toLowerCase();

    const matchesSearch =

      doctor.doctorCode?.toLowerCase().includes(keyword) ||

      doctor.fullName?.toLowerCase().includes(keyword) ||

      doctor.email?.toLowerCase().includes(keyword) ||

      doctor.phone?.toLowerCase().includes(keyword) ||

      doctor.department?.toLowerCase().includes(keyword) ||

      doctor.specialization?.toLowerCase().includes(keyword) ||

      doctor.status?.toLowerCase().includes(keyword);

    const matchesDepartment =
      department === "" ||
      doctor.department === department;

    const matchesStatus =
      status === "" ||
      doctor.status === status;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesStatus
    );

  });

  // ==========================================
  // Pagination
  // ==========================================

  const totalRecords = filteredDoctors.length;

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const indexOfLastDoctor =
    currentPage * rowsPerPage;

  const indexOfFirstDoctor =
    indexOfLastDoctor - rowsPerPage;

  const currentDoctors =
    filteredDoctors.slice(
      indexOfFirstDoctor,
      indexOfLastDoctor
    );

  return (

    <div className="doctor-list-page">

      {/* Header */}

      <div className="doctor-header">

        <div>

          <h2>Doctors</h2>

          <p>Manage all hospital doctors.</p>

        </div>

        <button
          className="add-doctor-btn"
          onClick={() => navigate("/doctors/add")}
        >
          <FaPlus />
          &nbsp;Add Doctor
        </button>

      </div>

      {/* Statistics */}

      <DoctorStats />

      {/* Search */}

      <DoctorSearch
        search={search}
        setSearch={setSearch}
      />

      {/* Filter */}

      <DoctorFilter
        department={department}
        setDepartment={setDepartment}
        status={status}
        setStatus={setStatus}
      />

      {/* Loading */}

      {loading && (

        <div className="loading-container">

          <h3>Loading Doctors...</h3>

        </div>

      )}

      {/* Error */}

      {error && (

        <div className="error-container">

          <h3>{error}</h3>

        </div>

      )}

      {/* Table */}

      {!loading && !error && (

        <DoctorTable
          doctors={currentDoctors}
          onDelete={removeDoctor}
          onEdit={handleEdit}
        />

      )}

      {/* Pagination */}

      <DoctorPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalRecords={totalRecords}
        totalPages={totalPages}
      />

    </div>

  );

};

export default DoctorList;