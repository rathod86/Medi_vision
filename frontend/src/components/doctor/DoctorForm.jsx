import { useState, useEffect } from "react";
import { uploadDoctorImage } from "../../services/doctorService";
import "./DoctorForm.css";

const DoctorForm = ({
  initialData = {},
  onSubmit,
  loading = false,
  buttonText = "Save Doctor",
}) => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    department: "",
    specialization: "",
    qualification: "",
    experience: "",
    consultationFee: "",
    licenseNumber: "",
    joiningDate: "",
    address: "",
    status: "Active",
    profileImage: "",
  });

  const [errors, setErrors] = useState({});

  // =====================================
  // Load Doctor Data (Edit Mode)
  // =====================================

  useEffect(() => {

    if (Object.keys(initialData).length > 0) {

      setFormData({
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        gender: initialData.gender || "",
        dateOfBirth: initialData.dateOfBirth || "",
        department: initialData.department || "",
        specialization: initialData.specialization || "",
        qualification: initialData.qualification || "",
        experience: initialData.experience ?? "",
        consultationFee: initialData.consultationFee ?? "",
        licenseNumber: initialData.licenseNumber || "",
        joiningDate: initialData.joiningDate || "",
        address: initialData.address || "",
        status: initialData.status || "Active",
        profileImage: initialData.profileImage || "",
      });

    }

  }, [initialData]);

  // =====================================
  // Handle Input Change
  // =====================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // =====================================
  // Handle Image
  // =====================================

  const handleImageChange = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  try {

    const uploadedFileName = await uploadDoctorImage(file);

    setFormData((prev) => ({
      ...prev,
      profileImage: uploadedFileName,
    }));

  } catch (error) {

    console.error(error);

    alert("Image upload failed.");

  }

};
  

 
  // =====================================
  // Validation
  // =====================================

  const validate = () => {

    let newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Doctor Name is required";

    if (!formData.email.trim())
      newErrors.email = "Email is required";

    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid Email";

    if (!formData.phone.trim())
      newErrors.phone = "Phone is required";

    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "Phone must contain 10 digits";

    if (!formData.department.trim())
      newErrors.department = "Department is required";

    if (!formData.specialization.trim())
      newErrors.specialization = "Specialization is required";

    if (!formData.qualification.trim())
      newErrors.qualification = "Qualification is required";

    if (!formData.experience)
      newErrors.experience = "Experience is required";

    if (!formData.consultationFee)
      newErrors.consultationFee = "Consultation Fee is required";

    if (!formData.licenseNumber.trim())
      newErrors.licenseNumber = "License Number is required";

    if (!formData.gender.trim())
      newErrors.gender = "Gender is required";

    if (formData.dateOfBirth) {

      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (dob >= today) {
        newErrors.dateOfBirth =
          "Date of birth must be in the past";
      }

    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;

  };

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) return;

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      gender: formData.gender,
      department: formData.department.trim(),
      specialization: formData.specialization.trim(),
      qualification: formData.qualification.trim(),
      experience: Number(formData.experience),
      consultationFee: Number(formData.consultationFee),
      licenseNumber: formData.licenseNumber.trim(),
      joiningDate: formData.joiningDate || null,
      address: formData.address?.trim() || "",
      status: formData.status || "Active",
      profileImage: formData.profileImage || null
    };

    if (formData.dateOfBirth) {
      payload.dateOfBirth = formData.dateOfBirth;
    }

    onSubmit(payload);

  };

  return (

    <form className="doctor-form" onSubmit={handleSubmit}>

      <h2>Doctor Information</h2>

      <div className="form-grid">

        {/* Doctor Name */}

        <div className="form-group">
          <label>Doctor Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleChange}
          />
          <small>{errors.fullName}</small>
        </div>

        {/* Email */}

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
          />
          <small>{errors.email}</small>
        </div>

        {/* Phone */}

        <div className="form-group">
          <label>Phone *</label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
          />
          <small>{errors.phone}</small>
        </div>

        {/* Gender */}

        <div className="form-group">
          <label>Gender *</label>

          <select
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

        </div>

        {/* DOB */}

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth || ""}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleChange}
          />
          <small>{errors.dateOfBirth}</small>
        </div>

        {/* Joining Date */}

        <div className="form-group">
          <label>Joining Date</label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate || ""}
            onChange={handleChange}
          />
        </div>

        {/* Department */}

        <div className="form-group">
          <label>Department *</label>
          <input
            type="text"
            name="department"
            value={formData.department || ""}
            onChange={handleChange}
          />
          <small>{errors.department}</small>
        </div>

        {/* Specialization */}

        <div className="form-group">
          <label>Specialization *</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization || ""}
            onChange={handleChange}
          />
          <small>{errors.specialization}</small>
        </div>

        {/* Qualification */}

        <div className="form-group">
          <label>Qualification *</label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification || ""}
            onChange={handleChange}
          />
          <small>{errors.qualification}</small>
        </div>

        {/* Experience */}

        <div className="form-group">
          <label>Experience *</label>
          <input
            type="number"
            name="experience"
            value={formData.experience ?? ""}
            onChange={handleChange}
          />
          <small>{errors.experience}</small>
        </div>

        {/* Consultation Fee */}

        <div className="form-group">
          <label>Consultation Fee *</label>
          <input
            type="number"
            name="consultationFee"
            value={formData.consultationFee ?? ""}
            onChange={handleChange}
          />
          <small>{errors.consultationFee}</small>
        </div>

        {/* License */}

        <div className="form-group">
          <label>License Number *</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber || ""}
            onChange={handleChange}
          />
          <small>{errors.licenseNumber}</small>
        </div>

        {/* Status */}

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={formData.status || "Active"}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>

        </div>

         {/* Image */}

<div className="form-group">

  <label>Profile Image</label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
  />

  {formData.profileImage && (

    <div style={{ marginTop: "10px" }}>

      <img
        src={`http://localhost:8080/uploads/${formData.profileImage}`}
        alt="Doctor"
        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://cdn-icons-png.flaticon.com/512/387/387561.png";
        }}
      />

      <br />

      <small style={{ color: "green" }}>
        {formData.profileImage}
      </small>

    </div>

  )}

</div>

</div>   {/* <-- This closes the form-grid */}

{/* Address */}

<div className="form-group full-width">

  <label>Address</label>

  <textarea
    rows="4"
    name="address"
    value={formData.address || ""}
    onChange={handleChange}
  />

</div>

      {/* Button */}

      <div className="form-buttons">

        <button
          type="submit"
          className="save-btn"
          disabled={loading}
        >
          {loading ? "Saving..." : buttonText}
        </button>

      </div>

    </form>

  );

};

export default DoctorForm;