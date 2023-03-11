import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
//redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { duckOperations } from "../Redux/Main/index";
import { ButtonWithLoading, InputField, MainWrapper,SelectField } from "../Components";
import { iubat2 } from "../common/images";
import { AdminLogin } from "../Services/allService";
import { getParamsUrlData } from "../common/utility";
import { toast } from "react-toastify";

function RegistrationPage(props) {
  const { setUser } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [accountType, setAccountType] = useState({
    label: "Business",
    value: "business",
  });

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
      setUser(user);
      console.log("redirect====", redirect.redirect)
      if (redirect.redirect) {
        navigate(`/${redirect.redirect}`);
      } else {
      console.log("user====",user);

        if(user?.userType == 'super_admin'){
          console.log("from admin")
          navigate("/admin-dashboard");
        }
        if(user?.userType == 'sub-admin'){
          navigate("/dashboard");
        }
      }
    } else {
      toast(message, {
        type: "error",
      });
    }
  };

  const checkRegistrationStatus = () => {
    if (props.user && props?.user?._id) {
      if(user?.userType == 'super_admin'){
        navigate("/admin-dashboard");
      }
      if(user?.userType == 'subadmin'){
        navigate("/dashboard");
      }
    }
  };

  // useEffect(() => {
  //   if (history) {
  //     //checkLoginStatus();
  //   }
  // }, [navigate]);

  // const accountTypes = [
  //   {
  //     label: "Cultural Wing",
  //     value: "cultural wing",
  //   },
  //   {
  //     label: "Event Wing",
  //     value: "event wing",
  //   },
  // ];

  return (
    <MainWrapper hideHeader>
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col w-full">
          <div className="container mx-auto">

            <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
               <p className="text-3xl text-center">Registration Form</p>
              <div className="flex flex-col pt-3 md:pt-8">
              
            
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="id"
                label="ID"
                placeholder="id"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />
            </div>
            
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <span className="mt-5">
                    Name:
                </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <span className="mt-5">
                    CGPA:
                </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <span className="mt-5">
                    Program:
                </span>
            </div>
            
            
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="email"
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
                id="contuct number"
                label="Contact Number"
                placeholder="contact number"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />
            </div>

            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <InputField
                  required
                  id="email"
                  title="password"
                  label="Password"
                  placeholder="Please create a new password"
                  type="password"
                  value={password}
                  onChange={(data) => setPassword(data)}
                  errorMessage={formError?.password}
                />
            </div>
              

              <ButtonWithLoading
                loading={loading}
                className="p-2 mt-6 text-lg font-bold text-white bg-black hover:bg-gray-700 "
                title="Register Here"
                onClick={() => loginUser()}
                type="submit"
              />
            </div>
          </div>
        </div>
        </div>

        {/* <div className="w-1/2 shadow-2xl">
          <img
            alt="coursology login"
            className="hidden object-cover w-full h-screen md:block"
            src={iubat2}
          />
        </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
