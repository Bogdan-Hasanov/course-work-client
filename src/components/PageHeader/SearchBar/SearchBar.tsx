import './SearchBar.scss';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../../store/actions/Actions';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';

const searchBar = () => {
  const regExp = /[a-zA-Z]/g;

  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const dispatch = useDispatch();

  const validateSearchTerm = (term: string): void => {
    if (term.length < 2) {
      setOpen(true);
      setErrorMessage('Too short search term');
      return;
    }
    if (!regExp.test(term)) {
      setOpen(true);
      setErrorMessage('The term must contain latin letters');
      return;
    }
    dispatch(setSearchTerm(term));
  };
  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      validateSearchTerm((event.target as HTMLInputElement).value);
    }
  };
  const snackBarCloseHandler = (event?: React.SyntheticEvent | Event, reason?: string): void => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
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
        <Alert onClose={snackBarCloseHandler} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};
export default searchBar;
