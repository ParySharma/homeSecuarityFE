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

  houseListingLoading?: boolean;
  houseListingData?: any[];
  houseListingError?: any;

  societesListingLoading?: boolean;
  societesListingData?: any[];
  societesListingError?: any;

  visitorsListingLoading?: boolean;
  visitorsListingData?: any[];
  visitorsListingError?: any;

  visitorExitLoading?: boolean;
  visitorExitData?: any;
  visitorExitError?: any;
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

  houseListingLoading: false,
  houseListingData: EMPTY_ARRAY,
  houseListingError: NULL,

  societesListingLoading: false,
  societesListingData: EMPTY_ARRAY,
  societesListingError: NULL,

  visitorsListingLoading: false,
  visitorsListingData: EMPTY_ARRAY,
  visitorsListingError: NULL,

  visitorExitLoading: false,
  visitorExitData: EMPTY_OBJECT,
  visitorExitError: NULL,
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
      state.houseListingLoading = true;
    },
    getHouseListingData(state, action: PayloadAction<any>) {
      state.houseListingLoading = false;
      state.houseListingData = action.payload;
    },
    getHouseListingError(state, action: PayloadAction<any>) {
      state.houseListingLoading = false;
      state.houseListingError = action.payload;
    },

    // Get Societes Listing
    getSocietesListingLoading(state) {
      state.societesListingLoading = true;
    },
    getSocietesListingData(state, action: PayloadAction<any>) {
      state.societesListingLoading = false;
      state.societesListingData = action.payload;
    },
    getSocietesListingError(state, action: PayloadAction<any>) {
      state.societesListingLoading = false;
      state.societesListingError = action.payload;
    },

    // Get Visitors Listing
    getVisitorsListingLoading(state) {
      state.visitorsListingLoading = true;
    },
    getVisitorsListingData(state, action: PayloadAction<any>) {
      state.visitorsListingLoading = false;
      state.visitorsListingData = action.payload;
    },
    getVisitorsListingError(state, action: PayloadAction<any>) {
      state.visitorsListingLoading = false;
      state.visitorsListingError = action.payload;
    },

    // Mark Visitor Exit
    markVisitorExitLoading(state) {
      state.visitorExitLoading = true;
    },
    markVisitorExitData(state, action: PayloadAction<any>) {
      state.visitorExitLoading = false;
      state.visitorExitData = action.payload;
    },
    markVisitorExitError(state, action: PayloadAction<any>) {
      state.visitorExitLoading = false;
      state.visitorExitError = action.payload;
    },
  },
});
export const {
  setUserEventLoading,
  setUserEventData,
  hasUserEventError,
  getHouseListingData,
  markVisitorExitData,
} = slice.actions;

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
      if (success === 1 || success === true) {
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

export const getVisitorsListingRequest = (
  getListQuery: QueryFnType,
  props?: any
) => {
  return async () => {
    dispatch(slice.actions.getVisitorsListingLoading());
    try {
      const response = await getListQuery('/guard/visitors/list', {
        ...props,
      });

      const { success, data } = response?.data;
      if (success === true || success === 1) {
        dispatch(slice.actions.getVisitorsListingData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.getVisitorsListingError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.getVisitorsListingError(error));
    }
  };
};

export const markVisitorExitRequest = (
  getListQuery: QueryFnType,
  props?: any
) => {
  return async () => {
    dispatch(slice.actions.markVisitorExitLoading());
    try {
      const response = await getListQuery('/guard/visitor/exit', {
        ...props,
      });

      const { success, data } = response?.data;
      if (success === true || success === 1) {
        dispatch(slice.actions.markVisitorExitData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.markVisitorExitError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.markVisitorExitError(error));
    }
  };
};
