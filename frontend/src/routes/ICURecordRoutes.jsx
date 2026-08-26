import { Navigate } from "react-router-dom";

import ICURecordList from "../components/pages/icu/ICURecordList";
import AddICURecord from "../components/pages/icu/AddICURecord";
import EditICURecord from "../components/pages/icu/EditICURecord";
import ViewICURecord from "../components/pages/icu/ViewICURecord";


// =====================================================
// ICU RECORD ROUTES
// =====================================================

const icuRecordRoutes = [

    // =================================================
    // LEGACY ICU PATH
    // /icu → /icu-records
    // =================================================

    {
        path: "/icu",
        element: (
            <Navigate
                to="/icu-records"
                replace
            />
        ),
    },


    // =================================================
    // ICU RECORD LIST
    // =================================================

    {
        path: "/icu-records",
        element: <ICURecordList />,
    },


    // =================================================
    // ADD ICU RECORD
    // =================================================

    {
        path: "/icu-records/add",
        element: <AddICURecord />,
    },


    // =================================================
    // EDIT ICU RECORD
    // =================================================

    {
        path: "/icu-records/edit/:id",
        element: <EditICURecord />,
    },


    // =================================================
    // VIEW ICU RECORD
    // =================================================

    {
        path: "/icu-records/view/:id",
        element: <ViewICURecord />,
    },

];


export default icuRecordRoutes;