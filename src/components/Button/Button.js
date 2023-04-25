import React from "react";
import "./Button.css";

const Button = ({ children, color, txt, modalAction}) => (
  <>
    <input
      className="action-btn"
      style={{ background: color, color: txt ?? "#ffffff" }}
      onClick={modalAction}
      value={children}
      type="submit"
      /
    >
      
    {/* </input> */}
  </>
);

export default Button;
