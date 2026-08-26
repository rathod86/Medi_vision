import UserList from "../components/pages/users/UserList";
import AddUser from "../components/pages/users/AddUser";
import EditUser from "../components/pages/users/EditUser";
import ViewUser from "../components/pages/users/ViewUser";


// =====================================================
// USER ROUTES
// =====================================================

const userRoutes = [

    // =================================================
    // USER LIST
    // =================================================

    {
        path: "/users",
        element: <UserList />,
    },


    // =================================================
    // ADD USER
    // =================================================

    {
        path: "/users/add",
        element: <AddUser />,
    },


    // =================================================
    // EDIT USER
    // =================================================

    {
        path: "/users/edit/:id",
        element: <EditUser />,
    },


    // =================================================
    // VIEW USER
    // =================================================

    {
        path: "/users/view/:id",
        element: <ViewUser />,
    },

];


export default userRoutes;