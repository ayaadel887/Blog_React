import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
import LikeArticle from "./LikeArticle";
import { Link, useNavigate } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const articlesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articlesData);
      console.log(articlesData);
    });
    return () => unsubscribe();
  }, []);

  // Generate initials for avatar representation
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Dynamic background colors for author avatars
  const avatarColors = [
    "#0073b1",
    "#057642",
    "#c37d16",
    "#d11a2a",
    "#6b33cc",
    "#1e293b",
    "#0f766e",
  ];
  const getAvatarBg = (name) => {
    if (!name) return avatarColors[0];
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  return (
    <div className="d-flex flex-column">
      {articles.length === 0 ? (
        <div className="premium-card text-center py-5 bg-white">
          <i className="fa fa-newspaper-o text-muted mb-3" style={{ fontSize: "40px" }}></i>
          <h5 className="fw-semibold text-secondary">No posts found</h5>
          <p className="small text-muted mb-0">Be the first to share an article with the community!</p>
        </div>
      ) : (
        articles.map(
          ({
            id,
            title,
            description,
            imageUrl,
            createdAt,
            createdBy,
            userId,
            likes,
            comments,
          }) => {
            const authorName = createdBy || "Professional User";
            const dateFormatted = createdAt
              ? createdAt.toDate().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "Recent";

            return (
              <div className="premium-card hover-lift p-3 bg-white" key={id}>
                {/* Header: Author + Options */}
                <div className="post-header">
                  <div className="post-author-info">
                    {/* Avatar Badge */}
                    <div
                      className="post-avatar"
                      style={{ backgroundColor: getAvatarBg(authorName) }}
                    >
                      {getInitials(authorName)}
                    </div>
                    <div>
                      <div className="d-flex align-items-center gap-1">
                        <h6 className="post-author-name">{authorName}</h6>
                        <span className="badge bg-secondary rounded-pill" style={{ fontSize: "9px", padding: "2px 6px" }}>1st</span>
                      </div>
                      <p className="post-author-headline">
                        Professional Developer • Connection
                      </p>
                      <p className="post-timestamp">
                        {dateFormatted} • <i className="fa fa-globe"></i>
                      </p>
                    </div>
                  </div>

                  {/* Delete Button (if Owner) */}
                  {user && user.uid === userId && (
                    <div className="text-end">
                      <DeleteArticle id={id} imageUrl={imageUrl} />
                    </div>
                  )}
                </div>

                {/* Post Title */}
                <Link to={`/article/${id}`} className="post-title-link">
                  {title}
                </Link>

                {/* Post Description */}
                <p className="post-description">{description}</p>

                {/* Post Image Banner */}
                {imageUrl && (
                  <div className="post-image-container">
                    <Link to={`/article/${id}`} style={{ width: "100%" }}>
                      <img
                        src={imageUrl}
                        alt={title}
                        className="post-image img-fluid"
                      />
                    </Link>
                  </div>
                )}

                {/* Post Stats Row */}
                <div className="post-stats-row">
                  <div className="d-flex align-items-center gap-1">
                    <span className="d-flex align-items-center">
                      <span className="badge rounded-circle bg-primary p-1" style={{ fontSize: "8px" }}>
                        <i className="fa fa-thumbs-up text-white"></i>
                      </span>
                      <span className="badge rounded-circle bg-danger p-1 ms-n1" style={{ fontSize: "8px" }}>
                        <i className="fa fa-heart text-white"></i>
                      </span>
                    </span>
                    <span className="small text-muted">{likes?.length || 0} likes</span>
                  </div>
                  <div className="d-flex gap-2">
                    <span className="small text-muted" style={{ cursor: "pointer" }} onClick={() => navigate(`/article/${id}`)}>
                      {comments?.length || 0} comments
                    </span>
                  </div>
                </div>

                {/* Post Actions Row */}
                <div className="post-actions-row">
                  {/* Like Button */}
                  <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    {user ? (
                      <div className="post-action-btn w-100 py-2">
                        <LikeArticle id={id} likes={likes} showText={true} />
                      </div>
                    ) : (
                      <button
                        className="post-action-btn w-100 py-2"
                        onClick={() => navigate("/signin")}
                      >
                        <i className="fa fa-heart-o"></i> <span>Like</span>
                      </button>
                    )}
                  </div>

                  {/* Comment Button */}
                  <button
                    className="post-action-btn flex-grow-1 py-2"
                    onClick={() => navigate(`/article/${id}`)}
                  >
                    <i className="fa fa-comment-o"></i> <span>Comment</span>
                  </button>

                  {/* Repost Button (Mock) */}
                  <button className="post-action-btn flex-grow-1 py-2 d-none d-sm-flex">
                    <i className="fa fa-retweet"></i> <span>Repost</span>
                  </button>

                  {/* Send Button (Mock) */}
                  <button className="post-action-btn flex-grow-1 py-2 d-none d-sm-flex">
                    <i className="fa fa-paper-plane-o"></i> <span>Send</span>
                  </button>
                </div>
              </div>
            );
          }
        )
      )}
    </div>
  );
}
