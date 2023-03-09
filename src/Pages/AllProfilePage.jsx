import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import {
  ComponentLoader,
  MainWrapper,
  NotFound,
  Sidebar,
  TableComponent,
  ConfirmDeleteModal
} from "../Components";
import { DeleteProfile, GetAllProfile } from "../Services/allService";
import { useNavigate } from "react-router-dom";
// import ComponentLoader from "../components/Loader/ComponentLoader";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const breadcrumbs = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 1,
    name: "Profile",
    url: "/profile",
  },
];

function AllProfilePage({ user, na }) {
  const [pageLoading, setPageLoading] = useState(true);
  const [allRequest, setAllRequest] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [billToDelete, setBillToDelete] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const AccessTableHeader = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: (data) => data?.title,
        type: "text",
      },

      {
        Header: "Annual Charge",
        accessor: (data) => "$" + data?.annualCharge,
        type: "text",
      },

      {
        Header: "Action",
        accessor: (data) => (
          <div className="flex justify-end w-full space-x-1">
            <Link to={`/update-profile/${data._id}`} key="hdb2ugu">
              <button
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
              </button>
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
    setBillToDelete(data);
    setOpenDelete(!openDelete);
  };

  const handleDelete = async (id) => {
    setLoadingDelete(true);
    const response = await DeleteProfile(id);
    const { data, message, status } = response;
    console.log(response);
    if (status) {
      setAllRequest(allRequest.filter((item) => item._id !== data?._id));
      toggleDelete(null);
      setLoadingDelete(false);
      toast("Profile Deleted!", {
        type: "success",
      });
    } else {
      toast(message, {
        type: "error",
      });
    }
    setLoadingDelete(false);
  };

  const getAllProfiles = async () => {
    setPageLoading(true);
    const res = await GetAllProfile();
    console.log(res);
    if (res.status) {
      setAllRequest(res.data);
    }
    setPageLoading(false);
  };

  useEffect(() => {
    getAllProfiles();
  }, []);

  return (
    <MainWrapper>
      <Sidebar
        title="Profile Page"
        breadcrumb={breadcrumbs}
        buttonHref={"/create-profile"}
        buttonTitle="Create"
      >
        {pageLoading ? (
          <ComponentLoader height="300px" />
        ) : (
          <div>
            <div className="py-4 flex justify-center">
              <div className="w-full">
                <div>
                  {allRequest && allRequest.length > 0 ? (
                    <TableComponent
                      columns={AccessTableHeader}
                      data={allRequest}
                      pagination
                    />
                  ) : (
                    <NotFound title="No Profile Found" />
                  )}
                </div>
              </div>
              <ConfirmDeleteModal
                open={openDelete}
                handleClose={toggleDelete}
                id={billToDelete?._id}
                title={`Do You Want to Delete ${billToDelete?.title}`}
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
    user: state.mainReducers.main.user,
  };
}

export default connect(mapStateToProps)(AllProfilePage);
