package com.medivision.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class AdminDashboardResponse {

    private LocalDateTime generatedAt;

    private OverviewStats overview;

    private UserStats users;

    private DoctorStatsResponse doctors;

    private NurseStats nurses;

    private PatientStatsResponse patients;

    private AppointmentStats appointments;

    private AdmissionStats admissions;

    private BillingStats billing;

    private MedicineStatsResponse medicines;

    private LabStats labReports;

    private IcuStats icuRecords;

    private PrescriptionStats prescriptions;

    private ModuleCounts modules;

    private List<DoctorAppointmentStatsResponse> doctorAppointments;

    private List<DepartmentCount> departmentAdmissions;

    public AdminDashboardResponse() {
        this.doctorAppointments = new ArrayList<>();
        this.departmentAdmissions = new ArrayList<>();
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }

    public OverviewStats getOverview() {
        return overview;
    }

    public void setOverview(OverviewStats overview) {
        this.overview = overview;
    }

    public UserStats getUsers() {
        return users;
    }

    public void setUsers(UserStats users) {
        this.users = users;
    }

    public DoctorStatsResponse getDoctors() {
        return doctors;
    }

    public void setDoctors(DoctorStatsResponse doctors) {
        this.doctors = doctors;
    }

    public NurseStats getNurses() {
        return nurses;
    }

    public void setNurses(NurseStats nurses) {
        this.nurses = nurses;
    }

    public PatientStatsResponse getPatients() {
        return patients;
    }

    public void setPatients(PatientStatsResponse patients) {
        this.patients = patients;
    }

    public AppointmentStats getAppointments() {
        return appointments;
    }

    public void setAppointments(AppointmentStats appointments) {
        this.appointments = appointments;
    }

    public AdmissionStats getAdmissions() {
        return admissions;
    }

    public void setAdmissions(AdmissionStats admissions) {
        this.admissions = admissions;
    }

    public BillingStats getBilling() {
        return billing;
    }

    public void setBilling(BillingStats billing) {
        this.billing = billing;
    }

    public MedicineStatsResponse getMedicines() {
        return medicines;
    }

    public void setMedicines(MedicineStatsResponse medicines) {
        this.medicines = medicines;
    }

    public LabStats getLabReports() {
        return labReports;
    }

    public void setLabReports(LabStats labReports) {
        this.labReports = labReports;
    }

    public IcuStats getIcuRecords() {
        return icuRecords;
    }

    public void setIcuRecords(IcuStats icuRecords) {
        this.icuRecords = icuRecords;
    }

    public PrescriptionStats getPrescriptions() {
        return prescriptions;
    }

    public void setPrescriptions(PrescriptionStats prescriptions) {
        this.prescriptions = prescriptions;
    }

    public ModuleCounts getModules() {
        return modules;
    }

    public void setModules(ModuleCounts modules) {
        this.modules = modules;
    }

    public List<DoctorAppointmentStatsResponse> getDoctorAppointments() {
        return doctorAppointments;
    }

    public void setDoctorAppointments(
            List<DoctorAppointmentStatsResponse> doctorAppointments) {
        this.doctorAppointments = doctorAppointments;
    }

    public List<DepartmentCount> getDepartmentAdmissions() {
        return departmentAdmissions;
    }

    public void setDepartmentAdmissions(
            List<DepartmentCount> departmentAdmissions) {
        this.departmentAdmissions = departmentAdmissions;
    }

    public static class OverviewStats {

        private long totalRecords;
        private long totalUsers;
        private long totalDoctors;
        private long totalPatients;
        private long totalAppointments;
        private long todayAppointments;
        private long totalAdmissions;
        private long totalBillings;
        private long totalMedicines;
        private long totalNurses;

        public long getTotalRecords() {
            return totalRecords;
        }

        public void setTotalRecords(long totalRecords) {
            this.totalRecords = totalRecords;
        }

        public long getTotalUsers() {
            return totalUsers;
        }

        public void setTotalUsers(long totalUsers) {
            this.totalUsers = totalUsers;
        }

        public long getTotalDoctors() {
            return totalDoctors;
        }

        public void setTotalDoctors(long totalDoctors) {
            this.totalDoctors = totalDoctors;
        }

        public long getTotalPatients() {
            return totalPatients;
        }

        public void setTotalPatients(long totalPatients) {
            this.totalPatients = totalPatients;
        }

        public long getTotalAppointments() {
            return totalAppointments;
        }

        public void setTotalAppointments(long totalAppointments) {
            this.totalAppointments = totalAppointments;
        }

        public long getTodayAppointments() {
            return todayAppointments;
        }

        public void setTodayAppointments(long todayAppointments) {
            this.todayAppointments = todayAppointments;
        }

        public long getTotalAdmissions() {
            return totalAdmissions;
        }

        public void setTotalAdmissions(long totalAdmissions) {
            this.totalAdmissions = totalAdmissions;
        }

        public long getTotalBillings() {
            return totalBillings;
        }

        public void setTotalBillings(long totalBillings) {
            this.totalBillings = totalBillings;
        }

        public long getTotalMedicines() {
            return totalMedicines;
        }

        public void setTotalMedicines(long totalMedicines) {
            this.totalMedicines = totalMedicines;
        }

        public long getTotalNurses() {
            return totalNurses;
        }

        public void setTotalNurses(long totalNurses) {
            this.totalNurses = totalNurses;
        }
    }

    public static class UserStats {

        private long total;
        private long active;
        private long inactive;
        private long locked;
        private long admins;
        private long doctors;
        private long nurses;
        private long receptionists;
        private long labTechnicians;
        private long pharmacists;

        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public long getActive() {
            return active;
        }

        public void setActive(long active) {
            this.active = active;
        }

        public long getInactive() {
            return inactive;
        }

        public void setInactive(long inactive) {
            this.inactive = inactive;
        }

        public long getLocked() {
            return locked;
        }

        public void setLocked(long locked) {
            this.locked = locked;
        }

        public long getAdmins() {
            return admins;
        }

        public void setAdmins(long admins) {
            this.admins = admins;
        }

        public long getDoctors() {
            return doctors;
        }

        public void setDoctors(long doctors) {
            this.doctors = doctors;
        }

        public long getNurses() {
            return nurses;
        }

        public void setNurses(long nurses) {
            this.nurses = nurses;
        }

        public long getReceptionists() {
            return receptionists;
        }

        public void setReceptionists(long receptionists) {
            this.receptionists = receptionists;
        }

        public long getLabTechnicians() {
            return labTechnicians;
        }

        public void setLabTechnicians(long labTechnicians) {
            this.labTechnicians = labTechnicians;
        }

        public long getPharmacists() {
            return pharmacists;
        }

        public void setPharmacists(long pharmacists) {
            this.pharmacists = pharmacists;
        }
    }

    public static class NurseStats {

        private long total;
        private long active;
        private long inactive;
        private long onLeave;

        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public long getActive() {
            return active;
        }

        public void setActive(long active) {
            this.active = active;
        }

        public long getInactive() {
            return inactive;
        }

        public void setInactive(long inactive) {
            this.inactive = inactive;
        }

        public long getOnLeave() {
            return onLeave;
        }

        public void setOnLeave(long onLeave) {
            this.onLeave = onLeave;
        }
    }

    public static class AppointmentStats {

        private long total;
        private long today;
        private long scheduled;
        private long completed;
        private long cancelled;

        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public long getToday() {
            return today;
        }

        public void setToday(long today) {
            this.today = today;
        }

        public long getScheduled() {
            return scheduled;
        }

        public void setScheduled(long scheduled) {
            this.scheduled = scheduled;
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

    public static class AdmissionStats {

        private long total;
        private long today;
        private long admitted;
        private long discharged;
        private long pending;

        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public long getToday() {
            return today;
        }

        public void setToday(long today) {
            this.today = today;
        }

        public long getAdmitted() {
            return admitted;
        }

        public void setAdmitted(long admitted) {
            this.admitted = admitted;
        }

        public long getDischarged() {
            return discharged;
        }

        public void setDischarged(long discharged) {
            this.discharged = discharged;
        }

        public long getPending() {
            return pending;
        }

        public void setPending(long pending) {
            this.pending = pending;
        }
    }

    public static class BillingStats {

        private long total;
        private long pending;
        private long paid;
        private long partiallyPaid;
        private long cancelled;
        private BigDecimal totalRevenue;
        private BigDecimal collectedAmount;
        private BigDecimal pendingAmount;

        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public long getPending() {
            return pending;
        }

        public void setPending(long pending) {
            this.pending = pending;
        }

        public long getPaid() {
            return paid;
        }

        public void setPaid(long paid) {
            this.paid = paid;
        }

        public long getPartiallyPaid() {
            return partiallyPaid;
        }

        public void setPartiallyPaid(long partiallyPaid) {
            this.partiallyPaid = partiallyPaid;
        }

        public long getCancelled() {
            return cancelled;
        }

        public void setCancelled(long cancelled) {
            this.cancelled = cancelled;
        }

        public BigDecimal getTotalRevenue() {
            return totalRevenue;
        }

        public void setTotalRevenue(BigDecimal totalRevenue) {
            this.totalRevenue = totalRevenue;
        }

        public BigDecimal getCollectedAmount() {
            return collectedAmount;
        }

        public void setCollectedAmount(BigDecimal collectedAmount) {
            this.collectedAmount = collectedAmount;
        }

        public BigDecimal getPendingAmount() {
            return pendingAmount;
        }

        public void setPendingAmount(BigDecimal pendingAmount) {
            this.pendingAmount = pendingAmount;
        }
    }

    public static class LabStats {

        private long total;
        private long pending;
        private long completed;
        private long today;

        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public long getPending() {
            return pending;
        }

        public void setPending(long pending) {
            this.pending = pending;
        }

        public long getCompleted() {
            return completed;
        }

        public void setCompleted(long completed) {
            this.completed = completed;
        }

        public long getToday() {
            return today;
        }

        public void setToday(long today) {
            this.today = today;
        }
    }

    public static class IcuStats {

        private long total;
        private long active;
        private long critical;
        private long onVentilator;

        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public long getActive() {
            return active;
        }

        public void setActive(long active) {
            this.active = active;
        }

        public long getCritical() {
            return critical;
        }

        public void setCritical(long critical) {
            this.critical = critical;
        }

        public long getOnVentilator() {
            return onVentilator;
        }

        public void setOnVentilator(long onVentilator) {
            this.onVentilator = onVentilator;
        }
    }

    public static class PrescriptionStats {

        private long total;
        private long active;
        private long completed;
        private long today;
        private long prescriptionMedicines;

        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public long getActive() {
            return active;
        }

        public void setActive(long active) {
            this.active = active;
        }

        public long getCompleted() {
            return completed;
        }

        public void setCompleted(long completed) {
            this.completed = completed;
        }

        public long getToday() {
            return today;
        }

        public void setToday(long today) {
            this.today = today;
        }

        public long getPrescriptionMedicines() {
            return prescriptionMedicines;
        }

        public void setPrescriptionMedicines(long prescriptionMedicines) {
            this.prescriptionMedicines = prescriptionMedicines;
        }
    }

    public static class ModuleCounts {

        private long visits;
        private long medicalHistories;
        private long surgeries;
        private long discharges;
        private long pregnancyRecords;
        private long doctorDegrees;
        private long images;

        public long getVisits() {
            return visits;
        }

        public void setVisits(long visits) {
            this.visits = visits;
        }

        public long getMedicalHistories() {
            return medicalHistories;
        }

        public void setMedicalHistories(long medicalHistories) {
            this.medicalHistories = medicalHistories;
        }

        public long getSurgeries() {
            return surgeries;
        }

        public void setSurgeries(long surgeries) {
            this.surgeries = surgeries;
        }

        public long getDischarges() {
            return discharges;
        }

        public void setDischarges(long discharges) {
            this.discharges = discharges;
        }

        public long getPregnancyRecords() {
            return pregnancyRecords;
        }

        public void setPregnancyRecords(long pregnancyRecords) {
            this.pregnancyRecords = pregnancyRecords;
        }

        public long getDoctorDegrees() {
            return doctorDegrees;
        }

        public void setDoctorDegrees(long doctorDegrees) {
            this.doctorDegrees = doctorDegrees;
        }

        public long getImages() {
            return images;
        }

        public void setImages(long images) {
            this.images = images;
        }
    }

    public static class DepartmentCount {

        private String name;
        private long count;

        public DepartmentCount() {
        }

        public DepartmentCount(String name, long count) {
            this.name = name;
            this.count = count;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public long getCount() {
            return count;
        }

        public void setCount(long count) {
            this.count = count;
        }
    }
}
