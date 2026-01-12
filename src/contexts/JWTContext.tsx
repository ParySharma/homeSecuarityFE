'use client';

// Libraries
import { createContext, useEffect, useReducer } from 'react';

// Utils
import axios from '@/utils/axios';
import { setLangHeaders, setSession } from '@/utils/jwt';
import {
  getAccessToken,
  clearAllLocalStorage,
  setUserMeta,
  setLoginResponse,
  getCompanySettings,
  // getLoginPopupStatus,
  getUserMeta,
  getRefreshToken,
  getActivePlugins,
  getSidemenu,
  fetchHealthForms,
} from '@/utils/localStorage';
import { NULL, EMPTY_ARRAY, RESET_STORE } from '@/utils/constants';

import { dispatch as dispatchData, store } from '@/redux/store';
import { initializeNotifications } from '@/utils/firebase';
import {
  setActivePlugins,
  setCompanySettingsdata,
  setSideMenuSetting,
} from '@/redux/slices/commonSlice';
import SocketService from '@/utils/socket';
import {
  getPlugins,
  healthForm,
  setpluginDataData,
  setsideMenuData,
  sideMenuSetting,
  sethealthFormData,
} from '@/redux/slices/pluginSlice';
// import { removeThemeVariables } from '@/utils/theme';

interface InitialState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: object | any;
  userRole: number | null;
  companySettings: object | any;
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
  INITIALIZE: (state: any, action: any) => {
    const { isAuthenticated, user, userRole, companySettings } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
      userRole,
      companySettings,
      logoutFlag: false,
    };
  },
  UPDATE_USER_PROFILE: (state: any, action: any) => {
    const { user } = action.payload;
    return {
      ...state,
      user,
    };
  },
  LOGOUT: (state: any, action: any) => {
    const { logoutFlag } = action.payload;
    return {
      ...state,
      isAuthenticated: false,
      isInitialized: true,
      user: NULL,
      userRole: NULL,
      logoutFlag,
    };
  },
};

const reducer = (state: any, action: any) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  initialize: () => Promise.resolve(),
  login: (email: string, password: string, remember_me: number, token?: any) =>
    Promise.resolve(),
  logout: (email: string) => Promise.resolve(),
  updateUserProfile: (data: any) => Promise.resolve(),
  pluginSetup: (company_id: any) => Promise.resolve(),
});

function AuthProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setLocalStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const initialize = async () => {
    try {
      const accessToken = getAccessToken();
      const refreshToken = getRefreshToken();
      const userMeta = getUserMeta();
      const activePlugins = getActivePlugins();
      const companySettings = getCompanySettings();
      const sidemenu = getSidemenu();
      const healthForms = fetchHealthForms();

      if (accessToken) {
        setLangHeaders();
        setSession(accessToken, refreshToken);
        // const user = userMeta;
        // const companySettings = userMeta?.company?.setting;
        const themeSettings = userMeta?.company?.theme_setting;

        store.dispatch(setActivePlugins(activePlugins));
        store.dispatch(setpluginDataData(activePlugins));
        store.dispatch(setSideMenuSetting(sidemenu));
        store.dispatch(setCompanySettingsdata(companySettings));
        store.dispatch(setsideMenuData(sidemenu));
        store.dispatch(sethealthFormData(healthForms));

        if (!SocketService.socket) {
          SocketService.connect(userMeta?.id);
        }
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            user: userMeta,
            userRole: userMeta?.role_id,
            companySettings: companySettings,
          },
        });
      } else {
        clearAllLocalStorage();
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: NULL,
            companySettings: EMPTY_ARRAY,
            userRole: NULL,
          },
        });
      }
    } catch (err) {
      clearAllLocalStorage();
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
  };

  useEffect(() => {
    initialize();

    const handleBeforeUnload = () => {
      SocketService.disconnect();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const pluginSetup = async (company_id: any) => {
    if (company_id) {
      dispatchData(getPlugins({ company_id }));

      dispatchData(healthForm({ company_id }));

      dispatchData(sideMenuSetting({ org_id: company_id }));
    }
  };

  const login = async (
    email: string,
    password: string,
    remember_me: number,
    token?: any
  ) => {
    try {
      const response = await axios.post('/auth/login', {
        email,
        password,
        remember_me,
        // token,
      });
      if (response?.data?.success === 1) {
        setUserMeta(response?.data?.data?.user_meta);
        setLocalStorage(
          'companySettings',
          response?.data?.data?.user_meta?.company?.setting
        );
        setCompanySettingsdata(
          response?.data?.data?.user_meta?.company?.setting
        );
        setLoginResponse(response?.data?.data);
        setSession(
          response?.data?.data?.accessToken,
          response?.data?.data?.refreshToken
        );
      }
      if (response?.data?.success === 0) return response?.data;
      if (response?.data?.data?.ssologindata === 1) {
        return response?.data;
      }
      if (response?.data?.data?.first_login_by === 1) {
        localStorage.setItem('first_login_by', '1');
      }

      const loginPopupStatus =
        response?.data?.data?.editEmailSpaouse === 1 ||
        response?.data?.data?.editEmailPassword === 1 ||
        response?.data?.data?.first_login_by === 1;

      // Login success
      if (response?.data?.success === 1) {
        const company_id = response?.data?.data?.user_meta?.org_id;

        //plugin
        if (!loginPopupStatus) {
          pluginSetup(company_id);
        }

        initializeNotifications(response?.data?.data?.user_meta?.id);
      }
      initialize();
    } catch (error) {
      return error;
    }
  };

  const updateUserProfile = async (data: any) => {
    setUserMeta(data);
    const userMeta = getUserMeta();
    dispatch({
      type: 'UPDATE_USER_PROFILE',
      payload: { user: userMeta },
    });
  };

  const logout = (email: string) => {
    axios.post('/auth/logout', { email });
    clearAllLocalStorage();
    // removeThemeVariables();
    store.dispatch({ type: RESET_STORE });
    SocketService.disconnect();
    dispatch({
      type: 'LOGOUT',
      payload: {
        logoutFlag: true,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        initialize,
        login,
        pluginSetup,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
