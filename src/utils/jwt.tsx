import axios from './axios';

import {
  setAccessToken,
  removeAccessToken,
  getLanguageStore,
  setRefreshToken,
  removeRefreshToken,
} from '@/utils/localStorage';
import { NULL } from './constants';

const setSession = (
  accessToken: string | null,
  refreshToken: string | null
) => {
  if (accessToken) {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    removeAccessToken();
    removeRefreshToken();
    delete axios.defaults.headers.common.Authorization;
  }
};

const setLangHeaders = () => {
  const lang = getLanguageStore();
  const langAlias = lang?.alias || 'eng';

  axios.defaults.headers.common['x_lang'] = langAlias;
};

const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    return NULL;
  }
};

export { setSession, setLangHeaders, decodeJWT };
