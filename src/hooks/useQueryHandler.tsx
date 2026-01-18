// Libraries
import { useAuthUtils } from '@/hooks/useAuthUtils';

const pendingRequests: Map<string, Promise<any>> = new Map();

let refreshingTokenPromise: Promise<boolean> | null = null;

const generateRequestKey = (method: string, url: string, data: any) => {
  return `${method}-${url}-${JSON.stringify(data || {})}`;
};

export const useQueryHandler = () => {
  const { retryFailedRequest, getNewToken } = useAuthUtils();
  console.log('useQueryHandler initialized', retryFailedRequest, getNewToken);

  const handleTokenExpiration = async (
    error: any,
    url: string,
    data: any,
    method: string = 'post'
  ) => {
    console.log(
      'Handling token expiration for error:',
      error,
      url,
      data,
      method
    );

    const status = error?.response?.status || error?.status;
    if (status === 401) {
      if (!refreshingTokenPromise) {
        // Only the first 401 will trigger this
        refreshingTokenPromise = getNewToken()
          .then((success) => success)
          .catch(() => false)
          .finally(() => {
            refreshingTokenPromise = null;
          });
      }
      const tokenRefreshed = await refreshingTokenPromise;
      if (tokenRefreshed) {
        // Retry only if token was refreshed
        return retryFailedRequest(url, data, method);
      } else {
        // Don't retry if refresh failed
        throw error;
      }
    }
    throw error;
  };

  const handleQuery = async (method: string, url: string, data?: any) => {
    const key = generateRequestKey(method, url, data);

    // Return pending request if already in progress
    if (pendingRequests.has(key)) return pendingRequests.get(key);

    // Create new request
    const requestPromise = (async () => {
      try {
        return await retryFailedRequest(url, data, method);
      } catch (error: any) {
        return handleTokenExpiration(error, url, data, method);
      } finally {
        pendingRequests.delete(key); // Clean up after completion
      }
    })();

    pendingRequests.set(key, requestPromise);
    return requestPromise;
  };

  return { handleQuery };
};
