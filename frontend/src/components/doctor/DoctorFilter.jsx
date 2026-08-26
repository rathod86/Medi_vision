import "./DoctorFilter.css";

const DoctorFilter = ({
  department,
  setDepartment,
  status,
  setStatus,
}) => {

  const handleReset = () => {

    setDepartment("");

    setStatus("");

  };

  return (

    <div className="doctor-filter">

      {/* Department */}

      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="">All Departments</option>

        <option value="Cardiology">Cardiology</option>

        <option value="Neurology">Neurology</option>

        <option value="Orthopedics">Orthopedics</option>

        <option value="Pediatrics">Pediatrics</option>

        <option value="Dermatology">Dermatology</option>

        <option value="Radiology">Radiology</option>

      </select>

      {/* Status */}

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Status</option>

        <option value="Active">Active</option>

        <option value="Inactive">Inactive</option>

        <option value="On Leave">On Leave</option>

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

export default DoctorFilter;