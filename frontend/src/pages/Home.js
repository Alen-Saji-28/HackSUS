import React from "react";
import { Link } from "react-router-dom";

const homeContainer = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "white",
  background: "linear-gradient(135deg, rgba(26, 42, 108, 0.8), rgba(178, 31, 31, 0.8)), url('https://source.unsplash.com/1600x900/?recycle,city')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
};

const overlayStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backdropFilter: "blur(5px)",
};

const glassBox = {
  width: "50%",
  padding: "30px",
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "15px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(10px)",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "42px",
  fontWeight: "bold",
  letterSpacing: "2px",
  textTransform: "uppercase",
  marginBottom: "10px",
};

const subtitleStyle = {
  fontSize: "20px",
  fontWeight: "lighter",
  opacity: 0.9,
  marginBottom: "20px",
};

const buttonContainer = {
  display: "flex",
  gap: "15px",
  justifyContent: "center",
  marginTop: "20px",
  flexWrap: "wrap",
};

const buttonStyle = {
  padding: "12px 20px",
  fontSize: "18px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s",
  textDecoration: "none",
  display: "inline-block",
  textAlign: "center",
};

const registerButton = {
  ...buttonStyle,
  background: "#fdbb2d",
  color: "black",
};

const loginButton = {
  ...buttonStyle,
  background: "#1a2a6c",
  color: "white",
};

const driverButton = {
  ...buttonStyle,
  background: "#27ae60",
  color: "white",
};

const driverRegisterButton = {
  ...buttonStyle,
  background: "#e74c3c",
  color: "white",
};

const Home = () => {
  return (
    <div style={homeContainer}>
      <div style={overlayStyle}></div>
      <div style={glassBox}>
        <h1 style={titleStyle}>♻️ Smart Waste Collection</h1>
        <p style={subtitleStyle}>Efficient. Sustainable. Eco-Friendly.</p>
        <div style={buttonContainer}>
          <Link to="/register" style={registerButton}>🚀 Get Started</Link>
          <Link to="/login" style={loginButton}>🔑 User Login</Link>
          <Link to="/driver-login" style={driverButton}>🚚 Driver Login</Link>
          <Link to="/driver-register" style={driverRegisterButton}>📝 Driver Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
