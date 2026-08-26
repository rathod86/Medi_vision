import React, { useEffect, useState } from "react";
import { getMedicineStatistics } from "../../services/medicineService";
import { toObject } from "../../utils/apiHelpers";
import "./MedicineStarts.css";

const MedicineStats = () => {

    const [stats, setStats] = useState({
        totalMedicines: 0,
        availableMedicines: 0,
        lowStockMedicines: 0,
        outOfStockMedicines: 0,
        expiringMedicines: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {

        fetchStatistics();

        const interval = setInterval(() => {
            fetchStatistics();
        }, 30000);

        return () => clearInterval(interval);

    }, []);

    const fetchStatistics = async () => {

        try {

            setLoading(true);

            const data = await getMedicineStatistics();

            setStats(toObject(data));

            setLastUpdated(new Date().toLocaleTimeString());

            setError("");

        } catch (err) {

            console.error(err);

            setError("Unable to load dashboard statistics.");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (
            <div className="medicine-stats-loading">
                Loading Dashboard...
            </div>
        );

    }

    if (error) {

        return (
            <div className="medicine-stats-error">
                {error}

                <button
                    className="refresh-btn"
                    onClick={fetchStatistics}
                >
                    Retry
                </button>

            </div>
        );

    }

    return (

        <div>

            <div className="stats-header">

                <h3>Medicine Dashboard</h3>

                <button
                    className="refresh-btn"
                    onClick={fetchStatistics}
                >
                    🔄 Refresh
                </button>

            </div>

            <div className="medicine-stats-container">

                <div className="stats-card total">

                    <div className="stats-icon">
                        💊
                    </div>

                    <div className="stats-content">

                        <h4>Total Medicines</h4>

                        <h2>{stats.totalMedicines}</h2>

                    </div>

                </div>

                <div className="stats-card available">

                    <div className="stats-icon">
                        ✅
                    </div>

                    <div className="stats-content">

                        <h4>Available</h4>

                        <h2>{stats.availableMedicines}</h2>

                    </div>

                </div>

                <div className="stats-card low-stock">

                    <div className="stats-icon">
                        ⚠️
                    </div>

                    <div className="stats-content">

                        <h4>Low Stock</h4>

                        <h2>{stats.lowStockMedicines}</h2>

                    </div>

                </div>

                <div className="stats-card out-stock">

                    <div className="stats-icon">
                        ❌
                    </div>

                    <div className="stats-content">

                        <h4>Out Of Stock</h4>

                        <h2>{stats.outOfStockMedicines}</h2>

                    </div>

                </div>

                <div className="stats-card expiring">

                    <div className="stats-icon">
                        ⏰
                    </div>

                    <div className="stats-content">

                        <h4>Expiring Soon</h4>

                        <h2>{stats.expiringMedicines}</h2>

                    </div>

                </div>

            </div>

            <div className="last-updated">
                Last Updated : {lastUpdated}
            </div>

        </div>

    );

};

export default MedicineStats;