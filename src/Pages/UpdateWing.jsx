import React, { useCallback, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import {
  ButtonWithLoading,
  InputField,
  MainWrapper,
  SelectField,
  AdminSideBar,
} from "../Components";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetWingDetailsById,
  UpdateWings
} from "../Services/allService";
import { formateDateYYYYMMDD } from "../common/utility";
import config from "../Services/api/config";
import { Avatar } from "../common/images";
import { toast } from "react-toastify";
import { countries } from "../Assets/_mocks/CountryList";
import CreatableSelectField from "../Components/Common/CreatableSelectField";

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
  {
    id: 1,
    name: "Update User",
    url: "/update-user",
  },
];

const statusList = [
  {
    label: "Active",
    value: "true",
  },
  {
    label: "Inactive",
    value: "false",
  },
];



function UpdateWing({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [status, setStatus] = useState({
    label: "Active",
    value: "true",
  });
  const { id } = useParams();
  const [formError, setFormError] = useState({});

  

  const formValiDation = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Name is Required";
    

    return errors;
  };

  

  useEffect(() => {
    getWingDetailsById(id)
  }, []);

  const getWingDetailsById = async (pId) => {
    setLoading(true);
    const response = await GetWingDetailsById(pId);
    console.log("res", response);
    console.log("status", statusList.find((x) => x.value == response?.isActive?.toString()));
    setName(response?.name)
    setStatus(statusList.find((x) => x.value == response?.isActive?.toString()))
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    let FormData = {
      name,
      createdBy: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      isActive: status?.value == "true" ? true : false
    };
    setFormError(formValiDation(FormData));
    if (Object.keys(formValiDation(FormData)).length > 0) {
      return;
    }
    
    setLoading(true);
    const response = await UpdateWings(id,FormData);
    
    setLoading(false);
    toast("Wing Updated!", {
      type: "success",
    });
    navigate(`/wing`);
   
  };

  return (
    <MainWrapper>
      <AdminSideBar title="Update Wing" breadcrumb={breadcrumbs}>
        <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
          <>
            <div className="flex items-center justify-between py-2 border-b-2">
              <span className="font-bold capitalize">
                Wing Basic Information
              </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Wing Title"
                placeholder="wing title"
                type="text"
                value={name}
                onChange={(data) => setName(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <SelectField
                required
                label="Status"
                placeholder="Select status"
                value={status}
                onChange={(data) => setStatus(data)}
                errorMessage={formError?.accountType}
                selectOptions={statusList}
              />
            </div>
            
          </>
          

          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Update Wing"
            onClick={handleSubmit}
            type="submit"
          />
        </div>
      </AdminSideBar>
    </MainWrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
  };
}

export default connect(mapStateToProps)(UpdateWing);
