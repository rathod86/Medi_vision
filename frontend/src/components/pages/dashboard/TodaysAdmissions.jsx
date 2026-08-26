import { useEffect, useState } from "react";

import "./TodaysAdmissions.css";
import { FaHospitalUser } from "react-icons/fa";

import { getAllAdmissions } from "../../../services/admissionService";
import { toArray } from "../../../utils/apiHelpers";


const TodaysAdmissions = () => {

  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const load = async () => {

      try {

        const today = new Date().toISOString().split("T")[0];
        const data = toArray(await getAllAdmissions());

        const todays = data.filter((admission) => {
          const date =
            admission.admissionDate?.toString().split("T")[0];

          return date === today;
        });

        setAdmissions(
          todays.map((admission) => ({
            id:
              admission.admissionNumber ||
              admission.admissionCode ||
              admission.id,
            patient:
              admission.patientName ||
              admission.patient?.fullName ||
              "-",
            ward: admission.ward || admission.department || "-",
            room: admission.roomNumber || admission.room || "-",
            doctor:
              admission.doctorName ||
              admission.doctor?.fullName ||
              "-",
          }))
        );

      } catch (error) {

        console.error("Today's admissions load error:", error);
        setAdmissions([]);

      } finally {

        setLoading(false);
      }
    };

    load();

  }, []);


  return (
    <div className="todays-admissions">

      <div className="section-header">
        <FaHospitalUser className="section-icon" />
        <h3>Today's Admissions</h3>
      </div>

      {loading ? (
        <div className="dashboard-widget-loading">Loading admissions...</div>
      ) : (
        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Ward</th>
              <th>Room</th>
              <th>Doctor</th>
            </tr>
          </thead>

          <tbody>

            {admissions.length === 0 ? (
              <tr>
                <td colSpan="5">No admissions today.</td>
              </tr>
            ) : (
              admissions.map((admission) => (
                <tr key={admission.id}>
                  <td>{admission.id}</td>
                  <td>{admission.patient}</td>
                  <td>{admission.ward}</td>
                  <td>{admission.room}</td>
                  <td>{admission.doctor}</td>
                </tr>
              ))
            )}

          </tbody>

        </table>
      )}

    </div>
  );
};

export default TodaysAdmissions;
