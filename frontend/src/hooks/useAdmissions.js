import { useEffect, useState } from "react";

import {
    getAllAdmissions,
    createAdmission,
    updateAdmission,
    deleteAdmission,
} from "../services/admissionService";

const useAdmissions = () => {

    const [admissions, setAdmissions] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    // ==========================================
    // Fetch Admissions
    // ==========================================

    const fetchAdmissions = async () => {

        try {

            setLoading(true);

            const data = await getAllAdmissions();

            setAdmissions(data);

            setError("");

        } catch (err) {

            console.error(err);

            setError("Failed to load admissions.");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchAdmissions();

    }, []);

    // ==========================================
    // Add Admission
    // ==========================================

    const addAdmission = async (admission) => {

        try {

            const createdAdmission = await createAdmission(admission);

            await fetchAdmissions();

            return createdAdmission;

        } catch (err) {

            console.error(err);

            throw err;

        }

    };

    // ==========================================
    // Update Admission
    // ==========================================

    const editAdmission = async (id, admission) => {

        try {

            const updatedAdmission = await updateAdmission(id, admission);

            await fetchAdmissions();

            return updatedAdmission;

        } catch (err) {

            console.error(err);

            throw err;

        }

    };

    // ==========================================
    // Delete Admission
    // ==========================================

    const removeAdmission = async (id) => {

        try {

            await deleteAdmission(id);

            await fetchAdmissions();

        } catch (err) {

            console.error(err);

            throw err;

        }

    };

    // ==========================================
    // Return
    // ==========================================

    return {

        admissions,

        loading,

        error,

        addAdmission,

        editAdmission,

        removeAdmission,

        refreshAdmissions: fetchAdmissions,

    };

};

export default useAdmissions;