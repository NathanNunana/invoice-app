import React from "react";
import "./Button.css";

const Button = ({ children, color, txt, handleAction }) => (
  <>
    <input
      className="action-btn"
      style={{ background: color, color: txt ?? "#ffffff" }}
      onClick={handleAction}
      value={children}
      type="submit"
    />
  </>
);

export default Button;
