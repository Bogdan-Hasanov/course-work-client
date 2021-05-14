import './Login.scss';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  deleteResult,
  storeResult,
  increment,
  decrement,
  add,
  subtract,
  setLoggedIn,
  setToken,
} from '../../../store/actions/Actions';

const login = (props: any) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const loginButtonHandler = (event: any) => {
    console.log(password, username);
    axios
      .post('/Auth/Login', { username: username, password: password })
      .then(r => {
        props.setLoggedInState(true);
        props.setToken(r.data);
        console.log(r);
      })
      .catch(reason => console.log(reason));
  };

  const registerButtonHandler = (event: any) => {
    axios
      .post('/Auth/Register', { username: username, password: password, email: username + 'gmail.com' })
      .then(r => console.log(r))
      .catch(reason => console.log(reason));
  };
  console.log(props);
  return (
    <div className="Login">
      {props.loggedIn ? (
        <p>You are logged in</p>
      ) : (
        <div>
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
      )}
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

// export default login;
