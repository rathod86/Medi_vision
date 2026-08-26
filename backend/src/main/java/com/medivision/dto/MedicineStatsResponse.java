package com.medivision.dto;

public class MedicineStatsResponse {

    private long totalMedicines;
    private long availableMedicines;
    private long lowStockMedicines;
    private long outOfStockMedicines;
    private long expiringMedicines;

    public MedicineStatsResponse() {
    }

    public MedicineStatsResponse(long totalMedicines,
                                 long availableMedicines,
                                 long lowStockMedicines,
                                 long outOfStockMedicines,
                                 long expiringMedicines) {
        this.totalMedicines = totalMedicines;
        this.availableMedicines = availableMedicines;
        this.lowStockMedicines = lowStockMedicines;
        this.outOfStockMedicines = outOfStockMedicines;
        this.expiringMedicines = expiringMedicines;
    }

    public long getTotalMedicines() {
        return totalMedicines;
    }

    public void setTotalMedicines(long totalMedicines) {
        this.totalMedicines = totalMedicines;
    }

    public long getAvailableMedicines() {
        return availableMedicines;
    }

    public void setAvailableMedicines(long availableMedicines) {
        this.availableMedicines = availableMedicines;
    }

    public long getLowStockMedicines() {
        return lowStockMedicines;
    }

    public void setLowStockMedicines(long lowStockMedicines) {
        this.lowStockMedicines = lowStockMedicines;
    }

    public long getOutOfStockMedicines() {
        return outOfStockMedicines;
    }

    public void setOutOfStockMedicines(long outOfStockMedicines) {
        this.outOfStockMedicines = outOfStockMedicines;
    }

    public long getExpiringMedicines() {
        return expiringMedicines;
    }

    public void setExpiringMedicines(long expiringMedicines) {
        this.expiringMedicines = expiringMedicines;
    }

    @Override
    public String toString() {
        return "MedicineStatsResponse{" +
                "totalMedicines=" + totalMedicines +
                ", availableMedicines=" + availableMedicines +
                ", lowStockMedicines=" + lowStockMedicines +
                ", outOfStockMedicines=" + outOfStockMedicines +
                ", expiringMedicines=" + expiringMedicines +
                '}';
    }
}