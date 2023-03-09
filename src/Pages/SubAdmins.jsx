import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import {
  ComponentLoader,
  ConfirmDeleteModal,
  MainWrapper,
  NotFound,
  Sidebar,
  TableComponent,
} from "../Components";
import { DeleteUser, GetAllUser } from "../Services/allService";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const breadcrumbs = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 1,
    name: "Sub Admins",
    url: "/sub-admins",
  },
];

function SubAdmins({ user, na }) {
  const [pageLoading, setPageLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

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
        Header: "User Type",
        accessor: (data) => {
          return (
            <div className="flex text-center">
              <span
                className={`text-center capitalize text-xs w-auto px-4 leading-5 font-bold rounded-full`}
              >
                {data?.userType}
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
              to={`/update-sub-admin/${data?._id}`}
              // onClick={() => toggleUpdate(data)}
              className="p-1 text-xs font-bold text-white bg-blue-600 rounded hover:bg-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 h-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </Link>
            <button
              onClick={() => toggleDelete(data)}
              className="p-1 rounded text-xs font-bold text-white bg-red-600 hover:bg-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
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
      userType: "sub-admin",
    });

    console.log(response);

    if (response.status) {
      setUsers(response.data.users);
    }

    setPageLoading(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <MainWrapper>
      <Sidebar
        title="Sub-Admins"
        breadcrumb={breadcrumbs}
        buttonHref={"/create-sub-admins"}
        buttonTitle="Create Sub-admin"
      >
        {pageLoading ? (
          <ComponentLoader height="300px" />
        ) : (
          <div>
            <div className="py-4 flex justify-center">
              <div className="w-full">
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
      </Sidebar>
    </MainWrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    subadmins: state.mainReducers.main.subadmins,
  };
}

export default connect(mapStateToProps)(SubAdmins);
