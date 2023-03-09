import { combineReducers } from "redux";
import types from "./types";

let dataState = {
  user: null,
  subadmins: null,
};

const main = (state = dataState, action) => {
  switch (action.type) {
    case types.USER:
      return Object.assign({}, state, { user: action.payload.user });
    case types.SUBADMINS:
      return Object.assign({}, state, { subadmins: action.payload.subadmins });
    default:
      return state;
  }
};

const reducers = combineReducers({
  main,
});

export default reducers;
