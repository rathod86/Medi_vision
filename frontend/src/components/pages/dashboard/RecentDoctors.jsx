import { useEffect, useState } from "react";

import "./RecentDoctors.css";

import { getAllDoctors } from "../../../services/doctorService";
import { toArray } from "../../../utils/apiHelpers";


const RecentDoctors = () => {

  const [doctors, setDoctors] = useState([]);


  useEffect(() => {

    const loadDoctors = async () => {

      try {

        const data =
          toArray(await getAllDoctors());

        setDoctors(
          data.slice(0, 5)
        );

      } catch (error) {

        console.error(error);

      }
    };

    loadDoctors();

  }, []);


  return (
    <div className="recent-doctors">

      <h3>Recent Doctors</h3>

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Experience</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {doctors.length === 0 ? (

            <tr>
              <td colSpan="5">
                No doctors found.
              </td>
            </tr>

          ) : doctors.map((doctor) => (

            <tr key={doctor.id}>

              <td>
                {doctor.doctorCode ||
                  doctor.id}
              </td>

              <td>
                {doctor.fullName || "-"}
              </td>

              <td>
                {doctor.department || "-"}
              </td>

              <td>
                {doctor.experience
                  ? `${doctor.experience} Years`
                  : "-"}
              </td>

              <td>
                <span
                  className={
                    (doctor.status || "active")
                      .toLowerCase()
                      .replace(" ", "-")
                  }
                >
                  {doctor.status || "Active"}
                </span>
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default RecentDoctors;
