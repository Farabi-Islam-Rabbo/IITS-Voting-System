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
import { GetStudnetDetailsById, GetAllActivePrograms } from "../Services/allService";
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
    name: "View Student",
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

function ViewStudent({ user }) {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [showRejectMessage, setShowRejectMessage] = useState(false);
  const [name, setName] = useState(null);
  let [requestStatus, setRequestStatus] = useState("");
  let [rejectMessage, setRejectMessage] = useState("");
  let [appDetails, setAppDetials] = useState({});
  let [allDept, setAllDept] = useState([]);

  useEffect(() => { }, []);

  const { id } = useParams();
  console.log("test", id);

  const getApplicationDetails = async () => {
    setPageLoading(true);
    const response = await GetStudnetDetailsById(id);
    console.log(response);

    setAppDetials(response)
    setPageLoading(false);
  };

  useEffect(() => {
    getApplicationDetails();
    GetActivePrograms()
  }, []);
  const GetActivePrograms = async () => {
    setLoading(true);
    const response = await GetAllActivePrograms(user?.userId);
    let dept = []
    response?.map((e) => {
      dept.push({
        label: e?.name,
        value: e?.programId
      })
    })
    setAllDept(dept);
    setLoading(false);

  }
  return (
    <MainWrapper>
      <AdminSideBar title="View Student Information" breadcrumb={breadcrumbs}>
        {pageLoading ? (
          <ComponentLoader height="300px" />
        ) : (
          <>
            <div className="flex flex-col md:flex-row w-full space-x-4">
              <div className="flex flex-col w-full  px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
                <div className="flex items-center justify-between py-2 mb-4 border-b-2">
                  <span className="font-bold capitalize">View Student Details of {appDetails?.name?.toUpperCase()}</span>
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
                              Email:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.email}
                            </span>
                          </div>
                        </li>

                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Contact No:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.contactNo}
                            </span>
                          </div>
                        </li>
                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              CGPA:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.cgpa}
                            </span>
                          </div>
                        </li>

                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Program:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {allDept.find((x) => x.value == appDetails?.programId).label}
                            </span>
                          </div>
                        </li>

                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Address:
                            </span>
                            <span className="ml-2 w-0 flex-1 truncate">
                              {appDetails?.address}
                            </span>
                          </div>
                        </li>

                        <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                          <div className="flex w-0 flex-1 items-center">
                            <span className="ml-2 w-0 flex-1 truncate">
                              Registered Status :
                            </span>
                            <span
                              className={`text-center text-xs w-0 flex-1 px-4 leading-5 font-bold rounded-full ${appDetails?.isRegistered
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                }`}
                            >
                              {appDetails?.isRegistered ? "Registered" : "Unregistered"}
                            </span>
                          </div>
                        </li>

                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </>
        )}
      </AdminSideBar>
    </MainWrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
  };
}

export default connect(mapStateToProps)(ViewStudent)