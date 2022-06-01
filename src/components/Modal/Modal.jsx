import React from "react";
import "./Modal.scss";

const Modal = ({ active, setActive, children, className }) => {
  return (
    <div className={className}>
      <div
        className={`modal ${active ? "active" : ""}`}
        onClick={() => setActive(false)}
      >
        <div
          className={`modal__content ${active ? "active" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
