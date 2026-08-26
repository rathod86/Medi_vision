import { useEffect, useState } from "react";

import {
  getAllPatients,
  deletePatient,
} from "../services/patientService";

const usePatients = () => {

  // ==============================
  // States
  // ==============================

  const [patients, setPatients] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // ==============================
  // Fetch Patients
  // ==============================

  const fetchPatients = async () => {

    setLoading(true);

    setError("");

    try {

      const data = await getAllPatients();

      setPatients(data);

    } catch (err) {

      console.error(err);

      setError("Failed to fetch patients.");

    } finally {

      setLoading(false);

    }

  };

  // ==============================
  // Delete Patient
  // ==============================

  const removePatient = async (id) => {

    try {

      await deletePatient(id);

      fetchPatients();

    } catch (err) {

      console.error(err);

      setError("Failed to delete patient.");

    }

  };

  // ==============================
  // Refresh
  // ==============================

  const refreshPatients = () => {

    fetchPatients();

  };

  // ==============================
  // Load Data
  // ==============================

  useEffect(() => {

    fetchPatients();

  }, []);

  // ==============================
  // Return
  // ==============================

  return {

    patients,

    loading,

    error,

    fetchPatients,

    refreshPatients,

    removePatient,

  };

};

export default usePatients;