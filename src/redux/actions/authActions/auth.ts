import { QueryFnType } from '@/api';

export const login = async (addUpdateQuery: QueryFnType, payload: any) => {
  return addUpdateQuery('/auth/login', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
