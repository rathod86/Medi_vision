import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import {
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
  FaEnvelope,
  FaPhone,
  FaUserTag
} from "react-icons/fa";
import logo from "../../assets/images/Logos.jpg";
import { useAuth } from "../../context/AuthContext";
import { getRoleDisplayName } from "../../utils/roleConfig";

const getDisplayName = (user) => {
  if (!user) {
    return "User";
  }

  if (user.fullName?.trim()) {
    return user.fullName.trim();
  }

  if (user.username?.trim()) {
    return user.username.trim();
  }

  if (user.email) {
    const localPart = user.email.split("@")[0];
    return localPart.charAt(0).toUpperCase() + localPart.slice(1);
  }

  return "User";
};

const getRoleLabel = (role) => {
  return getRoleDisplayName(role) || "User";
};

const Navbar = () => {
  const [notificationCount] = useState(3);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const displayName = getDisplayName(user);
  const roleLabel = getRoleLabel(user?.role);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar-container">
      <div className="logo-container">
        <img src={logo} alt="Medi Vision Logo" className="logo" />
        <h3>Medi Vision</h3>
      </div>

      <div className="navbar-right">
        <button type="button" className="notification-btn" aria-label="Notifications">
          <FaBell />
          <span className="notification-badge">
            {notificationCount}
          </span>
        </button>

        <div className="profile-menu" ref={profileRef}>
          <button
            type="button"
            className={`user-profile ${profileOpen ? "active" : ""}`}
            onClick={() => setProfileOpen((open) => !open)}
            aria-expanded={profileOpen}
            aria-haspopup="true"
          >
            <FaUserCircle className="user-icon" />
            <div className="user-profile-text">
              <h6>{displayName}</h6>
              <small>{roleLabel}</small>
            </div>
            <FaChevronDown className={`profile-chevron ${profileOpen ? "open" : ""}`} />
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <FaUserCircle className="profile-dropdown-avatar" />
                <div>
                  <strong>{displayName}</strong>
                  <span className="profile-role-badge">{roleLabel}</span>
                </div>
              </div>

              <div className="profile-dropdown-body">
                {user?.email && (
                  <div className="profile-info-row">
                    <FaEnvelope />
                    <span>{user.email}</span>
                  </div>
                )}

                {user?.phone && (
                  <div className="profile-info-row">
                    <FaPhone />
                    <span>{user.phone}</span>
                  </div>
                )}

                {user?.username && (
                  <div className="profile-info-row">
                    <FaUserTag />
                    <span>@{user.username}</span>
                  </div>
                )}
              </div>

              <div className="profile-dropdown-actions">
                <Link
                  to="/settings"
                  className="profile-action-btn"
                  onClick={() => setProfileOpen(false)}
                >
                  <FaCog />
                  Settings
                </Link>

                <button
                  type="button"
                  className="profile-action-btn logout"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;