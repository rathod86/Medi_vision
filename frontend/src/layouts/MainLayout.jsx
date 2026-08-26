import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

import "./MainLayout.css";

const MainLayout = () => {

    return (

        <div className="main-layout">

            {/* =====================================================
                TOP NAVBAR
            ===================================================== */}

            <Navbar />


            {/* =====================================================
                SIDEBAR + MAIN CONTENT
            ===================================================== */}

            <div className="layout-body">

                {/* Sidebar */}

                <Sidebar />


                {/* Main Content */}

                <main className="main-content">

                    <Outlet />

                </main>

            </div>


            {/* =====================================================
                FOOTER
            ===================================================== */}

            <Footer />

        </div>
    );
};

export default MainLayout;