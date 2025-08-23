import React, { useState } from "react";
import { createComplaint } from "../api";
import { useLocation, useNavigate } from "react-router-dom";

function ComplaintForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user; // logged-in citizen

  const [formData, setFormData] = useState({
    u_name: user?.u_name || "",
    u_email: user?.u_email || "",
    u_phone: user?.u_phone || "",
    u_category: "",
    u_photo: "",
    u_description: "",
    u_department: "",
    u_location: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "u_photo") {
      setFormData({ ...formData, [name]: files[0]?.name });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User info missing. Please login again.");
      navigate("/login");
      return;
    }
    const payload = {
      ...formData,
      u_status: "Pending",
      u_date: new Date().toISOString(),
      u_name: user.u_name,
      u_email: user.u_email,
      u_phone: user.u_phone
    };
    await createComplaint(payload);
    alert("Complaint Submitted Successfully!");
    // Reset form except user info
    setFormData({
      u_name: user.u_name,
      u_email: user.u_email,
      u_phone: user.u_phone,
      u_category: "",
      u_photo: "",
      u_description: "",
      u_department: "",
      u_location: "",
    });
    navigate("/citizen-dashboard", { state: { user } }); // redirect back to citizen dashboard
  };

  return (
    <form className="complaint-form" onSubmit={handleSubmit}>
      <h3>Register Complaint</h3>

      <label>Name*</label>
      <input name="u_name" value={formData.u_name} readOnly />

      <label>Email*</label>
      <input type="email" name="u_email" value={formData.u_email} readOnly />

      <label>Phone</label>
      <input name="u_phone" value={formData.u_phone} onChange={handleChange} />

      <label>Category of Issue*</label>
      <select name="u_category" value={formData.u_category} required onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="Water">Water</option>
        <option value="Electricity">Electricity</option>
        <option value="Road">Road</option>
        <option value="Sanitation">Sanitation</option>
      </select>

      <label>Upload Photo*</label>
      <input type="file" name="u_photo" required onChange={handleChange} />

      <label>Description*</label>
      <textarea name="u_description" value={formData.u_description} required onChange={handleChange}></textarea>

      <label>Department*</label>
      <select name="u_department" value={formData.u_department} required onChange={handleChange}>
        <option value="">Select Department</option>
        <option value="Water Department">Water Department</option>
        <option value="Electricity Department">Electricity Department</option>
        <option value="Roads Department">Roads Department</option>
        <option value="Sanitation Department">Sanitation Department</option>
      </select>

      <label>Exact Location*</label>
      <input name="u_location" value={formData.u_location} required onChange={handleChange} />

      <button type="submit">Submit Complaint</button>
      <button
        type="button"
        className="cancel-btn"
        onClick={() => navigate("/citizen-dashboard", { state: { user } })}
      >
        Cancel
      </button>

    </form>
  );
}

export default ComplaintForm;
