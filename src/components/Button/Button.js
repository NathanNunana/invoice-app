import React from "react";
import "./Button.css";

const Button = ({ children, color, txt, modalAction }) => (
  <>
    <div
      className="action-btn"
      style={{ background: color, color: txt ?? "#ffffff" }}
      onClick={modalAction}
    >
      {children}
    </div>
  </>
);

export default Button;
