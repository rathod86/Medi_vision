import { useEffect, useState } from "react";

import Header from "../common/Header";

import StatCard from "../pages/dashboard/StatCard";
import DashboardCalendar from "../pages/dashboard/DashboardCalendar";
import RecentAppointments from "../pages/dashboard/RecentAppointments";
import RecentPatients from "../pages/dashboard/RecentPatients";
import QuickActions from "../pages/dashboard/QuickActions";
import TodaysAdmissions from "../pages/dashboard/TodaysAdmissions";
import TodaysDischarges from "../pages/dashboard/TodaysDischarges";
import Notifications from "../pages/dashboard/Notifications";
import RecentActivity from "../pages/dashboard/RecentActivity";

import "./ReceptionistDashboard.css";

import { getAllAppointments } from "../../services/appointmentService";
import { getAllPatients } from "../../services/patientService";

import { toArray } from "../../utils/apiHelpers";

import {
    FaCalendarCheck,
    FaUserInjured,
    FaHospital,
    FaUserPlus,
} from "react-icons/fa";


const ReceptionistDashboard = () => {

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        todayAppointments: 0,
        totalPatients: 0,
        activeAdmissions: 0,
        newPatientsToday: 0,
    });


    // =====================================================
    // LOAD DASHBOARD
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


                // =================================================
                // TOTAL PATIENTS
                // =================================================

                const totalPatients =
                    patients.length;


                // =================================================
                // ACTIVE ADMISSIONS
                // =================================================

                const activeAdmissions =
                    patients.filter(
                        (patient) => {

                            const status =
                                patient?.status
                                    ?.trim()
                                    .toLowerCase();

                            return (
                                status === "admitted" ||
                                status === "inpatient"
                            );
                        }
                    );


                // =================================================
                // NEW PATIENTS TODAY
                // =================================================

                /*
                 * We only calculate this when the patient
                 * response contains createdAt.
                 *
                 * Otherwise we don't invent a value.
                 */

                const newPatientsToday =
                    patients.filter(
                        (patient) => {

                            if (
                                !patient?.createdAt
                            ) {
                                return false;
                            }

                            return (
                                patient.createdAt
                                    .toString()
                                    .split("T")[0]
                                === todayString
                            );
                        }
                    );


                setStats({

                    todayAppointments:
                        todayAppointments.length,

                    totalPatients:
                        totalPatients,

                    activeAdmissions:
                        activeAdmissions.length,

                    newPatientsToday:
                        newPatientsToday.length,

                });


            } catch (error) {

                console.error(
                    "Receptionist dashboard load error:",
                    error
                );

            } finally {

                setLoading(false);
            }

        };


        loadDashboard();

    }, []);


    // =====================================================
    // STATISTICS
    // =====================================================

    const dashboardStats = [

        {
            title: "Today's Appointments",

            value:
                stats.todayAppointments,

            subtitle:
                "Scheduled for today",

            icon:
                <FaCalendarCheck />,

            color:
                "#0d6efd",
        },


        {
            title: "Total Patients",

            value:
                stats.totalPatients,

            subtitle:
                "Registered patients",

            icon:
                <FaUserInjured />,

            color:
                "#198754",
        },


        {
            title: "Active Admissions",

            value:
                stats.activeAdmissions,

            subtitle:
                "Currently admitted",

            icon:
                <FaHospital />,

            color:
                "#6f42c1",
        },


        {
            title: "New Patients",

            value:
                stats.newPatientsToday,

            subtitle:
                "Registered today",

            icon:
                <FaUserPlus />,

            color:
                "#fd7e14",
        },

    ];


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="receptionist-dashboard">

                <Header
                    title="Receptionist Dashboard"
                    subtitle="Manage appointments, patients and front-desk operations"
                />

                <div className="receptionist-dashboard-loading">

                    <div className="spinner-border" />

                    <p>
                        Loading receptionist dashboard...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    return (

        <div className="receptionist-dashboard">

            <Header
                title="Receptionist Dashboard"
                subtitle="Manage appointments, patients and front-desk operations"
            />


            {/* =================================================
                OVERVIEW
            ================================================= */}

            <section className="receptionist-dashboard-section">

                <div className="receptionist-section-heading">

                    <div>

                        <h2>
                            Front Desk Overview
                        </h2>

                        <p>
                            Today's hospital reception activity
                        </p>

                    </div>

                </div>


                <div className="receptionist-stat-grid">

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

            <section className="receptionist-dashboard-section">

                <div className="receptionist-dashboard-card">

                    <RecentAppointments />

                </div>

            </section>


            {/* =================================================
                PATIENTS
            ================================================= */}

            <section className="receptionist-dashboard-section">

                <div className="receptionist-dashboard-card">

                    <RecentPatients />

                </div>

            </section>


            {/* =================================================
                ADMISSIONS + DISCHARGES
            ================================================= */}

            <section className="receptionist-dashboard-grid">

                <div className="receptionist-dashboard-card">

                    <TodaysAdmissions />

                </div>


                <div className="receptionist-dashboard-card">

                    <TodaysDischarges />

                </div>

            </section>


            {/* =================================================
                CALENDAR + QUICK ACTIONS
            ================================================= */}

            <section className="receptionist-dashboard-grid">

                <div className="receptionist-dashboard-card">

                    <DashboardCalendar />

                </div>


                <div className="receptionist-dashboard-card">

                    <QuickActions />

                </div>

            </section>


            {/* =================================================
                NOTIFICATIONS + ACTIVITY
            ================================================= */}

            <section className="receptionist-dashboard-grid">

                <div className="receptionist-dashboard-card">

                    <Notifications />

                </div>


                <div className="receptionist-dashboard-card">

                    <RecentActivity />

                </div>

            </section>

        </div>
    );
};


export default ReceptionistDashboard;