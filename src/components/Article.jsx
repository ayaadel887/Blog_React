import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams, Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import LikeArticle from "./LikeArticle";
import Comment from "./Comment";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setArticle({ ...snapshot.data(), id: snapshot.id });
      }
    });
    return () => unsubscribe();
  }, [id]);

  // Extract initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Avatar backgrounds helper
  const avatarColors = [
    "#0073b1",
    "#057642",
    "#c37d16",
    "#d11a2a",
    "#6b33cc",
    "#1e293b",
  ];
  const getAvatarBg = (name) => {
    if (!name) return avatarColors[0];
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  return (
    <div className="container" style={{ marginTop: "90px", marginBottom: "60px", maxWidth: "800px" }}>
      {/* Back Button */}
      <Link to="/" className="text-decoration-none d-inline-flex align-items-center gap-2 mb-4 fw-semibold text-secondary hover-text-dark">
        <i className="fa fa-arrow-left"></i> Back to Feed
      </Link>

      {article ? (
        <div className="d-flex flex-column gap-3">
          {/* Article Header Card */}
          <div className="premium-card p-4 bg-white mb-0">
            {/* Category / Badge */}
            <span className="badge bg-primary mb-3" style={{ fontSize: "11px", fontWeight: "600" }}>
              Technical Article
            </span>

            {/* Title */}
            <h1 className="fw-bold mb-3" style={{ fontSize: "32px", lineHeight: "1.2" }}>
              {article.title}
            </h1>

            {/* Author Profile Panel */}
            <div className="d-flex align-items-center gap-3 pt-2 border-top">
              <div
                className="post-avatar"
                style={{
                  backgroundColor: getAvatarBg(article.createdBy),
                  width: "52px",
                  height: "52px",
                  fontSize: "18px",
                }}
              >
                {getInitials(article.createdBy)}
              </div>
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2">
                  <h6 className="m-0 fw-bold" style={{ fontSize: "15px" }}>
                    {article.createdBy || "Professional Author"}
                  </h6>
                  <span className="badge bg-secondary rounded-pill" style={{ fontSize: "9px" }}>2nd</span>
                </div>
                <p className="m-0 text-secondary" style={{ fontSize: "12px" }}>
                  Software Specialist • Published writer
                </p>
                <p className="m-0 text-muted" style={{ fontSize: "11px" }}>
                  {article.createdAt
                    ? article.createdAt.toDate().toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Recent"}
                </p>
              </div>
            </div>
          </div>

          {/* Cover Image Banner */}
          {article.imageUrl && (
            <div
              className="w-100 overflow-hidden shadow-sm"
              style={{ borderRadius: "var(--radius-md)", maxHeight: "400px" }}
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="img-fluid w-100 h-100"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
          )}

          {/* Article Main Text Content */}
          <div className="premium-card p-4 bg-white mb-3 mt-1">
            <div
              style={{
                fontSize: "16px",
                lineHeight: "1.8",
                color: "#292929",
                letterSpacing: "-0.003em",
                fontFamily: "var(--font-body)",
                whiteSpace: "pre-wrap",
              }}
            >
              {article.description}
            </div>

            {/* Social Interactions Stats row */}
            <div className="d-flex align-items-center justify-content-between mt-4 pt-3 border-top">
              <div className="d-flex align-items-center gap-2">
                <span className="badge rounded-circle bg-primary p-1" style={{ fontSize: "8px" }}>
                  <i className="fa fa-thumbs-up text-white"></i>
                </span>
                <span className="badge rounded-circle bg-danger p-1 ms-n1" style={{ fontSize: "8px" }}>
                  <i className="fa fa-heart text-white"></i>
                </span>
                <span className="small text-muted fw-semibold">
                  {article.likes?.length || 0} professionals liked this
                </span>
              </div>

              {user && (
                <div className="d-flex align-items-center gap-2">
                  <span className="small text-muted me-1">Express support:</span>
                  <LikeArticle id={id} likes={article.likes} />
                </div>
              )}
            </div>
          </div>

          {/* Comment Thread Card */}
          <div className="premium-card p-4 bg-white shadow-sm">
            <h5 className="fw-bold mb-3 border-bottom pb-2">
              <i className="fa fa-comments-o me-2 text-primary"></i> Discussion ({article.comments?.length || 0})
            </h5>
            <Comment id={article.id} />
          </div>
        </div>
      ) : (
        <div className="premium-card text-center py-5 bg-white">
          <i className="fa fa-spinner fa-spin text-primary mb-3" style={{ fontSize: "40px" }}></i>
          <h5 className="fw-semibold text-secondary">Loading article details...</h5>
        </div>
      )}
    </div>
  );
}
