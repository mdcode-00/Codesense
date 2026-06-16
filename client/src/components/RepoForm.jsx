import React, { useState } from "react";
import { getCodeReview } from '../services/api';

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  card: {
    background: "rgba(255, 255, 255, 0.97)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "48px 56px",
    width: "100%",
    maxWidth: "560px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  logo: {
    width: "72px",
    height: "72px",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
    fontSize: "32px",
    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 10px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#64748b",
    margin: 0,
    fontWeight: "500",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  inputGroup: {
    position: "relative",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#475569",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  input: {
    width: "100%",
    padding: "16px 18px",
    fontSize: "16px",
    borderRadius: "14px",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#e2e8f0",
    background: "#f8fafc",
    color: "#0f172a",
    outline: "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  inputFocus: {
    borderColor: "#3b82f6",
    background: "#ffffff",
    boxShadow: "0 0 0 4px rgba(59, 130, 246, 0.1)",
  },
  icon: {
    position: "absolute",
    right: "16px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#94a3b8",
    fontSize: "20px",
    pointerEvents: "none",
  },
  button: {
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "17px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
    marginTop: "8px",
    position: "relative",
    overflow: "hidden",
  },
  buttonHover: {
    transform: "translateY(-2px)",
    boxShadow: "0 20px 35px -10px rgba(59, 130, 246, 0.5)",
  },
  error: {
    background: "#fef2f2",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#fecaca",
    color: "#dc2626",
    padding: "14px 18px",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    animation: "shake 0.5s ease",
  },
  loading: {
    display: "inline-block",
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderRadius: "50%",
    borderTopColor: "#fff",
    animation: "spin 0.8s linear infinite",
    marginRight: "10px",
  },
};

function RepoForm({ onReviewDone, setLoading }) {
  const [repo, setRepo] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!repo.trim() || !prNumber.trim() || !token.trim()) {
      setError("All fields are required");
      return;
    }

    setError("");
    setIsSubmitting(true);
    setLoading(true);

    try {
      const review = await getCodeReview(repo, prNumber, token);
      onReviewDone(review);
    } catch (err) {
      setError("Failed to fetch review. Check your token and PR number.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const getInputStyle = (fieldName) => ({
    ...styles.input,
    ...(focusedField === fieldName ? styles.inputFocus : {}),
  });

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🔍</div>
          <h1 style={styles.title}>CodeSense</h1>
          <p style={styles.subtitle}>AI-Powered Code Review</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Pull Request Number</label>
            <input
              style={getInputStyle('pr')}
              placeholder="e.g. 42"
              value={prNumber}
              onChange={(e) => setPrNumber(e.target.value)}
              onFocus={() => setFocusedField('pr')}
              onBlur={() => setFocusedField(null)}
              type="number"
            />
            <span style={styles.icon}>#</span>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Repository</label>
            <input
              style={getInputStyle('repo')}
              placeholder="owner/repo-name"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              onFocus={() => setFocusedField('repo')}
              onBlur={() => setFocusedField(null)}
            />
            <span style={{...styles.icon, fontSize: '16px'}}>📁</span>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>GitHub Token</label>
            <input
              style={getInputStyle('token')}
              placeholder="ghp_xxxxxxxxxxxx"
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              onFocus={() => setFocusedField('token')}
              onBlur={() => setFocusedField(null)}
              autoComplete="current-password"
            />
            <span style={styles.icon}>🔐</span>
          </div>

          {error && (
            <div style={styles.error}>
              <span>⚠️</span>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(isHovered ? styles.buttonHover : {}),
              ...(isSubmitting ? { opacity: 0.8, cursor: 'not-allowed' } : {}),
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span style={styles.loading}></span>
                Analyzing...
              </>
            ) : (
              "Review PR →"
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}

export default RepoForm;