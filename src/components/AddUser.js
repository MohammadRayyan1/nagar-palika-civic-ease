import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api"; // <-- make sure you have this API function
import "../styles/styles.css";

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    u_name: "",
    u_username: "",
    u_email: "",
    u_password: "",
    u_role: "citizen",
    u_phone: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(formData); // API call
      alert("User added successfully!");
      navigate("/admin/citizens"); // redirect back
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New User</h2>
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
        <button type="submit">Add User</button>
        <button style={{ background: "#8C1007", color: "white" }}
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/admin/citizens")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddUser;
