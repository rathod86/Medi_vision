import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DoctorForm from "../../doctor/DoctorForm";
import { addDoctor } from "../../../services/doctorService";

import "./AddDoctor.css";

const AddDoctor = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // ===============================
  // Save Doctor
  // ===============================

  const handleSubmit = async (doctorData) => {

    try {

      setLoading(true);

      await addDoctor(doctorData);

      navigate(
        "/doctors",
        {
          state: {
            message: "Doctor added successfully."
          }
        }
      );

    } catch (error) {

      console.error("Backend Error :", error);

      const message =
        error.response?.data?.message ||
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        "Failed to add doctor. Check all fields and try again.";

      alert(message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="add-doctor-page">

      <DoctorForm
        onSubmit={handleSubmit}
        loading={loading}
        buttonText="Save Doctor"
      />

    </div>

  );

};

export default AddDoctor;