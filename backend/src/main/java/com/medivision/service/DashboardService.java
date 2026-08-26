package com.medivision.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.medivision.dto.AppointmentStatusResponse;
import com.medivision.dto.DashboardResponse;
import com.medivision.dto.DoctorAppointmentStatsResponse;
import com.medivision.dto.DoctorStatsResponse;
import com.medivision.dto.PatientStatsResponse;
import com.medivision.repository.AppointmentRepository;
import com.medivision.repository.DoctorRepository;
import com.medivision.repository.MedicineRepository;
import com.medivision.repository.PatientRepository;
import com.medivision.repository.PrescriptionMedicineRepository;
import com.medivision.repository.PrescriptionRepository;
import com.medivision.repository.UserRepository;
import com.medivision.repository.VisitRepository;

@Service
public class DashboardService {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final MedicineRepository medicineRepository;
    private final VisitRepository visitRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final PrescriptionMedicineRepository prescriptionMedicineRepository;
    private final AdminDashboardService adminDashboardService;

    public DashboardService(
            UserRepository userRepository,
            DoctorRepository doctorRepository,
            PatientRepository patientRepository,
            AppointmentRepository appointmentRepository,
            MedicineRepository medicineRepository,
            VisitRepository visitRepository,
            PrescriptionRepository prescriptionRepository,
            PrescriptionMedicineRepository prescriptionMedicineRepository,
            AdminDashboardService adminDashboardService) {

        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
        this.medicineRepository = medicineRepository;
        this.visitRepository = visitRepository;
        this.prescriptionRepository = prescriptionRepository;
        this.prescriptionMedicineRepository = prescriptionMedicineRepository;
        this.adminDashboardService = adminDashboardService;
    }

    public DashboardResponse getDashboardData() {

        var admin = adminDashboardService.getAdminDashboard();
        var overview = admin.getOverview();

        DashboardResponse response = new DashboardResponse();

        response.setTotalUsers(overview.getTotalUsers());
        response.setTotalDoctors(overview.getTotalDoctors());
        response.setTotalPatients(overview.getTotalPatients());
        response.setTotalAppointments(overview.getTotalAppointments());
        response.setTotalMedicines(overview.getTotalMedicines());
        response.setTotalVisits(admin.getModules().getVisits());
        response.setTotalPrescriptions(
                admin.getPrescriptions().getTotal()
        );
        response.setTotalPrescriptionMedicines(
                admin.getPrescriptions().getPrescriptionMedicines()
        );
        response.setTodayAppointments(overview.getTodayAppointments());

        return response;
    }

    public DoctorStatsResponse getDoctorStats() {
        return adminDashboardService.getAdminDashboard().getDoctors();
    }

    public PatientStatsResponse getPatientStats() {
        return adminDashboardService.getAdminDashboard().getPatients();
    }

    public AppointmentStatusResponse getAppointmentStatus() {

        var appointments =
                adminDashboardService
                        .getAdminDashboard()
                        .getAppointments();

        AppointmentStatusResponse response =
                new AppointmentStatusResponse();

        response.setBooked(appointments.getScheduled());
        response.setCompleted(appointments.getCompleted());
        response.setCancelled(appointments.getCancelled());

        return response;
    }

    public List<DoctorAppointmentStatsResponse>
    getDoctorAppointmentStats() {

        return adminDashboardService
                .getAdminDashboard()
                .getDoctorAppointments();
    }
}
