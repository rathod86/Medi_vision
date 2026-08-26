import { useEffect, useState } from "react";

import "./QuickActions.css";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";
import { canAccessPath } from "../../../utils/roleConfig";

import {
  FaUserPlus,
  FaUserMd,
  FaCalendarPlus,
  FaFileInvoiceDollar,
  FaPills,
  FaFlask,
} from "react-icons/fa";


const QuickActions = () => {

  const navigate = useNavigate();
  const { userRole } = useAuth();

  const allActions = [
    {
      title: "Add Patient",
      icon: <FaUserPlus />,
      path: "/patients/add",
    },
    {
      title: "Add Doctor",
      icon: <FaUserMd />,
      path: "/doctors/add",
    },
    {
      title: "Book Appointment",
      icon: <FaCalendarPlus />,
      path: "/appointments/add",
    },
    {
      title: "Generate Bill",
      icon: <FaFileInvoiceDollar />,
      path: "/billing/add",
    },
    {
      title: "Add Medicine",
      icon: <FaPills />,
      path: "/medicines/add",
    },
    {
      title: "Lab Report",
      icon: <FaFlask />,
      path: "/lab-reports/add",
    },
  ];

  const actions = allActions.filter((action) =>
    canAccessPath(userRole, action.path)
  );


  return (
    <div className="quick-actions">

      <h3>Quick Actions</h3>

      {actions.length === 0 ? (
        <p className="quick-actions-empty">No quick actions available for your role.</p>
      ) : (
        <div className="action-grid">

          {actions.map((action) => (

            <button
              key={action.path}
              type="button"
              className="action-btn"
              onClick={() => navigate(action.path)}
            >
              <span className="action-icon">
                {action.icon}
              </span>

              <span>
                {action.title}
              </span>

            </button>

          ))}

        </div>
      )}

    </div>
  );
};

export default QuickActions;
