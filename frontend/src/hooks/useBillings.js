import { useEffect, useState } from "react";

import {
    getAllBillings,
    getBillingById,
    createBilling,
    updateBilling,
    deleteBilling,
} from "../services/billingService";

const useBillings = () => {

    const [billings, setBillings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ==========================================
    // Load All Billings
    // ==========================================

    const fetchBillings = async () => {

        try {

            setLoading(true);

            const data = await getAllBillings();

            setBillings(data);

            setError("");

        } catch (err) {

            console.error("Error loading billings:", err);

            setError(
                err.response?.data?.message || "Failed to load billings."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchBillings();

    }, []);

    // ==========================================
    // Get Billing By Id
    // ==========================================

    const getBilling = async (id) => {

        try {

            return await getBillingById(id);

        } catch (err) {

            console.error("Error fetching billing:", err);

            throw err;

        }

    };

    // ==========================================
    // Add Billing
    // ==========================================

    const addBilling = async (billing) => {

        try {

            setLoading(true);

            const createdBilling = await createBilling(billing);

            await fetchBillings();

            return createdBilling;

        } catch (err) {

            console.error("Error creating billing:", err);

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Update Billing
    // ==========================================

    const editBilling = async (id, billing) => {

        try {

            setLoading(true);

            const updatedBilling = await updateBilling(id, billing);

            await fetchBillings();

            return updatedBilling;

        } catch (err) {

            console.error("Error updating billing:", err);

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Delete Billing
    // ==========================================

    const removeBilling = async (id) => {

        try {

            setLoading(true);

            await deleteBilling(id);

            await fetchBillings();

        } catch (err) {

            console.error("Error deleting billing:", err);

            throw err;

        } finally {

            setLoading(false);

        }

    };

    return {

        billings,
        loading,
        error,

        fetchBillings,
        getBilling,

        addBilling,
        editBilling,
        removeBilling,

    };

};

export default useBillings;