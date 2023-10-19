import React from "react";

function Radio({ label, checked, name, id, value, onChange }) {
  return (
    <div>
      <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
        <input
          checked={checked}
          id={id}
          type="radio"
          value={value}
          name={name}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={id}
          className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {label}
        </label>
      </div>
    </div>
  );
}

export default Radio;
