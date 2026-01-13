// Libraries
import { VariantType, useSnackbar } from 'notistack';
import { REQUEST_CANCELED, SERVER_ERROR } from './constants';

export const useErrorToast = (variant: VariantType) => {
  const { enqueueSnackbar } = useSnackbar();
  const showSnackBar = (error: any) => {
    enqueueSnackbar(error, { variant });
  };
  return showSnackBar;
};

export const useServerToast = () => {
  const { enqueueSnackbar } = useSnackbar();
  const showSnackBar = (error: any) => {
    if (!error) return;
    if (error === REQUEST_CANCELED || error?.status === 204) return;
    enqueueSnackbar(
      error?.response?.data?.message ||
        error?.response?.data?.error_code ||
        error?.message ||
        error?.data?.message ||
        error?.error_code ||
        SERVER_ERROR
    ),
      {
        variant: 'error',
      };
  };
  return showSnackBar;
};
