import React, { useCallback, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import {
  AdminSideBar,
  ButtonWithLoading,
  CreateUserModal,
  FileUploadField,
  InputField,
  MainWrapper,
  SelectField,
  Sidebar,
  TextAreaField
} from "../Components";
import { useNavigate } from "react-router-dom";
import {
  CreateUser,
  GetAllActivePrograms,
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
    name: "Create Student",
    url: "/create-student",
  },
  {
    id: 1,
    name: "Create Student",
    url: "/create-student",
  },
];

const accountTypes = [
  {
    label: "Cultural Wing",
    value: "cultural wing",
  },
  {
    label: "Event Wing",
    value: "event wing",
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

function CreateStudent({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [nominee, setNominee] = useState(null);
  const [accountType, setAccountType] = useState({
    label: "BCSE",
    value: "191aa7ab-825c-435d-a01e-174c0d4d6f1d",
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
  const [allDept, setAllDept] = useState({});

  const [photoLoading, setPhotoLoading] = useState(false);


  const [permissionList, setPermissionList] = useState("");
  const [permission, setPermission] = useState("");



  const formValiDation = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Name is Required";
    if (!values.email) errors.email = "Email is Required!";

    if (!values.accountType) errors.accountType = "Please Select Account Type!";
    if (!values.permission) errors.permission = "Please Select a permission!";

    if (photoLoading) errors.photoLoading = "Photo is uploading, Please Wait!";

    return errors;
  };



  useEffect(() => {
    //getAllUsers();
    //getPermissions();
    GetActivePrograms()
  }, []);



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
  const GetActivePrograms = async()=>{
    setLoading(true);
    const response = await GetAllActivePrograms(user?.userId);
    let dept = []
    response?.map((e)=>{
      dept.push({
        label: e?.name,
        value: e?.programId
      })
    })
    setAllDept(dept);
    setLoading(false);
  }

  const uploadPhoto = async (files) => {
    if (files[0]) {
      setPhotoLoading(true);
      let formData = new FormData();
      formData.append("file", files[0]);
      formData.append("name", "Photo");
      formData.append("active", true);

      //const response = await UploadFile(formData);

      // console.log(response);

      // if (response?.status) {
      //   setPhoto(response.data?.fileName);
      // }
      setPhotoLoading(false);
    }
  };
  return (
    <MainWrapper>
      <AdminSideBar title="Create Student" breadcrumb={breadcrumbs}>
        <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
          <>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Student ID"
                placeholder="Student id"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Name"
                placeholder="name"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Email"
                placeholder="email"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Contact No"
                placeholder="contact no or phone no"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="CGPA"
                placeholder="cgpa"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <SelectField
                required
                label="Select Department"
                placeholder="Select Department"
                value={accountType}
                onChange={(data) => setAccountType(data)}
                errorMessage={formError?.accountType}
                selectOptions={allDept}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <TextAreaField
                required
                id="name"
                label="Address"
                placeholder="addressl"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
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
            </div>
          </>
          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Submit Your Application"
            onClick={handleSubmit}
            type="submit"
          />
        </div>
      </AdminSideBar>
    </MainWrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
  };
}

export default connect(mapStateToProps)(CreateStudent);
