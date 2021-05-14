import './Login.scss';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const login = () => (
  <div className="Login">
    <TextField id="username" label="Username" size="small" />
    <TextField id="password" label="Password" size="small" />
    <Button variant="contained" color="primary" size="small">
      Login
    </Button>
  </div>
);

export default login;
