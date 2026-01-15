// Libraries
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Redux
import { dispatch } from '@/redux/store';

// utils
import {
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  EMPTY_STRING,
  NULL,
  THEME,
} from '@/utils/constants';
import { QueryFnType } from '@/api';

interface InitialState {
  isLoading: boolean;
  theme: string;
  message: null;

  tableFilter: object;

  chatDrawerToggle: boolean;
  timeZonesList: any[];
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
  campaignsList: any[];
  campaignActivityList: any[];

  activePlugins: any[];

  championSettingsLoading: boolean;
  championSettings: any;

  errorReportList: {
    type: string;
    list: any[];
  };
  AllPopupHandler: {
    status: boolean;
  };
}

const initialState: InitialState = {
  isLoading: false,
  theme: THEME.LIGHT,
  message: null,

  tableFilter: EMPTY_OBJECT,

  chatDrawerToggle: false,
  timeZonesList: EMPTY_ARRAY,
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
  campaignsList: EMPTY_ARRAY,
  campaignActivityList: EMPTY_ARRAY,

  activePlugins: EMPTY_ARRAY,

  championSettingsLoading: false,
  championSettings: NULL,

  errorReportList: {
    type: EMPTY_STRING,
    list: EMPTY_ARRAY,
  },
  AllPopupHandler: {
    status: false,
  },
};

const slice = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
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

    setTableFilter(state, action: PayloadAction<any>) {
      state.tableFilter = { ...state.tableFilter, ...action.payload };
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

    setCampaignList(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.campaignsList = action.payload;
    },

    setCampaignActivityList(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.campaignActivityList = action.payload;
    },

    setChampionSettingsLoading(state, action: PayloadAction<any>) {
      state.championSettingsLoading = action.payload;
    },

    setChampionSettingsData(state, action: PayloadAction<any>) {
      state.championSettingsLoading = false;
      state.championSettings = action.payload;
    },

    setActivePlugins(state, action: PayloadAction<any>) {
      state.activePlugins = action.payload;
    },

    setErrorReportList(state, action: PayloadAction<any>) {
      state.errorReportList = action.payload;
    },

    setAllPopupHandler(state, action: PayloadAction<any>) {
      state.AllPopupHandler = action.payload;
    },
  },
});
export const {
  setLanguageList,
  setCompanySettingsdata,
  setSideMenuSetting,
  setHealthForms,
  setActivePlugins,
  setChampionSettingsData,
  setChampionSettingsLoading,
  setTableFilter,
  setErrorReportList,
} = slice.actions;

export default slice.reducer;

export const setLoginPopupFlag = (flag: boolean) => {
  return async () => {
    dispatch(slice.actions.setLoginPopupStatus(flag));
  };
};

export const setThemeToggle = (data: any) => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(slice.actions.setTheme(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};
export const setChatDrawerToggle = (data: any) => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(
        slice.actions.setChatDrawerToggle({
          chatData: data,
          status: data?.status,
          ...data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export const setTimeZonesList = (getListQuery: QueryFnType) => {
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

export const getMyUserEventData = (getListQuery: QueryFnType, props?: any) => {
  return async () => {
    dispatch(slice.actions.setUserEventLoading());
    try {
      const response = await getListQuery('/events/event/user-event', {
        ...props,
      });
      const { success, data } = response?.data;
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

export const getUserEventCategoryData = (
  getListQuery: QueryFnType,
  props: any
) => {
  return async () => {
    dispatch(slice.actions.setUserEventCategoryLoading());
    try {
      const response = await getListQuery('/events/event/user-event', {
        ...props,
      });
      const { success, data } = response?.data;
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

export const setInterLinksList = (getListQuery: QueryFnType) => {
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

export const fitnessClickPost = (addUpdateQuery: QueryFnType, props: any) => {
  return async () => {
    try {
      addUpdateQuery('media-fitness/video-click/create', {
        ...props,
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};
export const emotionVideoClickPost = (
  addUpdateQuery: QueryFnType,
  props: any
) => {
  return async () => {
    try {
      addUpdateQuery('emotional-wellbeing/post-click/create', {
        ...props,
      });
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export const setCampaignList = (getListQuery: QueryFnType, payload: any) => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getListQuery('/incentive/campaign/list', payload);
      if (response?.data?.success === 1) {
        dispatch(
          slice.actions.setCampaignList(response?.data?.data || EMPTY_ARRAY)
        );
        dispatch(slice.actions.endLoading());
        return response?.data?.data;
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export const setCampaignActivityList = (
  getListQuery: QueryFnType,
  payload: any
) => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getListQuery(
        '/incentive/campaign/get-org-campaign-activity-list',
        payload
      );
      if (response?.data?.success === 1) {
        dispatch(
          slice.actions.setCampaignActivityList(
            response?.data?.data || EMPTY_ARRAY
          )
        );
        dispatch(slice.actions.endLoading());
        return response?.data?.data;
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

export const setAllPopupHandler = (data: any) => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(
        slice.actions.setAllPopupHandler({
          status: data,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};
