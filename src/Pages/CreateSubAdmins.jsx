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
  CreateSubAdmin,
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
    name: "SubAdmins",
    url: "/sub-admins",
  },
  {
    id: 1,
    name: "Create Sub-Admins",
    url: "/create-sub-admins",
  },
];

const accountTypes = [
  {
    label: "Sub-Admin",
    value: "subadmin",
  },
  {
    label: "Custom User",
    value: "custom",
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

function CreateSubAdmins({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [formError, setFormError] = useState({});
  const [photoLoading, setPhotoLoading] = useState(false);

  //Permission List
  const [permissionList, setPermissionList] = useState("");
  const [permission, setPermission] = useState("");

  const formValiDation = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Name is Required";
    if (!values.email) errors.email = "Email is Required!";
    if (!values.permission) errors.permission = "Please Select a permission!";

    if (photoLoading) errors.photoLoading = "Photo is uploading, Please Wait!";

    return errors;
  };
  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    const response = await GetPermissionListByType("sub-admin");
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

  const handleSubmit = async (e) => {
    let FormData = {
      name,
      email,
      password,
      permission: permission?.value,
      //personal data
      photo,
    };
    console.log("form data", FormData);
    setFormError(formValiDation(FormData));
    if (Object.keys(formValiDation(FormData)).length > 0) {
      return;
    }
    setLoading(true);
    const response = await CreateSubAdmin(FormData);
    console.log(response);
    const { data, message, status } = response;
    if (status) {
      toast("Sub-Admins Created!", {
        type: "success",
      });
      setLoading(false);
      navigate(`/sub-admins`);
    } else {
      toast(message, {
        type: "error",
      });
      setLoading(false);
    }
  };
  return (
    <MainWrapper>
      <Sidebar title="Create Sub-Admins" breadcrumb={breadcrumbs}>
        <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
          <>
            <div className="flex items-center justify-between py-2 border-b-2">
              <span className="font-bold capitalize">Sub-Admins</span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
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
                label="Permission Group"
                placeholder="Select Permission Group"
                value={permission}
                onChange={(data) => setPermission(data)}
                errorMessage={formError?.permission}
                selectOptions={permissionList}
              />
            </div>
          </>

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
          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Create Sub-Admin"
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
    subadmins: state.mainReducers.main.subadmins,
  };
}

export default connect(mapStateToProps)(CreateSubAdmins);
