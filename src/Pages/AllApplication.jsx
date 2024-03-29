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
  CreatePayemnt,
  RenewLicence,
  UsersReport,
  GetAllApplication
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

function AllApplication({ user, na }) {
  const [loading, setLoading] = useState(false);
  const [licenceUpdateLoading, setLicenceUpdateLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [allApplication, setAllApplication] = useState([]);
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
        Header: "Id",
        accessor: (data) => data?.studentId,
        type: "text",
      },
      {
        Header: "Name",
        accessor: (data) => data?.name,
        type: "text",
      },
      {
        Header: "Wing",
        accessor: (data) => data?.wingName,
        type: "text",
      },
      {
        Header: "Post",
        accessor: (data) => data?.postName,
        type: "text",
      },
      {
        Header: "CGPA",
        accessor: (data) => data?.cgpa,
        type: "text",
      },
      {
        Header: "Action",
        accessor: (data) => (
          <div className="flex justify-end w-full space-x-1">
            <Link
              to={`/view-application/${data?.applicationId}`}
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
            {
              data?.isPaid ?
                <button
                  //onClick={() => toggleDelete(data)}
                  className="p-1 rounded text-sm font-bold text-white bg-green-600 hover:bg-red-500"
                >
                  PAID
                </button> :
                <button
                  onClick={() => toggleDelete(data)}
                  className="p-1 rounded text-sm font-bold text-white bg-red-600 hover:bg-red-500"
                >
                  UNPAID
                </button>
            }

          </div>
        ),
        align: "right",
        justify: "justify-end",
      },
    ],
    []
  );

  const toggleDelete = async(data) => {
    const confirmed = window.confirm(`${data?.name} is applying for ${data?.wingName} Wing - ${data?.postName} \nAre you sure you want to pay for this application?`);
    if (confirmed) {
      const response = await CreatePayemnt({
        applicationId: data?.applicationId,
        isPaid: true,
        userId: data?.userId
      });
      if(response?.status){
        getAllApplication();
        toast(`Payment Successfull for ${data?.name}`, {
          type: "success",
        });
      }else{
        toast("Failed", {
          type: "error",
        });
      }
      
    }
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

  const getAllApplication = async () => {
    setPageLoading(true);
    const response = await GetAllApplication();

    console.log(response);

    if (response?.status) {
      setAllApplication(response?.data);
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
    getAllApplication();
  }, []);

  return (
    <MainWrapper>
      <AdminSideBar
        title="Application"
        breadcrumb={breadcrumbs}
        buttonHref={"/application"}
        buttonTitle="Start Application"
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
                  {allApplication && allApplication?.length > 0 ? (
                    <TableComponent
                      columns={AccessTableHeader}
                      data={allApplication}
                      pagination
                    />
                  ) : (
                    <NotFound title="No Applications Found" />
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

export default connect(mapStateToProps)(AllApplication);
