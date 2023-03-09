import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import {
  ButtonWithLoading,
  ComponentLoader,
  ConfirmDeleteModal,
  MainWrapper,
  NotFound,
  AdminSideBar,
  TableComponent,
} from "../Components";
import {
  DeleteUser,
  GetAllUser,
  RenewLicence,
  UsersReport,
} from "../Services/allService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GrFormView } from "react-icons/gr";
import config from "../Services/api/config";
import axios from "axios";
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
    name: "Application",
    url: "/Application",
  },
];

function AllCreateStudent({ user, na }) {
  const [loading, setLoading] = useState(false);
  const [licenceUpdateLoading, setLicenceUpdateLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [Fromdate, setFromdate] = useState(null);
  const [Todate, setTodate] = useState(null);
  const [accountType, setAccountType] = useState(null);

  const handleRenewLicence = async () => {
    setLicenceUpdateLoading(true);
    const response = await RenewLicence();

    if (response?.status) {
      toast("License Updated!", {
        type: "success",
      });
    } else {
      toast(response?.message, {
        type: "error",
      });
    }
    setLicenceUpdateLoading(false);
  };

  const AccessTableHeader = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: (data) => data?.name,
        type: "text",
      },
      {
        Header: "Email",
        accessor: (data) => data?.email,
        type: "text",
      },
      {
        Header: "Account Type",
        accessor: (data) => {
          return (
            <div className="flex text-center">
              <span
                className={`text-center capitalize text-xs w-auto px-4 leading-5 font-bold rounded-full ${
                  data?.accountType === "personal"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-golden-200 text-green-800"
                }`}
              >
                {data?.accountType}
              </span>
            </div>
          );
        },
        type: "text",
      },
      {
        Header: "Status",
        accessor: (data) => {
          return (
            <div className="flex text-center">
              <span
                className={`text-center text-xs w-auto px-4 leading-5 font-bold rounded-full ${
                  data?.activeStatus
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {data?.activeStatus ? "Active" : "Inactive"}
              </span>
            </div>
          );
        },
        type: "text",
      },

      {
        Header: "Action",
        accessor: (data) => (
          <div className="flex justify-end w-full space-x-1">
            <Link
              to={`/transfer-history/${data?._id}`}
              className="p-1 text-sm font-bold text-white bg-yellow-600 rounded hover:bg-yellow-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </Link>
            <Link
              to={`/update-user/${data?._id}`}
              // onClick={() => toggleUpdate(data)}
              className="p-1 text-sm font-bold text-white bg-blue-600 rounded hover:bg-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </Link>
            <button
              onClick={() => toggleDelete(data)}
              className="p-1 rounded text-sm font-bold text-white bg-red-600 hover:bg-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ),
        align: "right",
        justify: "justify-end",
      },
    ],
    []
  );

  const toggleDelete = (data) => {
    setUserToDelete(data);
    setOpenDelete(!openDelete);
  };

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    const response = await DeleteUser(id);
    const { data, message, status } = response;
    console.log(response);
    if (status) {
      setUsers(users.filter((item) => item._id !== data?._id));
      toggleDelete(null);
      toast("User Deleted!", {
        type: "success",
      });
    } else {
      toast(message, {
        type: "error",
      });
    }
    setLoadingDelete(false);
  };

  const getAllUsers = async () => {
    setPageLoading(true);
    const response = await GetAllUser({
      userType: "user",
    });

    console.log(response);

    if (response.status) {
      setUsers(response.data.users);
    }

    setPageLoading(false);
  };

  const usersReport = async () => {
    let data = {
      accountType: accountType,
      Fromdate: Fromdate,
      Todate: Todate,
    };
    setLoading(true);
    const res = await UsersReport(data);
    if (res?.status) {
      setLoading(false);
      axios.get(window.open(config.serverURL + res?.data, "_self"));
      console.log("Generating pdf");
    } else {
      setLoading(false);
      console.log(res?.message);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <MainWrapper>
      <AdminSideBar
        title="Create Student"
        breadcrumb={breadcrumbs}
        buttonHref={"/create-student"}
        buttonTitle="Create Student"
      >
        
        {pageLoading ? (
          <ComponentLoader height="300px" />
        ) : (
          <div>
            <div className="py-4 flex justify-center">
              <div className="w-full">
                {/* <ButtonWithLoading
                  loading={loading}
                  className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
                  title="Download Report"
                  onClick={usersReport}
                /> */}
                <div>
                  {users && users.length > 0 ? (
                    <TableComponent
                      columns={AccessTableHeader}
                      data={users}
                      pagination
                    />
                  ) : (
                    <NotFound title="No Users Found" />
                  )}
                </div>
              </div>
              <ConfirmDeleteModal
                open={openDelete}
                handleClose={toggleDelete}
                id={userToDelete?._id}
                title={`Do You Want to Delete ${userToDelete?.name}?`}
                subtitle={"Data will not be recovered!"}
                handleDelete={handleDelete}
                loading={loadingDelete}
              />
            </div>
          </div>
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

export default connect(mapStateToProps)(AllCreateStudent);
