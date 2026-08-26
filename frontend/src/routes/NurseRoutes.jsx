import NurseList from "../components/pages/nurse/NurseList";
import AddNurse from "../components/pages/nurse/AddNurse";
import EditNurse from "../components/pages/nurse/EditNurse";
import ViewNurse from "../components/pages/nurse/ViewNurse";


// =====================================================
// NURSE ROUTES
// =====================================================

const nurseRoutes = [

    // =================================================
    // NURSE LIST
    // =================================================

    {
        path: "/nurses",
        element: <NurseList />,
    },


    // =================================================
    // ADD NURSE
    // =================================================

    {
        path: "/nurses/add",
        element: <AddNurse />,
    },


    // =================================================
    // EDIT NURSE
    // =================================================

    {
        path: "/nurses/edit/:id",
        element: <EditNurse />,
    },


    // =================================================
    // VIEW NURSE
    // =================================================

    {
        path: "/nurses/view/:id",
        element: <ViewNurse />,
    },

];


export default nurseRoutes;