import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import { MainWrapper, Sidebar, ComponentLoader, ButtonWithLoading } from "../Components";
import { IoIosCheckmarkCircle } from "react-icons/io";
import {
  GetAllCandidateList,
  CreateVote
} from "../Services/allService";
import { toast } from "react-toastify";

const breadcrumbs = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 1,
    name: "Votting Pannel",
    url: "/dashboard",
  },
];

function AllVotingPannel({ user }) {
  const [allCandidateList, setAllCandidateList] = useState([]);
  const [eventManager, setEventManager] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  console.log(user);

  const getAllCandidateList = async () => {
    setPageLoading(true);
    const response = await GetAllCandidateList(user?.userId);
    setAllCandidateList(response?.data);
    setPageLoading(false);
  };

  useEffect(() => {
    getAllCandidateList();
  }, []);
  const submitVote = async (e) => {
    const confirmed = window.confirm(`Are you want to submit the vote? \nIf voted! You can not vote for ${e?.wingName} Wing- ${e?.postName} Position`);
    if (confirmed) {
      const response = await CreateVote({
        applicationId: e?.applicationId,
        userId: user?.userId
      });
      if (response?.status) {
        getAllCandidateList();
        toast(`Successfully Voted For ${e?.name}`, {
          type: "success",
        });
      } else {
        toast("Failed", {
          type: "error",
        });
      }
    }
  }
  console.log("submitVote")
  return (
    <MainWrapper>
      <Sidebar title="Voting Pannel" breadcrumb={breadcrumbs}>
        {pageLoading ? (
          <ComponentLoader height="300px" />
        ) : (
          <div key={allCandidateList}>
            {

              allCandidateList?.map((e, i) => (
                <div key={i}>
                  <div class="bg-gray-100 mt-10">
                    <h1 class="font-bold text-2xl mb-3 ml-5 mt-3 ">Vote For {e?.wingName} Wing</h1>
                  </div>
                  {/* <hr className="h-px bg-pink-200 border-0"/> */}
                  <hr />
                  {
                    e?.postList?.map((f, i) => (
                      <>
                        
                          <div class="bg-gray-100 my-5" key={i}>
                            <h1 class="font-bold text-lg mb-3 text-center border bg-gray-200 py-2 hover:bg-gray-400 hover:text-white">{f?.postName}</h1>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {
                              f?.applicants?.map((e, j) => (
                                <div class="bg-gray-100" key={j}>
                                  <div class="w-60 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                                    <img class="h-40 object-cover w-full rounded-xl" src={`https://images.unsplash.com/photo-1681671408340-118a341a6297?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=399&q=80`} alt="" />
                                    <div class="p-2">
                                      <h2 class="font-bold text-lg mb-2 ">{e?.name}</h2>
                                      <h3>{e?.studentId}</h3>
                                      <h3>{e?.wingName}-{e?.postName}</h3>
                                    </div>
                                    
                                    <ButtonWithLoading
                                      loading={false}
                                      className={f?.isVote == "Vote" ? `w-full p-2 mt-6 text-lg font-bold text-white bg-blue-500 hover:bg-blue-900 rounded` : `w-full p-2 mt-6 text-lg font-bold text-white bg-black hover:bg-white-900 rounded`}
                                      title={f?.isVote == "Vote" ? "VOTE" : "VOTED"}
                                      onClick={() => submitVote(e)}
                                      type="submit"
                                      disabled={f?.isVote == "Vote" ? false : true}
                                    />
                                  </div>
                                </div>
                              ))
                            }
                          </div>

                        

                      </>
                    ))
                  }
                </div>
              ))
            }
          </div>
        )}
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
