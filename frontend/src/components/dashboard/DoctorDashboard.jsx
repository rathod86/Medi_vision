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

import "./DoctorDashboard.css";

import { getAllAppointments } from "../../services/appointmentService";
import { resolveDoctorId } from "../../utils/entityResolver";

import { useAuth } from "../../context/AuthContext";

import {
    FaCalendarCheck,
    FaUserInjured,
    FaClock,
    FaCheckCircle,
} from "react-icons/fa";


const DoctorDashboard = () => {

    const { user } = useAuth();

    const [loading, setLoading] = useState(true);

    const [appointments, setAppointments] = useState([]);

    const [doctorStats, setDoctorStats] = useState({
        todayAppointments: 0,
        totalPatients: 0,
        pendingAppointments: 0,
        completedAppointments: 0,
    });


    // =====================================================
    // LOAD DOCTOR APPOINTMENTS
    // =====================================================

    useEffect(() => {

        const loadDoctorDashboard = async () => {

            try {

                setLoading(true);

                const response =
                    await getAllAppointments();


                const appointmentList =
                    Array.isArray(response)
                        ? response
                        : Array.isArray(response?.data)
                            ? response.data
                            : [];


                // -----------------------------------------
                // CURRENT DOCTOR ID
                // -----------------------------------------

                const doctorId =
                    await resolveDoctorId(user);


                // -----------------------------------------
                // FILTER APPOINTMENTS FOR THIS DOCTOR
                // -----------------------------------------

                const doctorAppointments =
                    appointmentList.filter(
                        (appointment) =>
                            Number(
                                appointment?.doctorId
                            ) === doctorId
                    );


                setAppointments(
                    doctorAppointments
                );


                // -----------------------------------------
                // TODAY
                // -----------------------------------------

                const today =
                    new Date();


                const todayString =
                    today.toISOString()
                        .split("T")[0];


                const todayAppointments =
                    doctorAppointments.filter(
                        (appointment) => {

                            if (
                                !appointment?.appointmentDate
                            ) {
                                return false;
                            }

                            return (
                                appointment
                                    .appointmentDate
                                    .toString()
                                    .split("T")[0]
                                    === todayString
                            );
                        }
                    );


                // -----------------------------------------
                // PENDING
                // -----------------------------------------

                const pendingAppointments =
                    doctorAppointments.filter(
                        (appointment) => {

                            const status =
                                appointment?.status
                                    ?.toString()
                                    .trim()
                                    .toLowerCase();

                            return (
                                status === "scheduled" ||
                                status === "pending" ||
                                status === "confirmed"
                            );
                        }
                    );


                // -----------------------------------------
                // COMPLETED
                // -----------------------------------------

                const completedAppointments =
                    doctorAppointments.filter(
                        (appointment) => {

                            const status =
                                appointment?.status
                                    ?.toString()
                                    .trim()
                                    .toLowerCase();

                            return (
                                status === "completed"
                            );
                        }
                    );


                // -----------------------------------------
                // UNIQUE PATIENTS
                // -----------------------------------------

                const uniquePatients =
                    new Set(
                        doctorAppointments
                            .map(
                                (appointment) =>
                                    appointment?.patientId
                            )
                            .filter(
                                (id) =>
                                    id !== null &&
                                    id !== undefined
                            )
                    );


                setDoctorStats({

                    todayAppointments:
                        todayAppointments.length,

                    totalPatients:
                        uniquePatients.size,

                    pendingAppointments:
                        pendingAppointments.length,

                    completedAppointments:
                        completedAppointments.length,
                });


            } catch (error) {

                console.error(
                    "Doctor dashboard load error:",
                    error
                );

            } finally {

                setLoading(false);
            }

        };


        if (user) {

            loadDoctorDashboard();

        }

    }, [user]);


    // =====================================================
    // STAT CARDS
    // =====================================================

    const dashboardStats = [

        {
            title: "Today's Appointments",

            value:
                doctorStats.todayAppointments,

            subtitle:
                "Appointments scheduled today",

            icon:
                <FaCalendarCheck />,

            color:
                "#0d6efd",
        },


        {
            title: "My Patients",

            value:
                doctorStats.totalPatients,

            subtitle:
                "Patients under your care",

            icon:
                <FaUserInjured />,

            color:
                "#198754",
        },


        {
            title: "Pending",

            value:
                doctorStats.pendingAppointments,

            subtitle:
                "Appointments awaiting completion",

            icon:
                <FaClock />,

            color:
                "#fd7e14",
        },


        {
            title: "Completed",

            value:
                doctorStats.completedAppointments,

            subtitle:
                "Completed appointments",

            icon:
                <FaCheckCircle />,

            color:
                "#20c997",
        },

    ];


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="doctor-dashboard">

                <Header
                    title="Doctor Dashboard"
                    subtitle="Manage your appointments and patients"
                />

                <div className="doctor-dashboard-loading">

                    <div className="spinner-border" />

                    <p>
                        Loading doctor dashboard...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // MAIN DASHBOARD
    // =====================================================

    return (

        <div className="doctor-dashboard">

            <Header
                title="Doctor Dashboard"
                subtitle="Manage your appointments and patients"
            />


            {/* =================================================
                OVERVIEW
            ================================================= */}

            <section className="doctor-dashboard-section">

                <div className="doctor-section-heading">

                    <div>

                        <h2>
                            Today's Overview
                        </h2>

                        <p>
                            Your current clinical activity
                        </p>

                    </div>

                </div>


                <div className="doctor-stat-grid">

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

            <section className="doctor-dashboard-section">

                <AppointmentChart />

            </section>


            {/* =================================================
                RECENT APPOINTMENTS + PATIENTS
            ================================================= */}

            <section className="doctor-dashboard-grid">

                <div className="doctor-dashboard-card">

                    <RecentAppointments />

                </div>


                <div className="doctor-dashboard-card">

                    <RecentPatients />

                </div>

            </section>


            {/* =================================================
                CALENDAR + QUICK ACTIONS
            ================================================= */}

            <section className="doctor-dashboard-grid">

                <div className="doctor-dashboard-card">

                    <DashboardCalendar />

                </div>


                <div className="doctor-dashboard-card">

                    <QuickActions />

                </div>

            </section>


            {/* =================================================
                NOTIFICATIONS + ACTIVITY
            ================================================= */}

            <section className="doctor-dashboard-grid">

                <div className="doctor-dashboard-card">

                    <Notifications />

                </div>


                <div className="doctor-dashboard-card">

                    <RecentActivity />

                </div>

            </section>

        </div>
    );
};


export default DoctorDashboard;