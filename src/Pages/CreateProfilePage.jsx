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
import { CreateProfile } from "../Services/allService";
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
  {
    id: 1,
    name: "Create Profile",
    url: "/create-profile",
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
function CreateProfilePage({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [annualCharge, setAnnualCharge] = useState(null);
  const [formError, setFormError] = useState({});

  const formValiDation = (values) => {
    const errors = {};
    if (!values.title) errors.amountFrom = "Title is Required";
    if (!values.annualCharge) errors.amountTo = "Annual Charge is Required!";
    return errors;
  };

  const handleSubmit = async (e) => {
    let FormData = {
      title,
      annualCharge
    };
    setFormError(formValiDation(FormData));
    if (Object.keys(formValiDation(FormData)).length > 0) {
      return;
    }
    setLoading(true);
    const response = await CreateProfile(FormData);
    console.log(response);
    const { data, message, status } = response;
    if (status) {
      toast("Profile Created!", {
        type: "success",
      });
      setTimeout(() => {
        navigate(`/profile`);
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
      <Sidebar title="Create Profile" breadcrumb={breadcrumbs}>
        <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
          <>
            <div className="flex items-center justify-between py-2 border-b-2">
              <span className="font-bold capitalize">Profile Information</span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Title"
                placeholder="Profile Title"
                type="text"
                value={title}
                onChange={(data) => setTitle(data)}
                errorMessage={formError?.title}
              />

              <InputField
                required
                id="email"
                label="Annual Charge"
                placeholder="Annual Charge"
                type="number"
                value={annualCharge}
                onChange={(data) => setAnnualCharge(data)}
                errorMessage={formError?.annualCharge}
              />

            </div>
          </>

          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Create Profile"
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

export default connect(mapStateToProps)(CreateProfilePage);
