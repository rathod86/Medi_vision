import { useEffect, useState } from "react";

import "./RecentActivity.css";
import { FaHistory } from "react-icons/fa";

import { getFullDashboard } from "../../../services/dashboardService";
import { toObject } from "../../../utils/apiHelpers";


const RecentActivity = () => {

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const load = async () => {

      try {

        const data = toObject(await getFullDashboard());
        const items = [];

        if (data?.appointments?.today > 0) {
          items.push({
            id: "appointments-today",
            message: `${data.appointments.today} appointment(s) scheduled today`,
            time: "Today",
          });
        }

        if (data?.medicines?.lowStockMedicines > 0) {
          items.push({
            id: "low-stock",
            message: `${data.medicines.lowStockMedicines} medicine(s) low on stock`,
            time: "Inventory",
          });
        }

        if (data?.labReports?.pending > 0) {
          items.push({
            id: "lab-pending",
            message: `${data.labReports.pending} lab report(s) pending review`,
            time: "Laboratory",
          });
        }

        if (data?.billing?.pending > 0) {
          items.push({
            id: "billing-pending",
            message: `${data.billing.pending} bill(s) awaiting payment`,
            time: "Billing",
          });
        }

        if (data?.users?.total) {
          items.push({
            id: "users-total",
            message: `${data.users.active ?? data.users.total} active user accounts`,
            time: "System",
          });
        }

        setActivities(items);

      } catch (error) {

        console.error("Recent activity load error:", error);
        setActivities([]);

      } finally {

        setLoading(false);
      }
    };

    load();

  }, []);


  return (

    <div className="recent-activity">

      <div className="recent-activity-header">

        <FaHistory />

        <h3>
          Recent Activity
        </h3>

      </div>


      {loading ? (
        <div className="dashboard-widget-loading">Loading activity...</div>
      ) : activities.length === 0 ? (
        <div className="recent-activity-empty">
          <p>No recent activity available.</p>
        </div>
      ) : (
        <ul className="recent-activity-list">
          {activities.map((item) => (
            <li key={item.id} className="recent-activity-item">
              <span className="recent-activity-message">{item.message}</span>
              <span className="recent-activity-time">{item.time}</span>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
};


export default RecentActivity;
