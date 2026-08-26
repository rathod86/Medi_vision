import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import PatientForm from "../../patient/PatientForm";

import {
  getPatientById,
  updatePatient,
  uploadPatientImage,
} from "../../../services/patientService";

const EditPatient = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [patient, setPatient] = useState({});

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  // =====================================
  // Load Patient
  // =====================================

  useEffect(() => {

    loadPatient();

  }, []);

  const loadPatient = async () => {

    try {

      const data = await getPatientById(id);

      setPatient(data);

    } catch (error) {

      console.error(error);

      toast.error("Failed to load patient.");

    } finally {

      setLoading(false);

    }

  };

  // =====================================
  // Update Patient
  // =====================================

  const handleSubmit = async (formData) => {

    try {

      setSaving(true);

      // Upload new image if selected

      if (formData.profileImage instanceof File) {

        const imagePath = await uploadPatientImage(
          formData.profileImage
        );

        formData.profileImage = imagePath;

      }

      await updatePatient(id, formData);

      toast.success("Patient Updated Successfully");

      navigate("/patients");

    } catch (error) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to update patient."
      );

    } finally {

      setSaving(false);

    }

  };

  // =====================================
  // Loading
  // =====================================

  if (loading) {

    return (

      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Patient...
      </h2>

    );

  }

  // =====================================
  // UI
  // =====================================

  return (

  <div className="edit-patient-page">

    <div className="edit-patient-header">

      <div>

        <h2>Edit Patient</h2>

        <p>Update patient information.</p>

      </div>

      <button
        className="back-btn"
        onClick={() => navigate("/patients")}
      >
        Back
      </button>

    </div>

    <PatientForm
      initialData={patient}
      onSubmit={handleSubmit}
      loading={saving}
      buttonText="Update Patient"
    />

  </div>

);

};

export default EditPatient;