import { useEffect, useState } from "react";
import "./PatientForm.css";

const PatientForm = ({
  initialData = {},
  onSubmit,
  loading = false,
  buttonText = "Save Patient",
}) => {

  // =====================================
  // Form State
  // =====================================

  const [formData, setFormData] = useState({

    fullName: "",

    email: "",

    phone: "",

    gender: "",

    dateOfBirth: "",

      age: "",

    bloodGroup: "",

    maritalStatus: "",

    occupation: "",

    height: "",

    weight: "",

    allergies: "",

    medicalHistory: "",

    assignedDoctor: "",

    address: "",

    city: "",

    state: "",

    pincode: "",

    emergencyContactName: "",

    emergencyContactPhone: "",

    status: "Active",

    profileImage: "",

  });

  // =====================================
  // Validation Errors
  // =====================================

  const [errors, setErrors] = useState({});

  // =====================================
  // Image Preview
  // =====================================

  const [preview, setPreview] = useState("");

  // =====================================
  // Load Existing Patient
  // =====================================

  useEffect(() => {

    if (Object.keys(initialData).length > 0) {

      setFormData({

        fullName: initialData.fullName || "",

        email: initialData.email || "",

        phone: initialData.phone || "",

        gender: initialData.gender || "",

        dateOfBirth: initialData.dateOfBirth || "",

        age: initialData.age || "",

        bloodGroup: initialData.bloodGroup || "",

        maritalStatus: initialData.maritalStatus || "",

        occupation: initialData.occupation || "",

        height: initialData.height || "",

        weight: initialData.weight || "",

        allergies: initialData.allergies || "",

        medicalHistory: initialData.medicalHistory || "",

        assignedDoctor: initialData.assignedDoctor || "",

        address: initialData.address || "",

        city: initialData.city || "",

        state: initialData.state || "",

        pincode: initialData.pincode || "",

        emergencyContactName:
          initialData.emergencyContactName || "",

        emergencyContactPhone:
          initialData.emergencyContactPhone || "",

        status: initialData.status || "Active",

        profileImage: initialData.profileImage || "",

      });

      if (initialData.profileImage) {

        setPreview(
          `http://localhost:8080/uploads/${initialData.profileImage}`
        );

      }

    }

  }, [initialData]);

  // =====================================
  // Input Change
  // =====================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  // =====================================
  // Image Upload
  // =====================================

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    setPreview(URL.createObjectURL(file));

  };

  // =====================================
  // Validation
  // =====================================

  const validate = () => {

    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Patient Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid Email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone Number must contain 10 digits";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    }

    if (!formData.bloodGroup) {
      newErrors.bloodGroup = "Blood Group is required";
    }

    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone =
        "Emergency Contact Number is required";
    } else if (
      !/^[0-9]{10}$/.test(formData.emergencyContactPhone)
    ) {
      newErrors.emergencyContactPhone =
        "Emergency Contact Number must contain 10 digits";
    }

    if (
      formData.pincode &&
      !/^[0-9]{6}$/.test(formData.pincode)
    ) {
      newErrors.pincode = "Pincode must contain 6 digits";
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

    onSubmit(formData);

  };

  // =====================================
  // UI
  // =====================================

  return (

    <form
      className="patient-form"
      onSubmit={handleSubmit}
    >

      <h2>Patient Information</h2>

      {/* ===============================
          Image Upload
      =============================== */}

      <div className="image-upload-section">

        <img
          src={
            preview ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Patient"
          className="patient-preview-image"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

      </div>

      <div className="form-grid">

        {/* Patient Name */}

        <div className="form-group">

          <label>Patient Name *</label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
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
            value={formData.email}
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
            value={formData.phone}
            onChange={handleChange}
          />

          <small>{errors.phone}</small>

        </div>

        {/* Gender */}

        <div className="form-group">

          <label>Gender *</label>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >

            <option value="">Select Gender</option>

            <option value="Male">Male</option>

            <option value="Female">Female</option>

            <option value="Other">Other</option>

          </select>

          <small>{errors.gender}</small>

        </div>

        {/* Date of Birth */}

        <div className="form-group">

          <label>Date of Birth *</label>

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />

          <small>{errors.dateOfBirth}</small>

        </div>

        {/* Age */}

<div className="form-group">

    <label>Age *</label>

    <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
    />

    <small>{errors.age}</small>

</div>

        {/* Blood Group */}

        <div className="form-group">

          <label>Blood Group *</label>

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
          >

            <option value="">Select Blood Group</option>

            <option value="A+">A+</option>

            <option value="A-">A-</option>

            <option value="B+">B+</option>

            <option value="B-">B-</option>

            <option value="AB+">AB+</option>

            <option value="AB-">AB-</option>

            <option value="O+">O+</option>

            <option value="O-">O-</option>

          </select>

          <small>{errors.bloodGroup}</small>

        </div>

        {/* Marital Status */}

        <div className="form-group">

          <label>Marital Status</label>

          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
          >

            <option value="">Select</option>

            <option value="Single">Single</option>

            <option value="Married">Married</option>

            <option value="Divorced">Divorced</option>

            <option value="Widowed">Widowed</option>

          </select>

        </div>

        {/* Occupation */}

        <div className="form-group">

          <label>Occupation</label>

          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
          />

        </div>

        {/* Height */}

        <div className="form-group">

          <label>Height (cm)</label>

          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />

        </div>

        {/* Weight */}

        <div className="form-group">

          <label>Weight (kg)</label>

          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />

        </div>

                {/* Allergies */}

        <div className="form-group">

          <label>Allergies</label>

          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            placeholder="Ex: Penicillin, Dust..."
          />

        </div>

        {/* Assigned Doctor */}

        <div className="form-group">

          <label>Assigned Doctor</label>

          <input
            type="text"
            name="assignedDoctor"
            value={formData.assignedDoctor}
            onChange={handleChange}
            placeholder="Doctor Name"
          />

        </div>

      </div>

      {/* =====================================
          Medical History
      ===================================== */}

      <div className="form-group full-width">

        <label>Medical History</label>

        <textarea
          rows="4"
          name="medicalHistory"
          value={formData.medicalHistory}
          onChange={handleChange}
          placeholder="Enter patient's medical history..."
        />

      </div>

      {/* =====================================
          Address Information
      ===================================== */}

      <h2 className="section-title">
        Address Information
      </h2>

      <div className="form-grid">

        {/* Address */}

        <div className="form-group full-width">

          <label>Address</label>

          <textarea
            rows="3"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

        </div>

        {/* City */}

        <div className="form-group">

          <label>City</label>

          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

        </div>

        {/* State */}

        <div className="form-group">

          <label>State</label>

          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />

        </div>

        {/* Pincode */}

        <div className="form-group">

          <label>Pincode</label>

          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />

          <small>{errors.pincode}</small>

        </div>

      </div>

      {/* =====================================
          Emergency Contact
      ===================================== */}

      <h2 className="section-title">
        Emergency Contact
      </h2>

      <div className="form-grid">

        {/* Emergency Contact Name */}

        <div className="form-group">

          <label>Contact Person *</label>

          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
          />

          <small>{errors.emergencyContactName}</small>

        </div>

        {/* Emergency Contact Number */}

        <div className="form-group">

          <label>Emergency Phone *</label>

          <input
            type="text"
            name="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={handleChange}
          />

          <small>{errors.emergencyContactPhone}</small>

        </div>

        {/* Status */}

        <div className="form-group">

          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >

            <option value="Active">
              Active
            </option>

            <option value="Admitted">
              Admitted
            </option>

            <option value="Discharged">
              Discharged
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </div>

      </div>

      {/* =====================================
          Buttons
      ===================================== */}

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

export default PatientForm;