import React from "react";

// Card Component 1 - Radial Gradient Card
export const Card1 = ({ children, className = "", onClick }) => {
  return (
    <div className={`card-v1 ${className}`} onClick={onClick}>
      {children}

      <style jsx>{`
        .card-v1 {
          position: relative;
          width: 100%;
          max-width: 380px;
          min-height: 220px;
          padding: 24px;
          border-radius: 8px;
          background: radial-gradient(
            66.05% 66.05% at 50% 50%,
            rgba(246, 116, 248, 0) 0%,
            rgba(10, 43, 188, 0.5) 100%
          );
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        /* Glass morphism border using ::before */
        .card-v1::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 8px;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(246, 116, 248, 0.3) 0%,
            rgba(10, 43, 188, 0.6) 50%,
            rgba(246, 116, 248, 0.3) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Hover effect */
        .card-v1:hover {
          transform: translateY(-2px);
          background: radial-gradient(
            66.05% 66.05% at 50% 50%,
            rgba(246, 116, 248, 0.1) 0%,
            rgba(10, 43, 188, 0.6) 100%
          );
        }

        .card-v1:hover::before {
          background: linear-gradient(
            135deg,
            rgba(246, 116, 248, 0.5) 0%,
            rgba(10, 43, 188, 0.8) 50%,
            rgba(246, 116, 248, 0.5) 100%
          );
        }

        /* Active state */
        .card-v1:active {
          transform: translateY(0);
        }

        /* Responsive - Tablet */
        @media (max-width: 768px) {
          .card-v1 {
            max-width: 100%;
            padding: 20px;
            min-height: 200px;
          }
        }

        /* Responsive - Mobile */
        @media (max-width: 480px) {
          .card-v1 {
            padding: 16px;
            min-height: 180px;
            border-radius: 6px;
          }

          .card-v1::before {
            border-radius: 6px;
          }
        }

        /* Responsive - Small Mobile */
        @media (max-width: 375px) {
          .card-v1 {
            padding: 14px;
            min-height: 160px;
          }
        }
      `}</style>
    </div>
  );
};

// Card Component 2 - Premium Glass Card with Strong Border
export const Card2 = ({ children, className = "", onClick }) => {
  return (
    <div className={`card-v2 ${className}`} onClick={onClick}>
      {children}

      <style jsx>{`
        .card-v2 {
          position: relative;
          width: 100%;
          max-width: 380px;
          min-height: 220px;
          padding: 24px;
          border-radius: 15px;
          background: linear-gradient(
            0deg,
            rgba(30, 30, 30, 0.15) 0%,
            rgba(75, 75, 75, 0.15) 100%
          );
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        /* Glass morphism gradient border */
        .card-v2::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 15px;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.1) 25%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.1) 75%,
            rgba(255, 255, 255, 0.3) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Glass shine overlay */
        .card-v2::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.05),
            transparent
          );
          transition: left 0.5s;
        }

        /* Hover effects */
        .card-v2:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.35);
          background: linear-gradient(
            0deg,
            rgba(30, 30, 30, 0.2) 0%,
            rgba(75, 75, 75, 0.2) 100%
          );
        }

        .card-v2:hover::before {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.2) 25%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.2) 75%,
            rgba(255, 255, 255, 0.4) 100%
          );
        }

        .card-v2:hover::after {
          left: 100%;
        }

        /* Active state */
        .card-v2:active {
          transform: translateY(0);
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
        }

        /* Responsive - Tablet */
        @media (max-width: 768px) {
          .card-v2 {
            max-width: 100%;
            padding: 20px;
            min-height: 200px;
            border-radius: 12px;
          }

          .card-v2::before {
            border-radius: 12px;
          }
        }

        /* Responsive - Mobile */
        @media (max-width: 480px) {
          .card-v2 {
            padding: 16px;
            min-height: 180px;
            border-radius: 10px;
            backdrop-filter: blur(1.5px);
            -webkit-backdrop-filter: blur(1.5px);
          }

          .card-v2::before {
            border-radius: 10px;
          }
        }

        /* Responsive - Small Mobile */
        @media (max-width: 375px) {
          .card-v2 {
            padding: 14px;
            min-height: 160px;
            border-radius: 8px;
          }

          .card-v2::before {
            border-radius: 8px;
          }
        }
      `}</style>
    </div>
  );
};

// Card Component 3 - Subtle Glass Card
export const Card3 = ({ children, className = "", onClick }) => {
  return (
    <div className={`card-v3 ${className}`} onClick={onClick}>
      {children}

      <style jsx>{`
        .card-v3 {
          position: relative;
          width: 100%;
          max-width: 380px;
          min-height: 220px;
          padding: 24px;
          border-radius: 8px;
          background: linear-gradient(
            0deg,
            rgba(30, 30, 30, 0.15) 0%,
            rgba(75, 75, 75, 0.15) 100%
          );
          box-shadow: 1px 2px 1px 0 rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(1.5px);
          -webkit-backdrop-filter: blur(1.5px);
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        /* Subtle gradient border using ::before */
        .card-v3::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 8px;
          padding: 0.5px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.1) 40%,
            rgba(255, 255, 255, 0.05) 60%,
            rgba(255, 255, 255, 0.2) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Inner glow accent */
        .card-v3::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* Hover effect */
        .card-v3:hover {
          transform: translateY(-1px);
          box-shadow: 2px 4px 2px 0 rgba(0, 0, 0, 0.45);
          background: linear-gradient(
            0deg,
            rgba(30, 30, 30, 0.2) 0%,
            rgba(75, 75, 75, 0.2) 100%
          );
        }

        .card-v3:hover::before {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.15) 40%,
            rgba(255, 255, 255, 0.08) 60%,
            rgba(255, 255, 255, 0.25) 100%
          );
        }

        /* Active state */
        .card-v3:active {
          transform: translateY(0);
          box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.4);
        }

        /* Responsive - Tablet */
        @media (max-width: 768px) {
          .card-v3 {
            max-width: 100%;
            padding: 20px;
            min-height: 200px;
          }
        }

        /* Responsive - Mobile */
        @media (max-width: 480px) {
          .card-v3 {
            padding: 16px;
            min-height: 180px;
            border-radius: 6px;
            backdrop-filter: blur(1px);
            -webkit-backdrop-filter: blur(1px);
          }

          .card-v3::before {
            border-radius: 6px;
          }
        }

        /* Responsive - Small Mobile */
        @media (max-width: 375px) {
          .card-v3 {
            padding: 14px;
            min-height: 160px;
          }
        }
      `}</style>
    </div>
  );
};

// Card Component 4 - Bottom Right Corner Accent
export const Card4 = ({ children, className = "", onClick }) => {
  return (
    <div className={`card-v4 ${className}`} onClick={onClick}>
      {children}

      <style jsx>{`
        .card-v4 {
          position: relative;
          width: 100%;
          max-width: 380px;
          min-height: 200px;
          padding: 32px;
          border-radius: 15px;
          background: linear-gradient(
            0deg,
            rgba(30, 30, 30, 0.15) 0%,
            rgba(75, 75, 75, 0.15) 100%
          );
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        /* Glass morphism border using ::before */
        .card-v4::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 15px;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.1) 30%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.15) 70%,
            rgba(255, 255, 255, 0.3) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Hover effect */
        .card-v4:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.35);
          background: linear-gradient(
            0deg,
            rgba(30, 30, 30, 0.2) 0%,
            rgba(75, 75, 75, 0.2) 100%
          );
        }

        .card-v4:hover::before {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.15) 30%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.2) 70%,
            rgba(255, 255, 255, 0.4) 100%
          );
        }

        /* Active state */
        .card-v4:active {
          transform: translateY(0);
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
        }

        /* Responsive - Tablet */
        @media (max-width: 768px) {
          .card-v4 {
            min-height: 200px;
            padding: 28px;
            border-radius: 12px;
          }

          .card-v4::before {
            border-radius: 12px;
          }
        }

        /* Responsive - Mobile */
        @media (max-width: 480px) {
          .card-v4 {
            min-height: 200px;
            padding: 24px;
            max-width: 300px;
            border-radius: 10px;
            backdrop-filter: blur(1.5px);
            -webkit-backdrop-filter: blur(1.5px);
          }

          .card-v4::before {
            border-radius: 10px;
          }
        }

        /* Responsive - Small Mobile */
        @media (max-width: 375px) {
          .card-v4 {
            padding: 20px;
            min-height: 180px;
            border-radius: 8px;
          }

          .card-v4::before {
            border-radius: 8px;
          }
        }
      `}</style>
    </div>
  );
};

// Card Component 5 - Top Right Corner Accent
export const Card5 = ({ children, className = "", onClick }) => {
  return (
    <div className={`card-v5 ${className}`} onClick={onClick}>
      {children}

      <style jsx>{`
        .card-v5 {
          position: relative;
          width: 100%;
          max-width: 380px;
          min-height: 220px;
          padding: 24px;
          border-radius: 15px;
          background: linear-gradient(
            0deg,
            rgba(30, 30, 30, 0.15) 0%,
            rgba(75, 75, 75, 0.15) 100%
          );
          box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
        }

        /* Glass morphism border using ::before - top right accent */
        .card-v5::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 15px;
          padding: 1px;
          background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.05) 0%,
            rgba(255, 255, 255, 0.1) 30%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.15) 70%,
            rgba(255, 255, 255, 0.3) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        /* Hover effect */
        .card-v5:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 8px 0 rgba(0, 0, 0, 0.35);
          background: linear-gradient(
            0deg,
            rgba(30, 30, 30, 0.2) 0%,
            rgba(75, 75, 75, 0.2) 100%
          );
        }

        .card-v5:hover::before {
          background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.08) 0%,
            rgba(255, 255, 255, 0.15) 30%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.2) 70%,
            rgba(255, 255, 255, 0.4) 100%
          );
        }

        /* Active state */
        .card-v5:active {
          transform: translateY(0);
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.25);
        }

        /* Responsive - Tablet */
        @media (max-width: 768px) {
          .card-v5 {
            max-width: 100%;
            padding: 20px;
            min-height: 200px;
            border-radius: 12px;
          }

          .card-v5::before {
            border-radius: 12px;
          }
        }

        /* Responsive - Mobile */
        @media (max-width: 480px) {
          .card-v5 {
            padding: 16px;
            min-height: 180px;
            border-radius: 10px;
            backdrop-filter: blur(1.5px);
            -webkit-backdrop-filter: blur(1.5px);
          }

          .card-v5::before {
            border-radius: 10px;
          }
        }

        /* Responsive - Small Mobile */
        @media (max-width: 375px) {
          .card-v5 {
            padding: 14px;
            min-height: 160px;
            border-radius: 8px;
          }

          .card-v5::before {
            border-radius: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default { Card1, Card2, Card3, Card4, Card5 };
