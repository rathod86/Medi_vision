import { useEffect, useState } from "react";
import "./DoctorStats.css";

import {
  FaUserMd,
  FaUserCheck,
  FaUserTimes,
  FaUserClock,
} from "react-icons/fa";

import { getDoctorStats } from "../../services/doctorService";

const DoctorStats = () => {

  const [stats, setStats] = useState({
    totalDoctors: 0,
    activeDoctors: 0,
    inactiveDoctors: 0,
    onLeaveDoctors: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDoctorStats();
  }, []);

  const loadDoctorStats = async () => {
    try {

      const data = await getDoctorStats();

      setStats(data);

    } catch (error) {

      console.error("Failed to load doctor statistics", error);

    } finally {

      setLoading(false);

    }
  };

  const cards = [
    {
      title: "Total Doctors",
      value: stats.totalDoctors,
      icon: <FaUserMd />,
      color: "#2563eb",
    },
    {
      title: "Active Doctors",
      value: stats.activeDoctors,
      icon: <FaUserCheck />,
      color: "#16a34a",
    },
    {
      title: "On Leave",
      value: stats.onLeaveDoctors,
      icon: <FaUserClock />,
      color: "#f59e0b",
    },
    {
      title: "Inactive Doctors",
      value: stats.inactiveDoctors,
      icon: <FaUserTimes />,
      color: "#dc2626",
    },
  ];

  if (loading) {
    return <h3>Loading Doctor Statistics...</h3>;
  }

  return (

    <div className="doctor-stats">

      {cards.map((card, index) => (

        <div
          className="doctor-stat-card"
          key={index}
        >

          <div
            className="doctor-stat-icon"
            style={{ background: card.color }}
          >
            {card.icon}
          </div>

          <div className="doctor-stat-info">

            <h4>{card.title}</h4>

            <h2>{card.value}</h2>

          </div>

        </div>

      ))}

    </div>

  );

};

export default DoctorStats;