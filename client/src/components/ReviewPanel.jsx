import React, { useState } from "react";
import ReviewCard from "./ReviewCard";

const styles = {
  container: {
    marginTop: "40px",
    width: "100%",
    maxWidth: "800px",
    animation: "fadeInUp 0.5s ease",
  },
  header: {
    marginBottom: "32px",
  },
  title: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "0 0 10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#64748b",
    margin: 0,
  },
  tabsContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "28px",
    background: "#f1f5f9",
    padding: "8px",
    borderRadius: "16px",
    width: "fit-content",
  },
  tab: {
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    background: "transparent",
    color: "#64748b",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  tabActive: {
    background: "#ffffff",
    color: "#0f172a",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  tabBadge: {
    padding: "3px 10px",
    borderRadius: "12px",
    fontSize: "13px",
    fontWeight: "700",
    minWidth: "24px",
    textAlign: "center",
  },
  content: {
    animation: "fadeIn 0.3s ease",
  },
  empty: {
    textAlign: "center",
    padding: "60px 40px",
    color: "#94a3b8",
    background: "#f8fafc",
    borderRadius: "20px",
    borderWidth: "2px",
    borderStyle: "dashed",
    borderColor: "#e2e8f0",
  },
  emptyIcon: {
    fontSize: "56px",
    marginBottom: "20px",
    opacity: 0.5,
  },
  emptyText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#64748b",
    margin: "0 0 6px",
  },
  emptySubtext: {
    fontSize: "15px",
    color: "#94a3b8",
    margin: 0,
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "32px",
  },
  statCard: {
    background: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#f1f5f9",
    transition: "all 0.3s ease",
  },
  statCardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 10px 20px -5px rgba(0,0,0,0.08)",
  },
  statValue: {
    fontSize: "32px",
    fontWeight: "800",
    margin: "0 0 6px",
  },
  statLabel: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#64748b",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
};

function ReviewPanel({ review }) {
  const [activeTab, setActiveTab] = useState("bugs");
  const [hoveredTab, setHoveredTab] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  if (!review) return null;

  const tabs = [
    {
      key: "bugs",
      label: "Bugs",
      icon: "🐛",
      type: "bug",
      color: "#ef4444",
      bgColor: "#fef2f2",
    },
    {
      key: "security",
      label: "Security",
      icon: "🔒",
      type: "security",
      color: "#f97316",
      bgColor: "#fff7ed",
    },
    {
      key: "suggestions",
      label: "Suggestions",
      icon: "💡",
      type: "suggestion",
      color: "#22c55e",
      bgColor: "#f0fdf4",
    },
  ];

  const activeTabData = tabs.find((tab) => tab.key === activeTab);
  const items = review[activeTab] || [];

  const totalIssues = (review.bugs?.length || 0) + 
                      (review.security?.length || 0) + 
                      (review.suggestions?.length || 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Review Results</h2>
        <p style={styles.subtitle}>
          {totalIssues} issues found across {tabs.length} categories
        </p>
      </div>

      {/* Stats Overview */}
      <div style={styles.stats}>
        {tabs.map((tab) => (
          <div 
            key={tab.key} 
            style={{
              ...styles.statCard,
              ...(hoveredStat === tab.key ? styles.statCardHover : {}),
            }}
            onMouseEnter={() => setHoveredStat(tab.key)}
            onMouseLeave={() => setHoveredStat(null)}
          >
            <div style={{ ...styles.statValue, color: tab.color }}>
              {review[tab.key]?.length || 0}
            </div>
            <div style={styles.statLabel}>{tab.label}</div>
          </div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div style={styles.tabsContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const isHovered = hoveredTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              onMouseEnter={() => setHoveredTab(tab.key)}
              onMouseLeave={() => setHoveredTab(null)}
              style={{
                ...styles.tab,
                ...(isActive ? styles.tabActive : {}),
                ...(isHovered && !isActive ? { color: tab.color, background: tab.bgColor } : {}),
              }}
            >
              <span style={{ fontSize: "18px" }}>{tab.icon}</span>
              <span>{tab.label}</span>
              <span
                style={{
                  ...styles.tabBadge,
                  background: isActive ? tab.color : "#e2e8f0",
                  color: isActive ? "#fff" : "#64748b",
                }}
              >
                {review[tab.key]?.length || 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div style={styles.content} key={activeTab}>
        {items.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>{activeTabData?.icon}</div>
            <p style={styles.emptyText}>No {activeTabData?.label} Found</p>
            <p style={styles.emptySubtext}>
              Great job! No issues detected in this category.
            </p>
          </div>
        ) : (
          items.map((item, index) => (
            <ReviewCard
              key={index}
              item={item}
              type={activeTabData?.type}
            />
          ))
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default ReviewPanel;