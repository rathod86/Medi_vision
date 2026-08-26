import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getAllMedicines,
    deleteMedicine,
    searchMedicine,
} from "../../../services/medicineService";

import { toArray } from "../../../utils/apiHelpers";

import MedicineStats from "../../medicine/MedicineStats";
import MedicineSearch from "../../medicine/MedicineSearch";
import MedicineFilter from "../../medicine/MedicineFilter";
import MedicineTable from "../../medicine/MedicineTable";
import MedicinePagination from "../../medicine/MedicinePagination";

import "./MedicineList.css";

const MedicineList = () => {

    const [medicines, setMedicines] = useState([]);
    const [filteredMedicines, setFilteredMedicines] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [loading, setLoading] = useState(false);

    const medicinesPerPage = 10;

    useEffect(() => {
        loadMedicines();
    }, []);

    useEffect(() => {

        let filtered = [...medicines];

        if (category) {
            filtered = filtered.filter(
                medicine => medicine.category === category
            );
        }

        if (status) {
            filtered = filtered.filter(
                medicine => medicine.status === status
            );
        }

        setFilteredMedicines(filtered);

        setCurrentPage(1);

    }, [category, status, medicines]);

    const loadMedicines = async () => {

        try {

            setLoading(true);

            const data = await getAllMedicines();

            const list = toArray(data);

            setMedicines(list);

            setFilteredMedicines(list);

        } catch (error) {

            console.error("Error loading medicines", error);

        } finally {

            setLoading(false);

        }

    };

    const handleSearch = async (value) => {

        setSearchTerm(value);

        if (value.trim() === "") {

            loadMedicines();

            return;

        }

        try {

            const data = await searchMedicine(value);

            const list = toArray(data);

            setMedicines(list);

            setFilteredMedicines(list);

            setCurrentPage(1);

        } catch (error) {

            console.error("Search Error", error);

        }

    };

    const clearSearch = () => {

        setSearchTerm("");

        loadMedicines();

    };

    const resetFilters = () => {

        setSearchTerm("");

        setCategory("");

        setStatus("");

        loadMedicines();

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this medicine?"
        );

        if (!confirmDelete) return;

        try {

            await deleteMedicine(id);

            alert("Medicine deleted successfully.");

            loadMedicines();

            setCurrentPage(1);

        } catch (error) {

            console.error(error);

            alert("Unable to delete medicine.");

        }

    };

    /* Pagination */

    const indexOfLastMedicine = currentPage * medicinesPerPage;

    const indexOfFirstMedicine = indexOfLastMedicine - medicinesPerPage;

    const currentMedicines = toArray(filteredMedicines).slice(
        indexOfFirstMedicine,
        indexOfLastMedicine
    );

    const totalPages = Math.ceil(
        toArray(filteredMedicines).length / medicinesPerPage
    );

    return (

        <div className="medicine-list-container">

            <div className="header">

                <h2>Medicine Inventory</h2>

                <Link
                    to="/medicines/add"
                    className="add-btn"
                >
                    + Add Medicine
                </Link>

            </div>

            <MedicineStats />

            <MedicineSearch
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onSearch={handleSearch}
                onClear={clearSearch}
            />

            <MedicineFilter
                search={searchTerm}
                setSearch={setSearchTerm}
                category={category}
                setCategory={setCategory}
                status={status}
                setStatus={setStatus}
                resetFilters={resetFilters}
            />

            {loading ? (

                <div className="loading">
                    Loading Medicines...
                </div>

            ) : (

                <>
                    <MedicineTable
                        medicines={currentMedicines}
                        onDelete={handleDelete}
                        currentPage={currentPage}
                        medicinesPerPage={medicinesPerPage}
                    />

                    <MedicinePagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>

            )}

        </div>

    );

};

export default MedicineList;