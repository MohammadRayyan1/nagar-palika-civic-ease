import React from "react";
import ComplaintList from "../components/ComplaintList";
import AdminDashboard from "../components/AdminDashboard";

function AdminPage() {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      {/* <ComplaintList role="admin" /> */}
      <AdminDashboard />
    </div>
  );
}

export default AdminPage;
