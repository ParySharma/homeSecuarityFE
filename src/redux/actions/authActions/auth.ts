import { addUpdateQuery } from '@/api';

export const forgotPassword = async (payload: any) => {
  return await addUpdateQuery('/auth/forgot-password', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const forgotUsername = async (payload: any) => {
  return await addUpdateQuery('/auth/forgot-username', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const resetPassword = async (payload: any) => {
  return await addUpdateQuery('/auth/reset-password', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const checkResetPasswordToken = async (payload: any) => {
  return await addUpdateQuery(`auth/reset-password-link-check`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const emailResetPassword = async (payload: any) => {
  return await addUpdateQuery('/user/reset-password', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const allUserResetPassword = async (payload: any) => {
  return await addUpdateQuery('/organization/org-reset-password', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
