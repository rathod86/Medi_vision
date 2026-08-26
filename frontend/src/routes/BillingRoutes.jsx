import Billing from "../components/pages/billing/Billing";
import AddBilling from "../components/pages/billing/AddBilling";
import EditBilling from "../components/pages/billing/EditBilling";
import ViewBilling from "../components/pages/billing/ViewBilling";


// =====================================================
// BILLING ROUTES
// =====================================================

const billingRoutes = [

    // =================================================
    // BILLING LIST
    // =================================================

    {
        path: "/billing",
        element: <Billing />,
    },


    // =================================================
    // ADD BILLING
    // =================================================

    {
        path: "/billing/add",
        element: <AddBilling />,
    },


    // =================================================
    // EDIT BILLING
    // =================================================

    {
        path: "/billing/edit/:id",
        element: <EditBilling />,
    },


    // =================================================
    // VIEW BILLING
    // =================================================

    {
        path: "/billing/view/:id",
        element: <ViewBilling />,
    },

];


export default billingRoutes;