import React, { useState } from "react";

const HybridDropdown = ({ label, name, options, formData, handleChange }) => {
  const [isCustom, setIsCustom] = useState(false);

  const handleSelectChange = (e) => {
    if (e.target.value === "custom") {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      handleChange(e);
    }
  };

  return (
    <div className="">
      <label
        htmlFor={name}
        className="block mb-2 text-lg font-medium text-blue-600 capitalize"
      >
        {label}
      </label>
      {isCustom ? (
        <input
          type="text"
          name={name}
          id={name}
          value={formData[name]}
          onChange={handleChange}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      ) : (
        <select
          name={name}
          id={name}
          value={formData[name]}
          onChange={handleSelectChange}
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          <option value="custom">Custom</option>
        </select>
      )}
    </div>
  );
};

export default HybridDropdown;
