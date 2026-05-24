import React, { useState } from "react";

export default function ImageLoader({
  src,
  alt,
  className,
  style,
  containerStyle,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div
        className="d-flex align-items-center justify-content-center bg-light"
        style={{
          ...containerStyle,
          minHeight: "200px",
          color: "#999",
          fontSize: "14px",
        }}
      >
        <div className="text-center">
          <i
            className="fa fa-image text-muted"
            style={{ fontSize: "40px", display: "block", marginBottom: "8px" }}
          ></i>
          <span>Image not available</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", ...containerStyle }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#f0f0f0",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            borderRadius: "inherit",
          }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "30px", height: "30px" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={style}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </div>
  );
}
