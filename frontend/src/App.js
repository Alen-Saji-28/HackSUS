import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import BookingForm from "./components/BookingForm";
import JobFeed from "./components/JobFeed";
import LiveTracking from "./components/LiveTracking";
import DriverLogin from "./pages/DriverLogin"; // Import Driver Login Page
import DriverDashboard from "./pages/DriverDashboard";
import NewUserDashboard from "./pages/NewUserDashboard";
import DriverRegistration from "./pages/DriverRegistration";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/driver-login" element={<DriverLogin />} />
        <Route path="/jobs" element={<JobFeed />} />
        <Route path="/track" element={<LiveTracking />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/newuserdashboard" element={<NewUserDashboard />} /> 
        <Route path="/driver-register" element={<DriverRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
