import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { MainWrapper, Sidebar } from "../Components";
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

function DashBoard({ user }) {
  console.log("Shakil");
  console.log(user);

  return (
    <MainWrapper>
      <Sidebar title="Dashboard" breadcrumb={breadcrumbs}></Sidebar>
    </MainWrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
  };
}

export default connect(mapStateToProps)(DashBoard);
