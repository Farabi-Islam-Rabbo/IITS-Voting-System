import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  ButtonWithLoading,
  InputField,
  MainWrapper,
  SelectField,
  Sidebar,
} from "../Components";
import {
  CreatePermission,
  PermissionGetById,
  UpdatePermission,
} from "../Services/allService";

const breadcrumbs = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 1,
    name: "Permission",
    url: "/permission",
  },
  {
    id: 1,
    name: "Create Permission",
    url: "/permission/update-permission",
  },
];

export default function UpdatePermissionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [permissionType, setType] = useState(null);
  const [requestCreation, setRequestCreation] = useState(false);
  const [approalFormDown, setApproalFormDown] = useState(false);
  const [verification, setVerification] = useState(false);
  const [usersManagement, setUsersManagement] = useState(false);
  const [profileManagement, setProfileManagement] = useState(false);
  const [transferRequest, setTransferRequest] = useState(false);
  const [billingInfo, setBillingInfo] = useState(false);
  const [permissionCreation, setPermissionCreation] = useState(false);
  const [subAdminCreation, setSubAdminCreation] = useState(false);
  const [customsCreation, setCustomsCreation] = useState(false);
  const [formError, setFormError] = useState({});
  const [details, setDetails] = useState([]);

  const UserTypeList = [
    { value: "user", label: "User" },
    { value: "sub-admin", label: "Sub-Admin" },
    { value: "custom", label: "Custom" },
  ];

  const handlerUpdate = async () => {
    let FormData = {
      title,
      permissionType: permissionType?.value,
      accessList: {
        requestCreation,
        approalFormDown,
        verification,
        usersManagement,
        transferRequest,
        permissionManagement: permissionCreation,
        billingInfo,
        subAdminManagement: subAdminCreation,
        customsManagement: customsCreation,
        profileManagement: usersManagement,
      },
    };
    setLoading(true);
    const response = await UpdatePermission(id, FormData);
    const { status, message, data } = response;
    console.log(response);
    setLoading(false);
    if (status) {
      toast("Permission Updated!", {
        type: "success",
      });
      navigate(`/permission`);
    } else {
      alert(message);
    }
  };

  const getPermissionDetails = async (id) => {
    const response = await PermissionGetById(id);
    console.log("response", response);
    if (response.status) {
      // setDetails(response.data.permissionDetails);
      setTitle(response.data.permissionDetails?.title);
      //setType(response.data.permissionDetails?.permissionType);
      setType(
        UserTypeList.find(
          (item) =>
            item.value === response.data.permissionDetails?.permissionType
        )
      );
      //value={UserTypeList.find((item) => item.value === permissionType)}
      console.log(
        "==>",
        response.data.permissionDetails?.accessList?.requestCreation
      );
      setRequestCreation(
        response.data.permissionDetails?.accessList?.requestCreation
      );
      setApproalFormDown(
        response.data.permissionDetails?.accessList?.approalFormDown
      );
      setVerification(
        response.data.permissionDetails?.accessList?.verification
      );
      setUsersManagement(
        response.data.permissionDetails?.accessList?.usersManagement
      );
      setTransferRequest(
        response.data.permissionDetails?.accessList?.transferRequest
      );
      setBillingInfo(response.data.permissionDetails?.accessList?.billingInfo);
      setPermissionCreation(
        response.data.permissionDetails?.accessList?.permissionManagement
      );
      setSubAdminCreation(
        response.data.permissionDetails?.accessList?.subAdminManagement
      );
      setCustomsCreation(
        response.data.permissionDetails?.accessList?.customsManagement
      );
      setProfileManagement(
        response.data.permissionDetails?.accessList?.profileManagement
      );
      // setTransfer(response.data.permissionDetails?.accessList?.requestCreation);
      // setPayment(response.data.permissionDetails?.accessList?.makePayment);
      // setRequest(response.data.permissionDetails?.accessList?.requestModule);
      // setUserModule(response.data.permissionDetails?.accessList?.userModule);
    }

    console.log("response", response);
  };

  useEffect(() => {
    if (id) {
      getPermissionDetails(id);
    }
  }, [id]);

  return (
    <MainWrapper>
      <Sidebar
        title="Create Permission Page"
        breadcrumb={breadcrumbs}
        buttonHref={"/permission"}
        buttonTitle="View All Permission"
      >
        <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
          <div className="flex items-center justify-between py-2 mb-4 border-b-2">
            <span className="font-bold capitalize">Update Permission</span>
          </div>
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3">
            <InputField
              required
              id="title"
              label="Title"
              placeholder="Permission Title"
              type="text"
              value={title}
              onChange={(data) => setTitle(data)}
              errorMessage={formError?.title}
            />

            <SelectField
              required
              label="User type"
              placeholder="Select User type"
              // value={UserTypeList.find((item) => item.value === permissionType)}
              value={permissionType}
              onChange={(data) => setType(data)}
              errorMessage={formError?.permissionType}
              selectOptions={UserTypeList}
            />
            {/* <InputField
              required
              id="type"
              label="Type"
              placeholder="Permission type"
              type="text"
              value={permissionType}
              onChange={(data) => setType(data)}
              errorMessage={formError?.permissionType}
            /> */}
          </div>
          <div className="mt-5">
            <h2 className="underline">Access Details</h2>
          </div>
          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3 mt-6">
            {/* Permission For User */}
            {permissionType?.value === "user" && (
              <>
                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() => setRequestCreation(!requestCreation)}
                      value={requestCreation}
                      checked={requestCreation}
                    />
                  </div>
                  <span className="select-none">Request Creation</span>
                </label>
                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() => setApproalFormDown(!approalFormDown)}
                      value={approalFormDown}
                      checked={approalFormDown}
                    />
                  </div>
                  <span className="select-none">Approval Form download</span>
                </label>
              </>
            )}
            {/* Permission For Custom */}
            {permissionType?.value === "custom" && (
              <>
                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() => setVerification(!verification)}
                      value={verification}
                      checked={verification}
                    />
                  </div>
                  <span className="select-none">Verification</span>
                </label>
              </>
            )}
            {/* Permission For Sub-Admin */}
            {permissionType?.value === "sub-admin" && (
              <>
                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() => setUsersManagement(!usersManagement)}
                      value={usersManagement}
                      checked={usersManagement}
                    />
                  </div>
                  <span className="select-none">Users Management</span>
                </label>
                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() => setProfileManagement(!profileManagement)}
                      value={profileManagement}
                      checked={profileManagement}
                    />
                  </div>
                  <span className="select-none">Profile Management</span>
                </label>

                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() => setTransferRequest(!transferRequest)}
                      value={transferRequest}
                      checked={transferRequest}
                    />
                  </div>
                  <span className="select-none">Transfer Requests</span>
                </label>

                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() => setBillingInfo(!billingInfo)}
                      value={billingInfo}
                      checked={billingInfo}
                    />
                  </div>
                  <span className="select-none">Billing Information</span>
                </label>

                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() =>
                        setPermissionCreation(!permissionCreation)
                      }
                      value={permissionCreation}
                      checked={permissionCreation}
                    />
                  </div>
                  <span className="select-none">Permission Creation</span>
                </label>

                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() => setSubAdminCreation(!subAdminCreation)}
                      value={subAdminCreation}
                      checked={subAdminCreation}
                    />
                  </div>
                  <span className="select-none">Sub Admins Creation</span>
                </label>

                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() => setCustomsCreation(!customsCreation)}
                      value={customsCreation}
                      checked={customsCreation}
                    />
                  </div>
                  <span className="select-none">Customs Creation</span>
                </label>
              </>
            )}
          </div>
          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Update Permission"
            onClick={() => handlerUpdate()}
            type="submit"
          />
        </div>
      </Sidebar>
    </MainWrapper>
  );
}
