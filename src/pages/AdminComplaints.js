import { useEffect, useState } from "react";
import { fetchComplaints, updateComplaint, deleteComplaint } from "../api";
import { useNavigate } from "react-router-dom";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState(""); // 🔍 state for search
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
    const updated = await fetchComplaints();
    setComplaints(updated);
  };

  const handleDeleteComplaint = async (sys_id) => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      await deleteComplaint(sys_id);
      setComplaints(complaints.filter((c) => c.sys_id !== sys_id));
    }
  };

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
      <h2>All Complaints</h2>

      {/* Buttons Row */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <button onClick={() => navigate("/admin")}>Back to Dashboard</button>
        {/* 🔍 Search Box */}
        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
      </div>

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
              <th>Status</th>
              <th>Actions</th>
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
                  <select
                    value={c.u_status}
                    onChange={(e) =>
                      handleStatusChange(c.sys_id, e.target.value)
                    }
                    className={
                      c.u_status === "Pending"
                        ? "status-pending"
                        : c.u_status === "In Progress"
                        ? "status-inprogress"
                        : "status-completed"
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleDeleteComplaint(c.sys_id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminComplaints;
