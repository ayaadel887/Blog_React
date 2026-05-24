import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const location = useLocation();

  // Extract initials if user displayName is not set
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const currentPath = location.pathname;

  if (currentPath === "/signin" || currentPath === "/register") {
    return null;
  }

  return (
    <div className="navbar-custom fixed-top">
      <div className="navbar-container">
        {/* Left section: Logo & Search */}
        <div className="d-flex align-items-center gap-2 flex-grow-1 flex-md-grow-0" style={{ maxWidth: "450px" }}>
          {/* Custom Brand Logo */}
          <Link to="/" className="text-decoration-none d-flex align-items-center">
            <span
              className="d-flex align-items-center justify-content-center fw-bold text-white rounded bg-primary"
              style={{
                width: "34px",
                height: "34px",
                fontSize: "20px",
                fontFamily: "var(--font-heading)",
                letterSpacing: "-1px",
              }}
            >
              in
            </span>
          </Link>

          {/* Search Bar */}
          <div className="nav-search-container d-none d-sm-block">
            <i className="fa fa-search nav-search-icon"></i>
            <input
              type="text"
              placeholder="Search"
              className="nav-search-input"
            />
          </div>
        </div>

        {/* Right section: Navigation Links */}
        <div className="d-flex align-items-center gap-1 gap-md-2">
          <Link
            className={`nav-link-custom ${currentPath === "/" ? "active" : ""}`}
            to="/"
          >
            <i className="fa fa-home"></i>
            <span className="d-none d-md-inline">Home</span>
          </Link>

          <a className="nav-link-custom" href="#network">
            <i className="fa fa-users"></i>
            <span className="d-none d-md-inline">My Network</span>
          </a>

          <a className="nav-link-custom" href="#jobs">
            <i className="fa fa-briefcase"></i>
            <span className="d-none d-md-inline">Jobs</span>
          </a>

          <a className="nav-link-custom" href="#messaging">
            <i className="fa fa-comments"></i>
            <span className="d-none d-md-inline">Messaging</span>
          </a>

          <a className="nav-link-custom position-relative" href="#notifications">
            <i className="fa fa-bell"></i>
            <span className="d-none d-md-inline">Notifications</span>
            <span
              className="position-absolute top-1 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "8px", left: "60%" }}
            >
              1
            </span>
          </a>

          {/* Dropdown Menu or Sign In */}
          {user ? (
            <div className="dropdown ms-2 ms-md-3">
              <div
                className="d-flex flex-column align-items-center nav-link-custom p-0"
                id="profileDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ cursor: "pointer" }}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Me"
                    className="rounded-circle border"
                    style={{ width: "24px", height: "24px", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center border fw-bold"
                    style={{ width: "24px", height: "24px", fontSize: "10px" }}
                  >
                    {getInitials(user.displayName || user.email)}
                  </div>
                )}
                <span className="d-none d-md-inline mt-1">
                  Me <i className="fa fa-caret-down ms-1"></i>
                </span>
              </div>

              <ul
                className="dropdown-menu dropdown-menu-end shadow border mt-2"
                aria-labelledby="profileDropdown"
                style={{ borderRadius: "var(--radius-md)" }}
              >
                <li className="px-3 py-2 border-bottom">
                  <div className="fw-bold text-dark text-truncate" style={{ maxWidth: "160px" }}>
                    {user.displayName || user.email}
                  </div>
                  <div className="text-muted small text-truncate" style={{ maxWidth: "160px" }}>
                    {user.email}
                  </div>
                </li>
                <li>
                  <Link className="dropdown-item py-2" to="/">
                    <i className="fa fa-user me-2 text-secondary"></i> View Profile
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider my-1" />
                </li>
                <li>
                  <button
                    className="dropdown-item py-2 text-danger fw-semibold"
                    onClick={() => signOut(auth)}
                  >
                    <i className="fa fa-sign-out me-2"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-premium btn-premium-primary ms-2" to="/signin">
              Sign In
            </Link>
          )}

          {/* Business Link (Matches Screenshot) */}
          <div className="d-none d-lg-flex align-items-center border-start ps-3 ms-2 gap-2">
            <a href="#business" className="nav-link-custom">
              <i className="fa fa-th"></i>
              <span>For Business <i className="fa fa-caret-down"></i></span>
            </a>
            <a href="#premium" className="text-decoration-none fw-bold" style={{ fontSize: "12px", color: "#b89535" }}>
              Try Premium for £0
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
