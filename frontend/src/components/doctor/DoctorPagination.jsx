import "./DoctorPagination.css";

const DoctorPagination = ({
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  totalRecords,
}) => {

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const firstRecord =
    totalRecords === 0
      ? 0
      : (currentPage - 1) * rowsPerPage + 1;

  const lastRecord = Math.min(
    currentPage * rowsPerPage,
    totalRecords
  );

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

    <div className="doctor-pagination">

      <div className="pagination-info">

        Showing <strong>{firstRecord} - {lastRecord}</strong> of{" "}
        <strong>{totalRecords}</strong> Doctors

      </div>

      <div className="pagination-controls">

        <button
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (

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

export default DoctorPagination;