// =====================================
// FILE: src/components/ui-elements/Modal/Modal.jsx
// MoonBet Reusable Modal Component
// Mobile-first, Glass Morphism, Fully Responsive
// FIXED: Visible close button in top-right corner
// =====================================

import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

// Close Icon SVG - Updated for better visibility
const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Success Icon
const SuccessIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#4ade80" strokeWidth="2" />
    <path
      d="M8 12l2 2 4-4"
      stroke="#4ade80"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Warning Icon
const WarningIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L2 20h20L12 2z"
      stroke="#fbbf24"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M12 9v4M12 17h.01"
      stroke="#fbbf24"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Error Icon
const ErrorIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
    <path
      d="M15 9l-6 6M9 9l6 6"
      stroke="#ef4444"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Info Icon
const InfoIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2" />
    <path
      d="M12 16v-4M12 8h.01"
      stroke="#3b82f6"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Modal Component
 * @param {boolean} isOpen - Controls modal visibility
 * @param {function} onClose - Callback when modal closes
 * @param {ReactNode} children - Modal content
 * @param {string} title - Modal title
 * @param {string} size - Modal size: 'sm', 'md', 'lg', 'xl', 'full'
 * @param {boolean} closeOnOverlay - Close modal when clicking overlay
 * @param {boolean} showCloseButton - Show close button (default: true)
 * @param {ReactNode} footer - Footer content
 * @param {string} className - Additional CSS classes
 * @param {boolean} centered - Center modal vertically
 * @param {string} animation - Animation type: 'fade', 'slide', 'zoom'
 */
const Modal = ({
  isOpen = false,
  onClose,
  children,
  title,
  size = "md",
  closeOnOverlay = true,
  showCloseButton = true,
  footer,
  className = "",
  centered = true,
  animation = "fade",
  preventScroll = true,
}) => {
  const modalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll
      if (preventScroll) {
        document.body.style.overflow = "hidden";
      }
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (preventScroll) {
        document.body.style.overflow = "";
      }
    };
  }, [isOpen, preventScroll]);

  // Handle mounting animation
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
    } else if (isMounted) {
      // If modal was mounted and isOpen becomes false, trigger closing animation
      setIsClosing(true);
      setTimeout(() => {
        setIsMounted(false);
        setIsClosing(false);
      }, 300);
    }
  }, [isOpen, isMounted]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMounted(false);
      setIsClosing(false);
      onClose && onClose();
    }, 300);
  };

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen && !isMounted) return null;

  const modalContent = (
    <div
      className={`modal-overlay ${animation} ${isClosing ? "closing" : ""} ${
        centered ? "centered" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`modal-container modal-${size} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Always show close button in top-right corner if enabled */}
        {showCloseButton && (
          <button
            type="button"
            className="modal-close-btn-absolute"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <CloseIcon />
          </button>
        )}

        {/* Header - Only show if title exists */}
        {title && (
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
          </div>
        )}

        {/* Body */}
        <div className="modal-body">{children}</div>

        {/* Footer */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );

  // Portal render
  return ReactDOM.createPortal(modalContent, document.body);
};

/**
 * Alert Modal - Simplified modal for alerts
 * POINTER 5: Close button removed from Alert Modals
 */
export const AlertModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Alert",
  message,
  type = "info", // 'success', 'warning', 'error', 'info'
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false,
}) => {
  const icons = {
    success: <SuccessIcon />,
    warning: <WarningIcon />,
    error: <ErrorIcon />,
    info: <InfoIcon />,
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      centered
      animation="zoom"
      showCloseButton={false}
      closeOnOverlay={false}
    >
      <div className="alert-modal-content">
        <div className="alert-icon">{icons[type]}</div>
        <h3 className="alert-title">{title}</h3>
        {message && <p className="alert-message">{message}</p>}
        <div className="alert-actions">
          {showCancel && (
            <button
              type="button"
              className="modal-btn modal-btn-secondary"
              onClick={handleCancel}
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            className={`modal-btn modal-btn-primary modal-btn-${type}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

/**
 * Confirmation Modal
 */
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = false,
}) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      centered
      animation="slide"
      title={title}
      showCloseButton={true}
    >
      <div className="confirm-modal-content">
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button
            type="button"
            className="modal-btn modal-btn-secondary"
            onClick={handleCancel}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`modal-btn modal-btn-primary ${
              danger ? "modal-btn-danger" : ""
            }`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

/**
 * Form Modal - For forms and inputs
 */
export const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  submitText = "Submit",
  cancelText = "Cancel",
  size = "md",
  loading = false,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      centered
      closeOnOverlay={!loading}
      showCloseButton={!loading}
      footer={
        <div className="form-modal-footer">
          <button
            type="button"
            className="modal-btn modal-btn-secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            type="submit"
            form="modal-form"
            className="modal-btn modal-btn-primary"
            disabled={loading}
          >
            {loading ? (
              <span className="modal-loading">
                <span className="modal-spinner"></span>
                Processing...
              </span>
            ) : (
              submitText
            )}
          </button>
        </div>
      }
    >
      <form id="modal-form" onSubmit={handleSubmit}>
        {children}
      </form>
    </Modal>
  );
};

/**
 * Image Modal - For displaying images
 */
export const ImageModal = ({ isOpen, onClose, src, alt = "Image", title }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      centered
      animation="zoom"
      title={title}
      className="image-modal"
      showCloseButton={true}
    >
      <div className="image-modal-content">
        <img src={src} alt={alt} />
      </div>
    </Modal>
  );
};

export default Modal;
