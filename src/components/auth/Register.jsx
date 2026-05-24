import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast("Please fill in all the required fields.", { type: "warning" });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      toast("Account registered successfully! Welcome to LinkDev.", { type: "success" });
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

        <h3 className="fw-bold text-dark mb-1">Join LinkDev</h3>
        <p className="text-secondary small mb-4">Make the most of your professional life</p>

        <form onSubmit={handleSignup}>
          {/* Full Name input */}
          <div className="form-group mb-3 text-start">
            <label className="fw-semibold small mb-1 text-secondary">Full name</label>
            <input
              type="text"
              className="form-control-premium w-100"
              placeholder="e.g. Aya Adel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Email input */}
          <div className="form-group mb-3 text-start">
            <label className="fw-semibold small mb-1 text-secondary">Email address</label>
            <input
              type="email"
              className="form-control-premium w-100"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Password input */}
          <div className="form-group mb-4 text-start">
            <label className="fw-semibold small mb-1 text-secondary">Password (6+ characters)</label>
            <input
              type="password"
              className="form-control-premium w-100"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-premium btn-premium-primary w-100 py-2.5 mb-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fa fa-spinner fa-spin me-2"></i> Registering...
              </>
            ) : (
              "Agree & Join"
            )}
          </button>
        </form>

        {/* Login Prompt */}
        <p className="small text-muted mt-3 mb-0">
          Already on LinkDev?{" "}
          <Link to="/signin" className="fw-bold text-decoration-none text-primary hover-underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
