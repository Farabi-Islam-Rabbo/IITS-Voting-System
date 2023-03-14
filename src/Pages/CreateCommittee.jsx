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
import { useNavigate } from "react-router-dom";
import {
  CreateNewCommittee,
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


function CreateCommittee({ user }) {
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
  const [applicationStart, setApplicationStart] = useState(null);
  const [applicationEnd, setApplicationEnd] = useState(null);
  const [voteStart, setVoteStart] = useState(null);
  const [voteEnd, setVoteEnd] = useState(null);
  const [paymentStart, setPaymentStart] = useState(null);
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
  }, []);

  

  const handleSubmit = async (e) => {
    let FormData = {
      committeeName: name,
      applicationStartDate : applicationStart,
      applicationEndDate: applicationEnd,
      votingStartDate: voteStart,
      votingEndDate: voteEnd,
      paymentEndDate: paymentStart
    };
    console.log("data", FormData)
    // setFormError(formValiDation(FormData));
    // if (Object.keys(formValiDation(FormData)).length > 0) {
    //   return;
    // }
    setLoading(true);
    const response = await CreateNewCommittee(FormData);
    setLoading(false);
    toast("Committee Updated!", {
      type: "success",
    });
    navigate(`/committee`);
  };
  return (
    <MainWrapper>
      <AdminSideBar title="Create Committee" breadcrumb={breadcrumbs}>
        <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
          <>
            <div className="flex items-center justify-between py-2 border-b-2">
              <span className="font-bold capitalize">
                Committee Basic Information
              </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Committee Title"
                placeholder="new committee title"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
            <InputField
                  required
                  id="dateOfBirth"
                  label="Application Start Date"
                  placeholder="application start date"
                  type="date"
                  value={applicationStart}
                  onChange={(data) => setApplicationStart(data)}
                  errorMessage={formError?.dateOfBirth}
                />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
            <InputField
                  required
                  id="dateOfBirth"
                  label="Application End Date"
                  placeholder="application End date"
                  type="date"
                  value={applicationEnd}
                  onChange={(data) => setApplicationEnd(data)}
                  errorMessage={formError?.dateOfBirth}
                />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
            <InputField
                  required
                  id="dateOfBirth"
                  label="Voting Start Date"
                  placeholder="voting start date"
                  type="date"
                  value={voteStart}
                  onChange={(data) => setVoteStart(data)}
                  errorMessage={formError?.dateOfBirth}
                />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
            <InputField
                  required
                  id="dateOfBirth"
                  label="Voting End Date"
                  placeholder="Voting end date"
                  type="date"
                  value={voteEnd}
                  onChange={(data) => setVoteEnd(data)}
                  errorMessage={formError?.dateOfBirth}
                />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
            <InputField
                  required
                  id="dateOfBirth"
                  label="Payment Start Date"
                  placeholder="Payment start date"
                  type="date"
                  value={paymentStart}
                  onChange={(data) => setPaymentStart(data)}
                  errorMessage={formError?.dateOfBirth}
                />
            </div>
          </>
          

          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Create Committee"
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

export default connect(mapStateToProps)(CreateCommittee);
