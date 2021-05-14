import { ADD, DECREMENT, INCREMENT, SUBTRACT, STORE_RESULT, DELETE_RESULT, SET_TOKEN, LOGIN } from './actionTypes';
import { bool } from 'yup';

export const increment = () => {
  return {
    type: INCREMENT,
  };
};

export const decrement = () => {
  return {
    type: DECREMENT,
  };
};

export const add = (val: any) => {
  return {
    type: ADD,
    payload: val,
  };
};

export const subtract = (val: any) => {
  return {
    type: SUBTRACT,
    payload: val,
  };
};

export const saveResult = (val: any) => {
  return {
    type: STORE_RESULT,
    result: val,
  };
};

export const storeResult = (val: any) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(saveResult(val));
    }, 2000);
  };
};

export const deleteResult = (val: any) => {
  return {
    type: DELETE_RESULT,
    resultElId: val,
  };
};

export const setToken = (token: string) => {
  return {
    type: SET_TOKEN,
    token: token,
  };
};

export const setLoggedIn = (loggedIn: boolean) => {
  return {
    type: LOGIN,
    loggedIn: loggedIn,
  };
};
