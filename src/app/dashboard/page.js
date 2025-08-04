"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [cases, setCases] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/cases")
      .then((res) => res.json())
      .then((data) => setCases(data))
      .catch((err) => console.error("Error fetching cases:", err));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await fetch(`http://localhost:5000/api/update_case/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setCases((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredCases = cases.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>📋 Case Dashboard</h1>

      {/* 🔍 Search & Filter */}
      <div style={filterBar}>
        <input
          type="text"
          placeholder="Search cases..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={dropdown}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>

      {/* 🧾 Case List */}
      {filteredCases.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px" }}>No cases found.</p>
      ) : (
        <div style={grid}>
          {filteredCases.map((c) => (
            <div key={c._id} style={card}>
              <h2 style={cardTitle}>{c.title}</h2>
              <p style={cardText}><strong>Location:</strong> {c.location}</p>
              <p style={cardText}><strong>Status:</strong> <span style={badge(c.status)}>{c.status}</span></p>
              {c.image && (
                <img
                  src={`http://localhost:5000/uploads/${c.image}`}
                  alt="Case"
                  style={imageStyle}
                />
              )}
              <div style={{ marginTop: "10px" }}>
                <label style={cardText}>Update Status:</label>
                <select
                  value={c.status}
                  onChange={(e) => handleStatusChange(c._id, e.target.value)}
                  style={dropdown}
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 🎨 Styles
const pageStyle = {
  padding: "40px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f9f9f9",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "2.5rem",
  marginBottom: "30px",
  color: "#0070f3",
};

const filterBar = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "30px",
  flexWrap: "wrap",
};

const searchInput = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  width: "250px",
};

const dropdown = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const card = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const cardTitle = {
  fontSize: "1.5rem",
  marginBottom: "10px",
  color: "#333",
};

const cardText = {
  fontSize: "1rem",
  marginBottom: "8px",
};

const imageStyle = {
  width: "100%",
  borderRadius: "8px",
  marginTop: "10px",
};

const badge = (status) => ({
  padding: "4px 10px",
  borderRadius: "6px",
  backgroundColor:
    status === "Resolved"
      ? "#28a745"
      : status === "In Progress"
      ? "#ffc107"
      : "#dc3545",
  color: "#fff",
  fontWeight: "bold",
});
