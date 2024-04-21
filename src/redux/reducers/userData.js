import * as actionTypes from "../actions/actionTypes";

const initalState = {
  userData: undefined,
};

export const userData = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.setUserDataRedux:
      return { userData: action.payload };

    default:
      return state;
  }
};
