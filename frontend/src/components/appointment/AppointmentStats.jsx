import "./AppointmentStats.css";

const AppointmentStats = ({ appointments = [] }) => {

    // ==========================================
    // Statistics
    // ==========================================

    const totalAppointments = appointments.length;

    const scheduledAppointments = appointments.filter(
        appointment => appointment.status === "Scheduled"
    ).length;

    const completedAppointments = appointments.filter(
        appointment => appointment.status === "Completed"
    ).length;

    const cancelledAppointments = appointments.filter(
        appointment => appointment.status === "Cancelled"
    ).length;

    const today = new Date().toISOString().split("T")[0];

    const todayAppointments = appointments.filter(
        appointment => appointment.appointmentDate === today
    ).length;

    return (

        <div className="appointment-stats">

            <div className="stat-card total">

                <h3>Total Appointments</h3>

                <h2>{totalAppointments}</h2>

            </div>

            <div className="stat-card today">

                <h3>Today's Appointments</h3>

                <h2>{todayAppointments}</h2>

            </div>

            <div className="stat-card scheduled">

                <h3>Scheduled</h3>

                <h2>{scheduledAppointments}</h2>

            </div>

            <div className="stat-card completed">

                <h3>Completed</h3>

                <h2>{completedAppointments}</h2>

            </div>

            <div className="stat-card cancelled">

                <h3>Cancelled</h3>

                <h2>{cancelledAppointments}</h2>

            </div>

        </div>

    );

};

export default AppointmentStats;