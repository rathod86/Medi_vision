import React from "react";
import "./MedicinePagination.css";

const MedicinePagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {

    if (totalPages <= 1) {
        return null;
    }

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="medicine-pagination">

            <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                ⬅ Previous
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    className={
                        currentPage === page
                            ? "pagination-btn active"
                            : "pagination-btn"
                    }
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}

            <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next ➡
            </button>

        </div>
    );
};

export default MedicinePagination;