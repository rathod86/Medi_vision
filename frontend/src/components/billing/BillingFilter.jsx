const filteredBillings = billings.filter((billing) => {

    const matchesSearch =
        billing.billNumber?.toLowerCase().includes(search.toLowerCase()) ||
        billing.patientName?.toLowerCase().includes(search.toLowerCase()) ||
        billing.doctorName?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
        statusFilter === "ALL" ||
        billing.paymentStatus === statusFilter;

    const matchesPaymentMethod =
        paymentMethodFilter === "ALL" ||
        billing.paymentMethod === paymentMethodFilter;

    const matchesFromDate =
        !fromDate ||
        new Date(billing.billingDate) >= new Date(fromDate);

    const matchesToDate =
        !toDate ||
        new Date(billing.billingDate) <= new Date(toDate);

    const matchesMinAmount =
        !minAmount ||
        billing.totalAmount >= Number(minAmount);

    const matchesMaxAmount =
        !maxAmount ||
        billing.totalAmount <= Number(maxAmount);

    return (
        matchesSearch &&
        matchesStatus &&
        matchesPaymentMethod &&
        matchesFromDate &&
        matchesToDate &&
        matchesMinAmount &&
        matchesMaxAmount
    );

});