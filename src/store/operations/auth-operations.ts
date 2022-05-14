import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginUserAndSetToken } from '../actions/Actions';
import { Credentials } from '../../Models/Credentials';

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
    const result = await axios.post('Auth/Register', { ...credential, email: credential.username + '@gmail.com' });
    dispatch(loginUserAndSetToken(result.data.token, true));
  } catch (error) {
    return error;
  }
};
