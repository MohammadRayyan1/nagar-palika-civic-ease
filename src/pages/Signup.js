// src/pages/SignupPage.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api"; // API call
import "../styles/styles.css";

function SignupPage() {
  const [formData, setFormData] = useState({
    u_name: "",
    u_username: "",
    u_email: "",
    u_password: "",
    u_role: "citizen",
    u_phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(formData);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error signing up, try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="u_name" placeholder="Full Name" value={formData.u_name} onChange={handleChange} required />
        <input type="text" name="u_username" placeholder="Username" value={formData.u_username} onChange={handleChange} required />
        <input type="email" name="u_email" placeholder="Email" value={formData.u_email} onChange={handleChange} required />
        <input type="password" name="u_password" placeholder="Password" value={formData.u_password} onChange={handleChange} required />
        <input type="text" name="u_phone" placeholder="Phone" value={formData.u_phone} onChange={handleChange} />
        <select name="u_role" value={formData.u_role} onChange={handleChange}>
          <option value="citizen">Citizen</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Sign Up</button>
        <button style={{ background: "#8C1007", color: "white" }}
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/login")}
        >
          Cancel
        </button>
      </form>
      <p>Already have an account? <button onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>Login</button></p>
    </div>
  );
}

export default SignupPage;