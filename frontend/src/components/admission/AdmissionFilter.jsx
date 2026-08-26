import "./AdmissionFilter.css";

const AdmissionFilter = ({

    department,

    setDepartment,

    status,

    setStatus,

    ward,

    setWard,

}) => {

    return (

        <div className="admission-filter">

            {/* Department */}

            <select
                value={department}
                onChange={(e) =>
                    setDepartment(e.target.value)
                }
            >

                <option value="">
                    All Departments
                </option>

                <option value="Cardiology">
                    Cardiology
                </option>

                <option value="Neurology">
                    Neurology
                </option>

                <option value="Orthopedics">
                    Orthopedics
                </option>

                <option value="Pediatrics">
                    Pediatrics
                </option>

                <option value="General Medicine">
                    General Medicine
                </option>

                <option value="Emergency">
                    Emergency
                </option>

            </select>

            {/* Ward */}

            <select
                value={ward}
                onChange={(e) =>
                    setWard(e.target.value)
                }
            >

                <option value="">
                    All Wards
                </option>

                <option value="General Ward">
                    General Ward
                </option>

                <option value="ICU">
                    ICU
                </option>

                <option value="CCU">
                    CCU
                </option>

                <option value="Emergency Ward">
                    Emergency Ward
                </option>

                <option value="Private Ward">
                    Private Ward
                </option>

            </select>

            {/* Status */}

            <select
                value={status}
                onChange={(e) =>
                    setStatus(e.target.value)
                }
            >

                <option value="">
                    All Status
                </option>

                <option value="Admitted">
                    Admitted
                </option>

                <option value="Under Observation">
                    Under Observation
                </option>

                <option value="Transferred">
                    Transferred
                </option>

                <option value="Discharged">
                    Discharged
                </option>

            </select>

        </div>

    );

};

export default AdmissionFilter;