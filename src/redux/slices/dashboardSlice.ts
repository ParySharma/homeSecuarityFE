// Libraries
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Redux
import { dispatch } from '@/redux/store';
import { QueryFnType } from '@/api';
import { EMPTY_ARRAY } from '@/utils/constants';

interface InitialState {
  isLoading: boolean;
  message: null;
  list: any[];
  dashboarLoading: boolean;
  dashboardmessage: null;
  dashboarddata: any[];
  supportisLoading: boolean;
  supportError: null;
  supportData: any[];
  quicklinkisLoading: boolean;
  quicklinkmessage: null;
  quicklinklist: any[];
  upcommingLoading: boolean;
  upcommingmessage: null;
  upcomminglist: any[];
  participationSummaryLoading: boolean;
  participationSummaryMessage: null;
  participationSummaryData: any[];
  campaignRewardLoading: boolean;
  campaignRewardMessage: null;
  campaignRewardData: any[];
  myPlansLoading: boolean;
  myPlansMessage: null;
  myPlansData: any[];
  widgetStatusLoading: boolean;
  widgetStatusMessage: null;
  widgetStatusData: any[];
  spouseLoading: boolean;
  spouseMessage: null;
  spouseData: any[];
  campaignRewardDashLoading: boolean;
  campaignRewardDashMessage: null;
  campaignRewardDashData: any[];
  participationSummaryDashData: any[];
  participationSummaryDashLoading: boolean;
  participationSummaryDashMessage: null;
  topLeaderBoardLoading: boolean;
  topLeaderBoardMessage: null;
  topLeaderBoardData: any[];
  activityError: any;
  activityData: any;
  activityLoading: boolean;
  orgDashboardData: any;
  campaignCurrentPointsLoading: boolean;
  campaignCurrentPointsData: any[];
  campaignCurrentPointsError: any;
}

const initialState: InitialState = {
  isLoading: false,
  message: null,
  list: [],
  dashboarLoading: false,
  dashboardmessage: null,
  dashboarddata: [],
  supportisLoading: false,
  supportError: null,
  supportData: [],
  quicklinkisLoading: false,
  quicklinkmessage: null,
  quicklinklist: [],
  upcommingLoading: false,
  upcommingmessage: null,
  upcomminglist: [],
  participationSummaryLoading: false,
  participationSummaryMessage: null,
  participationSummaryData: [],
  campaignRewardLoading: false,
  campaignRewardMessage: null,
  campaignRewardData: [],
  myPlansLoading: false,
  myPlansMessage: null,
  myPlansData: [],
  widgetStatusLoading: false,
  widgetStatusMessage: null,
  widgetStatusData: [],
  spouseLoading: false,
  spouseMessage: null,
  spouseData: [],
  campaignRewardDashLoading: false,
  campaignRewardDashMessage: null,
  campaignRewardDashData: [],
  participationSummaryDashData: [],
  participationSummaryDashLoading: false,
  participationSummaryDashMessage: null,
  topLeaderBoardLoading: false,
  topLeaderBoardMessage: null,
  topLeaderBoardData: [],
  activityError: null,
  activityData: [],
  activityLoading: false,
  orgDashboardData: {},
  campaignCurrentPointsLoading: false,
  campaignCurrentPointsData: [],
  campaignCurrentPointsError: null,
};

const slice = createSlice({
  name: 'Dashboard',
  initialState,
  reducers: {
    // getTodo
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    setTodo(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.list = [...state.list, action.payload];
    },
    // End LOADING
    endLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action: PayloadAction<any>) {
      state.isLoading = false;
      state.message = action.payload;
    },

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

    // getSupportData
    // START LOADING
    setSupportLoading(state) {
      state.supportisLoading = true;
    },

    setSupportData(state, action: PayloadAction<any>) {
      state.supportisLoading = false;
      state.supportData = action.payload;
      state.supportError = null;
    },

    //hasError
    setSupportError(state, action: PayloadAction<any>) {
      state.supportisLoading = false;
      state.supportError = action.payload;
    },

    // getQuickLinksData
    // START LOADING
    setQuickLinksLoading(state) {
      state.quicklinkisLoading = true;
    },

    setQuickLinksData(state, action: PayloadAction<any>) {
      state.quicklinkisLoading = false;
      state.quicklinklist = action.payload;
      state.quicklinkmessage = null;
    },

    //hasError
    hasQuickLinksError(state, action: PayloadAction<any>) {
      state.quicklinkisLoading = false;
      state.quicklinkmessage = action.payload;
    },

    // getupcommingData
    // START LOADING
    setupcommingLoading(state) {
      state.upcommingLoading = true;
    },

    // set upcomming data
    setupcommingData(state, action: PayloadAction<any>) {
      state.upcommingLoading = false;
      state.upcomminglist = action.payload;
      state.upcommingmessage = null;
    },

    //hasError
    hasupcommingError(state, action: PayloadAction<any>) {
      state.upcommingLoading = false;
      state.upcommingmessage = action.payload;
    },

    // set upcomming data
    setPaticipationSummaryData(state, action: PayloadAction<any>) {
      state.participationSummaryLoading = false;
      state.participationSummaryData = action.payload;
      state.participationSummaryMessage = null;
    },

    // START LOADING
    setPaticipationSummaryLoading(state) {
      state.participationSummaryLoading = true;
    },

    //hasError
    hasPaticipationSummaryError(state, action: PayloadAction<any>) {
      state.participationSummaryLoading = false;
      state.participationSummaryMessage = action.payload;
    },

    // set upcomming data
    setCampaignRewardData(state, action: PayloadAction<any>) {
      state.campaignRewardLoading = false;
      state.campaignRewardData = action.payload;
      state.campaignRewardMessage = null;
    },

    // START LOADING
    setCampaignRewardLoading(state) {
      state.campaignRewardLoading = true;
    },

    //hasError
    hasCampaignRewardError(state, action: PayloadAction<any>) {
      state.campaignRewardLoading = false;
      state.campaignRewardMessage = action.payload;
    },

    // set paticipation summary dashboard data
    // START LOADING
    setPaticipationSummaryDashLoading(state, action: PayloadAction<any>) {
      state.participationSummaryDashLoading = action.payload;
    },

    // set paticipation summary dashboard data
    setPaticipationSummaryDashData(state, action: PayloadAction<any>) {
      state.participationSummaryDashLoading = false;
      state.participationSummaryDashData = action.payload;
      state.participationSummaryDashMessage = null;
    },

    //hasError
    hasPaticipationSummaryDashError(state, action: PayloadAction<any>) {
      state.participationSummaryDashLoading = false;
      state.participationSummaryDashMessage = action.payload;
    },

    // set campaign reward dashboard data
    // START LOADING
    setCampaignRewardDashLoading(state) {
      state.campaignRewardDashLoading = true;
    },

    setCampaignRewardDashData(
      state,
      action: PayloadAction<{ campaign_id: string; data: any }>
    ) {
      state.campaignRewardDashLoading = false;
      const { campaign_id, data } = action.payload;
      state.campaignRewardDashData = {
        ...state.campaignRewardDashData,
        [campaign_id]: data, // Store data by campaign_id
      };
      state.campaignRewardDashMessage = null;
    },

    // hasError
    hasCampaignRewardDashError(state, action: PayloadAction<any>) {
      state.campaignRewardDashLoading = false;
      state.campaignRewardDashMessage = action.payload;
    },

    // set upcomming data
    setMyPlansData(state, action: PayloadAction<any>) {
      state.myPlansLoading = false;
      state.myPlansData = action.payload;
      state.myPlansMessage = null;
    },

    // START LOADING
    setMyPlansLoading(state) {
      state.myPlansLoading = true;
    },

    //hasError
    hasMyPlansError(state, action: PayloadAction<any>) {
      state.myPlansLoading = false;
      state.myPlansMessage = action.payload;
    },

    // set widget status data
    setWidgetStatusData(state, action: PayloadAction<any>) {
      state.widgetStatusLoading = false;
      state.widgetStatusData = action.payload;
      state.widgetStatusMessage = null;
    },

    // START LOADING
    setWidgetStatusLoading(state) {
      state.widgetStatusLoading = true;
    },

    //hasError
    hasWidgetStatusError(state, action: PayloadAction<any>) {
      state.widgetStatusLoading = false;
      state.widgetStatusMessage = action.payload;
    },

    // set spouse data
    // START LOADING
    setSpouseLoading(state) {
      state.spouseLoading = true;
    },

    setSpouseData(state, action: PayloadAction<any>) {
      state.spouseLoading = false;
      state.spouseData = action.payload;
      state.spouseMessage = null;
    },

    //hasError
    hasSpouseError(state, action: PayloadAction<any>) {
      state.spouseLoading = false;
      state.spouseMessage = action.payload;
    },

    // set top leader board data
    // START LOADING
    setTopLeaderBoardLoading(state) {
      state.topLeaderBoardLoading = true;
    },

    setTopLeaderBoardData(state, action: PayloadAction<any>) {
      state.topLeaderBoardLoading = false;
      state.topLeaderBoardData = action.payload;
      state.topLeaderBoardMessage = null;
    },

    //hasError
    hasTopLeaderBoardError(state, action: PayloadAction<any>) {
      state.topLeaderBoardLoading = false;
      state.topLeaderBoardMessage = action.payload;
    },

    // set activity data
    // START LOADING
    setActivityLoading(state) {
      state.activityLoading = true;
    },

    setActivityData(state, action: PayloadAction<any>) {
      state.activityLoading = false;
      state.activityData = action.payload;
      state.activityError = null;
    },

    //hasError
    hasActivityError(state, action: PayloadAction<any>) {
      state.activityLoading = false;
      state.activityError = action.payload;
    },
    setOrgDashboardData(state, action: PayloadAction<any>) {
      state.orgDashboardData = action.payload;
    },

    // set campaign current points data
    // START LOADING
    setCampaignCurrentPointsLoading(state) {
      state.campaignCurrentPointsLoading = true;
    },
    // set campaign current points data
    setCampaignCurrentPointsData(state, action: PayloadAction<any>) {
      state.campaignCurrentPointsLoading = false;
      state.campaignCurrentPointsData = action.payload;
      state.campaignCurrentPointsError = null;
    },

    //hasError
    hasCampaignCurrentPointsError(state, action: PayloadAction<any>) {
      state.campaignCurrentPointsLoading = false;
      state.campaignCurrentPointsError = action.payload;
    },
  },
});

export const {
  setOrgDashboardData,
  setPaticipationSummaryData,
  setCampaignRewardData,
  setPaticipationSummaryDashLoading,
} = slice.actions;

export default slice.reducer;

export const getTodo: any = () => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const addNew = {
        name: 'John Doe',
        age: 25,
      };
      dispatch(slice.actions.setTodo(addNew));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

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

// supportData
export const getSupportData = (getListQuery: QueryFnType, orgId: any) => {
  return async () => {
    dispatch(slice.actions.setSupportLoading());
    try {
      const response = await getListQuery('/company/support/list', {
        org_id: orgId,
      });

      if (response?.data?.success === 1) {
        dispatch(
          slice.actions.setSupportData(response?.data.data || EMPTY_ARRAY)
        );
      } else {
        dispatch(slice.actions.setSupportError(response?.data?.data));
      }
    } catch (error) {
      dispatch(slice.actions.setSupportError(error));
    }
  };
};

// quickLinksData
export const getQuickLinksData = (
  getListQuery: QueryFnType,
  orgId: any,
  userId: any
) => {
  return async () => {
    dispatch(slice.actions.setQuickLinksLoading());
    try {
      const response = await getListQuery('/quick-link/quick-link/list', {
        user_id: userId,
        c_companies_id: orgId,
        eligibility: 0,
      });
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.setQuickLinksData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasQuickLinksError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasQuickLinksError(error));
    }
  };
};

// upcommingData
export const getupcommingData = (getListQuery: QueryFnType, orgId: any) => {
  return async () => {
    dispatch(slice.actions.setupcommingLoading());
    try {
      const response = await getListQuery('/user/dashboard', {
        org_id: orgId,
      });
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.setupcommingData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasupcommingError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasupcommingError(error));
    }
  };
};

// paticipationSummaryData
export const getPaticipationSummaryDashData = (
  getListQuery: QueryFnType,
  props: any
) => {
  return async () => {
    try {
      const response = await getListQuery('/campaign/front/current-campaigns', {
        ...props,
      });
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(
          slice.actions.setPaticipationSummaryDashData(data || EMPTY_ARRAY)
        );
      } else {
        dispatch(slice.actions.hasPaticipationSummaryDashError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasPaticipationSummaryDashError(error));
    }
  };
};

export const getCampaignRewardDashData = (
  getListQuery: QueryFnType,
  props: any
) => {
  return async (dispatch: any, getState: any) => {
    const { campaign_id } = props;
    const existingData =
      getState().campaign?.campaignRewardDashData[campaign_id];

    if (existingData) return; // Avoid re-fetching if data exists

    dispatch(slice.actions.setCampaignRewardDashLoading());
    try {
      const response = await getListQuery('/campaign/front/campaign-rewards', {
        ...props,
      });
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(
          slice.actions.setCampaignRewardDashData({
            campaign_id,
            data: data || EMPTY_ARRAY,
          })
        );
      } else {
        dispatch(slice.actions.hasCampaignRewardDashError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasCampaignRewardDashError(error));
    }
  };
};

// paticipationSummaryData
export const getPaticipationSummaryData = (
  getListQuery: QueryFnType,
  props: any
) => {
  return async () => {
    dispatch(slice.actions.setPaticipationSummaryLoading());
    try {
      const response = await getListQuery('/campaign/front/current-campaigns', {
        ...props,
      });
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.setPaticipationSummaryData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasPaticipationSummaryError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasPaticipationSummaryError(error));
    }
  };
};

// campaignRewardData
export const getCampaignRewardData = (
  getListQuery: QueryFnType,
  props: any
) => {
  return async () => {
    dispatch(slice.actions.setCampaignRewardLoading());
    try {
      const response = await getListQuery('/campaign/front/campaign-rewards', {
        ...props,
      });
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.setCampaignRewardData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasCampaignRewardError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasCampaignRewardError(error));
    }
  };
};

// getMyPlansData
export const getMyPlansData = (getListQuery: QueryFnType, props: any) => {
  return async () => {
    dispatch(slice.actions.setMyPlansLoading());
    try {
      const response = await getListQuery('/my-plan/assign-plan/plan', {
        ...props,
      });
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.setMyPlansData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasMyPlansError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasMyPlansError(error));
    }
  };
};

// getWidgetStatusData
export const getWidgetStatusData = (getListQuery: QueryFnType, props?: any) => {
  return async () => {
    dispatch(slice.actions.setWidgetStatusLoading());
    try {
      const response = await getListQuery('/user/widgetList', {
        ...props,
      });
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.setWidgetStatusData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasWidgetStatusError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasWidgetStatusError(error));
    }
  };
};

// getSpouseData
export const getSpouseData = (getListQuery: QueryFnType, props: any) => {
  return async () => {
    dispatch(slice.actions.setSpouseLoading());
    try {
      const response = await getListQuery('/spouse/get-one', {
        ...props,
      });
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.setSpouseData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasSpouseError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasSpouseError(error));
    }
  };
};

export const getTopLeaderBoard = (getListQuery: QueryFnType, props: any) => {
  return async () => {
    dispatch(slice.actions.setTopLeaderBoardLoading());
    try {
      const response = await getListQuery(
        '/campaign/front/campaign-leaderboard',
        {
          company_id: props,
        }
      );
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.setTopLeaderBoardData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasTopLeaderBoardError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasTopLeaderBoardError(error));
    }
  };
};

export const getActivites = (getListQuery: QueryFnType, props: any) => {
  return async () => {
    dispatch(slice.actions.setActivityLoading());
    try {
      const response = await getListQuery(
        '/health-checkup/form-instructions/activities',
        {
          ...props,
        }
      );
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(slice.actions.setActivityData(data || EMPTY_ARRAY));
      } else {
        dispatch(slice.actions.hasActivityError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasActivityError(error));
    }
  };
};

export const campaignCurrentPoints = (
  getListQuery: QueryFnType,
  props: any
) => {
  return async () => {
    dispatch(slice.actions.setCampaignCurrentPointsLoading());
    try {
      const response = await getListQuery(
        '/campaign/front/campaign-current-points',
        {
          ...props,
        }
      );
      const { success, data } = response?.data;
      if (success === 1) {
        dispatch(
          slice.actions.setCampaignCurrentPointsData(data || EMPTY_ARRAY)
        );
      } else {
        dispatch(slice.actions.hasCampaignCurrentPointsError(response?.data));
      }
    } catch (error) {
      dispatch(slice.actions.hasCampaignCurrentPointsError(error));
    }
  };
};
