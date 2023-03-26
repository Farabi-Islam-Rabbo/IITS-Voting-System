import React, { useCallback, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { useState } from "react";
import {
  ButtonWithLoading,
  CreateUserModal,
  FileUploadField,
  InputField,
  MainWrapper,
  SelectField,
  Sidebar,
  TextAreaField
} from "../Components";
import { useNavigate } from "react-router-dom";
import {
  CreateUser,
  GetAllActiveWing,
  GetPostsByWingId,
  GetPermissionListByType,
  CreateNewApplication,
} from "../Services/allService";
import { formateDateYYYYMMDD } from "../common/utility";
import config from "../Services/api/config";
import { Avatar } from "../common/images";
import { toast } from "react-toastify";
import { countries } from "../Assets/_mocks/CountryList";
import CreatableSelectField from "../Components/Common/CreatableSelectField";

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
    url: "/application",
  },
  {
    id: 1,
    name: "Create Application",
    url: "/create-application",
  },
];

const accountTypes = [
  {
    label: "Cultural Wing",
    value: "cultural wing",
  },
  {
    label: "Event Wing",
    value: "event wing",
  },
];



function CreateApplication({ user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [wing, setWing] = useState([]);
  const [post, setPost] = useState([]);
  const [fbUrl, setFbUrl] = useState("");
  const [currentAsso, setCurrentAsso] = useState("");
  const [assoDetail, setAssoDetail] = useState("");
  const [pastExp, setPastExp] = useState("");
  const [reason, setReason] = useState("");
  const [serveIits, setServeIits] = useState("");
  const [strength, setStrength] = useState("");
  const [weakness, setWeakness] = useState("");
  const [formError, setFormError] = useState({});
  const [accountType, setAccountType] = useState(null);
  const [selectedWing, setSelectedWing] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  


  

  const formValiDation = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Name is Required";
    if (!values.email) errors.email = "Email is Required!";

    if (!values.accountType) errors.accountType = "Please Select Account Type!";
    if (!values.permission) errors.permission = "Please Select a permission!";

    if (photoLoading) errors.photoLoading = "Photo is uploading, Please Wait!";

    return errors;
  };

  

  useEffect(() => {
    getWing()
  }, []);

  const getWing = async () => {
    setLoading(true);
    const response = await GetAllActiveWing();
    const tempId = [];
    response?.map((e=>{
      tempId.push({
        label: e.name,
        value: e.wingId
      })
    }))
    tempId?.length > 0 ? setWing(tempId) : setWing([])
    console.log(response);

    setLoading(false);
  };

  

  const handleSubmit = async (e) => {
    let FormData = {
      committeeId: "7bf438ac-4330-435b-b490-37b577ba8ee7",
      userId: user?.userId,
      postId: selectedPost?.value,
      fbURL: fbUrl,
      pastExperience: pastExp,
      reason,
      serveDescription: serveIits,
      strength,
      weakness,
      isCurrentAssociation: true,
      association: currentAsso
    };
  
    setLoading(true);
    const response = await CreateNewApplication(FormData);
    setLoading(false);
    const { data, message, status } = response;
    if(status){
      toast(message, {
        type: "success",
      });
    }else{
      toast(message, {
        type: "error",
      });
    }
    
  };
  const wingHandler = async(data) => {
    const res = await GetPostsByWingId(data?.value)
    setPost(res)
    setSelectedWing(data)
  }

  console.log("user=====", user)
  return (
    <MainWrapper>
      <Sidebar title="Create Application" breadcrumb={breadcrumbs}>
        <div className="flex flex-col px-4 py-6 pt-3 mt-4 bg-white rounded md:pt-3 mx-auto">
          <>
            <div className="flex items-center justify-between py-2 border-b-2">
              <span className="font-bold capitalize">
               Fillup The Application Form
              </span>
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
            <SelectField
                required
                label="Select Wing"
                placeholder="Select Wing"
                value={selectedWing}
                onChange={(data) => wingHandler(data)}
                errorMessage={formError?.accountType}
                selectOptions={wing}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
            <SelectField
                required
                label="Select Post"
                placeholder="Select Post"
                value={selectedPost}
                onChange={(data) => setSelectedPost(data)}
                errorMessage={formError?.accountType}
                selectOptions={post}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="FB URL"
                placeholder="fb url"
                type="text"
                value={fbUrl}
                onChange={(data) => setFbUrl(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Current Association"
                placeholder="true/false"
                type="text"
                value={currentAsso}
                onChange={(data) => setCurrentAsso(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <TextAreaField
                required
                id="name"
                label="Association Detail"
                placeholder="association detail"
                type="text"
                value={assoDetail}
                onChange={(data) => setAssoDetail(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <InputField
                required
                id="name"
                label="Past Experience"
                placeholder="past experience"
                type="text"
                value={pastExp}
                onChange={(data) => setPastExp(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <TextAreaField
                required
                id="name"
                label="Reason"
                placeholder="why"
                type="text"
                value={reason}
                onChange={(data) => setReason(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <TextAreaField
                required
                id="name"
                label="How You Serve IITS"
                placeholder="Write down how you serve IITS"
                type="text"
                value={serveIits}
                onChange={(data) => setServeIits(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <TextAreaField
                required
                id="name"
                label="Strength"
                placeholder="Write down your strength"
                type="text"
                value={strength}
                onChange={(data) => setStrength(data)}
                errorMessage={formError?.name}
              />
            </div>
            <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-3">
              <TextAreaField
                required
                id="name"
                label="Weakness"
                placeholder="Write down your weakness"
                type="text"
                value={weakness}
                onChange={(data) => setWeakness(data)}
                errorMessage={formError?.name}
              />
            </div>
            
          </>
          

          <ButtonWithLoading
            loading={loading}
            className="p-2 mt-8 text-lg font-bold text-white bg-primary hover:bg-green-700 rounded"
            title="Submit Your Application"
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

export default connect(mapStateToProps)(CreateApplication);
