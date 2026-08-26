import AddLabReport from "../components/pages/laboratory/AddLabReport";
import EditLabReport from "../components/pages/laboratory/EditLabReport";
import ViewLabReport from "../components/pages/laboratory/ViewLabReport";
import LabReportList from "../components/pages/laboratory/LabReportList";


// =====================================================
// LABORATORY ROUTES
// =====================================================

const laboratoryRoutes = [

    // =================================================
    // LAB REPORT LIST
    // =================================================

    {
        path: "/lab-reports",
        element: <LabReportList />,
    },


    // =================================================
    // ADD LAB REPORT
    // =================================================

    {
        path: "/lab-reports/add",
        element: <AddLabReport />,
    },


    // =================================================
    // EDIT LAB REPORT
    // =================================================

    {
        path: "/lab-reports/edit/:id",
        element: <EditLabReport />,
    },


    // =================================================
    // VIEW LAB REPORT
    // =================================================

    {
        path: "/lab-reports/view/:id",
        element: <ViewLabReport />,
    },

];


export default laboratoryRoutes;