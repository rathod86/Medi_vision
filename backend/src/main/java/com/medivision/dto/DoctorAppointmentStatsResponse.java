package com.medivision.dto;

public class DoctorAppointmentStatsResponse {

    private String doctorName;
    private long appointmentCount;

    public DoctorAppointmentStatsResponse() {
    }

    public DoctorAppointmentStatsResponse(
            String doctorName,
            long appointmentCount) {

        this.doctorName = doctorName;
        this.appointmentCount = appointmentCount;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public long getAppointmentCount() {
        return appointmentCount;
    }

    public void setAppointmentCount(long appointmentCount) {
        this.appointmentCount = appointmentCount;
    }
}