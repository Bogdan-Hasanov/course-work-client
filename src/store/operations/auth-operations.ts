import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginUserAndSetToken, setUserInfo } from '../actions/Actions';
import { Credentials } from '../../Models/Credentials';
import { UserInfo } from '../../Models/UserInfo';

export const loginUser = (credential: Credentials) => async (dispatch: Dispatch<any>) => {
  try {
    const result = await axios.post('/Auth/Login', credential);
    dispatch(loginUserAndSetToken(result.data.token, true));
  } catch (error) {
    return error;
  }
};
export const registerUser = (credential: Credentials) => async (dispatch: Dispatch<any>) => {
  try {
    const result = await axios.post('Auth/Register', { ...credential, email: credential.username + '@tunrahn.com' });
    dispatch(loginUserAndSetToken(result.data.token, true));
  } catch (error) {
    return error;
  }
};

export const fetchUser = () => async (dispatch: Dispatch<any>) => {
  try {
    const axiosResponse = await axios.get<UserInfo>(`/User`);
    dispatch(setUserInfo(axiosResponse.data));
  } catch (error) {
    return console.log(error);
  }
};

export const saveUserInfo = (userInfo: UserInfo) => async (dispatch: Dispatch<any>) => {
  try {
    dispatch(setUserInfo(userInfo));
    await axios.put(`/User`, userInfo);
  } catch (error) {
    return console.log(error);
  }
};
