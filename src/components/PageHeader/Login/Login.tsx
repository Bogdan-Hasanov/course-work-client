import './Login.scss';
import React, { SyntheticEvent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedIn } from '../../../store/selectors/authSelector';
import { loginUser, registerUser } from '../../../store/operations/auth-operations';
import { Credentials } from '../../../Models/Credentials';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const login = () => {
  const [credential, setCredential] = useState<Credentials>({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const loggedIn = useSelector(getLoggedIn);

  const loginError = 'Login or password is invalid';
  const registerError = 'Registration was successful';

  const loginButtonHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    const dispatchResult = await dispatch(loginUser(credential));
    if (dispatchResult != null) {
      setOpen(true);
      setErrorMessage(loginError);
    }
  };
  const snackBarCloseHandler = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setErrorMessage('');
  };

  const registerButtonHandler = async () => {
    const dispatchResult = await dispatch(registerUser(credential));
    if (dispatchResult != null) {
      setOpen(true);
      setErrorMessage(registerError);
    }
  };
  return (
    <div className="LoginWrapper">
      {loggedIn ? (
        <p>Logged in as {credential.username}</p>
      ) : (
        <form className="Login" onSubmit={loginButtonHandler}>
          <div className="Login__inputs">
            <TextField
              id="standard-basic"
              size="small"
              label="Username"
              value={credential.username}
              onChange={event => {
                setCredential(prevState => ({ ...prevState, username: event.target.value }));
              }}
            />
            <TextField
              id="standard-basic"
              label="Password"
              size="small"
              type="password"
              value={credential.password}
              onChange={event => {
                setCredential(prevState => ({ ...prevState, password: event.target.value }));
              }}
            />
          </div>
          <div className="Login__buttons">
            <Button
              style={{ lineHeight: '20px' }}
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              value="Login"
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
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={snackBarCloseHandler}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              message={errorMessage}
            >
              <Alert onClose={snackBarCloseHandler} severity="error">
                {errorMessage}
              </Alert>
            </Snackbar>
          </div>
        </form>
      )}
    </div>
  );
};
export default login;
