import { AppStore } from '../reducers/reducer';
export const getLoggedIn = (state: AppStore) => state.loggedIn;
export const getSearchTerm = (state: AppStore) => state.searchTerm;
