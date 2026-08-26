import { useEffect, useState } from "react";

import Header from "../common/Header";

import StatCard from "../pages/dashboard/StatCard";
import AppointmentChart from "../pages/dashboard/AppointmentChart";
import DashboardCalendar from "../pages/dashboard/DashboardCalendar";
import RecentAppointments from "../pages/dashboard/RecentAppointments";
import QuickActions from "../pages/dashboard/QuickActions";
import Notifications from "../pages/dashboard/Notifications";
import RecentActivity from "../pages/dashboard/RecentActivity";

import "./PatientDashboard.css";

import { getAllAppointments } from "../../services/appointmentService";
import { resolvePatientId } from "../../utils/entityResolver";

import { useAuth } from "../../context/AuthContext";

import {
    FaCalendarCheck,
    FaClock,
    FaCheckCircle,
    FaUserMd,
} from "react-icons/fa";


const PatientDashboard = () => {

    const { user } = useAuth();

    const [loading, setLoading] = useState(true);

    const [patientStats, setPatientStats] = useState({
        totalAppointments: 0,
        upcomingAppointments: 0,
        completedAppointments: 0,
        totalDoctors: 0,
    });


    // =====================================================
    // LOAD PATIENT DASHBOARD
    // =====================================================

    useEffect(() => {

        const loadPatientDashboard = async () => {

            try {

                setLoading(true);

                const response =
                    await getAllAppointments();

                const allAppointments =
                    Array.isArray(response)
                        ? response
                        : Array.isArray(response?.data)
                            ? response.data
                            : [];


                const patientId =
                    await resolvePatientId(user);


                // =================================================
                // ONLY CURRENT PATIENT APPOINTMENTS
                // =================================================

                const patientAppointments =
                    allAppointments.filter(
                        (appointment) =>
                            Number(
                                appointment?.patientId
                            ) === patientId
                    );


                // =================================================
                // TODAY
                // =================================================

                const today =
                    new Date();

                today.setHours(
                    0,
                    0,
                    0,
                    0
                );


                // =================================================
                // UPCOMING
                // =================================================

                const upcomingAppointments =
                    patientAppointments.filter(
                        (appointment) => {

                            if (
                                !appointment?.appointmentDate
                            ) {
                                return false;
                            }

                            const appointmentDate =
                                new Date(
                                    appointment.appointmentDate
                                );

                            if (
                                Number.isNaN(
                                    appointmentDate.getTime()
                                )
                            ) {
                                return false;
                            }

                            appointmentDate.setHours(
                                0,
                                0,
                                0,
                                0
                            );


                            const status =
                                appointment?.status
                                    ?.trim()
                                    .toLowerCase();


                            return (
                                appointmentDate >= today &&
                                status !== "cancelled" &&
                                status !== "completed"
                            );
                        }
                    );


                // =================================================
                // COMPLETED
                // =================================================

                const completedAppointments =
                    patientAppointments.filter(
                        (appointment) => {

                            const status =
                                appointment?.status
                                    ?.trim()
                                    .toLowerCase();

                            return (
                                status === "completed"
                            );
                        }
                    );


                // =================================================
                // UNIQUE DOCTORS
                // =================================================

                const doctorIds =
                    new Set(
                        patientAppointments
                            .map(
                                (appointment) =>
                                    appointment?.doctorId
                            )
                            .filter(
                                (id) =>
                                    id !== null &&
                                    id !== undefined
                            )
                    );


                setPatientStats({

                    totalAppointments:
                        patientAppointments.length,

                    upcomingAppointments:
                        upcomingAppointments.length,

                    completedAppointments:
                        completedAppointments.length,

                    totalDoctors:
                        doctorIds.size,

                });


            } catch (error) {

                console.error(
                    "Patient dashboard load error:",
                    error
                );

            } finally {

                setLoading(false);
            }

        };


        if (user) {

            loadPatientDashboard();

        }

    }, [user]);


    // =====================================================
    // PATIENT STATISTICS
    // =====================================================

    const dashboardStats = [

        {
            title: "My Appointments",

            value:
                patientStats.totalAppointments,

            subtitle:
                "Total appointments",

            icon:
                <FaCalendarCheck />,

            color:
                "#0d6efd",
        },


        {
            title: "Upcoming",

            value:
                patientStats.upcomingAppointments,

            subtitle:
                "Upcoming appointments",

            icon:
                <FaClock />,

            color:
                "#fd7e14",
        },


        {
            title: "Completed",

            value:
                patientStats.completedAppointments,

            subtitle:
                "Completed appointments",

            icon:
                <FaCheckCircle />,

            color:
                "#198754",
        },


        {
            title: "My Doctors",

            value:
                patientStats.totalDoctors,

            subtitle:
                "Doctors consulted",

            icon:
                <FaUserMd />,

            color:
                "#6f42c1",
        },

    ];


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="patient-dashboard">

                <Header
                    title="Patient Dashboard"
                    subtitle="Manage your healthcare and appointments"
                />

                <div className="patient-dashboard-loading">

                    <div className="spinner-border" />

                    <p>
                        Loading your dashboard...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    return (

        <div className="patient-dashboard">

            <Header
                title="Patient Dashboard"
                subtitle="Manage your healthcare and appointments"
            />


            {/* =================================================
                OVERVIEW
            ================================================= */}

            <section className="patient-dashboard-section">

                <div className="patient-section-heading">

                    <div>

                        <h2>
                            My Healthcare Overview
                        </h2>

                        <p>
                            Your appointments and healthcare activity
                        </p>

                    </div>

                </div>


                <div className="patient-stat-grid">

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
                APPOINTMENT CHART
            ================================================= */}

            <section className="patient-dashboard-section">

                <AppointmentChart />

            </section>


            {/* =================================================
                MY APPOINTMENTS
            ================================================= */}

            <section className="patient-dashboard-section">

                <div className="patient-dashboard-card">

                    <RecentAppointments />

                </div>

            </section>


            {/* =================================================
                CALENDAR + QUICK ACTIONS
            ================================================= */}

            <section className="patient-dashboard-grid">

                <div className="patient-dashboard-card">

                    <DashboardCalendar />

                </div>


                <div className="patient-dashboard-card">

                    <QuickActions />

                </div>

            </section>


            {/* =================================================
                NOTIFICATIONS + ACTIVITY
            ================================================= */}

            <section className="patient-dashboard-grid">

                <div className="patient-dashboard-card">

                    <Notifications />

                </div>


                <div className="patient-dashboard-card">

                    <RecentActivity />

                </div>

            </section>

        </div>
    );
};


export default PatientDashboard;