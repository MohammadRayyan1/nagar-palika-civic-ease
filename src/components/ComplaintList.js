import React, { useEffect, useState } from "react";
import { fetchComplaints, updateComplaint } from "../api";

function ComplaintList({ role }) {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await fetchComplaints();
      setComplaints(data);
    }
    load();
  }, []);

  const changeStatus = async (id, newStatus) => {
    await updateComplaint(id, newStatus);
    const updated = complaints.map((c) =>
      c.sys_id === id ? { ...c, u_status: newStatus } : c
    );
    setComplaints(updated);
  };

  return (
    <div className="complaint-list">
      <h3>{role === "admin" ? "All Complaints" : "My Complaints"}</h3>
      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <ul>
          {complaints.map((c) => (
            <li key={c.sys_id}>
              <b>{c.u_category}</b> — {c.u_description}
              <br />
              <small>
                By {c.u_name} ({c.u_email}) | {c.u_date} | Status:{" "}
                <i>{c.u_status}</i>
              </small>
              {role === "admin" && (
                <select
                  value={c.u_status}
                  onChange={(e) => changeStatus(c.sys_id, e.target.value)}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ComplaintList;
