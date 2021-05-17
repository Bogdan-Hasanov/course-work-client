import './Login.scss';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  deleteResult,
  storeResult,
  decrement,
  add,
  subtract,
  setLoggedIn,
  setToken,
} from '../../../store/actions/Actions';
import { UserInfo } from '../../../Models/UserInfo';

const login = (props: any) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const [messageWasShown, setMessageWasShown] = React.useState(true);

  const error = 'Login or password is invalid';
  const register = 'Registration was successful';
  const loginButtonHandler = (event: any) => {
    return axios
      .post('/Auth/Login', { username: username, password: password })
      .then(r => {
        props.setLoggedInState(true);
        props.setToken(r.data.token);
        setLoginFailed(false);
        setRegisterSuccessful(false);
      })
      .catch(reason => setLoginFailed(true))
      .finally(() => {
        setMessageWasShown(false);
      });
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      loginButtonHandler(null).then(() => console.log('logged in'));
    }
  };

  const handleAlert = (message: string) => {
    if (!messageWasShown) {
      alert(message);
      setMessageWasShown(true);
    }
  };

  const registerButtonHandler = (event: any) => {
    axios.post('/Auth/Register', { username: username, password: password, email: username + 'gmail.com' }).then(r => {
      setLoginFailed(false);
      setRegisterSuccessful(true);
      loginButtonHandler(null)
        .then(() => {
          axios
            .put('/User', { userId: username + 'gmail.com', movieMarks: {} } as UserInfo)
            .then(r => console.log('r: ', r));
        })
        .catch(reason => setLoginFailed(true));
      setMessageWasShown(false);
    });
  };
  return (
    <div className="LoginWrapper">
      {props.loggedIn ? (
        <p>Logged in as {username}</p>
      ) : (
        <div className="Login">
          <div className="Login__inputs">
            <TextField
              id="standard-basic"
              size="small"
              label="Username"
              value={username}
              onChange={event => {
                setUsername(event.target.value);
              }}
            />
            <TextField
              id="standard-basic"
              label="Password"
              size="small"
              type="password"
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
              onKeyUp={onKeyUp}
            />
          </div>
          <div className="Login__buttons">
            <Button
              style={{ lineHeight: '20px' }}
              variant="contained"
              color="primary"
              size="small"
              value="Login"
              onClick={loginButtonHandler}
            >
              Login
            </Button>
            <Button
              style={{ lineHeight: '20px' }}
              variant="contained"
              color="primary"
              size="small"
              value="Login"
              onClick={registerButtonHandler}
            >
              Register
            </Button>
          </div>
        </div>
      )}
      {loginFailed ? handleAlert(error) : null}
      {registerSuccessful ? handleAlert(register) : null}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    token: state.token,
    loggedIn: state.loggedIn,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setLoggedInState: (isLoggedIn: boolean) => dispatch(setLoggedIn(isLoggedIn)),
    setToken: (token: string) => dispatch(setToken(token)),
    onDecrementCounter: () => dispatch(decrement()),
    onAdd: (val: any) => dispatch(add(val)),
    onSub: (val: any) => dispatch(subtract(val)),
    onStoreResult: (result: any) => dispatch(storeResult(result)),
    onDeleteResult: (id: any) => dispatch(deleteResult(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(login);
