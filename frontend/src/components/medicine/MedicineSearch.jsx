import React from "react";
import "./MedicineSearch.css";

const MedicineSearch = ({
    searchTerm,
    setSearchTerm,
    onSearch,
    onClear,
}) => {

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className="medicine-search">

            <div className="search-box">

                <span className="search-icon">
                    🔍
                </span>

                <input
                    type="text"
                    placeholder="Search medicine by name..."
                    value={searchTerm}
                    onChange={handleChange}
                />

                {searchTerm && (
                    <button
                        className="clear-btn"
                        onClick={onClear}
                    >
                        ✖
                    </button>
                )}

            </div>

        </div>
    );
};

export default MedicineSearch;