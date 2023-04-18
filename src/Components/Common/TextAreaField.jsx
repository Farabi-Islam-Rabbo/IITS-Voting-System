import React from "react";

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
  row,
  errorMessage,
  defaultValue,
}) {
  return (
    <div className="flex flex-col pt-4">
      <label className="text-base mb-2">{label}</label>
      <textarea
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
        value={value}
        className="px-3 py-2 leading-tight text-gray-700 border border-gray-300 rounded appearance-none md:w-auto focus:outline-blue-600 focus:shadow-outline"
        rows={row}
        placeholder={placeholder}
      ></textarea>
      <p className="text-base text-right text-red-900">{errorMessage}</p>
    </div>
  );
}

export default TextAreaField;
