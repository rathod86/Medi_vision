import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { canAccessPath } from "../../utils/roleConfig";

import "./Sidebar.css";

import {
    FaBars,
    FaTachometerAlt,
    FaUserMd,
    FaUserInjured,
    FaCalendarCheck,
    FaHospital,
    FaFileInvoiceDollar,
    FaPills,
    FaClipboardList,
    FaFlask,
    FaProcedures,
    FaUserNurse,
    FaNotesMedical,
    FaSignOutAlt,
    FaCog,
    FaUsers
} from "react-icons/fa";


const Sidebar = () => {

    const [isOpen, setIsOpen] = useState(true);

    const navigate = useNavigate();

    const {
        userRole,
        logout
    } = useAuth();


    const toggleSidebar = () => {

        setIsOpen(
            (previousState) =>
                !previousState
        );
    };


    const allMenuItems = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaTachometerAlt />
        },

        {
            name: "User Management",
            path: "/users",
            icon: <FaUsers />
        },

        {
            name: "Doctors",
            path: "/doctors",
            icon: <FaUserMd />
        },

        {
            name: "Patients",
            path: "/patients",
            icon: <FaUserInjured />
        },

        {
            name: "Appointments",
            path: "/appointments",
            icon: <FaCalendarCheck />
        },

        {
            name: "Admissions",
            path: "/admissions",
            icon: <FaHospital />
        },

        {
            name: "Billing",
            path: "/billing",
            icon: <FaFileInvoiceDollar />
        },

        {
            name: "Medicines",
            path: "/medicines",
            icon: <FaPills />
        },

        {
            name: "Prescriptions",
            path: "/prescriptions",
            icon: <FaClipboardList />
        },

        {
            name: "Laboratory",
            path: "/lab-reports",
            icon: <FaFlask />
        },

        {
            name: "ICU Records",
            path: "/icu-records",
            icon: <FaProcedures />
        },

        {
            name: "Nurses",
            path: "/nurses",
            icon: <FaUserNurse />
        },

        {
            name: "Medical History",
            path: "/medical-history",
            icon: <FaNotesMedical />
        },

        {
            name: "Settings",
            path: "/settings",
            icon: <FaCog />
        }

    ];


    const menuItems =
        allMenuItems.filter((item) =>
            canAccessPath(
                userRole,
                item.path
            )
        );


    const handleLogout = async () => {

        const confirmed =
            window.confirm(
                "Are you sure you want to logout?"
            );

        if (!confirmed) {
            return;
        }

        await logout();

        navigate(
            "/login",
            {
                replace: true
            }
        );
    };


    return (

        <aside
            className={
                isOpen
                    ? "sidebar open"
                    : "sidebar"
            }
        >

            <div className="sidebar-header">

                <button
                    type="button"
                    className="menu-btn"
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <FaBars />
                </button>


                {isOpen && (
                    <h3>
                        Medi Vision
                    </h3>
                )}

            </div>


            <ul className="sidebar-menu">

                {menuItems.map((item) => (

                    <li
                        key={item.name}
                    >

                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "menu-link active"
                                    : "menu-link"
                            }
                        >

                            <span className="icon">
                                {item.icon}
                            </span>


                            {isOpen && (
                                <span>
                                    {item.name}
                                </span>
                            )}

                        </NavLink>

                    </li>

                ))}

            </ul>


            <div className="logout-section">

                <button
                    type="button"
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    {isOpen && (
                        <span>
                            Logout
                        </span>
                    )}

                </button>

            </div>

        </aside>
    );
};


export default Sidebar;
