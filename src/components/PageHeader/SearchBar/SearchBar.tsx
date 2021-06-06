import './SearchBar.scss';
import React, { SyntheticEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { setSearchTerm } from '../../../store/actions/Actions';
import { Alert } from '@material-ui/lab';
import { Snackbar, SnackbarCloseReason } from '@material-ui/core';

const searchBar = (props: any) => {
  const regExp = /[a-zA-Z]/g;

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const validateSearchTerm = (term: string): void => {
    if (term.length < 2) {
      setOpen(true);
      setErrorMessage('Too short search term');
      return;
    }
    if (!regExp.test(term)) {
      setOpen(true);
      setErrorMessage('The term must contain letters');
      return;
    }
    props.setSearchTerm(term);
  };
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      validateSearchTerm((event.target as HTMLInputElement).value);
    }
  };
  const snackBarCloseHandler = (event: SyntheticEvent<any, Event>, reason: SnackbarCloseReason): void => {
    if (reason === 'clickaway') {
      return;
    }
    setErrorMessage('');
    setOpen(false);
  };
  const alertCloseHandler = (): void => {
    setErrorMessage('');
  };
  return (
    <div className="SearchBar">
      <TextField
        placeholder="Search"
        onKeyPress={onKeyUp}
        inputProps={{ 'aria-label': 'description', style: { fontSize: 40 } }} // font size of input text
        InputLabelProps={{ style: { fontSize: 40 } }} // font size of input label
      />
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={snackBarCloseHandler}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={alertCloseHandler} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
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
