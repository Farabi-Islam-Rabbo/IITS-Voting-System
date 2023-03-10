import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { FiUploadCloud, FiLoader } from "react-icons/fi";
import { PdfIcon } from "../../common/images";
import config from "../../Services/api/config";

function FileUploadField({
  id,
  label,
  placeholder,
  onChange,
  errorMessage,
  accept,
  multiple,
  value,
  loading,
  valueType,
  onRemove,
  validType,
}) {
  const [dropFocus, setDropFocus] = useState(false);

  const onDrop = (files) => {
    setDropFocus(false);
    onChange(files);
  };

  const onSelectFile = (files) => {
    // console.log("---", files[0].val());
    const badType = ["exe", "php", "dll"];
    if (checkType(files, badType)) {
      return;
    }
    if (validType && !checkType(files, validType)) {
      return;
    }
    onChange(files);
  };
  const checkType = (files, badType) => {
    var len = files.length;
    let returnType = false;
    for (var i = 0; i < len; i++) {
      var filename = files[i]?.name;
      let ext = filename.split(".").pop();
      const isBadType = badType.find(
        (x) => x.toUpperCase() == ext.toUpperCase()
      );
      if (isBadType) {
        return true;
      }
    }
    return returnType;
  };

  console.log(value);

  return (
    <div className="flex flex-col pt-4">
      <label className="text-base">
        {label}{" "}
        {validType && (
          <span>
            (
            {validType &&
              validType.map((x, i) => <span>{i == 0 ? x : `, ${x}`}</span>)}
            )
          </span>
        )}
      </label>
      {value && (
        <div className="flex flex-wrap justify-center mb-10">
          <div className="flex justify-center w-full p-1 border-2 border-gray-200 rounded">
            <img src={config.fileServer + value} className="max-h-72" />
          </div>
        </div>
      )}

      <Dropzone
        onDrop={onDrop}
        multiple={multiple}
        noClick={true}
        onDragEnter={() => setDropFocus(true)}
        onDragLeave={() => setDropFocus(false)}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <label
              className={`flex flex-col items-center px-4 py-6 text-blue rounded  tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-gray-700 ${
                dropFocus
                  ? "border-dashed border-2 border-gray-400 bg-gray-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              {loading ? (
                <FiUploadCloud
                  className="w-10 h-10 text-gray-600 animate-bounce"
                  aria-hidden="true"
                />
              ) : (
                <FiUploadCloud
                  className="w-10 h-10 text-gray-600"
                  aria-hidden="true"
                />
              )}
              <span className="mt-2 text-xs leading-normal text-gray-500">
                {dropFocus
                  ? "Drop File Here"
                  : loading
                  ? "LOADING"
                  : !multiple && value
                  ? "Upload New"
                  : placeholder}
              </span>

              <input
                {...getInputProps()}
                type="file"
                className="hidden"
                onChange={(e) => onSelectFile(e.target.files)}
                id={id}
                placeholder={placeholder}
                accept={accept}
                disabled={loading}
              />
            </label>
          </div>
        )}
      </Dropzone>

      <p className="text-base text-left text-red-900">{errorMessage}</p>
    </div>
  );
}

export default FileUploadField;
