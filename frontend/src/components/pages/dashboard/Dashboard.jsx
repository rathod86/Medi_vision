import { useEffect, useState } from "react";

import Header from "../../common/Header";
import StatCard from "./StatCard";
import "./Dashboard.css";
import AppointmentChart from "./AppointmentChart";
import RecentAppointments from "./RecentAppointments";
import RecentPatients from "./RecentPatients";
import RecentDoctors from "./RecentDoctors";
import QuickActions from "./QuickActions";
import TodaysAdmissions from "./TodaysAdmissions";
import TodaysDischarges from "./TodaysDischarges";
import BedOccupancy from "./BedOccupancy";
import Notifications from "./Notifications";
import RecentActivity from "./RecentActivity";

import { getFullDashboard } from "../../../services/dashboardService";

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


const Dashboard = () => {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const loadDashboard = async () => {

      try {

        setLoading(true);

        const data = await getFullDashboard();

        setStats(data);

      } catch (error) {

        console.error(
          "Dashboard load error:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    loadDashboard();

  }, []);


  const overview = stats?.overview || {};

  const billing = stats?.billing || {};

  const labReports = stats?.labReports || {};

  const icuRecords = stats?.icuRecords || {};

  const admissions = stats?.admissions || {};


  const dashboardStats = [
    {
      title: "Doctors",
      value: overview.totalDoctors ?? 0,
      subtitle: "Registered Doctors",
      icon: <FaUserMd />,
      color: "#0d6efd",
    },
    {
      title: "Patients",
      value: overview.totalPatients ?? 0,
      subtitle: "Registered Patients",
      icon: <FaUserInjured />,
      color: "#198754",
    },
    {
      title: "Appointments",
      value: overview.todayAppointments ?? 0,
      subtitle: "Today's Appointments",
      icon: <FaCalendarCheck />,
      color: "#fd7e14",
    },
    {
      title: "Admissions",
      value: admissions.active ?? overview.totalAdmissions ?? 0,
      subtitle: "Active Admissions",
      icon: <FaHospital />,
      color: "#6f42c1",
    },
    {
      title: "Revenue",
      value: billing.totalRevenue
        ? `₹${Number(billing.totalRevenue).toLocaleString("en-IN")}`
        : "₹0",
      subtitle: "Total Revenue",
      icon: <FaMoneyBillWave />,
      color: "#dc3545",
    },
    {
      title: "Medicines",
      value: overview.totalMedicines ?? 0,
      subtitle: "Available Medicines",
      icon: <FaPills />,
      color: "#20c997",
    },
    {
      title: "Lab Reports",
      value: labReports.total ?? 0,
      subtitle: "Generated Reports",
      icon: <FaFlask />,
      color: "#6610f2",
    },
    {
      title: "ICU Records",
      value: icuRecords.active ?? icuRecords.total ?? 0,
      subtitle: "Current ICU Patients",
      icon: <FaProcedures />,
      color: "#0dcaf0",
    },
  ];


  return (
    <div className="dashboard">

      <Header
        title="Dashboard"
        subtitle="Welcome to Medi Vision Hospital Management System"
      />

      {loading ? (

        <div className="dashboard-loading">
          Loading dashboard data...
        </div>

      ) : (

        <>
          <div className="dashboard-content">
            {dashboardStats.map((card, index) => (
              <StatCard
                key={index}
                title={card.title}
                value={card.value}
                subtitle={card.subtitle}
                icon={card.icon}
                color={card.color}
              />
            ))}
          </div>

          <AppointmentChart />
          <RecentAppointments />
          <RecentPatients />
          <RecentDoctors />
          <QuickActions />
          <TodaysAdmissions />
          <TodaysDischarges />
          <BedOccupancy />
          <Notifications />
          <RecentActivity />
        </>

      )}

    </div>
  );
};

export default Dashboard;
