import React from "react";
import "./PrescriptionPagination.css";

const PrescriptionPagination = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {

    if (totalPages <= 1) {
        return null;
    }

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (

        <div className="pagination-container">

            {/* Previous */}

            <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            {/* Page Numbers */}

            {pageNumbers.map((page) => (

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

            {/* Next */}

            <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>

        </div>

    );

};

export default PrescriptionPagination;