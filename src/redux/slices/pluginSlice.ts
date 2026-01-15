// // Libraries
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // Redux
// import { dispatch } from '@/redux/store';
// import { EMPTY_ARRAY, NULL } from '@/utils/constants';
// import { QueryFnType } from '@/api';
// import {
//   // setcategoryData,
//   // setHealthForm,
//   setPlugins,
//   setSidemenu,
//   // setTabSettings,
// } from '@/utils/localStorage';
// import { setActivePlugins, setSideMenuSetting } from './commonSlice';

// interface InitialState {
//   headerLoading: boolean;
//   pluginLoading: boolean;
//   tabSettingsForChampion: any;
//   pluginData: [];
//   pluginError: any;
//   sideMenuLoading: boolean;
//   sideMenuData: [];
//   sideMenuError: any;
//   healthFormLoading: boolean;
//   healthFormData: [];
//   healthFormError: any;
//   emotionalCategoryLoading: boolean;
//   emotionalCategoryData: [];
//   emotionalCategoryError: any;
//   mediaCategoryLoading: boolean;
//   mediaCategoryData: [];
//   mediaCategoryError: any;
//   categoryCounts: {
//     media: number;
//     emotionalwellbeing: number;
//     agreement: number;
//   };
//   verificationListLoading: boolean;
//   verificationListData: [];
//   verificationListError: any;
//   verificationListFetched: boolean;
//   showActivities?: boolean;
// }

// const initialState: InitialState = {
//   headerLoading: false,
//   pluginLoading: false,
//   pluginData: [],
//   tabSettingsForChampion: NULL,
//   pluginError: null,
//   sideMenuLoading: false,
//   sideMenuData: [],
//   sideMenuError: null,
//   healthFormLoading: false,
//   healthFormData: [],
//   healthFormError: null,
//   emotionalCategoryLoading: false,
//   emotionalCategoryData: [],
//   emotionalCategoryError: null,
//   mediaCategoryLoading: false,
//   mediaCategoryData: [],
//   mediaCategoryError: null,
//   categoryCounts: {
//     media: 0,
//     emotionalwellbeing: 0,
//     agreement: 0,
//   },
//   verificationListLoading: false,
//   verificationListData: [],
//   verificationListError: null,
//   verificationListFetched: false,
//   showActivities: false,
// };

// const slice = createSlice({
//   name: 'UserPlugin',
//   initialState,
//   reducers: {
//     setpluginDataLoading: (state, action: PayloadAction<boolean>) => {
//       state.pluginLoading = action.payload;
//       state.pluginError = null;
//     },
//     setpluginDataData: (state, action: PayloadAction<any>) => {
//       state.pluginData = action.payload;
//       state.pluginError = null;
//       // state.pluginLoading = false;
//     },
//     setpluginDataError: (state, action: PayloadAction<any>) => {
//       // state.pluginLoading = false;
//       state.pluginError = action.payload;
//     },
//     setsideMenuLoading: (state, action: PayloadAction<boolean>) => {
//       state.sideMenuLoading = action.payload;
//       state.sideMenuError = null;
//     },
//     setsideMenuData: (state, action: PayloadAction<any>) => {
//       state.sideMenuData = action.payload;
//       state.sideMenuError = null;
//       // state.sideMenuLoading = false;
//     },
//     setsideMenuError: (state, action: PayloadAction<any>) => {
//       state.sideMenuError = action.payload;
//       // state.sideMenuLoading = false;
//     },
//     sethealthFormLoading: (state, action: PayloadAction<boolean>) => {
//       state.healthFormLoading = action.payload;
//       state.healthFormError = null;
//     },
//     sethealthFormData: (state, action: PayloadAction<any>) => {
//       state.healthFormData = action.payload;
//       state.healthFormError = null;
//       // state.healthFormLoading = false;
//     },
//     sethealthFormError: (state, action: PayloadAction<any>) => {
//       state.healthFormError = action.payload;
//       // state.healthFormLoading = false;
//     },

//     // Emotional Wellbeing
//     setEmotionalcategoryLoading: (state, action: PayloadAction<boolean>) => {
//       state.emotionalCategoryLoading = action.payload;
//       state.emotionalCategoryError = null;
//     },

//     setEmotionalcategoryError: (state, action: PayloadAction<any>) => {
//       state.emotionalCategoryError = action.payload;
//       // state.emotionalCategoryLoading = false;
//     },

//     // Media Category
//     setMediacategoryLoading: (state, action: PayloadAction<boolean>) => {
//       state.mediaCategoryLoading = action.payload;
//       state.mediaCategoryError = null;
//     },

//     setMediacategoryError: (state, action: PayloadAction<any>) => {
//       state.mediaCategoryError = action.payload;
//       // state.mediaCategoryLoading = false;
//     },

//     setCategoryCounts: (state, action) => {
//       const { key, value } = action.payload;
//       state.categoryCounts = {
//         ...state.categoryCounts,
//         [key]: value,
//       };
//     },

//     setVerificationListLoading: (state) => {
//       state.verificationListLoading = true;
//       state.verificationListError = null;
//     },
//     setVerificationListData: (state, action: PayloadAction<any>) => {
//       state.verificationListLoading = false;
//       state.verificationListData = action.payload;
//       state.verificationListError = null;
//     },
//     setVerificationListError: (state, action: PayloadAction<any>) => {
//       state.verificationListLoading = false;
//       state.verificationListError = action.payload;
//     },
//     setVerificationListFetched: (state, action: PayloadAction<boolean>) => {
//       state.verificationListFetched = action.payload;
//     },

//     setHeaderLoading: (state, action: PayloadAction<boolean>) => {
//       state.headerLoading = action.payload;
//     },

//     setTabSettingsForChampion: (state, action: PayloadAction<any>) => {
//       state.tabSettingsForChampion = action.payload;
//     },

//     setShowActivities: (state, action: PayloadAction<boolean>) => {
//       state.showActivities = action.payload;
//     },
//   },
// });

// export const {
//   setpluginDataLoading,
//   setpluginDataData,
//   setpluginDataError,
//   setsideMenuLoading,
//   setsideMenuData,
//   setsideMenuError,
//   sethealthFormLoading,
//   sethealthFormData,
//   sethealthFormError,
//   setCategoryCounts,
//   setVerificationListLoading,
//   setVerificationListData,
//   setVerificationListError,
//   setVerificationListFetched,
//   setHeaderLoading,
//   setShowActivities,
//   setTabSettingsForChampion,
// } = slice.actions;
// export default slice.reducer;

// export const getPlugins = (getListQuery: QueryFnType, payload: any) => {
//   return async () => {
//     dispatch(slice.actions.setpluginDataLoading(true));
//     try {
//       const response = await getListQuery('/activeplugin/get', payload);
//       const { success, data } = response?.data;
//       if (success === 1) {
//         dispatch(slice.actions.setpluginDataData(data || EMPTY_ARRAY));
//         setPlugins(data || EMPTY_ARRAY);
//         dispatch(slice.actions.setpluginDataLoading(false));
//         return data;
//       } else {
//         dispatch(slice.actions.setpluginDataError(response?.data));
//       }
//     } catch (error) {
//       dispatch(slice.actions.setpluginDataError(error));
//       dispatch(slice.actions.setpluginDataLoading(false));
//     }
//   };
// };

// export const sideMenuSetting = (getListQuery: QueryFnType, payload: any) => {
//   return async () => {
//     dispatch(slice.actions.setsideMenuLoading(true));
//     try {
//       const response = await getListQuery(
//         '/company/side-menu-settings/get-one',
//         payload
//       );
//       const { success, data } = response?.data;
//       if (success === 1) {
//         const menuSettings = data?.showmenulist;
//         setSidemenu(menuSettings);
//         dispatch(slice.actions.setsideMenuData(menuSettings));
//         dispatch(setSideMenuSetting(menuSettings));
//         dispatch(slice.actions.setsideMenuLoading(false));
//         return menuSettings;
//       } else {
//         dispatch(slice.actions.setsideMenuError(response?.data));
//       }
//     } catch (error) {
//       dispatch(slice.actions.setsideMenuLoading(false));
//       dispatch(slice.actions.setsideMenuError(error));
//     }
//   };
// };

// export const healthForm = (getListQuery: QueryFnType, payload: any) => {
//   return async () => {
//     dispatch(slice.actions.sethealthFormLoading(true));
//     try {
//       const response = await getListQuery(
//         '/health-checkup/form-instructions/get-one',
//         payload
//       );
//       const { success, data } = response?.data;
//       if (success === 1) {
//         dispatch(slice.actions.sethealthFormData(data || EMPTY_ARRAY));
//         setHealthForm(data || EMPTY_ARRAY);
//         dispatch(slice.actions.sethealthFormLoading(false));
//       } else {
//         dispatch(slice.actions.sethealthFormError(response?.data));
//       }
//     } catch (error) {
//       dispatch(slice.actions.sethealthFormLoading(false));
//       dispatch(slice.actions.sethealthFormError(error));
//     }
//   };
// };

// export const getEmotionalCategoryList = (
//   getListQuery: QueryFnType,
//   payload: any
// ) => {
//   return async () => {
//     dispatch(slice.actions.setEmotionalcategoryLoading(true));
//     try {
//       const response = await getListQuery(
//         '/emotional-wellbeing/category/list',
//         payload
//       );
//       const { success, data } = response?.data;
//       if (success === 1) {
//         const categorydataLength = data?.length || 0;
//         dispatch(
//           slice.actions.setCategoryCounts({
//             key: 'emotionalwellbeing',
//             value: categorydataLength,
//           })
//         );

//         setcategoryData('emotionalwellbeing', categorydataLength);
//         dispatch(slice.actions.setEmotionalcategoryLoading(false));
//       } else {
//         dispatch(slice.actions.setEmotionalcategoryError(response?.data));
//       }
//     } catch (error) {
//       dispatch(slice.actions.setEmotionalcategoryLoading(false));
//       dispatch(slice.actions.setEmotionalcategoryError(error));
//     }
//   };
// };

// export const getMediaCategoryList = (
//   getListQuery: QueryFnType,
//   payload: any
// ) => {
//   return async () => {
//     dispatch(slice.actions.setMediacategoryLoading(true));
//     try {
//       const response = await getListQuery('/media/category/list', payload);
//       const { success, data } = response?.data;
//       if (success === 1) {
//         const categorydataLength = data?.length || 0;
//         dispatch(
//           slice.actions.setCategoryCounts({
//             key: 'media',
//             value: categorydataLength,
//           })
//         );
//         setcategoryData('media', data?.length || 0);
//         dispatch(slice.actions.setMediacategoryLoading(false));
//       } else {
//         dispatch(slice.actions.setMediacategoryError(response?.data));
//       }
//     } catch (error) {
//       dispatch(slice.actions.setMediacategoryLoading(false));
//       dispatch(slice.actions.setMediacategoryError(error));
//     }
//   };
// };

// export const fetchSidemenu = async (url: string) => {
//   try {
//     const response = await fetch('/api/sidemenu-json', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ url }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const menuSettings = data?.showmenulist;
//       if (data?.showmenulist) {
//         setSidemenu(menuSettings);
//         dispatch(setSideMenuSetting(menuSettings));
//         dispatch(setsideMenuData(menuSettings));
//         return menuSettings;
//       }
//     } else {
//       throw new Error('API call failed');
//     }
//   } catch (err) {
//     // Handle error
//   }
// };
// export const fetchTabSetting = async (url: string) => {
//   try {
//     const response = await fetch('/api/sidemenu-json', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ url }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const tabsetting = data?.tabsetting;

//       if (tabsetting) {
//         setTabSettings(tabsetting);
//         dispatch(setTabSettingsForChampion(tabsetting));
//         return tabsetting;
//       }
//     } else {
//       throw new Error('API call failed');
//     }
//   } catch (err) {
//     // Handle error
//   }
// };

// export const fetchActivePluginjson = async (url: string) => {
//   try {
//     const response = await fetch('/api/activeplugin-json', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ url }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       const pluginsData = data?.pluginname;
//       if (data?.pluginname) {
//         setPlugins(pluginsData);
//         dispatch(setpluginDataData(pluginsData));
//         dispatch(setActivePlugins(pluginsData));
//         return pluginsData;
//       }
//     } else {
//       throw new Error('API call failed');
//     }
//     if (!response.ok) {
//       throw new Error(`API call failed: ${response.status}`);
//     }
//   } catch (err) {
//     // Handle error
//   }
// };

// export const fetchVerificationList = (getListQuery: QueryFnType) => {
//   return async () => {
//     dispatch(slice.actions.setVerificationListLoading());
//     try {
//       const response = await getListQuery(
//         '/challenge/square-users/square-verification-notification'
//       );
//       if (response?.data?.success === 1) {
//         dispatch(
//           slice.actions.setVerificationListData(
//             response?.data?.data || EMPTY_ARRAY
//           )
//         );
//         dispatch(setVerificationListFetched(true));
//       } else {
//         dispatch(slice.actions.setVerificationListError(response?.data));
//       }
//     } catch (error) {
//       dispatch(slice.actions.setVerificationListError(error));
//     }
//   };
// };
