package com.medivision.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.medivision.dto.AdminDashboardResponse;
import com.medivision.dto.AdminDashboardResponse.AdmissionStats;
import com.medivision.dto.AdminDashboardResponse.AppointmentStats;
import com.medivision.dto.AdminDashboardResponse.BillingStats;
import com.medivision.dto.AdminDashboardResponse.DepartmentCount;
import com.medivision.dto.AdminDashboardResponse.IcuStats;
import com.medivision.dto.AdminDashboardResponse.LabStats;
import com.medivision.dto.AdminDashboardResponse.ModuleCounts;
import com.medivision.dto.AdminDashboardResponse.NurseStats;
import com.medivision.dto.AdminDashboardResponse.OverviewStats;
import com.medivision.dto.AdminDashboardResponse.PrescriptionStats;
import com.medivision.dto.AdminDashboardResponse.UserStats;

import com.medivision.dto.DoctorAppointmentStatsResponse;
import com.medivision.dto.DoctorStatsResponse;
import com.medivision.dto.MedicineStatsResponse;
import com.medivision.dto.PatientStatsResponse;

import com.medivision.model.BillingStatus;

import com.medivision.repository.AdmissionRepository;
import com.medivision.repository.AppointmentRepository;
import com.medivision.repository.BillingRepository;
import com.medivision.repository.DischargeRepository;
import com.medivision.repository.DoctorDegreeRepository;
import com.medivision.repository.DoctorRepository;
import com.medivision.repository.ICURecordRepository;
import com.medivision.repository.ImageRepository;
import com.medivision.repository.LabReportRepository;
import com.medivision.repository.MedicalHistoryRepository;
import com.medivision.repository.MedicineRepository;
import com.medivision.repository.NurseRepository;
import com.medivision.repository.PatientRepository;
import com.medivision.repository.PregnancyRecordRepository;
import com.medivision.repository.PrescriptionMedicineRepository;
import com.medivision.repository.PrescriptionRepository;
import com.medivision.repository.SurgeryRepository;
import com.medivision.repository.UserRepository;
import com.medivision.repository.VisitRepository;


/**
 * ============================================================
 * ADMIN DASHBOARD SERVICE
 * ============================================================
 *
 * Provides all statistics required by the Admin Dashboard.
 *
 * This service only reads data from the database.
 *
 * Main endpoint can call:
 *
 *     getAdminDashboard()
 *
 * ============================================================
 */
@Service
@Transactional(readOnly = true)
public class AdminDashboardService {


    // ========================================================
    // CONFIGURATION
    // ========================================================

    private static final int EXPIRY_WINDOW_DAYS = 30;


    // ========================================================
    // REPOSITORIES
    // ========================================================

    private final UserRepository userRepository;

    private final DoctorRepository doctorRepository;

    private final PatientRepository patientRepository;

    private final NurseRepository nurseRepository;

    private final AppointmentRepository appointmentRepository;

    private final AdmissionRepository admissionRepository;

    private final BillingRepository billingRepository;

    private final MedicineRepository medicineRepository;

    private final LabReportRepository labReportRepository;

    private final ICURecordRepository icuRecordRepository;

    private final PrescriptionRepository prescriptionRepository;

    private final PrescriptionMedicineRepository prescriptionMedicineRepository;

    private final VisitRepository visitRepository;

    private final MedicalHistoryRepository medicalHistoryRepository;

    private final SurgeryRepository surgeryRepository;

    private final DischargeRepository dischargeRepository;

    private final PregnancyRecordRepository pregnancyRecordRepository;

    private final DoctorDegreeRepository doctorDegreeRepository;

    private final ImageRepository imageRepository;


    // ========================================================
    // CONSTRUCTOR
    // ========================================================

    public AdminDashboardService(
            UserRepository userRepository,
            DoctorRepository doctorRepository,
            PatientRepository patientRepository,
            NurseRepository nurseRepository,
            AppointmentRepository appointmentRepository,
            AdmissionRepository admissionRepository,
            BillingRepository billingRepository,
            MedicineRepository medicineRepository,
            LabReportRepository labReportRepository,
            ICURecordRepository icuRecordRepository,
            PrescriptionRepository prescriptionRepository,
            PrescriptionMedicineRepository prescriptionMedicineRepository,
            VisitRepository visitRepository,
            MedicalHistoryRepository medicalHistoryRepository,
            SurgeryRepository surgeryRepository,
            DischargeRepository dischargeRepository,
            PregnancyRecordRepository pregnancyRecordRepository,
            DoctorDegreeRepository doctorDegreeRepository,
            ImageRepository imageRepository) {

        this.userRepository =
                userRepository;

        this.doctorRepository =
                doctorRepository;

        this.patientRepository =
                patientRepository;

        this.nurseRepository =
                nurseRepository;

        this.appointmentRepository =
                appointmentRepository;

        this.admissionRepository =
                admissionRepository;

        this.billingRepository =
                billingRepository;

        this.medicineRepository =
                medicineRepository;

        this.labReportRepository =
                labReportRepository;

        this.icuRecordRepository =
                icuRecordRepository;

        this.prescriptionRepository =
                prescriptionRepository;

        this.prescriptionMedicineRepository =
                prescriptionMedicineRepository;

        this.visitRepository =
                visitRepository;

        this.medicalHistoryRepository =
                medicalHistoryRepository;

        this.surgeryRepository =
                surgeryRepository;

        this.dischargeRepository =
                dischargeRepository;

        this.pregnancyRecordRepository =
                pregnancyRecordRepository;

        this.doctorDegreeRepository =
                doctorDegreeRepository;

        this.imageRepository =
                imageRepository;
    }


    // ========================================================
    // MAIN DASHBOARD
    // ========================================================

    public AdminDashboardResponse getAdminDashboard() {

        LocalDate today =
                LocalDate.now();

        AdminDashboardResponse response =
                new AdminDashboardResponse();


        response.setGeneratedAt(
                LocalDateTime.now()
        );


        // ----------------------------------------------------
        // Overview
        // ----------------------------------------------------

        response.setOverview(
                buildOverview(today)
        );


        // ----------------------------------------------------
        // Users
        // ----------------------------------------------------

        response.setUsers(
                buildUserStats()
        );


        // ----------------------------------------------------
        // Doctors
        // ----------------------------------------------------

        response.setDoctors(
                buildDoctorStats()
        );


        // ----------------------------------------------------
        // Nurses
        // ----------------------------------------------------

        response.setNurses(
                buildNurseStats()
        );


        // ----------------------------------------------------
        // Patients
        // ----------------------------------------------------

        response.setPatients(
                buildPatientStats()
        );


        // ----------------------------------------------------
        // Appointments
        // ----------------------------------------------------

        response.setAppointments(
                buildAppointmentStats(today)
        );


        // ----------------------------------------------------
        // Admissions
        // ----------------------------------------------------

        response.setAdmissions(
                buildAdmissionStats(today)
        );


        // ----------------------------------------------------
        // Billing
        // ----------------------------------------------------

        response.setBilling(
                buildBillingStats()
        );


        // ----------------------------------------------------
        // Medicines
        // ----------------------------------------------------

        response.setMedicines(
                buildMedicineStats(today)
        );


        // ----------------------------------------------------
        // Laboratory
        // ----------------------------------------------------

        response.setLabReports(
                buildLabStats(today)
        );


        // ----------------------------------------------------
        // ICU
        // ----------------------------------------------------

        response.setIcuRecords(
                buildIcuStats()
        );


        // ----------------------------------------------------
        // Prescriptions
        // ----------------------------------------------------

        response.setPrescriptions(
                buildPrescriptionStats(today)
        );


        // ----------------------------------------------------
        // Other Modules
        // ----------------------------------------------------

        response.setModules(
                buildModuleCounts()
        );


        // ----------------------------------------------------
        // Doctor Appointment Statistics
        // ----------------------------------------------------

        response.setDoctorAppointments(
                buildDoctorAppointmentStats()
        );


        // ----------------------------------------------------
        // Department Admission Statistics
        // ----------------------------------------------------

        response.setDepartmentAdmissions(
                buildDepartmentAdmissionStats()
        );


        return response;
    }


    // ========================================================
    // OVERVIEW
    // ========================================================

    private OverviewStats buildOverview(
            LocalDate today) {

        OverviewStats stats =
                new OverviewStats();


        long users =
                userRepository.count();

        long doctors =
                doctorRepository.count();

        long patients =
                patientRepository.count();

        long nurses =
                nurseRepository.count();

        long appointments =
                appointmentRepository.count();

        long admissions =
                admissionRepository.count();

        long billings =
                billingRepository.count();

        long medicines =
                medicineRepository.count();

        long labReports =
                labReportRepository.count();

        long icuRecords =
                icuRecordRepository.count();

        long prescriptions =
                prescriptionRepository.count();

        long visits =
                visitRepository.count();

        long medicalHistories =
                medicalHistoryRepository.count();

        long surgeries =
                surgeryRepository.count();

        long discharges =
                dischargeRepository.count();

        long pregnancyRecords =
                pregnancyRecordRepository.count();


        stats.setTotalUsers(users);

        stats.setTotalDoctors(doctors);

        stats.setTotalPatients(patients);

        stats.setTotalNurses(nurses);

        stats.setTotalAppointments(
                appointments
        );

        stats.setTodayAppointments(
                appointmentRepository
                        .countByAppointmentDate(today)
        );

        stats.setTotalAdmissions(
                admissions
        );

        stats.setTotalBillings(
                billings
        );

        stats.setTotalMedicines(
                medicines
        );


        stats.setTotalRecords(
                users
                        + doctors
                        + patients
                        + nurses
                        + appointments
                        + admissions
                        + billings
                        + medicines
                        + labReports
                        + icuRecords
                        + prescriptions
                        + visits
                        + medicalHistories
                        + surgeries
                        + discharges
                        + pregnancyRecords
        );


        return stats;
    }


    // ========================================================
    // USER STATISTICS
    // ========================================================

    private UserStats buildUserStats() {

        UserStats stats =
                new UserStats();


        stats.setTotal(
                userRepository.count()
        );

        stats.setActive(
                userRepository.countByActiveTrue()
        );

        stats.setInactive(
                userRepository.countByActiveFalse()
        );

        stats.setLocked(
                userRepository.countByAccountLockedTrue()
        );


        stats.setAdmins(
                userRepository
                        .countByRoleIgnoreCase("ADMIN")
        );

        stats.setDoctors(
                userRepository
                        .countByRoleIgnoreCase("DOCTOR")
        );

        stats.setNurses(
                userRepository
                        .countByRoleIgnoreCase("NURSE")
        );

        stats.setReceptionists(
                userRepository
                        .countByRoleIgnoreCase("RECEPTIONIST")
        );

        stats.setLabTechnicians(
                userRepository
                        .countByRoleIgnoreCase(
                                "LAB_TECHNICIAN"
                        )
        );

        stats.setPharmacists(
                userRepository
                        .countByRoleIgnoreCase(
                                "PHARMACIST"
                        )
        );


        return stats;
    }


    // ========================================================
    // DOCTOR STATISTICS
    // ========================================================

    private DoctorStatsResponse buildDoctorStats() {

        DoctorStatsResponse stats =
                new DoctorStatsResponse();


        stats.setTotalDoctors(
                doctorRepository.count()
        );

        stats.setActiveDoctors(
                doctorRepository
                        .countByStatusIgnoreCase(
                                "Active"
                        )
        );

        stats.setInactiveDoctors(
                doctorRepository
                        .countByStatusIgnoreCase(
                                "Inactive"
                        )
        );

        stats.setOnLeaveDoctors(
                doctorRepository
                        .countByStatusIgnoreCase(
                                "On Leave"
                        )
        );


        return stats;
    }


    // ========================================================
    // NURSE STATISTICS
    // ========================================================

    private NurseStats buildNurseStats() {

        NurseStats stats =
                new NurseStats();


        stats.setTotal(
                nurseRepository.count()
        );

        stats.setActive(
                nurseRepository
                        .countByStatusIgnoreCase(
                                "Active"
                        )
        );

        stats.setInactive(
                nurseRepository
                        .countByStatusIgnoreCase(
                                "Inactive"
                        )
        );

        stats.setOnLeave(
                nurseRepository
                        .countByStatusIgnoreCase(
                                "On Leave"
                        )
        );


        return stats;
    }


    // ========================================================
    // PATIENT STATISTICS
    // ========================================================

    private PatientStatsResponse buildPatientStats() {

        PatientStatsResponse stats =
                new PatientStatsResponse();


        stats.setTotalPatients(
                patientRepository.count()
        );

        stats.setTotalVisits(
                visitRepository.count()
        );

        stats.setTotalPrescriptions(
                prescriptionRepository.count()
        );


        return stats;
    }


    // ========================================================
    // APPOINTMENT STATISTICS
    // ========================================================

    private AppointmentStats buildAppointmentStats(
            LocalDate today) {

        AppointmentStats stats =
                new AppointmentStats();


        stats.setTotal(
                appointmentRepository.count()
        );

        stats.setToday(
                appointmentRepository
                        .countByAppointmentDate(today)
        );

        stats.setScheduled(
                appointmentRepository
                        .countByStatusIgnoreCase(
                                "Scheduled"
                        )
        );

        stats.setCompleted(
                appointmentRepository
                        .countByStatusIgnoreCase(
                                "Completed"
                        )
        );

        stats.setCancelled(
                appointmentRepository
                        .countByStatusIgnoreCase(
                                "Cancelled"
                        )
        );


        return stats;
    }


    // ========================================================
    // ADMISSION STATISTICS
    // ========================================================

    private AdmissionStats buildAdmissionStats(
            LocalDate today) {

        AdmissionStats stats =
                new AdmissionStats();


        stats.setTotal(
                admissionRepository.count()
        );

        stats.setToday(
                admissionRepository
                        .countByAdmissionDate(today)
        );

        stats.setAdmitted(
                admissionRepository
                        .countByStatus("Admitted")
        );

        stats.setDischarged(
                admissionRepository
                        .countByStatus("Discharged")
        );

        stats.setPending(
                admissionRepository
                        .countByStatus("Pending")
        );


        return stats;
    }


    // ========================================================
    // BILLING STATISTICS
    // ========================================================

    private BillingStats buildBillingStats() {

        BillingStats stats =
                new BillingStats();


        stats.setTotal(
                billingRepository.count()
        );


        stats.setPending(
                billingRepository
                        .countByPaymentStatus(
                                BillingStatus.PENDING
                        )
        );


        stats.setPaid(
                billingRepository
                        .countByPaymentStatus(
                                BillingStatus.PAID
                        )
        );


        stats.setPartiallyPaid(
                billingRepository
                        .countByPaymentStatus(
                                BillingStatus.PARTIALLY_PAID
                        )
        );


        stats.setCancelled(
                billingRepository
                        .countByPaymentStatus(
                                BillingStatus.CANCELLED
                        )
        );


        stats.setTotalRevenue(
                billingRepository.sumTotalAmount()
        );

        stats.setCollectedAmount(
                billingRepository.sumPaidAmount()
        );

        stats.setPendingAmount(
                billingRepository.sumBalanceAmount()
        );


        return stats;
    }


    // ========================================================
    // MEDICINE STATISTICS
    // ========================================================

    private MedicineStatsResponse buildMedicineStats(
            LocalDate today) {

        LocalDate expiryLimit =
                today.plusDays(
                        EXPIRY_WINDOW_DAYS
                );


        return new MedicineStatsResponse(

                medicineRepository.count(),

                medicineRepository
                        .countByStatus(
                                "Available"
                        ),

                medicineRepository
                        .countLowStockMedicines(),

                medicineRepository
                        .countByQuantity(0),

                medicineRepository
                        .countByExpiryDateBetween(
                                today,
                                expiryLimit
                        )
        );
    }


    // ========================================================
    // LAB STATISTICS
    // ========================================================

    private LabStats buildLabStats(
            LocalDate today) {

        LabStats stats =
                new LabStats();


        stats.setTotal(
                labReportRepository.count()
        );

        stats.setPending(
                labReportRepository
                        .countByStatusIgnoreCase(
                                "Pending"
                        )
        );

        stats.setCompleted(
                labReportRepository
                        .countByStatusIgnoreCase(
                                "Completed"
                        )
        );

        stats.setToday(
                labReportRepository
                        .countByTestDate(today)
        );


        return stats;
    }


    // ========================================================
    // ICU STATISTICS
    // ========================================================

    private IcuStats buildIcuStats() {

        IcuStats stats =
                new IcuStats();


        stats.setTotal(
                icuRecordRepository.count()
        );

        stats.setActive(
                icuRecordRepository
                        .countByStatusIgnoreCase(
                                "Active"
                        )
        );

        stats.setCritical(
                icuRecordRepository
                        .countByCriticalLevelIgnoreCase(
                                "Critical"
                        )
        );

        stats.setOnVentilator(
                icuRecordRepository
                        .countByVentilatorRequired(
                                true
                        )
        );


        return stats;
    }


    // ========================================================
    // PRESCRIPTION STATISTICS
    // ========================================================

    private PrescriptionStats buildPrescriptionStats(
            LocalDate today) {

        PrescriptionStats stats =
                new PrescriptionStats();


        stats.setTotal(
                prescriptionRepository.count()
        );

        stats.setActive(
                prescriptionRepository
                        .countByStatus(
                                "Active"
                        )
        );

        stats.setCompleted(
                prescriptionRepository
                        .countByStatus(
                                "Completed"
                        )
        );

        stats.setToday(
                prescriptionRepository
                        .countByPrescriptionDate(
                                today
                        )
        );

        stats.setPrescriptionMedicines(
                prescriptionMedicineRepository.count()
        );


        return stats;
    }


    // ========================================================
    // MODULE COUNTS
    // ========================================================

    private ModuleCounts buildModuleCounts() {

        ModuleCounts counts =
                new ModuleCounts();


        counts.setVisits(
                visitRepository.count()
        );

        counts.setMedicalHistories(
                medicalHistoryRepository.count()
        );

        counts.setSurgeries(
                surgeryRepository.count()
        );

        counts.setDischarges(
                dischargeRepository.count()
        );

        counts.setPregnancyRecords(
                pregnancyRecordRepository.count()
        );

        counts.setDoctorDegrees(
                doctorDegreeRepository.count()
        );

        counts.setImages(
                imageRepository.count()
        );


        return counts;
    }


    // ========================================================
    // DOCTOR APPOINTMENT STATISTICS
    // ========================================================

    private List<DoctorAppointmentStatsResponse>
    buildDoctorAppointmentStats() {

        List<DoctorAppointmentStatsResponse> result =
                new ArrayList<>();


        List<Object[]> rows =
                appointmentRepository
                        .getDoctorAppointmentStats();


        if (rows == null) {
            return result;
        }


        for (Object[] row : rows) {

            if (row == null ||
                    row.length < 2) {

                continue;
            }


            DoctorAppointmentStatsResponse dto =
                    new DoctorAppointmentStatsResponse();


            dto.setDoctorName(
                    row[0] == null
                            ? "Unknown"
                            : String.valueOf(row[0])
            );


            dto.setAppointmentCount(
                    toLong(row[1])
            );


            result.add(dto);
        }


        return result;
    }


    // ========================================================
    // DEPARTMENT ADMISSION STATISTICS
    // ========================================================

    private List<DepartmentCount>
    buildDepartmentAdmissionStats() {

        List<DepartmentCount> result =
                new ArrayList<>();


        List<Object[]> rows =
                admissionRepository
                        .getDepartmentAdmissionStats();


        if (rows == null) {
            return result;
        }


        for (Object[] row : rows) {

            if (row == null ||
                    row.length < 2) {

                continue;
            }


            String department =
                    row[0] == null
                            ? "Unknown"
                            : String.valueOf(row[0]);


            result.add(
                    new DepartmentCount(
                            department,
                            toLong(row[1])
                    )
            );
        }


        return result;
    }


    // ========================================================
    // NUMBER CONVERSION
    // ========================================================

    private long toLong(
            Object value) {

        if (value == null) {
            return 0L;
        }


        if (value instanceof Number number) {
            return number.longValue();
        }


        try {

            return Long.parseLong(
                    value.toString()
            );

        } catch (NumberFormatException e) {

            return 0L;
        }
    }
}