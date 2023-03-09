import React, { useCallback, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import {
  ButtonWithLoading,
  CreateUserModal,
  FileUploadField,
  InputField,
  MainWrapper,
  SelectField,
  Sidebar,
} from "../Components";
import { useNavigate } from "react-router-dom";
import {
  CreateUser,
  GetAllUser,
  GetPermissionList,
  GetPermissionListByType,
  UploadFile,
} from "../Services/allService";
import { formateDateYYYYMMDD } from "../common/utility";
import config from "../Services/api/config";
import { Avatar } from "../common/images";
import { toast } from "react-toastify";
import { countries } from "../Assets/_mocks/CountryList";
import CreatableSelectField from "../Components/Common/CreatableSelectField";
// import ComponentLoader from "../components/Loader/ComponentLoader";
// import { Link } from "react-router-dom";

const breadcrumbs = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 1,
    name: "Users",
    url: "/users",
  },
  {
    id: 1,
    name: "Create User",
    url: "/create-user",
  },
];

const accountTypes = [
  {
    label: "Personal",
    value: "personal",
  },
  {
    label: "Business",
    value: "business",
  },
];

const segmentList = [
  {
    label: "Bank",
    value: "Bank",
  },
  {
    label: "Remittence",
    value: "Remittence",
  },
  {
    label: "Insurance",
    value: "Insurance",
  },
  {
    label: "Mobile Money",
    value: "Mobile Money",
  },
  {
    label: "Others",
    value: "Others",
  },
];

const businessTypeList = [
  {
    label: "A",
    value: "A",
  },
  {
    label: "B",
    value: "B",
  },
  {
    label: "C",
    value: "C",
  },
  {
    label: "D",
    value: "D",
  },
];

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

function CreateUserPage({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [nominee, setNominee] = useState(null);
  const [accountType, setAccountType] = useState({
    label: "Business",
    value: "business",
  });
  const [fullName, setFullName] = useState(null);
  const [personalBankAccountNo, setPersonalBankAccountNo] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [documentIssueDate, setDocumentIssueDate] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [contactNumber, setContactNumber] = useState(null);
  const [city, setCity] = useState(null);
  const [gender, setGender] = useState(null);
  const [placeOfBirth, setPlaceOfBirth] = useState(null);
  const [address, setAddress] = useState(null);
  const [country, setCountry] = useState(null);
  const [documentExpireDate, setDocumentExpireDate] = useState(null);
  const [referencePersonId, setReferencePersonId] = useState(null);
  const [referencePersonName, setReferencePersonName] = useState(null);
  const [referencePersonRelation, setReferencePersonRelation] = useState(null);
  const [organizationName, setOrganizationName] = useState(null);
  const [orgBankAccountNo, setOrgBankAccountNo] = useState(null);
  const [recordNumber, setRecordNumber] = useState(null);
  const [businessEmail, setBusinessEmail] = useState(null);
  const [businessClass, setBusinessClass] = useState(null);
  const [segment, setSegment] = useState(null);
  const [businessType, setBusinessType] = useState(null);
  const [licenseNumber, setLicenseNumber] = useState(null);
  const [licenseIssueDate, setLicenseIssueDate] = useState(null);
  const [licenseExpireDate, setLicenseExpireDate] = useState(null);
  const [formError, setFormError] = useState({});

  const [photoLoading, setPhotoLoading] = useState(false);
  const [cover, setCover] = useState(null);
  const [users, setUsers] = useState([]);
  const [userLoading, setUsersLoading] = useState(true);
  const [nomineeLoading, setNomineeLoading] = useState(false);
  const [referencePersonLoading, setReferencePersonLoading] = useState(false);
  const [openNomineeCreate, setOpenNomineeCreate] = useState(false);
  const [openReferenceCreate, setOpenReferenceCreate] = useState(false);

  const [permissionList, setPermissionList] = useState("");
  const [permission, setPermission] = useState("");

  const getPermissions = async () => {
    const response = await GetPermissionListByType("user");
    console.log("per list", response);
    if (response.status) {
      setPermissionList(
        response.data.permissionList.map((item) => {
          const test = [];
          console.log("access", item?.accessList);
          for (var key in item?.accessList) {
            if (item?.accessList[key]) {
              test.push(key);
              console.log(key, "-", item?.accessList[key]);
            }
          }
          console.log("test", test);
          return {
            label: (
              <div className="flex space-x-2 items-center">
                <div className="text-left flex flex-col">
                  <span className="text-sm">{item.title}</span>
                  <span className="text-xs text-gray-500">
                    {test.join(", ")?.toUpperCase()}
                  </span>
                </div>
              </div>
            ),
            // label: item?.title,
            value: item?._id,
          };
        })
      );
    }
  };

  const toggleReferenceCreate = () => {
    setOpenReferenceCreate(!openReferenceCreate);
  };

  const toggleNomineeCreate = () => {
    setOpenNomineeCreate(!openNomineeCreate);
  };

  const formValiDation = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Name is Required";
    if (!values.email) errors.email = "Email is Required!";

    if (!values.accountType) errors.accountType = "Please Select Account Type!";
    if (!values.permission) errors.permission = "Please Select a permission!";

    if (photoLoading) errors.photoLoading = "Photo is uploading, Please Wait!";

    return errors;
  };

  const getAllUsers = async () => {
    setUsersLoading(true);
    const response = await GetAllUser({
      userType: "user",
      accountType: "personal",
    });

    console.log(response);

    if (response.status) {
      setUsers(
        response.data.users.map((item) => {
          return {
            label: (
              <div className="flex space-x-2 items-center">
                <img
                  className="h-8 w-8"
                  src={
                    item?.personalInfo?.photo
                      ? config.fileServer + item?.personalInfo?.photo
                      : Avatar
                  }
                  alt=""
                />
                <div className="text-left flex flex-col">
                  <span className="text-sm">
                    {item.personalInfo?.fullName}{" "}
                    {item?.name ? `(${item?.name})` : ""}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.email} - {item.personalInfo?.contactNumber}
                  </span>
                </div>
              </div>
            ),
            value: item?._id,
            searchKey: `${item?.name}${item?.email}${item?.personalInfo?.contactNumber}${item?.personalInfo?.fullName}`,
          };
        })
      );
    }

    setUsersLoading(false);
  };

  const customFilter = useCallback((option, input) => {
    if (input) {
      if (option.data.searchKey.toLowerCase().includes(input.toLowerCase())) {
        return true;
      } else {
        return false;
      }
      // return true for each option that matches your filter
    }
    return true; // if not search, then all match
  }, []);

  useEffect(() => {
    getAllUsers();
    getPermissions();
  }, []);

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

  const nomineeSubmit = async (FormData) => {
    setFormError(formValiDation(FormData));
    if (Object.keys(formValiDation(FormData)).length > 0) {
      return;
    }
    setNomineeLoading(true);
    const response = await CreateUser(FormData);
    console.log(response);
    const { data, message, status } = response;
    if (status) {
      setUsers([
        {
          label: (
            <div className="flex space-x-2 items-center">
              <img
                className="h-8 w-8"
                src={
                  data?.personalInfo?.photo
                    ? config.fileServer + data?.personalInfo?.photo
                    : Avatar
                }
                alt=""
              />
              <div className="text-left flex flex-col">
                <span className="text-sm">
                  {data.personalInfo?.fullName}{" "}
                  {data?.name ? `(${data?.name})` : ""}
                </span>
                <span className="text-xs text-gray-500">
                  {data.email} - {data.personalInfo?.contactNumber}
                </span>
              </div>
            </div>
          ),
          value: data?._id,
          searchKey: `${data?.name}${data?.email}${data?.personalInfo?.contactNumber}${data?.personalInfo?.fullName}`,
        },
        ...users,
      ]);

      setNominee({
        label: (
          <div className="flex space-x-2 items-center">
            <img
              className="h-8 w-8"
              src={
                data?.personalInfo?.photo
                  ? config.fileServer + data?.personalInfo?.photo
                  : Avatar
              }
              alt=""
            />
            <div className="text-left flex flex-col">
              <span className="text-sm">
                {data.personalInfo?.fullName}{" "}
                {data?.name ? `(${data?.name})` : ""}
              </span>
              <span className="text-xs text-gray-500">
                {data.email} - {data.personalInfo?.contactNumber}
              </span>
            </div>
          </div>
        ),
        value: data?._id,
        searchKey: `${data?.name}${data?.email}${data?.personalInfo?.contactNumber}${data?.personalInfo?.fullName}`,
      });
      setNomineeLoading(false);
      toggleNomineeCreate();
      toast("Nominee Created!", {
        type: "success",
      });
    } else {
      toast(message, {
        type: "error",
      });
      setNomineeLoading(false);
    }
  };

  const referenceSubmit = async (FormData) => {
    setFormError(formValiDation(FormData));
    if (Object.keys(formValiDation(FormData)).length > 0) {
      return;
    }
    setReferencePersonLoading(true);
    const response = await CreateUser(FormData);
    console.log(response);
    const { data, message, status } = response;
    if (status) {
      setUsers([
        {
          label: (
            <div className="flex space-x-2 items-center">
              <img
                className="h-8 w-8"
                src={
                  data?.personalInfo?.photo
                    ? config.fileServer + data?.personalInfo?.photo
                    : Avatar
                }
                alt=""
              />
              <div className="text-left flex flex-col">
                <span className="text-sm">
                  {data.personalInfo?.fullName}{" "}
                  {data?.name ? `(${data?.name})` : ""}
                </span>
                <span className="text-xs text-gray-500">
                  {data.email} - {data.personalInfo?.contactNumber}
                </span>
              </div>
            </div>
          ),
          value: data?._id,
          searchKey: `${data?.name}${data?.email}${data?.personalInfo?.contactNumber}${data?.personalInfo?.fullName}`,
        },
        ...users,
      ]);

      setReferencePersonId({
        label: (
          <div className="flex space-x-2 items-center">
            <img
              className="h-8 w-8"
              src={
                data?.personalInfo?.photo
                  ? config.fileServer + data?.personalInfo?.photo
                  : Avatar
              }
              alt=""
            />
            <div className="text-left flex flex-col">
              <span className="text-sm">
                {data.personalInfo?.fullName}{" "}
                {data?.name ? `(${data?.name})` : ""}
              </span>
              <span className="text-xs text-gray-500">
                {data.email} - {data.personalInfo?.contactNumber}
              </span>
            </div>
          </div>
        ),
        value: data?._id,
        searchKey: `${data?.name}${data?.email}${data?.personalInfo?.contactNumber}${data?.personalInfo?.fullName}`,
      });
      setReferencePersonLoading(false);
      toggleReferenceCreate();
      toast("Reference Person Created!", {
        type: "success",
      });
    } else {
      setReferencePersonLoading(false);
      toast(message, {
        type: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    let FormData = {
      name,
      email,
      password,
      userType: "user",
      accountType: accountType?.value,
      nominee: nominee?.value,
      permission: permission?.value,
      //personal data
      fullName,
      personalBankAccountNo,
      documentId,
      documentIssueDate,
      photo,
      dateOfBirth,
      contactNumber,
      city,
      gender: gender?.value,
      placeOfBirth,
      address,
      country: country?.value,
      documentExpireDate,
      referencePersonId: referencePersonId?.value,
      referencePersonName,
      referencePersonRelation,
      //business data
      organizationName,
      orgBankAccountNo,
      recordNumber,
      businessEmail,
      businessClass,
      segment: segment?.value,
      businessType: businessType?.value,
      licenseNumber,
      licenseIssueDate,
      licenseExpireDate,
    };
    setFormError(formValiDation(FormData));
    if (Object.keys(formValiDation(FormData)).length > 0) {
      return;
    }
    setLoading(true);
    const response = await CreateUser(FormData);
    console.log(response);
    const { data, message, status } = response;
    if (status) {
      toast("User Created!", {
        type: "success",
      });
      setLoading(false);
      navigate(`/users`);
    } else {
      toast(message, {
        type: "error",
      });
      setLoading(false);
    }
  };
  return (
    <MainWrapper>
      <Sidebar title="Create User" breadcrumb={breadcrumbs}>
        <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
          <>
            <div className="flex items-center justify-between py-2 border-b-2">
              <span className="font-bold capitalize">
                User Basic Information
              </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Name"
                placeholder="Name"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />

              <InputField
                required
                id="email"
                label="Email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(data) => setEmail(data)}
                errorMessage={formError?.email}
              />

              <InputField
                required
                id="password"
                label="Password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(data) => setPassword(data)}
                errorMessage={formError?.password}
              />

              <SelectField
                required
                label="Account Type"
                placeholder="Select Account Type"
                value={accountType}
                onChange={(data) => setAccountType(data)}
                errorMessage={formError?.accountType}
                selectOptions={accountTypes}
              />
              <SelectField
                required
                label="Permission Group"
                placeholder="Select Permission Group"
                value={permission}
                onChange={(data) => setPermission(data)}
                errorMessage={formError?.permission}
                selectOptions={permissionList}
              />
            </div>
          </>
          {accountType?.value === "personal" && (
            <>
              <div className="flex items-center justify-between py-2 mt-6 border-b-2">
                <span className="font-bold capitalize">
                  User Personal Information
                </span>
              </div>
              <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <InputField
                  required
                  id="fullName"
                  label="Full Name"
                  placeholder="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(data) => setFullName(data)}
                  errorMessage={formError?.fullName}
                />
                <InputField
                  required
                  id="contactNumber"
                  label="Contact Number"
                  placeholder="Contact Number"
                  type="text"
                  value={contactNumber}
                  onChange={(data) => setContactNumber(data)}
                  errorMessage={formError?.contactNumber}
                />
                <InputField
                  required
                  id="dateOfBirth"
                  label="Date Of Birth"
                  placeholder="Date Of Birth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(data) => setDateOfBirth(data)}
                  errorMessage={formError?.dateOfBirth}
                />

                <InputField
                  required
                  id="documentId"
                  label="Document Id"
                  placeholder="Document Id"
                  type="pasword"
                  value={documentId}
                  onChange={(data) => setDocumentId(data)}
                  errorMessage={formError?.documentId}
                />

                <InputField
                  required
                  id="documentIssueDate"
                  label="Document Issue Date"
                  placeholder="Document Issue Date"
                  type="date"
                  value={documentIssueDate}
                  onChange={(data) => setDocumentIssueDate(data)}
                  errorMessage={formError?.documentIssueDate}
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
                  errorMessage={formError?.documentExpireDate}
                />

                <InputField
                  required
                  id="personalBankAccountNo"
                  label="Personal Bank Account No"
                  placeholder="Personal Bank Account No"
                  type="text"
                  value={personalBankAccountNo}
                  onChange={(data) => setPersonalBankAccountNo(data)}
                  errorMessage={formError?.personalBankAccountNo}
                />

                <SelectField
                  required
                  label="Gender"
                  placeholder="Select Gender"
                  value={gender}
                  onChange={(data) => setGender(data)}
                  errorMessage={formError?.gender}
                  selectOptions={genders}
                />

                <InputField
                  required
                  id="placeOfBirth"
                  label="Place Of Birth"
                  placeholder="Place Of Birth"
                  type="text"
                  value={placeOfBirth}
                  onChange={(data) => setPlaceOfBirth(data)}
                  errorMessage={formError?.placeOfBirth}
                />
              </div>
              <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
                <div>
                  <SelectField
                    required
                    label="Reference Person from Registered User"
                    placeholder="Select Reference Person"
                    value={referencePersonId}
                    onChange={(data) => setReferencePersonId(data)}
                    errorMessage={formError?.referencePersonId}
                    selectOptions={users}
                    filterOption={customFilter}
                  />

                  <span className="text-sm text-gray-500">
                    Reference not available ?{" "}
                    <button
                      onClick={toggleReferenceCreate}
                      className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
                    >
                      Create New
                    </button>
                  </span>

                  <CreateUserModal
                    open={openReferenceCreate}
                    title="Create Reference Person"
                    onSubmit={referenceSubmit}
                    onClose={toggleReferenceCreate}
                    loading={referencePersonLoading}
                  />
                </div>

                <InputField
                  required
                  id="referencePersonRelation"
                  label="Relation with Reference Person"
                  placeholder="Relation with Reference Person"
                  type="text"
                  value={referencePersonRelation}
                  disabled={!referencePersonId}
                  onChange={(data) => setReferencePersonRelation(data)}
                  errorMessage={formError?.referencePersonRelation}
                />
              </div>
              <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <InputField
                  required
                  id="address"
                  label="Full Address"
                  placeholder="Full Address"
                  type="text"
                  value={address}
                  onChange={(data) => setAddress(data)}
                  errorMessage={formError?.address}
                />

                <InputField
                  required
                  id="city"
                  label="City"
                  placeholder="City"
                  type="text"
                  value={city}
                  onChange={(data) => setCity(data)}
                  errorMessage={formError?.city}
                />

                <SelectField
                  required
                  label="Country"
                  placeholder="Select Country"
                  value={country}
                  onChange={(data) => setCountry(data)}
                  errorMessage={formError?.country}
                  selectOptions={countries}
                />
              </div>
              <FileUploadField
                required
                id="photo"
                label="Photo"
                placeholder="Upload your picture"
                onChange={(data) => uploadPhoto(data)}
                errorMessage={formError?.photoLoading}
                value={photo}
                multiple={false}
                accept="image/*"
                valueType="object"
                loading={photoLoading}
              />
            </>
          )}
          {accountType?.value === "business" && (
            <>
              <div className="flex items-center justify-between py-2 mt-6 border-b-2">
                <span className="font-bold capitalize">
                  Business Information
                </span>
              </div>
              <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <InputField
                  required
                  id="organizationName"
                  label="Organization Name"
                  placeholder="Organization Name"
                  type="text"
                  value={organizationName}
                  onChange={(data) => setOrganizationName(data)}
                  errorMessage={formError?.organizationName}
                />

                <InputField
                  required
                  id="businessEmail"
                  label="Organization Email"
                  placeholder="Organization Email"
                  type="text"
                  value={businessEmail}
                  onChange={(data) => setBusinessEmail(data)}
                  errorMessage={formError?.businessEmail}
                />

                <InputField
                  required
                  id="orgBankAccountNo"
                  label="Business Bank Account No"
                  placeholder="Business Bank Account No"
                  type="text"
                  value={orgBankAccountNo}
                  onChange={(data) => setOrgBankAccountNo(data)}
                  errorMessage={formError?.orgBankAccountNo}
                />

                <InputField
                  required
                  id="licenseNumber"
                  label="Licence Number"
                  placeholder="Licence Number"
                  type="text"
                  value={licenseNumber}
                  onChange={(data) => setLicenseNumber(data)}
                  errorMessage={formError?.licenseNumber}
                />

                <InputField
                  required
                  id="licenseIssueDate"
                  label="License Issue Date"
                  placeholder="License Issue Date"
                  type="date"
                  value={licenseIssueDate}
                  onChange={(data) => setLicenseIssueDate(data)}
                  errorMessage={formError?.licenseIssueDate}
                />

                <InputField
                  required
                  id="licenseExpireDate"
                  label="License Expire Date"
                  placeholder="License Expire Date"
                  type="date"
                  min={formateDateYYYYMMDD(new Date(licenseIssueDate))}
                  value={licenseExpireDate}
                  onChange={(data) => setLicenseExpireDate(data)}
                  errorMessage={formError?.licenseExpireDate}
                />

                <InputField
                  required
                  id="businessClass"
                  label="Business Class"
                  placeholder="Business Class"
                  type="text"
                  value={businessClass}
                  onChange={(data) => setBusinessClass(data)}
                  errorMessage={formError?.businessClass}
                />

                <CreatableSelectField
                  required
                  label="Segment"
                  placeholder="Select Segment"
                  value={segment}
                  onChange={(data) => setSegment(data)}
                  errorMessage={formError?.segment}
                  selectOptions={segmentList}
                />

                {/* <InputField
                  required
                  id="segment"
                  label="Segment"
                  placeholder="Segment"
                  type="text"
                  value={segment}
                  onChange={(data) => setSegment(data)}
                  errorMessage={formError?.segment}
                /> */}

                <CreatableSelectField
                  required
                  label="Business Type"
                  placeholder="Select Business Type"
                  value={businessType}
                  onChange={(data) => setBusinessType(data)}
                  errorMessage={formError?.segment}
                  selectOptions={businessTypeList}
                />
                {/* <InputField
                  required
                  id="businessType"
                  label="Business Type"
                  placeholder="Business Type"
                  type="text"
                  value={businessType}
                  onChange={(data) => setBusinessType(data)}
                  errorMessage={formError?.businessType}
                /> */}
              </div>
              <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
                <InputField
                  required
                  id="recordNumber"
                  label="Record Number"
                  placeholder="Record Number"
                  type="text"
                  value={recordNumber}
                  onChange={(data) => setRecordNumber(data)}
                  errorMessage={formError?.recordNumber}
                />
                <div>
                  <SelectField
                    required
                    label="Nominee"
                    placeholder="Search Nominee"
                    value={nominee}
                    onChange={(data) => setNominee(data)}
                    errorMessage={formError?.nominee}
                    selectOptions={users}
                    filterOption={customFilter}
                  />

                  <span className="text-sm text-gray-500">
                    Nominee not available ?{" "}
                    <button
                      onClick={toggleNomineeCreate}
                      className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
                    >
                      Create New
                    </button>
                  </span>

                  <CreateUserModal
                    open={openNomineeCreate}
                    title="Create Nominee"
                    onSubmit={nomineeSubmit}
                    onClose={toggleNomineeCreate}
                    loading={nomineeLoading}
                  />
                </div>
              </div>
              <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <InputField
                  required
                  id="address"
                  label="Full Address"
                  placeholder="Full Address"
                  type="text"
                  value={address}
                  onChange={(data) => setAddress(data)}
                  errorMessage={formError?.address}
                />

                <InputField
                  required
                  id="city"
                  label="City"
                  placeholder="City"
                  type="text"
                  value={city}
                  onChange={(data) => setCity(data)}
                  errorMessage={formError?.city}
                />

                <SelectField
                  required
                  label="Country"
                  placeholder="Select Country"
                  value={country}
                  onChange={(data) => setCountry(data)}
                  errorMessage={formError?.country}
                  selectOptions={countries}
                />
              </div>
            </>
          )}

          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Create User"
            onClick={handleSubmit}
            type="submit"
          />
        </div>
      </Sidebar>
    </MainWrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
  };
}

export default connect(mapStateToProps)(CreateUserPage);
