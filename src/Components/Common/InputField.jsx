import React from "react";

function InputField({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  errorMessage,
  defaultValue,
  disabled,
  max,
  min,
  ...props
}) {
  return (
    <div className="flex flex-col pt-4">
      <label className="text-base">{label}</label>
      <input
        {...props}
        type={type}
        id={id}
        placeholder={placeholder}
        className="px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded appearance-none md:w-auto focus:outline-blue-600 focus:shadow-outline w-full"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        max={max}
        min={min}
      />
      <p className="text-base text-left text-red-900">{errorMessage}</p>
    </div>
  );
}

export default InputField;
