import AddPatient from "../components/pages/patient/AddPatient";
import EditPatient from "../components/pages/patient/EditPatient";
import PatientList from "../components/pages/patient/PatientList";
import ViewPatient from "../components/pages/patient/ViewPatient";


// =====================================================
// PATIENT ROUTES
// =====================================================

const patientRoutes = [

    // =================================================
    // PATIENT LIST
    // =================================================

    {
        path: "/patients",
        element: <PatientList />,
    },


    // =================================================
    // ADD PATIENT
    // =================================================

    {
        path: "/patients/add",
        element: <AddPatient />,
    },


    // =================================================
    // EDIT PATIENT
    // =================================================

    {
        path: "/patients/edit/:id",
        element: <EditPatient />,
    },


    // =================================================
    // VIEW PATIENT
    // =================================================

    {
        path: "/patients/view/:id",
        element: <ViewPatient />,
    },

];


export default patientRoutes;