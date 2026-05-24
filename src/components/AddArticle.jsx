import React, { useState, useRef } from "react";
import { Timestamp, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { storage, db, auth } from "../firebaseConfig";

export default function AddArticle() {
  const [user] = useAuthState(auth);
  const [isExpanded, setIsExpanded] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, image: null });
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.image) {
      toast("Please complete all fields and attach an image.", { type: "warning" });
      return;
    }

    setIsUploading(true);
    const storageRef = ref(
      storage,
      `/images/${Date.now()}_${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
        toast("Error uploading image", { type: "error" });
        setIsUploading(false);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            createdBy: user.displayName || user.email.split("@")[0],
            userId: user.uid,
            likes: [],
            comments: [],
          })
            .then(() => {
              toast("Post published successfully", { type: "success" });
              setFormData({
                title: "",
                description: "",
                image: null,
              });
              setPreviewUrl("");
              setProgress(0);
              setIsUploading(false);
              setIsExpanded(false);
            })
            .catch((err) => {
              toast("Error creating article", { type: "error" });
              setIsUploading(false);
            });
        });
      }
    );
  };

  // Get user initials for display
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="premium-card p-3 mb-4 shadow-sm bg-white">
      {!user ? (
        <div className="text-center py-3">
          <h5 className="fw-bold mb-2 text-dark">Join the Conversation</h5>
          <p className="text-secondary small mb-3 px-3">
            Sign in to start writing articles, sharing insights, and connecting with other developers.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/signin" className="btn btn-premium btn-premium-primary">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-premium btn-premium-secondary">
              Join Now
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Main Composer Trigger Bar */}
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center fw-bold border"
              style={{ width: "42px", height: "42px", flexShrink: 0, fontSize: "14px" }}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="rounded-circle"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                getInitials(user.displayName || user.email)
              )}
            </div>
            <button
              className="composer-placeholder-trigger flex-grow-1 text-muted"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              Start a post, share what's on your mind...
            </button>
          </div>

          {/* Quick Shortcuts underneath */}
          <div className="d-flex justify-content-between mt-3 pt-2 border-top">
            <button className="btn btn-premium-tertiary btn-premium py-1 px-2 d-flex align-items-center gap-2 border-0 bg-transparent text-secondary" onClick={triggerFileSelect}>
              <i className="fa fa-picture-o text-primary" style={{ fontSize: "16px" }}></i>
              <span className="small">Photo</span>
            </button>
            <button className="btn btn-premium-tertiary btn-premium py-1 px-2 d-flex align-items-center gap-2 border-0 bg-transparent text-secondary" onClick={() => setIsExpanded(true)}>
              <i className="fa fa-video-camera text-success" style={{ fontSize: "16px" }}></i>
              <span className="small">Video</span>
            </button>
            <button className="btn btn-premium-tertiary btn-premium py-1 px-2 d-flex align-items-center gap-2 border-0 bg-transparent text-secondary" onClick={() => setIsExpanded(true)}>
              <i className="fa fa-calendar-o text-warning" style={{ fontSize: "16px" }}></i>
              <span className="small">Event</span>
            </button>
            <button className="btn btn-premium-tertiary btn-premium py-1 px-2 d-flex align-items-center gap-2 border-0 bg-transparent text-secondary" onClick={() => setIsExpanded(true)}>
              <i className="fa fa-newspaper-o text-danger" style={{ fontSize: "16px" }}></i>
              <span className="small">Write article</span>
            </button>
          </div>

          {/* Expandable Composer Body */}
          <div className={`expandable-composer-body ${isExpanded ? "expanded" : ""}`}>
            {/* Title */}
            <div className="form-group mb-3">
              <label className="fw-semibold small mb-1" style={{ color: "var(--text-secondary)" }}>Title</label>
              <input
                type="text"
                name="title"
                placeholder="Give your article a catchy headline..."
                className="form-control-premium w-100"
                value={formData.title}
                onChange={handleChange}
                disabled={isUploading}
              />
            </div>

            {/* Description / Content */}
            <div className="form-group mb-3">
              <label className="fw-semibold small mb-1" style={{ color: "var(--text-secondary)" }}>Description</label>
              <textarea
                name="description"
                placeholder="What do you want to talk about?"
                rows={4}
                className="form-control-premium w-100"
                value={formData.description}
                onChange={handleChange}
                disabled={isUploading}
              />
            </div>

            {/* Image attachment */}
            <div className="form-group mb-3">
              <label className="fw-semibold small mb-1" style={{ color: "var(--text-secondary)" }}>Post Photo</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                className="d-none"
                ref={fileInputRef}
                onChange={handleImageChange}
                disabled={isUploading}
              />

              {!previewUrl ? (
                <div
                  onClick={triggerFileSelect}
                  className="border border-dashed rounded p-4 text-center text-muted cursor-pointer hover-bg"
                  style={{ cursor: "pointer", borderStyle: "dashed !important", borderColor: "var(--border-color) !important" }}
                >
                  <i className="fa fa-cloud-upload text-muted mb-2" style={{ fontSize: "28px" }}></i>
                  <p className="small mb-0 fw-semibold text-secondary">Click here to select an image</p>
                  <span style={{ fontSize: "10px" }}>Supports PNG, JPG, JPEG</span>
                </div>
              ) : (
                <div className="image-preview-wrapper">
                  <img src={previewUrl} alt="Preview" />
                  {!isUploading && (
                    <button
                      type="button"
                      className="image-preview-remove"
                      onClick={handleRemoveImage}
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Upload progress */}
            {progress > 0 && (
              <div className="progress mb-3" style={{ height: "18px" }}>
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                  role="progressbar"
                  style={{ width: `${progress}%`, fontSize: "10px", fontWeight: "bold" }}
                  aria-valuenow={progress}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  Uploading: {progress}%
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="d-flex justify-content-end gap-2 pt-2 border-top">
              <button
                type="button"
                className="btn btn-premium btn-premium-secondary"
                onClick={() => setIsExpanded(false)}
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-premium btn-premium-primary"
                onClick={handlePublish}
                disabled={isUploading || !formData.title || !formData.description || !formData.image}
              >
                {isUploading ? (
                  <>
                    <i className="fa fa-spinner fa-spin me-2"></i> Publishing...
                  </>
                ) : (
                  "Publish"
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
