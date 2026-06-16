import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getHistory } from '../services/api'
import ReviewPanel from './ReviewPanel'


const styles = {
  container: {
    padding: "40px 48px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    maxWidth: "1500px",
    margin: "0 0 auto 0",
  },
  header: {
    marginBottom: "40px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#f1f5f9",
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#94a3b8",
    margin: 0,
  },
  loading: {
    padding: "80px 40px",
    textAlign: "center",
    color: "#94a3b8",
  },
  spinner: {
    width: "48px",
    height: "48px",
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "rgba(59, 130, 246, 0.2)",
    borderTopColor: "#3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    margin: "0 auto 20px",
  },
  loadingText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#e2e8f0",
  },
  empty: {
    textAlign: "center",
    padding: "80px 40px",
    background: "rgba(30, 41, 59, 0.6)",
    borderRadius: "20px",
    borderWidth: "2px",
    borderStyle: "dashed",
    borderColor: "rgba(148, 163, 184, 0.2)",
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "20px",
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#e2e8f0",
    margin: "0 0 8px",
  },
  emptyText: {
    fontSize: "15px",
    color: "#94a3b8",
    margin: 0,
  },
  list: {
    display: "grid",
    gridTemplateColumns: "380px 1fr",
    gap: "32px",
    alignItems: "start",
  },
  listColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  listHeader: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "8px",
    paddingLeft: "8px",
  },
  card: {
    padding: "20px 24px",
    background: "rgba(30, 41, 59, 0.8)",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "transparent",
    position: "relative",
    overflow: "hidden",
  },
  cardHover: {
    background: "rgba(30, 41, 59, 0.95)",
    borderColor: "rgba(59, 130, 246, 0.3)",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
  },
  cardSelected: {
    background: "rgba(59, 130, 246, 0.1)",
    borderColor: "rgba(59, 130, 246, 0.5)",
    boxShadow: "0 0 0 1px rgba(59, 130, 246, 0.2), 0 10px 25px -5px rgba(59, 130, 246, 0.15)",
  },
  cardGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
    background: "linear-gradient(180deg, #3b82f6, #8b5cf6)",
    opacity: 0,
    transition: "opacity 0.3s ease",
  },
  cardGlowVisible: {
    opacity: 1,
  },
  repoName: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#f1f5f9",
    margin: "0 0 6px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  prNumber: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#60a5fa",
    background: "rgba(59, 130, 246, 0.15)",
    padding: "2px 10px",
    borderRadius: "6px",
  },
  date: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "500",
  },
  statsRow: {
    display: "flex",
    gap: "16px",
    marginTop: "14px",
    paddingTop: "14px",
    borderTopWidth: "1px",
    borderTopStyle: "solid",
    borderTopColor: "rgba(255,255,255,0.06)",
  },
  stat: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    fontWeight: "600",
  },
  statIcon: {
    fontSize: "14px",
  },
  statValue: {
    fontWeight: "700",
  },
  statBug: { color: "#ef4444" },
  statSecurity: { color: "#f97316" },
  statSuggestion: { color: "#22c55e" },
  detailColumn: {
    background: "rgba(30, 41, 59, 0.6)",
    borderRadius: "20px",
    padding: "32px",
    minHeight: "400px",
  },
  detailEmpty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    color: "#64748b",
    textAlign: "center",
  },
  detailEmptyIcon: {
    fontSize: "56px",
    marginBottom: "16px",
    opacity: 0.4,
  },
  detailEmptyText: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#94a3b8",
    margin: "0 0 4px",
  },
  detailEmptySub: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
  },
};

function History() {
  const [history, setHistory] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .finally(() => setLoading(false))
  }, []);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <div style={styles.loadingText}>Loading your review history...</div>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📜 Review History</h1>
        <p style={styles.subtitle}>Browse and revisit your past code reviews</p>
      </div>

      {history.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>📭</div>
          <h3 style={styles.emptyTitle}>No Reviews Yet</h3>
          <p style={styles.emptyText}>Start by reviewing your first pull request!</p>
        </div>
      ) : (
        <div style={styles.list}>
          <div>
            <div style={styles.listHeader}>
              {history.length} Review{history.length !== 1 ? 's' : ''}
            </div>
            <div style={styles.listColumn}>
              {history.map((item) => {
                const isSelected = selected?._id === item._id;
                const isHovered = hoveredCard === item._id;

                return (
                  <div
                    key={item._id}
                    onClick={() => setSelected(item)}
                    onMouseEnter={() => setHoveredCard(item._id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      ...styles.card,
                      ...(isHovered ? styles.cardHover : {}),
                      ...(isSelected ? styles.cardSelected : {}),
                    }}
                  >
                    <div style={{
                      ...styles.cardGlow,
                      ...(isSelected ? styles.cardGlowVisible : {}),
                    }} />

                    <div style={styles.repoName}>
                      <span>📁</span>
                      {item.repo}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={styles.prNumber}>PR #{item.prNumber}</span>
                      <span style={styles.date}>
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <div style={styles.statsRow}>
                      <div style={styles.stat}>
                        <span style={styles.statIcon}>🐛</span>
                        <span style={{...styles.statValue, ...styles.statBug}}>
                          {item.bugs?.length || 0}
                        </span>
                        <span style={{color: "#64748b"}}>bugs</span>
                      </div>
                      <div style={styles.stat}>
                        <span style={styles.statIcon}>🔒</span>
                        <span style={{...styles.statValue, ...styles.statSecurity}}>
                          {item.security?.length || 0}
                        </span>
                        <span style={{color: "#64748b"}}>security</span>
                      </div>
                      <div style={styles.stat}>
                        <span style={styles.statIcon}>💡</span>
                        <span style={{...styles.statValue, ...styles.statSuggestion}}>
                          {item.suggestions?.length || 0}
                        </span>
                        <span style={{color: "#64748b"}}>suggestions</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={styles.detailColumn}>
            {selected ? (
              <ReviewPanel review={selected} />
            ) : (
              <div style={styles.detailEmpty}>
                <div style={styles.detailEmptyIcon}>👆</div>
                <p style={styles.detailEmptyText}>Select a review</p>
                <p style={styles.detailEmptySub}>Click on any review from the list to view details</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default History