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
import { AdminLogin, GetAllUnRegisteredStudentId, GetStudentDetailsById, Register } from "../Services/allService";
import { getParamsUrlData } from "../common/utility";
import { toast } from "react-toastify";

function RegistrationPage(props) {
  const { setUser } = props;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [studentId,setStudentId] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [studentDetails, setStudentDetails] = useState({});
  const [allStudentId, setAllStudentId] = useState([]);
  const [accountType, setAccountType] = useState({
    label: "Business",
    value: "business",
  });

  const formValiDation = (values) => {
    const errors = {};
    let emailValidator =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!values?.email?.match(emailValidator))
      errors.email = "Invalid email address !";

    if (!values?.password) errors.password = "Password must be 8 digit long! !";
    if (!values?.phoneNumber) errors.phoneNumber = "Provide Phone Number! !";
    if (!values?.id) errors.phoneNumber = "Please select Id! !";

    return errors;
  };

  useEffect(()=> {
    getAllUnregisteredStudentId()
  },[])

  const getAllUnregisteredStudentId = async() => {
    const response = await GetAllUnRegisteredStudentId();
    const tempId = [];

    response?.map((e=>{
      tempId.push({
        label: e,
        value: e
      })
    }))
    tempId?.length > 0 ? setAllStudentId(tempId) : setAllStudentId([])
  }

  const idHandler = async(data) => {
    if(data?.label?.length == 8){
      console.log(true)
      const response = await GetStudentDetailsById(data?.label)
      setPhoneNumber(response?.contactNo)
      setStudentDetails(response)
    }else{

    }
  }

  const loginUser = async () => {
    let FormData = {
      studentInfoId:studentDetails?.id,
      userId: studentId?.value,
      otpContact: phoneNumber,
      password: password,
    };
    // setFormError(formValiDation(FormData));
    // if (Object.keys(formValiDation(FormData)).length > 0) {
    //   return;
    // }
    setLoading(true);
    console.log(FormData)
    const response = await Register(FormData);
    //const { status, message, data } = response;

    console.log(response);
    setLoading(false);
    if (response?.id) {
      toast("Registration Successfull", {
        type: "success",
      });
      navigate("/login");
      
    } else {
      toast("Registration Failed", {
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

  const segmentList = [
    {
      label: "17103162",
      value: "17103162",
    },
    {
      label: "18103149",
      value: "18103149",
    },
    {
      label: "18103370",
      value: "18103370",
    },
    {
      label: "16203001",
      value: "16203001",
    },
    {
      label: "19103162",
      value: "19103162",
    },
  ];

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
              
            
            {/* <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="id"
                label="ID"
                placeholder="id"
                type="text"
                value={studentId}
                onChange={(data) => setStudentId(data)}
                errorMessage={formError?.name}
              />
            </div> */}
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
            <SelectField
                required
                label="Id"
                placeholder="Select Id"
                value={studentId}
                onChange={(data) => {
                  setStudentId(data)
                  idHandler(data)
                }}
                errorMessage={formError?.accountType}
                selectOptions={allStudentId}
              />
              </div>
            
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <span className="mt-5">
                    Name: {studentDetails?.name}
                </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <span className="mt-5">
                    CGPA: {studentDetails?.cgpa}
                </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <span className="mt-5">
                    Email: {studentDetails?.email}
                </span>
            </div>

            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
                <span className="mt-5">
                    Program: {studentDetails?.program}
                </span>
            </div>
            
            
            {/* <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
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
            </div> */}
            
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="contuct number"
                label="Contact Number"
                placeholder="contact number"
                type="text"
                value={phoneNumber}
                onChange={(data) => setPhoneNumber(data)}
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
