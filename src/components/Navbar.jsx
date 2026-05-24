import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import ImageLoader from "./ImageLoader";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const [showDropdown, setShowDropdown] = useState(false);
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
        <div
          className="d-flex align-items-center gap-3 flex-grow-1 flex-md-grow-0"
          style={{ maxWidth: "450px" }}
        >
          {/* Custom Brand Logo - React Icon */}
          <Link
            to="/"
            className="text-decoration-none d-flex align-items-center gap-2"
            style={{ whiteSpace: "nowrap" }}
          >
            <span
              className="d-flex align-items-center justify-content-center fw-bold text-white rounded"
              style={{
                width: "40px",
                height: "40px",
                fontSize: "24px",
                background: "linear-gradient(135deg, #61dafb 0%, #0ea5e9 100%)",
              }}
            >
              <i className="fa fa-react"></i>
            </span>
            <span
              className="fw-bold text-primary d-none d-sm-inline"
              style={{ fontSize: "18px", letterSpacing: "-0.5px" }}
            >
              Reactblog
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

          {/* Dropdown Menu or Sign In */}
          {user ? (
            <div
              className="dropdown ms-2 ms-md-3"
              style={{ position: "relative" }}
            >
              <div
                className="d-flex flex-column align-items-center nav-link-custom p-0"
                style={{ cursor: "pointer" }}
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {user.photoURL ? (
                  <ImageLoader
                    src={user.photoURL}
                    alt="Me"
                    className="rounded-circle border"
                    style={{
                      width: "24px",
                      height: "24px",
                      objectFit: "cover",
                    }}
                    containerStyle={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                    }}
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

              {showDropdown && (
                <ul
                  className="dropdown-menu dropdown-menu-end shadow border mt-2 show"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    zIndex: 1000,
                    borderRadius: "var(--radius-md)",
                    minWidth: "200px",
                  }}
                >
                  <li className="px-3 py-2 border-bottom">
                    <div
                      className="fw-bold text-dark text-truncate"
                      style={{ maxWidth: "160px" }}
                    >
                      {user.displayName || user.email}
                    </div>
                    <div
                      className="text-muted small text-truncate"
                      style={{ maxWidth: "160px" }}
                    >
                      {user.email}
                    </div>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item py-2"
                      to="/"
                      onClick={() => setShowDropdown(false)}
                    >
                      <i className="fa fa-user me-2 text-secondary"></i> View
                      Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider my-1" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item py-2 text-danger fw-semibold"
                      onClick={() => {
                        setShowDropdown(false);
                        signOut(auth);
                      }}
                      style={{
                        border: "none",
                        background: "none",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      <i className="fa fa-sign-out me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              className="btn btn-premium btn-premium-primary ms-2"
              to="/signin"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
