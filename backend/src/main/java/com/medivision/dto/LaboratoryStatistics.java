package com.medivision.dto;

public class LaboratoryStatistics {

    // ==========================================
    // Overall Statistics
    // ==========================================

    private long totalReports;

    private long pendingReports;

    private long inProgressReports;

    private long completedReports;

    private long todayReports;

    // ==========================================
    // Getters and Setters
    // ==========================================

    public long getTotalReports() {
        return totalReports;
    }

    public void setTotalReports(long totalReports) {
        this.totalReports = totalReports;
    }

    public long getPendingReports() {
        return pendingReports;
    }

    public void setPendingReports(long pendingReports) {
        this.pendingReports = pendingReports;
    }

    public long getInProgressReports() {
        return inProgressReports;
    }

    public void setInProgressReports(long inProgressReports) {
        this.inProgressReports = inProgressReports;
    }

    public long getCompletedReports() {
        return completedReports;
    }

    public void setCompletedReports(long completedReports) {
        this.completedReports = completedReports;
    }

    public long getTodayReports() {
        return todayReports;
    }

    public void setTodayReports(long todayReports) {
        this.todayReports = todayReports;
    }

}