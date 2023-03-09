import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import {
  ButtonWithLoading,
  ComponentLoader,
  MainWrapper,
  Sidebar,
  TableComponent,
} from "../Components";
import {
  GetAllUser,
  GetAllRequest,
  ApproveRequests,
  DateWiseTran,
  TransferRequestsPdf,
} from "../Services/allService";
import { useNavigate } from "react-router-dom";
// import ComponentLoader from "../components/Loader/ComponentLoader";
// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import config from "../Services/api/config";
import axios from "axios";

const breadcrumbs = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 1,
    name: "Users",
    url: "/users",
  },
];

function RequestPage({ user, na }) {
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [allRequest, setAllRequest] = useState([]);
  const [dateEnable, seDateEnable] = useState(false);

  const [Fromdate, setFromdate] = useState(null);
  const [Todate, setTodate] = useState(null);
  const [status, setStatus] = useState("All");

  const AccessTableHeader = React.useMemo(
    () => [
      {
        Header: "Created At",
        accessor: (data) =>
          moment(data?.createdAt).format("MMM DD YYYY h:mm A"),
        type: "text",
      },
      {
        Header: "Reciever Company",
        accessor: (data) => data?.receivercompany,
        type: "text",
      },
      {
        Header: "Sender Company",
        accessor: (data) => data?.sendercompany,
        type: "text",
      },

      {
        Header: "Amount",
        accessor: (data) =>
          data?.amount?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }),
        type: "text",
      },

      {
        Header: "User",
        accessor: (data) => data?.user?.name,
        type: "text",
      },

      {
        Header: "Status",
        accessor: (data) => {
          return (
            <div className="flex text-center">
              <span
                className={`text-center text-xs w-auto px-4 leading-5 font-bold capitalize rounded-full ${
                  data?.status === "approve"
                    ? "bg-green-100 text-green-800"
                    : data?.status === "reject"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {data?.status}
              </span>
            </div>
          );
        },
        type: "text",
      },

      {
        Header: "ReSubmit",
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
                {data?.reSubmit ? "RESUBMITTED" : ""}
              </span>
            </div>
          );
        },
        type: "text",
      },

      {
        Header: "Resubmitted At",
        accessor: (data) =>
          data?.reSubmit
            ? moment(data?.reSubmittedAt).format("MMM DD YYYY h:mm A")
            : "",
        type: "text",
      },

      {
        Header: "Action",
        accessor: (data) => (
          <div className="flex justify-end w-full space-x-1">
            <Link to={`/view-request/${data._id}`} key="hdb2ugu">
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
          </div>
        ),
        align: "right",
        justify: "justify-end",
      },
    ],
    []
  );

  const getAllUsers = async () => {
    setPageLoading(true);
    const res = await GetAllRequest();
    if (res.status) {
      setAllRequest(res.data.submitReq);
    }
    setPageLoading(false);
  };

  const approveRequests = async () => {
    setLoading(true);
    const res = await ApproveRequests();
    if (res?.status) {
      setLoading(false);
    } else {
      setLoading(false);
      alert("Report Generating Problem!");
    }
  };

  const dateWiseTransaction = async () => {
    let data = {
      Fromdate,
      Todate,
    };
    setLoading(true);
    const response = await DateWiseTran(data);
    if (response?.status) {
      setLoading(false);
      seDateEnable(false);
      axios.get(window.open(config.serverURL + response?.data, "_self"));
      console.log("Pdf Generating");
    } else {
      setLoading(false);
      alert("Problems in generating report");
    }
  };

  const generatePdf = async () => {
    let data = {
      status: status,
      Fromdate: Fromdate,
      Todate: Todate,
    };
    setLoading(true);
    const response = await TransferRequestsPdf(data);
    if (response?.status) {
      setLoading(false);
      axios.get(window.open(config.serverURL + response?.data, "_self"));
    } else {
      alert(response?.message);
    }
  };

  const datePickerEnable = () => {
    seDateEnable(true);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <MainWrapper>
      <Sidebar
        title="Request Page"
        breadcrumb={breadcrumbs}
        buttonHref={"/view-request"}
        buttonTitle="Create Request"
      >
        <div className="flex">
          <div>
            <input
              type="date"
              className="ml-4 p-1"
              onChange={(e) => setFromdate(e.target.value)}
            />
            <span className="ml-4"> To </span>
            <input
              type="date"
              className="ml-4 p-1"
              onChange={(e) => setTodate(e.target.value)}
            />
            <select
              className="p-1 pl-3 pr-3 ml-4 "
              onChange={(e) => setStatus(e.target.value)}
            >
              {/* <option value="0">-Select Status-</option> */}
              <option value="All" selected>
                All
              </option>
              <option value="pending">Pending</option>
              <option value="approve">Approved</option>
              <option value="reject">Rejected</option>
            </select>
            <ButtonWithLoading
              loading={loading}
              className="ml-2 p-2 mt-8 text-sm font-bold text-white bg-primary hover:bg-green-700 rounded"
              title="Generate Report"
              onClick={generatePdf}
            />
          </div>
        </div>

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
                    <NotFound title="No Users Found" />
                  )}
                </div>
              </div>
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

export default connect(mapStateToProps)(RequestPage);
