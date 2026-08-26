import "./AppointmentPagination.css";

const AppointmentPagination = ({

    currentPage,

    totalPages,

    onPageChange,

}) => {

    if (totalPages <= 1) return null;

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {

        pages.push(i);

    }

    return (

        <div className="appointment-pagination">

            {/* Previous */}

            <button

                disabled={currentPage === 1}

                onClick={() => onPageChange(currentPage - 1)}

            >

                Previous

            </button>

            {/* Page Numbers */}

            {pages.map((page) => (

                <button

                    key={page}

                    className={
                        currentPage === page
                            ? "active"
                            : ""
                    }

                    onClick={() => onPageChange(page)}

                >

                    {page}

                </button>

            ))}

            {/* Next */}

            <button

                disabled={currentPage === totalPages}

                onClick={() => onPageChange(currentPage + 1)}

            >

                Next

            </button>

        </div>

    );

};

export default AppointmentPagination;