import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/styles.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <div className="homepage-card">
        <h1>Welcome to Civic Ease</h1>
        <p>Report civic issues to your local Nagar Palika easily</p>
          <button className="homepage-button" onClick={() => navigate("/login")}>Login</button>
          <button className="homepage-button" onClick={() => navigate("/signup")}>Sign Up</button>
      </div>
    </div>
  );
}

export default HomePage;
