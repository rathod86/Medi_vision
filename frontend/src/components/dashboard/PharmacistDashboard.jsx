import { useEffect, useState } from "react";

import Header from "../common/Header";

import StatCard from "../pages/dashboard/StatCard";
import AppointmentChart from "../pages/dashboard/AppointmentChart";
import DashboardCalendar from "../pages/dashboard/DashboardCalendar";
import RecentAppointments from "../pages/dashboard/RecentAppointments";
import RecentPatients from "../pages/dashboard/RecentPatients";
import QuickActions from "../pages/dashboard/QuickActions";
import Notifications from "../pages/dashboard/Notifications";
import RecentActivity from "../pages/dashboard/RecentActivity";

import "./PharmacistDashboard.css";

import { getAllAppointments } from "../../services/appointmentService";
import { getAllPatients } from "../../services/patientService";

import { toArray } from "../../utils/apiHelpers";

import {
    FaPills,
    FaUserInjured,
    FaCalendarCheck,
    FaExclamationTriangle,
} from "react-icons/fa";


const PharmacistDashboard = () => {

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        totalPatients: 0,
        todayAppointments: 0,
        totalMedicines: 0,
        lowStockMedicines: 0,
    });


    // =====================================================
    // LOAD DASHBOARD DATA
    // =====================================================

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                setLoading(true);

                const [
                    appointmentsResponse,
                    patientsResponse,
                ] = await Promise.all([
                    getAllAppointments(),
                    getAllPatients(),
                ]);


                const appointments =
                    toArray(
                        appointmentsResponse
                    );

                const patients =
                    toArray(
                        patientsResponse
                    );


                // =================================================
                // TODAY
                // =================================================

                const today =
                    new Date();

                const todayString =
                    today
                        .toISOString()
                        .split("T")[0];


                // =================================================
                // TODAY'S APPOINTMENTS
                // =================================================

                const todayAppointments =
                    appointments.filter(
                        (appointment) => {

                            if (
                                !appointment?.appointmentDate
                            ) {
                                return false;
                            }

                            return (
                                appointment.appointmentDate
                                    .toString()
                                    .split("T")[0]
                                === todayString
                            );
                        }
                    );


                /*
                 * Medicine statistics are intentionally
                 * left at zero until the actual
                 * medicineService.js is verified.
                 *
                 * We should never show fake stock
                 * information in a healthcare application.
                 */

                setStats({

                    totalPatients:
                        patients.length,

                    todayAppointments:
                        todayAppointments.length,

                    totalMedicines:
                        0,

                    lowStockMedicines:
                        0,

                });


            } catch (error) {

                console.error(
                    "Pharmacist dashboard load error:",
                    error
                );

            } finally {

                setLoading(false);
            }

        };


        loadDashboard();

    }, []);


    // =====================================================
    // STAT CARDS
    // =====================================================

    const dashboardStats = [

        {
            title: "Patients",

            value:
                stats.totalPatients,

            subtitle:
                "Registered patients",

            icon:
                <FaUserInjured />,

            color:
                "#0d6efd",
        },


        {
            title: "Today's Appointments",

            value:
                stats.todayAppointments,

            subtitle:
                "Patients scheduled today",

            icon:
                <FaCalendarCheck />,

            color:
                "#198754",
        },


        {
            title: "Medicines",

            value:
                stats.totalMedicines,

            subtitle:
                "Available medicines",

            icon:
                <FaPills />,

            color:
                "#20c997",
        },


        {
            title: "Low Stock",

            value:
                stats.lowStockMedicines,

            subtitle:
                "Medicines requiring attention",

            icon:
                <FaExclamationTriangle />,

            color:
                "#fd7e14",
        },

    ];


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="pharmacist-dashboard">

                <Header
                    title="Pharmacist Dashboard"
                    subtitle="Manage medicines and pharmacy activities"
                />

                <div className="pharmacist-dashboard-loading">

                    <div className="spinner-border" />

                    <p>
                        Loading pharmacy dashboard...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    return (

        <div className="pharmacist-dashboard">

            <Header
                title="Pharmacist Dashboard"
                subtitle="Manage medicines and pharmacy activities"
            />


            {/* =================================================
                OVERVIEW
            ================================================= */}

            <section className="pharmacist-dashboard-section">

                <div className="pharmacist-section-heading">

                    <div>

                        <h2>
                            Pharmacy Overview
                        </h2>

                        <p>
                            Today's pharmacy workload
                        </p>

                    </div>

                </div>


                <div className="pharmacist-stat-grid">

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
                APPOINTMENT STATISTICS
            ================================================= */}

            <section className="pharmacist-dashboard-section">

                <AppointmentChart />

            </section>


            {/* =================================================
                RECENT APPOINTMENTS
            ================================================= */}

            <section className="pharmacist-dashboard-section">

                <div className="pharmacist-dashboard-card">

                    <RecentAppointments />

                </div>

            </section>


            {/* =================================================
                RECENT PATIENTS
            ================================================= */}

            <section className="pharmacist-dashboard-section">

                <div className="pharmacist-dashboard-card">

                    <RecentPatients />

                </div>

            </section>


            {/* =================================================
                CALENDAR + QUICK ACTIONS
            ================================================= */}

            <section className="pharmacist-dashboard-grid">

                <div className="pharmacist-dashboard-card">

                    <DashboardCalendar />

                </div>


                <div className="pharmacist-dashboard-card">

                    <QuickActions />

                </div>

            </section>


            {/* =================================================
                NOTIFICATIONS + ACTIVITY
            ================================================= */}

            <section className="pharmacist-dashboard-grid">

                <div className="pharmacist-dashboard-card">

                    <Notifications />

                </div>


                <div className="pharmacist-dashboard-card">

                    <RecentActivity />

                </div>

            </section>

        </div>
    );
};


export default PharmacistDashboard;