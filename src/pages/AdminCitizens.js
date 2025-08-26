import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api";
import { useNavigate } from "react-router-dom";

function AdminCitizens() {
  const [citizens, setCitizens] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // 🔍 state for search


  useEffect(() => {
    const getCitizens = async () => {
      const data = await fetchUsers();
      setCitizens(data);
    };
    getCitizens();
  }, []);

  const handleDeleteCitizen = async (sys_id) => {
    if (window.confirm("Are you sure you want to delete this citizen?")) {
      await deleteUser(sys_id);
      setCitizens(citizens.filter((c) => c.sys_id !== sys_id));
    }
  };


  // 🔎 filter users based on search text
  const filteredCitizens = citizens.filter((c) => {
    const text = search.toLowerCase();
    return (
      c.u_name?.toLowerCase().includes(text) ||
      c.u_email?.toLowerCase().includes(text) ||
      c.u_phone?.toLowerCase().includes(text)
    );
  });

  return (
    <div className="dashboard-container">
      <h2>Citizens List</h2>
      <button onClick={() => navigate("/admin")}>Back to Dashboard</button>
      <button onClick={() => navigate("/admin/add-user")}>Add New User</button>
      {/* 🔍 Search Box */}
      <input
        type="text"
        placeholder="Search User..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ flex: 1, padding: "8px" }}
      />


      {filteredCitizens.length === 0 ? (
        <p>No citizens found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCitizens.map((c) => (
              <tr key={c.sys_id}>
                <td>{c.u_name}</td>
                <td>{c.u_email}</td>
                <td>{c.u_phone}</td>
                <td>
                  <button onClick={() => handleDeleteCitizen(c.sys_id)}>
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

export default AdminCitizens;
