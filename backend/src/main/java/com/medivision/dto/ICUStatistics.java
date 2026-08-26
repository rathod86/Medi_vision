package com.medivision.dto;

public class ICUStatistics {

    // ==========================================
    // Dashboard Statistics
    // ==========================================

    private Long totalICURecords;

    private Long todayAdmissions;

    private Long criticalPatients;

    private Long ventilatorPatients;

    private Long isolationPatients;

    private Long dischargedPatients;

    // ==========================================
    // Constructors
    // ==========================================

    public ICUStatistics() {
    }

    public ICUStatistics(
            Long totalICURecords,
            Long todayAdmissions,
            Long criticalPatients,
            Long ventilatorPatients,
            Long isolationPatients,
            Long dischargedPatients) {

        this.totalICURecords = totalICURecords;
        this.todayAdmissions = todayAdmissions;
        this.criticalPatients = criticalPatients;
        this.ventilatorPatients = ventilatorPatients;
        this.isolationPatients = isolationPatients;
        this.dischargedPatients = dischargedPatients;
    }

    // ==========================================
    // Getters & Setters
    // ==========================================

    public Long getTotalICURecords() {
        return totalICURecords;
    }

    public void setTotalICURecords(Long totalICURecords) {
        this.totalICURecords = totalICURecords;
    }

    public Long getTodayAdmissions() {
        return todayAdmissions;
    }

    public void setTodayAdmissions(Long todayAdmissions) {
        this.todayAdmissions = todayAdmissions;
    }

    public Long getCriticalPatients() {
        return criticalPatients;
    }

    public void setCriticalPatients(Long criticalPatients) {
        this.criticalPatients = criticalPatients;
    }

    public Long getVentilatorPatients() {
        return ventilatorPatients;
    }

    public void setVentilatorPatients(Long ventilatorPatients) {
        this.ventilatorPatients = ventilatorPatients;
    }

    public Long getIsolationPatients() {
        return isolationPatients;
    }

    public void setIsolationPatients(Long isolationPatients) {
        this.isolationPatients = isolationPatients;
    }

    public Long getDischargedPatients() {
        return dischargedPatients;
    }

    public void setDischargedPatients(Long dischargedPatients) {
        this.dischargedPatients = dischargedPatients;
    }

}