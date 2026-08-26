import MedicineList from "../components/pages/medicine/MedicineList";
import AddMedicine from "../components/pages/medicine/AddMedicine";
import EditMedicine from "../components/pages/medicine/EditMedicine";
import ViewMedicine from "../components/pages/medicine/ViewMedicine";


// =====================================================
// MEDICINE ROUTES
// =====================================================

const medicineRoutes = [

    // =================================================
    // MEDICINE LIST
    // =================================================

    {
        path: "/medicines",
        element: <MedicineList />,
    },


    // =================================================
    // ADD MEDICINE
    // =================================================

    {
        path: "/medicines/add",
        element: <AddMedicine />,
    },


    // =================================================
    // EDIT MEDICINE
    // =================================================

    {
        path: "/medicines/edit/:id",
        element: <EditMedicine />,
    },


    // =================================================
    // VIEW MEDICINE
    // =================================================

    {
        path: "/medicines/view/:id",
        element: <ViewMedicine />,
    },

];


export default medicineRoutes;