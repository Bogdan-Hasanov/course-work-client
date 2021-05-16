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

const login = (props: any) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loginFailed, setLoginFailed] = useState(false);

  const error = <p>Login or password is invalid</p>;
  const loginButtonHandler = (event: any) => {
    axios
      .post('/Auth/Login', { username: username, password: password })
      .then(r => {
        props.setLoggedInState(true);
        props.setToken(r.data);
        setLoginFailed(false);
      })
      .catch(reason => setLoginFailed(true));
  };

  const registerButtonHandler = (event: any) => {
    axios
      .post('/Auth/Register', { username: username, password: password, email: username + 'gmail.com' })
      .then(r => console.log(r))
      .catch(reason => setLoginFailed(true));
  };
  console.log(props);
  return (
    <div className="LoginWrapper">
      {props.loggedIn ? (
        <p>Hi {username}</p>
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
      {loginFailed ? error : null}
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
