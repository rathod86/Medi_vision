package com.medivision.dto;

public class PrescriptionStatisticsResponse {

    // ==========================================
    // Dashboard Statistics
    // ==========================================

    private long totalPrescriptions;

    private long todayPrescriptions;

    private long draftPrescriptions;

    private long issuedPrescriptions;

    private long dispensedPrescriptions;

    private long completedPrescriptions;

    private long cancelledPrescriptions;

    // ==========================================
    // Getters & Setters
    // ==========================================

    public long getTotalPrescriptions() {
        return totalPrescriptions;
    }

    public void setTotalPrescriptions(long totalPrescriptions) {
        this.totalPrescriptions = totalPrescriptions;
    }

    public long getTodayPrescriptions() {
        return todayPrescriptions;
    }

    public void setTodayPrescriptions(long todayPrescriptions) {
        this.todayPrescriptions = todayPrescriptions;
    }

    public long getDraftPrescriptions() {
        return draftPrescriptions;
    }

    public void setDraftPrescriptions(long draftPrescriptions) {
        this.draftPrescriptions = draftPrescriptions;
    }

    public long getIssuedPrescriptions() {
        return issuedPrescriptions;
    }

    public void setIssuedPrescriptions(long issuedPrescriptions) {
        this.issuedPrescriptions = issuedPrescriptions;
    }

    public long getDispensedPrescriptions() {
        return dispensedPrescriptions;
    }

    public void setDispensedPrescriptions(long dispensedPrescriptions) {
        this.dispensedPrescriptions = dispensedPrescriptions;
    }

    public long getCompletedPrescriptions() {
        return completedPrescriptions;
    }

    public void setCompletedPrescriptions(long completedPrescriptions) {
        this.completedPrescriptions = completedPrescriptions;
    }

    public long getCancelledPrescriptions() {
        return cancelledPrescriptions;
    }

    public void setCancelledPrescriptions(long cancelledPrescriptions) {
        this.cancelledPrescriptions = cancelledPrescriptions;
    }

}