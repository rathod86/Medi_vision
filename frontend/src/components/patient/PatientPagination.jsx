import "./PatientPagination.css";

const PatientPagination = ({
  currentPage,
  totalPages,
  rowsPerPage,
  totalRecords,
  startRecord,
  endRecord,
  setCurrentPage,
  setRowsPerPage,
}) => {

  const previousPage = () => {

    if (currentPage > 1) {

      setCurrentPage(currentPage - 1);

    }

  };

  const nextPage = () => {

    if (currentPage < totalPages) {

      setCurrentPage(currentPage + 1);

    }

  };

  return (

    <div className="patient-pagination">

      {/* Info */}

      <div className="pagination-info">

        Showing

        <strong> {startRecord} - {endRecord} </strong>

        of

        <strong> {totalRecords} </strong>

        Patients

      </div>

      {/* Pagination */}

      <div className="pagination-controls">

        <button
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (

          <button
            key={index}
            className={
              currentPage === index + 1
                ? "active-page"
                : ""
            }
            onClick={() =>
              setCurrentPage(index + 1)
            }
          >
            {index + 1}
          </button>

        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>

      </div>

      {/* Rows */}

      <div className="page-size">

        <label>Rows :</label>

        <select
          value={rowsPerPage}
          onChange={(e) => {

            setRowsPerPage(Number(e.target.value));

            setCurrentPage(1);

          }}
        >

          <option value={10}>10</option>

          <option value={25}>25</option>

          <option value={50}>50</option>

          <option value={100}>100</option>

        </select>

      </div>

    </div>

  );

};

export default PatientPagination;