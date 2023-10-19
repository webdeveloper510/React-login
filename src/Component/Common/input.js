import React from "react";

const Input = ({ type, placeholder, label, defaultValue, onChange, name }) => {
  return (
    <>
      <div>
        <label className="py-4 w-full text-[#2C2C2C] text-lg font-normal">
          {label}
        </label>
        <div>
          <input
            type={type}
            name={name}
            defaultValue={defaultValue}
            onChange={onChange}
            className="bg-white px-4 w-full text-base bg-[#e6e6e6] rounded-[25px] mb-3 border-b-2 mt-1 py-3"
            placeholder={placeholder}
          />
        </div>
      </div>
    </>
  );
};

export default Input;
