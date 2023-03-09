import React from "react";
import BaseSelect from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";
const genderOption = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Others", label: "Others" },
];

const Select = (props) => (
  <FixRequiredSelect
    {...props}
    SelectComponent={BaseSelect}
    options={genderOption}
  />
);

function SelectGender({
  id,
  label,
  placeholder,
  value,
  onChange,
  errorMessage,
}) {
  return (
    <div className="flex flex-col pt-4">
      <label className="text-base">{label}</label>
      <Select
        id={id}
        value={value}
        placeholder={placeholder}
        options={genderOption}
        onChange={(value) => onChange(value)}
      />
      <p className="text-base text-left text-red-900">{errorMessage}</p>
    </div>
  );
}

export default SelectGender;
