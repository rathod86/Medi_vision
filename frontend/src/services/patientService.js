import API from "../api/axiosConfig";

// ==============================================
// Get All Patients
// ==============================================

export const getAllPatients = async () => {
  const response = await API.get("/patients");
  return response.data;
};

// ==============================================
// Get Patient By ID
// ==============================================

export const getPatientById = async (id) => {
  const response = await API.get(`/patients/${id}`);
  return response.data;
};

// ==============================================
// Add Patient
// ==============================================

export const addPatient = async (patientData) => {
  const response = await API.post("/patients", patientData);
  return response.data;
};

// ==============================================
// Update Patient
// ==============================================

export const updatePatient = async (id, patientData) => {
  const response = await API.put(`/patients/${id}`, patientData);
  return response.data;
};

// ==============================================
// Delete Patient
// ==============================================

export const deletePatient = async (id) => {
  const response = await API.delete(`/patients/${id}`);
  return response.data;
};

// ==============================================
// Patient Statistics
// ==============================================

export const getPatientStats = async () => {
  try {
    const response = await API.get("/dashboard/patient-stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching patient statistics:", error);
    throw error;
  }
};

// ==============================================
// Upload Patient Image
// ==============================================

export const uploadPatientImage = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
