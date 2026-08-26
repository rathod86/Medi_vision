package com.medivision.dto;

public class AppointmentStatusResponse {

    private long booked;

    private long completed;

    private long cancelled;

    public long getBooked() {
        return booked;
    }

    public void setBooked(long booked) {
        this.booked = booked;
    }

    public long getCompleted() {
        return completed;
    }

    public void setCompleted(long completed) {
        this.completed = completed;
    }

    public long getCancelled() {
        return cancelled;
    }

    public void setCancelled(long cancelled) {
        this.cancelled = cancelled;
    }
}