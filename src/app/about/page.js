"use client";

import Link from "next/link";

export default function About() {
  return (
    <div style={pageStyle}>
      <nav style={navStyle}>
        <div style={navTitle}>ResolveIt</div>
        <Link href="/"><button style={navButton}>Home</button></Link>
      </nav>

      <section style={aboutSection}>
        <h1 style={aboutTitle}>About ResolveIt</h1>
        <p style={aboutText}>
          <strong>ResolveIt</strong> is an app designed to resolve disputes between parties, communities, or individuals through mediation. The system allows users to register disputes, share evidence, and create a mediation panel that includes legal and social experts. The platform follows a structured lifecycle to ensure fairness and transparency in resolving issues.
        </p>
        <p style={aboutText}>
          The app leverages a mediation process, supported by expert advice, to guide users through difficult situations such as disputes between spouses, business partners, families, or even communities.
        </p>

        <h2 style={featuresTitle}>Key Features</h2>
        <ul style={featuresList}>
          <li><strong>💬 Virtual Mediation:</strong> A platform for live discussions with professional mediators.</li>
          <li><strong>📊 Dispute Tracking:</strong> A system to log issues and monitor the progress of the resolution process.</li>
          <li><strong>📚 Educational Resources:</strong> Articles, videos, and workshops to help users understand conflict resolution techniques.</li>
          <li><strong>📝 Agreement Generation:</strong> A tool for creating formal agreements based on the outcomes of mediation.</li>
        </ul>
      </section>

      <footer style={footerStyle}>
        <p>© 2025 ResolveIt. All rights reserved.</p>
      </footer>
    </div>
  );
}

// 🎨 Styles
const pageStyle = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f4f4f4",
  color: "#333",
  padding: "0",
  margin: "0"
};

const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  backgroundColor: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
};

const navTitle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#0070f3"
};

const navButton = {
  padding: "8px 16px",
  fontSize: "14px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#0070f3",
  color: "#fff",
  cursor: "pointer"
};

const aboutSection = {
  padding: "60px 20px",
  maxWidth: "800px",
  margin: "0 auto",
  textAlign: "left"
};

const aboutTitle = {
  fontSize: "2.5rem",
  marginBottom: "20px",
  color: "#0070f3"
};

const aboutText = {
  fontSize: "1.1rem",
  lineHeight: "1.8",
  marginBottom: "20px"
};

const featuresTitle = {
  fontSize: "1.8rem",
  marginTop: "40px",
  marginBottom: "20px"
};

const featuresList = {
  listStyleType: "none",
  paddingLeft: "0",
  fontSize: "1.1rem",
  lineHeight: "1.8"
};

const footerStyle = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#eee",
  fontSize: "0.9rem"
};
