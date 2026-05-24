import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db, storage } from "../firebaseConfig";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";

export default function DeleteArticle({ id, imageUrl }) {
  const handleDelete = async (e) => {
    e.stopPropagation(); // Avoid triggering any card clicks
    if (
      window.confirm(
        "Are you sure you want to delete this article? This action cannot be undone.",
      )
    ) {
      try {
        await deleteDoc(doc(db, "Articles", id));
        toast("Article deleted successfully", { type: "success" });
        if (imageUrl) {
          const storageRef = ref(storage, imageUrl);
          await deleteObject(storageRef);
        }
      } catch (error) {
        toast("Error deleting article", { type: "error" });
        console.log(error);
      }
    }
  };
  return (
    <button
      onClick={handleDelete}
      className="btn btn-sm d-flex align-items-center justify-content-center rounded-circle"
      style={{
        width: "32px",
        height: "32px",
        backgroundColor: "rgba(0,0,0,0.03)",
        border: "none",
        color: "var(--text-secondary)",
        transition: "all var(--transition-fast)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--danger-light)";
        e.currentTarget.style.color = "var(--danger-color)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.03)";
        e.currentTarget.style.color = "var(--text-secondary)";
      }}
      title="Delete post"
    >
      <i className="fa fa-trash-o" style={{ fontSize: "15px" }} />
    </button>
  );
}
