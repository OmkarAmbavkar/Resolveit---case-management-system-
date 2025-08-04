"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterCase() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
  });

  const [caseSubmitted, setCaseSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("location", formData.location);
    form.append("image", formData.image);

    try {
      const res = await fetch("http://localhost:5000/api/register_case", {
        method: "POST",
        body: form,
      });

      const result = await res.json();
      if (result.message) {
        alert("✅ Case registered successfully!");
        console.log("Image URL:", result.imageUrl);
        setCaseSubmitted(true);
      } else {
        alert("❌ Something went wrong.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to submit case.");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Register a Case 📝</h1>

      {!caseSubmitted ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={formStyle}>
          <label style={labelStyle}>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required style={inputStyle} />

          <label style={labelStyle}>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" style={textareaStyle} />

          <label style={labelStyle}>Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required style={inputStyle} />

          <label style={labelStyle}>Upload Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} style={inputStyle} />

          <button type="submit" style={submitButton}>Submit Case 🚀</button>
        </form>
      ) : (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <p style={{ fontSize: "1.2rem", color: "#28a745" }}>✅ Your case has been submitted successfully!</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
            <Link href="/"><button style={navButton}>🏠 Home</button></Link>
            <Link href="/dashboard"><button style={navButton}>📂 View Cases</button></Link>
          </div>
        </div>
      )}
    </div>
  );
}

// 🎨 Styles
const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "2rem",
  marginBottom: "20px",
  color: "#0070f3",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const labelStyle = {
  fontWeight: "bold",
  fontSize: "1rem",
};

const inputStyle = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const textareaStyle = {
  padding: "10px",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  resize: "vertical",
};

const submitButton = {
  padding: "12px",
  fontSize: "1rem",
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const navButton = {
  padding: "10px 20px",
  fontSize: "1rem",
  backgroundColor: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
