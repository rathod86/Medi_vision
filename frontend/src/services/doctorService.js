import API from "../api/axiosConfig";

export const getAllDoctors = async () => {

  const response = await API.get("/doctors");

  return response.data;

};

export const getDoctorById = async (id) => {

  const response = await API.get(`/doctors/${id}`);

  return response.data;

};

export const addDoctor = async (doctorData) => {

  const response = await API.post("/doctors", doctorData);

  return response.data;

};

export const updateDoctor = async (id, doctorData) => {

  const response = await API.put(`/doctors/${id}`, doctorData);

  return response.data;

};

export const deleteDoctor = async (id) => {

  const response = await API.delete(`/doctors/${id}`);

  return response.data;

};

export const getDoctorStats = async () => {

  try {

    const response = await API.get("/dashboard/doctor-stats");

    return response.data;

  } catch (error) {

    console.error("Error fetching doctor statistics:", error);

    throw error;

  }

};

export const uploadDoctorImage = async (file) => {

  try {

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

  } catch (error) {

    console.error("Error uploading doctor image:", error);

    throw error;

  }

};
