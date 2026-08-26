import { useAuth } from "../../context/AuthContext";

import AdminDashboard from "./AdminDashboard";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";
import NurseDashboard from "./NurseDashboard";
import ReceptionistDashboard from "./ReceptionistDashboard";
import LabTechnicianDashboard from "./LabTechnicianDashboard";
import PharmacistDashboard from "./PharmacistDashboard";

import "./Dashboard.css";


const Dashboard = () => {

    const { user, loading } = useAuth();


    // =====================================================
    // AUTHENTICATION LOADING
    // =====================================================

    if (loading) {

        return (
            <div className="dashboard-state">

                <div className="dashboard-spinner" />

                <h3>
                    Loading dashboard...
                </h3>

                <p>
                    Please wait while we load your account.
                </p>

            </div>
        );
    }


    // =====================================================
    // USER NOT AVAILABLE
    // =====================================================

    if (!user) {

        return (
            <div className="dashboard-state dashboard-error">

                <h2>
                    Dashboard unavailable
                </h2>

                <p>
                    Unable to load your account information.
                </p>

            </div>
        );
    }


    // =====================================================
    // NORMALIZE ROLE
    // =====================================================

    const role =
        typeof user.role === "string"
            ? user.role.trim().toUpperCase()
            : "";


    // =====================================================
    // ROLE-BASED DASHBOARD
    // =====================================================

    switch (role) {


        // =================================================
        // ADMIN
        // =================================================

        case "ADMIN":

            return (
                <AdminDashboard />
            );


        // =================================================
        // DOCTOR
        // =================================================

        case "DOCTOR":

            return (
                <DoctorDashboard />
            );


        // =================================================
        // PATIENT
        // =================================================

        case "PATIENT":

            return (
                <PatientDashboard />
            );


        // =================================================
        // NURSE
        // =================================================

        case "NURSE":

            return (
                <NurseDashboard />
            );


        // =================================================
        // RECEPTIONIST
        // =================================================

        case "RECEPTIONIST":

            return (
                <ReceptionistDashboard />
            );


        // =================================================
        // LAB TECHNICIAN
        // =================================================

        case "LAB_TECHNICIAN":

            return (
                <LabTechnicianDashboard />
            );


        // =================================================
        // PHARMACIST
        // =================================================

        case "PHARMACIST":

            return (
                <PharmacistDashboard />
            );


        // =================================================
        // UNKNOWN ROLE
        // =================================================

        default:

            return (

                <div className="dashboard-state dashboard-error">

                    <div className="dashboard-error-icon">
                        ⚠
                    </div>

                    <h2>
                        Dashboard unavailable
                    </h2>

                    <p>
                        Your account role is not configured
                        correctly.
                    </p>

                    <div className="dashboard-role">

                        Current role:
                        
                        <strong>
                            {user.role || "Not configured"}
                        </strong>

                    </div>

                </div>

            );
    }
};


export default Dashboard;