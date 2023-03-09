import Axios from "axios";
import setAuthToken from "../setAuthToken";
import config from "./config";

export const getApi = async (action, url) => {
  try {
    let token = localStorage.getItem("auth_token");
    if (token) {
      setAuthToken(localStorage.getItem("auth_token"));
    }
    let apiUrl = `${config.serverURL}${action}`;
    const response = await Axios.get(apiUrl);

    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const postApi = async (action, data) => {
  try {
    let token = localStorage.getItem("auth_token");
    if (token) {
      setAuthToken(localStorage.getItem("auth_token"));
    }
    let apiUrl = `${config.serverURL}${action}`;
    const response = await Axios.post(apiUrl, data);

    return response?.data;
  } catch (error) {
    return error.response.data;
  }
};

export const putApi = async (action, data) => {
  try {
    setAuthToken(localStorage.getItem("auth_token"));
    const response = await Axios.put(`${config.serverURL}${action}`, data);
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const postFormData = async (action, formData) => {
  try {
    setAuthToken(localStorage.getItem("auth_token"));
    const response = await Axios.post(
      `${config.serverURL}${action}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};
