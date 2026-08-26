import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PatientForm from "../../patient/PatientForm";

import {
  addPatient,
  uploadPatientImage,
} from "../../../services/patientService";

const AddPatient = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // =====================================
  // Save Patient
  // =====================================

  const handleSubmit = async (formData) => {

    try {

      setLoading(true);

      // ===============================
      // Upload Image
      // ===============================

      if (formData.profileImage instanceof File) {

        const imagePath = await uploadPatientImage(
          formData.profileImage
        );

        formData.profileImage = imagePath;

      }

      // ===============================
      // Save Patient
      // ===============================

      await addPatient(formData);

      toast.success("Patient Added Successfully");

      navigate("/patients");

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to add patient."
      );

    } finally {

      setLoading(false);

    }

  };

  // =====================================
  // UI
  // =====================================

  return (

    <div className="add-patient-page">

      <PatientForm

        onSubmit={handleSubmit}

        loading={loading}

        buttonText="Save Patient"

      />

    </div>

  );

};

export default AddPatient;