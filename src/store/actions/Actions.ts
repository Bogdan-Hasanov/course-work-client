import { STORE_RESULT, DELETE_RESULT, SET_SEARCH_TERM, LOGIN_USER_AND_SET_TOKEN, SET_USER_INFO } from './actionTypes';
import { UserInfo } from '../../Models/UserInfo';

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

export const loginUserAndSetToken = (token: string, loggedIn: boolean) => {
  return {
    type: LOGIN_USER_AND_SET_TOKEN,
    token: token,
    loggedIn: loggedIn,
  };
};

export const setSearchTerm = (searchTerm: string) => {
  return {
    type: SET_SEARCH_TERM,
    searchTerm: searchTerm,
  };
};

export const setUserInfo = (userInfo: UserInfo) => {
  return {
    type: SET_USER_INFO,
    userInfo: userInfo,
  };
};
