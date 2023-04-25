import React from "react";
import "./StatusButton.css";

const StatusButton = ({ status }) => (
  <div
    className="invoice-status"
    style={
      status.toLowerCase().trim() === "paid"
        ? { background: "#33D69F11", color: "#33D69F" }
        : status.toLowerCase().trim() === "pending"
        ? { background: "#FF8F0011", color: "#FF8F00" }
        : {
            background: "var(--font-color-status)",
            color: "var(--font-color-white)",
          }
    }
  >
    <div
      className="dot"
      style={
        status.toLowerCase().trim() === "paid"
          ? { background: "#33D69F" }
          : status.toLowerCase().trim() === "pending"
          ? { background: "#FF8F00" }
          : {
              background: "var(--font-color-white)",
            }
      }
    ></div>
    {status}
  </div>
);

export default StatusButton;
