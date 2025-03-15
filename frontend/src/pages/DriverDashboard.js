import React, { useState } from "react";
import { FaSignOutAlt, FaTruckLoading } from "react-icons/fa";

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
  overflowY: "auto", 
};

const headerStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "20px",
};

const jobContainer = {
  width: "80%",
  textAlign: "center",
  marginTop: "20px",
  minHeight: "150px",
};

const jobCard = {
  background: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "left",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  marginBottom: "10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const buttonStyle = {
  padding: "8px 12px",
  fontSize: "16px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  transition: "0.3s",
  background: "#fdbb2d",
  color: "black",
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

// Updated with waste type
const initialJobs = [
  { id: 1, location: "Vytilla", weight: "12kg", wasteType: "Plastic", status: "Available" },
  { id: 2, location: "Aluva", weight: "8kg", wasteType: "Organic", status: "Available" },
  { id: 3, location: "Kochi", weight: "10kg", wasteType: "Glass", status: "Available" },
];

const DriverDashboard = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [currentJob, setCurrentJob] = useState(null);

  const acceptJob = (job) => {
    setCurrentJob(job);
    setJobs(jobs.filter((j) => j.id !== job.id)); // Remove job from available list
  };

  return (
    <div style={dashboardContainer}>
      <h1 style={headerStyle}>🚚 Driver Dashboard</h1>

      {/* Available Jobs */}
      <h2>📋 Available Jobs</h2>
      <div style={jobContainer}>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} style={jobCard}>
              <div>
                <p><strong>📍 Location:</strong> {job.location}</p>
                <p><strong>⚖ Weight:</strong> {job.weight}</p>
                <p><strong>♻ Waste Type:</strong> {job.wasteType}</p>
              </div>
              <button style={buttonStyle} onClick={() => acceptJob(job)}>✅ Accept</button>
            </div>
          ))
        ) : (
          <p>No available jobs.</p>
        )}
      </div>

      {/* Current Job */}
      {currentJob && (
        <div style={{ ...jobContainer, marginTop: "40px" }}>
          <h2>🚛 Current Job</h2>
          <div style={{ ...jobCard, background: "rgba(255, 255, 255, 0.3)" }}>
            <div>
              <p><strong>📍 Location:</strong> {currentJob.location}</p>
              <p><strong>⚖ Weight:</strong> {currentJob.weight}</p>
              <p><strong>♻ Waste Type:</strong> {currentJob.wasteType}</p>
              <p><strong>🔄 Status:</strong> Ongoing</p>
            </div>
            <FaTruckLoading size={32} />
          </div>
        </div>
      )}

      {/* Logout Button */}
      <div style={logoutStyle}>
        <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
      </div>
    </div>
  );
};

export default DriverDashboard;
