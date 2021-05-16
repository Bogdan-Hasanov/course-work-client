import * as Actions from '../actions/actionTypes';
import axios from 'axios';

const initialState = {
  counter: 0,
  results: [],
  loggedIn: false,
  token: null,
  searchTerm: 'Game',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Actions.INCREMENT: {
      return {
        ...state,
        counter: state.counter + 1,
      };
    }
    case Actions.DECREMENT: {
      return {
        ...state,
        counter: state.counter - 1,
      };
    }
    case Actions.ADD: {
      return {
        ...state,
        counter: state.counter + action.payload,
      };
    }
    case Actions.SUBTRACT: {
      return {
        ...state,
        counter: state.counter - action.payload,
      };
    }
    case Actions.STORE_RESULT: {
      return {
        ...state,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        results: state.results.concat({ id: new Date(), value: action.result }),
      };
    }
    case Actions.DELETE_RESULT: {
      const updatedArray = state.results.filter((value: any) => value.id !== action.resultElId);
      return {
        ...state,
        results: updatedArray,
      };
    }
    case Actions.LOGIN: {
      return {
        ...state,
        loggedIn: action.loggedIn,
      };
    }
    case Actions.SET_TOKEN: {
      axios.defaults.headers.common['Authorization'] = `Bearer ${action.token}`;
      return {
        ...state,
        token: action.token,
      };
    }
    case Actions.SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
