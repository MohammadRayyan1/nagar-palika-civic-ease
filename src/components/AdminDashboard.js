import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchComplaints, updateComplaint } from "../api";


function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getComplaints = async () => {
      const data = await fetchComplaints();
      setComplaints(data);
    };
    getComplaints();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await updateComplaint(id, newStatus);
    // Refresh complaints
    const updated = await fetchComplaints();
    setComplaints(updated);
  };

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login")
        }}
      >
        Logout
      </button>

      {complaints.length === 0 ? (
        <p>No complaints available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.u_number}>
                <td>{c.u_number}</td>
                <td>{c.u_name}</td>
                <td>{c.u_category}</td>
                <td>{c.u_description}</td>
                <td>{c.u_location}</td>
                <td>{c.u_status}</td>
                <td>
                  <select
                    value={c.u_status}
                    onChange={(e) => handleStatusChange(c.sys_id, e.target.value)}
                  >
                    <option value="Select option">--Select option--</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;