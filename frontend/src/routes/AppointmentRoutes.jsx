import AddAppointment from "../components/pages/appointment/AddAppointment";
import EditAppointment from "../components/pages/appointment/EditAppointment";
import AppointmentList from "../components/pages/appointment/AppointmentList";
import ViewAppointment from "../components/pages/appointment/ViewAppointment";


// =====================================================
// APPOINTMENT ROUTES
// =====================================================

const appointmentRoutes = [

    // =================================================
    // APPOINTMENT LIST
    // =================================================

    {
        path: "/appointments",
        element: <AppointmentList />,
    },


    // =================================================
    // ADD APPOINTMENT
    // =================================================

    {
        path: "/appointments/add",
        element: <AddAppointment />,
    },


    // =================================================
    // EDIT APPOINTMENT
    // =================================================

    {
        path: "/appointments/edit/:id",
        element: <EditAppointment />,
    },


    // =================================================
    // VIEW APPOINTMENT
    // =================================================

    {
        path: "/appointments/view/:id",
        element: <ViewAppointment />,
    },

];


export default appointmentRoutes;