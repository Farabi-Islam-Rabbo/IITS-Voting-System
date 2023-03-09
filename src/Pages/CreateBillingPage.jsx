import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import {
  ButtonWithLoading,
  FileUploadField,
  InputField,
  MainWrapper,
  SelectField,
  Sidebar,
} from "../Components";
import { useNavigate } from "react-router-dom";
import { CreateBilling, GetAllUser, UploadFile } from "../Services/allService";
import { toast } from "react-toastify";

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
    name: "Create User",
    url: "/create-user",
  },
];
const chargeTypes = [
  {
    label: "Flat",
    value: "flat",
  },
  {
    label: "Percentage",
    value: "percentage",
  },
];
function CreateBillingPage({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [amountFrom, setAmountFrom] = useState(null);
  const [amountTo, setAmountTo] = useState(null);
  const [charge, setCharge] = useState(null);
  const [formError, setFormError] = useState({});
  const [chargeType, setChargeType] = useState(chargeTypes.find((x) => x.value == "flat"));
  const formValiDation = (values) => {
    const errors = {};
    if (!values.amountFrom) errors.amountFrom = "Amount From is Required";
    if (!values.amountTo) errors.amountTo = "Amount To is Required!";
    if (!values.charge) errors.charge = "Amount Charge is Required!";
    if (!values.chargeType) errors.chargeType = "Charge Type is Required!";
    return errors;
  };

  const handleSubmit = async (e) => {
    let FormData = {
      amountFrom,
      amountTo,
      charge,
      chargeType: chargeType.value
    };
    setFormError(formValiDation(FormData));
    if (Object.keys(formValiDation(FormData)).length > 0) {
      return;
    }
    setLoading(true);
    const response = await CreateBilling(FormData);
    console.log(response);
    const { data, message, status } = response;
    if (status) {
      toast("Billing Created!", {
        type: "success",
      });
      setTimeout(() => {
        navigate(`/all-billing`);
      }, 1000);
      setLoading(false);
    } else {
      toast(message, {
        type: "error",
      });
      setLoading(false);
    }
  };
  return (
    <MainWrapper>
      <Sidebar title="Create Billing" breadcrumb={breadcrumbs}>
        <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
          <>
            <div className="flex items-center justify-between py-2 border-b-2">
              <span className="font-bold capitalize">Billing Information</span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Amount From"
                placeholder="Amount From"
                type="number"
                value={amountFrom}
                onChange={(data) => setAmountFrom(data)}
                errorMessage={formError?.name}
              />

              <InputField
                required
                id="email"
                label="Amount To"
                placeholder="Amount To"
                type="number"
                value={amountTo}
                onChange={(data) => setAmountTo(data)}
                errorMessage={formError?.email}
              />

              <SelectField
                required
                label="Charge Type"
                placeholder="Select Charge Type"
                value={chargeType}
                onChange={(data) => setChargeType(data)}
                errorMessage={formError?.chargeType}
                selectOptions={chargeTypes}
              />

              <InputField
                required
                id="password"
                label="Charge"
                placeholder="Charge"
                type="number"
                value={charge}
                onChange={(data) => setCharge(data)}
                errorMessage={formError?.password}
              />
            </div>
          </>

          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Create Billing"
            onClick={handleSubmit}
            type="submit"
          />
        </div>
      </Sidebar>
    </MainWrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    user: state.mainReducers.main.user,
  };
}

export default connect(mapStateToProps)(CreateBillingPage);
