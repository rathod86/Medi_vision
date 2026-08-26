import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
    getAllUsers,
    searchUsers,
    getUsersByRole,
    deleteUser,
    activateUser,
    deactivateUser,
    lockUser,
    unlockUser
} from "../../../services/userService";

import {
    FaPlus,
    FaSearch,
    FaEdit,
    FaEye,
    FaTrash,
    FaLock,
    FaUnlock,
    FaUserCheck,
    FaUserTimes,
    FaSyncAlt,
    FaTimes
} from "react-icons/fa";

import "./UserList.css";

const UserList = () => {

    // =====================================================
    // NAVIGATION
    // =====================================================

    const navigate = useNavigate();
    const location = useLocation();


    // =====================================================
    // STATE
    // =====================================================

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchInput, setSearchInput] = useState("");

    const [roleFilter, setRoleFilter] = useState("ALL");

    const [actionLoading, setActionLoading] = useState(null);

    const [successMessage, setSuccessMessage] = useState(
        location.state?.message || ""
    );


    const roleOptions = [
        "ALL",
        "ADMIN",
        "DOCTOR",
        "NURSE",
        "RECEPTIONIST",
        "LAB_TECHNICIAN",
        "PHARMACIST",
        "BILLING_STAFF"
    ];


    // =====================================================
    // LOAD USERS
    // =====================================================

    const loadUsers = async () => {

        try {

            setLoading(true);
            setError("");

            let data;

            const keyword = searchInput.trim();

            if (keyword) {

                data = await searchUsers(keyword);

            } else if (
                roleFilter !== "ALL"
            ) {

                data = await getUsersByRole(
                    roleFilter
                );

            } else {

                data = await getAllUsers();
            }

            setUsers(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.error(
                "Error loading users:",
                err
            );

            const status =
                err?.response?.status;

            const message =
                status === 403
                    ? "You do not have permission to manage users."
                    : err?.response?.data?.message ||
                    "Failed to load users.";

            setError(message);

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // LOAD ON FILTER / SEARCH CHANGE
    // =====================================================

    useEffect(() => {

        const timer = setTimeout(() => {

            loadUsers();

        }, 350);

        return () => clearTimeout(timer);

    }, [searchInput, roleFilter]);


    // =====================================================
    // SUCCESS MESSAGE FROM NAVIGATION
    // =====================================================

    useEffect(() => {

        if (!location.state?.message) {
            return;
        }

        setSuccessMessage(
            location.state.message
        );

        navigate(
            location.pathname,
            { replace: true, state: {} }
        );

        const timer = setTimeout(() => {

            setSuccessMessage("");

        }, 5000);

        return () => clearTimeout(timer);

    }, [location.state?.message]);


    // =====================================================
    // DELETE USER
    // =====================================================

    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this user?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setActionLoading(id);
            setError("");

            await deleteUser(id);

            setUsers((previousUsers) =>
                previousUsers.filter(
                    (user) => user.id !== id
                )
            );

        } catch (err) {

            console.error(
                "Delete user error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to delete user."
            );

        } finally {

            setActionLoading(null);
        }
    };


    // =====================================================
    // ACTIVATE / DEACTIVATE
    // =====================================================

    const handleToggleActive = async (user) => {

        try {

            setActionLoading(user.id);
            setError("");

            let updatedUser;

            if (user.active) {

                updatedUser =
                    await deactivateUser(user.id);

            } else {

                updatedUser =
                    await activateUser(user.id);
            }

            setUsers((previousUsers) =>
                previousUsers.map((item) =>
                    item.id === user.id
                        ? updatedUser
                        : item
                )
            );

        } catch (err) {

            console.error(
                "Account status error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to update account status."
            );

        } finally {

            setActionLoading(null);
        }
    };


    // =====================================================
    // LOCK / UNLOCK
    // =====================================================

    const handleToggleLock = async (user) => {

        try {

            setActionLoading(user.id);
            setError("");

            let updatedUser;

            if (user.accountLocked) {

                updatedUser =
                    await unlockUser(user.id);

            } else {

                updatedUser =
                    await lockUser(user.id);
            }

            setUsers((previousUsers) =>
                previousUsers.map((item) =>
                    item.id === user.id
                        ? updatedUser
                        : item
                )
            );

        } catch (err) {

            console.error(
                "Account lock error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to update lock status."
            );

        } finally {

            setActionLoading(null);
        }
    };


    // =====================================================
    // STATISTICS
    // =====================================================

    const statistics = useMemo(() => {

        const total = users.length;

        const active =
            users.filter(
                (user) => user.active === true
            ).length;

        const inactive =
            users.filter(
                (user) => user.active === false
            ).length;

        const locked =
            users.filter(
                (user) => user.accountLocked === true
            ).length;

        return {
            total,
            active,
            inactive,
            locked
        };

    }, [users]);


    // =====================================================
    // ROLE FORMAT
    // =====================================================

    const formatRole = (role) => {

        if (!role) {
            return "USER";
        }

        return role
            .replaceAll("_", " ")
            .toLowerCase()
            .replace(/\b\w/g, (letter) =>
                letter.toUpperCase()
            );
    };


    // =====================================================
    // DATE FORMAT
    // =====================================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        try {

            return new Date(date)
                .toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                });

        } catch {

            return "-";
        }
    };


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <div className="user-list-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="user-list-header">

                <div>

                    <h1>
                        User Management
                    </h1>

                    <p>
                        Manage hospital staff accounts,
                        roles and access.
                    </p>

                </div>


                <button
                    type="button"
                    className="add-user-btn"
                    onClick={() =>
                        navigate("/users/add")
                    }
                >
                    <FaPlus />

                    <span>
                        Add User
                    </span>

                </button>

            </div>


            {/* =================================================
                STATISTICS
            ================================================= */}

            <div className="user-statistics">

                <div className="user-stat-card">

                    <span className="stat-title">
                        Total Users
                    </span>

                    <strong>
                        {statistics.total}
                    </strong>

                </div>


                <div className="user-stat-card active-stat">

                    <span className="stat-title">
                        Active
                    </span>

                    <strong>
                        {statistics.active}
                    </strong>

                </div>


                <div className="user-stat-card inactive-stat">

                    <span className="stat-title">
                        Inactive
                    </span>

                    <strong>
                        {statistics.inactive}
                    </strong>

                </div>


                <div className="user-stat-card locked-stat">

                    <span className="stat-title">
                        Locked
                    </span>

                    <strong>
                        {statistics.locked}
                    </strong>

                </div>

            </div>


            {/* =================================================
                SEARCH + REFRESH
            ================================================= */}

            <div className="user-toolbar">

                <div className="user-search">

                    <FaSearch />

                    <input
                        type="text"
                        placeholder="Search by username, name or email..."
                        value={searchInput}
                        onChange={(event) =>
                            setSearchInput(
                                event.target.value
                            )
                        }
                    />

                </div>


                <select
                    className="user-role-filter"
                    value={roleFilter}
                    onChange={(event) =>
                        setRoleFilter(
                            event.target.value
                        )
                    }
                    aria-label="Filter by role"
                >

                    {roleOptions.map((role) => (
                        <option
                            key={role}
                            value={role}
                        >
                            {role === "ALL"
                                ? "All Roles"
                                : formatRole(role)}
                        </option>
                    ))}

                </select>


                <button
                    type="button"
                    className="refresh-btn"
                    onClick={loadUsers}
                    disabled={loading}
                >

                    <FaSyncAlt
                        className={
                            loading
                                ? "spinning"
                                : ""
                        }
                    />

                    Refresh

                </button>

            </div>


            {/* =================================================
                SUCCESS
            ================================================= */}

            {successMessage && (

                <div
                    className="user-success"
                    role="status"
                >

                    <span>
                        {successMessage}
                    </span>

                    <button
                        type="button"
                        className="dismiss-btn"
                        onClick={() =>
                            setSuccessMessage("")
                        }
                        aria-label="Dismiss message"
                    >
                        <FaTimes />
                    </button>

                </div>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {error && (

                <div
                    className="user-error"
                    role="alert"
                >
                    {error}
                </div>

            )}


            {/* =================================================
                LOADING
            ================================================= */}

            {loading ? (

                <div className="user-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading users...
                    </p>

                </div>

            ) : users.length === 0 ? (

                /* =================================================
                   EMPTY
                ================================================= */

                <div className="user-empty">

                    <h3>
                        No Users Found
                    </h3>

                    <p>
                        There are no users available.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/users/add")
                        }
                    >
                        <FaPlus />
                        Add First User
                    </button>

                </div>

            ) : (

                /* =================================================
                   TABLE
                ================================================= */

                <div className="user-table-container">

                    <table className="user-table">

                        <thead>

                            <tr>

                                <th>
                                    #
                                </th>

                                <th>
                                    User
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Phone
                                </th>

                                <th>
                                    Role
                                </th>

                                <th>
                                    Status
                                </th>

                                <th>
                                    Account
                                </th>

                                <th>
                                    Created
                                </th>

                                <th>
                                    Actions
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            {users.map((user, index) => (

                                <tr key={user.id}>

                                    {/* NUMBER */}

                                    <td>
                                        {index + 1}
                                    </td>


                                    {/* USER */}

                                    <td>

                                        <div className="user-info">

                                            <div className="user-avatar">

                                                {(
                                                    user.fullName ||
                                                    user.username ||
                                                    "U"
                                                )
                                                    .charAt(0)
                                                    .toUpperCase()}

                                            </div>


                                            <div>

                                                <strong>
                                                    {
                                                        user.fullName ||
                                                        user.username ||
                                                        "-"
                                                    }
                                                </strong>

                                                <small>
                                                    @
                                                    {
                                                        user.username ||
                                                        "-"
                                                    }
                                                </small>

                                            </div>

                                        </div>

                                    </td>


                                    {/* EMAIL */}

                                    <td>
                                        {user.email || "-"}
                                    </td>


                                    {/* PHONE */}

                                    <td>
                                        {user.phone || "-"}
                                    </td>


                                    {/* ROLE */}

                                    <td>

                                        <span className="role-badge">

                                            {formatRole(
                                                user.role
                                            )}

                                        </span>

                                    </td>


                                    {/* ACTIVE STATUS */}

                                    <td>

                                        {user.active ? (

                                            <span className="status-badge active">

                                                Active

                                            </span>

                                        ) : (

                                            <span className="status-badge inactive">

                                                Inactive

                                            </span>

                                        )}

                                    </td>


                                    {/* LOCK STATUS */}

                                    <td>

                                        {user.accountLocked ? (

                                            <span className="status-badge locked">

                                                Locked

                                            </span>

                                        ) : (

                                            <span className="status-badge unlocked">

                                                Unlocked

                                            </span>

                                        )}

                                    </td>


                                    {/* CREATED */}

                                    <td>
                                        {formatDate(
                                            user.createdAt
                                        )}
                                    </td>


                                    {/* ACTIONS */}

                                    <td>

                                        <div className="user-actions">

                                            {/* VIEW */}

                                            <button
                                                type="button"
                                                className="action-btn view"
                                                title="View User"
                                                onClick={() =>
                                                    navigate(
                                                        `/users/view/${user.id}`
                                                    )
                                                }
                                            >
                                                <FaEye />
                                            </button>


                                            {/* EDIT */}

                                            <button
                                                type="button"
                                                className="action-btn edit"
                                                title="Edit User"
                                                onClick={() =>
                                                    navigate(
                                                        `/users/edit/${user.id}`
                                                    )
                                                }
                                            >
                                                <FaEdit />
                                            </button>


                                            {/* ACTIVATE / DEACTIVATE */}

                                            <button
                                                type="button"
                                                className="action-btn status"
                                                title={
                                                    user.active
                                                        ? "Deactivate User"
                                                        : "Activate User"
                                                }
                                                disabled={
                                                    actionLoading ===
                                                    user.id
                                                }
                                                onClick={() =>
                                                    handleToggleActive(
                                                        user
                                                    )
                                                }
                                            >

                                                {user.active ? (
                                                    <FaUserTimes />
                                                ) : (
                                                    <FaUserCheck />
                                                )}

                                            </button>


                                            {/* LOCK / UNLOCK */}

                                            <button
                                                type="button"
                                                className="action-btn lock"
                                                title={
                                                    user.accountLocked
                                                        ? "Unlock User"
                                                        : "Lock User"
                                                }
                                                disabled={
                                                    actionLoading ===
                                                    user.id
                                                }
                                                onClick={() =>
                                                    handleToggleLock(
                                                        user
                                                    )
                                                }
                                            >

                                                {user.accountLocked ? (
                                                    <FaUnlock />
                                                ) : (
                                                    <FaLock />
                                                )}

                                            </button>


                                            {/* DELETE */}

                                            <button
                                                type="button"
                                                className="action-btn delete"
                                                title="Delete User"
                                                disabled={
                                                    actionLoading ===
                                                    user.id
                                                }
                                                onClick={() =>
                                                    handleDelete(
                                                        user.id
                                                    )
                                                }
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </div>
    );
};

export default UserList;