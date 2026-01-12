// Libraries
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Redux
import { dispatch } from '@/redux/store';
import { EMPTY_ARRAY } from '@/utils/constants';
import { getDetails, getListQuery } from '@/api';
import { setPlugins, setSidemenu } from '@/utils/localStorage';

interface InitialState {
  pluginLoading: boolean;
  pluginData: [];
  pluginError: any;
  sideMenuLoading: boolean;
  sideMenuData: [];
  sideMenuError: any;
  healthFormLoading: boolean;
  healthFormData: [];
  healthFormError: any;
}

const initialState: InitialState = {
  pluginLoading: false,
  pluginData: [],
  pluginError: null,
  sideMenuLoading: false,
  sideMenuData: [],
  sideMenuError: null,
  healthFormLoading: false,
  healthFormData: [],
  healthFormError: null,
};

const slice = createSlice({
  name: 'UserPlugin',
  initialState,
  reducers: {
    setpluginDataLoading: (state) => {
      state.pluginLoading = true;
      state.pluginError = null;
    },
    setpluginDataData: (state, action: PayloadAction<any>) => {
      state.pluginLoading = false;
      state.pluginData = action.payload;
      state.pluginError = null;
    },
    setpluginDataError: (state, action: PayloadAction<any>) => {
      state.pluginLoading = false;
      state.pluginError = action.payload;
    },
    setsideMenuLoading: (state) => {
      state.sideMenuLoading = true;
      state.sideMenuError = null;
    },
    setsideMenuData: (state, action: PayloadAction<any>) => {
      state.sideMenuLoading = false;
      state.sideMenuData = action.payload;
      state.sideMenuError = null;
    },
    setsideMenuError: (state, action: PayloadAction<any>) => {
      state.sideMenuLoading = false;
      state.sideMenuError = action.payload;
    },
    sethealthFormLoading: (state) => {
      state.healthFormLoading = true;
      state.healthFormError = null;
    },
    sethealthFormData: (state, action: PayloadAction<any>) => {
      state.healthFormLoading = false;
      state.healthFormData = action.payload;
      state.healthFormError = null;
    },
    sethealthFormError: (state, action: PayloadAction<any>) => {
      state.healthFormLoading = false;
      state.healthFormError = action.payload;
    },
  },
});

export const {
  setpluginDataLoading,
  setpluginDataData,
  setpluginDataError,
  setsideMenuLoading,
  setsideMenuData,
  setsideMenuError,
  sethealthFormLoading,
  sethealthFormData,
  sethealthFormError,
} = slice.actions;
export default slice.reducer;

export const getPlugins: any = (payload: any) => {
  return async () => {
    dispatch(slice.actions.setpluginDataLoading());
    try {
      const response = await getListQuery('/activeplugin/get', payload);
      const { success, data } = response.data;
      if (success === 1) {
        dispatch(slice.actions.setpluginDataData(data || EMPTY_ARRAY));
        setPlugins(data || EMPTY_ARRAY);
      } else {
        dispatch(slice.actions.setpluginDataError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.setpluginDataError(error));
    }
  };
};

export const sideMenuSetting: any = (payload: any) => {
  return async () => {
    dispatch(slice.actions.setsideMenuLoading());
    try {
      const response = await getListQuery(
        '/company/side-menu-settings/get-one',
        payload
      );
      const { success, data } = response.data;
      if (success === 1) {
        dispatch(
          slice.actions.setsideMenuData(data?.showmenulist || EMPTY_ARRAY)
        );
        setSidemenu(data?.showmenulist || EMPTY_ARRAY);
      } else {
        dispatch(slice.actions.setsideMenuError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.setsideMenuError(error));
    }
  };
};
export const healthForm: any = (payload: any) => {
  return async () => {
    dispatch(slice.actions.sethealthFormLoading());
    try {
      const response = await getListQuery(
        '/health-checkup/form-instructions/get-one',
        payload
      );
      const { success, data } = response.data;
      if (success === 1) {
        dispatch(slice.actions.sethealthFormData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.sethealthFormError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.sethealthFormError(error));
    }
  };
};
