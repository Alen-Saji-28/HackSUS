import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const loginContainer = {
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, rgba(26, 42, 108, 0.8), rgba(178, 31, 31, 0.8)), url('https://source.unsplash.com/1600x900/?city,technology')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const glassBox = {
  width: "400px",
  padding: "40px",
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

const linkStyle = {
  display: "block",
  marginTop: "10px",
  color: "white",
  textDecoration: "none",
  opacity: 0.8,
  transition: "0.3s",
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Dummy user data (replace with API call later)
  const testUser = {
    email: "testuser@example.com",
    password: "password123",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate API request
    if (email === testUser.email && password === testUser.password) {
      localStorage.setItem("token", "fake-jwt-token"); // Simulate authentication
      localStorage.setItem("userEmail", email); // Store email (optional)
      navigate("/dashboard"); // ✅ Redirect to Dashboard
    } else {
      setError("Invalid email or password! Try: testuser@example.com / password123");
    }
  };

  return (
    <div style={loginContainer}>
      <div style={glassBox}>
        <h2>🔑 Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
        <Link to="/register" style={linkStyle}>Don't have an account? Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
