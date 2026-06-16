import { useState } from 'react'
import Home from './pages/Home'
import History from './components/History'

const styles = {
app: {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
  backgroundColor: "#000000",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
},
  nav: {
    padding: "20px 48px",
    background: "rgba(30, 41, 59, 0.95)",
    backdropFilter: "blur(12px)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    borderBottomColor: "rgba(255,255,255,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#fff",
    marginRight: "40px",
    letterSpacing: "-0.5px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  navButton: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    position: "relative",
  },
  navButtonActive: {
    background: "rgba(59, 130, 246, 0.15)",
    color: "#60a5fa",
  },
  navButtonInactive: {
    color: "#94a3b8",
  },
  navButtonInactiveHover: {
    color: "#e2e8f0",
    background: "rgba(255,255,255,0.05)",
  },
  activeIndicator: {
    position: "absolute",
    bottom: "-20px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "24px",
    height: "3px",
    background: "#3b82f6",
    borderRadius: "2px",
  },
  content: {
    padding: "40px",
  },
};

function App() {
  const [page, setPage] = useState("home")
  const [hoveredBtn, setHoveredBtn] = useState(null)

  const getButtonStyle = (btnPage) => {
    const isActive = page === btnPage;
    const isHovered = hoveredBtn === btnPage;

    return {
      ...styles.navButton,
      ...(isActive ? styles.navButtonActive : {}),
      ...(!isActive ? styles.navButtonInactive : {}),
      ...(!isActive && isHovered ? styles.navButtonInactiveHover : {}),
    };
  };

  return ( 
    <div style={styles.app}>
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <span>🔍</span>
          CodeSense
        </div>

        <button
          onClick={() => setPage("home")}
          style={getButtonStyle("home")}
          onMouseEnter={() => setHoveredBtn("home")}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          <span>✨</span>
          Review
          {page === "home" && <div style={styles.activeIndicator} />}
        </button>

        <button
          onClick={() => setPage("history")}
          style={getButtonStyle("history")}
          onMouseEnter={() => setHoveredBtn("history")}
          onMouseLeave={() => setHoveredBtn(null)}
        >
          <span>📜</span>
          History
          {page === "history" && <div style={styles.activeIndicator} />}
        </button>
      </nav>

      <div style={styles.content}>
        {page === "home" ? <Home/> : <History/>}
      </div>
    </div>
  )
}

export default App