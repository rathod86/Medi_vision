import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {

    const [activeTab, setActiveTab] = useState("general");

    const [settings, setSettings] = useState({
        hospitalName: "Medi Vision Hospital",
        hospitalEmail: "",
        hospitalPhone: "",
        hospitalAddress: "",

        notificationsEnabled: true,
        emailNotifications: true,

        language: "English",
        dateFormat: "DD/MM/YYYY",

        darkMode: false
    });


    // =====================================================
    // HANDLE INPUT CHANGE
    // =====================================================

    const handleChange = (event) => {

        const { name, value, type, checked } =
            event.target;

        setSettings((previous) => ({
            ...previous,

            [name]:
                type === "checkbox"
                    ? checked
                    : value
        }));
    };


    // =====================================================
    // SAVE SETTINGS
    // =====================================================

    const handleSave = (event) => {

        event.preventDefault();

        // Backend integration can be added later.
        console.log(
            "Settings:",
            settings
        );

        alert(
            "Settings saved successfully."
        );
    };


    // =====================================================
    // RESET SETTINGS
    // =====================================================

    const handleReset = () => {

        const confirmed =
            window.confirm(
                "Are you sure you want to reset the settings?"
            );

        if (!confirmed) {
            return;
        }

        setSettings({
            hospitalName: "Medi Vision Hospital",
            hospitalEmail: "",
            hospitalPhone: "",
            hospitalAddress: "",

            notificationsEnabled: true,
            emailNotifications: true,

            language: "English",
            dateFormat: "DD/MM/YYYY",

            darkMode: false
        });
    };


    return (

        <div className="settings-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="settings-header">

                <div>
                    <h1>
                        Settings
                    </h1>

                    <p>
                        Manage hospital application
                        settings and preferences.
                    </p>
                </div>

            </div>


            {/* =================================================
                SETTINGS CONTAINER
            ================================================= */}

            <div className="settings-container">


                {/* =================================================
                    SIDEBAR
                ================================================= */}

                <div className="settings-sidebar">

                    <button
                        type="button"
                        className={
                            activeTab === "general"
                                ? "settings-tab active"
                                : "settings-tab"
                        }
                        onClick={() =>
                            setActiveTab("general")
                        }
                    >
                        General
                    </button>


                    <button
                        type="button"
                        className={
                            activeTab === "notifications"
                                ? "settings-tab active"
                                : "settings-tab"
                        }
                        onClick={() =>
                            setActiveTab(
                                "notifications"
                            )
                        }
                    >
                        Notifications
                    </button>


                    <button
                        type="button"
                        className={
                            activeTab === "preferences"
                                ? "settings-tab active"
                                : "settings-tab"
                        }
                        onClick={() =>
                            setActiveTab(
                                "preferences"
                            )
                        }
                    >
                        Preferences
                    </button>

                </div>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="settings-content">

                    <form
                        onSubmit={handleSave}
                    >


                        {/* =================================================
                            GENERAL
                        ================================================= */}

                        {activeTab === "general" && (

                            <section className="settings-section">

                                <div className="section-heading">

                                    <h2>
                                        Hospital Information
                                    </h2>

                                    <p>
                                        Configure the basic
                                        hospital information.
                                    </p>

                                </div>


                                <div className="settings-form-grid">

                                    <div className="settings-field">

                                        <label>
                                            Hospital Name
                                        </label>

                                        <input
                                            type="text"
                                            name="hospitalName"
                                            value={
                                                settings.hospitalName
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>


                                    <div className="settings-field">

                                        <label>
                                            Hospital Email
                                        </label>

                                        <input
                                            type="email"
                                            name="hospitalEmail"
                                            value={
                                                settings.hospitalEmail
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="hospital@example.com"
                                        />

                                    </div>


                                    <div className="settings-field">

                                        <label>
                                            Hospital Phone
                                        </label>

                                        <input
                                            type="tel"
                                            name="hospitalPhone"
                                            value={
                                                settings.hospitalPhone
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            placeholder="+91 XXXXX XXXXX"
                                        />

                                    </div>


                                    <div className="settings-field full-width">

                                        <label>
                                            Hospital Address
                                        </label>

                                        <textarea
                                            name="hospitalAddress"
                                            value={
                                                settings.hospitalAddress
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            rows="4"
                                            placeholder="Enter hospital address"
                                        />

                                    </div>

                                </div>

                            </section>

                        )}


                        {/* =================================================
                            NOTIFICATIONS
                        ================================================= */}

                        {activeTab === "notifications" && (

                            <section className="settings-section">

                                <div className="section-heading">

                                    <h2>
                                        Notification Settings
                                    </h2>

                                    <p>
                                        Control application
                                        notification preferences.
                                    </p>

                                </div>


                                <div className="settings-option">

                                    <div>

                                        <strong>
                                            Enable Notifications
                                        </strong>

                                        <p>
                                            Receive important
                                            application notifications.
                                        </p>

                                    </div>

                                    <label className="switch">

                                        <input
                                            type="checkbox"
                                            name="notificationsEnabled"
                                            checked={
                                                settings.notificationsEnabled
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span className="slider"></span>

                                    </label>

                                </div>


                                <div className="settings-option">

                                    <div>

                                        <strong>
                                            Email Notifications
                                        </strong>

                                        <p>
                                            Receive important
                                            notifications through email.
                                        </p>

                                    </div>

                                    <label className="switch">

                                        <input
                                            type="checkbox"
                                            name="emailNotifications"
                                            checked={
                                                settings.emailNotifications
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span className="slider"></span>

                                    </label>

                                </div>

                            </section>

                        )}


                        {/* =================================================
                            PREFERENCES
                        ================================================= */}

                        {activeTab === "preferences" && (

                            <section className="settings-section">

                                <div className="section-heading">

                                    <h2>
                                        Application Preferences
                                    </h2>

                                    <p>
                                        Configure language,
                                        date format and appearance.
                                    </p>

                                </div>


                                <div className="settings-form-grid">

                                    <div className="settings-field">

                                        <label>
                                            Language
                                        </label>

                                        <select
                                            name="language"
                                            value={
                                                settings.language
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        >

                                            <option value="English">
                                                English
                                            </option>

                                            <option value="Hindi">
                                                Hindi
                                            </option>

                                            <option value="Kannada">
                                                Kannada
                                            </option>

                                        </select>

                                    </div>


                                    <div className="settings-field">

                                        <label>
                                            Date Format
                                        </label>

                                        <select
                                            name="dateFormat"
                                            value={
                                                settings.dateFormat
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        >

                                            <option value="DD/MM/YYYY">
                                                DD/MM/YYYY
                                            </option>

                                            <option value="MM/DD/YYYY">
                                                MM/DD/YYYY
                                            </option>

                                            <option value="YYYY-MM-DD">
                                                YYYY-MM-DD
                                            </option>

                                        </select>

                                    </div>

                                </div>


                                <div className="settings-option">

                                    <div>

                                        <strong>
                                            Dark Mode
                                        </strong>

                                        <p>
                                            Use dark appearance
                                            throughout the application.
                                        </p>

                                    </div>

                                    <label className="switch">

                                        <input
                                            type="checkbox"
                                            name="darkMode"
                                            checked={
                                                settings.darkMode
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                        <span className="slider"></span>

                                    </label>

                                </div>

                            </section>

                        )}


                        {/* =================================================
                            ACTIONS
                        ================================================= */}

                        <div className="settings-actions">

                            <button
                                type="button"
                                className="reset-settings-button"
                                onClick={
                                    handleReset
                                }
                            >
                                Reset
                            </button>


                            <button
                                type="submit"
                                className="save-settings-button"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};


export default Settings;