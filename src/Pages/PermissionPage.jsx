import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MainWrapper,
  Sidebar,
  ComponentLoader,
  TableComponent,
} from "../Components";
import { DeletePermission, GetPermissionList } from "../Services/allService";
import { FaTrash } from "react-icons/fa";

const breadcrumbs = [
  {
    id: 1,
    name: "Dashboard",
    url: "/dashboard",
  },
  {
    id: 1,
    name: "Permission",
    url: "/permission",
  },
];

export default function PermissionPage() {
  const [pageLoading, setPageLoading] = useState(true);
  const [permissionList, setPermissionList] = useState([]);
  const [permissionData, setPermissionData] = useState(null);

  const AccessTableHeader = React.useMemo(
    () => [
      {
        Header: "Title",
        accessor: (permissionList) => permissionList?.title,
        type: "text",
      },
      {
        Header: "Permission Type",
        accessor: (permissionList) => permissionList?.permissionType,
        type: "text",
      },

      {
        Header: "AccessList",
        accessor: (data) => {
          let test = [];
          for (var key in data?.accessList) {
            if (data?.accessList[key]) {
              test.push(key);
            }
          }

          return (
            <div className="flex justify-end w-full space-x-1">
              {test.map((item) => (
                <span
                  className={`text-center text-xs w-auto px-4 leading-5 font-bold rounded-full bg-blue-100 text-blue-800`}
                >
                  {item}
                </span>
              ))}
            </div>
          );
        },

        type: "text",
      },

      {
        Header: "Action",
        accessor: (data) => (
          <div className="flex justify-end w-full space-x-1">
            <Link to={`/permission/update/${data._id}`}>
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
              onClick={() => deletePermission(data._id)}
              className="p-1 text-xs font-bold text-white bg-blue-600 rounded hover:bg-blue-500"
            >
              <FaTrash />
            </button>
          </div>
        ),
        align: "right",
        justify: "justify-end",
      },
    ],
    []
  );

  const getPermissionList = async () => {
    setPageLoading(true);
    const response = await GetPermissionList();
    console.log(response);

    if (response.status) {
      setPermissionList(response.data.permissionList);
      setPageLoading(false);
    } else {
      setPermissionList([]);
      setPageLoading(false);
    }
  };

  const deletePermission = async (id) => {
    const response = await DeletePermission(id);
    if (response.status) {
      alert("Data Deleted Successfully!");
      getPermissionList();
    } else {
      alert(response.msg);
    }
  };
  useEffect(() => {
    getPermissionList();
  }, []);
  return (
    <>
      <MainWrapper>
        <Sidebar
          title="Permission Page"
          breadcrumb={breadcrumbs}
          buttonHref={"/permission/create"}
          buttonTitle="Create Permission"
        >
          {pageLoading ? (
            <ComponentLoader height="300px" />
          ) : (
            <div>
              <div className="py-4 flex justify-center">
                <div className="w-full">
                  <div>
                    {permissionList && permissionList.length > 0 ? (
                      <TableComponent
                        columns={AccessTableHeader}
                        data={permissionList}
                        pagination
                      />
                    ) : (
                      <p>No Data Found</p>
                      // <NotFound title="No Users Found" />
                    )}
                  </div>
                </div>
                {/* <ConfirmDeleteModal
                open={openDelete}
                handleClose={toggleDelete}
                id={categoryToDelete?._id}
                title={`Do You Want to Delete ${categoryToDelete?.title}?`}
                subtitle={"Data will not be recovered!"}
                handleDelete={handleDelete}
                loading={loadingDelete}
              /> */}
              </div>
            </div>
          )}
          {/* <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
            <div className="flex items-center justify-between py-2 mb-4 border-b-2">
              <span className="font-bold capitalize">Permission Details</span>
            </div>
          </div> */}
        </Sidebar>
      </MainWrapper>
    </>
  );
}
