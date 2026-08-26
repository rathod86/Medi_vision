import "./DoctorAvailability.css";

const DoctorAvailability = () => {

  const availability = [
    {
      day: "Monday",
      time: "09:00 AM - 05:00 PM",
      status: "Available",
    },
    {
      day: "Tuesday",
      time: "09:00 AM - 05:00 PM",
      status: "Available",
    },
    {
      day: "Wednesday",
      time: "09:00 AM - 05:00 PM",
      status: "Available",
    },
    {
      day: "Thursday",
      time: "10:00 AM - 04:00 PM",
      status: "Available",
    },
    {
      day: "Friday",
      time: "09:00 AM - 03:00 PM",
      status: "Available",
    },
    {
      day: "Saturday",
      time: "09:00 AM - 01:00 PM",
      status: "Available",
    },
    {
      day: "Sunday",
      time: "Holiday",
      status: "Off",
    },
  ];

  return (

    <div className="availability-card">

      <div className="availability-header">

        <h2>Doctor Availability</h2>

        <p>Weekly Consultation Schedule</p>

      </div>

      <table className="availability-table">

        <thead>

          <tr>

            <th>Day</th>

            <th>Consultation Time</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {availability.map((item, index) => (

            <tr key={index}>

              <td>{item.day}</td>

              <td>{item.time}</td>

              <td>

                <span
                  className={
                    item.status === "Available"
                      ? "status available"
                      : "status off"
                  }
                >
                  {item.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default DoctorAvailability;