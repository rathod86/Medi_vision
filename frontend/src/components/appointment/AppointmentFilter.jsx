import "./AppointmentFilter.css";

const AppointmentFilter = ({

    doctor,

    setDoctor,

    status,

    setStatus,

    consultationType,

    setConsultationType,

}) => {

    return (

        <div className="appointment-filter">

            {/* Doctor */}

            <select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
            >

                <option value="">All Doctors</option>

                <option value="Doctor 1">Doctor 1</option>

                <option value="Doctor 2">Doctor 2</option>

                <option value="Doctor 3">Doctor 3</option>

            </select>

            {/* Status */}

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >

                <option value="">All Status</option>

                <option value="Scheduled">Scheduled</option>

                <option value="Completed">Completed</option>

                <option value="Cancelled">Cancelled</option>

                <option value="No Show">No Show</option>

            </select>

            {/* Consultation Type */}

            <select
                value={consultationType}
                onChange={(e) =>
                    setConsultationType(e.target.value)
                }
            >

                <option value="">Consultation Type</option>

                <option value="Walk-In">
                    Walk-In
                </option>

                <option value="Online">
                    Online
                </option>

                <option value="Follow-up">
                    Follow-up
                </option>

                <option value="Emergency">
                    Emergency
                </option>

            </select>

        </div>

    );

};

export default AppointmentFilter;