import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

export default function UserProfileCard() {
  const [user] = useAuthState(auth);

  // Default values to match the user's screenshot exactly
  const defaultProfile = {
    name: "Aya Adel",
    headline: "Front-End Developer @Exsys Solution | React | TypeScript Egypt",
    company: "Exsys solutions",
    viewersCount: 6,
    postImpressions: 142,
  };

  const name = user ? (user.displayName || user.email.split("@")[0]) : defaultProfile.name;
  const headline = user ? "Full Stack Engineer & React Enthusiast" : defaultProfile.headline;
  const company = user ? "Independent Creator" : defaultProfile.company;

  // Extract initials for the avatar if no photo is available
  const getInitials = (userName) => {
    return userName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="premium-card p-0 hover-lift">
      {/* Cover Gradient */}
      <div className="profile-card-cover"></div>

      {/* Avatar Container */}
      <div className="profile-card-avatar">
        {user && user.photoURL ? (
          <img
            src={user.photoURL}
            alt={name}
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }}
          />
        ) : (
          getInitials(name)
        )}
      </div>

      {/* Profile Info */}
      <div className="px-3">
        <h5 className="profile-card-name">{name}</h5>
        <p className="profile-card-headline">{headline}</p>
      </div>

      {/* Company Tag (matching screen) */}
      <div className="px-3 pb-3 border-bottom d-flex align-items-center gap-2" style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
        <i className="fa fa-briefcase text-muted"></i>
        <span>{company}</span>
      </div>

      {/* Quick Analytics Stats */}
      <div className="p-3 border-bottom">
        <div className="profile-card-stat">
          <span className="profile-card-stat-label">Profile viewers</span>
          <span className="profile-card-stat-val">{defaultProfile.viewersCount}</span>
        </div>
        <div className="profile-card-stat">
          <span className="profile-card-stat-label">Post impressions</span>
          <span className="profile-card-stat-val">{defaultProfile.postImpressions}</span>
        </div>
        <a href="#analytics" className="d-block mt-2 text-decoration-none" style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)" }}>
          View all analytics <i className="fa fa-arrow-right ms-1"></i>
        </a>
      </div>

      {/* Exclusive Tools Ad & Saved Items */}
      <div className="p-3 border-bottom bg-light bg-gradient" style={{ fontSize: "11px" }}>
        <div className="text-muted">Access exclusive tools & insights</div>
        <a href="#premium" className="text-decoration-none fw-bold d-block text-dark hover-underline">
          <i className="fa fa-square text-warning me-1"></i> Try Premium for £0
        </a>
      </div>

      {/* Saved, Groups, etc. */}
      <div className="p-2" style={{ fontSize: "12px" }}>
        <a href="#saved" className="d-flex align-items-center gap-2 p-2 text-decoration-none text-dark hover-bg rounded">
          <i className="fa fa-bookmark text-muted"></i>
          <span className="fw-semibold text-secondary">Saved items</span>
        </a>
        <a href="#groups" className="d-flex align-items-center gap-2 p-2 text-decoration-none text-dark hover-bg rounded">
          <i className="fa fa-users text-muted"></i>
          <span className="fw-semibold text-secondary">Groups</span>
        </a>
        <a href="#newsletters" className="d-flex align-items-center gap-2 p-2 text-decoration-none text-dark hover-bg rounded">
          <i className="fa fa-newspaper-o text-muted"></i>
          <span className="fw-semibold text-secondary">Newsletters</span>
        </a>
        <a href="#events" className="d-flex align-items-center gap-2 p-2 text-decoration-none text-dark hover-bg rounded">
          <i className="fa fa-calendar text-muted"></i>
          <span className="fw-semibold text-secondary">Events</span>
        </a>
      </div>
    </div>
  );
}
