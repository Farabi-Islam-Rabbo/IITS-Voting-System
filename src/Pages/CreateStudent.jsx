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
  CreateNewStudent,
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
  const [studentId, setStudentId] = useState(null);
  const [email, setEmail] = useState(null);
  const [cgpa, setCgpa] = useState(null);
  const [activeStatus, setActiveStatus] = useState(null);
  const [nominee, setNominee] = useState(null);
  const [program, setProgram] = useState({
    label: "BCSE",
    value: "191aa7ab-825c-435d-a01e-174c0d4d6f1d",
  });
  const [fullName, setFullName] = useState(null);
  const [imageObj, setImageObj] = useState({});
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
    let formData = new FormData();
    formData.append("StudentId", studentId);
    formData.append("Name", name);
    formData.append("CGPA", cgpa);
    formData.append("ProgramId", program?.value);
    formData.append("Address", address);
    formData.append("Email", email);
    formData.append("ContactNo", contactNumber);
    formData.append("CreatedBy", "7BF438AC-4330-435B-B490-37B577BA8EE7");
    formData.append("Picture", imageObj[0]);
    setLoading(true);
    const response = await CreateNewStudent(formData);
    if (response) {
      toast("Student Created!", {
        type: "success",
      });
      setLoading(false);
      navigate(`/student`);
    } else {
      toast("Failed", {
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
      setImageObj(files)
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
                type="number"
                value={studentId}
                onChange={(data) => setStudentId(data)}
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
                type="email"
                value={email}
                onChange={(data) => setEmail(data)}
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
                value={contactNumber}
                onChange={(data) => setContactNumber(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="CGPA"
                placeholder="cgpa"
                type="number"
                value={cgpa}
                onChange={(data) => setCgpa(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <SelectField
                required
                label="Select Department"
                placeholder="Select Department"
                value={program}
                onChange={(data) => setProgram(data)}
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
                value={address}
                onChange={(data) => setAddress(data)}
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
