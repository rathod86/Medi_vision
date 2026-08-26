import { FaSearch } from "react-icons/fa";

import "./AppointmentSearch.css";

const AppointmentSearch = ({

    search,

    setSearch,

}) => {

    return (

        <div className="appointment-search">

            <FaSearch className="search-icon" />

            <input
                type="text"
                placeholder="Search by Appointment Code, Patient, Doctor..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

        </div>

    );

};

export default AppointmentSearch;