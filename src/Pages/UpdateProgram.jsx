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
  AdminSideBar,
} from "../Components";
import { useNavigate, useParams } from "react-router-dom";
import {
  CreateUser,
  GetAllUser,
  GetPermissionList,
  UpdatePrograms,
  GetProgramDetailsById,
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
    name: "Update Program",
    url: "/update-program",
  },
  {
    id: 1,
    name: "Update Program",
    url: "/update-program",
  },
];

const statusList = [
  {
    label: "Active",
    value: "true",
  },
  {
    label: "Inactive",
    value: "false",
  },
];



function UpdateProgram({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [nominee, setNominee] = useState(null);
  const [status, setStatus] = useState({
    label: "Active",
    value: "true",
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


  const [permissionList, setPermissionList] = useState("");
  const [permission, setPermission] = useState("");
  const { id } = useParams();



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
    getProgramDetailsById(id)
  }, []);

  const getProgramDetailsById = async (pId) => {
    setLoading(true);
    const response = await GetProgramDetailsById(pId);
    console.log("res", response);
    setName(response?.name)
    setStatus(statusList.find((x) => x.value == response?.isActive?.toString()))
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    let FormData = {
      name,
      createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      isActive: status?.value == "true" ? true : false
    };
    // setFormError(formValiDation(FormData));
    // if (Object.keys(formValiDation(FormData)).length > 0) {
    //   return;
    // }
    
    setLoading(true);
    const response = await UpdatePrograms(id,FormData);
    
    setLoading(false);
    toast("Program Updated!", {
      type: "success",
    });
    navigate(`/program`);
    // const { data, message, status } = response;
    // if (status) {
     
    //   setLoading(false);
    //   navigate(`/users`);
    // } else {
    //   toast(message, {
    //     type: "error",
    //   });
    //   setLoading(false);
    // }
  };
  return (
    <MainWrapper>
      <AdminSideBar title="Update Program" breadcrumb={breadcrumbs}>
        <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
          <>
            <div className="flex items-center justify-between py-2 border-b-2">
              <span className="font-bold capitalize">
                Program Basic Information
              </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Program Title"
                placeholder="program title"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <SelectField
                required
                label="Status"
                placeholder="Select status"
                value={status}
                onChange={(data) => setStatus(data)}
                errorMessage={formError?.accountType}
                selectOptions={statusList}
              />
            </div>

          </>


          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Update Program"
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

export default connect(mapStateToProps)(UpdateProgram);
