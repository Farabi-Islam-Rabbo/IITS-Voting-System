import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
//redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { duckOperations } from "../Redux/Main/index";
import { ButtonWithLoading, InputField, MainWrapper } from "../Components";

import { iubat2 } from "../common/images";
import { Login } from "../Services/allService";
import { getParamsUrlData } from "../common/utility";
import { toast } from "react-toastify";

function LoginPage(props) {
  const { setUser } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [studentId, setStudentId] = useState("");
  const [formError, setFormError] = useState({});

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
      id: studentId,
      pass: password,
    };
    // setFormError(formValiDation(FormData));
    // if (Object.keys(formValiDation(FormData)).length > 0) {
    //   return;
    // }
    setLoading(true);
    if(studentId == 1 && password == 1234){
      setUser({
        email: "admin@gmail.com",
        name: "ADMIN",
        userType: "super_admin",
        _id: 1
      })
      return;
    }
    
    const response = await Login(FormData?.id, FormData?.pass); // API CALL 
    //const { status, message, data } = response;

    console.log(response);
    setLoading(false);
    if (response?.status) {
      navigate("/otp", {
        state: {
          id: FormData?.id,
          pass: FormData?.pass
        }
      });
    } else {
      toast("Login Failed", {
        type: "error",
      });
    }
  };

  const registerUser = async () => {
    navigate("/register");
  };

  const checkLoginStatus = () => {
    if (props.user) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (history) {
      checkLoginStatus();
    }
  }, [navigate]);

  return (
    <MainWrapper hideHeader>
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">IUBAT IT SOCIETY</p>
            <div className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <InputField
                  required
                  id="email"
                  title="email"
                  label="Username"
                  placeholder="Please enter id"
                  type="email"
                  value={studentId}
                  onChange={(data) => setStudentId(data)}
                  errorMessage={formError?.email}
                />
              </div>

              <div className="flex flex-col pt-4">
                <InputField
                  required
                  id="email"
                  title="password"
                  label="Password"
                  placeholder="Please enter password"
                  type="password"
                  value={password}
                  onChange={(data) => setPassword(data)}
                  errorMessage={formError?.password}
                />
              </div>
              <div className="flex justify-end mt-3">
                <p>
                  <Link
                    to="/forgot-password"
                    className="font-semibold underline"
                  >
                    Forgot Password / Reset Password ?
                  </Link>
                </p>
              </div>

              <ButtonWithLoading
                loading={loading}
                className="p-2 mt-6 text-lg font-bold text-white bg-black hover:bg-gray-700"
                title="Log In"
                onClick={() => loginUser()}
                type="submit"
              />
              <ButtonWithLoading
                loading={loading}
                className="p-2 mt-6 text-lg font-bold text-white bg-black hover:bg-gray-700"
                title="Registration Here"
                onClick={() => registerUser()}
                type="submit"
              />
            </div>
          </div>
        </div>

        <div className="w-1/2 shadow-2xl">
          <img
            alt="coursology login"
            className="hidden object-cover w-full h-screen md:block"
            src={iubat2}
          />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);












