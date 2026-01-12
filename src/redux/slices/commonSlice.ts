// Libraries
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Redux
import { dispatch } from '@/redux/store';
import { EMPTY_ARRAY, NULL, THEME } from '@/utils/constants';
import { getListQuery } from '@/api';
import Cookies from 'js-cookie';

interface InitialState {
  isLoading: boolean;
  theme: string;
  message: null;
  chatDrawerToggle: boolean;
  timeZonesList: any[];
  logoutFlag: boolean;
  loginPopupStatus: boolean;

  sidemenuSetting: any;
  companySettings: any;
  health_Forms: any;

  languageList: any[];

  userEventLoading: boolean;
  userEventData: any[];
  userEventError: any;

  userEventCategoryLoading: boolean;
  userEventCategoryData: any[];
  userEventCategoryError: any;

  interLinksList: any[];

  activePlugins: any[];
}

const themeCookies = Cookies.get('theme');

const initialState: InitialState = {
  isLoading: false,
  theme: themeCookies || THEME.LIGHT,
  message: null,
  chatDrawerToggle: false,
  timeZonesList: EMPTY_ARRAY,
  logoutFlag: false,
  loginPopupStatus: false,

  sidemenuSetting: NULL,
  companySettings: NULL,
  health_Forms: NULL,

  languageList: EMPTY_ARRAY,

  userEventLoading: false,
  userEventData: EMPTY_ARRAY,
  userEventError: null,

  userEventCategoryLoading: false,
  userEventCategoryData: EMPTY_ARRAY,
  userEventCategoryError: null,

  interLinksList: EMPTY_ARRAY,

  activePlugins: EMPTY_ARRAY,
};

const slice = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    setLogoutFlag(state, action: PayloadAction<any>) {
      state.logoutFlag = action.payload;
    },

    setLoginPopupStatus(state, action: PayloadAction<any>) {
      state.loginPopupStatus = action.payload;
    },

    setTheme(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.theme = action.payload;
    },

    setSideMenuSetting(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.sidemenuSetting = action.payload;
    },

    setCompanySettingsdata(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.companySettings = action.payload;
    },

    setHealthForms(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.health_Forms = action.payload;
    },

    // Chat Drawer
    setChatDrawerToggle(state, action: PayloadAction<any>) {
      state.chatDrawerToggle = action.payload;
    },

    // End LOADING
    endLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.message = action.payload.message;
    },

    setTimeZonesList(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.timeZonesList = action.payload;
    },

    // Language

    setLanguageList(state, action: PayloadAction<any>) {
      state.languageList = action.payload;
    },

    // User Event
    setUserEventLoading(state) {
      state.userEventLoading = true;
    },
    setUserEventData(state, action: PayloadAction<any>) {
      state.userEventLoading = false;
      state.userEventData = action.payload;
    },
    hasUserEventError(state, action: PayloadAction<any>) {
      state.userEventLoading = false;
      state.userEventError = action.payload;
    },

    // User Event Category
    setUserEventCategoryLoading(state) {
      state.userEventCategoryLoading = true;
    },

    setUserEventCategoryData(state, action: PayloadAction<any>) {
      state.userEventCategoryLoading = false;
      state.userEventCategoryData = action.payload;
    },

    hasUserEventCategoryError(state, action: PayloadAction<any>) {
      state.userEventCategoryLoading = false;
      state.userEventCategoryError = action.payload;
    },

    setInterLinksList(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.interLinksList = action.payload;
    },

    setActivePlugins(state, action: PayloadAction<any>) {
      state.activePlugins = action.payload;
    },
  },
});
export const {
  setLanguageList,
  setCompanySettingsdata,
  setSideMenuSetting,
  setHealthForms,
  setActivePlugins,
} = slice.actions;

export default slice.reducer;

export const setLogoutFlag: any = (flag: boolean) => {
  return async () => {
    dispatch(slice.actions.setLogoutFlag(flag));
  };
};

export const setLoginPopupFlag: any = (flag: boolean) => {
  return async () => {
    dispatch(slice.actions.setLoginPopupStatus(flag));
  };
};

export const setThemeToggle: any = (data: any) => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.setTheme(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};
export const setChatDrawerToggle: any = (status: boolean) => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.setChatDrawerToggle(status));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export const setTimeZonesList: any = () => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getListQuery('/timezone/find');
      if (response?.data?.success === 1) {
        dispatch(
          slice.actions.setTimeZonesList(response?.data?.data || EMPTY_ARRAY)
        );
        return response?.data?.data;
      }
      dispatch(slice.actions.endLoading());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export const getMyUserEventData: any = (props: any) => {
  return async () => {
    dispatch(slice.actions.setUserEventLoading());
    try {
      const response = await getListQuery('/events/event/user-event', {
        ...props,
      });
      const { success, data } = response.data;
      if (success === 1) {
        dispatch(slice.actions.setUserEventData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasUserEventError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasUserEventError(error));
    }
  };
};

export const getUserEventCategoryData: any = (props: any) => {
  return async () => {
    dispatch(slice.actions.setUserEventCategoryLoading());
    try {
      const response = await getListQuery('/events/event/user-event', {
        ...props,
      });
      const { success, data } = response.data;
      if (success === 1) {
        dispatch(slice.actions.setUserEventCategoryData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasUserEventCategoryError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasUserEventCategoryError(error));
    }
  };
};

export const setInterLinksList: any = () => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getListQuery('/interlinks/list');
      if (response?.data?.success === 1) {
        dispatch(
          slice.actions.setInterLinksList(response?.data?.data || EMPTY_ARRAY)
        );
        dispatch(slice.actions.endLoading());
        return response?.data?.data;
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};
