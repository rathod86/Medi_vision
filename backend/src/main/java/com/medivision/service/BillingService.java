package com.medivision.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.medivision.dto.BillingRequest;
import com.medivision.dto.BillingResponse;
import com.medivision.exception.ResourceNotFoundException;
import com.medivision.model.Admission;
import com.medivision.model.Billing;
import com.medivision.model.Doctor;
import com.medivision.model.Patient;
import com.medivision.repository.AdmissionRepository;
import com.medivision.repository.BillingRepository;
import com.medivision.repository.DoctorRepository;
import com.medivision.repository.PatientRepository;

@Service
public class BillingService {

    private final BillingRepository billingRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AdmissionRepository admissionRepository;

    public BillingService(
            BillingRepository billingRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository,
            AdmissionRepository admissionRepository) {

        this.billingRepository = billingRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.admissionRepository = admissionRepository;
    }

    // =====================================================
    // CREATE BILL
    // =====================================================

    public BillingResponse createBilling(BillingRequest request) {

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));

        Admission admission = null;

        if (request.getAdmissionId() != null) {
            admission = admissionRepository.findById(request.getAdmissionId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Admission not found"));
        }

        Billing billing = new Billing();

        billing.setBillNumber(generateBillNumber());

        billing.setPatient(patient);
        billing.setDoctor(doctor);
        billing.setAdmission(admission);

        billing.setConsultationCharges(request.getConsultationCharges());
        billing.setRoomCharges(request.getRoomCharges());
        billing.setMedicineCharges(request.getMedicineCharges());
        billing.setLabCharges(request.getLabCharges());
        billing.setSurgeryCharges(request.getSurgeryCharges());
        billing.setIcuCharges(request.getIcuCharges());
        billing.setOtherCharges(request.getOtherCharges());

        billing.setDiscount(request.getDiscount());
        billing.setTax(request.getTax());

        billing.setPaidAmount(request.getPaidAmount());

        billing.setPaymentMethod(request.getPaymentMethod());
        billing.setPaymentStatus(request.getPaymentStatus());

        billing.setBillingDate(request.getBillingDate());
        billing.setDueDate(request.getDueDate());

        billing.setNotes(request.getNotes());

        billing.calculateBill();

        Billing saved = billingRepository.save(billing);

        return mapToResponse(saved);
    }

    // =====================================================
    // GET ALL
    // =====================================================

    public List<BillingResponse> getAllBillings() {

        return billingRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // =====================================================
    // GET BY ID
    // =====================================================

    public BillingResponse getBillingById(Long id) {

        Billing billing = billingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Billing not found"));

        return mapToResponse(billing);
    }
    
    // =====================================================
    // UPDATE BILL
    // =====================================================

    public BillingResponse updateBilling(Long id, BillingRequest request) {

        Billing billing = billingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Billing not found"));

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Patient not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Doctor not found"));

        Admission admission = null;

        if (request.getAdmissionId() != null) {
            admission = admissionRepository.findById(request.getAdmissionId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Admission not found"));
        }

        billing.setPatient(patient);
        billing.setDoctor(doctor);
        billing.setAdmission(admission);

        billing.setConsultationCharges(request.getConsultationCharges());
        billing.setRoomCharges(request.getRoomCharges());
        billing.setMedicineCharges(request.getMedicineCharges());
        billing.setLabCharges(request.getLabCharges());
        billing.setSurgeryCharges(request.getSurgeryCharges());
        billing.setIcuCharges(request.getIcuCharges());
        billing.setOtherCharges(request.getOtherCharges());

        billing.setDiscount(request.getDiscount());
        billing.setTax(request.getTax());

        billing.setPaidAmount(request.getPaidAmount());

        billing.setPaymentMethod(request.getPaymentMethod());
        billing.setPaymentStatus(request.getPaymentStatus());

        billing.setBillingDate(request.getBillingDate());
        billing.setDueDate(request.getDueDate());

        billing.setNotes(request.getNotes());

        billing.calculateBill();

        Billing updated = billingRepository.save(billing);

        return mapToResponse(updated);
    }

    // =====================================================
    // DELETE BILL
    // =====================================================

    public void deleteBilling(Long id) {

        Billing billing = billingRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Billing not found"));

        billingRepository.delete(billing);
    }

    // =====================================================
    // GENERATE BILL NUMBER
    // =====================================================

    private String generateBillNumber() {

        return "BILL-" + System.currentTimeMillis();
    }

    // =====================================================
    // ENTITY TO RESPONSE DTO
    // =====================================================

    private BillingResponse mapToResponse(Billing billing) {

        BillingResponse response = new BillingResponse();

        response.setId(billing.getId());

        response.setBillNumber(billing.getBillNumber());

        response.setPatientId(billing.getPatient().getId());
        response.setPatientName(billing.getPatient().getFullName());

        response.setDoctorId(billing.getDoctor().getId());
        response.setDoctorName(billing.getDoctor().getFullName());

        if (billing.getAdmission() != null) {
            response.setAdmissionId(billing.getAdmission().getId());
        }

        response.setConsultationCharges(billing.getConsultationCharges());
        response.setRoomCharges(billing.getRoomCharges());
        response.setMedicineCharges(billing.getMedicineCharges());
        response.setLabCharges(billing.getLabCharges());
        response.setSurgeryCharges(billing.getSurgeryCharges());
        response.setIcuCharges(billing.getIcuCharges());
        response.setOtherCharges(billing.getOtherCharges());

        response.setDiscount(billing.getDiscount());
        response.setTax(billing.getTax());

        response.setTotalAmount(billing.getTotalAmount());
        response.setPaidAmount(billing.getPaidAmount());
        response.setBalanceAmount(billing.getBalanceAmount());

        response.setPaymentMethod(billing.getPaymentMethod());
        response.setPaymentStatus(billing.getPaymentStatus());

        response.setBillingDate(billing.getBillingDate());
        response.setDueDate(billing.getDueDate());

        response.setNotes(billing.getNotes());

        response.setCreatedAt(billing.getCreatedAt());
        response.setUpdatedAt(billing.getUpdatedAt());

        return response;
    }

}