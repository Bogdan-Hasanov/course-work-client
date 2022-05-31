import * as Actions from '../actions/actionTypes';
import { UserInfo } from '../../Models/UserInfo';
import { MovieSession } from '../../Models/MovieSession';

export interface AppStore {
  results: any[];
  loggedIn: boolean;
  token: string;
  searchTerm: string;
  userInfo: UserInfo | undefined;
  sessions: MovieSession[];
}

const initialState: AppStore = {
  sessions: [],
  results: [],
  loggedIn: false,
  token: '',
  searchTerm: 'fall',
  userInfo: undefined,
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
    case Actions.SET_USER_INFO: {
      return {
        ...state,
        userInfo: action.userInfo,
      };
    }
    default:
      return { ...state };
  }
};

export default reducer;
