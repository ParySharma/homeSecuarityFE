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
  userEventLoading: boolean;
  userEventData: any[];
  userEventError: any;

  visitorCreateLoading: boolean;
  visitorCreateData: any;
  visitorCreateError: any;

  getHouseListingLoading?: boolean;
  getHouseListingData?: any[];
  getHouseListingError?: any;

  getSocietesListingLoading?: boolean;
  getSocietesListingData?: any[];
  getSocietesListingError?: any;
}

const initialState: InitialState = {
  isLoading: false,
  theme: THEME.LIGHT,
  userEventLoading: false,
  userEventData: EMPTY_ARRAY,
  userEventError: null,

  visitorCreateLoading: false,
  visitorCreateData: EMPTY_OBJECT,
  visitorCreateError: NULL,

  getHouseListingLoading: false,
  getHouseListingData: EMPTY_ARRAY,
  getHouseListingError: NULL,

  getSocietesListingLoading: false,
  getSocietesListingData: EMPTY_ARRAY,
  getSocietesListingError: NULL,
};

const slice = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action: PayloadAction<any>) {
      state.isLoading = false;
    },
    setTheme(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.theme = action.payload;
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

    // Visitor Create
    visitorCreateLoading(state) {
      state.visitorCreateLoading = true;
    },
    visitorCreateData(state, action: PayloadAction<any>) {
      state.visitorCreateLoading = false;
      state.visitorCreateData = action.payload;
    },
    visitorCreateError(state, action: PayloadAction<any>) {
      state.visitorCreateLoading = false;
      state.visitorCreateError = action.payload;
    },

    // Get House Listing
    getHouseListingLoading(state) {
      state.getHouseListingLoading = true;
    },
    getHouseListingData(state, action: PayloadAction<any>) {
      state.getHouseListingLoading = false;
      state.getHouseListingData = action.payload;
    },
    getHouseListingError(state, action: PayloadAction<any>) {
      state.getHouseListingLoading = false;
      state.getHouseListingError = action.payload;
    },

    // Get Societes Listing
    getSocietesListingLoading(state) {
      state.getSocietesListingLoading = true;
    },
    getSocietesListingData(state, action: PayloadAction<any>) {
      state.getSocietesListingLoading = false;
      state.getSocietesListingData = action.payload;
    },
    getSocietesListingError(state, action: PayloadAction<any>) {
      state.getSocietesListingLoading = false;
      state.getSocietesListingError = action.payload;
    },
  },
});
export const { setUserEventLoading, setUserEventData, hasUserEventError } =
  slice.actions;

export default slice.reducer;

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

export const visitorCreateRequest = (
  getListQuery: QueryFnType,
  props?: any
) => {
  return async () => {
    dispatch(slice.actions.visitorCreateLoading());
    try {
      const response = await getListQuery('/guard/visitor/create', {
        ...props,
      });
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.visitorCreateData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.visitorCreateError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.visitorCreateError(error));
    }
  };
};

export const getHouseListing = (getListQuery: QueryFnType, props?: any) => {
  return async () => {
    dispatch(slice.actions.getHouseListingLoading());
    try {
      const response = await getListQuery('/house/society/list', {
        ...props,
      });
      const { success, data } = response?.data;
      if (success === 1 || success === true) {
        dispatch(slice.actions.getHouseListingData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.getHouseListingError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.getHouseListingError(error));
    }
  };
};

export const getSocietesListingRequest = (
  getListQuery: QueryFnType,
  props?: any
) => {
  return async () => {
    dispatch(slice.actions.getSocietesListingLoading());
    try {
      const response = await getListQuery('/society/list', {
        ...props,
      });

      const { success, data } = response?.data;
      if (success === true || success === 1) {
        dispatch(slice.actions.getSocietesListingData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.getSocietesListingError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.getSocietesListingError(error));
    }
  };
};
