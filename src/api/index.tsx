// Libraries
import axios from '@/utils/axios';
import _includes from 'lodash/includes';

// Utils
import { getAccessToken, getRefreshToken } from '@/utils/localStorage';
import { ERROR_CODE_1, ERROR_CODE_2 } from '@/utils/constants';

// Redux
import { store } from '@/redux/store';
import { setLogoutFlag } from '@/redux/slices/commonSlice';
import { setSession } from '@/utils/axiosInstance';

// Utility function to check if an error code indicates token issues
const isTokenError = (errorCode: any) =>
  _includes([ERROR_CODE_1, ERROR_CODE_2], errorCode);

let isRefreshing = false;

// Function to log out the user
const logoutUser = async (error: any) => {
  if (!isRefreshing && isTokenError(error?.error_code)) {
    isRefreshing = true;
    store.dispatch(setLogoutFlag(true));
  }
};

// Function to refresh the token
const getNewToken = async () => {
  try {
    const response = await axios.post('/auth/refresh-token', {
      accessToken: getAccessToken(),
      refreshToken: getRefreshToken(),
    });
    const { success, message, data } = response?.data || {};
    if (success) {
      setSession(data?.accessToken, data?.refreshToken);
      return true;
    }
    await logoutUser({ error_code: message });
    return false;
  } catch (error: any) {
    await logoutUser(error);
    return false;
  }
};

// Function to retry a failed request
const retryFailedRequest = async (
  url: string,
  data: any,
  method: string = 'post',
  config?: any
) => {
  const axiosMethods: Record<string, Function> = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
  };
  return axiosMethods[method]?.(url, data, config);
};

// Function to handle token expiration
const handleTokenExpiration = async (
  error: any,
  url: string,
  data: any,
  method: string = 'post',
  config?: any
) => {
  if (isTokenError(error?.error_code)) {
    const tokenRefreshed = await getNewToken();
    if (tokenRefreshed)
      return await retryFailedRequest(url, data, method, config);
  }
  throw error; // Ensure other errors bubble up
};

// Generic query handler
const handleQuery = async (
  method: string,
  url: string,
  data?: any,
  config?: any
) => {
  try {
    isRefreshing = false;
    return await retryFailedRequest(url, data, method, config);
  } catch (error: any) {
    return handleTokenExpiration(error, url, data, method, config);
  }
};

// Exported API functions
export const getPaginationQuery = (url: string, data: any) =>
  handleQuery('post', url, data);

export const getDetails = (url: string) => handleQuery('get', url);

export const getListQuery = (url: string, data?: any) =>
  handleQuery('post', url, data);

export const getOneQuery = (url: string, data: any) =>
  handleQuery('post', url, data);

export const addUpdateQuery = (url: string, data: any, method?: any) => {
  if (method) {
    return handleQuery('put', url, data);
  } else {
    return handleQuery('post', url, data);
  }
};

export const deleteQuery = (url: string, data: any) =>
  handleQuery('post', url, data);

export const resetPassUpdateQuery = (
  url: string,
  data: any,
  method?: any,
  headers?: any
) => {
  const config = {
    headers: headers || {}, // Default to an empty object if no headers are provided
  };

  if (method === 'put') {
    return handleQuery('put', url, data, config);
  }
  return handleQuery('post', url, data, config);
};
