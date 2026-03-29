import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const PARTICLE_COUNT = 30;

// Generated once at module load — not during render
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  left:     `${Math.random() * 100}%`,
  delay:    `${Math.random() * 20}s`,
  duration: `${10 + Math.random() * 15}s`,
  size:     `${1.5 + Math.random() * 2}px`,
  opacity:  0.3 + Math.random() * 0.4,
}));

function Background() {

  return (
    <>
      {/* Orbs */}
      <div className="bg-orb-1" />
      <div className="bg-orb-2" />
      <div className="bg-orb-3" />

      {/* Pulsing rings */}
      <div className="bg-ring-1" />
      <div className="bg-ring-2" />

      {/* Shooting stars */}
      <div className="bg-star-1" />
      <div className="bg-star-2" />
      <div className="bg-star-3" />

      {/* Floating particles */}
      <div className="bg-particles">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="bg-particle"
            style={{
              left:              p.left,
              bottom:            "-4px",
              width:             p.size,
              height:            p.size,
              opacity:           p.opacity,
              animationDelay:    p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    </>
  );
}

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-bg min-h-screen">
      <Background />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="lg:ml-64 flex flex-col min-h-screen relative" style={{ zIndex: 1 }}>
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "8px",
          background: "rgba(8,12,24,0.6)",
          backdropFilter: "blur(12px)",
        }}>
          <p style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.4)", margin: 0 }}>
            © {new Date().getFullYear()} <span style={{ color: "rgba(165,180,252,0.7)", fontWeight: 600 }}>CGU College ERP</span> — All rights reserved.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.3)" }}>v1.0.0</span>
            <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.3)" }}>Built with React + Spring Boot</span>
            <span style={{ width: "1px", height: "12px", background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: "0.75rem", color: "rgba(148,163,184,0.3)" }}>🔒 Secure Portal</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Layout;
