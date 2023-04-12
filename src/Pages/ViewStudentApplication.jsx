import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
// import { PaperClipIcon } from "@heroicons/react/20/solid";
import {
  ButtonWithLoading,
  FileUploadField,
  InputField,
  MainWrapper,
  SelectField,
  Sidebar,
  AdminSideBar,
  TextAreaField,
  ComponentLoader,
  ConfirmDeleteModal,
  TableComponent,
} from "../Components";

import { Link, useParams } from "react-router-dom";
import { GetApplicationDetailsById } from "../Services/allService";
import moment from "moment";
import { toast } from "react-toastify";
import { countries } from "../Assets/_mocks/CountryList";

const breadcrumbs = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 1,
    name: "View Application",
    url: "#",
  },
  {
    id: 1,
    name: "View Details",
    url: "#",
  },
];

const statusList = [
  {
    label: "Approve",
    value: "approve",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Reject",
    value: "reject",
  },
];

function ViewStudentApplication({ user }) {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [showRejectMessage, setShowRejectMessage] = useState(false);
  const [name, setName] = useState(null);
  let [requestStatus, setRequestStatus] = useState("");
  let [rejectMessage, setRejectMessage] = useState("");
  let [appDetails, setAppDetials] = useState({});

  useEffect(() => {}, []);

  const { id } = useParams();
  console.log("test", id);

  const getApplicationDetails = async () => {
    setPageLoading(true);
    const response = await GetApplicationDetailsById(user?.userId);
    console.log(response);

    setAppDetials(response?.data)
    setPageLoading(false);
  };

  useEffect(() => {
    getApplicationDetails();
  }, []);
  console.log("user========",user)
  return (
    <MainWrapper>
      <Sidebar title="View Application" breadcrumb={breadcrumbs}>
        {pageLoading ? (
          <ComponentLoader height="300px" />
        ) : (
          <>
            <div className="flex flex-col md:flex-row w-full space-x-4">
              <div className="flex flex-col w-full  px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
                <div className="flex items-center justify-between py-2 mb-4 border-b-2">
                  <span className="font-bold capitalize">View Application Details of {appDetails?.name?.toUpperCase()}</span>
                </div>
                <dl>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Personal Information
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Name:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.name}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              ID:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.studentId}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              FB URL:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.fbURL}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Applied For
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Post:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.postName}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Wing:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {
                                appDetails?.wingName
                              }
                            </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Application Details
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                            Past Experience:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.pastExperience}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                            How You Serve IITS:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.serveDescription}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>

                  

                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Other Information
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul
                        role="list"
                        className="divide-y divide-gray-200 rounded-md border border-gray-200"
                      >
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Reason:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.reason}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Strength:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.strength}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Weekness:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.weakness}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                  {appDetails?.reSubmit && (
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Re-Submit Information
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ul
                          role="list"
                          className="divide-y divide-gray-200 rounded-md border border-gray-200"
                        >
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <span className="ml-2 w-0 flex-1 truncate">
                                Status:
                              </span>
                              <span className="ml-2 w-0 flex-1 truncate">
                                {appDetails?.reSubmit ? "RESUBMITTED" : ""}
                              </span>
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <span className="ml-2 w-0 flex-1 truncate">
                                Resubmitted at:
                              </span>
                              <span className="ml-2 w-0 flex-1 truncate">
                                {moment(appDetails?.reSubmittedAt).format(
                                  "MMM DD YYYY h:mm A"
                                )}
                              </span>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          </>
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

export default connect(mapStateToProps)(ViewStudentApplication);
