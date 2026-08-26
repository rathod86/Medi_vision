import "./Notifications.css";
import {
  FaBell,
  FaUserPlus,
  FaCalendarCheck,
  FaPills,
  FaFileInvoiceDollar,
  FaFlask,
} from "react-icons/fa";

const Notifications = () => {

  const notifications = [
    {
      id: 1,
      icon: <FaUserPlus />,
      message: "New patient Rahul Kumar registered.",
      time: "5 mins ago",
    },
    {
      id: 2,
      icon: <FaCalendarCheck />,
      message: "Appointment booked with Dr. Sharma.",
      time: "15 mins ago",
    },
    {
      id: 3,
      icon: <FaPills />,
      message: "Medicine stock is running low.",
      time: "30 mins ago",
    },
    {
      id: 4,
      icon: <FaFlask />,
      message: "Lab report generated successfully.",
      time: "45 mins ago",
    },
    {
      id: 5,
      icon: <FaFileInvoiceDollar />,
      message: "Billing completed for Patient P105.",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="notifications">

      <div className="notification-header">
        <FaBell className="bell-icon" />
        <h3>Notifications</h3>
      </div>

      <div className="notification-list">

        {notifications.map((notification) => (

          <div
            key={notification.id}
            className="notification-item"
          >

            <div className="notification-icon">
              {notification.icon}
            </div>

            <div className="notification-content">

              <p>{notification.message}</p>

              <span>{notification.time}</span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Notifications;