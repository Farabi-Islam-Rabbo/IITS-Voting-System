import React, { useState } from "react";

const CheckboxComponent = ({
  label,
  onChange,
  checkList,
  extra,
  chekedList,
}) => {
  const [extraItems, setExtraItems] = useState([]);
  const [value, setValue] = useState("");
  const [valueError, setValueError] = useState(false);

  const addItem = () => {
    if (value) {
      setExtraItems([...extraItems, { value: value, label: value }]);
      setValue("");
      setValueError(false);
    } else {
      setValueError(true);
    }
  };

  return (
    <div className="flex flex-col pt-4">
      <label className="text-base">{label}</label>
      <div className="grid-1 sm:grid-2">
        {checkList?.map((item, index) => (
          <label
            key={index}
            className="inline-flex items-center mb-2 w-full sm:w-1/2"
          >
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-gray-600"
              onChange={onChange}
              value={item.value}
              checked={chekedList?.find((it) => it === item.value)}
            />
            <span className="ml-2 text-gray-700">{item.label}</span>
          </label>
        ))}
        {extra && (
          <>
            {extraItems.map((item, index) => (
              <label
                key={index}
                className="inline-flex items-center mb-2 w-full sm:w-1/2"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  onChange={onChange}
                  value={item.value}
                />
                <span className="ml-2 text-gray-700">{item.label}</span>
              </label>
            ))}
            <div className="inline-flex flex-col mb-2 w-full sm:w-1/2">
              <div className="items-center ">
                <button
                  onClick={addItem}
                  className="w-5 h-5 rounded bg-blue-700 text-white font-bold text-sm"
                >
                  +
                </button>
                <input
                  type="text"
                  placeholder="Add New Item"
                  className="px-2 py-1 ml-2 leading-tight text-gray-700 border border-gray-300 rounded appearance-none md:w-auto focus:outline-blue-600 focus:shadow-outline"
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                />
              </div>
              {valueError && (
                <span className="text-xs text-red-700">
                  *You Must Write a Title
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckboxComponent;
