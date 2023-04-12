import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
//redux
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { duckOperations } from "../Redux/Main/index";
import { ButtonWithLoading, InputField, MainWrapper } from "../Components";

import { iubat2 } from "../common/images";
import { VerifyOtp, GetAllActiveCommittee } from "../Services/allService";
import { getParamsUrlData } from "../common/utility";
import { toast } from "react-toastify";

function OtpPage(props) {
  const { setUser } = props;
  const navigate = useNavigate();
  const locData = useLocation();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(null);
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
      userId: locData?.state?.id,
      password: locData?.state?.pass,
      otp: Number(otp)
    };
    // setFormError(formValiDation(FormData));
    // if (Object.keys(formValiDation(FormData)).length > 0) {
    //   return;
    // }
    setLoading(true);
    let res = await GetAllActiveCommittee()
    const response = await VerifyOtp(FormData);
    const { status, token } = response;

    console.log(response);
    setLoading(false);
    if(status){
      localStorage.setItem("token",token)
      const user = jwtDecode(token)
      console.log("token decode====", user)
      setUser({
        name: user?.UserId,
        userType: user?.UserType,
        userId: user?.Id,
        _id: locData?.state?.id,
        currentCommitteeId: res[0].committeeId
      })
    }
    // if (response?.statusCode===200) {
    //   navigate("/dashboard");
    // } else {
    //   toast("Verification Failed", {
    //     type: "error",
    //   });
    //   navigate("/login");
    // }
  };

  const registerUser = async () => {
    navigate("/register");
  };

  const checkLoginStatus = () => {
    if (props.user && props?.user?._id) {
      if(user?.userType == 'super_admin'){
        navigate("/admin-dashboard");
      }
      if(user?.userType == 'subadmin'){
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    console.log("adfadf", locData)
    if (history) {
      checkLoginStatus();
    }
  }, [navigate]);

  return (
    <MainWrapper hideHeader>
      <div className="flex flex-wrap w-full">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">OTP VERIFICATION</p>
            <div className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <InputField
                  required
                  id="otp"
                  title="otp"
                  label="Enter Your Otp"
                  placeholder="Please enter your six digit otp"
                  type="number"
                  value={otp}
                  onChange={(data) => setOtp(data)}
                  errorMessage={formError?.email}
                />
              </div>

              

              <ButtonWithLoading
                loading={loading}
                className="p-2 mt-6 text-lg font-bold text-white bg-black hover:bg-gray-700"
                title="Log In"
                onClick={() => loginUser()}
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


//         <div className="flex w-full h-screen">
//           <div className="w-full flex items-center justify-center">
//             <div className='  px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
//                 <h1 className='text-5xl font-semibold'>IUBAT</h1>
//                 <p className='font-medium text-lg text-gray-500 mt-4'>Welcome to IUBAT IT Society</p>
//                 <div className='mt-8'>
//                     <div className='flex flex-col'>
//                         <label className='text-lg font-medium'>Email</label>
//                         <input 
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
//                             placeholder="Enter your email"/>
//                     </div>
//                     <div className='flex flex-col mt-4'>
//                         <label className='text-lg font-medium'>Password</label>
//                         <input 
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
//                             placeholder="Enter your email"
//                             type={"password"}
//                         />
//                     </div>
//                     <div className='mt-8 flex justify-between items-center'>
//                         {/* <div>
//                             <input  type="checkbox" id='remember'/>
//                             <label className='ml-2 font-medium text-base' for="remember">Remember for 30 days</label>
//                         </div> */}
//                         <button className='font-medium text-base text-violet-500'>Forgot password</button>
//                     </div>
//                     <div className='mt-8 flex flex-col gap-y-4'>
//                         <button 
//                             onClick={formValiDation}
//                             className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 bg-gray-700 rounded-xl text-white font-bold text-lg'>Sign in</button>
//                         <button 
//                             className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 '>
//                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                     <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
//                                     <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
//                                     <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
//                                     <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
//                                 </svg>
//                                 Sign in with Google
//                         </button>
//                     </div>
//                     <div className='mt-8 flex justify-center items-center'>
//                         <p className='font-medium text-base'>Don't have an account?</p>
//                         <button 
//                             onClick={() => setAuthState('register')}
//                             className='ml-2 font-medium text-base text-violet-500'>Sign up</button>
//                     </div>
//                 </div>
//             </div>
//           </div>
//           <div className="hidden relative items-center justify-center bg-gray-200">
//             <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin"/> 
//             <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
//           </div>
//         </div>
);
}







// function LoginPage({
//   setAuthState,
//   setUser
// }) {

//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');


  // const handleLogin = () => {
  //     if(email !== null && password !== null) {
  //         signInWithEmailAndPassword(auth, email, password)
  //         .then(() => {
  //             setUser(email)
  //             setAuthState('home')
  //         })
  //         .catch((err) => alert(err));
  //     }
  // }

// return (
//   <div className="flex w-full h-screen">
//     <div className="w-full flex items-center justify-center lg:w-1/2">
//     <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
//           <h1 className='text-5xl font-semibold'>Welcome Back</h1>
//           <p className='font-medium text-lg text-gray-500 mt-4'>Welcome back! Please enter you details.</p>
//           <div className='mt-8'>
//               <div className='flex flex-col'>
//                   <label className='text-lg font-medium'>Email</label>
//                   <input 
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
//                       placeholder="Enter your email"/>
//               </div>
//               <div className='flex flex-col mt-4'>
//                   <label className='text-lg font-medium'>Password</label>
//                   <input 
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
//                       placeholder="Enter your email"
//                       type={"password"}
//                   />
//               </div>
//               <div className='mt-8 flex justify-between items-center'>
//                   <div>
//                       <input  type="checkbox" id='remember'/>
//                       <label className='ml-2 font-medium text-base' for="remember">Remember for 30 days</label>
//                   </div>
//                   <button className='font-medium text-base text-violet-500'>Forgot password</button>
//               </div>
//               <div className='mt-8 flex flex-col gap-y-4'>
//                   <button 
//                       onClick={handleLogin}
//                       className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Sign in</button>
//                   <button 
//                       className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4  rounded-xl text-gray-700 font-semibold text-lg border-2 border-gray-100 '>
//                           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                               <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
//                               <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
//                               <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
//                               <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
//                           </svg>
//                           Sign in with Google
//                   </button>
//               </div>
//               <div className='mt-8 flex justify-center items-center'>
//                   <p className='font-medium text-base'>Don't have an account?</p>
//                   <button 
//                       onClick={() => setAuthState('register')}
//                       className='ml-2 font-medium text-base text-violet-500'>Sign up</button>
//               </div>
//           </div>
//       </div>
//     </div>
//     <div className="hidden relative w-1/2 h-full lg:flex items-center justify-center bg-gray-200">
//       <div className="w-60 h-60 rounded-full bg-gradient-to-tr from-violet-500 to-pink-500 animate-spin"/> 
//       <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg" />
//     </div>
//   </div>
// );
// }

function mapStateToProps(state, props) {
  return {
    userType: state.mainReducers.main.userType,
    user: state.mainReducers.main.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OtpPage);
