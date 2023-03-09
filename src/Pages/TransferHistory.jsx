import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import {
  ButtonWithLoading,
  ComponentLoader,
  MainWrapper,
  NotFound,
  Sidebar,
  TableComponent,
} from "../Components";
import {
  GetAllUser,
  GetAllRequest,
  GetTransferHistory,
  TranferHistoryReport,
  TransferRequestsPdf,
} from "../Services/allService";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import { GrFormView } from "react-icons/gr";
import axios from "axios";
import config from "../Services/api/config";

const breadcrumbs = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 1,
    name: "Transer History",
    url: "/transfer-history",
  },
];

function TransferHistory({ user, na }) {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [allRequest, setAllRequest] = useState([]);

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
          data?.amount.toLocaleString("en-US", {
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
            <Link to={`/view-history/${data._id}`} key="hdb2ugu">
              <button className="p-1 text-xs font-bold text-white bg-blue-600 rounded hover:bg-blue-500">
                <GrFormView />
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
    const res = await GetTransferHistory(id);
    if (res.status) {
      setAllRequest(res.data.submitReq);
    }
    setPageLoading(false);
  };

  const historyReport = async () => {
    let data = {
      user: id,
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
  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <MainWrapper>
      <Sidebar title="Tranfer History" breadcrumb={breadcrumbs}>
        <ButtonWithLoading
          loading={loading}
          className="p-2 mt-8 text-sm font-bold text-white bg-primary hover:bg-green-700 rounded"
          title="Download Transfer History"
          onClick={historyReport}
        />
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
                    <NotFound title="No History Found" />
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

export default connect(mapStateToProps)(TransferHistory);
