// Libraries
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Redux
import { dispatch } from '@/redux/store';
import { QueryFnType } from '@/api';
import { EMPTY_ARRAY } from '@/utils/constants';

interface InitialState {
  dashboarLoading: boolean;
  dashboardmessage: null;
  dashboarddata: any[];
}

const initialState: InitialState = {
  
  dashboarLoading: false,
  dashboardmessage: null,
  dashboarddata: [],
  };

const slice = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    // getDashboardData
    // START LOADING
    setDashboardLoading(state) {
      state.dashboarLoading = true;
    },

    setDashboardData(state, action: PayloadAction<any>) {
      state.dashboarLoading = false;
      state.dashboarddata = action.payload;
      state.dashboardmessage = null;
    },

    //hasError
    hasDashboardError(state, action: PayloadAction<any>) {
      state.dashboarLoading = false;
      state.dashboardmessage = action.payload;
    },
  }
  });

export const {
  setDashboardLoading,
  setDashboardData,
  hasDashboardError,
} = slice.actions;

export default slice.reducer;



// dashboardData
export const getDashboardData = (getListQuery: QueryFnType, orgId: any) => {
  return async () => {
    dispatch(slice.actions.setDashboardLoading());
    try {
      const response = await getListQuery('/company/dashboard/list', {
        org_id: orgId,
      });
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.setDashboardData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasDashboardError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasDashboardError(error));
    }
  };
};