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
  GetAllPrograms,
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
    name: "Program",
    url: "/program",
  },
];

function AllProgramCreate({ user, na }) {
  const [loading, setLoading] = useState(false);
  const [licenceUpdateLoading, setLicenceUpdateLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [programList, setProgramList] = useState([]);
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
        Header: "Program Title",
        accessor: (data) => data?.name,
        type: "text",
      },
      {
        Header: "Status",
        accessor: (data) => data?.isActive ? "Active" : "Inactive",
        type: "text",
      },
      {
        Header: "Action",
        accessor: (data) => (
          <div className="flex justify-end w-full space-x-1">
            
            <Link
              to={`/update-program/${data?.programId}`}
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

  const getAllProgram = async () => {
    setPageLoading(true);
    const response = await GetAllPrograms();

    console.log("res",response);
    setProgramList(response)
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
    getAllProgram();
  }, []);

  return (
    <MainWrapper>
      <AdminSideBar
        title="All Program"
        breadcrumb={breadcrumbs}
        buttonHref={"/create-program"}
        buttonTitle="Create Program"
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
                  {programList && programList?.length > 0 ? (
                    <TableComponent
                      columns={AccessTableHeader}
                      data={programList}
                      pagination
                    />
                  ) : (
                    <NotFound title="No Programs Found" />
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

export default connect(mapStateToProps)(AllProgramCreate);
