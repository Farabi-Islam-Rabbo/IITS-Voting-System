import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ButtonWithLoading,
  InputField,
  MainWrapper,
  SelectField,
  Sidebar,
} from "../Components";
import { CreatePermission } from "../Services/allService";

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
    url: "/permission/create-permission",
  },
];

const UserTypeList = [
  { value: "user", label: "User" },
  { value: "sub-admin", label: "Sub-Admin" },
  { value: "custom", label: "Custom" },
];

export default function CreatePermissionPage() {
  const navigate = useNavigate();
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

  const handlerSubmit = async () => {
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
        profileManagement: profileManagement,
      },
    };
    console.log("form data", FormData);
    setLoading(true);
    const response = await CreatePermission(FormData);
    const { status, message, data } = response;
    console.log(response);
    setLoading(false);
    if (status) {
      toast("Permission Created!", {
        type: "success",
      });
      navigate(`/permission`);
      setTitle("");
      setType("");
      setRequestCreation(false);
      setApproalFormDown(false);
      setVerification(false);
      setUsersManagement(false);
      setTransferRequest(false);
      setBillingInfo(false);
      setPermissionCreation(false);
      setSubAdminCreation(false);
      setCustomsCreation(false);
      setProfileManagement(false);
    } else {
      alert(message);
    }
  };

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
            <span className="font-bold capitalize">Create Permission</span>
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
                    />
                  </div>
                  <span className="select-none">Permission Management</span>
                </label>

                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() => setSubAdminCreation(!subAdminCreation)}
                      value={subAdminCreation}
                    />
                  </div>
                  <span className="select-none">Sub Admins Management</span>
                </label>

                <label className="flex mt-2 custom-label">
                  <div className="flex items-center w-6 h-6 p-1 bg-white">
                    <input
                      type="checkbox"
                      className="bg-none mt-1"
                      onChange={() => setCustomsCreation(!customsCreation)}
                      value={customsCreation}
                    />
                  </div>
                  <span className="select-none">Customs Management</span>
                </label>
              </>
            )}
          </div>
          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Create Permission"
            onClick={() => handlerSubmit()}
            type="submit"
          />
        </div>
      </Sidebar>
    </MainWrapper>
  );
}
