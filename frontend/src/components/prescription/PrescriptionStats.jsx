import React, { useEffect, useState } from "react";

import {
    getPrescriptionStatistics,
} from "../../services/prescriptionService";

import { toObject } from "../../utils/apiHelpers";

const PrescriptionStats = () => {

    const [stats, setStats] = useState({

        totalPrescriptions: 0,

        todayPrescriptions: 0,

        draftPrescriptions: 0,

        issuedPrescriptions: 0,

        dispensedPrescriptions: 0,

        completedPrescriptions: 0,

        cancelledPrescriptions: 0

    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadStatistics();

    }, []);

    const loadStatistics = async () => {

        try {

            const data =
                await getPrescriptionStatistics();

            setStats(toObject(data));

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="stats-loading">

                Loading Dashboard...

            </div>

        );

    }

    return (

        <div className="prescription-stats">

            <div className="stats-card total">

                <h3>Total</h3>

                <h2>{stats.totalPrescriptions}</h2>

            </div>

            <div className="stats-card today">

                <h3>Today</h3>

                <h2>{stats.todayPrescriptions}</h2>

            </div>

            <div className="stats-card draft">

                <h3>Draft</h3>

                <h2>{stats.draftPrescriptions}</h2>

            </div>

            <div className="stats-card issued">

                <h3>Issued</h3>

                <h2>{stats.issuedPrescriptions}</h2>

            </div>

            <div className="stats-card dispensed">

                <h3>Dispensed</h3>

                <h2>{stats.dispensedPrescriptions}</h2>

            </div>

            <div className="stats-card completed">

                <h3>Completed</h3>

                <h2>{stats.completedPrescriptions}</h2>

            </div>

            <div className="stats-card cancelled">

                <h3>Cancelled</h3>

                <h2>{stats.cancelledPrescriptions}</h2>

            </div>

        </div>

    );

};

export default PrescriptionStats;