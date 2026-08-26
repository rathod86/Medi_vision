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

import "./LabTechnicianDashboard.css";

import { getAllAppointments } from "../../services/appointmentService";
import { getAllPatients } from "../../services/patientService";

import { toArray } from "../../utils/apiHelpers";

import {
    FaFlask,
    FaUserInjured,
    FaCalendarCheck,
    FaClipboardCheck,
} from "react-icons/fa";


const LabTechnicianDashboard = () => {

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        totalPatients: 0,
        todayAppointments: 0,
        totalReports: 0,
        pendingReports: 0,
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
                 * We don't have a confirmed LabReport
                 * service/API in the code you've provided.
                 *
                 * Therefore we don't invent report numbers.
                 */

                setStats({

                    totalPatients:
                        patients.length,

                    todayAppointments:
                        todayAppointments.length,

                    totalReports:
                        0,

                    pendingReports:
                        0,

                });


            } catch (error) {

                console.error(
                    "Lab technician dashboard load error:",
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
            title: "Lab Reports",

            value:
                stats.totalReports,

            subtitle:
                "Generated reports",

            icon:
                <FaFlask />,

            color:
                "#6610f2",
        },


        {
            title: "Pending Reports",

            value:
                stats.pendingReports,

            subtitle:
                "Reports awaiting completion",

            icon:
                <FaClipboardCheck />,

            color:
                "#fd7e14",
        },

    ];


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="lab-dashboard">

                <Header
                    title="Lab Technician Dashboard"
                    subtitle="Manage laboratory activities and patient reports"
                />

                <div className="lab-dashboard-loading">

                    <div className="spinner-border" />

                    <p>
                        Loading laboratory dashboard...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    return (

        <div className="lab-dashboard">

            <Header
                title="Lab Technician Dashboard"
                subtitle="Manage laboratory activities and patient reports"
            />


            {/* =================================================
                OVERVIEW
            ================================================= */}

            <section className="lab-dashboard-section">

                <div className="lab-section-heading">

                    <div>

                        <h2>
                            Laboratory Overview
                        </h2>

                        <p>
                            Today's laboratory workload
                        </p>

                    </div>

                </div>


                <div className="lab-stat-grid">

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

            <section className="lab-dashboard-section">

                <AppointmentChart />

            </section>


            {/* =================================================
                RECENT APPOINTMENTS
            ================================================= */}

            <section className="lab-dashboard-section">

                <div className="lab-dashboard-card">

                    <RecentAppointments />

                </div>

            </section>


            {/* =================================================
                RECENT PATIENTS
            ================================================= */}

            <section className="lab-dashboard-section">

                <div className="lab-dashboard-card">

                    <RecentPatients />

                </div>

            </section>


            {/* =================================================
                CALENDAR + QUICK ACTIONS
            ================================================= */}

            <section className="lab-dashboard-grid">

                <div className="lab-dashboard-card">

                    <DashboardCalendar />

                </div>


                <div className="lab-dashboard-card">

                    <QuickActions />

                </div>

            </section>


            {/* =================================================
                NOTIFICATIONS + ACTIVITY
            ================================================= */}

            <section className="lab-dashboard-grid">

                <div className="lab-dashboard-card">

                    <Notifications />

                </div>


                <div className="lab-dashboard-card">

                    <RecentActivity />

                </div>

            </section>

        </div>
    );
};


export default LabTechnicianDashboard;