import React from "react";
import { useLocation } from "react-router-dom";

const Button = ({ children, handleOnClick, disabled }) => {
  const location = useLocation()
  return (
    <>
      <button
        className={` 
        ${location.pathname === "/bmi" && "font-bold text-lg border-2 border-white bg-black text-whit shadow-md shadow-white p-1 max-w-[75px] rounded-xl hover:text-black text-center cursor-default self-center w-[50%] disabled:bg-gray-500 disabled:opacity-25 hover:bg-white"}
        ${location.pathname !== "/bmi" && "font-bold text-lg bg-white text-black shadow-md shadow-black p-1 rounded-xl hover:text-white text-center cursor-default self-center w-[50%] disabled:bg-gray-500 disabled:opacity-25 hover:bg-black"}
        `}
        onClick={handleOnClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
