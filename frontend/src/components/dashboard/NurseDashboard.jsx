import { useEffect, useState } from "react";

import Header from "../common/Header";

import StatCard from "../pages/dashboard/StatCard";
import AppointmentChart from "../pages/dashboard/AppointmentChart";
import DashboardCalendar from "../pages/dashboard/DashboardCalendar";
import RecentAppointments from "../pages/dashboard/RecentAppointments";
import RecentPatients from "../pages/dashboard/RecentPatients";
import QuickActions from "../pages/dashboard/QuickActions";
import TodaysAdmissions from "../pages/dashboard/TodaysAdmissions";
import TodaysDischarges from "../pages/dashboard/TodaysDischarges";
import BedOccupancy from "../pages/dashboard/BedOccupancy";
import Notifications from "../pages/dashboard/Notifications";
import RecentActivity from "../pages/dashboard/RecentActivity";

import "./NurseDashboard.css";

import { getAllAppointments } from "../../services/appointmentService";
import { getAllPatients } from "../../services/patientService";

import { toArray } from "../../utils/apiHelpers";

import {
    FaUserInjured,
    FaCalendarCheck,
    FaHospital,
    FaBed,
} from "react-icons/fa";


const NurseDashboard = () => {

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        totalPatients: 0,
        todayAppointments: 0,
        activeAdmissions: 0,
        availableBeds: 0,
    });


    // =====================================================
    // LOAD NURSE DASHBOARD DATA
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
                                status === "inpatient" ||
                                status === "active"
                            );
                        }
                    );


                setStats({

                    totalPatients:
                        patients.length,

                    todayAppointments:
                        todayAppointments.length,

                    activeAdmissions:
                        activeAdmissions.length,

                    /*
                     * We don't have a confirmed bed API yet.
                     * Therefore we intentionally do not invent
                     * a number here.
                     */
                    availableBeds: 0,
                });


            } catch (error) {

                console.error(
                    "Nurse dashboard load error:",
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
                "Scheduled today",

            icon:
                <FaCalendarCheck />,

            color:
                "#198754",
        },


        {
            title: "Active Admissions",

            value:
                stats.activeAdmissions,

            subtitle:
                "Patients currently admitted",

            icon:
                <FaHospital />,

            color:
                "#6f42c1",
        },


        {
            title: "Available Beds",

            value:
                stats.availableBeds,

            subtitle:
                "Currently available",

            icon:
                <FaBed />,

            color:
                "#20c997",
        },

    ];


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="nurse-dashboard">

                <Header
                    title="Nurse Dashboard"
                    subtitle="Manage patients and daily clinical activities"
                />

                <div className="nurse-dashboard-loading">

                    <div className="spinner-border" />

                    <p>
                        Loading nurse dashboard...
                    </p>

                </div>

            </div>
        );
    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    return (

        <div className="nurse-dashboard">

            <Header
                title="Nurse Dashboard"
                subtitle="Manage patients and daily clinical activities"
            />


            {/* =================================================
                OVERVIEW
            ================================================= */}

            <section className="nurse-dashboard-section">

                <div className="nurse-section-heading">

                    <div>

                        <h2>
                            Today's Overview
                        </h2>

                        <p>
                            Current patient and clinical activity
                        </p>

                    </div>

                </div>


                <div className="nurse-stat-grid">

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

            <section className="nurse-dashboard-section">

                <AppointmentChart />

            </section>


            {/* =================================================
                PATIENTS + APPOINTMENTS
            ================================================= */}

            <section className="nurse-dashboard-grid">

                <div className="nurse-dashboard-card">

                    <RecentPatients />

                </div>


                <div className="nurse-dashboard-card">

                    <RecentAppointments />

                </div>

            </section>


            {/* =================================================
                ADMISSIONS + DISCHARGES
            ================================================= */}

            <section className="nurse-dashboard-grid">

                <div className="nurse-dashboard-card">

                    <TodaysAdmissions />

                </div>


                <div className="nurse-dashboard-card">

                    <TodaysDischarges />

                </div>

            </section>


            {/* =================================================
                BED OCCUPANCY
            ================================================= */}

            <section className="nurse-dashboard-section">

                <BedOccupancy />

            </section>


            {/* =================================================
                CALENDAR + QUICK ACTIONS
            ================================================= */}

            <section className="nurse-dashboard-grid">

                <div className="nurse-dashboard-card">

                    <DashboardCalendar />

                </div>


                <div className="nurse-dashboard-card">

                    <QuickActions />

                </div>

            </section>


            {/* =================================================
                NOTIFICATIONS + ACTIVITY
            ================================================= */}

            <section className="nurse-dashboard-grid">

                <div className="nurse-dashboard-card">

                    <Notifications />

                </div>


                <div className="nurse-dashboard-card">

                    <RecentActivity />

                </div>

            </section>

        </div>
    );
};


export default NurseDashboard;