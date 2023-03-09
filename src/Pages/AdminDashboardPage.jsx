import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { MainWrapper, Sidebar,AdminSideBar } from "../Components";
import { useNavigate } from "react-router-dom";
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
    name: "Home",
    url: "/dashboard",
  },
];

function AdminDashBoard({ user }) {
  console.log(user);

  return (
    <MainWrapper>
      <AdminSideBar title="Dashboard" breadcrumb={breadcrumbs}></AdminSideBar>
    </MainWrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
  };
}

export default connect(mapStateToProps)(AdminDashBoard);
