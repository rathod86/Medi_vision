import { useEffect, useState } from "react";

import "./AppointmentChart.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import { getAllAppointments } from "../../../services/appointmentService";

import { toArray } from "../../../utils/apiHelpers";
import { resolveDoctorId, resolvePatientId } from "../../../utils/entityResolver";

import { useAuth } from "../../../context/AuthContext";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];


const AppointmentChart = () => {

    const { user } = useAuth();

    const [chartData, setChartData] =
        useState(null);


    useEffect(() => {

        const loadChart = async () => {

            try {

                const data =
                    toArray(
                        await getAllAppointments()
                    );


                const role =
                    user?.role
                        ?.trim()
                        .toUpperCase();


                let appointments =
                    data;


                // =================================================
                // DOCTOR → ONLY THEIR APPOINTMENTS
                // =================================================

                if (role === "DOCTOR") {

                    const doctorId =
                        await resolveDoctorId(user);

                    appointments =
                        data.filter(
                            (appointment) =>
                                Number(
                                    appointment?.doctorId
                                ) === doctorId
                        );
                }


                if (role === "PATIENT") {

                    const patientId =
                        await resolvePatientId(user);

                    appointments =
                        data.filter(
                            (appointment) =>
                                Number(
                                    appointment?.patientId
                                ) === patientId
                        );
                }


                const counts =
                    new Array(12).fill(0);


                appointments.forEach(
                    (item) => {

                        if (
                            !item?.appointmentDate
                        ) {
                            return;
                        }


                        const date =
                            new Date(
                                item.appointmentDate
                            );


                        if (
                            Number.isNaN(
                                date.getTime()
                            )
                        ) {
                            return;
                        }


                        counts[
                            date.getMonth()
                        ] += 1;

                    }
                );


                setChartData({

                    labels: MONTHS,

                    datasets: [
                        {
                            label:
                                role === "DOCTOR"
                                    ? "My Appointments"
                                    : "Appointments",

                            data:
                                counts,

                            borderColor:
                                "#0d6efd",

                            backgroundColor:
                                "rgba(13,110,253,0.2)",

                            fill: true,

                            tension: 0.4,

                            pointRadius: 5,

                            pointHoverRadius: 7,
                        },
                    ],
                });


            } catch (error) {

                console.error(
                    "Chart load error:",
                    error
                );

            }

        };


        if (user) {

            loadChart();

        }

    }, [user]);


    const options = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                position: "top",
            },

            title: {

                display: true,

                text:
                    user?.role
                        ?.toUpperCase() === "DOCTOR"
                        ? "My Monthly Appointments"
                        : "Monthly Appointment Statistics",
            },
        },

        scales: {

            y: {

                beginAtZero: true,

                ticks: {
                    precision: 0,
                },

            },

        },

    };


    if (!chartData) {

        return (

            <div className="appointment-chart">

                Loading appointment statistics...

            </div>
        );
    }


    return (

        <div className="appointment-chart">

            <div
                style={{
                    height: "420px",
                }}
            >

                <Line
                    data={chartData}
                    options={options}
                />

            </div>

        </div>
    );
};


export default AppointmentChart;