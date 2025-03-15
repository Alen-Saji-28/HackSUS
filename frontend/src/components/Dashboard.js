import React from "react";
import { Link } from "react-router-dom";
import { FaCalendarCheck, FaTruck, FaMapMarkedAlt, FaSignOutAlt } from "react-icons/fa";

const dashboardContainer = {
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(135deg, #1e3c72, #2a5298)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "50px",
  color: "white",
  fontFamily: "'Poppins', sans-serif",
};

const headerStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const cardContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
  width: "80%",
  justifyContent: "center",
};

const cardStyle = {
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  padding: "20px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease-in-out",
  cursor: "pointer",
};

const iconStyle = {
  fontSize: "30px",
  marginBottom: "10px",
};

const logoutStyle = {
  position: "absolute",
  bottom: "20px",
  right: "20px",
  fontSize: "18px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  background: "rgba(255, 255, 255, 0.3)",
  padding: "10px 20px",
  borderRadius: "8px",
  transition: "0.3s",
};

const jobs = [
  { id: 1, location: "Downtown", weight: "12kg", status: "Pending" },
  { id: 2, location: "Main Street", weight: "8kg", status: "Ongoing" },
  { id: 3, location: "Market Area", weight: "10kg", status: "Completed" },
];

const Dashboard = () => {
  return (
    <div style={dashboardContainer}>
      <h1 style={headerStyle}>🚛 Waste Collection Dashboard</h1>

      <div style={cardContainer}>
        <Link to="/book" style={{ textDecoration: "none", color: "white" }}>
          <div style={cardStyle}>
            <FaCalendarCheck style={iconStyle} />
            <h3>Schedule Pickup</h3>
            <p>Book a new waste collection</p>
          </div>
        </Link>

        <Link to="/jobs" style={{ textDecoration: "none", color: "white" }}>
          <div style={cardStyle}>
            <FaTruck style={iconStyle} />
            <h3>View Jobs</h3>
            <p>Check available pickup jobs</p>
          </div>
        </Link>

        <Link to="/track" style={{ textDecoration: "none", color: "white" }}>
          <div style={cardStyle}>
            <FaMapMarkedAlt style={iconStyle} />
            <h3>Live Tracking</h3>
            <p>Monitor your driver in real time</p>
          </div>
        </Link>
      </div>

      <h2 style={{ marginTop: "40px", fontSize: "22px" }}>📋 Current Jobs</h2>
      <div style={{ width: "80%", textAlign: "center", marginTop: "10px" }}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} style={{ ...cardStyle, marginBottom: "10px", textAlign: "left", padding: "15px" }}>
              <p><strong>📍 Location:</strong> {job.location}</p>
              <p><strong>⚖ Weight:</strong> {job.weight}</p>
              <p><strong>✅ Status:</strong> {job.status}</p>
            </div>
          ))
        ) : (
          <p>No active jobs available.</p>
        )}
      </div>

      <div style={logoutStyle}>
        <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
      </div>
    </div>
  );
};

export default Dashboard;

