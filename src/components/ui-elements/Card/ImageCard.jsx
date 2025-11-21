// =====================================
// FILE: src/components/ui-elements/Card/ImageCard.jsx
// MoonBet Reusable Image Card Component with Glass Morphism
// =====================================
import React, { useState } from "react";

const ImageCard = ({
  image,
  alt = "Card Image",
  onClick,
  className = "",
  badge = null,
  aspectRatio = "3/5", // Portrait orientation - 3 width to 5 height (e.g., 300x500)
  maxHeight = null, // Optional max height in pixels
  ...props
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div
      className={`image-card ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      {...props}
    >
      {/* Badge (optional) */}
      {badge && <span className="image-card-badge">{badge}</span>}

      {/* Glass Hover Overlay */}
      <div className="image-card-overlay">
        <div className="glass-effect"></div>
        <div className="play-icon-wrapper">
          <svg
            className="play-icon"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Loading Skeleton */}
      {!imageLoaded && !imageError && (
        <div className="image-card-skeleton"></div>
      )}

      {/* Error State */}
      {imageError && (
        <div className="image-card-error">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <rect
              x="2"
              y="2"
              width="20"
              height="20"
              rx="4"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M7 7L17 17M17 7L7 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}

      {/* Actual Image */}
      {!imageError && (
        <img
          src={image}
          alt={alt}
          className={`image-card-image ${imageLoaded ? "loaded" : ""}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      )}

      {/* Glow Effect on Hover */}
      <div className="image-card-glow"></div>

      <style jsx>{`
        /* Image Card Container */
        .image-card {
          position: relative;
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          background: #0a0a0a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: ${onClick ? "pointer" : "default"};
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          isolation: isolate;
          aspect-ratio: ${aspectRatio};
          ${maxHeight ? `max-height: ${maxHeight}px;` : ""}
        }

        /* Optional Badge */
        .image-card-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px 14px;
          background: rgba(240, 119, 48, 0.95);
          backdrop-filter: blur(8px);
          border-radius: 6px;
          color: #ffffff;
          font-family: "Neue Plak", sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          z-index: 3;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }

        /* Glass Morphism Overlay */
        .image-card-overlay {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .glass-effect {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 16px;
        }

        /* Play Icon */
        .play-icon-wrapper {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50%;
          transform: scale(0.8);
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .play-icon {
          color: #000;
          transform: translateX(2px); /* Slight offset to center visually */
        }

        @keyframes shine-sweep {
          0%,
          100% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          50% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }

        /* Image */
        .image-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: all 0.6s ease;
          transform: scale(1.05);
        }

        .image-card-image.loaded {
          opacity: 1;
          transform: scale(1);
        }

        /* Loading Skeleton */
        .image-card-skeleton {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        /* Error State */
        .image-card-error {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
          color: rgba(255, 255, 255, 0.2);
        }

        /* Glow Effect */
        .image-card-glow {
          position: absolute;
          inset: -1px;
          border-radius: 16px;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(240, 119, 48, 0.4),
            transparent
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: -1;
        }

        /* Hover Effects */
        .image-card:hover {
          transform: translateY(-6px);
          border-color: rgba(240, 119, 48, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 60px rgba(240, 119, 48, 0.1);
        }

        .image-card:hover .image-card-overlay {
          opacity: 1;
        }

        .image-card:hover .play-icon-wrapper {
          transform: scale(1);
        }

        /* Keep image sharp - no blur or transform on the image itself */
        .image-card:hover .image-card-image {
          /* Image stays crisp and clear */
          transform: scale(1);
          filter: none;
        }

        .image-card:hover .image-card-glow {
          opacity: 0.5;
        }

        @keyframes glow-rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Active/Click State */
        .image-card:active {
          transform: translateY(-4px) scale(1.01);
          transition: transform 0.1s ease;
        }

        /* Focus State for Accessibility */
        .image-card:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(240, 119, 48, 0.5),
            0 25px 50px rgba(0, 0, 0, 0.5);
        }

        /* Mobile Responsiveness */
        @media (max-width: 640px) {
          .image-card {
            border-radius: 12px;
            aspect-ratio: 3/5; /* Maintain portrait ratio on mobile */
          }

          .image-card-badge {
            top: 8px;
            right: 8px;
            padding: 4px 10px;
            font-size: 10px;
          }

          .play-icon-wrapper {
            width: 40px;
            height: 40px;
          }

          .play-icon {
            width: 30px;
            height: 30px;
          }

          /* Reduce hover lift on mobile */
          .image-card:hover {
            transform: translateY(-3px);
          }

          .image-card:hover .image-card-image {
            transform: scale(1);
          }
        }

        /* Tablet */
        @media (min-width: 641px) and (max-width: 1024px) {
          .image-card {
            aspect-ratio: 3/5; /* Maintain portrait ratio on tablet */
          }
        }

        /* Desktop */
        @media (min-width: 1025px) {
          .image-card {
            aspect-ratio: 3/5; /* Maintain portrait ratio on desktop */
          }
        }

        /* Touch devices - disable some hover effects */
        @media (hover: none) {
          .image-card:hover {
            transform: none;
          }

          .image-card:active {
            transform: scale(0.98);
          }
        }

        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
          .image-card,
          .image-card-overlay,
          .image-card-image,
          .image-card-glow {
            transition: none;
            animation: none;
          }

          .image-card:hover {
            transform: translateY(-4px);
          }

          .image-card:hover .image-card-image {
            transform: scale(1.05);
          }
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: light) {
          .image-card {
            background: #f5f5f5;
            border-color: rgba(0, 0, 0, 0.08);
          }

          .image-card-error {
            background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
            color: rgba(0, 0, 0, 0.2);
          }
        }
      `}</style>
    </div>
  );
};

export default ImageCard;
