import { useEffect, useState } from "react";
import { fetchComplaints } from "../api";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/styles.css';

function CitizenDashboard() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(""); // 🔍 state for search

  // Get user from location state OR localStorage
  const loggedInUser = location.state?.user || JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!loggedInUser) {
      // If no user, redirect to login
      navigate("/login");
      return null;
    }

    // Save user in localStorage so page reload works
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    // Fetch complaints created by this user
    const getComplaints = async () => {
      try {
        const data = await fetchComplaints();
        console.log("All complaints:", data);
        const myComplaints = data.filter(c => c.u_email === loggedInUser.u_email);
        console.log("Filtered complaints:", myComplaints);
        setComplaints(myComplaints);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    getComplaints();
  }, [loggedInUser, navigate]);

  if (!loggedInUser) return null; // prevents rendering before redirect


  // 🔎 filter complaints based on search text
  const filteredComplaints = complaints.filter((c) => {
    const text = search.toLowerCase();
    return (
      c.u_number?.toLowerCase().includes(text) ||
      c.u_name?.toLowerCase().includes(text) ||
      c.u_category?.toLowerCase().includes(text) ||
      c.u_description?.toLowerCase().includes(text) ||
      c.u_status?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="dashboard-container">
      <h2>Citizen Dashboard</h2>
      <h3>Welcome, {loggedInUser.u_name}</h3>
      <button onClick={() => navigate("/complaint", { state: { user: loggedInUser } })}>
        Create Complaint
      </button>

      {/* 🔍 Search Box */}
      <input
        type="text"
        placeholder="Search complaints..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
      />

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Logout
      </button>

      <h3>Your Complaints</h3>
      {filteredComplaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Photo</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.map((c) => (
              <tr key={c.sys_id}>
                <td>{c.u_number}</td>
                <td>{c.u_name}</td>
                <td>{c.u_category}</td>
                <td>{c.u_description}</td>
                <td>
                  {c.u_photo ? (
                    <img src={c.u_photo} alt="Complaint" width="100" />
                  ) : (
                    "No Photo"
                  )}
                </td>
                <td className={`status-${c.u_status.toLowerCase().replace(" ", "")}`}>
                  {c.u_status}
                </td>
                <td>{new Date(c.u_date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CitizenDashboard;
