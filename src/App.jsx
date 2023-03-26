import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { duckOperations } from "./Redux/Main";
import routes from "./routes";
import setAuthToken from "./Services/setAuthToken";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App({ user, setUser }) {
  useEffect(() => {
    //localStorage.clear();
    //setUser(null);
    const token = localStorage.getItem("token")
    console.log("token", token);
    if (token) {
      const user = jwtDecode(token)
      console.log("token decode====", user)
      setUser({
        name: user?.UserId,
        userType: user?.UserType,
        userId: user?.Id,
        _id: user?.UserId
      })
    }

  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {!user && <Route path="*" element={<Navigate to="/login" replace />} />}
        {user && user?.userType == "Student" && (
          <Route path="/otp" element={<Navigate to="/dashboard" replace />} />
        )}
        {user && user?.userType == "super_admin" && (
          <Route path="/login" element={<Navigate to="/admin-dashboard" replace />} />
        )}
        {routes.map((route, idx) => {
          return (
            route.component && (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                element={<route.component />}
              />
            )
          );
        })}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      {/* <div>LoginPage</div> */}
      <ToastContainer />
    </BrowserRouter>
  );
}

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(duckOperations, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
