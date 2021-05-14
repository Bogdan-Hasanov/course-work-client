import './Header.scss';
import React from 'react';
import PageLogo from './PageLogo/PageLogo';
import Login from './Login/Login';

const appHeader = () => (
  <div className="Header">
    <PageLogo />
    <Login />
  </div>
);

export default appHeader;
