import React from "react";
import ButtonWithLoading from "./ButtonWithLoading";

const ConfirmationModal = ({
  open,
  handleConfirm,
  handleClose,
  title,
  subtitle,
  id,
  loading,
  hideClose,
  confirmButtonTitle,
}) => {
  return (
    open && (
      <div
        className="fixed z-50 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 bg-black bg-opacity-30 transition-opacity"
            aria-hidden="true"
          ></div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="flex justify-between px-2 py-2 items-center border-b-2">
              <span className="text-sm font-bold uppercase">Alert!</span>
              <button
                className="rounded-full h-6 w-6 flex justify-center items-center hover:text-gray-700"
                onClick={handleClose}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="bg-white p-4 flex items-center flex-col text-center justify-center">
              <div>
                <span className="text-base font-bold block">{title}</span>
                <span className="text-sm text-gray-500 font-bold block">
                  {subtitle}
                </span>
              </div>
            </div>

            <div className="flex justify-center my-4 space-x-2">
              <ButtonWithLoading
                className="py-1 px-2 rounded text-sm text-white bg-blue-700 hover:bg-blue-600 uppercase"
                title={confirmButtonTitle ? confirmButtonTitle : "Confirm"}
                onClick={() => handleConfirm(id)}
                type="button"
                loading={loading}
              />
              {hideClose ? null : (
                <button
                  className="py-1 px-2 rounded text-sm  text-white bg-red-700 hover:bg-red-600 uppercase"
                  onClick={() => handleClose()}
                  type="button"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
