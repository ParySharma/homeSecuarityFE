'use client';

// Libraries
import { createContext, useEffect, useReducer, useCallback } from 'react';

import axios, { setLangHeaders, setSession } from '@/utils/axiosInstance';

// Utils
import {
  getAccessToken,
  clearAllLocalStorage,
  setUserMeta,
  setLoginResponse,
  getCompanySettings,
  getUserMeta,
  getRefreshToken,
} from '@/utils/localStorage';

import { NULL, EMPTY_ARRAY, RESET_STORE } from '@/utils/constants';
import { store } from '@/redux/store';

interface InitialState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: any;
  userRole: number | null;
  companySettings: any;
  logoutFlag: boolean;
}

const initialState: InitialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: NULL,
  userRole: NULL,
  companySettings: NULL,
  logoutFlag: false,
};

const handlers: any = {
  INITIALIZE: (state: any, action: any) => ({
    ...state,
    ...action.payload,
    isInitialized: true,
    logoutFlag: false,
  }),

  LOGOUT: (state: any, action: any) => ({
    ...state,
    isAuthenticated: false,
    isInitialized: true,
    user: NULL,
    userRole: NULL,
    logoutFlag: action.payload.logoutFlag,
  }),
};

const reducer = (state: any, action: any) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<any>({
  ...initialState,
  method: 'jwt',
  initialize: async () => {},
  login: async () => {},
  logout: () => {},
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ✅ MEMOIZED INITIALIZE
  const initialize = useCallback(async () => {
    console.log('Auth Initializing...');
    debugger;
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      // const userMeta = getUserMeta();
      // const companySettings = getCompanySettings();
      console.log('accessToken, userMeta', accessToken);

      if (accessToken) {
        console.log('User is authenticated');

        setSession(accessToken, refreshToken);

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            // user: userMeta,
            // userRole: userMeta?.role_id,
            // companySettings,
          },
        });
      } else {
        clearAllLocalStorage();
        setSession(null, null);

        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: NULL,
            userRole: NULL,
            companySettings: EMPTY_ARRAY,
          },
        });
      }
    } catch (error) {
      clearAllLocalStorage();
      setSession(null, null);

      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: NULL,
          userRole: NULL,
          companySettings: NULL,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // ✅ LOGIN
  const login = async (
    mobile: string,
    password: string,
    remember_me: boolean,
    token?: any
  ) => {
    try {
      const payload = token ? { token } : { mobile, password, remember_me };

      const response = await axios.post(
        token ? '/auth/verify-token' : '/auth/login',
        payload
      );
      console.log(response, 'response');

      if (response?.data?.success) {
        const { user_meta, token, refreshToken } = response.data;

        setUserMeta(response.data.data);
        setLoginResponse(response.data.data);
        setSession(token, 'refreshToken');

        // if (user_meta?.preferred_language) {
        //   setLangHeaders();
        // }

        await initialize();
      }

      return response;
    } catch (error) {
      return error;
    }
  };

  // ✅ LOGOUT
  const logout = () => {
    clearAllLocalStorage();
    setSession(null, null);
    store.dispatch({ type: RESET_STORE });

    dispatch({
      type: 'LOGOUT',
      payload: { logoutFlag: true },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        initialize,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
