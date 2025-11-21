import React from "react";

const MoonBetButton = ({
  children = "Play Now",
  onClick,
  href = "#",
  className = "",
}) => {
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div className={`casin-btncard-final ${className}`}>
      <a className="moonbet-button" href={href} onClick={handleClick}>
        <span className="light-spot-small-1"></span>
        <span className="light-spot-small-2"></span>
        <span className="light-spot-1"></span>
        <span className="light-spot-2"></span>
        <span className="light-spot-3"></span>
        <span className="moonbet-button-content-wrapper">
          <span className="moonbet-button-text">{children}</span>
        </span>
      </a>
    </div>
  );
};

export default MoonBetButton;
