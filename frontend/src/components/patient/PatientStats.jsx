import { useEffect, useState } from "react";
import {
  FaUserInjured,
  FaMale,
  FaFemale,
  FaHospitalUser,
  FaHome,
  FaCalendarCheck,
} from "react-icons/fa";

import { getPatientStats } from "../../services/patientService";

import "./PatientStats.css";

const PatientStats = () => {

  const [stats, setStats] = useState({

    totalPatients: 0,

    malePatients: 0,

    femalePatients: 0,

    admittedPatients: 0,

    dischargedPatients: 0,

    todayRegistrations: 0,

  });

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats = async () => {

    try {

      const data = await getPatientStats();

      setStats(data);

    } catch (error) {

      console.error(error);

    }

  };

  const cards = [

    {
      title: "Total Patients",
      value: stats.totalPatients,
      icon: <FaUserInjured />,
      color: "#2563eb",
    },

    {
      title: "Male Patients",
      value: stats.malePatients,
      icon: <FaMale />,
      color: "#16a34a",
    },

    {
      title: "Female Patients",
      value: stats.femalePatients,
      icon: <FaFemale />,
      color: "#ec4899",
    },

    {
      title: "Admitted",
      value: stats.admittedPatients,
      icon: <FaHospitalUser />,
      color: "#ea580c",
    },

    {
      title: "Discharged",
      value: stats.dischargedPatients,
      icon: <FaHome />,
      color: "#7c3aed",
    },

    {
      title: "Today's Registration",
      value: stats.todayRegistrations,
      icon: <FaCalendarCheck />,
      color: "#0891b2",
    },

  ];

  return (

    <div className="patient-stats">

      {cards.map((item, index) => (

        <div
          key={index}
          className="patient-stat-card"
        >

          <div
            className="patient-stat-icon"
            style={{
              background: item.color,
            }}
          >
            {item.icon}
          </div>

          <div className="patient-stat-info">

            <h4>{item.title}</h4>

            <h2>{item.value}</h2>

          </div>

        </div>

      ))}

    </div>

  );

};

export default PatientStats;