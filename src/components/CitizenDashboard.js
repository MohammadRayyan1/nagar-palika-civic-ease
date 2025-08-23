import { useEffect, useState } from "react";
import { fetchComplaints } from "../api";
import { useNavigate, useLocation } from "react-router-dom";
import '../styles/styles.css';

function CitizenDashboard() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <div className="dashboard-container">
      <h2>Citizen Dashboard</h2>
      <h3>Welcome, {loggedInUser.u_name}</h3>
      <button onClick={() => navigate("/complaint", { state: { user: loggedInUser } })}>
        Create Complaint
      </button>
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
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.sys_id}>
                <td>{c.u_number}</td>
                <td>{c.u_name}</td>
                <td>{c.u_category}</td>
                <td>{c.u_description}</td>
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
