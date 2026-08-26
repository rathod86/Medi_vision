import DoctorList from "../components/pages/doctor/DoctorList";
import AddDoctor from "../components/pages/doctor/AddDoctor";
import EditDoctor from "../components/pages/doctor/EditDoctor";
import ViewDoctor from "../components/pages/doctor/ViewDoctor";


const doctorRoutes = [

    // =====================================================
    // DOCTOR LIST
    // =====================================================

    {
        path: "/doctors",
        element: <DoctorList />,
    },


    // =====================================================
    // ADD DOCTOR
    // =====================================================

    {
        path: "/doctors/add",
        element: <AddDoctor />,
    },


    // =====================================================
    // EDIT DOCTOR
    // =====================================================

    {
        path: "/doctors/edit/:id",
        element: <EditDoctor />,
    },


    // =====================================================
    // VIEW DOCTOR
    // =====================================================

    {
        path: "/doctors/view/:id",
        element: <ViewDoctor />,
    },

];


export default doctorRoutes;