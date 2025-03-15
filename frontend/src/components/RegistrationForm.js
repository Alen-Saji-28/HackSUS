import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const formContainer = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)",
};

const glassBox = {
  width: "400px",
  padding: "30px",
  background: "rgba(255, 255, 255, 0.15)",
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
  background: "#28a745",
  color: "white",
  marginTop: "10px",
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    subscription_plan: "regular",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store user data in localStorage (simulating user registration)
    localStorage.setItem("user", JSON.stringify(formData));
    localStorage.setItem("token", "dummy-auth-token"); // Simulating authentication

    alert("Registration successful!");
    navigate("/newuserdashboard"); // Redirecting to New User Dashboard
  };

  return (
    <div style={formContainer}>
      <div style={glassBox}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Register</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required style={inputStyle} />
          <select name="subscription_plan" value={formData.subscription_plan} onChange={handleChange} style={inputStyle}>
            <option value="regular">Regular (2 pickups/week)</option>
            <option value="premium">Premium (4 pickups/week)</option>
          </select>
          <button type="submit" style={buttonStyle}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
