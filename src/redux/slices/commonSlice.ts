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
  userEventLoading: boolean;
  userEventData: any[];
  userEventError: any;
}

const initialState: InitialState = {
  userEventLoading: false,
  userEventData: EMPTY_ARRAY,
  userEventError: null,
};

const slice = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
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
  },
});
export const { setUserEventLoading, setUserEventData, hasUserEventError } =
  slice.actions;

export default slice.reducer;

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
