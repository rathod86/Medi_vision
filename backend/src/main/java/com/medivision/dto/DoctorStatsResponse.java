package com.medivision.dto;

public class DoctorStatsResponse {

    private long totalDoctors;
    private long activeDoctors;
    private long inactiveDoctors;
    private long onLeaveDoctors;

    public long getTotalDoctors() {
        return totalDoctors;
    }

    public void setTotalDoctors(long totalDoctors) {
        this.totalDoctors = totalDoctors;
    }

    public long getActiveDoctors() {
        return activeDoctors;
    }

    public void setActiveDoctors(long activeDoctors) {
        this.activeDoctors = activeDoctors;
    }

    public long getInactiveDoctors() {
        return inactiveDoctors;
    }

    public void setInactiveDoctors(long inactiveDoctors) {
        this.inactiveDoctors = inactiveDoctors;
    }

    public long getOnLeaveDoctors() {
        return onLeaveDoctors;
    }

    public void setOnLeaveDoctors(long onLeaveDoctors) {
        this.onLeaveDoctors = onLeaveDoctors;
    }
}