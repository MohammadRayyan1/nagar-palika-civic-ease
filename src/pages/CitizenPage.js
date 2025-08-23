import React from "react";
import ComplaintForm from "../components/ComplaintForm";
import ComplaintList from "../components/ComplaintList";
import CitizenDashboard from "../components/CitizenDashboard";

function CitizenPage() {
  return (
    <div className="dashboard">
      {/* <h2>Citizen Dashboard</h2> */}
      {/* <ComplaintForm />
      <ComplaintList role="citizen" /> */}
      <CitizenDashboard />
    </div>
  );
}

export default CitizenPage;
