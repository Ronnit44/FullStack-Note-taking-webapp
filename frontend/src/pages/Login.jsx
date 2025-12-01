import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/form";
import "../styles/Auth.css";

function Login() {
  return (
    <div className="auth-page">
      {/* Left Side - Branding */}
      <div className="auth-branding">
        <div className="branding-content">
          <div className="brand-header">
            <img src="/scribe-logo.png" alt="Scribe" className="brand-logo" />
            <h1 className="brand-name">Scribe</h1>
          </div>

          <p className="brand-tagline">
            Your thoughts, beautifully organized.
          </p>

          <div className="brand-features">
            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                </svg>
              </div>
              <div className="feature-text">
                <h3>Rich Text Editing</h3>
                <p>Format your notes with bold, italic, lists, and more</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <div className="feature-text">
                <h3>Organize with Colors</h3>
                <p>Tag your notes with colors to stay organized</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="feature-text">
                <h3>Secure & Private</h3>
                <p>Your notes are protected and only visible to you</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form-section">
        <div className="auth-form-wrapper">
          <Form route="/api/token/" method="login" />
          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
