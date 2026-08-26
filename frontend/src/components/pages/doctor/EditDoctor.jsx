import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DoctorForm from "../../doctor/DoctorForm";
import {
  getDoctorById,
  updateDoctor,
} from "../../../services/doctorService";

import "./EditDoctor.css";

const EditDoctor = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({});

  const [loading, setLoading] = useState(false);

  // ===================================
  // Load Doctor Details
  // ===================================

  useEffect(() => {
    loadDoctor();
  }, []);

  const loadDoctor = async () => {
    try {

      const response = await getDoctorById(id);

      setDoctor(response);

    } catch (error) {

      console.error(error);

      alert("Unable to load Doctor");

    }
  };

  // ===================================
  // Update Doctor
  // ===================================

  const handleSubmit = async (doctorData) => {

    try {

      setLoading(true);

      await updateDoctor(id, doctorData);

      alert("Doctor Updated Successfully");

      navigate("/doctors");

    } catch (error) {

      console.error(error);

      alert("Failed to Update Doctor");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="edit-doctor-page">

      <DoctorForm
        initialData={doctor}
        onSubmit={handleSubmit}
        loading={loading}
        buttonText="Update Doctor"
      />

    </div>

  );

};

export default EditDoctor;