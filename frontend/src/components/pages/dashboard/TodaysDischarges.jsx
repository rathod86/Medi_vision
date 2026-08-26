import { useEffect, useState } from "react";

import "./TodaysDischarges.css";
import { FaSignOutAlt } from "react-icons/fa";

import { getAllAdmissions } from "../../../services/admissionService";
import { toArray } from "../../../utils/apiHelpers";


const TodaysDischarges = () => {

  const [discharges, setDischarges] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const load = async () => {

      try {

        const today = new Date().toISOString().split("T")[0];
        const data = toArray(await getAllAdmissions());

        const todays = data.filter((admission) => {
          const date =
            admission.dischargeDate?.toString().split("T")[0];

          return date === today;
        });

        setDischarges(
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

        console.error("Today's discharges load error:", error);
        setDischarges([]);

      } finally {

        setLoading(false);
      }
    };

    load();

  }, []);


  return (
    <div className="todays-discharges">

      <div className="section-header">
        <FaSignOutAlt className="section-icon" />
        <h3>Today's Discharges</h3>
      </div>

      {loading ? (
        <div className="dashboard-widget-loading">Loading discharges...</div>
      ) : (
        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Ward</th>
              <th>Room</th>
            </tr>
          </thead>

          <tbody>

            {discharges.length === 0 ? (
              <tr>
                <td colSpan="5">No discharges today.</td>
              </tr>
            ) : (
              discharges.map((discharge) => (
                <tr key={discharge.id}>
                  <td>{discharge.id}</td>
                  <td>{discharge.patient}</td>
                  <td>{discharge.doctor}</td>
                  <td>{discharge.ward}</td>
                  <td>{discharge.room}</td>
                </tr>
              ))
            )}

          </tbody>

        </table>
      )}

    </div>
  );
};

export default TodaysDischarges;
