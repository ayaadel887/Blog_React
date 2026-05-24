import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast("Please enter your email and password.", { type: "warning" });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast("Welcome back!", { type: "success" });
      navigate("/");
    } catch (error) {
      toast(error.code.replace("auth/", "").replaceAll("-", " "), { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-container">
        {/* Brand visual identity */}
        <div className="d-flex align-items-center justify-content-center gap-2 mb-3">
          <span
            className="d-flex align-items-center justify-content-center fw-bold text-white rounded bg-primary"
            style={{
              width: "40px",
              height: "40px",
              fontSize: "24px",
              fontFamily: "var(--font-heading)",
              letterSpacing: "-1px",
            }}
          >
            in
          </span>
          <span className="fw-bold fs-4" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.5px" }}>
            LinkDev
          </span>
        </div>

        <h3 className="fw-bold text-dark mb-1">Sign in</h3>
        <p className="text-secondary small mb-4">Stay updated on your professional world</p>

        <form onSubmit={handleLogin}>
          {/* Email input */}
          <div className="form-group mb-3 text-start">
            <label className="fw-semibold small mb-1 text-secondary">Email address</label>
            <div className="position-relative">
              <input
                type="email"
                className="form-control-premium w-100"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Password input */}
          <div className="form-group mb-4 text-start">
            <label className="fw-semibold small mb-1 text-secondary">Password</label>
            <div className="position-relative">
              <input
                type="password"
                className="form-control-premium w-100"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-premium btn-premium-primary w-100 py-2.5 mb-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fa fa-spinner fa-spin me-2"></i> Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Join Prompt */}
        <p className="small text-muted mt-3 mb-0">
          New to LinkDev?{" "}
          <Link to="/register" className="fw-bold text-decoration-none text-primary hover-underline">
            Join now
          </Link>
        </p>
      </div>
    </div>
  );
}
