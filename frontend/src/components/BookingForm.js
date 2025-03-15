import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaWeight, FaClock, FaMapMarkerAlt } from "react-icons/fa";

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
  background: "rgba(255, 255, 255, 0.15)",
  borderRadius: "15px",
  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(10px)",
  textAlign: "center",
  color: "white",
};

const inputGroup = {
  display: "flex",
  alignItems: "center",
  background: "rgba(255, 255, 255, 0.2)",
  padding: "10px",
  borderRadius: "8px",
  marginBottom: "12px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  border: "none",
  outline: "none",
  background: "transparent",
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
  background: "#fdbb2d",
  color: "black",
};

const BookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    waste_type: "plastic",
    weight: "",
    pickup_time: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    bookings.push(formData);
    localStorage.setItem("bookings", JSON.stringify(bookings));
    alert("Pickup scheduled successfully!");
    navigate("/dashboard");
  };

  return (
    <div style={containerStyle}>
      <div style={glassBox}>
        <h2>♻️ Schedule a Pickup</h2>
        <form onSubmit={handleSubmit}>
          {/* Waste Type Dropdown */}
          <div style={inputGroup}>
            <FaTrash style={{ marginRight: "10px" }} />
            <select name="wasteType" style={{ ...inputStyle, background: "white", color: "black" }}>
                <option value="plastic">Plastic</option>
                <option value="organic">Organic</option>
                <option value="glass">Glass</option>
                <option value="metal">Metal</option>
           </select>
          </div>

          {/* Weight Input */}
          <div style={inputGroup}>
            <FaWeight style={{ marginRight: "10px" }} />
            <input type="number" name="weight" placeholder="Weight (kg)" onChange={handleChange} required style={inputStyle} />
          </div>

          {/* Pickup Time Input */}
          <div style={inputGroup}>
            <FaClock style={{ marginRight: "10px" }} />
            <input type="datetime-local" name="pickup_time" onChange={handleChange} required style={inputStyle} />
          </div>

          {/* Address Input */}
          <div style={inputGroup}>
            <FaMapMarkerAlt style={{ marginRight: "10px" }} />
            <input type="text" name="address" placeholder="Pickup Address" onChange={handleChange} required style={inputStyle} />
          </div>

          <button type="submit" style={buttonStyle}>🚀 Book Pickup</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;

