import { FaSearch, FaTimes } from "react-icons/fa";
import "./DoctorSearch.css";

const DoctorSearch = ({ search, setSearch }) => {

  const handleClear = () => {
    setSearch("");
  };

  return (

    <div className="doctor-search">

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by Doctor Code, Name, Email, Phone, Department, Specialization or Status..."
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

export default DoctorSearch;