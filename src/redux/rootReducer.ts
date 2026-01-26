// Libraries
import { combineReducers } from 'redux';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import dashboardReducer from './slices/dashboardSlice';
import commonSlice from './slices/commonSlice';
import userProfileSlice from './slices/userProfileSlice';
import { RESET_STORE } from '@/utils/constants';

const createNoopStorage = () => {
  return {
    getItem(_key: unknown) {
      return Promise.resolve(null);
    },
    setItem(_key: unknown, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem(_key: unknown) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const appReducer = combineReducers({
  dashboardReducer,
  commonSlice,
  userProfile: userProfileSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STORE) {
    // Reset the entire state
    state = undefined;
  }
  return appReducer(state, action);
};

export { rootPersistConfig, rootReducer };
