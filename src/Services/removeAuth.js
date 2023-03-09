import types from "../Redux/Main/types";
import { store } from "../redux/Store/Store";

const removeAuth = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("auth_token");

  store.dispatch({
    type: types.USER,
    status: "error",
    payload: {
      userType: 1,
      user: null,
    },
  });

  window.location.href = "/";
};

export default removeAuth;
