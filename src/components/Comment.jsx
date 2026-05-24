import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../firebaseConfig";
import { Link } from "react-router-dom";

export default function Comment({ id }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentlyLoggedinUser] = useAuthState(auth);
  const commentRef = doc(db, "Articles", id);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setComments(snapshot.data().comments || []);
      }
    });
    return () => unsubscribe();
  }, [id]);

  const handlePostComment = () => {
    if (!comment.trim()) return;

    updateDoc(commentRef, {
      comments: arrayUnion({
        user: currentlyLoggedinUser.uid,
        userName: currentlyLoggedinUser.displayName || currentlyLoggedinUser.email.split("@")[0],
        comment: comment.trim(),
        createdAt: new Date(),
        commentId: uuidv4(),
      }),
    }).then(() => {
      setComment("");
    });
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handlePostComment();
    }
  };

  const handleDeleteComment = (commentObj) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      updateDoc(commentRef, {
        comments: arrayRemove(commentObj),
      })
        .then(() => {
          console.log("comment deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // Helper for initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  // Helper for dynamic colors
  const avatarColors = ["#0073b1", "#057642", "#c37d16", "#d11a2a", "#6b33cc", "#1e293b"];
  const getAvatarBg = (name) => {
    if (!name) return avatarColors[0];
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
  };

  return (
    <div>
      {/* Comments List */}
      <div className="d-flex flex-column gap-3 mb-4">
        {comments.length === 0 ? (
          <div className="text-center py-4 bg-light bg-gradient border rounded text-muted">
            <i className="fa fa-comments mb-2" style={{ fontSize: "24px" }}></i>
            <p className="small mb-0 fw-semibold">No comments yet. Start the conversation!</p>
          </div>
        ) : (
          comments.map((commentObj) => {
            const { commentId, user, comment: text, userName } = commentObj;
            const isCurrentUser = currentlyLoggedinUser && user === currentlyLoggedinUser.uid;

            return (
              <div key={commentId} className="d-flex gap-2 align-items-start">
                {/* Comment Avatar */}
                <div
                  className="comment-avatar flex-shrink-0"
                  style={{ backgroundColor: getAvatarBg(userName) }}
                >
                  {getInitials(userName)}
                </div>

                {/* Comment Bubble Wrapper */}
                <div className="flex-grow-1 min-w-0 position-relative">
                  <div className="comment-bubble">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="d-flex align-items-center gap-2">
                        <strong className="text-dark" style={{ fontSize: "13px" }}>
                          {userName}
                        </strong>
                        {isCurrentUser && (
                          <span
                            className="badge bg-success"
                            style={{ fontSize: "8px", padding: "2px 5px", borderRadius: "10px" }}
                          >
                            You
                          </span>
                        )}
                      </div>

                      {/* Delete action if creator */}
                      {isCurrentUser && (
                        <i
                          className="fa fa-times text-muted hover-text-danger position-absolute"
                          style={{
                            cursor: "pointer",
                            fontSize: "11px",
                            top: "10px",
                            right: "12px",
                            padding: "4px",
                          }}
                          onClick={() => handleDeleteComment(commentObj)}
                          title="Delete comment"
                        ></i>
                      )}
                    </div>
                    <div
                      style={{
                        wordBreak: "break-word",
                        fontSize: "13px",
                        lineHeight: "1.4",
                        color: "#333333",
                        paddingRight: isCurrentUser ? "14px" : "0",
                      }}
                    >
                      {text}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Write Comment Box */}
      {currentlyLoggedinUser ? (
        <div className="d-flex gap-2 align-items-start border-top pt-3">
          <div
            className="comment-avatar flex-shrink-0"
            style={{
              backgroundColor: getAvatarBg(
                currentlyLoggedinUser.displayName || currentlyLoggedinUser.email
              ),
              width: "32px",
              height: "32px",
              fontSize: "12px",
            }}
          >
            {currentlyLoggedinUser.photoURL ? (
              <img
                src={currentlyLoggedinUser.photoURL}
                alt="me"
                className="rounded-circle w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            ) : (
              getInitials(currentlyLoggedinUser.displayName || currentlyLoggedinUser.email)
            )}
          </div>
          <div className="flex-grow-1 position-relative">
            <input
              type="text"
              className="form-control-premium w-100 py-2 pe-5"
              style={{ borderRadius: "var(--radius-full)", fontSize: "13px" }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment... (Press Enter to publish)"
              onKeyUp={handleKeyUp}
            />
            <button
              onClick={handlePostComment}
              className="btn btn-sm text-primary position-absolute d-flex align-items-center justify-content-center"
              style={{
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
              }}
              disabled={!comment.trim()}
            >
              <i className="fa fa-paper-plane" style={{ fontSize: "14px" }}></i>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-2 border-top">
          <span className="small text-muted">
            You must <Link to="/signin" className="fw-semibold">Sign In</Link> to post comments.
          </span>
        </div>
      )}
    </div>
  );
}
