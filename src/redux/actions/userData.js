import * as actionTypes from "./actionTypes";
export const setUserDataRedux = (data) => {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypes.setUserDataRedux,
      payload: data,
    });
  };
};
