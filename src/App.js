// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./components/Login";
// import Footer from "./components/Footer";
// import SignupPage from "./pages/Signup";
// import CitizenDashboard from "./components/CitizenDashboard";
// // import Footer from "./components/Footer";
// import AdminDashboard from "./components/AdminDashboard";
// import ComplaintForm from "./components/ComplaintForm"; // import the form
// import ProtectedRoute from "./components/ProtectedRoute";
// import './styles/styles.css';


// function App() {
//   // const [user, setUser] = useState(null);

//   // const handleLogin = (loggedInUser) => {
//   //   setUser(loggedInUser);
//   // };

//   return (
//     <div className="app">
//       <div className="main-content">
//         <Router>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignupPage />} />

//             {/* Redirect based on role */}
//             <Route
//               path="/citizen-dashboard"
//               element={<ProtectedRoute><CitizenDashboard /></ProtectedRoute>}
//             />
//             <Route
//               path="/admin-dashboard"
//               element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}
//             />
//             <Route path="/complaint"
//               element={<ProtectedRoute><ComplaintForm /></ProtectedRoute>}
//             />
//           </Routes>
//         </Router>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./components/Login";
import Footer from "./components/Footer";
import SignupPage from "./pages/Signup";
import CitizenDashboard from "./components/CitizenDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ComplaintForm from "./components/ComplaintForm";
import ProtectedRoute from "./components/ProtectedRoute";
import './styles/styles.css';

function App() {
  return (
    <div className="app">
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
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
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