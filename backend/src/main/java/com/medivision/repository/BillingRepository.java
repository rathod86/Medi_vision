package com.medivision.repository;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.medivision.model.Billing;
import com.medivision.model.BillingStatus;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {

    Optional<Billing> findByBillNumber(String billNumber);

    boolean existsByBillNumber(String billNumber);

    long countByPaymentStatus(BillingStatus paymentStatus);

    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Billing b")
    BigDecimal sumTotalAmount();

    @Query("SELECT COALESCE(SUM(b.paidAmount), 0) FROM Billing b")
    BigDecimal sumPaidAmount();

    @Query("SELECT COALESCE(SUM(b.balanceAmount), 0) FROM Billing b")
    BigDecimal sumBalanceAmount();
}
