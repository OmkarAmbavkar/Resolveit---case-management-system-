"use client";

import { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out!");
  };

  return loading ? (
    <Loader />
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={pageStyle}
    >
      <ToastContainer position="top-right" autoClose={3000} />

      {/* 🔝 Navigation */}
      <nav style={navStyle}>
        <div style={navTitle}>ResolveIt</div>
        <div style={navButtons}>
          {user ? (
            <>
              <span style={userInfo}>Logged in as <strong>{user.name}</strong> ({user.role})</span>
              <button style={navButton} onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login"><button style={navButton}>Login</button></Link>
              <Link href="/signup"><button style={navButtonAlt}>Signup</button></Link>
            </>
          )}
        </div>
      </nav>

      {/* 🌟 Hero Section */}
      <section style={heroStyle}>
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={heroTitle}
        >
          Welcome to ResolveIt
        </motion.h1>

        <p style={heroSubtitle}>
          Empowering communities to report issues, find solutions, and make a difference.
        </p>

        {user && (
          <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>
            Welcome back, <strong>{user.name}</strong>!
          </p>
        )}

        <div style={buttonGroup}>
          <button
            style={buttonStyle}
            onClick={() => {
              if (user) {
                window.location.href = "/register_case";
              } else {
                toast.warn("Please login or signup to register a case.");
                window.location.href = "/login";
              }
            }}
          >
            Register a Case
          </button>
          <Link href="/dashboard"><button style={buttonStyle}>View Cases</button></Link>
          <Link href="/about"><button style={buttonStyle}>About Us</button></Link>
        </div>
      </section>

      {/* 🚀 Features Section */}
      <section style={featuresSection}>
        <h2 style={sectionTitle}>Why Use ResolveIt?</h2>
        <div style={featuresGrid}>
          <motion.div whileHover={{ scale: 1.05 }} style={featureCard}>
            💬 <strong>Virtual Mediation:</strong> Live discussions with professional mediators.
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} style={featureCard}>
            📊 <strong>Dispute Tracking:</strong> Monitor the progress of resolution.
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} style={featureCard}>
            📚 <strong>Educational Resources:</strong> Learn conflict resolution techniques.
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} style={featureCard}>
            📝 <strong>Agreement Generation:</strong> Create formal agreements post-mediation.
          </motion.div>
        </div>
      </section>

      {/* 🖼️ Banner Image */}
      <section style={imageSection}>
        <motion.img
          src="/download (3).png"
          alt="ResolveIt banner"
          style={imageStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </section>

      {/* 🧾 Footer */}
      <footer style={footerStyle}>
        <p>© 2025 ResolveIt. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}

// 🎨 Updated Styles
const pageStyle = {
  fontFamily: "'Poppins', sans-serif",
  background: "linear-gradient(to bottom, #e0f7fa, #ffffff)",
  color: "#333",
  margin: "0",
  padding: "0"
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  position: "sticky",
  top: 0,
  zIndex: 1000
};

const navTitle = {
  fontSize: "1.8rem",
  fontWeight: "700",
  color: "#0070f3"
};

const navButtons = {
  display: "flex",
  gap: "10px",
  alignItems: "center"
};

const navButton = {
  padding: "10px 18px",
  fontSize: "14px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#0070f3",
  color: "#fff",
  cursor: "pointer",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease",
};

const navButtonAlt = {
  ...navButton,
  backgroundColor: "#ffdd00",
  color: "#333"
};

const userInfo = {
  fontSize: "0.9rem",
  marginRight: "10px"
};

const heroStyle = {
  textAlign: "center",
  padding: "80px 20px",
  background: "linear-gradient(to right, #0070f3, #00c6ff)",
  color: "#fff",
  borderBottomLeftRadius: "40px",
  borderBottomRightRadius: "40px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
};

const heroTitle = {
  fontSize: "3.5rem",
  marginBottom: "20px",
  fontWeight: "700"
};

const heroSubtitle = {
  fontSize: "1.3rem",
  marginBottom: "30px",
  fontWeight: "400"
};

const buttonGroup = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  flexWrap: "wrap",
  marginBottom: "20px"
};

const buttonStyle = {
  padding: "14px 28px",
  fontSize: "16px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#fff",
  color: "#0070f3",
  cursor: "pointer",
  fontWeight: "600",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease",
};

const buttonStyleAlt = {
  ...buttonStyle,
  backgroundColor: "#ffdd00",
  color: "#333"
};

const featuresSection = {
  padding: "60px 20px",
  backgroundColor: "#fefefe",
  textAlign: "center"
};

const sectionTitle = {
  fontSize: "2.5rem",
  marginBottom: "40px",
  fontWeight: "600",
  color: "#0070f3"
};

const featuresGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px",
  padding: "0 20px"
};

const featureCard = {
  background: "rgba(255, 255, 255, 0.8)",
  padding: "25px",
  borderRadius: "16px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
  fontSize: "1rem",
  lineHeight: "1.6",
  backdropFilter: "blur(6px)",
  border: "1px solid #e0e0e0",
  transition: "transform 0.3s ease",
};

const imageSection = {
  textAlign: "center",
  padding: "40px 20px",
  backgroundColor: "#e3f2fd"
};

const imageStyle = {
  width: "100%",
  maxWidth: "900px",
  borderRadius: "20px",
  boxShadow: "0 6px 20px rgba(0,0,0,0.15)"
};

const footerStyle = {
  textAlign: "center",
  padding: "30px",
  background: "linear-gradient(to right, #0070f3, #00c6ff)",
  color: "#fff",
  fontSize: "0.95rem",
  borderTopLeftRadius: "40px",
  borderTopRightRadius: "40px",
  marginTop: "40px"
};
