import PrescriptionList from "../components/pages/prescription/PrescriptionList";
import AddPrescription from "../components/pages/prescription/AddPrescription";
import EditPrescription from "../components/pages/prescription/EditPrescription";
import ViewPrescription from "../components/pages/prescription/ViewPrescription";


// =====================================================
// PRESCRIPTION ROUTES
// =====================================================

const prescriptionRoutes = [

    // =================================================
    // PRESCRIPTION LIST
    // =================================================

    {
        path: "/prescriptions",
        element: <PrescriptionList />,
    },


    // =================================================
    // ADD PRESCRIPTION
    // =================================================

    {
        path: "/prescriptions/add",
        element: <AddPrescription />,
    },


    // =================================================
    // EDIT PRESCRIPTION
    // =================================================

    {
        path: "/prescriptions/edit/:id",
        element: <EditPrescription />,
    },


    // =================================================
    // VIEW PRESCRIPTION
    // =================================================

    {
        path: "/prescriptions/view/:id",
        element: <ViewPrescription />,
    },

];


export default prescriptionRoutes;