// Libraries
import { usePathname } from 'next/navigation';
import _includes from 'lodash/includes';

// Utils
import axios, { setSession } from '@/utils/axiosInstance';
import { getAccessToken, getRefreshToken } from '@/utils/localStorage';

// Hook
import useAuth from '@/contexts/useAuth';

export const useAuthUtils = () => {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  const logoutUser = async (error: any) => {
    const status = error?.response?.status || error?.status;
    if (status === 401) {
      logout(user?.email);
    }
  };

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

  const retryFailedRequest = async (
    url: string,
    data: any,
    method: string = 'post'
  ) => {
    const axiosMethods: Record<string, Function> = {
      get: axios.get,
      put: axios.put,
      post: axios.post,
    };

    return axiosMethods[method]?.(url, data);
  };

  return { logoutUser, getNewToken, retryFailedRequest };
};
