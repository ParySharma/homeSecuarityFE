// Libraries
import useAuth from '@/contexts/useAuth';
import { useQueryHandler } from '@/hooks/useQueryHandler';
import _includes from 'lodash/includes';
import _map from 'lodash/map';

export type QueryFnType = (
  url: string,
  data?: any,
  method?: any
) => Promise<any>;

export const useApiQueries = () => {
  const { user } = useAuth();
  const { handleQuery } = useQueryHandler();

  const setAssignOrgs = (data?: any) => {
    const orgToAssign = data?.assign_org ?? user?.assign_org;
    if (data instanceof FormData) {
      orgToAssign && data.append('assign_org', orgToAssign);
      return data;
    }

    if (Array.isArray(data)) {
      return _map(data, (item) => ({ ...item, assign_org: orgToAssign }));
    }

    return { ...data, assign_org: orgToAssign };
  };

  return {
    getPaginationQuery: (url: string, data: any) =>
      handleQuery('post', url, setAssignOrgs(data)),

    getDetails: (url: string) => handleQuery('get', url, setAssignOrgs()),

    getListQuery: (url: string, data?: any) =>
      handleQuery('post', url, setAssignOrgs(data)),

    getOneQuery: (url: string, data: any) =>
      handleQuery('post', url, setAssignOrgs(data)),

    addUpdateQuery: (url: string, data: any, method: string = 'post') =>
      handleQuery(method, url, setAssignOrgs(data)),

    deleteQuery: (url: string, data: any) =>
      handleQuery('post', url, setAssignOrgs(data)),
  };
};
