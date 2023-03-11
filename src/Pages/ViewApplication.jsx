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
  TextAreaField,
  ComponentLoader,
  ConfirmDeleteModal,
  TableComponent,
} from "../Components";

import { Link, useParams } from "react-router-dom";
import { UpdateReqStatus, GetRequestDetails } from "../Services/allService";
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

function ViewApplication({ user }) {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [showRejectMessage, setShowRejectMessage] = useState(false);
  const [name, setName] = useState(null);
  let [requestStatus, setRequestStatus] = useState("");
  let [rejectMessage, setRejectMessage] = useState("");
  let [reqDetails, setReqDetials] = useState({});

  useEffect(() => {}, []);

  const { id } = useParams();
  console.log("test", id);

  const getRequestDetails = async () => {
    setPageLoading(true);
    const response = await GetRequestDetails(id);

    console.log(response);

    if (response.status) {
      setRequestStatus(
        statusList.find((x) => x.value == response.data.request?.status)
      );
      if (response.data.request?.status == "reject") {
        setRejectMessage(response.data.request?.rejectMessage);
        setShowRejectMessage(true);
      }
      setReqDetials(response.data.request);
    }

    setPageLoading(false);
  };

  useEffect(() => {
    getRequestDetails();
  }, []);
  return (
    <MainWrapper>
      <Sidebar title="View Application" breadcrumb={breadcrumbs}>
        {pageLoading ? (
          <ComponentLoader height="300px" />
        ) : (
          <>
            <div className="flex flex-col md:flex-row w-full space-x-4">
              <div className="flex flex-col w-full md:w-4/5 px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
                <div className="flex items-center justify-between py-2 mb-4 border-b-2">
                  <span className="font-bold capitalize">View Details farabi</span>
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
                              {reqDetails?.sendercompany}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              ID:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {
                                countries.find(
                                  (item) =>
                                    item.value === reqDetails?.sendercountry
                                )?.label
                              }
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              FB URL:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.sendercity}
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
                              {reqDetails?.receivercompany}
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
                                countries.find(
                                  (item) =>
                                    item.value === reqDetails?.receivercountry
                                )?.label
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
                              {reqDetails?.carrier?.carrierName}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                            How You Serve IITS:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.carrier?.carrierPhone}
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
                              <Link
                                to={`/update-user/${reqDetails?.user?._id}`}
                                // onClick={() => toggleUpdate(data)}
                                className="p-1 text-xs font-bold text-white bg-blue-600 rounded hover:bg-blue-500"
                              >
                                {reqDetails?.user?.name}
                              </Link>
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Strength:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.user?.email}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Weekness:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {reqDetails?.user?.accountType.toUpperCase()}
                            </span>
                          </div>
                        </li>
                      </ul>
                    </dd>
                  </div>
                  {reqDetails?.reSubmit && (
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
                                {reqDetails?.reSubmit ? "RESUBMITTED" : ""}
                              </span>
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                              <span className="ml-2 w-0 flex-1 truncate">
                                Resubmitted at:
                              </span>
                              <span className="ml-2 w-0 flex-1 truncate">
                                {moment(reqDetails?.reSubmittedAt).format(
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

export default connect(mapStateToProps)(ViewApplication);
