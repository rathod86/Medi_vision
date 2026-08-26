import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import AppointmentStats from "../../appointment/AppointmentStats";
import AppointmentSearch from "../../appointment/AppointmentSearch";
import AppointmentFilter from "../../appointment/AppointmentFilter";
import AppointmentTable from "../../appointment/AppointmentTable";
import AppointmentPagination from "../../appointment/AppointmentPagination";

import useAppointments from "../../../hooks/useAppointments";

import "./AppointmentList.css";

const AppointmentList = () => {

    const navigate = useNavigate();

    // ==========================================
    // Search
    // ==========================================

    const [search, setSearch] = useState("");

    // ==========================================
    // Filters
    // ==========================================

    const [doctor, setDoctor] = useState("");

    const [status, setStatus] = useState("");

    const [consultationType, setConsultationType] = useState("");

    // ==========================================
    // Pagination
    // ==========================================

    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 10;

    // ==========================================
    // Fetch Appointments
    // ==========================================

    const {

        appointments,

        loading,

        error,

        removeAppointment,

    } = useAppointments();

    // ==========================================
    // Edit
    // ==========================================

    const handleEdit = (id) => {

        navigate(`/appointments/edit/${id}`);

    };

    // ==========================================
    // Search + Filter
    // ==========================================

    const filteredAppointments = appointments.filter((appointment) => {

        const keyword = search.toLowerCase();

        const matchesSearch =

            appointment.appointmentCode?.toLowerCase().includes(keyword)

            ||

            appointment.patientName?.toLowerCase().includes(keyword)

            ||

            appointment.doctorName?.toLowerCase().includes(keyword)

            ||

            appointment.department?.toLowerCase().includes(keyword);

        const matchesDoctor =

            doctor === ""

            ||

            appointment.doctorName === doctor;

        const matchesStatus =

            status === ""

            ||

            appointment.status === status;

        const matchesType =

            consultationType === ""

            ||

            appointment.consultationType === consultationType;

        return (

            matchesSearch &&

            matchesDoctor &&

            matchesStatus &&

            matchesType

        );

    });

    // ==========================================
    // Pagination
    // ==========================================

    const indexOfLastRecord =
        currentPage * recordsPerPage;

    const indexOfFirstRecord =
        indexOfLastRecord - recordsPerPage;

    const currentAppointments =
        filteredAppointments.slice(
            indexOfFirstRecord,
            indexOfLastRecord
        );

    const totalPages =
        Math.ceil(
            filteredAppointments.length /
            recordsPerPage
        );
     
            return (

        <div className="appointment-list-page">

            {/* ==========================================
                Header
            ========================================== */}

            <div className="appointment-header">

                <div>

                    <h2>Appointments</h2>

                    <p>
                        Manage all hospital appointments.
                    </p>

                </div>

                <button
                    className="add-appointment-btn"
                    onClick={() =>
                        navigate("/appointments/add")
                    }
                >
                    <FaPlus />

                    &nbsp;Add Appointment

                </button>

            </div>

            {/* ==========================================
                Dashboard
            ========================================== */}

            <AppointmentStats
                appointments={appointments}
            />

            {/* ==========================================
                Search
            ========================================== */}

            <AppointmentSearch

                search={search}

                setSearch={setSearch}

            />

            {/* ==========================================
                Filter
            ========================================== */}

            <AppointmentFilter

                doctor={doctor}

                setDoctor={setDoctor}

                status={status}

                setStatus={setStatus}

                consultationType={consultationType}

                setConsultationType={
                    setConsultationType
                }

            />

            {/* ==========================================
                Loading
            ========================================== */}

            {loading && (

                <div className="loading-container">

                    <h3>Loading Appointments...</h3>

                </div>

            )}

            {/* ==========================================
                Error
            ========================================== */}

            {error && (

                <div className="error-container">

                    <h3>{error}</h3>

                </div>

            )}

            {/* ==========================================
                Table
            ========================================== */}

            {!loading && !error && (

                <AppointmentTable

                    appointments={currentAppointments}

                    onDelete={removeAppointment}

                    onEdit={handleEdit}

                />

            )}

            {/* ==========================================
                Pagination
            ========================================== */}

            {!loading && !error && (

                <AppointmentPagination

                    currentPage={currentPage}

                    totalPages={totalPages}

                    onPageChange={setCurrentPage}

                />

            )}

        </div>

    );

};

export default AppointmentList;