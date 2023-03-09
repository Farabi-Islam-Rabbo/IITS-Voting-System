import actions from "./actions";

const setUser = (user) => {
  return (dispatch) => {
    return dispatch(actions.setUser(user));
  };
};

const setSubAdmins = (subadmins) => {
  return (dispatch) => {
    return dispatch(actions.setSubAdmins(subadmins));
  };
};

export default {
  setUser,
  setSubAdmins,
};
