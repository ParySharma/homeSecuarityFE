import axios from 'axios';

// Utils
import {
  setAccessToken,
  setRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  getLanguageStore,
} from '@/utils/localStorage';
import { REQUEST_CANCELED } from './constants';

const axiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL ?? 'https://home-secuarity.vercel.app/api',
  // baseURL: 'http://localhost:5000/api',
});

axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => Promise.reject(error || REQUEST_CANCELED)
);

export const setSession = (
  accessToken: string | null,
  refreshToken: string | null
) => {
  if (accessToken) {
    setAccessToken(accessToken);
    // refreshToken && setRefreshToken(refreshToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    removeAccessToken();
    removeRefreshToken();
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export const setLangHeaders = () => {
  const lang = getLanguageStore();
  const langAlias = lang?.alias || 'eng';
  axiosInstance.defaults.headers.common['x_lang'] = langAlias;
  axiosInstance.defaults.headers.common['timezone'] =
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
};

export default axiosInstance;
