import AdmissionList from "../components/pages/admission/AdmissionList";
import AddAdmission from "../components/pages/admission/AddAdmission";
import EditAdmission from "../components/pages/admission/EditAdmission";
import ViewAdmission from "../components/pages/admission/ViewAdmission";


// =====================================================
// ADMISSION ROUTES
// =====================================================

const admissionRoutes = [

    // =================================================
    // ADMISSION LIST
    // =================================================

    {
        path: "/admissions",
        element: <AdmissionList />,
    },


    // =================================================
    // ADD ADMISSION
    // =================================================

    {
        path: "/admissions/add",
        element: <AddAdmission />,
    },


    // =================================================
    // EDIT ADMISSION
    // =================================================

    {
        path: "/admissions/edit/:id",
        element: <EditAdmission />,
    },


    // =================================================
    // VIEW ADMISSION
    // =================================================

    {
        path: "/admissions/view/:id",
        element: <ViewAdmission />,
    },

];


export default admissionRoutes;