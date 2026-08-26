import "./PatientFilter.css";

const PatientFilter = ({
  gender,
  setGender,
  status,
  setStatus,
}) => {

  const handleReset = () => {

    setGender("");

    setStatus("");

  };

  return (

    <div className="patient-filter">

      {/* Gender */}

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      {/* Status */}

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Admitted">Admitted</option>
        <option value="Discharged">Discharged</option>
        <option value="Inactive">Inactive</option>
      </select>

      {/* Reset */}

      <button
        className="reset-btn"
        onClick={handleReset}
      >
        Reset
      </button>

    </div>

  );

};

export default PatientFilter;