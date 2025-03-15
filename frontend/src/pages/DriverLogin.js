import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const loginContainer = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #27ae60, #2ecc71)",
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
};

const DriverLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Dummy driver credentials
  const testDriver = {
    email: "driver@example.com",
    password: "driverpass",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === testDriver.email && password === testDriver.password) {
      localStorage.setItem("driver_token", "fake-driver-token"); // Simulate authentication
      navigate("/driver-dashboard"); // ✅ Redirect to Driver Dashboard
    } else {
      setError("Invalid driver credentials! Try:\n Email: driver@example.com \n Password: driverpass");
    }
  };

  return (
    <div style={loginContainer}>
      <div style={glassBox}>
        <h2>🚚 Driver Login</h2>
        {error && <p style={{ color: "red", whiteSpace: "pre-line" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>🚀 Login</button>
        </form>
      </div>
    </div>
  );
};

export default DriverLogin;
