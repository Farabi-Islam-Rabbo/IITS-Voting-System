import React from "react";
import BaseSelect from "react-select";
import FixRequiredSelect from "./FixRequiredSelect";
import { MdCancel } from "react-icons/md";
import CreatableSelect from "react-select/creatable";

function CreatableSelectField({
  id,
  label,
  placeholder,
  value,
  onChange,
  errorMessage,
  selectOptions,
  loading,
  multiSelect,
  selectedValues,
  setSelectedValues,
  filterOption,
}) {
  return (
    <div className="flex flex-col pt-4">
      <label className="text-base">{label}</label>
      {multiSelect && (
        <div className="flex flex-wrap mb-2 gap-1 text-center items-center">
          {selectedValues?.map((item) => (
            <span
              className={`px-3 py-1 text-center text-sm leading-none font-bold rounded-full bg-blue-200 hover:bg-blue-300 flex gap-2 items-center w-min`}
            >
              {item?.label}
              {setSelectedValues && (
                <button
                  className="text-sm text-red-800 hover:text-red-600"
                  onClick={() =>
                    setSelectedValues((oldState) =>
                      oldState?.filter((x) => x?.value !== item?.value)
                    )
                  }
                >
                  <MdCancel size={16} />
                </button>
              )}
            </span>
          ))}
        </div>
      )}
      <CreatableSelect
        id={id}
        value={value}
        isClearable
        placeholder={placeholder}
        options={selectOptions}
        onChange={(value) => onChange(value)}
        isLoading={loading}
        isDisabled={loading}
        filterOption={filterOption}
      />
      <p className="text-xs text-right text-red-900">{errorMessage}</p>
    </div>
  );
}

export default CreatableSelectField;
