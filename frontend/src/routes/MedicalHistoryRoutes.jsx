import MedicalHistoryList
    from "../components/pages/medical-history/MedicalHistoryList";

import AddMedicalHistory
    from "../components/pages/medical-history/AddMedicalHistory";

import EditMedicalHistory
    from "../components/pages/medical-history/EditMedicalHistory";

import ViewMedicalHistory
    from "../components/pages/medical-history/ViewMedicalHistory";


// =====================================================
// MEDICAL HISTORY ROUTES
// =====================================================

const medicalHistoryRoutes = [

    // =================================================
    // MEDICAL HISTORY LIST
    // =================================================

    {
        path: "/medical-histories",
        element: <MedicalHistoryList />,
    },


    // =================================================
    // LEGACY / SHORT PATH
    // =================================================

    {
        path: "/medical-history",
        element: <MedicalHistoryList />,
    },


    // =================================================
    // ADD MEDICAL HISTORY
    // =================================================

    {
        path: "/medical-histories/add",
        element: <AddMedicalHistory />,
    },


    // =================================================
    // EDIT MEDICAL HISTORY
    // =================================================

    {
        path: "/medical-histories/edit/:id",
        element: <EditMedicalHistory />,
    },


    // =================================================
    // VIEW MEDICAL HISTORY
    // =================================================

    {
        path: "/medical-histories/view/:id",
        element: <ViewMedicalHistory />,
    },

];


export default medicalHistoryRoutes;