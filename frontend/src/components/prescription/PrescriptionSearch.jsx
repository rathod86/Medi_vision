import React from "react";
import "./PrescriptionSearch.css";

const PrescriptionSearch = ({
    searchTerm,
    setSearchTerm,
    onSearch,
    onClear,
}) => {

    const handleChange = (e) => {

        const value = e.target.value;

        setSearchTerm(value);

        onSearch(value);

    };

    return (

        <div className="prescription-search">

            <input
                type="text"
                placeholder="Search by Patient, Doctor, Diagnosis..."
                value={searchTerm}
                onChange={handleChange}
            />

            <button
                className="search-btn"
                onClick={() => onSearch(searchTerm)}
            >
                Search
            </button>

            <button
                className="clear-btn"
                onClick={onClear}
            >
                Clear
            </button>

        </div>

    );

};

export default PrescriptionSearch;