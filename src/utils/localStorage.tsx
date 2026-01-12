// Utils
import {
  NULL,
  ACCESS_TOKEN_KEY,
  EMPTY_ARRAY,
  REFRESH_TOKEN_KEY,
  // ACCESS_USER_META_KEY,
} from '@/utils/constants';

export const USER_META_STORAGE_KEY: any = 'user_meta';
export const COMPANY_SETTINGS_STORAGE_KEY: any = 'companySettings';
export const ACTIVEPLUGINS_STORAGE_KEY: any = 'activeplugins';
export const SIDEMENU_STORAGE_KEY: any = 'sideMenuSettings';

export const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Access token
export const setAccessToken = (data: any) => {
  return localStorage.setItem(ACCESS_TOKEN_KEY, data);
};

export const getAccessToken = () => {
  if (typeof window === 'undefined') return NULL;
  return localStorage.getItem(ACCESS_TOKEN_KEY) || NULL;
};

export const removeAccessToken = () => {
  return localStorage.removeItem(ACCESS_TOKEN_KEY);
};
// End

// Refresh token
export const setRefreshToken = (data: any) => {
  return localStorage.setItem(REFRESH_TOKEN_KEY, data);
};

export const getRefreshToken = () => {
  if (typeof window === 'undefined') return NULL;
  return localStorage.getItem(REFRESH_TOKEN_KEY) || NULL;
};

export const removeRefreshToken = () => {
  return localStorage.removeItem(REFRESH_TOKEN_KEY);
};
// End

export const clearAllLocalStorage = () => {
  localStorage.clear();
};

export const setFiltersStore = (data: any) => {
  return localStorage.setItem('filters', JSON.stringify(data));
};

export const getFiltersStore = () => {
  const filter = localStorage.getItem('filters');
  if (filter) {
    return JSON.parse(filter);
  }
  return NULL;
};

export const removeFiltersStore = () => {
  return localStorage.removeItem('filters');
};

//language
// export const setLanguageStore = (data: LangType) => {
//   return localStorage.setItem('lang', JSON.stringify(data));
// };

export const getLanguageStore = () => {
  if (typeof window === 'undefined') return NULL;

  const language = localStorage.getItem('lang');

  if (language) {
    return JSON.parse(language);
  }
  return NULL;
};
// End

export const setCampaignStore = (data: any) => {
  return localStorage.setItem('campaignCreatedBy', JSON.stringify(data));
};

export const getCampaignStore = () => {
  if (typeof window === 'undefined') return NULL;

  const campaign = localStorage.getItem('campaignCreatedBy');
  if (campaign) {
    return JSON.parse(campaign);
  }
  return NULL;
};

export const getLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return NULL;

  return localStorage.getItem(key) || NULL;
};

export const setUserMeta = (data: any) => {
  return localStorage.setItem(USER_META_STORAGE_KEY, JSON.stringify(data));
};

export const getUserMeta = () => {
  if (typeof window === 'undefined') return NULL;
  const userMeta = localStorage.getItem(USER_META_STORAGE_KEY);
  if (userMeta) {
    return JSON.parse(userMeta);
  }
  return NULL;
};

export const setCompanySettings = (data: any) => {
  return localStorage.setItem(
    COMPANY_SETTINGS_STORAGE_KEY,
    JSON.stringify(data)
  );
};

export const getCompanySettings = () => {
  const companySettings = localStorage.getItem(COMPANY_SETTINGS_STORAGE_KEY);
  if (companySettings) {
    return JSON.parse(companySettings);
  }
  return NULL;
};

export const fetchHealthForms = () => {
  let healthFormsData = getLocalStorage('healthForms');
  if (healthFormsData) {
    return healthFormsData;
  }
};
export const setPlugins = (data: any) => {
  return localStorage.setItem(ACTIVEPLUGINS_STORAGE_KEY, JSON.stringify(data));
};
export const getActivePlugins = () => {
  const activePlugins = localStorage.getItem(ACTIVEPLUGINS_STORAGE_KEY);
  if (activePlugins) {
    return JSON.parse(activePlugins);
  }
  return EMPTY_ARRAY;
};

export const setSidemenu = (data: any) => {
  return localStorage.setItem(SIDEMENU_STORAGE_KEY, JSON.stringify(data));
};

export const getSidemenu = () => {
  const sidemenu = localStorage.getItem(SIDEMENU_STORAGE_KEY);

  // Check if sidemenu is neither null nor the string "undefined"
  if (sidemenu && sidemenu !== 'undefined') {
    return JSON.parse(sidemenu);
  }

  return NULL; // Return null if no valid sidemenu found
};

export const setLoginResponse = (data: any) => {
  return localStorage.setItem('user_data', JSON.stringify(data));
};

export const getLoginResponse = () => {
  const loginData = localStorage.getItem('user_data');
  if (loginData) {
    return JSON.parse(loginData);
  }
  return NULL;
};

export const getLoginPopupStatus = () => {
  const loginpopupData: any = localStorage.getItem('user_data');
  const loginpopupDataParsed = JSON.parse(loginpopupData);
  if (loginpopupDataParsed) {
    return (
      loginpopupDataParsed?.editEmailSpaouse === 1 ||
      loginpopupDataParsed?.editEmailPassword === 1 ||
      loginpopupDataParsed?.first_login_by === 1
    );
  }
  return NULL;
};
