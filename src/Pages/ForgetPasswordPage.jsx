import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
//redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { duckOperations } from "../Redux/Main/index";
import { ButtonWithLoading, InputField, MainWrapper } from "../Components";

import { LoginBg } from "../common/images";
import { GetOtpByEmail, ResetPassword } from "../Services/allService";
import { getParamsUrlData } from "../common/utility";
import { toast } from "react-toastify";

function ForgetPasswordPage(props) {
  const { setUser } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gotOtp, setGotOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [email, setEmail] = useState(null);
  const [oldPassword, setOldPassword] = useState(null);
  const [reNewPassword, setReNewPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [otp, setOtp] = useState(null);

  const formValiDation = (values) => {
    const errors = {};
    let emailValidator =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values.email.match(emailValidator))
      errors.email = "Invalid email address !";

    if (!values.password) errors.password = "Password must be 8 digit long! !";

    return errors;
  };

  const loginUser = async () => {
    let FormData = {
      email,
      password,
    };
    setFormError(formValiDation(FormData));
    if (Object.keys(formValiDation(FormData)).length > 0) {
      return;
    }
    setLoading(true);
    const response = await AdminLogin(FormData);
    const { status, message, data } = response;

    console.log(response);
    setLoading(false);
    if (status) {
      localStorage.setItem("auth_token", data.token);
      const redirect = getParamsUrlData();
      const user = jwtDecode(data.token);
      console.log(user);
      setUser(user);
      if (redirect.redirect) {
        navigate(`/${redirect.redirect}`);
      } else {
        navigate("/dashboard");
      }
    } else {
      toast(message, {
        type: "error",
      });
    }
  };

  const checkLoginStatus = () => {
    console.log(props.user);
    if (props.user && props?.user?._id) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (history) {
      checkLoginStatus();
    }
  }, [navigate]);

  const handlerOtp = async () => {
    if (!email) {
      toast("Please provide your email", {
        type: "error",
      });
    }
    let FormData = {
      email,
    };
    setLoading(true);
    const response = await GetOtpByEmail(FormData);
    const { status, message, data } = response;
    console.log(response);
    setLoading(false);
    if (status) {
      setGotOtp(true)
      toast(message, {
        type: "success",
      });
    } else {
      setGotOtp(false)
      toast(message, {
        type: "error",
      });
    }
  }
  const handlerSubmit = async () => {
    if (!email) {
      toast("Please provide your email", {
        type: "error",
      });
    }
    if (newPassword !== reNewPassword) {
      toast("password does not match", {
        type: "error",
      });
    }
    let FormData = {
      email,
      otp,
      password: newPassword
    };
    setLoading(true);
    const response = await ResetPassword(FormData);
    const { status, message, data } = response;
    console.log(response);
    setLoading(false);
    if (status) {
      navigate("/login");
      toast(message, {
        type: "success",
      });
    } else {
      setGotOtp(false)
      toast(message, {
        type: "error",
      });
    }
  }

  return (
    <MainWrapper hideHeader>
      <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto md:w-1/2">
        <div className="flex items-center justify-between py-2 mb-4 border-b-2">
          <span className="font-bold capitalize">Update Password</span>
        </div>
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
        {
          gotOtp && (
            <>
              <InputField
                required
                id="title"
                label="OTP"
                placeholder="OTP"
                type="number"
                value={otp}
                onChange={(data) => setOtp(data)}
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
                title="Submit"
                onClick={() => handlerSubmit()}
                type="submit"
              />
            </>
          )
        }

        {
          !gotOtp &&
          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Get OTP"
            onClick={() => handlerOtp()}
            type="submit"
          />
        }

      </div>
    </MainWrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    userType: state.mainReducers.main.userType,
    user: state.mainReducers.main.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPasswordPage);
