import { useState } from "react";
import { authenticateUser } from "../api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = await authenticateUser(username, password);
    if (!user) {
      alert("Invalid username or password");
      return;
    }

    // Save user in localStorage
    localStorage.setItem("user", JSON.stringify(user));

    // Navigate to dashboard based on role
    if (user.u_role === "citizen") {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/citizen-dashboard", { state: { user } });
    } else if (user.u_role === "admin") {
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/admin", { state: { user } });
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input type="text" placeholder="Email" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <button style={{ background: "#8C1007", color: "white" }}
          type="button"
          className="cancel-btn"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>Don't have an account? <button onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>Sign Up</button></p>
    </div>
  );
}

export default LoginPage;