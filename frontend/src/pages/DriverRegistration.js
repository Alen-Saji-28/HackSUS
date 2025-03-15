import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #1e3c72, #2a5298)",
};

const glassBox = {
  width: "400px",
  padding: "30px",
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: "15px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(10px)",
  textAlign: "center",
  color: "white",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  margin: "10px 0",
  fontSize: "16px",
  borderRadius: "8px",
  border: "none",
  outline: "none",
  background: "rgba(255, 255, 255, 0.3)",
  color: "white",
  transition: "0.3s",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "18px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "0.3s",
  background: "#fdbb2d",
  color: "black",
  marginTop: "10px",
};

const DriverRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    vehicleType: "",
    licenseNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🚚 Driver Registered Successfully!");
    navigate("/driver-dashboard");
  };

  return (
    <div style={containerStyle}>
      <div style={glassBox}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>🚛 Driver Registration</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input type="text" name="name" placeholder="👤 Full Name" onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="📧 Email" onChange={handleChange} required style={inputStyle} />
          <input type="password" name="password" placeholder="🔒 Password" onChange={handleChange} required style={inputStyle} />
          <input type="text" name="vehicleType" placeholder="🚗 Vehicle Type" onChange={handleChange} required style={inputStyle} />
          <input type="text" name="licenseNumber" placeholder="📄 License Number" onChange={handleChange} required style={inputStyle} />
          <button type="submit" style={buttonStyle}>🚀 Register as Driver</button>
        </form>
      </div>
    </div>
  );
};

export default DriverRegistration;
