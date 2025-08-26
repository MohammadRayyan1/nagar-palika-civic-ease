import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./components/Login";
import Footer from "./components/Footer";
import SignupPage from "./pages/Signup";
import CitizenDashboard from "./components/CitizenDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AdminCitizens from "./pages/AdminCitizens";
import AdminComplaints from "./pages/AdminComplaints";
import ComplaintForm from "./components/ComplaintForm"; // import the form
import ProtectedRoute from "./components/ProtectedRoute";
import AddUser from "./components/AddUser";
import './styles/styles.css';
import CameraCapture from "./components/CameraCapture";

function App() {
  return (
    <div className="app">
      {/* <CameraCapture /> */}
      <Router>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Redirect based on role */}
            <Route
              path="/citizen-dashboard"
              element={
                <ProtectedRoute>
                  <CitizenDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/citizens"
              element={
                <AdminCitizens />
              }
            />
            <Route
              path="/admin/add-user"
              element={<AddUser />}
            />
            <Route
              path="/admin/complaints"
              element={
                <AdminComplaints />
              }
            />
            <Route
              path="/complaint"
              element={
                <ProtectedRoute>
                  <ComplaintForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;