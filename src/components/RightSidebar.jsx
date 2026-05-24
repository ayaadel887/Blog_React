import React from "react";

export default function RightSidebar() {
  return (
    <div className="d-flex flex-column gap-3">
      {/* Promoted Ad - Banque Misr (matches the user's screenshot exactly!) */}
      <div className="premium-card hover-lift p-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span style={{ fontSize: "11px", fontWeight: "600", color: "var(--text-secondary)" }}>Promoted</span>
          <i className="fa fa-ellipsis-h text-muted" style={{ cursor: "pointer" }}></i>
        </div>

        <div className="d-flex gap-2 align-items-start mb-2">
          {/* Mock Banque Misr Logo */}
          <div
            className="d-flex align-items-center justify-content-center rounded"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#b89535",
              color: "white",
              fontWeight: "bold",
              fontSize: "12px",
              border: "1px solid #d4af37",
              textAlign: "center",
              lineHeight: "1.2",
              padding: "4px"
            }}
          >
            بنك مصر
          </div>
          <div>
            <h6 className="m-0" style={{ fontSize: "14px", fontWeight: "700" }}>Banque Misr</h6>
            <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>Financial Services</span>
          </div>
        </div>

        {/* Arabic ad content from screenshot */}
        <p
          className="text-end mb-3"
          style={{
            fontSize: "13px",
            lineHeight: "1.5",
            color: "var(--text-primary)",
            fontWeight: "500",
            direction: "rtl"
          }}
        >
          تابعنا وقدم على التدريب الصيفي من بنك مصر وابدأ خطوتك الآن
        </p>

        {/* Connection followers */}
        <div className="d-flex align-items-center gap-2 mb-3" style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
          <div className="d-flex">
            <span className="badge rounded-circle bg-secondary d-flex align-items-center justify-content-center" style={{ width: "16px", height: "16px", fontSize: "8px" }}>A</span>
            <span className="badge rounded-circle bg-primary d-flex align-items-center justify-content-center ms-n1" style={{ width: "16px", height: "16px", fontSize: "8px" }}>K</span>
          </div>
          <span>Amr & 153 other connections follow</span>
        </div>

        {/* Follow Button */}
        <button
          className="btn btn-premium btn-premium-secondary w-100"
          style={{ padding: "6px 12px", fontSize: "13px" }}
        >
          Follow
        </button>
      </div>

      {/* Trending Tech News */}
      <div className="premium-card hover-lift p-3">
        <h6 className="mb-3" style={{ fontSize: "14px", fontWeight: "700" }}>Trending Articles</h6>
        <div className="d-flex flex-column gap-3">
          <div>
            <a href="#react19" className="text-decoration-none text-dark fw-bold hover-underline d-block" style={{ fontSize: "13px" }}>
              React 19 Release Candidates
            </a>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>1d ago • 1,240 readers</span>
          </div>
          <div>
            <a href="#exsys" className="text-decoration-none text-dark fw-bold hover-underline d-block" style={{ fontSize: "13px" }}>
              Exsys Solutions Expands Team
            </a>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>2d ago • 850 readers</span>
          </div>
          <div>
            <a href="#typescript" className="text-decoration-none text-dark fw-bold hover-underline d-block" style={{ fontSize: "13px" }}>
              Is TypeScript standardizing?
            </a>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>3d ago • 2,410 readers</span>
          </div>
          <div>
            <a href="#testing" className="text-decoration-none text-dark fw-bold hover-underline d-block" style={{ fontSize: "13px" }}>
              ISTQB certification growth in Egypt
            </a>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>5d ago • 620 readers</span>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-2" style={{ fontSize: "11px", color: "var(--text-muted)", lineHeight: "1.6" }}>
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-2">
          <a href="#about" className="text-decoration-none text-muted hover-underline">About</a>
          <a href="#accessibility" className="text-decoration-none text-muted hover-underline">Accessibility</a>
          <a href="#help" className="text-decoration-none text-muted hover-underline">Help Center</a>
          <a href="#privacy" className="text-decoration-none text-muted hover-underline">Privacy & Terms</a>
          <a href="#choices" className="text-decoration-none text-muted hover-underline">Ad Choices</a>
          <a href="#advertising" className="text-decoration-none text-muted hover-underline">Advertising</a>
          <a href="#business" className="text-decoration-none text-muted hover-underline">Business Services</a>
        </div>
        <div className="d-flex align-items-center justify-content-center gap-1">
          <strong style={{ color: "var(--primary-color)" }}>LinkDev</strong>
          <span>LinkDev Corporation © 2026</span>
        </div>
      </div>
    </div>
  );
}
