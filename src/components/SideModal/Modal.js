import React from "react";
import "./Modal.css";

const Modal = ({ handleClose, show, children }) => {
  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      handleClose();
    }
  };
  return (
    <div
      style={show ? { display: "block" } : { display: "none" }}
      className="modal"
      onClick={(e) => handleClick(e)}
    >
      <section className="modal-main">{children}</section>
    </div>
  );
};

export default Modal;
