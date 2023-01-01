import React from "react";

const Input = ({ placeholder, setState, type, children, value, multiple }) => {
  return (
    <input
      multiple={multiple}
      value={value}
      type= {type}
      placeholder={placeholder}
      onChange={(e) => {
        setState(e.target.value);
      }}
      className='text-black border-2 p-2 w-[75%] self-center border-blue-200 focus:border-blue-600 outline-none h-[85%] text-base text-center rounded-2xl'
    >
    </input>
  );
};

export default Input;
