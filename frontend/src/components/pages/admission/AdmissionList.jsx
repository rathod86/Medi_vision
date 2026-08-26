import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import useAdmissions from "../../../hooks/useAdmissions";

import AdmissionStats from "../../admission/AdmissionStats";
import AdmissionSearch from "../../admission/AdmissionSearch";
import AdmissionFilter from "../../admission/AdmissionFilter";
import AdmissionTable from "../../admission/AdmissionTable";
import AdmissionPagination from "../../admission/AdmissionPagination";

import "./AdmissionList.css";

const AdmissionList = () => {

    const navigate = useNavigate();

    const {

        admissions,

        loading,

        error,

        removeAdmission

    } = useAdmissions();

    // ==========================================
    // Search & Filter State
    // ==========================================

    const [search, setSearch] = useState("");

    const [department, setDepartment] = useState("");

    const [status, setStatus] = useState("");

    const [ward, setWard] = useState("");

    // ==========================================
    // Pagination
    // ==========================================

    const [currentPage, setCurrentPage] = useState(1);

    const recordsPerPage = 10;

        // ==========================================
    // Filter Admissions
    // ==========================================

    const filteredAdmissions = useMemo(() => {

        return admissions.filter((admission) => {

            const matchesSearch =

                admission.admissionNumber
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                admission.patientName
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                admission.doctorName
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesDepartment =

                department === ""

                ||

                admission.department === department;

            const matchesStatus =

                status === ""

                ||

                admission.status === status;

            const matchesWard =

                ward === ""

                ||

                admission.ward === ward;

            return (

                matchesSearch

                &&

                matchesDepartment

                &&

                matchesStatus

                &&

                matchesWard

            );

        });

    }, [

        admissions,

        search,

        department,

        status,

        ward

    ]);

    // ==========================================
    // Pagination Logic
    // ==========================================

    const totalPages = Math.ceil(

        filteredAdmissions.length /

        recordsPerPage

    );

    const indexOfLastRecord =

        currentPage * recordsPerPage;

    const indexOfFirstRecord =

        indexOfLastRecord - recordsPerPage;

    const currentAdmissions =

        filteredAdmissions.slice(

            indexOfFirstRecord,

            indexOfLastRecord

        );

    // ==========================================
    // Delete
    // ==========================================

    const handleDelete = async (id) => {

        try {

            await removeAdmission(id);

        } catch (error) {

            console.error(error);

            alert("Unable to delete admission.");

        }

    };

    // ==========================================
    // Edit
    // ==========================================

    const handleEdit = (id) => {

        navigate(`/admissions/edit/${id}`);

    };

        return (

        <div className="admission-list-page">

            {/* ==========================================
                Header
            ========================================== */}

            <div className="admission-header">

                <div>

                    <h2>Admissions</h2>

                    <p>
                        Manage all hospital admissions.
                    </p>

                </div>

                <button

                    className="add-admission-btn"

                    onClick={() =>
                        navigate("/admissions/add")
                    }

                >

                    <FaPlus />

                    &nbsp;Add Admission

                </button>

            </div>

            {/* ==========================================
                Statistics
            ========================================== */}

            <AdmissionStats

                admissions={filteredAdmissions}

            />

            {/* ==========================================
                Search
            ========================================== */}

            <AdmissionSearch

                search={search}

                setSearch={setSearch}

            />

            {/* ==========================================
                Filter
            ========================================== */}

            <AdmissionFilter

                department={department}

                setDepartment={setDepartment}

                ward={ward}

                setWard={setWard}

                status={status}

                setStatus={setStatus}

            />

            {/* ==========================================
                Loading
            ========================================== */}

            {loading && (

                <div className="loading-container">

                    <h3>

                        Loading Admissions...

                    </h3>

                </div>

            )}

            {/* ==========================================
                Error
            ========================================== */}

            {error && (

                <div className="error-container">

                    <h3>

                        {error}

                    </h3>

                </div>

            )}

            {/* ==========================================
                Table
            ========================================== */}

            {!loading && !error && (

                <>

                    <AdmissionTable

                        admissions={currentAdmissions}

                        onDelete={handleDelete}

                        onEdit={handleEdit}

                    />

                    {/* ==========================================
                        Pagination
                    ========================================== */}

                    <AdmissionPagination

                        currentPage={currentPage}

                        totalPages={totalPages}

                        onPageChange={setCurrentPage}

                    />

                </>

            )}

        </div>

    );

};

export default AdmissionList;