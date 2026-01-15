// Libraries
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Redux
import { dispatch } from '@/redux/store';
import { QueryFnType } from '@/api';
import { EMPTY_ARRAY } from '@/utils/constants';

interface InitialState {
  profileLoading: boolean;
  profileData: any;
  profileError: any;
}

const initialState: InitialState = {
  profileLoading: false,
  profileData: {},
  profileError: null,
};

const slice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setProfileLoading: (state) => {
      state.profileLoading = true;
      state.profileError = null;
    },
    setProfileData: (state, action: PayloadAction<any>) => {
      state.profileLoading = false;
      state.profileData = action.payload;
      state.profileError = null;
    },
    setProfileError: (state, action: PayloadAction<any>) => {
      state.profileLoading = false;
      state.profileError = action.payload;
    },
  },
});

export default slice.reducer;

export const { setProfileData } = slice.actions;

export const getProfileDetails = (getDetails: QueryFnType) => {
  return async () => {
    dispatch(slice.actions.setProfileLoading());
    try {
      const response = await getDetails('/user/get-profile');
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.setProfileData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.setProfileError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.setProfileError(error));
    }
  };
};
