import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "55vh",
  height: "55vh",
  borderRadius: "20px",
  boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
};

const containerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "url('https://www.transparenttextures.com/patterns/asfalt-light.png'), linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d)",
  color: "white",
  gap: "20px",
  position: "relative",
  padding: "20px",
};

const sidebarStyle = {
  width: "280px",
  height: "55vh",
  background: "rgba(255, 255, 255, 0.15)",
  padding: "15px",
  borderRadius: "10px",
  backdropFilter: "blur(15px)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
};

const jobPanelStyle = {
  width: "280px",
  height: "auto",
  padding: "15px",
  background: "rgba(255, 255, 255, 0.15)",
  borderRadius: "10px",
  backdropFilter: "blur(15px)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
};

const jobHeaderStyle = {
  fontSize: "18px",
  fontWeight: "bold",
  background: "#fdbb2d",
  color: "black",
  padding: "8px",
  borderRadius: "5px",
  animation: "blink 1s infinite alternate",
};

const statsPanelStyle = {
  position: "absolute",
  top: "15px",
  right: "20px",
  background: "rgba(0, 0, 0, 0.7)",
  color: "white",
  padding: "10px 15px",
  borderRadius: "8px",
  fontSize: "14px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
};

const buttonContainerStyle = {
  position: "absolute",
  bottom: "20px",
  right: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const buttonStyle = {
  background: "#fdbb2d",
  color: "black",
  padding: "8px 12px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.3s",
};

const pickupRequests = [
  { id: 1, lat: 9.935, lng: 76.270, address: "MG Road, Kochi", waste: "Plastic - 2kg", type: "♻️" },
  { id: 2, lat: 9.928, lng: 76.265, address: "Vytilla, Kochi", waste: "Organic - 5kg", type: "🌿" },
  { id: 3, lat: 9.922, lng: 76.280, address: "Fort Kochi", waste: "Metal - 1kg", type: "🔩" },
];

const LiveTracking = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAByIFgG6imPgl3j4ZjT8jTM6n5-21esMY", // Replace with a valid key
  });

  const [location, setLocation] = useState({ lat: 9.9312, lng: 76.2673 });
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [acceptedJob, setAcceptedJob] = useState(null);
  const [zoom, setZoom] = useState(13);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLocation((prev) => {
        const newLat = prev.lat + (Math.random() - 0.5) * 0.001;
        const newLng = prev.lng + (Math.random() - 0.5) * 0.001;
        setDistance((prevDist) => prevDist + 0.1);
        return { lat: newLat, lng: newLng };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div style={containerStyle}>
      {/* Sidebar - Pickup Requests */}
      <div style={sidebarStyle}>
        <h3 style={{ fontSize: "20px", textAlign: "center", marginBottom: "10px" }}>📌 Nearby Pickups</h3>
        {pickupRequests.map((pickup) => (
          <div
            key={pickup.id}
            style={{ padding: "10px", borderBottom: "1px solid rgba(255, 255, 255, 0.2)", cursor: "pointer" }}
            onClick={() => setAcceptedJob(pickup)}
          >
            <strong>{pickup.type} {pickup.address}</strong> <br />
            Waste: {pickup.waste}
          </div>
        ))}
      </div>

      {/* Google Map */}
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={location}>
        {/* Moving Driver */}
        <Marker position={location} label="🚛" />

        {/* Pickup Locations */}
        {pickupRequests.map((pickup) => (
          <Marker
            key={pickup.id}
            position={{ lat: pickup.lat, lng: pickup.lng }}
            onClick={() => setAcceptedJob(pickup)}
            label="📍"
          />
        ))}

        {/* Info Window for Selected Pickup */}
        {selectedPickup && (
          <InfoWindow position={{ lat: selectedPickup.lat, lng: selectedPickup.lng }} onCloseClick={() => setSelectedPickup(null)}>
            <div>
              <strong>{selectedPickup.address}</strong> <br />
              Waste: {selectedPickup.waste}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Accepted Job Panel */}
      {acceptedJob && (
        <div style={jobPanelStyle}>
          <div style={jobHeaderStyle}>✅ Job Accepted</div>
          <h3>{acceptedJob.address}</h3>
          <p><strong>Waste Type:</strong> {acceptedJob.waste}</p>
          <p><strong>Pickup ID:</strong> {acceptedJob.id}</p>
        </div>
      )}

      {/* Floating Stats Panel */}
      <div style={statsPanelStyle}>
        <strong>Driver Stats</strong> <br />
        🏁 Distance Covered: {distance.toFixed(1)} km <br />
        🚛 Speed: ~30 km/h
      </div>

      {/* Floating Buttons */}
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => setZoom((z) => z + 1)}>🔍 Zoom In</button>
        <button style={buttonStyle} onClick={() => setZoom((z) => z - 1)}>🔎 Zoom Out</button>
      </div>
    </div>
  );
};

export default LiveTracking;
