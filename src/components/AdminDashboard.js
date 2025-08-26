// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchComplaints,
//   updateComplaint,
//   deleteComplaint,
//   fetchUsers,
//   deleteUser,
// } from "../api";

// function AdminDashboard() {
//   const [view, setView] = useState("complaints"); // "complaints" or "citizens"
//   const [complaints, setComplaints] = useState([]);
//   const [citizens, setCitizens] = useState([]);
//   const navigate = useNavigate();

//   // Fetch complaints or citizens based on current view
//   useEffect(() => {
//     if (view === "complaints") {
//       const getComplaints = async () => {
//         const data = await fetchComplaints();
//         setComplaints(data);
//       };
//       getComplaints();
//     } else if (view === "citizens") {
//       const getCitizens = async () => {
//         const data = await fetchUsers();
//         setCitizens(data);
//       };
//       getCitizens();
//     }
//   }, [view]);

//   // Update complaint status
//   const handleStatusChange = async (id, newStatus) => {
//     await updateComplaint(id, newStatus);
//     const updated = await fetchComplaints();
//     setComplaints(updated);
//   };

//   // Delete complaint
//   const handleDeleteComplaint = async (sys_id) => {
//     if (window.confirm("Are you sure you want to delete this complaint?")) {
//       await deleteComplaint(sys_id);
//       setComplaints(complaints.filter((c) => c.sys_id !== sys_id));
//     }
//   };

//   // Delete citizen
//   const handleDeleteCitizen = async (sys_id) => {
//     if (window.confirm("Are you sure you want to delete this citizen?")) {
//       await deleteUser(sys_id);
//       setCitizens(citizens.filter((c) => c.sys_id !== sys_id));
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <h2>Admin Dashboard</h2>
//       <button
//         className="logout-btn"
//         onClick={() => {
//           localStorage.removeItem("user");
//           navigate("/login");
//         }}
//       >
//         Logout
//       </button>

//       <div style={{ margin: "20px 0" }}>
//         <button onClick={() => setView("citizens")}>Show Citizens List</button>
//         <button onClick={() => setView("complaints")}>Show Complaints</button>
//       </div>

//       {view === "complaints" && (
//         <div>
//           {complaints.length === 0 ? (
//             <p>No complaints available.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Category</th>
//                   <th>Description</th>
//                   <th>Photo</th>
//                   <th>Location</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {complaints.map((c) => (
//                   <tr key={c.sys_id}>
//                     <td>{c.u_number}</td>
//                     <td>{c.u_name}</td>
//                     <td>{c.u_category}</td>
//                     <td>{c.u_description}</td>
//                     <td>
//                       {c.u_photo ? (
//                         <img src={c.u_photo} alt="Complaint" width="100" />
//                       ) : (
//                         "No Photo"
//                       )}
//                     </td>
//                     <td>{c.u_location}</td>
//                     <td>
//                       <select
//                         value={c.u_status}
//                         onChange={(e) =>
//                           handleStatusChange(c.sys_id, e.target.value)
//                         }
//                       >
//                         <option value="Pending">Pending</option>
//                         <option value="In Progress">In Progress</option>
//                         <option value="Resolved">Resolved</option>
//                       </select>
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => handleDeleteComplaint(c.sys_id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       {view === "citizens" && (
//         <div>
//           {citizens.length === 0 ? (
//             <p>No citizens available.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Phone</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {citizens.map((c) => (
//                   <tr key={c.sys_id}>
//                     <td>{c.u_name}</td>
//                     <td>{c.u_email}</td>
//                     <td>{c.u_phone}</td>
//                     <td>
//                       <button onClick={() => handleDeleteCitizen(c.sys_id)}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       )}

//       <button
//         className="go-back-btn"
//         onClick={() => navigate("/admin-dashboard")}
//         style={{ marginTop: "20px" }}
//       >
//         Go Back
//       </button>
//     </div>
//   );
// }

// export default AdminDashboard;


import { useNavigate } from "react-router-dom";
import '../styles/styles.css';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-card">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the admin dashboard. Here you can manage citizens and complaints.</p>
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </button>

        <div style={{ margin: "20px 0" }}>
          <button onClick={() => navigate("/admin/citizens")}>
            Show Citizens List
          </button>
          <button onClick={() => navigate("/admin/complaints")}>
            Show All Complaints
          </button>
        </div>
      </div>
    </div>

  );
}

export default AdminDashboard;
