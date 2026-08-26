import { FaSearch } from "react-icons/fa";

import "./AdmissionSearch.css";

const AdmissionSearch = ({

    search,

    setSearch,

}) => {

    return (

        <div className="admission-search">

            <FaSearch className="search-icon" />

            <input
                type="text"
                placeholder="Search by Admission No, Patient, Doctor..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

        </div>

    );

};

export default AdmissionSearch;