import React, { useState } from "react";
import RepoForm from "../components/RepoForm";
import ReviewPanel from "../components/ReviewPanel";

const styles = {
  app: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px 40px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  loadingOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(15, 23, 42, 0.85)",
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease",
  },
  spinner: {
    width: "64px",
    height: "64px",
    borderWidth: "4px",
    borderStyle: "solid",
    borderColor: "rgba(59, 130, 246, 0.2)",
    borderTopColor: "#3b82f6",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    marginBottom: "24px",
  },
  loadingText: {
    color: "#e2e8f0",
    fontSize: "20px",
    fontWeight: "600",
    animation: "pulse 1.5s ease infinite",
  },
  loadingSubtext: {
    color: "#94a3b8",
    fontSize: "16px",
    marginTop: "10px",
  },
  content: {
    width: "100%",
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  footer: {
    marginTop: "60px",
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
  },
  footerLink: {
    color: "#3b82f6",
    textDecoration: "none",
    fontWeight: "600",
  },
};

function Home() {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReviewDone = (reviewData) => {
    setReview(reviewData);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div style={styles.app}>
      {/* Loading Overlay */}
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.spinner}></div>
          <div style={styles.loadingText}>Analyzing your code...</div>
          <div style={styles.loadingSubtext}>This may take a few moments</div>
        </div>
      )}

      <div style={styles.content}>
        <RepoForm onReviewDone={handleReviewDone} setLoading={setLoading} />
        <ReviewPanel review={review} />
      </div>

      <div style={styles.footer}>
        <p>
          Powered by AI · Built with ❤️ ·{" "}
          <a href="#" style={styles.footerLink}>
            CodeSense
          </a>
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          background: #0f172a;
        }
      `}</style>
    </div>
  );
}

export default Home;