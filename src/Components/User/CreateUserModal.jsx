import React, { useState } from "react";
import { countries } from "../../Assets/_mocks/CountryList";
import { formateDateYYYYMMDD } from "../../common/utility";
import { UploadFile } from "../../Services/allService";
import ButtonWithLoading from "../Common/ButtonWithLoading";
import FileUploadField from "../Common/FileUploadField";
import InputField from "../Common/InputField";
import SelectField from "../Common/SelectField";

const genders = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },

  {
    label: "Others",
    value: "others",
  },
];

const CreateUserModal = ({ open, onSubmit, onClose, title, loading }) => {
  // const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [personalBankAccountNo, setPersonalBankAccountNo] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [documentIssueDate, setDocumentIssueDate] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState(null);
  const [country, setCountry] = useState(null);
  const [documentExpireDate, setDocumentExpireDate] = useState(null);

  const [photoLoading, setPhotoLoading] = useState(false);

  const uploadPhoto = async (files) => {
    if (files[0]) {
      setPhotoLoading(true);
      let formData = new FormData();
      formData.append("file", files[0]);
      formData.append("name", "Photo");
      formData.append("active", true);

      const response = await UploadFile(formData);

      console.log(response);

      if (response?.status) {
        setPhoto(response.data?.fileName);
      }
      setPhotoLoading(false);
    }
  };

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

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
            <div className="flex justify-between px-4 py-4 items-center border-b-2">
              <span className="text-base font-bold uppercase">{title}</span>
              <button
                className="rounded-full h-6 w-6 flex justify-center items-center hover:text-gray-700"
                onClick={onClose}
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
            <div className="bg-white px-4">
              <InputField
                required
                id="name"
                label="Username"
                placeholder="Username"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                // errorMessage={formError?.name}
              />
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                <InputField
                  required
                  id="email"
                  label="Email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(data) => setEmail(data)}
                  // errorMessage={formError?.email}
                />

                <InputField
                  required
                  id="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(data) => setPassword(data)}
                  // errorMessage={formError?.password}
                />
              </div>
              <div className="flex items-center justify-between py-2 mt-6 border-b-2">
                <span className="">Personal Information</span>
              </div>
              <InputField
                required
                id="fullName"
                label="Full Name"
                placeholder="Full Name"
                type="text"
                value={fullName}
                onChange={(data) => setFullName(data)}
                // errorMessage={formError?.fullName}
              />
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                <InputField
                  required
                  id="contactNumber"
                  label="Contact Number"
                  placeholder="Contact Number"
                  type="text"
                  value={contactNumber}
                  onChange={(data) => setContactNumber(data)}
                  // errorMessage={formError?.contactNumber}
                />
                <InputField
                  required
                  id="dateOfBirth"
                  label="Date Of Birth"
                  placeholder="Date Of Birth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(data) => setDateOfBirth(data)}
                  // errorMessage={formError?.dateOfBirth}
                />
              </div>

              <InputField
                required
                id="documentId"
                label="Document Id"
                placeholder="Document Id"
                type="pasword"
                value={documentId}
                onChange={(data) => setDocumentId(data)}
                // errorMessage={formError?.documentId}
              />
              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                <InputField
                  required
                  id="documentIssueDate"
                  label="Document Issue Date"
                  placeholder="Document Issue Date"
                  type="date"
                  value={documentIssueDate}
                  onChange={(data) => setDocumentIssueDate(data)}
                  // errorMessage={formError?.documentIssueDate}
                />

                <InputField
                  required
                  id="documentExpireDate"
                  label="Document Expire Date"
                  placeholder="Document Expire Date"
                  type="date"
                  min={formateDateYYYYMMDD(new Date(documentIssueDate))}
                  value={documentExpireDate}
                  onChange={(data) => setDocumentExpireDate(data)}
                  // errorMessage={formError?.documentExpireDate}
                />
              </div>

              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                <InputField
                  required
                  id="personalBankAccountNo"
                  label="Personal Bank Account No"
                  placeholder="Personal Bank Account No"
                  type="text"
                  value={personalBankAccountNo}
                  onChange={(data) => setPersonalBankAccountNo(data)}
                  // errorMessage={formError?.personalBankAccountNo}
                />

                <SelectField
                  required
                  label="Gender"
                  placeholder="Select Gender"
                  value={gender}
                  onChange={(data) => setGender(data)}
                  // errorMessage={formError?.gender}
                  selectOptions={genders}
                />
              </div>

              <InputField
                required
                id="address"
                label="Full Address"
                placeholder="Full Address"
                type="text"
                value={address}
                onChange={(data) => setAddress(data)}
                // errorMessage={formError?.address}
              />

              <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
                <InputField
                  required
                  id="city"
                  label="City"
                  placeholder="City"
                  type="text"
                  value={city}
                  onChange={(data) => setCity(data)}
                  // errorMessage={formError?.city}
                />

                <SelectField
                  required
                  label="Country"
                  placeholder="Select Country"
                  value={country}
                  onChange={(data) => setCountry(data)}
                  selectOptions={countries}
                />
              </div>
              <FileUploadField
                required
                id="photo"
                label="Photo"
                placeholder="Upload your picture"
                onChange={(data) => uploadPhoto(data)}
                // errorMessage={formError?.photoLoading}
                value={photo}
                multiple={false}
                accept="image/*"
                valueType="object"
                loading={photoLoading}
              />
            </div>

            <div className="flex justify-center my-4 space-x-2">
              <ButtonWithLoading
                className="py-1 px-2 rounded text-sm text-white bg-blue-700 hover:bg-blue-600 uppercase"
                title={"Submit"}
                onClick={() =>
                  onSubmit({
                    name,
                    email,
                    password,
                    userType: "user",
                    accountType: "personal",
                    fullName,
                    personalBankAccountNo,
                    documentId,
                    documentIssueDate,
                    photo,
                    dateOfBirth,
                    contactNumber,
                    city,
                    gender: gender?.value,
                    address,
                    country: country?.value,
                    documentExpireDate,
                  })
                }
                type="button"
                loading={loading}
              />
              <button
                className="py-1 px-2 rounded text-sm  text-white bg-red-700 hover:bg-red-600 uppercase"
                onClick={() => onClose()}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateUserModal;
