// Button.js
import React from "react";

const Button = ({ text, onClick, className, ...props }) => {
  return (
    <button
      type="button"
      className={` h-14 w-60 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
      onClick={onClick}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
