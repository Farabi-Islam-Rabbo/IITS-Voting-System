import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ButtonWithLoading,
  InputField,
  MainWrapper,
  Sidebar,
} from "../Components";
import { UpdatePassword } from "../Services/allService";

const breadcrumbs = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 1,
    name: "Update Password",
    url: "/update-password",
  },
];


function UpdatePasswordPage({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [reNewPassword, setReNewPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);

  const [formError, setFormError] = useState({});

  console.log(user);
  const handlerSubmit = async () => {
    if (newPassword !== reNewPassword) {
      toast("password does not match", {
        type: "error",
      });
    }

    let FormData = {
      email: user?.email,
      oldPassword,
      password: newPassword,
    };
    console.log("form data", FormData);
    setLoading(true);
    const response = await UpdatePassword(FormData);
    const { status, message, data } = response;
    console.log(response);
    setLoading(false);
    if (status) {
      toast("Password Updated!", {
        type: "success",
      });
      //navigate(`/permission`);
      setEmail(null);
      setNewPassword(null);
      setOldPassword(null);
      setReNewPassword(null);
    } else {
      toast(message, {
        type: "error",
      });
    }
  };

  return (
    <MainWrapper>
      <Sidebar title="Update Password Form" breadcrumb={breadcrumbs}>
        <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto max-w-3xl">
          <div className="flex items-center justify-between py-2 mb-4 border-b-2">
            <span className="font-bold capitalize">Update Password</span>
          </div>
          {/* <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-3">
            <InputField
              required
              id="title"
              label="Email"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(data) => setEmail(data)}
              errorMessage={formError?.title}
            />
          </div> */}
          <InputField
            required
            id="title"
            label="Old Password"
            placeholder="Old Password"
            type="password"
            value={oldPassword}
            onChange={(data) => setOldPassword(data)}
            errorMessage={formError?.title}
          />

          <InputField
            required
            id="title"
            label="New Password"
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(data) => setNewPassword(data)}
            errorMessage={formError?.title}
          />
          <InputField
            required
            id="title"
            label="Re-type New Password"
            placeholder="Re-type New Password"
            type="password"
            value={reNewPassword}
            onChange={(data) => setReNewPassword(data)}
            errorMessage={formError?.title}
          />

          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Update"
            onClick={() => handlerSubmit()}
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

export default connect(mapStateToProps)(UpdatePasswordPage);
