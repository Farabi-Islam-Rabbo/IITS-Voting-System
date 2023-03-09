import types from "./types";

const setUser = (user) => ({
  type: types.USER,
  status: "success",
  payload: {
    user,
  },
});

const setSubAdmins = (subadmins) => ({
  type: types.SUBADMINS,
  status: "success",
  payload: {
    subadmins,
  },
});

export default {
  setUser,
  setSubAdmins,
};
