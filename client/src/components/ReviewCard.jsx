import React from 'react';

const styles = {
  card: {
    borderLeftWidth: "4px",
    borderLeftStyle: "solid",
    padding: "24px",
    marginBottom: "20px",
    background: "#ffffff",
    borderRadius: "16px",
    fontSize: "16px",
    lineHeight: "1.7",
    color: "#334155",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  },
  cardHover: {
    transform: "translateX(6px)",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.08)",
  },
  icon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    marginRight: "14px",
    flexShrink: 0,
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "14px",
  },
  badge: {
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  text: {
    margin: 0,
    color: "#475569",
    lineHeight: "1.8",
    fontSize: "15px",
  },
  glow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    opacity: 0.6,
  },
  fileInfo: {
    fontSize: "13px",
    color: "#94a3b8",
    marginBottom: "8px",
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
  },
  lineNumber: {
    display: "inline-block",
    background: "#f1f5f9",
    padding: "2px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    color: "#64748b",
    marginRight: "8px",
  },
};

const typeConfig = {
  bug: {
    color: "#ef4444",
    bgColor: "#fef2f2",
    badgeBg: "#fee2e2",
    badgeColor: "#dc2626",
    icon: "🐛",
    label: "Bug",
  },
  security: {
    color: "#f97316",
    bgColor: "#fff7ed",
    badgeBg: "#ffedd5",
    badgeColor: "#ea580c",
    icon: "🔒",
    label: "Security",
  },
  suggestion: {
    color: "#22c55e",
    bgColor: "#f0fdf4",
    badgeBg: "#dcfce7",
    badgeColor: "#16a34a",
    icon: "💡",
    label: "Suggestion",
  },
};

function ReviewCard({ type, item }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const config = typeConfig[type] || typeConfig.suggestion;

  // Handle both string and object items
  const isObject = typeof item === 'object' && item !== null;
  const text = isObject ? (item.recommendation || item.text || JSON.stringify(item)) : item;
  const file = isObject ? item.file : null;
  const lineNumber = isObject ? item.lineNumber : null;

  const cardStyle = {
    ...styles.card,
    borderLeftColor: config.color,
    background: config.bgColor,
    ...(isHovered ? styles.cardHover : {}),
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ ...styles.glow, background: config.color }} />

      <div style={styles.header}>
        <div style={{ ...styles.icon, background: config.badgeBg }}>
          {config.icon}
        </div>
        <span
          style={{
            ...styles.badge,
            background: config.badgeBg,
            color: config.badgeColor,
          }}
        >
          {config.label}
        </span>
      </div>

      {file && (
        <div style={styles.fileInfo}>
          {lineNumber && <span style={styles.lineNumber}>Line {lineNumber}</span>}
          <span>{file}</span>
        </div>
      )}

      <p style={styles.text}>{text}</p>
    </div>
  );
}

export default ReviewCard;