import './Header.scss';
import React from 'react';
import PageLogo from './PageLogo/PageLogo';
import Login from './Login/Login';
import SearchBar from './SearchBar/SearchBar';
const appHeader = () => (
  <div className="Header">
    <PageLogo />
    <SearchBar />
    <Login />
  </div>
);

export default appHeader;
