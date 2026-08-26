import { FaSearch, FaTimes } from "react-icons/fa";

import "./PatientSearch.css";

const PatientSearch = ({
  search,
  setSearch,
}) => {

  const handleClear = () => {
    setSearch("");
  };

  return (

    <div className="patient-search">

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by Patient Code, Name, Email, Phone, Blood Group..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (

          <button
            className="clear-btn"
            onClick={handleClear}
          >
            <FaTimes />
          </button>

        )}

      </div>

    </div>

  );

};

export default PatientSearch;