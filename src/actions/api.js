import * as actionTypes from "./actionTypes";

export const apiStart = label => ({
  type: actionTypes.API_START,
  payload: label
});

export const apiEnd = label => ({
  type: actionTypes.API_END,
  payload: label
});

export const accessDenied = url => ({
  type: actionTypes.ACCESS_DENIED,
  payload: {
    url
  }
});

export const apiError = error => ({
  type: actionTypes.API_ERROR,
  error
});
