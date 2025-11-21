// =====================================
// FILE: src/components/ui-elements/Loading/Loading.jsx
// Simplified Loading Component - 2 Variants Only
// 1. Full Page Loading
// 2. Section/Component Loading
// =====================================

import React from "react";
import ReactDOM from "react-dom";
import "./Loading.css";

/**
 * 1. Full Page Loading Overlay
 * @param {boolean} isLoading - Show/hide loading overlay
 * @param {string} message - Optional loading message
 */
export const FullPageLoading = ({
  isLoading = false,
  message = "Loading...",
}) => {
  if (!isLoading) return null;

  const content = (
    <div className="full-page-loading-overlay">
      <div className="full-page-loading-content">
        <div className="loading-spinner"></div>
        {message && <p className="loading-text">{message}</p>}
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.body);
};

/**
 * 2. Section/Component Loading
 * @param {boolean} isLoading - Show loading state
 * @param {ReactNode} children - Content to show when loaded
 * @param {string} minHeight - Minimum height of loading container
 */
export const SectionLoading = ({
  isLoading = false,
  children,
  minHeight = "200px",
}) => {
  if (isLoading) {
    return (
      <div className="section-loading-container" style={{ minHeight }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return <>{children}</>;
};

// Default export
const Loading = {
  FullPage: FullPageLoading,
  Section: SectionLoading,
};

export default Loading;
