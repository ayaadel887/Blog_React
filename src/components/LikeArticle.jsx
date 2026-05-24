import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";

export default function LikeArticle({ id, likes, showText = false }) {
  const [user] = useAuthState(auth);
  const [isPopping, setIsPopping] = useState(false);

  const likesRef = doc(db, "Articles", id);
  const hasLiked = likes?.includes(user?.uid);

  const handleLike = () => {
    if (!user) return;
    
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 300);

    if (hasLiked) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const getStyle = () => {
    return {
      cursor: "pointer",
      color: hasLiked ? "var(--danger-color)" : "inherit",
      transform: isPopping ? "scale(1.3)" : "scale(1)",
      transition: "all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      display: "inline-block"
    };
  };

  if (showText) {
    return (
      <button
        onClick={handleLike}
        className={`w-100 h-100 border-0 bg-transparent d-flex align-items-center justify-content-center gap-2 ${hasLiked ? "text-danger fw-bold" : "text-secondary"}`}
        style={{ cursor: "pointer", transition: "color var(--transition-fast)" }}
      >
        <i
          className={`fa fa-heart${!hasLiked ? "-o" : ""}`}
          style={getStyle()}
        />
        <span>{hasLiked ? "Liked" : "Like"}</span>
      </button>
    );
  }

  return (
    <div style={{ display: "inline-block" }}>
      <i
        className={`fa fa-heart${!hasLiked ? "-o" : ""} fa-lg`}
        style={getStyle()}
        onClick={handleLike}
      />
    </div>
  );
}
