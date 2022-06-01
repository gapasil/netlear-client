import React from "react";
import "./Button.scss";

function Button({ text, onClick, className, type }) {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
}

export default Button;
