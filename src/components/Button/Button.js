import React, {useState} from "react";
import "./Button.css";

const Button = ({ children, color, txt, handleAction, hover_color, disabled }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const buttonStyle = {
    background: color,
    color: txt ?? "#ffffff",
    // Apply different hover color when hovered
    ...(hovered && { background: hover_color ?? color }),
  };

  return <>
    <input
      className="action-button"
      style={buttonStyle}
      onClick={handleAction}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      value={children}
      type="submit"
      disabled={disabled}
    />
  </>
};

export default Button;
