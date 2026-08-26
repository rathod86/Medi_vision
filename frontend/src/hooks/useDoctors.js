import { useEffect, useState } from "react";

import {
  getAllDoctors,
  deleteDoctor,
} from "../services/doctorService";

const useDoctors = () => {

  // ==============================
  // States
  // ==============================

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==============================
  // Load Doctors
  // ==============================

  const fetchDoctors = async () => {

    setLoading(true);
    setError("");

    try {

      const data = await getAllDoctors();

      setDoctors(data);

    } catch (err) {

      console.error(err);

      setError("Failed to fetch doctors.");

    } finally {

      setLoading(false);

    }

  };

  // ==============================
  // Delete Doctor
  // ==============================

  const removeDoctor = async (id) => {

    try {

      await deleteDoctor(id);

      alert("Doctor deleted successfully.");

      fetchDoctors();

    } catch (err) {

      console.error(err);

      alert("Failed to delete doctor.");

      setError("Failed to delete doctor.");

    }

  };

  // ==============================
  // Refresh
  // ==============================

  const refreshDoctors = () => {

    fetchDoctors();

  };

  // ==============================
  // Initial Load
  // ==============================

  useEffect(() => {

    fetchDoctors();

  }, []);

  return {

    doctors,

    loading,

    error,

    fetchDoctors,

    refreshDoctors,

    removeDoctor,

  };

};

export default useDoctors;