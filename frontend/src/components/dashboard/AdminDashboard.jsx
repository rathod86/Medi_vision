import { useEffect, useState } from "react";

import Header from "../common/Header";

// Existing dashboard components
// Reusing them from components/pages/dashboard
import StatCard from "../pages/dashboard/StatCard";
import AppointmentChart from "../pages/dashboard/AppointmentChart";
import RecentAppointments from "../pages/dashboard/RecentAppointments";
import RecentPatients from "../pages/dashboard/RecentPatients";
import RecentDoctors from "../pages/dashboard/RecentDoctors";
import QuickActions from "../pages/dashboard/QuickActions";
import TodaysAdmissions from "../pages/dashboard/TodaysAdmissions";
import TodaysDischarges from "../pages/dashboard/TodaysDischarges";
import BedOccupancy from "../pages/dashboard/BedOccupancy";
import Notifications from "../pages/dashboard/Notifications";
import RecentActivity from "../pages/dashboard/RecentActivity";
import DashboardCalendar from "../pages/dashboard/DashboardCalendar";

import "./AdminDashboard.css";

import { getFullDashboard } from "../../services/dashboardService";

import {
    FaUserMd,
    FaUserInjured,
    FaCalendarCheck,
    FaHospital,
    FaMoneyBillWave,
    FaPills,
    FaFlask,
    FaProcedures,
} from "react-icons/fa";


const AdminDashboard = () => {

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD ADMIN DASHBOARD DATA
    // =====================================================

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);

                setError("");

                const data =
                    await getFullDashboard();

                console.log(
                    "Admin dashboard data:",
                    data
                );

                setStats(data);

            } catch (error) {

                console.error(
                    "Admin dashboard load error:",
                    error
                );

                setError(
                    "Unable to load dashboard data."
                );

            } finally {

                setLoading(false);
            }
        };


        loadDashboard();

    }, []);


    // =====================================================
    // SAFE DATA OBJECTS
    // =====================================================

    const overview =
        stats?.overview || {};

    const billing =
        stats?.billing || {};

    const labReports =
        stats?.labReports || {};

    const icuRecords =
        stats?.icuRecords || {};

    const admissions =
        stats?.admissions || {};

    const medicines =
        stats?.medicines || {};


    const formatCurrency = (amount) => {

        const value = Number(amount ?? 0);

        return `₹${value.toLocaleString("en-IN", {
            maximumFractionDigits: 2,
        })}`;
    };


    // =====================================================
    // ADMIN STAT CARDS
    // =====================================================

    const dashboardStats = [

        {
            title: "Doctors",

            value:
                overview.totalDoctors ?? 0,

            subtitle:
                "Registered Doctors",

            icon:
                <FaUserMd />,

            color:
                "#0d6efd",
        },


        {
            title: "Patients",

            value:
                overview.totalPatients ?? 0,

            subtitle:
                "Registered Patients",

            icon:
                <FaUserInjured />,

            color:
                "#198754",
        },


        {
            title: "Appointments",

            value:
                overview.todayAppointments ?? 0,

            subtitle:
                "Today's Appointments",

            icon:
                <FaCalendarCheck />,

            color:
                "#fd7e14",
        },


        {
            title: "Admissions",

            value:
                admissions.admitted ??
                admissions.active ??
                overview.totalAdmissions ??
                0,

            subtitle:
                "Currently Admitted",

            icon:
                <FaHospital />,

            color:
                "#6f42c1",
        },


        {
            title: "Revenue",

            value:
                formatCurrency(
                    billing.totalRevenue ??
                    billing.collectedAmount
                ),

            subtitle:
                "Total Revenue",

            icon:
                <FaMoneyBillWave />,

            color:
                "#dc3545",
        },


        {
            title: "Medicines",

            value:
                medicines.totalMedicines ??
                overview.totalMedicines ??
                0,

            subtitle:
                "Registered Medicines",

            icon:
                <FaPills />,

            color:
                "#20c997",
        },


        {
            title: "Lab Reports",

            value:
                labReports.total ?? 0,

            subtitle:
                labReports.pending
                    ? `${labReports.pending} pending`
                    : "Generated Reports",

            icon:
                <FaFlask />,

            color:
                "#6610f2",
        },


        {
            title: "ICU Records",

            value:
                icuRecords.active ??
                icuRecords.total ??
                0,

            subtitle:
                icuRecords.onVentilator
                    ? `${icuRecords.onVentilator} on ventilator`
                    : "Active ICU Patients",

            icon:
                <FaProcedures />,

            color:
                "#0dcaf0",
        },

    ];


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="admin-dashboard">

                <Header
                    title="Admin Dashboard"
                    subtitle="Hospital Management Overview"
                />

                <div className="admin-dashboard-loading">

                    <div className="dashboard-spinner">
                        <div className="spinner-border" />
                    </div>

                    <p>
                        Loading hospital dashboard...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div className="admin-dashboard">

                <Header
                    title="Admin Dashboard"
                    subtitle="Hospital Management Overview"
                />

                <div className="admin-dashboard-error">

                    <h3>
                        Unable to load dashboard
                    </h3>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                            window.location.reload()
                        }
                    >
                        Retry
                    </button>

                </div>

            </div>
        );
    }


    // =====================================================
    // ADMIN DASHBOARD
    // =====================================================

    return (

        <div className="admin-dashboard">

            {/* =================================================
                HEADER
            ================================================= */}

            <Header
                title="Admin Dashboard"
                subtitle="Hospital Management Overview"
            />


            {/* =================================================
                OVERVIEW STATISTICS
            ================================================= */}

            <section className="admin-dashboard-section">

                <div className="admin-section-heading">

                    <div>

                        <h2>
                            Hospital Overview
                        </h2>

                        <p>
                            Real-time summary of hospital operations
                        </p>

                    </div>

                </div>


                <div className="admin-stat-grid">

                    {dashboardStats.map(
                        (card, index) => (

                            <StatCard
                                key={index}
                                title={card.title}
                                value={card.value}
                                subtitle={card.subtitle}
                                icon={card.icon}
                                color={card.color}
                            />

                        )
                    )}

                </div>

            </section>


            {/* =================================================
                APPOINTMENTS
            ================================================= */}

            <section className="admin-dashboard-section">

                <AppointmentChart />

            </section>


            {/* =================================================
                APPOINTMENT + PATIENT + DOCTOR INFORMATION
            ================================================= */}

            <section className="admin-dashboard-grid">

                <div className="admin-dashboard-card">

                    <RecentAppointments />

                </div>


                <div className="admin-dashboard-card">

                    <RecentPatients />

                </div>


                <div className="admin-dashboard-card">

                    <RecentDoctors />

                </div>

            </section>


            {/* =================================================
                CALENDAR + QUICK ACTIONS
            ================================================= */}

            <section className="admin-dashboard-grid two-column">

                <div className="admin-dashboard-card">

                    <DashboardCalendar />

                </div>


                <div className="admin-dashboard-card">

                    <QuickActions />

                </div>

            </section>


            {/* =================================================
                ADMISSIONS + DISCHARGES
            ================================================= */}

            <section className="admin-dashboard-grid two-column">

                <div className="admin-dashboard-card">

                    <TodaysAdmissions />

                </div>


                <div className="admin-dashboard-card">

                    <TodaysDischarges />

                </div>

            </section>


            {/* =================================================
                BED OCCUPANCY
            ================================================= */}

            <section className="admin-dashboard-section">

                <BedOccupancy />

            </section>


            {/* =================================================
                NOTIFICATIONS + RECENT ACTIVITY
            ================================================= */}

            <section className="admin-dashboard-grid two-column">

                <div className="admin-dashboard-card">

                    <Notifications />

                </div>


                <div className="admin-dashboard-card">

                    <RecentActivity />

                </div>

            </section>

        </div>
    );
};


export default AdminDashboard;