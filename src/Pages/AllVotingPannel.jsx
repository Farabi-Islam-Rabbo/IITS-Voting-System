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
    name: "Voting Pannel",
    url: "/dashboard",
  },
  {
    id: 1,
    name: "voting pannel",
    url: "/dashboard",
  },
];

function AllVotingPannel({ user }) {
  console.log(user);

  return (
    <MainWrapper>
      <Sidebar title="Voting Pannel" breadcrumb={breadcrumbs}>
      <div class="bg-gray-100 w-full min-h-screen gap-2 flex-wrap flex justify-center items-center">

        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="h-40 object-cover rounded-xl" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt=""/>
          <div class="p-2">
          <h2 class="font-bold text-lg mb-2 ">Heading</h2>
          <p class="text-sm text-gray-600">Simple Yet Beautiful Card Design with TaiwlindCss. Subscribe to our Youtube channel for more ...</p>
          </div>
          <div class="m-2">
          <a role='button' href='#' class="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">VOTE</a>
          </div>
        </div>


        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="h-40 object-cover rounded-xl" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt=""/>
          <div class="p-2">
          <h2 class="font-bold text-lg mb-2 ">Heading</h2>
          <p class="text-sm text-gray-600">Simple Yet Beautiful Card Design with TaiwlindCss. Subscribe to our Youtube channel for more ...</p>
          </div>
          <div class="m-2">
          <a role='button' href='#' class="text-white bg-purple-600 px-3 py-1 rounded-md hover:bg-purple-700">VOTE</a>
          </div>
        </div>


        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="h-40 object-cover rounded-xl" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt=""/>
          <div class="p-2">
          <h2 class="font-bold text-lg mb-2 ">Heading</h2>
          <p class="text-sm text-gray-600">Simple Yet Beautiful Card Design with TaiwlindCss. Subscribe to our Youtube channel for more ...</p>
          </div>
          <div class="m-2">
          <a role='button' href='#' class="text-white bg-green-500 px-3 py-1 rounded-md hover:bg-purple-700">VOTE</a>
          </div>
        </div>

            
        <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
          <img class="h-40 object-cover rounded-xl" src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" alt=""/>
          <div class="p-2">
          <h2 class="font-bold text-lg mb-2 ">Heading</h2>
          <p class="text-sm text-gray-600">Simple Yet Beautiful Card Design with TaiwlindCss. Subscribe to our Youtube channel for more ...</p>
          </div>
          <div class="m-2">
          <a role='button' href='#' class="text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-purple-700">VOTE</a>
          </div>
        </div>
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

export default connect(mapStateToProps)(AllVotingPannel);
