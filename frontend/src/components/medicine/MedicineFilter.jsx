import React from "react";
import "./MedicineFilter.css";

const MedicineFilter = ({
    search,
    setSearch,
    category,
    setCategory,
    status,
    setStatus,
    resetFilters,
}) => {

    const categories = [
        "Tablet",
        "Capsule",
        "Syrup",
        "Injection",
        "Drops",
        "Cream",
        "Ointment",
        "Powder",
        "Other",
    ];

    const statuses = [
        "Available",
        "Low Stock",
        "Out Of Stock",
        "Expired",
    ];

    return (
        <div className="medicine-filter">

            <input
                type="text"
                placeholder="Search Medicine..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">All Categories</option>

                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">All Status</option>

                {statuses.map((st) => (
                    <option key={st} value={st}>
                        {st}
                    </option>
                ))}
            </select>

            <button
                className="reset-btn"
                onClick={resetFilters}
            >
                Reset
            </button>

        </div>
    );
};

export default MedicineFilter;