import './SearchBar.scss';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import {
  add,
  decrement,
  deleteResult,
  setLoggedIn,
  setSearchTerm,
  setToken,
  storeResult,
  subtract,
} from '../../../store/actions/Actions';

const searchBar = (props: any) => {
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.setSearchTerm((event.target as HTMLInputElement).value);
    }
  };
  return (
    <div className="SearchBar">
      <TextField
        placeholder="Search"
        onKeyPress={onKeyUp}
        inputProps={{ 'aria-label': 'description', style: { fontSize: 40 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 40 } }} // font size of input label
      />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    searchTerm: state.searchTerm,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSearchTerm: (searchTerm: string) => dispatch(setSearchTerm(searchTerm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(searchBar);
