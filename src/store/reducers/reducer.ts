import * as Actions from '../actions/actionTypes';

export interface AppStore {
  results: any[];
  loggedIn: boolean;
  token: null;
  searchTerm: string;
}

const initialState: AppStore = {
  results: [],
  loggedIn: false,
  token: null,
  searchTerm: 'fall',
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
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
    case Actions.LOGIN_USER_AND_SET_TOKEN: {
      return {
        ...state,
        loggedIn: action.loggedIn,
        token: action.token,
      };
    }
    // case Actions.SET_LOGIN: {
    //   return {
    //     ...state,
    //     loggedIn: action.loggedIn,
    //   };
    // }
    // case Actions.SET_TOKEN: {
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${action.token}`;
    //   return {
    //     ...state,
    //     token: action.token,
    //   };
    // }
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
